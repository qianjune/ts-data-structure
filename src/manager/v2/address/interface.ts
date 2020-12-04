/**
 * 直辖市数据处理
 */
export const ZhiXiaShi = [
  {
    "code": "110100",
    "name": "北京市",
    "province": "11",
    "city": "01",
  }, {
    "code": "120100",
    "name": "天津市",
    "province": "12",
    "city": "01",
  }, {
    "code": "310100",
    "name": "上海市",
    "province": "31",
    "city": "01",
  }, {
    "code": "500100",
    "name": "重庆市",
    "province": "50",
    "city": "01",
  },
]
export enum FetchAddressType {
  ALL,
  PROVINCE,
  CITY,
  AREA,
  TOWN
}

export interface AddressItem {
  memberId: string
  country?: string
  province: string
  city: string
  area: string
  town?: string
  address: string
  tel: string
  receiver: string
}