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

export enum SortOption {
  pricePerUnitAscending = 'pricePerUnit:asc',
  pricePerUnitDescending = 'pricePerUnit:desc'
}

export enum FilterOption {
  pricePerUnitLessThanTwo = 'pricePerUnit:$lt2.00'
}
