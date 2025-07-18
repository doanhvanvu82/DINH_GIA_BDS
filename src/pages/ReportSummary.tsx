import React, { useEffect } from "react";

export default function ReportSummary() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-full min-h-screen bg-gray-50 p-2 md:p-6 overflow-x-auto">
            <div className="max-w-[1400px] mx-auto space-y-8">
                {/* I. Thông tin khách hàng */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4">I. THÔNG TIN KHÁCH HÀNG</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
                        <div><div className="mb-2 font-semibold">Đơn vị đề nghị</div><input className="input" placeholder="Đơn vị đề nghị" /></div>
                        <div><div className="mb-2 font-semibold">CB gửi đề nghị</div><input className="input" placeholder="CB gửi đề nghị" /></div>
                        <div><div className="mb-2 font-semibold">Số điện thoại</div><input className="input" placeholder="Số điện thoại" /></div>
                        <div><div className="mb-2 font-semibold">CB phối hợp khảo sát</div><input className="input" placeholder="CB phối hợp khảo sát" /></div>
                        <div><div className="mb-2 font-semibold">SĐT</div><input className="input" placeholder="SĐT" /></div>
                        <div><div className="mb-2 font-semibold">Tên khách hàng</div><input className="input" placeholder="Tên khách hàng" /></div>
                        <div><div className="mb-2 font-semibold">Mã tài sản</div><input className="input" placeholder="Mã tài sản" /></div>
                        <div><div className="mb-2 font-semibold">Số BCDG</div><input className="input" placeholder="Số BCDG" /></div>
                        <div><div className="mb-2 font-semibold">Mục đích định giá</div><input className="input" placeholder="Mục đích định giá" /></div>
                        <div><div className="mb-2 font-semibold">Danh mục hồ sơ</div><button className="input bg-blue-50 text-blue-700 font-semibold">Danh sách tài liệu đính kèm</button></div>
                        <div><div className="mb-2 font-semibold">Thông tin về tiến độ công việc</div><input className="input" placeholder="Thông tin về tiến độ công việc" /></div>
                    </div>
                </section>
                {/* II. Cơ sở định giá */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4">II. CƠ SỞ ĐỊNH GIÁ</h2>
                    <div className="mb-2 font-semibold">1. Hồ sơ pháp lý</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                        <div><div className="mb-2 font-semibold">Tình trạng pháp lý</div><input className="input" placeholder="Tình trạng pháp lý" /></div>
                        <div><div className="mb-2 font-semibold">Diễn giải (nếu có)</div><input className="input" placeholder="Diễn giải (nếu có)" /></div>
                        <div><div className="mb-2 font-semibold">Hồ sơ pháp lý</div><input className="input" placeholder="Hồ sơ pháp lý" /></div>
                        <div><div className="mb-2 font-semibold">Số hiệu</div><input className="input" placeholder="Số hiệu" /></div>
                        <div><div className="mb-2 font-semibold">Cấp ngày</div><input className="input" placeholder="Cấp ngày" /></div>
                        <div><div className="mb-2 font-semibold">Số vào sổ</div><input className="input" placeholder="Số vào sổ" /></div>
                        <div><div className="mb-2 font-semibold">Đơn vị cấp</div><input className="input" placeholder="Đơn vị cấp" /></div>
                        <div><div className="mb-2 font-semibold">Mã tài sản cũ (nếu có)</div><input className="input" placeholder="Mã tài sản cũ (nếu có)" /></div>
                    </div>
                    {/* Cấp cho */}
                    <div className="mb-2 font-semibold">Cấp cho</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Loại khách hàng</th>
                                    <th className="border p-1">Mối quan hệ</th>
                                    <th className="border p-1">Ông/bà/Tên công ty</th>
                                    <th className="border p-1">Số CMND/Hộ chiếu/Giấy ĐKKD</th>
                                    <th className="border p-1">Hộ khẩu thường trú/Trụ sở</th>
                                    <th className="border p-1">Điện thoại (cần thiết)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Loại khách hàng" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Mối quan hệ" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Ông/bà/Tên công ty" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Số CMND/Hộ chiếu/Giấy ĐKKD" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Hộ khẩu thường trú/Trụ sở" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Điện thoại (cần thiết)" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Thông tin chuyển nhượng khác */}
                    <div className="mb-2 font-semibold">Thông tin chuyển nhượng khác</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">STT</th>
                                    <th className="border p-1">Họ và tên</th>
                                    <th className="border p-1">Số CMND/Hộ chiếu/Giấy ĐKKD</th>
                                    <th className="border p-1">Hộ khẩu thường trú/Trụ sở</th>
                                    <th className="border p-1">Ngày</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Hồ sơ pháp lý khác */}
                    <div className="mb-2 font-semibold">Hồ sơ pháp lý khác</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">STT</th>
                                    <th className="border p-1">Tên hồ sơ pháp lý</th>
                                    <th className="border p-1">Số hiệu</th>
                                    <th className="border p-1">Đơn vị cấp</th>
                                    <th className="border p-1">Cấp ngày</th>
                                    <th className="border p-1">Cho</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Lịch sử định giá */}
                    <div className="mb-2 font-semibold">2. Lịch sử định giá</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Lần định giá</th>
                                    <th className="border p-1">Số BCDG</th>
                                    <th className="border p-1">Giá trị định giá gần nhất</th>
                                    <th className="border p-1">Thanh khoản</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                {/* III. Thông tin định giá */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4">III. THÔNG TIN ĐỊNH GIÁ</h2>
                    {/* 1. Thông tin tài sản định giá */}
                    <div className="mb-2 font-semibold">1. Thông tin tài sản định giá</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="mb-2 font-semibold">Tọa độ (lần 1)</div>
                            <input className="input w-full" placeholder="Tọa độ (lần 1)" />
                        </div>
                        <div>
                            <div className="mb-2 font-semibold">Tọa độ (lần 2)</div>
                            <input className="input w-full" placeholder="Tọa độ (lần 2)" />
                        </div>
                    </div>
                    {/* 1.1. Địa điểm */}
                    <div className="mb-2 font-semibold">1.1. Địa điểm</div>
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Địa điểm</th>
                                    <th className="border p-1">Tỉnh/Thành phố</th>
                                    <th className="border p-1">Quận/Huyện/Thành phố/Thị xã</th>
                                    <th className="border p-1">Xã/Phường/Thị trấn</th>
                                    <th className="border p-1">Tên đường</th>
                                    <th className="border p-1">Số nhà</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words min-w-0">Địa điểm tài sản theo GCN</td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Tỉnh/Thành phố" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Quận/Huyện/Thành phố/Thị xã" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Xã/Phường/Thị trấn" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Tên đường" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Số nhà" /></td>
                                </tr>
                                <tr>
                                    <td className="border p-1 break-words min-w-0">Địa điểm tài sản theo hiện trạng</td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Tỉnh/Thành phố" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Quận/Huyện/Thành phố/Thị xã" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Xã/Phường/Thị trấn" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Tên đường" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" placeholder="Số nhà" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Vị trí tọa lạc */}
                    <div className="mb-2 font-semibold">Vị trí tọa lạc</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Vị trí theo quy định của UBND</div><input className="input w-full" placeholder="Vị trí theo quy định của UBND" /></div>
                        <div><div className="mb-2 font-semibold">Tên đường theo quy định của UBND tỉnh/thành phố</div><input className="input w-full" placeholder="Tên đường theo quy định của UBND tỉnh/thành phố" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Khoảng cách đến đường theo quy định của UBND tỉnh/thành phố (m)</div><input className="input w-full" placeholder="Khoảng cách đến đường theo quy định của UBND tỉnh/thành phố (m)" /></div>
                        <div><div className="mb-2 font-semibold">Đơn giá theo bảng giá nhà nước</div><input className="input w-full" placeholder="Đơn giá theo bảng giá nhà nước" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Khu vực</div><input className="input w-full" placeholder="Khu vực" /></div>
                        <div><div className="mb-2 font-semibold">Cảnh báo khu vực tọa lạc của tài sản</div><textarea className="input w-full" placeholder="Cảnh báo khu vực tọa lạc của tài sản" rows={2} /></div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input type="checkbox" className="mr-2" id="no-street-name" />
                        <label htmlFor="no-street-name">Đường không có tên trên bảng giá nhà nước</label>
                    </div>
                    {/* 1.2. Đặc điểm kinh tế kỹ thuật */}
                    <div className="mb-2 font-semibold">1.2. Đặc điểm kinh tế kỹ thuật</div>
                    <div className="mb-2 font-semibold">A. Quyền sử dụng đất</div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Thửa đất số</div><input className="input w-full" placeholder="Thửa đất số" /></div>
                        <div><div className="mb-2 font-semibold">Số thửa</div><input className="input w-full" placeholder="Số thửa" /></div>
                        <div><div className="mb-2 font-semibold">Tờ bản đồ số</div><input className="input w-full" placeholder="Tờ bản đồ số" /></div>
                        <div><div className="mb-2 font-semibold">Số mục tờ bản đồ</div><input className="input w-full" placeholder="Số mục tờ bản đồ" /></div>
                    </div>
                    <div className="mb-2 font-semibold">BĐS thuộc các dự án đầu tư xây dựng nhà ở, khu đô thị, khu nghỉ dưỡng</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div><input className="input w-full" placeholder="BĐS thuộc các dự án..." /></div>
                    </div>
                    {/* Bảng mục đích sử dụng */}
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Mục đích sử dụng (theo GCN/HSPL)</th>
                                    <th className="border p-1">Mục đích sử dụng đất theo Luật</th>
                                    <th className="border p-1">Mục đích sử dụng đất quy đổi</th>
                                    <th className="border p-1">Mục đích sử dụng quy đổi tính LTV</th>
                                    <th className="border p-1">Diện tích tương ứng với mục đích (m2)</th>
                                    <th className="border p-1">Diện tích thực tế (m2)</th>
                                    <th className="border p-1">Thời hạn sử dụng</th>
                                    <th className="border p-1">Hình thức sử dụng</th>
                                    <th className="border p-1">Hiện trạng sử dụng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Bảng chỉ tiêu */}
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Chỉ tiêu</th>
                                    <th className="border p-1">Theo hồ sơ pháp lý</th>
                                    <th className="border p-1">Thông tin hiện trạng TS</th>
                                    <th className="border p-1">Chi tiết nội dung không phù hợp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Địa chỉ tài sản', 'Phía trước giáp', 'Bên phải giáp', 'Bên trái giáp', 'Phía sau giáp', 'Ranh giới với các thửa kế bên', 'Diện tích (m2)', 'Diện tích sử dụng chung (m2)', 'Diện tích sử dụng riêng (m2)', 'Kích thước các cạnh (m)', 'Mặt tiền', 'Hướng tài sản', 'Độ rộng ngõ/ngách nhỏ nhất (m)', 'Hình dạng', 'BĐS có mộ trên đất?'].map((label, idx) => {
                                    if (label === 'Ranh giới với các thửa kế bên') {
                                        return (
                                            <tr key={idx}>
                                                <td className="border p-1 break-words min-w-0">{label}</td>
                                                <td className="border p-1 break-words min-w-0">
                                                    <div className="flex items-center gap-2"><input type="checkbox" id={`ranh-gioi-hoso`} className="mr-2" /><label htmlFor={`ranh-gioi-hoso`}>Không/ không xác định được</label></div>
                                                </td>
                                                <td className="border p-1 break-words min-w-0">
                                                    <div className="flex items-center gap-2"><input type="checkbox" id={`ranh-gioi-hientrang`} className="mr-2" /><label htmlFor={`ranh-gioi-hientrang`}>Không/ không xác định được</label></div>
                                                </td>
                                                <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                            </tr>
                                        );
                                    }
                                    if (label === 'BĐS có mộ trên đất?') {
                                        return (
                                            <tr key={idx}>
                                                <td className="border p-1 break-words min-w-0">{label}</td>
                                                <td className="border p-1 break-words min-w-0">
                                                    <div className="flex items-center gap-2"><input type="checkbox" id={`mo-hoso`} className="mr-2" /><label htmlFor={`mo-hoso`}>Có</label></div>
                                                </td>
                                                <td className="border p-1 break-words min-w-0">
                                                    <div className="flex items-center gap-2"><input type="checkbox" id={`mo-hientrang`} className="mr-2" /><label htmlFor={`mo-hientrang`}>Có</label></div>
                                                </td>
                                                <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                            </tr>
                                        );
                                    }
                                    return (
                                        <tr key={idx}>
                                            <td className="border p-1 break-words min-w-0">{label}</td>
                                            <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                            <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                            <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* Đặc điểm khác biệt */}
                    <div className="mb-2 font-semibold">Đặc điểm khác biệt</div>
                    <textarea className="input w-full mb-4" placeholder="Đặc điểm khác biệt" rows={2} />

                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Khoảng cách đến các địa điểm</th>
                                    <th className="border p-1">Tọa độ</th>
                                    <th className="border p-1">Khoảng cách (m)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words min-w-0"></td>
                                    <td className="border p-1 break-words min-w-0"></td>
                                    <td className="border p-1 break-words min-w-0"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Chỉ tiêu</th>
                                    <th className="border p-1">Theo hồ sơ pháp lý</th>
                                    <th className="border p-1">Tọa độ</th>
                                    <th className="border p-1">Thông tin hiện trạng TS</th>
                                    <th className="border p-1">Khoảng cách (m)</th>
                                    <th className="border p-1">Diện tích</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Yếu tố tranh chấp', 'Yếu tố quy hoạch'].map((label, idx) => (
                                    <tr key={idx}>
                                        <td className="border p-1 break-words min-w-0">{label}</td>
                                        <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                        <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                        <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                        <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                        <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Thông tin ghi nhận khảo sát thực tế và tham khảo từ cơ quan nhà nước có thẩm quyền */}
                    <div className="mb-2 font-semibold">Thông tin ghi nhận theo khảo sát thực tế và tham khảo từ cơ quan nhà nước có thẩm quyền</div>
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />BĐS có các yếu tố tâm linh ảnh hưởng nghiêm trọng khả năng thanh khoản như hiện trường án mạng, hỏa hoạn/cháy nổ có thương vong...;</label>
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />BĐS gần lưu vực sông, ngòi, kênh, rạch ...thuộc khu vực không gian thoát lũ có cảnh báo nguy cơ sạt lở đất (theo đánh giá của bộ phận định giá). Hoặc khu vực có nguy cơ sạt lở phát hiện trong quá trình khảo sát hiện trạng tài sản (theo đánh giá của bộ phận định giá).</label>
                    </div>
                    {/* Các yếu tố đặc biệt */}
                    <div className="flex flex-col gap-2 mb-4">
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />Đất có các công trình là đình, đền, miếu, am (ngôi miếu nhỏ thờ thần linh của cộng đồng dân cư nhỏ), nhà thờ thuộc tôn giáo, chùa, mộ, nhà thờ họ, điện thờ trên BĐS. Lưu ý: Không đánh giá yếu tố này đối với đất nông nghiệp có mộ tại các tỉnh Miền Tây thuộc diện được nhận làm TSBD theo Hướng dẫn nhận và quản lý TSBD là BĐS trong từng thời kỳ.</label>
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />Đất đã có sở tôn giáo, tín ngưỡng (hiện trên hồ sơ pháp lý do đơn vị đề nghị định giá cung cấp); đất sử dụng chung của cộng đồng dân cư.</label>
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />Đất được Nhà nước giao, cho thuê thuộc dự án đầu tư mà không được sử dụng trong thời hạn 12 tháng liên tục hoặc tiến độ sử dụng đất chậm hơn 24 tháng so với tiến độ ghi trong dự án đầu tư kể từ khi nhận bàn giao đất trên thực địa nhưng chưa có quyết định giao đất, cho thuê đất hoặc quyết định gia hạn thời hạn sử dụng.</label>
                        <label className="flex items-center gap-2"><input type="checkbox" className="mr-2" />Đất làm nghĩa trang, nghĩa địa (nơi tập trung trên 10 ngôi mộ); đất đã có quy hoạch làm nghĩa trang, nghĩa địa;</label>
                    </div>
                    {/* B. Tài sản có CTXD không? */}
                    <div className="mb-2 font-semibold">B. Tài sản có CTXD không?</div>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="flex items-center gap-2"><input type="radio" name="ctxd" /> Có</label>
                        <label className="flex items-center gap-2"><input type="radio" name="ctxd" /> Không</label>
                    </div>
                    <div className="mb-2 font-semibold">Diễn giải</div>
                    <textarea className="input w-full mb-4" placeholder="Diễn giải" rows={2} />
                    {/* C. Ưu/Nhược điểm */}
                    <div className="mb-2 font-semibold">C. Ưu/Nhược điểm</div>
                    <div className="overflow-x-auto mb-4">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">Ưu điểm</th>
                                    <th className="border p-1">Tỷ lệ</th>
                                    <th className="border p-1">Nhược điểm</th>
                                    <th className="border p-1">Tỷ lệ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                    <td className="border p-1 break-words min-w-0"><textarea className="input w-full" rows={1} /></td>
                                    <td className="border p-1 break-words min-w-0"><input className="input w-full" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* D. Hiện trạng sử dụng tài sản */}
                    <div className="mb-2 font-semibold">D. Hiện trạng sử dụng tài sản</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <div className="mb-2 font-semibold">Chủ tài sản có đang sử dụng tài sản không?</div>
                            <div className="flex items-center gap-4 mb-2">
                                <label className="flex items-center gap-2"><input type="radio" name="dang-su-dung" /> Có</label>
                                <label className="flex items-center gap-2"><input type="radio" name="dang-su-dung" /> Không</label>
                            </div>
                        </div>
                        <div>
                            <div className="mb-2 font-semibold">Diễn giải</div>
                            <textarea className="input w-full" placeholder="CSH đang để trống" rows={2} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div>
                            <div className="mb-2 font-semibold">Mục đích sử dụng thực tế</div>
                            <input className="input w-full" placeholder="CSH đang để trống" />
                        </div>
                        <div>
                            <div className="mb-2 font-semibold">Phụ lục hình ảnh</div>
                            <input className="input w-full text-blue-700 underline cursor-pointer" placeholder="Phụ lục" />
                        </div>
                    </div>
                </section>
                {/* IV. Phụ lục tính toán */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4">IV. PHỤ LỤC TÍNH TOÁN</h2>
                    <div className="mb-2 font-semibold">1. Phương pháp tính giá</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">STT</th>
                                    <th className="border p-1">Loại hình tài sản</th>
                                    <th className="border p-1">Mục đích sử dụng theo HSPL</th>
                                    <th className="border p-1">Nội dung</th>
                                    <th className="border p-1">Phương pháp định giá</th>
                                    <th className="border p-1">Đơn giá định giá</th>
                                    <th className="border p-1">Phụ lục</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mb-2 font-semibold">2. Kết quả thẩm định - QSDĐ</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">STT</th>
                                    <th className="border p-1">Nội dung</th>
                                    <th className="border p-1">Mục đích đất quy đổi</th>
                                    <th className="border p-1">Diện tích (m2)/Chiều dài mặt tiền (m)</th>
                                    <th className="border p-1">Đơn giá định giá</th>
                                    <th className="border p-1">Tỷ lệ định giá</th>
                                    <th className="border p-1">Giá trị định giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Tổng giá trị tài sản (đồng)</div><input className="input" placeholder="Tổng giá trị tài sản (đồng)" /></div>
                        <div><div className="mb-2 font-semibold">Tổng giá trị làm tròn (đồng)</div><input className="input" placeholder="Tổng giá trị làm tròn (đồng)" /></div>
                        <div><div className="mb-2 font-semibold">Tổng giá trị bằng chữ (đồng)</div><input className="input" placeholder="Tổng giá trị bằng chữ (đồng)" /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Tăng/giảm so với lần gần nhất</div><input className="input" placeholder="Tăng/giảm so với lần gần nhất" /></div>
                    </div>
                </section>
                {/* V. Giới hạn báo cáo định giá */}
                <section className="bg-white rounded-xl shadow p-6">
                    <h2 className="font-bold text-lg mb-4">V. GIỚI HẠN BÁO CÁO ĐỊNH GIÁ</h2>
                    {/* Các trường ý kiến định giá, ngoại lệ, điều kiện nhận, file đính kèm, ... giữ nguyên phía dưới */}
                    <div className="mb-2 font-semibold">Ý kiến định giá</div>
                    <textarea className="input w-full mb-2" placeholder="Ý kiến định giá" rows={2} />
                    <div className="mb-2 font-semibold">BCĐG có áp dụng nội dung ngoại lệ không?</div>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="flex items-center gap-2"><input type="radio" name="exception" /> Có</label>
                        <label className="flex items-center gap-2"><input type="radio" name="exception" /> Không</label>
                    </div>
                    <textarea className="input w-full mb-2" placeholder="Diễn giải" rows={2} />
                    <div className="mb-2 font-semibold">Đánh giá điều kiện nhận theo hướng dẫn và quản lý TSBD của PVcomBank</div>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="flex items-center gap-2"><input type="radio" name="condition" /> Đủ điều kiện nhận</label>
                        <label className="flex items-center gap-2"><input type="radio" name="condition" /> Không đủ điều kiện nhận</label>
                        <label className="flex items-center gap-2"><input type="radio" name="condition" /> Chưa đánh giá</label>
                    </div>
                    <textarea className="input w-full mb-2" placeholder="Diễn giải" rows={2} />
                    <div className="mb-2 font-semibold">File đính kèm</div>
                    <input className="input w-full mb-2" type="file" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Tổng tỷ lệ giảm (trừ các yếu tố cố định tính thanh khoản)</div><input className="input" placeholder="Tổng tỷ lệ giảm (trừ các yếu tố cố định tính thanh khoản)" /></div>
                        <div><div className="mb-2 font-semibold">Tổng tỷ lệ tăng (trừ các yếu tố cố định tính thanh khoản)</div><input className="input" placeholder="Tổng tỷ lệ tăng (trừ các yếu tố cố định tính thanh khoản)" /></div>
                        <div><div className="mb-2 font-semibold">Tỷ lệ thanh khoản của TSĐG</div><input className="input" placeholder="Tỷ lệ thanh khoản của TSĐG" /></div>
                        <div><div className="mb-2 font-semibold">Tính thanh khoản</div><input className="input" placeholder="Tính thanh khoản" /></div>
                    </div>
                    <div className="mb-2 font-semibold">Bảng R</div>
                    <div className="overflow-x-auto">
                        <table className="w-full table-fixed mb-2 border text-sm">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th className="border p-1">STT</th>
                                    <th className="border p-1">Tên tiêu chí</th>
                                    <th className="border p-1">Kết quả chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-1 break-words">1</td>
                                    <td className="border p-1 break-words"></td>
                                    <td className="border p-1 break-words"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Tổng tỷ lệ giảm</div><input className="input" placeholder="Tổng tỷ lệ giảm" /></div>
                        <div><div className="mb-2 font-semibold">Tổng tỷ lệ tăng</div><input className="input" placeholder="Tổng tỷ lệ tăng" /></div>
                        <div><div className="mb-2 font-semibold">Tỷ lệ của TSĐG</div><input className="input" placeholder="Tỷ lệ của TSĐG" /></div>
                        <div><div className="mb-2 font-semibold">Hạng Tài sản</div><input className="input" placeholder="Hạng Tài sản" /></div>
                    </div>
                    <div className="mb-2 font-semibold">Giới hạn của báo cáo</div>
                    <textarea className="input w-full mb-2" placeholder="Giới hạn của báo cáo" rows={2} />
                    <div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                        <div><div className="mb-2 font-semibold">Kết quả định giá có thời hạn sử dụng là (tháng)</div><input className="input" placeholder="Kết quả định giá có thời hạn sử dụng là (tháng)" /></div>
                    </div>
                </section>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8 mb-12">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-3 text-lg shadow transition">Lưu</button>
                </div>
            </div>
            <style>{`
        .input { border: 1px solid #d1d5db; border-radius: 0.5rem; padding: 0.25rem 0.5rem; font-size: 0.95rem; background: #f9fafb; min-height: 32px; }
        .input:focus { outline: none; border-color: #2563eb; background: #fff; }
        section { padding: 1.25rem !important; }
        .font-bold, .font-semibold { font-size: 1rem !important; }
        th, td { font-size: 0.95rem !important; padding: 0.25rem 0.5rem !important; }
      `}</style>
        </div>
    );
} 