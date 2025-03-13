export interface cO2DataType {
  Country: string;
  Industry: string;
  Source: string;
  Unit: string;
  F2008: number;
  F2009: number;
  F2010: number;
  F2011: number;
  F2012: number;
  F2013: number;
  F2014: number;
  F2015: number;
  F2016: number;
  F2017: number;
  F2018: number;
}

export interface cO2ResponseType {
  attributes: cO2DataType;
}

export interface tempChangeType {
    Country: string;
    Source: string;
    Unit: string;
    F2008: number;
    F2009: number;
    F2010: number;
    F2011: number;
    F2012: number;
    F2013: number;
    F2014: number;
    F2015: number;
    F2016: number;
    F2017: number;
    F2018: number;
    F2019: number;
    F2020: number;
    F2021: number;
    F2022: number;
    F2023: number;
}

export interface tempChangeResponseType {
    attributes: cO2DataType;
}
