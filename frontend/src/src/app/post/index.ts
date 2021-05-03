export interface Post {
  readonly offerId?: number;
  readonly articleId?: number;
  readonly name?: string;
  readonly description?: string;
  readonly image?: string;
  readonly pricePerUnitText?: string;
  readonly pricePerUnit?: number;
  readonly price?: number;
}
