import { useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sampleCompareData from "../data/sampleCompareData";
import LoadingOverlay from "../components/LoadingOverlay";
import { sampleFinalDataTD, sampleFinalDataAI } from "../data/sampleFinalData";
import "./index.css";
import Header from "../components/Header";
import { get } from "http";

const COLUMN_COUNT = 5; // TS thẩm định + Định giá AI + 3 TS so sánh
const COLUMN_LABELS = [
  "TS THẨM ĐỊNH",
  "Định giá AI",
  "TS SO SÁNH 1",
  "TS SO SÁNH 2",
  "TS SO SÁNH 3",
];

function isNumberValue(val: string): boolean {
  if (!val) return false;
  // Nhận nếu chỉ chứa số, dấu chấm, dấu phẩy, dấu /, dấu trừ, dấu %, khoảng trắng
  return /^-?[\d.,/%\s]+$/.test(val.trim());
}

// Định nghĩa các trường cho từng nhóm (đã cập nhật với group)
const GENERAL_FIELDS = [
  { label: "Địa chỉ", key: "address" },
  { label: "Tỉnh", key: "province" },
  { label: "Quận / Huyện", key: "district" },
  { label: "Xã / Phường", key: "ward" },
  { label: "Đường phố", key: "street" },
  { label: "Số nhà/Thửa", key: "number" },
  { label: "Tọa độ WGS 84", key: "wgs84" },
  { label: "Khoảng cách tới TS so sánh (m)", key: "distance" },
  { label: "Nguồn tham khảo", key: "source" },
  { label: "Link tham khảo/SĐT", key: "link" },
  { label: "Thời điểm thu thập thông tin", key: "collect_time" },
  { label: "Tình trạng pháp lý", key: "legal" },
  { label: "Diện tích thửa đất (m2)", key: "area" },
  {
    groupLabel: "Trong đó",
    fields: [
      { label: "Đất ở", key: "residential" },
      { label: "Giải thích", key: "residential_note" },
      { label: "Đất nông nghiệp", key: "agri" },
      { label: "Giải thích", key: "agri_note" },
      { label: "Các loại đất khác", key: "other" },
      { label: "Giải thích", key: "other_note" },
    ],
  },
  { label: "Tỷ lệ đất ở/Tổng diện tích đất", key: "res_ratio" },
];

const VALUE_FIELDS = [
  { label: "Giá chào bán/chào mua(đồng)", key: "offer_price" },
  { label: "Điều chỉnh về độ tin cậy(%)", key: "confidence" },
  { label: "Giá thương lượng/Giá giao dịch thành công", key: "deal_price" },
  { label: "Thời điểm giao dịch", key: "deal_time" },
  { label: "Tổng giá trị CTXD", key: "total_construction" },
  { label: "Giá trị CTXD1", key: "construction1" },
  { label: "Mô tả", key: "desc" },
  { label: "Diện tích sàn xây dựng(m2)", key: "floor_area" },
  { label: "Đơn giá xây dựng", key: "unit_price" },
  { label: "Chất lượng còn lại(%)", key: "quality" },
  { label: "Tỷ lệ hoàn thiện(%)", key: "completion" },
  { label: "Giải thích", key: "construction_note" },
  { label: "Giá trị quyền sử dụng đất", key: "land_right" },
  { label: "Chi phí pháp lý", key: "legal_cost" },
  // Thêm 3 trường mới ở đây
  { label: "Giải thích", key: "land_area_note" },
  { label: "Diện tích đất (Diện tích đất để tính đơn giá)", key: "land_area_for_unit_price" },
  { label: "Đơn giá quyền sử dụng đất (đồng/m2) - Tính theo diện tích đất/(đồng/m - Tính theo chiều rộng mặt tiền)", key: "land_unit_price" },
];

const ADJUST_FIELDS = [
  {
    groupLabel: "Tình trạng pháp lý",
    fields: [
      { label: "Thông số", key: "legal_status_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "legal_status_ratio" },
      { label: "Mức điều chỉnh", key: "legal_status_adjust" },
      { label: "Giá sau điều chỉnh", key: "legal_status_price" },
    ],
  },
  {
    groupLabel: "Mục đích sử dụng",
    fields: [
      { label: "Thông số", key: "usage_purpose_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "usage_purpose_ratio" },
      { label: "Mức điều chỉnh", key: "usage_purpose_adjust" },
      { label: "Giá sau điều chỉnh", key: "usage_purpose_price" },
    ],
  },
  {
    groupLabel: "Diện tích(m2)",
    fields: [
      { label: "Thông số", key: "area_m2_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "area_m2_ratio" },
      { label: "Mức điều chỉnh", key: "area_m2_adjust" },
      { label: "Giá sau điều chỉnh", key: "area_m2_price" },
    ],
  },
  {
    groupLabel: "Mặt tiền(m)",
    fields: [
      { label: "Thông số", key: "frontage_m_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "frontage_m_ratio" },
      { label: "Mức điều chỉnh", key: "frontage_m_adjust" },
      { label: "Giá sau điều chỉnh", key: "frontage_m_price" },
    ],
  },
  {
    groupLabel: "Hình dạng",
    fields: [
      { label: "Thông số", key: "shape_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "shape_ratio" },
      { label: "Mức điều chỉnh", key: "shape_adjust" },
      { label: "Giá sau điều chỉnh", key: "shape_price" },
    ],
  },
  {
    groupLabel: "Số mặt tiền",
    fields: [
      { label: "Thông số", key: "frontage_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "frontage_ratio" },
      { label: "Mức điều chỉnh", key: "frontage_adjust" },
      { label: "Giá sau điều chỉnh", key: "frontage_price" },
    ],
  },
  {
    groupLabel: "Độ rộng ngõ/ngách nhỏ nhất (m)",
    fields: [
      { label: "Thông số", key: "alley_width_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "alley_width_ratio" },
      { label: "Mức điều chỉnh", key: "alley_width_adjust" },
      { label: "Giá sau điều chỉnh", key: "alley_width_price" },
    ],
  },
  {
    groupLabel:
      "Yếu tố tâm linh: Gần khu nghĩa trang, chùa, nhà thờ...(bán kính 50m)",
    fields: [
      { label: "Thông số", key: "spiritual_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "spiritual_ratio" },
      { label: "Mức điều chỉnh", key: "spiritual_adjust" },
      { label: "Giá sau điều chỉnh", key: "spiritual_price" },
    ],
  },
  {
    groupLabel: "Bất lợi khác",
    fields: [
      { label: "Thông số", key: "other_disadvantage_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "other_disadvantage_ratio" },
      { label: "Mức điều chỉnh", key: "other_disadvantage_adjust" },
      { label: "Giá sau điều chỉnh", key: "other_disadvantage_price" },
    ],
  },
];
const FINAL_FIELDS = [
  { label: "Mức giá chỉ dẫn", key: "guide_price" },
  {
    label: "Giá trị trung bình của mức giá chỉ dẫn(đồng)",
    key: "avg_guide_price",
  },
  {
    label: "Mức độ chênh lệch với giá trị trung bình của các mức chỉ dẫn(%)",
    key: "diff_avg_guide",
  },
  { label: "Tổng giá trị điều chỉnh gộp (đồng)", key: "total_adjust" },
  { label: "Số lần điều chỉnh", key: "adjust_count" },
  { label: "Biên độ điều chỉnh", key: "adjust_range" },
  { label: "Giá trị điều chỉnh thuần(đồng)", key: "net_adjust" },
  { label: "Xác định mức giá cho tài sản thẩm định", key: "final_price" },
  { label: "Ghi chú", key: "note" },
];

// Các trường gen bằng AI trong VALUE_FIELDS
const AI_VALUE_KEYS = [
  "offer_price",
  "confidence",
  "deal_price",
  "deal_time",
  "total_construction",
  "construction1",
  "unit_price",
  "quality",
  "completion",
];

// Các trường gen bằng AI trong ADJUST_FIELDS
const AI_ADJUST_KEYS = [
  "legal_status_ratio",
  "legal_status_adjust",
  "legal_status_price",
  "usage_purpose_ratio",
  "usage_purpose_adjust",
  "usage_purpose_price",
  "area_m2_ratio",
  "area_m2_adjust",
  "area_m2_price",
  "frontage_m_ratio",
  "frontage_m_adjust",
  "frontage_m_price",
  "shape_ratio",
  "shape_adjust",
  "shape_price",
  "frontage_ratio",
  "frontage_adjust",
  "frontage_price",
  "alley_width_ratio",
  "alley_width_adjust",
  "alley_width_price",
  "spiritual_ratio",
  "spiritual_adjust",
  "spiritual_price",
  "other_disadvantage_ratio",
  "other_disadvantage_adjust",
  "other_disadvantage_price",
];

// Sửa useTableState: không copy trường 'source' từ col 0 sang col 1
function useTableState(fields, autofill, columnDefaults = [], aiKeys = []) {
  const [data, setData] = useState(() => {
    const initialState = {};
    const extractKeys = (fieldList) => {
      fieldList.forEach((f) => {
        if (f.groupLabel) {
          extractKeys(f.fields);
        } else {
          initialState[f.key] = "";
        }
      });
    };
    extractKeys(fields);

    const arr = Array(COLUMN_COUNT)
      .fill(0)
      .map((_, i) => ({
        ...initialState,
        ...(columnDefaults[i] || {}),
      }));

    // Autofill cho cột thẩm định
    if (autofill) {
      if (autofill.address) arr[0]["address"] = autofill.address;
      if (autofill.ward) arr[0]["ward"] = autofill.ward;
      if (autofill.district) arr[0]["district"] = autofill.district;
      if (autofill.province) arr[0]["province"] = autofill.province;
      if (autofill.number) arr[0]["number"] = autofill.number;
      if (autofill.wgs84) arr[0]["wgs84"] = autofill.wgs84;
      if (autofill.area) arr[0]["area"] = autofill.area;
    }

    // Copy dữ liệu từ cột thẩm định sang cột AI nếu có sẵn, trừ trường 'source' và các trường *_ratio
    Object.keys(arr[0]).forEach((key) => {
      if (key === "source") return; // KHÔNG copy trường nguồn tham khảo
      // KHÔNG copy các trường *_ratio sang cột AI
      if (key.endsWith('_ratio')) return;
      // Nếu là bảng giá trị tài sản và key là AI thì không copy
      if (arr[0][key] && !(aiKeys && aiKeys.includes(key)))
        arr[1][key] = arr[0][key];
    });

    return arr;
  });

  const setField = (col, key, value) => {
    setData((prev) =>
      prev.map((row, idx) => {
        // Nếu đang nhập ở cột thẩm định (col === 0), cập nhật luôn cột AI (idx === 1)
        // Nếu là bảng giá trị tài sản và key là AI thì không copy
        if (idx === col) return { ...row, [key]: value };
        if (col === 0 && idx === 1 && !(aiKeys && aiKeys.includes(key)) && key !== "source")
          return { ...row, [key]: value };
        return row;
      })
    );
  };

  return [data, setField];
}

export default function PropertyForm() {
  const location = useLocation();
  const autofill = location.state?.autofill;
  const navigate = useNavigate();

  const [general, setGeneralField] = useTableState(
    GENERAL_FIELDS,
    autofill,
    sampleCompareData
  );
  const [value, setValueField] = useTableState(
    VALUE_FIELDS,
    undefined,
    sampleCompareData,
    AI_VALUE_KEYS
  );
  const [adjust, setAdjustField] = useTableState(
    ADJUST_FIELDS,
    undefined,
    sampleCompareData,
    AI_ADJUST_KEYS
  );
  const [final, setFinalField] = useTableState(
    FINAL_FIELDS,
    undefined,
    sampleCompareData
  );

  const [isSaving, setIsSaving] = useState(false);

  // --- Khôi phục lại các state và hàm cho AI ---
  const [isLoading, setIsLoading] = useState(false);
  const [currentFillIndex, setCurrentFillIndex] = useState(-1);
  const [loadingStep, setLoadingStep] = useState("");
  const [isAIEstimated, setIsAIEstimated] = useState(false);

  // --- Khôi phục lại hàm AI định giá với loading effect ---
  async function handleAIValuation() {
    if (isLoading) return;

    setIsLoading(true);
    setCurrentFillIndex(-1);
    setIsAIEstimated(false);

    // Các bước loading
    const loadingSteps = [
      "Đang khởi tạo mô hình AI...",
      "Đang phân tích thông tin tài sản...",
      "Đang thu thập dữ liệu thị trường...",
      "Đang so sánh với các tài sản tương tự...",
      "Đang tính toán các hệ số điều chỉnh...",
      "Đang xử lý dữ liệu địa lý...",
      "Đang áp dụng thuật toán định giá AI...",
      "Đang tính toán các thông số kỹ thuật...",
      "Đang hoàn thiện kết quả...",
    ];

    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(loadingSteps[i]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    setLoadingStep("Đang điền dữ liệu vào báo cáo...");

    // Lấy đúng setter nếu là mảng
    const setValueFieldFn = Array.isArray(setValueField) ? setValueField[1] : setValueField;
    const setAdjustFieldFn = Array.isArray(setAdjustField) ? setAdjustField[1] : setAdjustField;
    const setFinalFieldFn = Array.isArray(setFinalField) ? setFinalField[1] : setFinalField;

    // Fill các trường value cho cột AI (col 1)
    Object.keys(value[1]).forEach((key) => {
      // Nếu là trường land_unit_price thì lấy trung bình 3 cột TS so sánh
      if (key === 'land_unit_price') {
        const v2 = value[2][key];
        const v3 = value[3][key];
        const v4 = value[4][key];
        if (isNumberValue(v2) && isNumberValue(v3) && isNumberValue(v4)) {
          const n2 = parseFloat((v2 + '').replace(/[^\d.-]/g, ''));
          const n3 = parseFloat((v3 + '').replace(/[^\d.-]/g, ''));
          const n4 = parseFloat((v4 + '').replace(/[^\d.-]/g, ''));
          if (!isNaN(n2) && !isNaN(n3) && !isNaN(n4)) {
            const avg = ((n2 + n3 + n4) / 3).toFixed(2);
            setValueFieldFn(1, key, avg);
          }
        }
        return;
      }
      // Nếu là trường offer_price thì lấy trung bình 3 cột TS so sánh
      // if (key === 'offer_price') {
      //   const v2 = value[2][key];
      //   const v3 = value[3][key];
      //   const v4 = value[4][key];
      //   if (isNumberValue(v2) && isNumberValue(v3) && isNumberValue(v4)) {
      //     const n2 = parseFloat((v2 + '').replace(/[^\d.-]/g, ''));
      //     const n3 = parseFloat((v3 + '').replace(/[^\d.-]/g, ''));
      //     const n4 = parseFloat((v4 + '').replace(/[^\d.-]/g, ''));
      //     if (!isNaN(n2) && !isNaN(n3) && !isNaN(n4)) {
      //       const avg = ((n2 + n3 + n4) / 3).toFixed(0);
      //       setValueFieldFn(1, key, avg);
      //     }
      //   }
      //   return;
      // }
      // Các trường khác vẫn lấy từ sampleAIData nếu có
      // Xóa mọi logic sử dụng AI_DATA trong handleAIValuation và các nơi khác
    });

    // Fill các trường *_ratio trong adjust cho cột AI (col 1) là trung bình 3 cột TS so sánh
    Object.keys(adjust[1]).forEach((key) => {
      if (key.endsWith('_ratio')) {
        const v2 = adjust[2][key];
        const v3 = adjust[3][key];
        const v4 = adjust[4][key];
        if (isNumberValue(v2) && isNumberValue(v3) && isNumberValue(v4)) {
          const n2 = parseFloat((v2 + '').replace('%','').replace(',','.'));
          const n3 = parseFloat((v3 + '').replace('%','').replace(',','.'));
          const n4 = parseFloat((v4 + '').replace('%','').replace(',','.'));
          if (!isNaN(n2) && !isNaN(n3) && !isNaN(n4)) {
            const avg = ((n2 + n3 + n4) / 3).toFixed(2);
            setAdjustFieldFn(1, key, avg + (v2.includes('%') || v3.includes('%') || v4.includes('%') ? '%' : ''));
          }
        }
        return;
      }
      // Các trường khác vẫn lấy từ sampleAIData nếu có
      // Xóa mọi logic sử dụng AI_DATA trong handleAIValuation và các nơi khác
    });

    // Fill dữ liệu mẫu vào bảng cuối (cột 0 và 1)
    Object.entries(sampleFinalDataTD).forEach(([key, value]) => {
      setFinalFieldFn(0, key, value);
    });
    Object.entries(sampleFinalDataAI).forEach(([key, value]) => {
      setFinalFieldFn(1, key, value);
    });

    setCurrentFillIndex(-1);
    setLoadingStep("");
    setIsLoading(false);
    setIsAIEstimated(true);
  }

  const handleSaveReport = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate("/report-summary");
    }, 3000);
  };

  const renderTable = (fields, data, setField, title, valueData) => {
    const isFinalTable = title === "KẾT QUẢ & GHI CHÚ";
  
    // Hàm kiểm tra giá trị là số (giống logic cũ)
    function isNumberValue(val) {
      if (!val) return false;
      return /^-?[\d.,/%\s]+$/.test(val.trim());
    }

    // Hàm format số có dấu phẩy
    function formatNumber(val) {
      if (!val) return '';
      // Xóa dấu phẩy cũ, chỉ lấy phần số
      const cleaned = (val + '').replace(/,/g, '');
      if (!/^[-]?\d+(\.\d+)?$/.test(cleaned)) return val;
      const [intPart, decimalPart] = cleaned.split('.');
      const intFormatted = parseInt(intPart, 10).toLocaleString('en-US');
      return decimalPart !== undefined ? `${intFormatted}.${decimalPart}` : intFormatted;
    }
 
    // Hàm render một ô (<td>) với logic input/textarea bên trong
    const renderCell = (field, col, colIdx) => {
      // Logic cho textarea và input đã được hợp nhất tại đây để tránh lặp code
      const isTextarea = field.key === "land_area_note" && title === "GIÁ TRỊ TÀI SẢN";
      const isReadOnly = isFinalTable;
      const value = col[field.key] || "";
      // Tự động tính trung bình cho các trường *_ratio của cột Định giá AI
      const isAdjustRatio = title === "CÁC TIÊU CHÍ" && field.key.endsWith('_ratio');
      let displayValue = value;
      if (isAdjustRatio && colIdx === 1) {
        if (isAIEstimated) {
          // Lấy land_unit_price của Định giá AI
          const landUnitPriceAI = valueData && valueData[1] && valueData[1].land_unit_price;
          if (isNumberValue(landUnitPriceAI)) {
            displayValue = '0';
          } else {
            displayValue = '';
          }
        } else {
          displayValue = '';
        }
      }
      // Tự động tính *_adjust và *_price cho cột Định giá AI (colIdx === 1) khi đã định giá
      const isAdjustOrPrice = title === "CÁC TIÊU CHÍ" && (field.key.endsWith('_adjust') || field.key.endsWith('_price'));
      if (isAdjustOrPrice && colIdx === 1) {
        if (isAIEstimated) {
          // Lấy prefix
          const prefix = field.key.replace(/_(adjust|price)$/, '');
          const ratioKey = `${prefix}_ratio`;
          const landUnitPriceAI = valueData && valueData[1] && valueData[1].land_unit_price;
          const ratioVal = adjust[1][ratioKey];
          if (isNumberValue(landUnitPriceAI)) {
            const v = parseFloat((landUnitPriceAI + '').replace(/,/g, ''));
            const r = parseFloat((ratioVal + '').replace('%','').replace(',','.'));
            if (!isNaN(v) && !isNaN(r)) {
              if (field.key.endsWith('_adjust')) {
                displayValue = (v * r / 100).toFixed(0);
              } else if (field.key.endsWith('_price')) {
                // Giá sau điều chỉnh = land_unit_price - mức điều chỉnh
                const adjustVal = v * r / 100;
                displayValue = (v - adjustVal).toFixed(0);
              }
            } else {
              // Nếu không có tỷ lệ, mức điều chỉnh là 0, giá sau điều chỉnh là land_unit_price
              if (field.key.endsWith('_adjust')) displayValue = '0';
              if (field.key.endsWith('_price')) displayValue = v.toFixed(0);
            }
          } else {
            displayValue = '';
          }
        } else {
          displayValue = '';
        }
      }
      // Format số cho các trường *_adjust và *_price trong bảng CÁC TIÊU CHÍ
      if (isAdjustOrPrice && displayValue) {
        displayValue = formatNumber(displayValue);
      }
      // Format số cho trường land_unit_price của cột Định giá AI
      if (field.key === 'land_unit_price' && colIdx === 1 && displayValue) {
        displayValue = formatNumber(displayValue);
      }

      // Sau khi xác định displayValue, mới xác định alignClass
      const alignClass = isNumberValue(displayValue) ? "text-right" : "text-left";
      const classNames = isReadOnly
        ? `w-full px-2 py-1 text-sm rounded-md border-none bg-input-readonly cursor-not-allowed text-black placeholder:text-[13px] placeholder:opacity-90 placeholder:text-gray-700 ${alignClass}`
        : `w-full px-2 py-1 text-sm rounded-md border-none bg-white text-black font-normal placeholder:text-[13px] placeholder:text-gray-700 placeholder:opacity-90 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-300 ${alignClass}`;
      const props = {
        className: classNames,
        value: displayValue,
        onChange: (e) => setField(colIdx, field.key, e.target.value),
        readOnly: isReadOnly || (isAdjustRatio && colIdx === 1),
      };
      return isTextarea ? <textarea {...props} rows={2} /> : <input {...props} />;
    };
  
    return (
      <>
        <Header title="BẢNG SO SÁNH TÀI SẢN ĐỊNH GIÁ" />
        <div className="overflow-x-auto w-full mb-8">
          <div className="bg-card rounded-lg shadow-form-md border border-border overflow-hidden">
            <table className="min-w-[900px] w-full table-fixed">
              {/* a a a a a a a  Phần thead và colgroup không thay đổi a a a a a a a */}
              <colgroup>
                <col style={{ width: "110px" }} />
                <col style={{ width: "110px" }} />
                {Array(COLUMN_COUNT)
                  .fill(0)
                  .map((_, idx) => (
                    <col
                      key={idx}
                      style={{
                        width: `${Math.max(
                          120,
                          Math.floor((1000 - 400) / COLUMN_COUNT)
                        )}px`,
                      }}
                    />
                  ))}
              </colgroup>
              <thead>
                <tr className="bg-table-header border-b border-border">
                  <th colSpan={2} className="p-4 bg-section-title text-left font-semibold text-sm border-r border-border">
                    {title}
                  </th>
                  {COLUMN_LABELS.map((label, idx) => (
                    <th key={idx} className="p-4 bg-table-header text-center font-semibold text-sm border-l border-border">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* a a a a a a a Phần tbody được cập nhật a a a a a a a */}
              <tbody>
                {fields.map((fieldOrGroup) => {
                  // Xử lý các hàng có nhóm (groupLabel)
                  if (fieldOrGroup.groupLabel) {
                    const group = fieldOrGroup;
                    return (
                      <Fragment key={group.groupLabel}>
                        {group.fields.map((subField, index) => (
                          <tr key={subField.key} className="border-b border-border">
                            {index === 0 && (
                              <td className="p-3 bg-group-header font-medium text-sm text-foreground text-center align-middle border-r border-border" rowSpan={group.fields.length}>
                                {group.groupLabel}
                              </td>
                            )}
                            <td className="p-3 bg-table-accent font-medium text-sm text-foreground border-r border-border">
                              {subField.label}
                            </td>
                            {data.map((col, colIdx) => (
                              <td key={colIdx} className="p-2 border-r border-border bg-white">
                                {renderCell(subField, col, colIdx)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    );
                  }
  
                  // Xử lý các hàng thường (không có nhóm)
                  const field = fieldOrGroup;
                  // ✅ KIỂM TRA ĐIỀU KIỆN GỘP Ô TẠI ĐÂY
                  const isTargetRowForMerging = isFinalTable && (field.key === 'avg_guide_price' || field.key === 'final_price');
                  // Hàm kiểm tra số cho ô gộp
                  function isNumberValue(val) {
                    if (!val) return false;
                    return /^-?[\d.,/%\s]+$/.test(val.trim());
                  }
                  return (
                    <tr key={field.key} className="border-b border-border">
                      <td colSpan={2} className="p-3 bg-table-accent font-medium text-sm text-foreground border-r border-border">
                        {field.label}
                      </td>
                      {data.map((col, colIdx) => {
                        // ✅ ÁP DỤNG LOGIC GỘP Ô
                        if (isTargetRowForMerging) {
                          if (colIdx === 2) { // Tại cột "TS SO SÁNH 1"
                            const v = data[2]?.[field.key] || "";
                            const alignClass = isNumberValue(v) ? "text-right" : "text-left";
                            return (
                              <td key={colIdx} colSpan={3} className={`p-2 border-r border-border bg-input-readonly align-middle`}>
                                <input
                                  className={`w-full px-2 py-1 text-sm rounded-md border-none bg-input-readonly cursor-not-allowed text-black placeholder:text-[13px] placeholder:opacity-90 placeholder:text-gray-700 ${alignClass}`}
                                  value={v}
                                  readOnly
                                />
                              </td>
                            );
                          }
                          if (colIdx > 2) { // Bỏ qua 2 cột còn lại
                            return null;
                          }
                        }
  
                        // Render các ô khác như bình thường
                        return (
                          <td key={colIdx} className={isFinalTable ? "p-2 border-r border-border bg-input-readonly" : "p-2 border-r border-border bg-white"}>
                            {renderCell(field, col, colIdx)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-form-background p-4 md:p-12 overflow-x-auto">
      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay loadingStep={loadingStep} />}
      {isSaving && (
        <LoadingOverlay loadingStep="Đang tiến hành lưu báo cáo..." />
      )}
      <div className="max-w-[1800px] mx-auto mt-14">
        <div className="space-y-8 ">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                I
              </span>
              ĐIỀU CHỈNH ĐỊNH LƯỢNG
            </h2>
             <div className="ml-3">
            {renderTable(
              GENERAL_FIELDS,
              general,
              setGeneralField,
              "THÔNG TIN CHUNG",
              value
            )}
            {renderTable(
              VALUE_FIELDS,
              value,
              setValueField,
              "GIÁ TRỊ TÀI SẢN",
              value
            )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                II
              </span>
              BẢNG ĐIỀU CHỈNH VÀ THÔNG SỐ KỸ THUẬT
            </h2>
            <div className="ml-3">
            {renderTable(
              ADJUST_FIELDS,
              adjust,
              setAdjustField,
              "CÁC TIÊU CHÍ",
              value
            )}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center">
              <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                III
              </span>
              KẾT QUẢ & GHI CHÚ
            </h2>
             <div className="ml-3">
            {renderTable(
              FINAL_FIELDS,
              final,
              setFinalField,
              "KẾT QUẢ & GHI CHÚ",
              value
            )}
            </div>
          </section>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12 mb-8">
          <button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-8 py-3 text-base shadow-form transition-all duration-200 hover:shadow-form-md hover:-translate-y-0.5 min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAIValuation}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                Đang định giá...
              </div>
            ) : (
              "Định giá"
            )}
          </button>
          <button
            className="bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold rounded-lg px-8 py-3 text-base shadow-form transition-all duration-200 hover:shadow-form-md hover:-translate-y-0.5 min-w-[140px] border border-border"
            onClick={handleSaveReport}
            disabled={isSaving}
          >
            {isSaving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin"></div>
                Đang lưu báo cáo...
              </div>
            ) : (
              "Lưu báo cáo"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
