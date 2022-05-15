interface OfferBase {
  id: number;
  category: string;
  city: string;
  price: number;
  old_price: number;
  rooms: number;
  sqm: number;
  photo_main: string;
}

export interface OfferDetail extends OfferBase {
  description: string;
  address: string;
  parking_places: number;
  offer_images: string[];
  dealer: Dealer; 
}

export interface Offer extends OfferBase {
  list_data: Date;
}

export interface Dealer {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  photo: string;
  offer_images?: string[];
}

export interface OfferList {
  count: number;
  current: number;
  total_pages: number;
  results: Offer[];
  dealer?: Dealer;
}