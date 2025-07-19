import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Layers, Search, Loader2 } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  useMapEvents,
  Marker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockLandDataList, LandData } from "@/data/landData";
import ScrollToTopButton from "./ScrollToTopButton";
import Fuse from "fuse.js";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const GEOAPIFY_API_KEY = "c50f34a02d844479ba7f566f1f178a31";

interface MapSelectorProps {
  onPlotSelect?: (plotId: string) => void;
  onDrawCustom?: () => void;
  onCancel?: () => void;
}

const MapSelector = ({
  onPlotSelect = () => {},
  onDrawCustom = () => {},
  onCancel = () => {},
}: MapSelectorProps) => {
  const navigate = useNavigate();
  const [satellite, setSatellite] = useState(false);
  const [planning, setPlanning] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsData, setDetailsData] = useState<LandData | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const mapRef = useRef<any>(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 20.980880633747,
    lng: 105.75492642413,
  });
  const [shouldMoveMap, setShouldMoveMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);

  // Tính centroid cho bản đồ
  const getCentroid = (
    shape: { lat: number; lng: number }[] | null | undefined
  ) => {
    if (
      Array.isArray(shape) &&
      shape.length >= 3 &&
      shape.every(
        (pt) => typeof pt.lat === "number" && typeof pt.lng === "number"
      )
    ) {
      let latSum = 0,
        lngSum = 0;
      for (const pt of shape) {
        latSum += pt.lat;
        lngSum += pt.lng;
      }
      return { lat: latSum / shape.length, lng: lngSum / shape.length };
    }
    console.warn(
      "Invalid shape for centroid calculation, returning default center"
    );
    return { lat: 10.762622, lng: 106.660172 };
  };

  // Tìm kiếm địa chỉ
  const fetchSuggestions = async (value: string) => {
    if (value.trim().length > 2) {
      setSearchLoading(true);
      setShowSuggestions(true);
      try {
        const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
          value
        )}&lang=vi&limit=5&filter=countrycode:vn&apiKey=${GEOAPIFY_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        let apiSuggestions = data.features || [];
        // Xử lý mockLandDataList: ưu tiên địa chỉ bắt đầu bằng value
        const norm = (str: string) =>
          str.toLowerCase().replace(/\s+/g, " ").trim();
        const inputNorm = norm(value);
        // Địa chỉ bắt đầu bằng value
        const startsWith = mockLandDataList
          .filter(
            (item) =>
              norm(item.address).startsWith(inputNorm) ||
              norm(item.fullAddress).startsWith(inputNorm)
          )
          .map((item) => ({
            properties: {
              formatted: item.fullAddress,
              lat: item.shape?.[0]?.lat,
              lon: item.shape?.[0]?.lng,
              place_id: `mock-${item.id}`,
            },
          }));
        // Fuzzy search loại bỏ các địa chỉ đã có ở startsWith
        const fuse = new Fuse(mockLandDataList, {
          keys: ["address", "fullAddress"],
          threshold: 0.4,
          distance: 100,
        });
        const fuzzy = fuse
          .search(value.trim())
          .map((result) => ({
            properties: {
              formatted: result.item.fullAddress,
              lat: result.item.shape?.[0]?.lat,
              lon: result.item.shape?.[0]?.lng,
              place_id: `mock-${result.item.id}`,
            },
          }))
          .filter(
            (sug) =>
              !startsWith.some(
                (sw) => sw.properties.formatted === sug.properties.formatted
              )
          );
        // Gộp lại: ưu tiên startsWith, sau đó fuzzy, sau đó apiSuggestions (loại trùng)
        const allSuggestions = [
          ...startsWith,
          ...fuzzy,
          ...apiSuggestions.filter(
            (apiSug) =>
              !startsWith.some(
                (sw) => sw.properties.formatted === apiSug.properties.formatted
              ) &&
              !fuzzy.some(
                (fz) => fz.properties.formatted === apiSug.properties.formatted
              )
          ),
        ];
        setSuggestions(allSuggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setSearchLoading(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Xử lý thay đổi input tìm kiếm
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchAddress(value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 500);
  };

  // Xử lý click vào gợi ý tìm kiếm
  const handleSuggestionClick = (sug: any) => {
    const cleanAddress = sug.properties.formatted
      .replace(/,? ?\d{5},? ?Việt Nam$/, "")
      .replace(/,? ?Việt Nam$/, "");
    setSearchAddress(cleanAddress);
    setShowSuggestions(false);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
  };

  // Hàm thực hiện tìm kiếm khi ấn nút
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sug = suggestions.find(
      (sug) =>
        sug.properties.formatted
          .replace(/,? ?\d{5},? ?Việt Nam$/, "")
          .replace(/,? ?Việt Nam$/, "") === searchAddress
    );
    if (sug && sug.properties.lat && sug.properties.lon) {
      setMapCenter({ lat: sug.properties.lat, lng: sug.properties.lon });
      setShouldMoveMap(true);
      setMarkerPosition({ lat: sug.properties.lat, lng: sug.properties.lon });

      // Nếu là dữ liệu mock thì lấy thông tin chi tiết để hiển thị panel xác nhận
      if (
        sug.properties.place_id &&
        sug.properties.place_id.startsWith("mock-")
      ) {
        const plotId = sug.properties.place_id.replace("mock-", "");
        const plotData = mockLandDataList.find((plot) => plot.id === plotId);
        if (plotData) {
          setDetailsData(plotData);
          setShowDetails(true);
          setSelectedPlot(plotId);
          if (!searchPanelOpen) setSearchPanelOpen(true);
        }
      }
    }
  };

  // Xử lý click vào Polygon
  const handlePolygonClick = (plotId: string) => {
    console.log("Polygon clicked, plotId:", plotId);
    setSelectedPlot(plotId);
    const plotData = mockLandDataList.find((plot) => plot.id === plotId);
    if (
      plotData &&
      Array.isArray(plotData.shape) &&
      plotData.shape.length >= 3
    ) {
      console.log("Found plot data:", plotData);
      setDetailsData(plotData);
      setShowDetails(true);
      if (!searchPanelOpen) setSearchPanelOpen(true);
    } else {
      console.warn("No valid plot data or shape for plotId:", plotId, plotData);
      setShowDetails(false);
      setDetailsData(null);
    }
  };

  // Thuật toán kiểm tra điểm có nằm trong polygon không (ray-casting)
  function isPointInPolygon(
    point: { lat: number; lng: number },
    polygon: { lat: number; lng: number }[]
  ) {
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].lat,
        yi = polygon[i].lng;
      const xj = polygon[j].lat,
        yj = polygon[j].lng;
      const intersect =
        yi > point.lng !== yj > point.lng &&
        point.lat < ((xj - xi) * (point.lng - yi)) / (yj - yi + 0.0000001) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  // Xử lý click ra ngoài Polygon
  const handleMapClick = (e: any) => {
    console.log("Map clicked at:", e.latlng);
    let clickedInsideAnyPolygon = false;
    mockLandDataList.forEach((plot) => {
      if (
        Array.isArray(plot.shape) &&
        plot.shape.length >= 3 &&
        plot.shape.every(
          (pt) => typeof pt.lat === "number" && typeof pt.lng === "number"
        )
      ) {
        if (
          isPointInPolygon({ lat: e.latlng.lat, lng: e.latlng.lng }, plot.shape)
        ) {
          console.log("Click inside polygon:", plot.id);
          clickedInsideAnyPolygon = true;
        }
      } else {
        console.warn("Invalid shape for plot:", plot.id);
      }
    });
    if (!clickedInsideAnyPolygon) {
      console.log("Click outside all polygons, resetting selection");
      setSelectedPlot(null);
      setShowDetails(false);
      setDetailsData(null);
    }
    setMarkerPosition(e.latlng);
  };

  // Xác nhận chọn mảnh đất và chuyển trang
  const handleConfirmSelection = () => {
    if (selectedPlot && detailsData) {
      // Tách thông tin từ fullAddress
      const fullAddress = detailsData.fullAddress || "";
      const parts = fullAddress.split(",").map((s) => s.trim());
      let ward = "",
        district = "",
        province = "";
      if (parts.length >= 3) {
        ward = parts[1] || "";
        district = parts[2] || "";
        province = parts[3] || "";
      }
      // Tính centroid
      const centroid = getCentroid(detailsData.shape);
      // Chuẩn hóa tọa độ
      const wgs84 = centroid
        ? `${centroid.lat.toFixed(6)}, ${centroid.lng.toFixed(6)}`
        : "";
      // Chuẩn bị dữ liệu autofill
      const autofill = {
        address: fullAddress,
        ward,
        district,
        province,
        number: detailsData.plotNumber || "",
        wgs84,
        area: detailsData.area ? detailsData.area.toString() : "",
      };
      onPlotSelect(selectedPlot);
      navigate("/property-form", {
        state: {
          ...detailsData,
          lat: centroid.lat.toString(),
          lng: centroid.lng.toString(),
          autofill,
        },
      });
      setShowDetails(false);
      setSelectedPlot(null);
      setDetailsData(null);
    }
  };

  // Hàm xác định URL lớp quy hoạch
  function getPlanningLayerUrl(lat: number, lng: number) {
    if (lat >= 20.8 && lat <= 21.2 && lng >= 105.7 && lng <= 106.1) {
      return "https://l5cfglaebpobj.vcdn.cloud/ha-noi-2030-2/{z}/{x}/{y}.png";
    }
    if (lat >= 10.6 && lat <= 11.2 && lng >= 106.3 && lng <= 107.0) {
      return "https://sqhkt-qlqh.tphcm.gov.vn/api/tiles/bandoso/{z}/{x}/{y}.png";
    }
    return "https://l5cfglaebpobj.vcdn.cloud/ha-noi-2030-2/{z}/{x}/{y}.png";
  }

  // Component để track trung tâm bản đồ
  function CenterTracker() {
    useMapEvents({
      moveend: (e) => {
        const center = e.target.getCenter();
        setMapCenter({ lat: center.lat, lng: center.lng });
      },
      click: handleMapClick,
    });
    return null;
  }

  // Di chuyển bản đồ khi chọn gợi ý
  useEffect(() => {
    if (shouldMoveMap && mapRef.current && mapRef.current.setView) {
      mapRef.current.setView([mapCenter.lat, mapCenter.lng], 18, {
        animate: true,
        duration: 1,
      });
      setShouldMoveMap(false);
    }
  }, [shouldMoveMap, mapCenter]);

  // Ẩn gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showSuggestions && !target.closest(".search-container")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  // Quản lý body overflow
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen bg-background"
      style={{ zIndex: 0 }}
    >
      {/* Nút mở/đóng panel tìm kiếm */}
      <button
        onClick={() => setSearchPanelOpen((o) => !o)}
        className={
          `fixed top-1/2 z-[1100] bg-white border border-border shadow-lg rounded-l-2xl w-12 h-24 flex items-center justify-center transition-all duration-300 hover:bg-accent` +
          (searchPanelOpen ? " right-[400px]" : " right-0")
        }
        style={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          transform: "translateY(-50%)",
        }}
        aria-label={searchPanelOpen ? "Đóng tìm kiếm" : "Mở tìm kiếm"}
      >
        {searchPanelOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        )}
      </button>

      {/* Panel tìm kiếm */}
      <div
  className={`fixed top-0 right-0 h-screen w-[400px] bg-white border-l border-gray-200 z-[1099] transition-transform duration-300 ${
    searchPanelOpen ? "translate-x-0" : "translate-x-full"
  } search-container flex flex-col`}
  style={{ willChange: "transform", maxWidth: "100vw" }}
