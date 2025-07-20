export interface Amenity {
    name: string;
    distance: number; // in km
    type: 'hospital' | 'school' | 'market' | 'park' | 'transport';
  }
  
  export interface Transaction {
    id: string;
    date: string;
    area: number;
    price: number;
    distance: number; // in meters
    address: string;
  }
  
  export interface PriceEstimate {
    pricePerM2: number;
    totalValue: number;
    confidence: number; // percentage
  }
  
  export interface LandData {
    id: string;
    address: string;
    area: number;
    plotNumber: string;
    shape: { lat: number; lng: number }[];
    fullAddress: string;
    
  }
  
  // Bổ sung lượng lớn dữ liệu mẫu
  export const mockLandDataList: LandData[] = [
    // 1. Thửa 3 Tờ 82
  {
    id: "hn001",
    address: "Thửa 25 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.8,
    plotNumber: "25/83",
    shape: [
      { lat: 20.980320789122, lng: 105.75531714916 },
      { lat: 20.980139879902, lng: 105.75517226993 },
      { lat: 20.980188961186, lng: 105.75510317632 },
      { lat: 20.980369870892, lng: 105.75524795935 },
      { lat: 20.980335513826, lng: 105.75529635375 },
      { lat: 20.980320789122, lng: 105.75531714916 },
    ],
    fullAddress: "Thửa 25 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn002",
    address: "Thửa 3 Tờ 82, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.57,
    plotNumber: "3/82",
    shape: [
      { lat: 20.98055188515, lng: 105.75377704898 },
      { lat: 20.980500150636, lng: 105.75371100744 },
      { lat: 20.980636992587, lng: 105.75358830429 },
      { lat: 20.980689717288, lng: 105.75365512019 },
      { lat: 20.98055188515, lng: 105.75377704898 }
    ],
    fullAddress: "Thửa 3 Tờ 82, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn003",
    address: "Thửa 33 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 271.1,
    plotNumber: "33/83",
    shape: [
      { lat: 20.980171914014, lng: 105.75552557567 },
      { lat: 20.980112196204, lng: 105.75561009939 },
      { lat: 20.979961352894, lng: 105.75548835631 },
      { lat: 20.97995373411, lng: 105.75543436542 },
      { lat: 20.979992726635, lng: 105.75537945476 },
      { lat: 20.980173095452, lng: 105.75552394668 },
      { lat: 20.980171914014, lng: 105.75552557567 }
    ],
    fullAddress: "Thửa 33 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn004",
    address: "Thửa 34 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 226,
    plotNumber: "34/83",
    shape: [
      { lat: 20.980173095452, lng: 105.75552394668 },
      { lat: 20.979992726635, lng: 105.75537945476 },
      { lat: 20.980041989497, lng: 105.75531016986 },
      { lat: 20.980222718382, lng: 105.75545495208 },
      { lat: 20.980173095452, lng: 105.75552394668 }
    ],
    fullAddress: "Thửa 34 Tờ 83, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn005",
    address: "Thửa 12 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 252.18,
    plotNumber: "12/45",
    shape: [
      { lat: 20.98044653, lng: 105.75364329 },
      { lat: 20.98037252, lng: 105.75354925 },
      { lat: 20.98038756, lng: 105.75349922 },
      { lat: 20.98053263, lng: 105.75345571 },
      { lat: 20.98058353, lng: 105.75352168 },
      { lat: 20.98044653, lng: 105.75364329 }  
    ],
    fullAddress: "Thửa 12 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn006",
    address: "Thửa 13 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 177.64,
    plotNumber: "13/45",
    shape: [
      { lat: 20.9804979, lng: 105.75371078 },
      { lat: 20.98044653, lng: 105.75364329 },
      { lat: 20.98058353, lng: 105.75352168 },
      { lat: 20.98063474, lng: 105.75358807 },
      { lat: 20.9804979, lng: 105.75371078 } 
    ],
    fullAddress: "Thửa 13 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn007",
    address: "Thửa 15 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 177.87,
    plotNumber: "15/45",
    shape: [
      { lat: 20.98060336, lng: 105.75384181 },
      { lat: 20.98054963, lng: 105.75377682 },
      { lat: 20.98068747, lng: 105.75365489 },
      { lat: 20.98073992, lng: 105.75372132 },
      { lat: 20.98060336, lng: 105.75384181 } 
    ],
    fullAddress: "Thửa 15 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn008",
    address: "Thửa 16 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.38,
    plotNumber: "16/45",
    shape: [
      { lat: 20.98065355, lng: 105.75391025 },
      { lat: 20.98060336, lng: 105.75384181 },
      { lat: 20.98073992, lng: 105.75372132 },
      { lat: 20.9807922,  lng: 105.75378755 },
      { lat: 20.98065355, lng: 105.75391025 }
    ],
    fullAddress: "Thửa 16 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn009",
    address: "Thửa 17 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 179.79,
    plotNumber: "17/45",
    shape: [
      { lat: 20.98070546, lng: 105.75397687 },
      { lat: 20.98069082, lng: 105.75395804 },
      { lat: 20.98065355, lng: 105.75391025 },
      { lat: 20.9807922,  lng: 105.75378755 },
      { lat: 20.98084402, lng: 105.75385466 },
      { lat: 20.98070546, lng: 105.75397687 }
    ],
    fullAddress: "Thửa 17 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn010",
    address: "Thửa 18 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.88,
    plotNumber: "18/45",
    shape: [
      { lat: 20.98075755, lng: 105.75404359 },
      { lat: 20.98070546, lng: 105.75397687 },
      { lat: 20.98084402, lng: 105.75385466 },
      { lat: 20.98089548, lng: 105.75392108 },
      { lat: 20.98075755, lng: 105.75404359 }
    ],
    fullAddress: "Thửa 18 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn011",
    address: "Thửa 19 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.36,
    plotNumber: "19/45",
    shape: [
      { lat: 20.98080938, lng: 105.75411001 },
      { lat: 20.98075755, lng: 105.75404359 },
      { lat: 20.98089548, lng: 105.75392108 },
      { lat: 20.98094712, lng: 105.7539875 },
      { lat: 20.98080938, lng: 105.75411001 }
    ],
    fullAddress: "Thửa 19 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn012",
    address: "Thửa 20 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 179.2,
    plotNumber: "20/45",
    shape: [
      { lat: 20.981001645083, lng: 105.75405464799 },
      { lat: 20.980863631597, lng: 105.75417667191 },
      { lat: 20.980811627984, lng: 105.75411024406 },
      { lat: 20.980949372585, lng: 105.75398773791 },
      { lat: 20.981001645083, lng: 105.75405464799 }
    ],
    fullAddress: "Thửa 20 Tờ 45, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn013",
    address: "Thửa 1 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 179.96,
    plotNumber: "1/47",
    shape: [
      { lat: 20.9809132, lng: 105.75424354 },
      { lat: 20.98086138, lng: 105.75417644 },
      { lat: 20.9809994, lng: 105.75405442 },
      { lat: 20.98105194, lng: 105.75412104 },
      { lat: 20.9809132, lng: 105.75424354 }
    ],
    fullAddress: "Thửa 1 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn014",
    address: "Thửa 2 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 180.39,
    plotNumber: "2/47",
    shape: [
      { lat: 20.98096548, lng: 105.75431007 },
      { lat: 20.9809132, lng: 105.75424354 },
      { lat: 20.98105194, lng: 105.75412104 },
      { lat: 20.98110403, lng: 105.75418881 },
      { lat: 20.98096548, lng: 105.75431007 }
    ],
    fullAddress: "Thửa 2 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn015",
    address: "Thửa 3 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 175.9,
    plotNumber: "3/47",
    shape: [
      { lat: 20.981158107506, lng: 105.75425393415 },
      { lat: 20.981021092536, lng: 105.75437480894 },
      { lat: 20.980967725657, lng: 105.75431029757 },
      { lat: 20.981106277762, lng: 105.75418904578 },
      { lat: 20.981158107506, lng: 105.75425393415 }
    ],
    fullAddress: "Thửa 3 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn016",
    address: "Thửa 4 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.3,
    plotNumber: "4/47",
    shape: [
      { lat: 20.981209660722, lng: 105.75432007143 },
      { lat: 20.981071641515, lng: 105.75444334547 },
      { lat: 20.981021092536, lng: 105.75437480894 },
      { lat: 20.981158107506, lng: 105.75425393415 },
      { lat: 20.981209660722, lng: 105.75432007143 }
    ],
    fullAddress: "Thửa 4 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn017",
    address: "Thửa 5 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 179.67,
    plotNumber: "5/47",
    shape: [
      { lat: 20.98112094, lng: 105.75450944 },
      { lat: 20.98108978, lng: 105.75446938 },
      { lat: 20.98106939, lng: 105.75444311 },
      { lat: 20.98120741, lng: 105.75431984 },
      { lat: 20.9812595, lng: 105.75438723 },
      { lat: 20.98112094, lng: 105.75450944 }
    ],
    fullAddress: "Thửa 5 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn018",
    address: "Thửa 6 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.6,
    plotNumber: "6/47",
    shape: [
      { lat: 20.98117664624, lng: 105.75457524496 },
      { lat: 20.981123193805, lng: 105.75450967512 },
      { lat: 20.981261750307, lng: 105.75438746169 },
      { lat: 20.981313754226, lng: 105.75445379367 },
      { lat: 20.98117664624, lng: 105.75457524496 }
    ],
    fullAddress: "Thửa 6 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn019",
    address: "Thửa 7 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 176.36,
    plotNumber: "7/47",
    shape: [
      { lat: 20.98122912, lng: 105.75463924 },
      { lat: 20.98122337, lng: 105.75463238 },
      { lat: 20.9811744, lng: 105.75457501 },
      { lat: 20.98131151, lng: 105.75445356 },
      { lat: 20.9813636, lng: 105.75452057 },
      { lat: 20.98122912, lng: 105.75463924 }
    ],
    fullAddress: "Thửa 7 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn020",
    address: "Thửa 8 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 171.08,
    plotNumber: "8/47",
    shape: [
      { lat: 20.98128457, lng: 105.75470232 },
      { lat: 20.98122912, lng: 105.75463924 },
      { lat: 20.9813636, lng: 105.75452057 },
      { lat: 20.98141533, lng: 105.75458709 },
      { lat: 20.98128457, lng: 105.75470232 }
    ],
    fullAddress: "Thửa 8 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn021",
    address: "Thửa 9 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 168.6,
    plotNumber: "9/47",
    shape: [
      { lat: 20.981469309949, lng: 105.75465374931 },
      { lat: 20.981345244852, lng: 105.75476699517 },
      { lat: 20.981303715013, lng: 105.75472187375 },
      { lat: 20.981286819667, lng: 105.75470255428 },
      { lat: 20.981417577504, lng: 105.75458732239 },
      { lat: 20.981469309949, lng: 105.75465374931 }
    ],
    fullAddress: "Thửa 9 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn022",
    address: "Thửa 10 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 267.3,
    plotNumber: "10/47",
    shape: [
      { lat: 20.98145304, lng: 105.75488205 },
      { lat: 20.98141931, lng: 105.75484928 },
      { lat: 20.981343, lng: 105.75476676 },
      { lat: 20.98146706, lng: 105.75465352 },
      { lat: 20.98152607, lng: 105.75472921 },
      { lat: 20.98154902, lng: 105.75474751 },
      { lat: 20.98145304, lng: 105.75488205 }
    ],
    fullAddress: "Thửa 10 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn023",
    address: "Thửa 11 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 163.3,
    plotNumber: "11/47",
    shape: [
      { lat: 20.981617240489, lng: 105.75480106029 },
      { lat: 20.981515729371, lng: 105.75494077089 },
      { lat: 20.98145529075, lng: 105.75488228249 },
      { lat: 20.981551269163, lng: 105.75474773746 },
      { lat: 20.981617240489, lng: 105.75480106029 }
    ],
    fullAddress: "Thửa 11 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn024",
    address: "Thửa 12 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 167.2,
    plotNumber: "12/47",
    shape: [
      { lat: 20.981681595799, lng: 105.75485216306 },
      { lat: 20.981578164433, lng: 105.75499715357 },
      { lat: 20.981561252073, lng: 105.75498168087 },
      { lat: 20.981515729371, lng: 105.75494077089 },
      { lat: 20.981617240489, lng: 105.75480106029 },
      { lat: 20.981681595799, lng: 105.75485216306 }
    ],
    fullAddress: "Thửa 12 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn025",
    address: "Thửa 13 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 170.87,
    plotNumber: "13/47",
    shape: [
      { lat: 20.98163881, lng: 105.75505215 },
      { lat: 20.98157592, lng: 105.75499692 },
      { lat: 20.98167935, lng: 105.75485193 },
      { lat: 20.98174297, lng: 105.75490409 },
      { lat: 20.98163881, lng: 105.75505215 }
    ],
    fullAddress: "Thửa 13 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn026",
    address: "Thửa 14 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 175.5,
    plotNumber: "14/47",
    shape: [
      { lat: 20.981811016586, lng: 105.75495716133 },
      { lat: 20.981703862315, lng: 105.75510655715 },
      { lat: 20.981648520113, lng: 105.75505982735 },
      { lat: 20.981641056201, lng: 105.7550523845 },
      { lat: 20.981745223828, lng: 105.75490432013 },
      { lat: 20.981811016586, lng: 105.75495716133 }
    ],
    fullAddress: "Thửa 14 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn027",
    address: "Thửa 15 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 176.4,
    plotNumber: "15/47",
    shape: [
      { lat: 20.981875368008, lng: 105.75500912978 },
      { lat: 20.981767483015, lng: 105.75516034924 },
      { lat: 20.981760731026, lng: 105.75515531429 },
      { lat: 20.981703862315, lng: 105.75510655715 },
      { lat: 20.981811016586, lng: 105.75495716133 },
      { lat: 20.981875368008, lng: 105.75500912978 }
    ],
    fullAddress: "Thửa 15 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn028",
    address: "Thửa 16 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 177.9,
    plotNumber: "16/47",
    shape: [
      { lat: 20.981940530606, lng: 105.75506148704 },
      { lat: 20.981832288115, lng: 105.75521183917 },
      { lat: 20.981822020814, lng: 105.7552051516 },
      { lat: 20.981767483015, lng: 105.75516034924 },
      { lat: 20.981875368008, lng: 105.75500912978 },
      { lat: 20.981940530606, lng: 105.75506148704 }
    ],
    fullAddress: "Thửa 16 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn029",
    address: "Thửa 17 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 178.5,
    plotNumber: "17/47",
    shape: [
      { lat: 20.98200524797, lng: 105.7551123995 },
      { lat: 20.981895995689, lng: 105.75526640117 },
      { lat: 20.981832288115, lng: 105.75521183917 },
      { lat: 20.981940530606, lng: 105.75506148704 },
      { lat: 20.98200524797, lng: 105.7551123995 }
    ],
    fullAddress: "Thửa 17 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn030",
    address: "Thửa 18 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 181.67,
    plotNumber: "18/47",
    shape: [
      { lat: 20.981959, lng: 105.7553191 },
      { lat: 20.98189375, lng: 105.75526617 },
      { lat: 20.982003, lng: 105.75511217 },
      { lat: 20.9820678, lng: 105.75516491 },
      { lat: 20.981959, lng: 105.7553191 }
    ],
    fullAddress: "Thửa 18 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn031",
    address: "Thửa 19 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 181.26,
    plotNumber: "19/47",
    shape: [
      { lat: 20.98202344, lng: 105.75537146 },
      { lat: 20.981959, lng: 105.7553191 },
      { lat: 20.9820678, lng: 105.75516491 },
      { lat: 20.9821336, lng: 105.75521602 },
      { lat: 20.98202344, lng: 105.75537146 }
    ],
    fullAddress: "Thửa 19 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn032",
    address: "Thửa 20 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 180.4,
    plotNumber: "20/47",
    shape: [
      { lat: 20.982058268197, lng: 105.75539762812 },
      { lat: 20.982025685889, lng: 105.75537168982 },
      { lat: 20.982135847881, lng: 105.75521625007 },
      { lat: 20.982205248724, lng: 105.7552701676 },
      { lat: 20.982120721699, lng: 105.75538870943 },
      { lat: 20.982058268197, lng: 105.75539762812 }
    ],
    fullAddress: "Thửa 20 Tờ 47, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn033",
    address: "Thửa 1 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 283.5,
    plotNumber: "1/52",
    shape: [
      { lat: 20.980880633747, lng: 105.75492642413 },
      { lat: 20.980700444229, lng: 105.75478212544 },
      { lat: 20.980713169428, lng: 105.7547641089 },
      { lat: 20.980778618452, lng: 105.75467028454 },
      { lat: 20.980905089831, lng: 105.75482941247 },
      { lat: 20.98090744625, lng: 105.75488876292 },
      { lat: 20.980880633747, lng: 105.75492642413 }
    ],
    fullAddress: "Thửa 1 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn034",
    address: "Thửa 2 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 224.7,
    plotNumber: "2/52",
    shape: [
      { lat: 20.980831642849, lng: 105.75499551856 },
      { lat: 20.980651363493, lng: 105.75485112322 },
      { lat: 20.980700444229, lng: 105.75478212544 },
      { lat: 20.980880633747, lng: 105.75492642413 },
      { lat: 20.980831642849, lng: 105.75499551856 }
    ],
    fullAddress: "Thửa 2 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn035",
    address: "Thửa 3 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 224.7,
    plotNumber: "3/52",
    shape: [
      { lat: 20.980602372626, lng: 105.75492021757 },
      { lat: 20.980651363493, lng: 105.75485112322 },
      { lat: 20.980831642849, lng: 105.75499551856 },
      { lat: 20.98078265235, lng: 105.75506451678 },
      { lat: 20.980602372626, lng: 105.75492021757 }
    ],
    fullAddress: "Thửa 3 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn036",
    address: "Thửa 4 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 224.7,
    plotNumber: "4/52",
    shape: [
      { lat: 20.980733571076, lng: 105.75513361067 },
      { lat: 20.980553381733, lng: 105.75498931188 },
      { lat: 20.980565833855, lng: 105.75497177486 },
      { lat: 20.980602372626, lng: 105.75492021757 },
      { lat: 20.980782562028, lng: 105.75506451632 },
      { lat: 20.980733571076, lng: 105.75513361067 }
    ],
    fullAddress: "Thửa 4 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn037",
    address: "Thửa 5 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 249.3,
    plotNumber: "5/52",
    shape: [
      { lat: 20.980679127091, lng: 105.7552102752 },
      { lat: 20.980499028135, lng: 105.75506597683 },
      { lat: 20.980516842942, lng: 105.75504086914 },
      { lat: 20.980553381733, lng: 105.75498931188 },
      { lat: 20.980733571076, lng: 105.75513361067 },
      { lat: 20.980687580337, lng: 105.7551982961 },
      { lat: 20.980679127091, lng: 105.7552102752 }
    ],
    fullAddress: "Thửa 5 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn038",
    address: "Thửa 6 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 250.06,
    plotNumber: "6/52",
    shape: [
      { lat: 20.98062243, lng: 105.75528699 },
      { lat: 20.98044224, lng: 105.7551426 },
      { lat: 20.98046551, lng: 105.75510973 },
      { lat: 20.98049678, lng: 105.75506574 },
      { lat: 20.98067688, lng: 105.75521004 },
      { lat: 20.98062243, lng: 105.75528699 }
    ],
    fullAddress: "Thửa 6 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn039",
    address: "Thửa 7 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 250.39,
    plotNumber: "7/52",
    shape: [
      { lat: 20.9805679, lng: 105.75536395 },
      { lat: 20.98038762, lng: 105.75521955 },
      { lat: 20.98041661, lng: 105.75517873 },
      { lat: 20.98044224, lng: 105.7551426 },
      { lat: 20.98062243, lng: 105.75528699 },
      { lat: 20.9805679, lng: 105.75536395 }
    ],
    fullAddress: "Thửa 7 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn040",
    address: "Thửa 8 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 249.26,
    plotNumber: "8/52",
    shape: [
      { lat: 20.98051354, lng: 105.75544052 },
      { lat: 20.98033326, lng: 105.75529612 },
      { lat: 20.98036762, lng: 105.75524773 },
      { lat: 20.98038762, lng: 105.75521955 },
      { lat: 20.9805679, lng: 105.75536395 },
      { lat: 20.98051354, lng: 105.75544052 }
    ],
    fullAddress: "Thửa 8 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn041",
    address: "Thửa 9 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 248.98,
    plotNumber: "9/52",
    shape: [
      { lat: 20.98045901, lng: 105.75551689 },
      { lat: 20.98027891, lng: 105.75537259 },
      { lat: 20.98031854, lng: 105.75531692 },
      { lat: 20.98033326, lng: 105.75529612 },
      { lat: 20.98051354, lng: 105.75544052 },
      { lat: 20.98045901, lng: 105.75551689 }
    ],
    fullAddress: "Thửa 9 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn042",
    address: "Thửa 10 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 248.9,
    plotNumber: "10/52",
    shape: [
      { lat: 20.98040295, lng: 105.75559249 },
      { lat: 20.98022429, lng: 105.75544935 },
      { lat: 20.98026946, lng: 105.75538582 },
      { lat: 20.98027891, lng: 105.75537259 },
      { lat: 20.98045901, lng: 105.75551689 },
      { lat: 20.98040295, lng: 105.75559249 }
    ],
    fullAddress: "Thửa 10 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn043",
    address: "Thửa 11 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 247.3,
    plotNumber: "11/52",
    shape: [
      { lat: 20.980352192798, lng: 105.75566997132 },
      { lat: 20.980171914014, lng: 105.75552557567 },
      { lat: 20.980173095452, lng: 105.75552394668 },
      { lat: 20.980222718382, lng: 105.75545495208 },
      { lat: 20.980226535792, lng: 105.75544958561 },
      { lat: 20.980405194387, lng: 105.75559272284 },
      { lat: 20.980352192798, lng: 105.75566997132 }
    ],
    fullAddress: "Thửa 11 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn044",
    address: "Thửa 12 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 260,
    plotNumber: "12/52",
    shape: [
      { lat: 20.980256293416, lng: 105.7557254614 },
      { lat: 20.980112196204, lng: 105.75561009939 },
      { lat: 20.980171914014, lng: 105.75552557567 },
      { lat: 20.980352192798, lng: 105.75566997132 },
      { lat: 20.980322657242, lng: 105.7557105999 },
      { lat: 20.980256293416, lng: 105.7557254614 }
    ],
    fullAddress: "Thửa 12 Tờ 52, Phường Dương Nội, Hà Đông, Hà Nội",
  },
  {
    id: "hn045",
    address: "Thửa 1 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 224.97,
    plotNumber: "1/21",
    shape: [
      { lat: 20.98022429, lng: 105.75544935 },
      { lat: 20.98022047, lng: 105.75545472 },
      { lat: 20.98003974, lng: 105.75530994 },
      { lat: 20.98008864, lng: 105.75524104 },
      { lat: 20.98026946, lng: 105.75538582 },
      { lat: 20.98022429, lng: 105.75544935 }
    ],
    fullAddress: "Thửa 1 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn046",
    address: "Thửa 2 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.3,
    plotNumber: "2/21",
    shape: [
      { lat: 20.980271708605, lng: 105.75538605041 },
      { lat: 20.980090889338, lng: 105.75524126777 },
      { lat: 20.980139879902, lng: 105.75517226993 },
      { lat: 20.980320789122, lng: 105.75531714916 },
      { lat: 20.980281160949, lng: 105.75537282614 },
      { lat: 20.980271708605, lng: 105.75538605041 }
    ],
    fullAddress: "Thửa 2 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn047",
    address: "Thửa 3 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.39,
    plotNumber: "3/21",
    shape: [
      { lat: 20.98038762, lng: 105.75521955 },
      { lat: 20.98036762, lng: 105.75524773 },
      { lat: 20.98018671, lng: 105.75510294 },
      { lat: 20.98023579, lng: 105.75503395 },
      { lat: 20.98041661, lng: 105.75517873 },
      { lat: 20.98038762, lng: 105.75521955 }
    ],
    fullAddress: "Thửa 3 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn048",
    address: "Thửa 4 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.18,
    plotNumber: "4/21",
    shape: [
      { lat: 20.98044224, lng: 105.7551426 },
      { lat: 20.98041661, lng: 105.75517873 },
      { lat: 20.98023579, lng: 105.75503395 },
      { lat: 20.98028478, lng: 105.75496495 },
      { lat: 20.98046551, lng: 105.75510973 },
      { lat: 20.98044224, lng: 105.7551426 }
    ],
    fullAddress: "Thửa 4 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn049",
    address: "Thửa 5 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.57,
    plotNumber: "5/21",
    shape: [
      { lat: 20.98049678, lng: 105.75506574 },
      { lat: 20.98046551, lng: 105.75510973 },
      { lat: 20.98028478, lng: 105.75496495 },
      { lat: 20.98033386, lng: 105.75489585 },
      { lat: 20.98051459, lng: 105.75504064 },
      { lat: 20.98049678, lng: 105.75506574 }
    ],
    fullAddress: "Thửa 5 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn050",
    address: "Thửa 6 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.4,
    plotNumber: "6/21",
    shape: [
      { lat: 20.980516842942, lng: 105.75504086914 },
      { lat: 20.980336113704, lng: 105.75489608711 },
      { lat: 20.980385104559, lng: 105.75482699287 },
      { lat: 20.980565833855, lng: 105.75497177486 },
      { lat: 20.980553381733, lng: 105.75498931188 },
      { lat: 20.980516842942, lng: 105.75504086914 }
    ],
    fullAddress: "Thửa 6 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn051",
    address: "Thửa 7 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 225.05,
    plotNumber: "7/21",
    shape: [
      { lat: 20.98060012, lng: 105.75491999 },
      { lat: 20.98056358, lng: 105.75497154 },
      { lat: 20.98038286, lng: 105.75482676 },
      { lat: 20.98043184, lng: 105.75475786 },
      { lat: 20.98061252, lng: 105.7549025 },
      { lat: 20.98060012, lng: 105.75491999 }
    ],
    fullAddress: "Thửa 7 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn052",
    address: "Thửa 8 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 227.58,
    plotNumber: "8/21",
    shape: [
      { lat: 20.98064916, lng: 105.75485093 },
      { lat: 20.98061252, lng: 105.7549025 },
      { lat: 20.98043184, lng: 105.75475786 },
      { lat: 20.98047913, lng: 105.75468683 },
      { lat: 20.98066173, lng: 105.75483315 },
      { lat: 20.98064916, lng: 105.75485093 }
    ],
    fullAddress: "Thửa 8 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn053",
    address: "Thửa 9 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 227.2,
    plotNumber: "9/21",
    shape: [
      { lat: 20.980663997098, lng: 105.75483339474 },
      { lat: 20.980481377736, lng: 105.75468706456 },
      { lat: 20.980532620173, lng: 105.75461942407 },
      { lat: 20.980713169428, lng: 105.7547641089 },
      { lat: 20.980663997098, lng: 105.75483339474 }
    ],
    fullAddress: "Thửa 9 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  },
  {
    id: "hn054",
    address: "Thửa 10 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội",
    area: 344.19,
    plotNumber: "10/21",
    shape: [
      { lat: 20.98071092, lng: 105.75476388 },
      { lat: 20.98053037, lng: 105.75461919 },
      { lat: 20.98057991, lng: 105.75454943 },
      { lat: 20.98067138, lng: 105.75453585 },
      { lat: 20.98068817, lng: 105.75455728 },
      { lat: 20.98077637, lng: 105.75467005 },
      { lat: 20.98071092, lng: 105.75476388 }
    ],
    fullAddress: "Thửa 10 Tờ 21, Phường Dương Nội, Hà Đông, Hà Nội"
  }   
];