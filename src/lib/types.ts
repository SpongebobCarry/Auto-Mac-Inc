export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  images: string[]; // Array of image URLs, first one is primary
  status: 'Available' | 'Sold';
  features?: string[]; // Optional list of features
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string; // FontAwesome class string e.g., "fa-solid fa-car-burst"
}

export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  location?: string; // e.g., "Montreal, QC"
  avatar?: string; // URL to avatar image
}
