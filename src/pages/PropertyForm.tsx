import { useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sampleCompareData from "../data/sampleCompareData";
import AI_DATA from "../data/sampleAIData";
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

// Sửa useTableState cho bảng giá trị tài sản
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

    // Copy dữ liệu từ cột thẩm định sang cột AI nếu có sẵn
    Object.keys(arr[0]).forEach((key) => {
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
        if (col === 0 && idx === 1 && !(aiKeys && aiKeys.includes(key)))
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

  // Destructure để lấy setter functions từ useTableState
  const setGeneralFieldFn = Array.isArray(setGeneralField)
    ? setGeneralField[1]
    : setGeneralField;
  const setValueFieldFn = Array.isArray(setValueField)
    ? setValueField[1]
    : setValueField;
  const setAdjustFieldFn = Array.isArray(setAdjustField)
    ? setAdjustField[1]
    : setAdjustField;

  const [isLoading, setIsLoading] = useState(false);
  const [currentFillIndex, setCurrentFillIndex] = useState(-1);
  const [loadingStep, setLoadingStep] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const renderTable = (fields, data, setField, title, valueData) => {
    const isFinalTable = title === "Kết quả & ghi chú";
    return (
      <>
        <Header title="BẢNG SO SÁNH TÀI SẢN ĐỊNH GIÁ" />
        <div className="overflow-x-auto w-full mb-8">
          <div className="bg-card rounded-lg shadow-form-md border border-border overflow-hidden">
            <table className="min-w-[900px] w-full table-fixed">
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
                  <th
                    colSpan={2}
                    className="p-4 bg-section-title text-left font-semibold text-sm border-r border-border"
                  >
                    {title}
                  </th>
                  {COLUMN_LABELS.map((label, idx) => (
                    <th
                      key={idx}
                      className="p-4 bg-table-header text-center font-semibold text-sm border-l border-border"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fields.map((fieldOrGroup) => {
                  if (fieldOrGroup.groupLabel) {
                    const group = fieldOrGroup;
                    return (
                      <Fragment key={group.groupLabel}>
                        {group.fields.map((subField, index) => (
                          <tr
                            key={subField.key}
                            className="border-b border-border"
                          >
                            {index === 0 && (
                              <td
                                className="p-3 bg-group-header font-medium text-sm text-foreground text-center align-middle border-r border-border"
                                rowSpan={group.fields.length}
                              >
                                {group.groupLabel}
                              </td>
                            )}
                            <td
                              className={`p-3 ${
                                [
                                  "Đất ở",
                                  "Giải thích",
                                  "Đất nông nghiệp",
                                  "Các loại đất khác",
                                  "Thông số",
                                  "Tỷ lệ điều chỉnh(%)",
                                  "Mức điều chỉnh",
                                  "Giá sau điều chỉnh",
                                ].includes(subField.label)
                                  ? "bg-table-special"
                                  : "bg-table-accent"
                              } font-medium text-sm text-foreground border-r border-border`}
                            >
                              {subField.label}
                            </td>
                            {data.map((col, colIdx) => {
                              const isValueField =
                                subField.key.endsWith("_value");
                              const isRatioField =
                                subField.key.endsWith("_ratio");
                              const isAdjustField =
                                subField.key.endsWith("_adjust");
                              const isPriceField =
                                subField.key.endsWith("_price");

                              // Lấy prefix để xác định các trường cùng tiêu chí
                              const prefix = subField.key.replace(
                                /_(value|ratio|adjust|price)$/,
                                ""
                              );
                              const valueKey = `${prefix}_value`;
                              const ratioKey = `${prefix}_ratio`;
                              const adjustKey = `${prefix}_adjust`;
                              const priceKey = `${prefix}_price`;

                              let value = col[subField.key] || "";
                              let readOnly = false;
                              let onChange = (e) =>
                                setField(colIdx, subField.key, e.target.value);

                              // Trường Thông số cột AI: readonly, luôn copy từ cột thẩm định
                              if (isValueField && colIdx === 1) {
                                value = data[0][subField.key] || "";
                                readOnly = true;
                                onChange = undefined;
                              }

                              // Trường mức điều chỉnh và giá sau điều chỉnh: readonly
                              if (isAdjustField || isPriceField) {
                                readOnly = true;
                                onChange = undefined;
                                // Lấy giá trị từ bảng VALUE_FIELDS cùng cột
                                const offerPriceVal = valueData
                                  ? valueData[colIdx]?.offer_price
                                  : "";
                                const valueVal = col[valueKey]; // Thông số
                                const ratioVal = col[ratioKey];
                                if (offerPriceVal && valueVal && ratioVal) {
                                  const mock = getMockAdjustAndPrice(
                                    ratioVal,
                                    offerPriceVal
                                  );
                                  if (isAdjustField) value = mock.adjust;
                                  if (isPriceField) value = mock.price;
                                }
                              }

                              return (
                                <td
                                  key={colIdx}
                                  className={
                                    isFinalTable
                                      ? "p-2 border-r border-border bg-gray-50"
                                      : `p-2 border-r border-border bg-white ${
                                          colIdx === 1 ||
                                          colIdx === 2 ||
                                          colIdx === 3
                                            ? "bg-input-readonly"
                                            : ""
                                        }`
                                  }
                                >
                                  <input
                                    className={
                                      isFinalTable
                                        ? "w-full px-2 py-1 text-sm rounded-md border-none bg-input-readonly cursor-not-allowed text-black " +
                                          (isNumberValue(value)
                                            ? "text-right"
                                            : "text-left") +
                                          " placeholder:text-[13px] placeholder:opacity-90 placeholder:text-gray-700"
                                        : `w-full px-2 py-1 text-sm rounded-md border-none bg-white text-black font-normal 
                    placeholder:text-[13px] placeholder:text-gray-700 placeholder:opacity-90 
                    placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-300 ${
                      colIdx === 1 || colIdx === 2 || colIdx === 3
                        ? "cursor-not-allowed "
                        : ""
                    } ${
                                            colIdx === 1 &&
                                            isLoading &&
                                            currentFillIndex >= 0
                                              ? "animate-pulse bg-primary/10"
                                              : ""
                                          } ${
                                            isNumberValue(value)
                                              ? "text-right"
                                              : "text-left"
                                          }`
                                    }
                                    value={
                                      isNumberValue(value)
                                        ? formatNumber(value)
                                        : value
                                    }
                                    onChange={onChange}
                                    placeholder={subField.label}
                                    readOnly={readOnly}
                                  />
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </Fragment>
                    );
                  }

                  // Field thường
                  return (
                    <tr
                      key={fieldOrGroup.key}
                      className="border-b border-border"
                    >
                      <td
                        colSpan={2}
                        className="p-3 bg-table-accent font-medium text-sm text-foreground border-r border-border"
                      >
                        {fieldOrGroup.label}
                      </td>
                      {data.map((col, colIdx) => (
                        <td
                          key={colIdx}
                          className={
                            isFinalTable
                              ? "p-2 border-r border-border bg-input-readonly"
                              : "p-2 border-r border-border bg-white"
                          }
                        >
                          <input
                            className={
                              isFinalTable
                                ? "w-full px-2 py-1 text-sm rounded-md border-none bg-input-readonly cursor-not-allowed text-black " +
                                  (isNumberValue(col[fieldOrGroup.key] || "")
                                    ? "text-right"
                                    : "text-left") +
                                  " placeholder:text-[13px] placeholder:opacity-90 placeholder:text-gray-700"
                                : `w-full px-2 py-1 text-sm rounded-md border-none bg-white text-black font-normal 
        placeholder:text-[13px] placeholder:text-gray-700 placeholder:opacity-90 
        placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-300 ${
          colIdx === 1 || colIdx === 2 || colIdx === 3
            ? "cursor-not-allowed "
            : ""
        } ${
                                    colIdx === 1 &&
                                    isLoading &&
                                    currentFillIndex >= 0
                                      ? "animate-pulse bg-primary/10"
                                      : ""
                                  } ${
                                    isNumberValue(col[fieldOrGroup.key] || "")
                                      ? "text-right"
                                      : "text-left"
                                  }`
                            }
                            value={
                              fieldOrGroup.key === "wgs84"
                                ? col[fieldOrGroup.key] || "" // Không format, hiển thị nguyên gốc
                                : isNumberValue(col[fieldOrGroup.key] || "")
                                ? formatNumber(col[fieldOrGroup.key] || "")
                                : col[fieldOrGroup.key] || ""
                            }
                            onChange={
                              isFinalTable
                                ? undefined
                                : (e) =>
                                    setField(
                                      colIdx,
                                      fieldOrGroup.key,
                                      e.target.value
                                    )
                            }
                            placeholder={fieldOrGroup.label}
                            readOnly={
                              isFinalTable
                                ? true
                                : colIdx === 1 || colIdx === 2 || colIdx === 3
                            }
                          />
                        </td>
                      ))}
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

  // Hàm AI định giá với loading effect
  async function handleAIValuation() {
    if (isLoading) return;

    setIsLoading(true);
    setCurrentFillIndex(-1);

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

    // Giai đoạn 1: Loading với các bước
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(loadingSteps[i]);
      await new Promise((resolve) => setTimeout(resolve, 1900)); // tăng từ 800 lên 1400ms
    }

    // Giai đoạn 2: Fill dữ liệu từ từ
    setLoadingStep("Đang điền dữ liệu vào báo cáo...");

    // Tạo danh sách tất cả các trường cần fill (trừ bảng cuối)
    const allFields = [
      ...Object.keys(AI_DATA.general).map((key) => ({
        table: "general",
        key,
        value: AI_DATA.general[key],
      })),
      ...Object.keys(AI_DATA.value).map((key) => ({
        table: "value",
        key,
        value: AI_DATA.value[key],
      })),
      ...Object.keys(AI_DATA.adjust).map((key) => ({
        table: "adjust",
        key,
        value: AI_DATA.adjust[key],
      })),
    ];

    // Fill từng trường một cách tuần tự
    for (let i = 0; i < allFields.length; i++) {
      const field = allFields[i];
      setCurrentFillIndex(i);

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Chỉ fill bảng value và adjust, KHÔNG fill bảng general
      if (field.table === "value") {
        setValueFieldFn(1, field.key, field.value);
      } else if (field.table === "adjust") {
        setAdjustFieldFn(1, field.key, field.value);
      }
    }

    // Fill dữ liệu mẫu vào bảng cuối (cột 0 và 1)
    Object.entries(sampleFinalDataTD).forEach(([key, value]) => {
      setFinalField(0, key, value);
    });
    Object.entries(sampleFinalDataAI).forEach(([key, value]) => {
      setFinalField(1, key, value);
    });

    setCurrentFillIndex(-1);
    setLoadingStep("");
    setIsLoading(false);
  }

  const handleSaveReport = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      navigate("/report-summary");
    }, 3000);
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
              "THÔNG TIN CHUNG"
            )}
            {renderTable(VALUE_FIELDS, value, setValueField, "GIÁ TRỊ TÀI SẢN")}
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
            {renderTable(FINAL_FIELDS, final, () => {}, "KẾT QUẢ & GHI CHÚ")}
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

function formatNumber(val: string): string {
  if (!val) return "";

  // XÓA TOÀN BỘ dấu `,` NGƯỜI DÙNG NHẬP SAI
  const cleaned = val.replace(/,/g, "");

  // TÁCH PHẦN NGUYÊN và THẬP PHÂN
  const [intPartRaw, decimalPart] = cleaned.split(".");

  // KIỂM TRA DẤU ÂM
  const isNegative = intPartRaw.startsWith("-");
  const intPart = isNegative ? intPartRaw.slice(1) : intPartRaw;

  // NẾU PHẦN NGUYÊN KHÔNG PHẢI SỐ → trả nguyên gốc
  if (!/^\d+$/.test(intPart)) return val;

  // FORMAT CHUẨN bằng BigInt
  const intFormatted =
    (isNegative ? "-" : "") + BigInt(intPart).toLocaleString("en-US");

  // GHÉP LẠI KẾT QUẢ
  if (decimalPart !== undefined) {
    return `${intFormatted}.${decimalPart}`;
  } else if (val.endsWith(".")) {
    return `${intFormatted}.`;
  } else {
    return intFormatted;
  }
}

function getMockAdjustAndPrice(ratio: string, offerPrice: string) {
  // Chuyển về số
  const v = parseFloat(offerPrice.replace(/,/g, ""));
  const r = parseFloat(ratio.replace(/,/g, ""));

  // Nếu không phải số thì trả về rỗng
  if (isNaN(v) || isNaN(r)) return { adjust: "", price: "" };

  // Mức điều chỉnh = tỷ lệ điều chỉnh (%) * giá chào bán/chào mua / 100
  const adjust = ((r * v) / 100).toFixed(0);

  // Giá sau điều chỉnh = giá chào bán/chào mua - mức điều chỉnh
  const price = (v - parseFloat(adjust)).toFixed(0);

  return { adjust, price };
}
