export interface Post {
  readonly name: string;
  readonly description: string;
  readonly pricePerUnit: string;
  readonly image: string;
  readonly offerId: number;
  readonly articleId: number;
}

export enum ViewType {
  list = 'list',
  grid = 'grid'
}

export enum SortOptions {
  pricePerUnitAscending = 'pricePerUnit:asc',
  pricePerUnitDescending = 'pricePerUnit:desc'
}

export enum FilterOptions {
  pricePerUnitLessThanTwo = 'pricePerUnit:$lt2.00'
}