>
  {/* Header panel */}
  <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-white">
    <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center">
      <Search className="w-5 h-5 text-gray-700" />
    </div>
    <div className="flex-1">
      <h2 className="text-lg font-semibold text-gray-800">Tìm kiếm địa chỉ</h2>
      <p className="text-sm text-gray-500 mt-0.5">Nhập địa chỉ để tra cứu.</p>
    </div>
  </div>

  {/* Nội dung panel */}
  <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
    <form onSubmit={handleSearchSubmit} className="space-y-3">
      <label htmlFor="search-input" className="text-sm font-medium text-gray-700">
        Địa chỉ cần tìm
      </label>
      <div className="relative">
        <Input
          id="search-input"
          type="text"
          placeholder="VD: 44 An Hòa, Mộ Lao"
          value={searchAddress}
          onChange={handleSearchInputChange}
          className="pl-10 pr-10 h-11 text-sm border rounded-md w-full"
          autoComplete="off"
          onFocus={() =>
            searchAddress.length > 2 && suggestions.length > 0 && setShowSuggestions(true)
          }
        />
        {/* Icon search bên trái */}
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
        {/* Nút tìm kiếm bên phải */}
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none cursor-pointer"
          aria-label="Tìm kiếm"
        >
          <Search className="w-5 h-5 text-gray-500" />
        </button>
        {searchLoading && (
          <Loader2 className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 animate-spin w-5 h-5" />
        )}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-12 bg-white border border-gray-200 rounded-md shadow-sm z-50 max-h-64 overflow-y-auto">
            {suggestions.map((sug, idx) => (
              <div
                key={sug.properties.place_id || idx}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm border-b last:border-b-0"
                onClick={() => handleSuggestionClick(sug)}
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-800">
                    {sug.properties.formatted
                      .replace(/,? ?\d{5},? ?Việt Nam$/, "")
                      .replace(/,? ?Việt Nam$/, "")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </form>

    {/* Thông tin mảnh đất được chọn */}
    {showDetails && detailsData && (
      <div className="border border-gray-200 rounded-md bg-white">
        <div className="border-b px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-700">Thông tin mảnh đất</h3>
        </div>
        <div className="p-4 space-y-2 text-sm text-gray-700">
          <div className="flex gap-2">
            <span className="font-medium">Diện tích:</span>
            <span className="text-green-600 font-semibold">
              {detailsData.area ? `${detailsData.area} m²` : "Chưa xác định"}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Số thửa đất:</span>
            <span className="text-orange-600 font-semibold">
              {detailsData.plotNumber || "Chưa xác định"}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Địa chỉ:</span>
            <span className="text-gray-500">
              {detailsData.fullAddress || "Chưa xác định"}
            </span>
          </div>

          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPlot}
            className="w-full h-11 text-sm font-semibold mt-3 bg-gray-400 text-white rounded-md disabled:opacity-50"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Xác nhận chọn mảnh đất
          </Button>
        </div>
      </div>
    )}
  </div>
</div>


      {/* Nút vệ tinh và quy hoạch */}
      <div
        className="fixed left-6 bottom-6 flex flex-col gap-4 z-[1002]"
      >
        <button
          onClick={() => setSatellite((s) => !s)}
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-card border border-border transition hover:bg-accent ${
            satellite ? "ring-2 ring-primary" : ""
          }`}
          title="Chế độ vệ tinh"
        >
          <Layers
            className={`w-6 h-6 ${
              satellite ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </button>
        <button
          onClick={() => setPlanning((p) => !p)}
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-card border border-border transition hover:bg-accent ${
            planning ? "ring-2 ring-primary" : ""
          }`}
          title="Lớp quy hoạch"
        >
          <span
            className={`w-6 h-6 block rounded bg-primary opacity-80 ${
              planning ? "" : "grayscale"
            }`}
          ></span>
        </button>
      </div>

      {/* Full-screen map */}
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={satellite ? 18 : 17}
        maxZoom={20}
        style={{ height: "100vh", width: "100vw", borderRadius: 0 }}
        ref={mapRef}
      >
        <TileLayer
          url={
            satellite
              ? "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              : "http://mts1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
          }
          attribution={
            satellite
              ? "Tiles © Esri — Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
              : undefined
          }
          subdomains={satellite ? undefined : ["mt0", "mt1", "mt2", "mt3"]}
          maxZoom={20}
        />
        <CenterTracker />
        {planning && (
          <TileLayer
            url={getPlanningLayerUrl(mapCenter.lat, mapCenter.lng)}
            maxNativeZoom={18}
            maxZoom={20}
            opacity={1.0}
          />
        )}

        {/* Hiển thị tất cả các Polygon từ mockLandDataList */}
        {mockLandDataList
          .filter(
            (plot) =>
              Array.isArray(plot.shape) &&
              plot.shape.length >= 3 &&
              plot.shape.every(
                (pt) => typeof pt.lat === "number" && typeof pt.lng === "number"
              )
          )
          .map((plot) => {
            const isSelected = selectedPlot === plot.id;
            return (
              <Polygon
                key={plot.id}
                positions={plot.shape.map((coord) => [coord.lat, coord.lng])}
                pathOptions={{
                  color: isSelected ? "#ef4444" : "hsl(var(--primary))",
                  weight: isSelected ? 4 : 2,
                  fillColor: isSelected ? "#ef4444" : "hsl(var(--primary))",
                  fillOpacity: isSelected ? 0.3 : 0.2,
                }}
                eventHandlers={{
                  click: () => handlePolygonClick(plot.id),
                }}
              />
            );
          })}
      </MapContainer>

      <ScrollToTopButton />
    </div>
  );
};

export default MapSelector;
