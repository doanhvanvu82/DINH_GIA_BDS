import React, { useEffect, useState } from "react";
import {
  THONG_TIN_DINH_GIA_MAU,
  CO_SO_DINH_GIA,
  CAP_CHO,
  CHUYEN_NHUONG,
  HO_SO_PHAP_LY_KHAC,
  LICH_SU_DINH_GIA,
  TS_THAM_DINH_MAU,
  KQ_THAM_DINH_MAU,
  KET_QUA_TINH_TOAN_MAU,
} from "../data/reportSampleData";
import Header from "../components/Header";

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

export default function ReportSummary() {
    const [giaTri, setGiaTri] = useState("");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
    <Header title="LẬP BÁO CÁO ĐỊNH GIÁ" />
    <div className="w-full min-h-screen mt-8 bg-background p-6 md:p-8 overflow-x-auto">
      <div className="max-w-[1400px] mx-auto ">
        <div className="flex items-center mb-4 mt-6 pb-0  border-border">
          <span
            className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3"
            style={{ background: "#2563eb" }} // Tailwind blue-600
          >
            I
          </span>
          <h2 className="text-xl font-semibold text-foreground">
            THÔNG TIN KHÁCH HÀNG
          </h2>
        </div>
        {/* I. Thông tin khách hàng */}
        <section className="bg-card rounded-lg border border-border shadow-sm p-4 ml-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-2">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Đơn vị đề nghị
              </div>
              <input value={giaTri}
      onChange={e => {
        const raw = e.target.value.replace(/,/g, "");
        setGiaTri(formatNumber(raw));
      }} className="report-input" placeholder="Đơn vị đề nghị" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                CB gửi đề nghị
              </div>
              <input  className="report-input" placeholder="CB gửi đề nghị" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Số điện thoại
              </div>
              <input className="report-input" placeholder="Số điện thoại" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                CB phối hợp khảo sát
              </div>
              <input
                className="report-input"
                placeholder="CB phối hợp khảo sát"
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">SĐT</div>
              <input className="report-input" placeholder="SĐT" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tên khách hàng
              </div>
              <input className="report-input" placeholder="Tên khách hàng" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Mã tài sản</div>
              <input className="report-input" placeholder="Mã tài sản" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Số BCDG</div>
              <input className="report-input" placeholder="Số BCDG" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Mục đích định giá
              </div>
              <input className="report-input" placeholder="Mục đích định giá" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Danh mục hồ sơ
              </div>
              <button className="report-input bg-accent text-accent-foreground font-medium hover:bg-accent/80 transition-colors">
                Danh sách tài liệu đính kèm
              </button>
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Thông tin về tiến độ công việc
              </div>
              <input
                className="report-input"
                placeholder="Thông tin về tiến độ công việc"
              />
            </div>
          </div>
        </section>
        {/* II. Cơ sở định giá */}
<div className="flex items-center mb-4 mt-8 pb-0  border-border">
          <span
            className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3"
            style={{ background: "#2563eb" }} // Tailwind blue-600
          >
            II 
          </span>
          <h2 className="text-xl font-semibold text-foreground">
             CƠ SỞ ĐỊNH GIÁ
          </h2>
        </div>
        <section className="bg-card rounded-lg border border-border shadow-sm p-4 ml-3">
          <div className="mb-4 font-medium text-foreground">
            1. Hồ sơ pháp lý
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tình trạng pháp lý
              </div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.legalStatus)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Diễn giải (nếu có)
              </div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.explanation)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Hồ sơ pháp lý
              </div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.legalDoc)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Số hiệu</div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.docNumber)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Cấp ngày</div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.issueDate)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Số vào sổ</div>
              <input
                className="report-input"
                value={formatNumber(CO_SO_DINH_GIA.bookNumber)}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Đơn vị cấp</div>
              <input
                className="report-input"
                value={CO_SO_DINH_GIA.issuer}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Mã tài sản cũ (nếu có)
              </div>
              <input
                className="report-input"
                value={CO_SO_DINH_GIA.oldAssetCode}
                readOnly
              />
            </div>
          </div>
          {/* Cấp cho */}
          <div className="mb-4 font-medium text-foreground">Cấp cho</div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Loại khách hàng</th>
                  <th className="report-th">Mối quan hệ</th>
                  <th className="report-th">Ông/bà/Tên công ty</th>
                  <th className="report-th">Số CMND/Hộ chiếu/Giấy ĐKKD</th>
                  <th className="report-th">Hộ khẩu thường trú/Trụ sở</th>
                  <th className="report-th">Điện thoại (cần thiết)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.customerType}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.relation}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.name}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.id}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.address}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={CAP_CHO.phone}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Thông tin chuyển nhượng khác */}
          <div className="mb-4 font-medium text-foreground">
            Thông tin chuyển nhượng khác
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">STT</th>
                  <th className="report-th">Họ và tên</th>
                  <th className="report-th">Số CMND/Hộ chiếu/Giấy ĐKKD</th>
                  <th className="report-th">Hộ khẩu thường trú/Trụ sở</th>
                  <th className="report-th">Ngày</th>
                </tr>
              </thead>
              <tbody>
                {CHUYEN_NHUONG.map((row) => (
                  <tr key={row.stt}>
                    <td className="report-td text-center font-medium">
                      {row.stt}
                    </td>
                    <td className="report-td">{row.name}</td>
                    <td className="report-td">{row.id}</td>
                    <td className="report-td">{row.address}</td>
                    <td className="report-td">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Hồ sơ pháp lý khác */}
          <div className="mb-4 font-medium text-foreground">
            Hồ sơ pháp lý khác
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">STT</th>
                  <th className="report-th">Tên hồ sơ pháp lý</th>
                  <th className="report-th">Số hiệu</th>
                  <th className="report-th">Đơn vị cấp</th>
                  <th className="report-th">Cấp ngày</th>
                  <th className="report-th">Cho</th>
                </tr>
              </thead>
              <tbody>
                {HO_SO_PHAP_LY_KHAC.map((row) => (
                  <tr key={row.stt}>
                    <td className="report-td text-center font-medium">
                      {row.stt}
                    </td>
                    <td className="report-td">{row.name}</td>
                    <td className="report-td">{row.docNumber}</td>
                    <td className="report-td">{row.issuer}</td>
                    <td className="report-td">{row.issueDate}</td>
                    <td className="report-td">{row.for}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Lịch sử định giá */}
          <div className="mb-4 font-medium text-foreground">
            2. Lịch sử định giá
          </div>
          <div className="overflow-x-auto">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Lần định giá</th>
                  <th className="report-th">Số BCDG</th>
                  <th className="report-th">Giá trị định giá gần nhất</th>
                  <th className="report-th">Thanh khoản</th>
                </tr>
              </thead>
              <tbody>
                {LICH_SU_DINH_GIA.map((row) => (
                  <tr key={row.stt}>
                    <td className="report-td text-center font-medium">
                      {row.stt}
                    </td>
                    <td className="report-td">{row.reportCode}</td>
                    <td className="report-td">{row.value}</td>
                    <td className="report-td">{row.liquidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* III. Thông tin định giá */}
        <div className="flex items-center mb-4 mt-8 pb-0  border-border">
          <span
            className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3"
            style={{ background: "#2563eb" }} // Tailwind blue-600
          >
             III
          </span>
          <h2 className="text-xl font-semibold text-foreground">
             THÔNG TIN ĐỊNH GIÁ
          </h2>
        </div>
        <section className="bg-card rounded-lg border border-border shadow-sm p-4 ml-3">
          <div className="mb-4 font-medium text-foreground">
            1. Thông tin tài sản định giá
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tọa độ (lần 1)
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.toaDo1}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tọa độ (lần 2)
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.toaDo2}
                readOnly
              />
            </div>
          </div>
          {/* 1.1. Địa điểm */}
          <div className="mb-4 font-medium text-foreground">1.1. Địa điểm</div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Địa điểm</th>
                  <th className="report-th">Tỉnh/Thành phố</th>
                  <th className="report-th">Quận/Huyện/Thành phố/Thị xã</th>
                  <th className="report-th">Xã/Phường/Thị trấn</th>
                  <th className="report-th">Tên đường</th>
                  <th className="report-th">Số nhà</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-td font-medium">
                    Địa điểm tài sản theo GCN
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiGCN.province}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiGCN.district}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiGCN.ward}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiGCN.street}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiGCN.number}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td className="report-td font-medium">
                    Địa điểm tài sản theo hiện trạng
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiHienTrang.province}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiHienTrang.district}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiHienTrang.ward}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiHienTrang.street}
                      readOnly
                    />
                  </td>
                  <td className="report-td">
                    <input
                      className="report-table-input"
                      value={THONG_TIN_DINH_GIA_MAU.diaChiHienTrang.number}
                      readOnly
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Vị trí tọa lạc */}
          <div className="mb-4 font-medium text-foreground">Vị trí tọa lạc</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Vị trí theo quy định của UBND
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.viTriUBND}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tên đường theo quy định của UBND tỉnh/thành phố
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.tenDuongUBND}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Khoảng cách đến đường theo quy định của UBND tỉnh/thành phố (m)
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.khoangCachDuong}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Đơn giá theo bảng giá nhà nước
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.donGiaNhaNuoc}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">Khu vực</div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.khuVuc}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Cảnh báo khu vực tọa lạc của tài sản
              </div>
              <input
                className="report-input"
                value={THONG_TIN_DINH_GIA_MAU.canhBao}
                readOnly
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <input type="checkbox" className="checkbox" id="no-street-name" />
            <label
              htmlFor="no-street-name"
              className="text-foreground font-medium cursor-pointer"
            >
              Đường không có tên trên bảng giá nhà nước
            </label>
          </div>
          {/* 1.2. Đặc điểm kinh tế kỹ thuật */}
          <div className="mb-4 font-medium text-foreground">
            1.2. Đặc điểm kinh tế kỹ thuật
          </div>
          <div className="mb-4 font-medium text-foreground">
            A. Quyền sử dụng đất
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Thửa đất số
              </div>
              <input className="report-input" placeholder="Thửa đất số" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Số thửa</div>
              <input className="report-input" placeholder="Số thửa" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tờ bản đồ số
              </div>
              <input className="report-input" placeholder="Tờ bản đồ số" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Số mục tờ bản đồ
              </div>
              <input className="report-input" placeholder="Số mục tờ bản đồ" />
            </div>
          </div>
          <div className="mb-4 font-medium text-foreground">
            BĐS thuộc các dự án đầu tư xây dựng nhà ở, khu đô thị, khu nghỉ
            dưỡng
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div>
              <input
                className="report-input"
                placeholder="BĐS thuộc các dự án..."
              />
            </div>
          </div>

          {/* Bảng mục đích sử dụng */}
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">
                    Mục đích sử dụng (theo GCN/HSPL)
                  </th>
                  <th className="report-th">Mục đích sử dụng đất theo Luật</th>
                  <th className="report-th">Mục đích sử dụng đất quy đổi</th>
                  <th className="report-th">
                    Mục đích sử dụng quy đổi tính LTV
                  </th>
                  <th className="report-th">
                    Diện tích tương ứng với mục đích (m2)
                  </th>
                  <th className="report-th">Diện tích thực tế (m2)</th>
                  <th className="report-th">Thời hạn sử dụng</th>
                  <th className="report-th">Hình thức sử dụng</th>
                  <th className="report-th">Hiện trạng sử dụng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Bảng chỉ tiêu */}
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Chỉ tiêu</th>
                  <th className="report-th">Theo hồ sơ pháp lý</th>
                  <th className="report-th">Thông tin hiện trạng TS</th>
                  <th className="report-th">Chi tiết nội dung không phù hợp</th>
                </tr>
              </thead>
              <tbody>
                {[
                  "Địa chỉ tài sản",
                  "Phía trước giáp",
                  "Bên phải giáp",
                  "Bên trái giáp",
                  "Phía sau giáp",
                  "Ranh giới với các thửa kế bên",
                  "Diện tích (m2)",
                  "Diện tích sử dụng chung (m2)",
                  "Diện tích sử dụng riêng (m2)",
                  "Kích thước các cạnh (m)",
                  "Mặt tiền",
                  "Hướng tài sản",
                  "Độ rộng ngõ/ngách nhỏ nhất (m)",
                  "Hình dạng",
                  "BĐS có mộ trên đất?",
                ].map((label, idx) => {
                  if (label === "Ranh giới với các thửa kế bên") {
                    return (
                      <tr key={idx}>
                        <td className="report-td font-medium">{label}</td>
                        <td className="report-td">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`ranh-gioi-hoso`}
                              className="checkbox"
                            />
                            <label
                              htmlFor={`ranh-gioi-hoso`}
                              className="cursor-pointer"
                            >
                              Không/ không xác định được
                            </label>
                          </div>
                        </td>
                        <td className="report-td">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`ranh-gioi-hientrang`}
                              className="checkbox"
                            />
                            <label
                              htmlFor={`ranh-gioi-hientrang`}
                              className="cursor-pointer"
                            >
                              Không/ không xác định được
                            </label>
                          </div>
                        </td>
                        <td className="report-td">
                          <input className="report-table-input" />
                        </td>
                      </tr>
                    );
                  }
                  if (label === "BĐS có mộ trên đất?") {
                    return (
                      <tr key={idx}>
                        <td className="report-td font-medium">{label}</td>
                        <td className="report-td">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`mo-hoso`}
                              className="checkbox"
                            />
                            <label
                              htmlFor={`mo-hoso`}
                              className="cursor-pointer"
                            >
                              Có
                            </label>
                          </div>
                        </td>
                        <td className="report-td">
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              id={`mo-hientrang`}
                              className="checkbox"
                            />
                            <label
                              htmlFor={`mo-hientrang`}
                              className="cursor-pointer"
                            >
                              Có
                            </label>
                          </div>
                        </td>
                        <td className="report-td">
                          <input className="report-table-input" />
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={idx}>
                      <td className="report-td font-medium">{label}</td>
                      <td className="report-td">
                        <input className="report-table-input p-0" />
                      </td>
                      <td className="report-td">
                        <input className="report-table-input" />
                      </td>
                      <td className="report-td">
                        <input className="report-table-input" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Đặc điểm khác biệt */}
          <div className="mb-4 font-medium text-foreground">
            Đặc điểm khác biệt
          </div>
          <input
            className="report-input mb-6"
            placeholder="Đặc điểm khác biệt"
          />

          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Chỉ tiêu</th>
                  <th className="report-th">Theo hồ sơ pháp lý</th>
                  <th className="report-th">Tọa độ</th>
                  <th className="report-th">Thông tin hiện trạng TS</th>
                  <th className="report-th">Khoảng cách (m)</th>
                  <th className="report-th">Diện tích</th>
                </tr>
              </thead>
              <tbody>
                {["Yếu tố tranh chấp", "Yếu tố quy hoạch"].map((label, idx) => (
                  <tr key={idx}>
                    <td className="report-td font-medium">{label}</td>
                    <td className="report-td">
                      <input className="report-table-input" />
                    </td>
                    <td className="report-td">
                      <input className="report-table-input" />
                    </td>
                    <td className="report-td">
                      <input className="report-table-input" />
                    </td>
                    <td className="report-td">
                      <input className="report-table-input" />
                    </td>
                    <td className="report-td">
                      <input className="report-table-input" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Thông tin ghi nhận khảo sát thực tế và tham khảo từ cơ quan nhà nước có thẩm quyền */}
          <div className="mb-4 font-medium text-foreground">
            Thông tin ghi nhận theo khảo sát thực tế và tham khảo từ cơ quan nhà
            nước có thẩm quyền
          </div>
          <div className="flex flex-col gap-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              BĐS có các yếu tố tâm linh ảnh hưởng nghiêm trọng khả năng thanh
              khoản như hiện trường án mạng, hỏa hoạn/cháy nổ có thương vong...;
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              BĐS gần lưu vực sông, ngòi, kênh, rạch ...thuộc khu vực không gian
              thoát lũ có cảnh báo nguy cơ sạt lở đất (theo đánh giá của bộ phận
              định giá). Hoặc khu vực có nguy cơ sạt lở phát hiện trong quá
              trình khảo sát hiện trạng tài sản (theo đánh giá của bộ phận định
              giá).
            </label>
          </div>
          {/* Các yếu tố đặc biệt */}
          <div className="flex flex-col gap-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              Đất có các công trình là đình, đền, miếu, am (ngôi miếu nhỏ thờ
              thần linh của cộng đồng dân cư nhỏ), nhà thờ thuộc tôn giáo, chùa,
              mộ, nhà thờ họ, điện thờ trên BĐS. Lưu ý: Không đánh giá yếu tố
              này đối với đất nông nghiệp có mộ tại các tỉnh Miền Tây thuộc diện
              được nhận làm TSBD theo Hướng dẫn nhận và quản lý TSBD là BĐS
              trong từng thời kỳ.
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              Đất đã có sở tôn giáo, tín ngưỡng (hiện trên hồ sơ pháp lý do đơn
              vị đề nghị định giá cung cấp); đất sử dụng chung của cộng đồng dân
              cư.
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              Đất được Nhà nước giao, cho thuê thuộc dự án đầu tư mà không được
              sử dụng trong thời hạn 12 tháng liên tục hoặc tiến độ sử dụng đất
              chậm hơn 24 tháng so với tiến độ ghi trong dự án đầu tư kể từ khi
              nhận bàn giao đất trên thực địa nhưng chưa có quyết định giao đất,
              cho thuê đất hoặc quyết định gia hạn thời hạn sử dụng.
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-[15px]">
              <input type="checkbox" className="checkbox" />
              Đất làm nghĩa trang, nghĩa địa (nơi tập trung trên 10 ngôi mộ);
              đất đã có quy hoạch làm nghĩa trang, nghĩa địa;
            </label>
          </div>
          {/* B. Tài sản có CTXD không? */}
          <div className="mb-4 font-medium text-foreground">
            B. Tài sản có CTXD không?
          </div>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="ctxd" className="radio" /> Có
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="ctxd" className="radio" /> Không
            </label>
          </div>
          <div className="mb-4 font-medium text-foreground">Diễn giải</div>
          <input className="report-input mb-6" placeholder="Diễn giải" />
          {/* C. Ưu/Nhược điểm */}
          <div className="mb-4 font-medium text-foreground">
            C. Ưu/Nhược điểm
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">Ưu điểm</th>
                  <th className="report-th">Tỷ lệ</th>
                  <th className="report-th">Nhược điểm</th>
                  <th className="report-th">Tỷ lệ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                  <td className="report-td">
                    <input className="report-table-input" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* D. Hiện trạng sử dụng tài sản */}
          <div className="mb-4 font-medium text-foreground">
            D. Hiện trạng sử dụng tài sản
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Chủ tài sản có đang sử dụng tài sản không?
              </div>
              <div className="flex items-center gap-6 mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="dang-su-dung" className="radio" />{" "}
                  Có
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="dang-su-dung" className="radio" />{" "}
                  Không
                </label>
              </div>
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">Diễn giải</div>
              <input className="report-input" placeholder="CSH đang để trống" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Mục đích sử dụng thực tế
              </div>
              <input className="report-input" placeholder="CSH đang để trống" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Phụ lục hình ảnh
              </div>
              <input
                className="report-input text-primary underline cursor-pointer"
                placeholder="Phụ lục"
              />
            </div>
          </div>
        </section>


        {/* IV. Phụ lục tính toán */}
          <div className="flex items-center mb-4 mt-8 pb-0  border-border">
          <span
            className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3"
            style={{ background: "#2563eb" }} // Tailwind blue-600
          >
             IV
          </span>
          <h2 className="text-xl font-semibold text-foreground">
             PHỤ LỤC TÍNH TOÁN
          </h2>
        </div>
        <section className="bg-card rounded-lg border border-border shadow-sm p-4 ml-3">
          <div className="mb-4 font-medium text-foreground">
            1. Phương pháp tính giá
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">STT</th>
                  <th className="report-th">Loại hình tài sản</th>
                  <th className="report-th">Mục đích sử dụng theo HSPL</th>
                  <th className="report-th">Nội dung</th>
                  <th className="report-th">Phương pháp định giá</th>
                  <th className="report-th">Đơn giá định giá</th>
                  <th className="report-th">Phụ lục</th>
                </tr>
              </thead>
              <tbody>
                {TS_THAM_DINH_MAU.map((row) => (
                  <tr key={row.stt}>
                    <td className="report-td text-center font-medium">
                      {row.stt}
                    </td>
                    <td className="report-td">{row.loaiHinh}</td>
                    <td className="report-td">{row.mucDich}</td>
                    <td className="report-td">{row.noiDung}</td>
                    <td className="report-td">{row.phuongPhap}</td>
                    <td className="report-td">{row.donGia}</td>
                    <td className="report-td">{row.phuLuc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-4 font-medium text-foreground">
            2. Kết quả thẩm định - QSDĐ
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">STT</th>
                  <th className="report-th">Nội dung</th>
                  <th className="report-th">Mục đích đất quy đổi</th>
                  <th className="report-th">
                    Diện tích (m2)/Chiều dài mặt tiền (m)
                  </th>
                  <th className="report-th">Đơn giá định giá</th>
                  <th className="report-th">Tỷ lệ định giá</th>
                  <th className="report-th">Giá trị định giá</th>
                </tr>
              </thead>
              <tbody>
                {KQ_THAM_DINH_MAU.map((row) => (
                  <tr key={row.stt}>
                    <td className="report-td text-center font-medium">
                      {row.stt}
                    </td>
                    <td className="report-td">{row.noiDung}</td>
                    <td className="report-td">{row.mucDichQuyDoi}</td>
                    <td className="report-td">{row.dienTich}</td>
                    <td className="report-td">{row.donGia}</td>
                    <td className="report-td">{row.tyLe}</td>
                    <td className="report-td">{row.giaTri}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng giá trị tài sản (đồng)
              </div>
              <input
                className="report-input"
                value={KET_QUA_TINH_TOAN_MAU.tongGiaTri}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng giá trị làm tròn (đồng)
              </div>
              <input
                className="report-input"
                value={KET_QUA_TINH_TOAN_MAU.tongGiaTriLamTron}
                readOnly
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng giá trị bằng chữ (đồng)
              </div>
              <input
                className="report-input"
                value={KET_QUA_TINH_TOAN_MAU.tongGiaTriBangChu}
                readOnly
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tăng/giảm so với lần gần nhất
              </div>
              <input
                className="report-input"
                value={KET_QUA_TINH_TOAN_MAU.tangGiamGanNhat}
                readOnly
              />
            </div>
          </div>
        </section>
        


        {/* V. Giới hạn báo cáo định giá */}
        <div className="flex items-center mb-4 mt-8 pb-0  border-border">
          <span
            className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3"
            style={{ background: "#2563eb" }} // Tailwind blue-600
          >
             V
          </span>
          <h2 className="text-xl font-semibold text-foreground">
             GIỚI HẠN BÁO CÁO ĐỊNH GIÁ
          </h2>
        </div>
        <section className="bg-card rounded-lg border border-border shadow-sm p-4 ml-3">
          <div className="mb-4 font-medium text-foreground">
            Ý kiến định giá
          </div>
          <input className="report-input mb-6" placeholder="Ý kiến định giá" />
          <div className="mb-4 font-medium text-foreground">
            BCĐG có áp dụng nội dung ngoại lệ không?
          </div>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="exception" className="radio" /> Có
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="exception" className="radio" /> Không
            </label>
          </div>
          <input className="report-input mb-6" placeholder="Diễn giải" />
          <div className="mb-4 font-medium text-foreground">
            Đánh giá điều kiện nhận theo hướng dẫn và quản lý TSBD của BIDV
          </div>
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="condition" className="radio" /> Đủ điều
              kiện nhận
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="condition" className="radio" /> Không đủ
              điều kiện nhận
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="condition" className="radio" /> Chưa
              đánh giá
            </label>
          </div>
          <input className="report-input mb-6" placeholder="Diễn giải" />
          <div className="mb-4 font-medium text-foreground">File đính kèm</div>
          <input className="report-input mb-6" type="file" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng tỷ lệ giảm
              </div>
              <input
                className="report-input"
                placeholder="Đã trừ các yếu tố cố định tính thanh khoản"
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng tỷ lệ tăng
              </div>
              <input
                className="report-input"
                placeholder="Đã trừ các yếu tố cố định tính thanh khoản"
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tỷ lệ thanh khoản của TSĐG
              </div>
              <input
                className="report-input"
                placeholder="Tỷ lệ thanh khoản của TSĐG"
              />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tính thanh khoản
              </div>
              <input className="report-input" placeholder="Tính thanh khoản" />
            </div>
          </div>
          <div className="mb-4 font-medium text-foreground">Bảng R</div>
          <div className="overflow-x-auto mb-6">
            <table className="report-table">
              <thead>
                <tr>
                  <th className="report-th">STT</th>
                  <th className="report-th">Tên tiêu chí</th>
                  <th className="report-th">Kết quả chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="report-td text-center font-medium">1</td>
                  <td className="report-td"></td>
                  <td className="report-td"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng tỷ lệ giảm
              </div>
              <input className="report-input" placeholder="Tổng tỷ lệ giảm" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tổng tỷ lệ tăng
              </div>
              <input className="report-input" placeholder="Tổng tỷ lệ tăng" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Tỷ lệ của TSĐG
              </div>
              <input className="report-input" placeholder="Tỷ lệ của TSĐG" />
            </div>
            <div>
              <div className="mb-3 font-medium text-foreground">
                Hạng Tài sản
              </div>
              <input className="report-input" placeholder="Hạng Tài sản" />
            </div>
          </div>
          <div className="mb-4 font-medium text-foreground">
            Giới hạn của báo cáo
          </div>
          <input
            className="report-input mb-6"
            placeholder="Giới hạn của báo cáo"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <div className="mb-3 font-medium text-foreground">
                Kết quả định giá có thời hạn sử dụng là (tháng)
              </div>
              <input
                className="report-input"
                placeholder="Kết quả định giá có thời hạn sử dụng là (tháng)"
              />
            </div>
          </div>
        </section>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 mb-12">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg px-8 py-3 text-lg shadow-sm transition-all duration-200 hover:shadow-md">
            Lưu
          </button>
        </div>
      </div>
      <style>{`
  .report-input, .report-table-input, .report-input {
    width: 100%;
    border: 1px solid hsl(var(--border));
    border-radius: 0.4rem;
    padding: 0.35rem 0.55rem;
    font-size: 0.85rem;
    background: #f6f7fa;
    color: hsl(var(--foreground));
    transition: all 0.2s ease;
    min-height: 1.7rem;
  }


  .report-input:focus, .report-table-input:focus, .report-input:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
    background: #f0f1f4;
  }
  .report-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid hsl(var(--border));
    background: hsl(var(--card));
  }
  .report-th, .report-td {
    border: 1px solid hsl(var(--border)) !important;
    font-size: 0.9rem;
    background: hsl(var(--card));
    color: hsl(var(--foreground));

    padding-top: 0.42rem;
    padding-right: 0.36rem;
    padding-bottom: 0.42rem;
    padding-left: 0.36rem;
    
  }
  .report-th {
    background: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
    font-weight: 600;
    text-align: center;
  }
  .checkbox, .radio {
  width: 0.75rem;
  height: 0.75rem;
  min-width: 0.75rem;
  min-height: 0.75rem;
  max-width: 0.75rem;
  max-height: 0.75rem;
  accent-color: hsl(var(--primary));
  vertical-align: middle;
  margin: 0;
  display: inline-block;
  box-sizing: border-box;
}

label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  line-height: 1.2;
  min-height: 1.7rem;
}
`}</style>
    </div>
    </>
  );
}
