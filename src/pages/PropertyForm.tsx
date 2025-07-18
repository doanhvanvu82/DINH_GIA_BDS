import { useState, Fragment } from "react"; // Thêm Fragment
import { useLocation, useNavigate } from "react-router-dom";

const COLUMN_COUNT = 5; // TS thẩm định + Định giá AI + 3 TS so sánh
const COLUMN_LABELS = [
  "TS THẨM ĐỊNH",
  "Định giá AI",
  "TS SO SÁNH 1",
  "TS SO SÁNH 2",
  "TS SO SÁNH 3"
];

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
    ]
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
    ]
  },
  {
    groupLabel: "Mục đích sử dụng",
    fields: [
      { label: "Thông số", key: "usage_purpose_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "usage_purpose_ratio" },
      { label: "Mức điều chỉnh", key: "usage_purpose_adjust" },
      { label: "Giá sau điều chỉnh", key: "usage_purpose_price" },
    ]
  },
  {
    groupLabel: "Diện tích(m2)",
    fields: [
      { label: "Thông số", key: "area_m2_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "area_m2_ratio" },
      { label: "Mức điều chỉnh", key: "area_m2_adjust" },
      { label: "Giá sau điều chỉnh", key: "area_m2_price" },
    ]
  },
  {
    groupLabel: "Mặt tiền(m)",
    fields: [
      { label: "Thông số", key: "frontage_m_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "frontage_m_ratio" },
      { label: "Mức điều chỉnh", key: "frontage_m_adjust" },
      { label: "Giá sau điều chỉnh", key: "frontage_m_price" },
    ]
  },
  {
    groupLabel: "Hình dạng",
    fields: [
      { label: "Thông số", key: "shape_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "shape_ratio" },
      { label: "Mức điều chỉnh", key: "shape_adjust" },
      { label: "Giá sau điều chỉnh", key: "shape_price" },
    ]
  },
  {
    groupLabel: "Số mặt tiền",
    fields: [
      { label: "Thông số", key: "frontage_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "frontage_ratio" },
      { label: "Mức điều chỉnh", key: "frontage_adjust" },
      { label: "Giá sau điều chỉnh", key: "frontage_price" },
    ]
  },
  {
    groupLabel: "Độ rộng ngõ/ngách nhỏ nhất (m)",
    fields: [
      { label: "Thông số", key: "alley_width_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "alley_width_ratio" },
      { label: "Mức điều chỉnh", key: "alley_width_adjust" },
      { label: "Giá sau điều chỉnh", key: "alley_width_price" },
    ]
  },
  {
    groupLabel: "Yếu tố tâm linh",
    fields: [
      { label: "Thông số", key: "spiritual_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "spiritual_ratio" },
      { label: "Mức điều chỉnh", key: "spiritual_adjust" },
      { label: "Giá sau điều chỉnh", key: "spiritual_price" },
    ]
  },
  {
    groupLabel: "Bất lợi khác",
    fields: [
      { label: "Thông số", key: "other_disadvantage_value" },
      { label: "Tỷ lệ điều chỉnh(%)", key: "other_disadvantage_ratio" },
      { label: "Mức điều chỉnh", key: "other_disadvantage_adjust" },
      { label: "Giá sau điều chỉnh", key: "other_disadvantage_price" },
    ]
  },
];
const FINAL_FIELDS = [
  { label: "Mức giá chỉ dẫn", key: "guide_price" },
  { label: "Giá trị trung bình của mức giá chỉ dẫn(đồng)", key: "avg_guide_price" },
  { label: "Mức độ chênh lệch với giá trị trung bình của các mức chỉ dẫn(%)", key: "diff_avg_guide" },
  { label: "Tổng giá trị điều chỉnh gộp (đồng)", key: "total_adjust" },
  { label: "Số lần điều chỉnh", key: "adjust_count" },
  { label: "Biên độ điều chỉnh", key: "adjust_range" },
  { label: "Giá trị điều chỉnh thuần(đồng)", key: "net_adjust" },
  { label: "Xác định mức giá cho tài sản thẩm định", key: "final_price" },
  { label: "Ghi chú", key: "note" },
];

function useTableState(fields, autofill) {
  const [data, setData] = useState(() => {
    const initialState = {};
    const extractKeys = (fieldList) => {
      fieldList.forEach(f => {
        if (f.groupLabel) {
          extractKeys(f.fields);
        } else {
          initialState[f.key] = "";
        }
      });
    };
    extractKeys(fields);
    // Nếu có autofill, điền vào cột đầu tiên (TS Thẩm định)
    const arr = Array(COLUMN_COUNT).fill(0).map(() => ({ ...initialState }));
    if (autofill) {
      if (autofill.address) arr[0]["address"] = autofill.address;
      if (autofill.ward) arr[0]["ward"] = autofill.ward;
      if (autofill.district) arr[0]["district"] = autofill.district;
      if (autofill.province) arr[0]["province"] = autofill.province;
      if (autofill.number) arr[0]["number"] = autofill.number;
      if (autofill.wgs84) arr[0]["wgs84"] = autofill.wgs84;
      if (autofill.area) arr[0]["area"] = autofill.area;
    }
    return arr;
  });

  const setField = (col, key, value) => {
    setData(prev => prev.map((row, idx) => idx === col ? { ...row, [key]: value } : row));
  };

  return [data, setField];
}

export default function PropertyForm() {
  const location = useLocation();
  const autofill = location.state?.autofill;
  const navigate = useNavigate();
  const [general, setGeneral] = useTableState(GENERAL_FIELDS, autofill);
  const [value, setValue] = useTableState(VALUE_FIELDS, undefined);
  const [adjust, setAdjust] = useTableState(ADJUST_FIELDS, undefined);
  const [final, setFinal] = useTableState(FINAL_FIELDS, undefined);

  // Helper render bảng đã được cập nhật
  const renderTable = (fields, data, setField, title) => (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[900px] w-full table-fixed border mb-8 bg-white shadow rounded-xl">
        <colgroup>
          <col style={{ width: '100px' }} />
          <col style={{ width: '140px' }} />
          {Array(COLUMN_COUNT).fill(0).map((_, idx) => (
            <col key={idx} style={{ width: `${Math.max(120, Math.floor((1000 - 400) / COLUMN_COUNT))}px` }} />
          ))}
        </colgroup>
        <thead>
          <tr className="bg-blue-100">
            {/* Cập nhật: Tiêu đề chính chiếm 2 cột */}
            <th colSpan={2} className="p-2 border text-left">{title}</th>
            {COLUMN_LABELS.map((label, idx) => (
              <th key={idx} className="p-2 border text-center font-semibold">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((fieldOrGroup) => {
            // --- XỬ LÝ NHÓM ---
            if (fieldOrGroup.groupLabel) {
              const group = fieldOrGroup;
              return (
                <Fragment key={group.groupLabel}>
                  {group.fields.map((subField, index) => (
                    <tr key={subField.key}>
                      {/* Chỉ render ô label nhóm ở hàng đầu tiên */}
                      {index === 0 && (
                        <td
                          className="p-2 border bg-blue-50 font-semibold text-sm text-center align-middle"
                          rowSpan={group.fields.length}
                          style={{ minWidth: 120 }}
                        >
                          {group.groupLabel}
                        </td>
                      )}
                      {/* Label của từng trường con */}
                      <td className="p-2 border bg-blue-50 font-medium text-sm" style={{ minWidth: 120 }}>{subField.label}</td>
                      {/* Các ô input */}
                      {data.map((col, colIdx) => (
                        <td key={colIdx} className="p-1 border">
                          <input
                            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                            value={col[subField.key]}
                            onChange={e => setField(colIdx, subField.key, e.target.value)}
                            placeholder={subField.label}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              );
            }

            // --- XỬ LÝ TRƯỜNG ĐƠN LẺ ---
            const field = fieldOrGroup;
            return (
              <tr key={field.key}>
                {/* Ô label chính chiếm 2 cột */}
                <td colSpan={2} className="p-2 border bg-blue-50 font-medium text-sm" style={{ minWidth: 220 }}>{field.label}</td>
                {data.map((col, colIdx) => (
                  <td key={colIdx} className="p-1 border">
                    <input
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                      value={col[field.key]}
                      onChange={e => setField(colIdx, field.key, e.target.value)}
                      placeholder={field.label}
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 p-2 md:p-6 overflow-x-auto">
      <div className="max-w-[1800px] mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">BẢNG SO SÁNH TÀI SẢN ĐỊNH GIÁ</h1>
        <h2 className="font-bold">I. ĐIỀU CHỈNH ĐỊNH LƯỢNG</h2>
        {renderTable(GENERAL_FIELDS, general, setGeneral, "Thông tin chung")}
        {renderTable(VALUE_FIELDS, value, setValue, "Giá trị tài sản")}
        <h2 className="font-bold">II. BẢNG ĐIỀU CHỈNH VÀ THÔNG SỐ KỸ THUẬT</h2>
        {renderTable(ADJUST_FIELDS, adjust, setAdjust, "CÁC TIÊU CHÍ")}
        {renderTable(FINAL_FIELDS, final, setFinal, "Kết quả & ghi chú")}
        {/* Nút Định giá và Lưu báo cáo */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-3 text-lg shadow transition">Định giá</button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-8 py-3 text-lg shadow transition"
            onClick={() => navigate('/report-summary')}
          >
            Lưu báo cáo
          </button>
        </div>
      </div>
      </div>
  );
} 