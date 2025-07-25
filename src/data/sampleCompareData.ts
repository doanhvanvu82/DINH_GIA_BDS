const sampleCompareData = [
  {
    street: "Lê Quang Đạo",
    distance: "",
    source: "0965987629",
    link: "",
    collect_time: "",
    legal: "Đã được cấp GCN",
    area: "46.8",
    residential: "46.8",
    residential_note: "Đất ở tại đô thị",
    agri: "0",
    other: "",
    other_note: "",
    res_ratio: "100%",
    desc: "",
    floor_area: "",
    construction_note: "",
    land_right: "",
    legal_cost: "",
    offer_price: "",         // Giá chào bán/chào mua(đồng)
    total_construction: "",  // Tổng giá trị CTXD
    construction1: "",       // Giá trị CTXD1
    unit_price: "",            // Đơn giá xây dựng
    quality: "",                     // Chất lượng còn lại(%)
    completion: "",
    land_area_for_unit_price: "46.8",
    legal_status_value: "Đã được cấp GCN",
    usage_purpose_value: "Đất ở",
    area_m2_value: "46.8",
    frontage_m_value: "5.9",
    shape_value: "Vuông vức",
    frontage_value: "1",
    alley_width_value: "1.55",
    spiritual_value: "Không",
    other_disadvantage_value: "Bình thường",
  },
  {
    street: "Lê Quang Đạo",
    distance: "",
    source: "Định giá BIDV",
    link: "",
    collect_time: "",
    legal: "Đã được cấp GCN",
    area: "46.8",
    residential: "46.8",
    residential_note: "Đất ở tại đô thị",
    agri: "0",
    other: "",
    other_note: "",
    res_ratio: "100%",
    desc: "",
    floor_area: "",
    construction_note: "",
    land_right: "",
    legal_cost: "",
    offer_price: "",         // Giá chào bán/chào mua(đồng)
    total_construction: "",  // Tổng giá trị CTXD
    construction1: "",       // Giá trị CTXD1
    unit_price: "",            // Đơn giá xây dựng
    quality: "",                     // Chất lượng còn lại(%)
    completion: "",
    land_area_for_unit_price: "46.8",
    legal_status_value: "Đã được cấp GCN",
    usage_purpose_value: "Đất ở",
    area_m2_value: "46.8",
    frontage_m_value: "5.9",
    shape_value: "Vuông vức",
    frontage_value: "1",
    alley_width_value: "1.55",
    spiritual_value: "Không",
    other_disadvantage_value: "Bình thường",

  },
  {
    address: "38 Đường Hoa Mai, Phường Dịch Vọng, Quận Cầu Giấy",
    province: "Hà Nội",
    district: "Hà Đông",
    ward: "Phường Dương Nội",
    street: "Lê Quang Đạo",
    number: "38",
    wgs84: "21.0350, 105.8000",
    distance: "",
    source: "Batdongsan.com.vn",
    link: "https://batdongsan.com.vn/ban-n",
    collect_time: "17/07/2025",
    legal: "Đã được cấp GCN",
    area: "15",
    residential: "15",
    residential_note: "Đất ở tại đô thị",
    agri: "0",
    agri_note: "",
    other: "",
    other_note: "",
    res_ratio: "100%",
    offer_price: "2,700,000,000",
    confidence: "95",
    deal_price: "2,565,000,000",
    deal_time: "17/07/2025",
    total_construction: "182,700,000",
    construction1: "182,700,000",
    desc: "Nhà 3 tầng",
    floor_area: "45",
    unit_price: "5,800,000",
    quality: "70",
    completion: "100",
    land_right: "2,382,300,000",
    legal_cost: "",
    value_note: "",
    land_area_for_price: "15",
    land_area_for_unit_price: "15",
    land_unit_price: "158,820,000",
    legal_status_value: "Đã được cấp GCN",
    legal_status_ratio: "0",
    legal_status_adjust: "0.00",
    legal_status_price: "158,820,000",
    usage_purpose_value: "Đất ở",
    usage_purpose_ratio: "0",
    usage_purpose_adjust: "0.00",
    usage_purpose_price: "158,820,000",
    area_m2_value: "15",
    area_m2_ratio: "-3",
    area_m2_adjust: "-4,764,600.00",
    area_m2_price: "154,055,400",
    frontage_m_value: "2",
    frontage_m_ratio: "5",
    frontage_m_adjust: "7,941,000.00",
    frontage_m_price: "161,966,400",
    shape_value: "Khá vuông vức",
    shape_ratio: "3",
    shape_adjust: "4,764,600.00",
    shape_price: "166,761,000",
    frontage_value: "1",
    frontage_ratio: "0",
    frontage_adjust: "0.00",
    frontage_price: "166,761,000",
    alley_width_value: "0.7",
    alley_width_ratio: "10",
    alley_width_adjust: "15,882,000.00",
    alley_width_price: "182,643,000",
    spiritual_value: "Không",
    spiritual_ratio: "0",
    spiritual_adjust: "0.00",
    spiritual_price: "182,643,000",
    other_disadvantage_value: "Ngõ chiều mặt tiền, ngõ cụt",
    other_disadvantage_ratio: "5",
    other_disadvantage_adjust: "7,941,800.00",
    other_disadvantage_price: "190,584,000",
    guide_price: "190,584,000",
    avg_guide_price: "192,103,659",
    diff_avg_guide: "-0.79%",
    total_adjust: "41,293,200",
    adjust_count: "5",
    adjust_range: "-3.00% - 10.00%",
    net_adjust: "31,764000",
    final_price: "192,103,659.00",
    note: ""
  },
  {
    address: "136 Đường Hoa Sữa, Phường Dịch Vọng, Quận Cầu Giấy",
    province: "Hà Nội",
    district: "Hà Đông",
    ward: "Phường Dương Nội",
    street: "Hoa Sữa",
    number: "136",
    wgs84: "21.0360, 105.8020",
    distance: "",
    source: "Batdongsan.com.vn",
    link: "https://batdongsan.com.vn/ban-n",
    collect_time: "17/07/2025",
    legal: "Đã được cấp GCN",
    area: "35",
    residential: "35",
    residential_note: "Đất ở tại đô thị",
    agri: "0",
    agri_note: "",
    land_area_for_unit_price: "35",
    other: "",
    other_note: "",
    res_ratio: "100%",
    offer_price: "7,980,000,000",
    confidence: "95",
    deal_price: "7,581,000,000",
    deal_time: "17/07/2025",
    total_construction: "1,041,600,000",
    construction1: "1,041,600,000",
    desc: "Nhà 6 tầng",
    floor_area: "210",
    unit_price: "6,200,000",
    quality: "80",
    completion: "100",
    land_right: "6,539,400,000",
    legal_cost: "",
    value_note: "",
    land_area_for_price: "35",
    land_unit_price: "186,840,000",
    legal_status_value: "Đã được cấp GCN",
    legal_status_ratio: "0",
    legal_status_adjust: "0.00",
    legal_status_price: "186,840,000",
    usage_purpose_value: "Đất ở",
    usage_purpose_ratio: "0",
    usage_purpose_adjust: "0.00",
    usage_purpose_price: "186,840,000",
    area_m2_value: "35",
    area_m2_ratio: "-1",
    area_m2_adjust: "-1,868,400.00",
    area_m2_price: "184,971,600",
    frontage_m_value: "4",
    frontage_m_ratio: "1",
    frontage_m_adjust: "1,868,400.00",
    frontage_m_price: "186,840,000",
    shape_value: "Vuông vức",
    shape_ratio: "0",
    shape_adjust: "0.00",
    shape_price: "186,840,000",
    frontage_value: "1",
    frontage_ratio: "0",
    frontage_adjust: "0.00",
    frontage_price: "186,840,000",
    alley_width_value: "1.6",
    alley_width_ratio: "-1",
    alley_width_adjust: "-1,868,400.00",
    alley_width_price: "184,971,600",
    spiritual_value: "Không",
    spiritual_ratio: "0",
    spiritual_adjust: "0.00",
    spiritual_price: "184,971,600",
    other_disadvantage_value: "Nằm trong ngõ cụt",
    other_disadvantage_ratio: "2",
    other_disadvantage_adjust: "3,736,800.00",
    other_disadvantage_price: "188,708,400",
    guide_price: "188,708,400",
    avg_guide_price: "192,103,659",
    diff_avg_guide: "-1.77%",
    total_adjust: "9,342,000",
    adjust_count: "4",
    adjust_range: "-1.00% - 2.00%",
    net_adjust: "1,868,400",
    final_price: "192,103,659.00",
    note: ""
  },
  {
    address: "76 Đường Hoa Sữa, Phường Dịch Vọng, Quận Cầu Giấy",
    province: "Hà Nội",
    district: "Hà Đông",
    ward: "Phường Dương Nội",
    street: "Hoa Sữa",
    number: "136",
    wgs84: "21.0360, 105.8020",
    distance: "",
    source: "Batdongsan.com.vn",
    link: "https://batdongsan.com.vn/ban-n",
    collect_time: "17/07/2025",
    legal: "Đã được cấp GCN",
    area: "59",
    residential: "59",
    land_area_for_unit_price: "59",
    residential_note: "Đất ở tại đô thị",
    agri: "0",
    agri_note: "",
    other: "",
    other_note: "",
    res_ratio: "100%",
    offer_price: "14,500,000,000",
    confidence: "95",
    deal_price: "13,775,000,0000",
    deal_time: "17/07/2025",
    total_construction: "2,150,904,000",
    construction1: "2,150,904,000",
    desc: "Nhà 6 tầng",
    floor_area: "354",
    unit_price: "6,200,000",
    quality: "98",
    completion: "100",
    land_right: "11,624,096,000",
    legal_cost: "",
    value_note: "",
    land_area_for_price: "59",
    land_unit_price: "197,018,576",
    legal_status_value: "Đã được cấp GCN",
    legal_status_ratio: "0",
    legal_status_adjust: "0.00",
    legal_status_price: "197,018,576",
    usage_purpose_value: "Đất ở",
    usage_purpose_ratio: "0",
    usage_purpose_adjust: "0.00",
    usage_purpose_price: "197,018,576",
    area_m2_value: "59",
    area_m2_ratio: "1",
    area_m2_adjust: "1,970,185.00",
    area_m2_price: "198,988,762",
    frontage_m_value: "32",
    frontage_m_ratio: "2",
    frontage_m_adjust: "3,940,371.53",
    frontage_m_price: "202,929,134",
    shape_value: "Vuông vức",
    shape_ratio: "0",
    shape_adjust: "0.00",
    shape_price: "202,929,134",
    frontage_value: "1",
    frontage_ratio: "0",
    frontage_adjust: "0.00",
    frontage_price: "202,929,134",
    alley_width_value: "1.8",
    alley_width_ratio: "-5",
    alley_width_adjust: "-9,850,928.81",
    alley_width_price: "193,078,205",
    spiritual_value: "Không",
    spiritual_ratio: "0",
    spiritual_adjust: "0.00",
    spiritual_price: "193,078,205",
    other_disadvantage_value: "Nằm trong ngõ cụt",
    other_disadvantage_ratio: "2",
    other_disadvantage_adjust: "3,940,371.53",
    other_disadvantage_price: "197,018,516",
    guide_price: "197,018,516",
    avg_guide_price: "192,103,659",
    diff_avg_guide: "2.56%",
    total_adjust: "19,701,858",
    adjust_count: "4",
    adjust_range: "-5.00% - 2.00%",
    net_adjust: "0",
    final_price: "192,103,659.00",
    note: ""
  },
  {}
];

export default sampleCompareData;
