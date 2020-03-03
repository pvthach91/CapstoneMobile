export class AdvertisementCriteriaSearch {
  isSell: boolean;
  motorcycleName: string;
  brands: Array<number>;
  transmission: string;
  displacementFrom: number;
  displacementTo: number;
  mileAgeFrom: number;
  mileAgeTo: number;
  priceFrom: number;
  priceTo: number;
  state: number;
  city: number;
  findAllCity: boolean;
  sort: number;
  status: Array<string>;
  currentPage: number;
  pageSize: number;


  constructor(isSell: boolean, motorcycleName: string, brands: Array<number>,
              transmission: string, displacementFrom: number, displacementTo: number,
              mileAgeFrom: number, mileAgeTo: number, priceFrom: number, priceTo: number,
              state: number, city: number, findAllCity: boolean, sort: number,
              status: Array<string>, currentPage: number, pageSize: number) {
    this.isSell = isSell;
    this.motorcycleName = motorcycleName;
    this.brands = brands;
    this.transmission = transmission;
    this.displacementFrom = displacementFrom;
    this.displacementTo = displacementTo;
    this.mileAgeFrom = mileAgeFrom;
    this.mileAgeTo = mileAgeTo;
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.state = state;
    this.city = city;
    this.findAllCity = findAllCity;
    this.sort = sort;
    this.status = status;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
  }
}
