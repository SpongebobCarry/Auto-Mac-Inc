import type { Car, Service, Testimonial } from './types';

// Textual content is now managed in `messages/en.json` and `messages/fr.json`
// This file holds the data structure and non-translatable fields.

export const carsData: Omit<Car, 'make' | 'model' | 'description' | 'features'>[] = [
  {
    id: '1',
    year: 2018,
    price: 18500,
    mileage: 75000,
    images: ['/images/cars/data/2018-Honda-Civic-LX.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Sold',
  },
  {
    id: '2',
    year: 2019,
    price: 24000,
    mileage: 60000,
    images: ['/images/cars/data/Toyota-RAV4-LE-2019.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Sold',
  },
  {
    id: '3',
    year: 2017,
    price: 29500,
    mileage: 95000,
    images: ['/images/cars/data/Ford-F-150-XLT-2017.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Sold',
  },
  {
    id: '4',
    year: 2020,
    price: 26800,
    mileage: 45000,
    images: ['/images/cars/data/Mazda-CX-5-Tourning-2020.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Sold',
  },
  {
    id: '5',
    year: 2021,
    price: 20500,
    mileage: 30000,
    images: ['/images/cars/data/Hyundai-Elantra-Preferred-2021.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Sold',
  },
  {
    id: '6',
    year: 2014,
    price: 15500,
    mileage: 110000,
    images: ['/images/cars/data/mini-cooper-2014.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Available',
  },
  {
    id: '7',
    year: 2014,
    price: 19800,
    mileage: 125000,
    images: ['/images/cars/data/Mercedes-C-2014.jpg', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
    status: 'Available',
  },
  {
    id: '8',
    year: 2016,
    price: 27900,
    mileage: 175306,
    images: ['/images/cars/data/2016 E400 4Matic/exterior 1.jpg',
            '/images/cars/data/2016 E400 4Matic/exterior 2.jpg',
            '/images/cars/data/2016 E400 4Matic/exterior 3.jpg',
            '/images/cars/data/2016 E400 4Matic/exterior 4.jpg',
            '/images/cars/data/2016 E400 4Matic/exterior 5.jpg',
            '/images/cars/data/2016 E400 4Matic/exterior 6.jpg',
            '/images/cars/data/2016 E400 4Matic/interior 1.jpg',
            '/images/cars/data/2016 E400 4Matic/interior 2.jpg',
            '/images/cars/data/2016 E400 4Matic/interior 3.jpg',],
    status: 'Available',
  }
];

export const servicesData: Omit<Service, 'name' | 'description'>[] = [
  { id: '1', icon: 'fa-solid fa-fan' },
  { id: '2', icon: 'fa-solid fa-car-burst' },
  { id: '3', icon: 'fa-solid fa-oil-can' },
  { id: '4', icon: 'fa-solid fa-gears' },
  { id: '5', icon: 'fa-solid fa-screwdriver-wrench' },
];

export const testimonialsData: Omit<Testimonial, 'name' | 'quote' | 'location'>[] = [
  { id: '1', avatar: 'https://placehold.co/100x100.png' },
  { id: '2', avatar: 'https://placehold.co/100x100.png' },
  { id: '3', avatar: 'https://placehold.co/100x100.png' },
];
