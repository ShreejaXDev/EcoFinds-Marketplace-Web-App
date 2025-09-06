import { Product, Purchase } from './types';
export const products: Product[] = [{
  id: '1',
  title: 'Vintage Wooden Desk',
  description: 'Beautiful handcrafted wooden desk made from reclaimed oak. Perfect for a home office or study area.',
  price: 249.99,
  category: 'Furniture',
  condition: 'Like New',
  imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '101',
    name: 'EcoFurniture',
    rating: 4.8,
    isVerified: true
  },
  year: 2018,
  brand: 'Artisan Woodworks',
  dimensions: '120cm x 60cm x 75cm',
  weight: '35kg',
  material: 'Reclaimed Oak',
  hasWarranty: true,
  hasManual: false,
  quantity: 1,
  isEcoFriendly: true,
  sustainabilityScore: 85
}, {
  id: '2',
  title: 'Bamboo Coffee Mug Set',
  description: 'Set of 4 eco-friendly bamboo coffee mugs. Biodegradable and sustainable.',
  price: 24.99,
  category: 'Kitchen',
  condition: 'New',
  imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '102',
    name: 'GreenKitchen',
    rating: 4.6,
    isVerified: true
  },
  brand: 'EcoCup',
  weight: '400g',
  material: 'Bamboo',
  hasManual: true,
  quantity: 8,
  isEcoFriendly: true,
  sustainabilityScore: 95
}, {
  id: '3',
  title: 'Vintage Leather Jacket',
  description: 'Classic brown leather jacket, gently used. Great condition with minimal wear.',
  price: 89.99,
  category: 'Clothing',
  condition: 'Used',
  imageUrl: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '103',
    name: 'VintageFinds',
    rating: 4.3,
    isVerified: false
  },
  year: 2010,
  brand: 'Classic Leather',
  material: 'Genuine Leather',
  quantity: 1,
  sustainabilityScore: 70
}, {
  id: '4',
  title: 'Solar Powered Charger',
  description: 'Portable solar charger for all your devices. Eco-friendly way to charge on the go.',
  price: 49.99,
  category: 'Electronics',
  condition: 'Like New',
  imageUrl: 'https://images.unsplash.com/photo-1620827252031-876c8e5a558a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '104',
    name: 'GreenTech',
    rating: 4.9,
    isVerified: true
  },
  year: 2022,
  brand: 'SolarCharge',
  dimensions: '15cm x 8cm x 2cm',
  weight: '250g',
  hasManual: true,
  quantity: 5,
  isEcoFriendly: true,
  sustainabilityScore: 90
}, {
  id: '5',
  title: 'Organic Cotton Throw Blanket',
  description: 'Soft and cozy throw blanket made from 100% organic cotton. Perfect for cool evenings.',
  price: 35.5,
  category: 'Home Decor',
  condition: 'New',
  imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '105',
    name: 'EcoHome',
    rating: 4.7,
    isVerified: true
  },
  brand: 'OrganicLiving',
  dimensions: '150cm x 120cm',
  material: 'Organic Cotton',
  quantity: 12,
  isEcoFriendly: true,
  sustainabilityScore: 88
}, {
  id: '6',
  title: 'Recycled Glass Vase',
  description: 'Beautiful handblown vase made from recycled glass. Each piece is unique.',
  price: 42.0,
  category: 'Home Decor',
  condition: 'New',
  imageUrl: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '106',
    name: 'ArtisanGlass',
    rating: 4.8,
    isVerified: true
  },
  dimensions: '25cm x 15cm',
  material: 'Recycled Glass',
  quantity: 3,
  isEcoFriendly: true,
  sustainabilityScore: 92
}, {
  id: '7',
  title: 'Vintage Record Player',
  description: 'Refurbished 1970s record player in excellent working condition. Perfect for vinyl enthusiasts.',
  price: 189.99,
  category: 'Electronics',
  condition: 'Used',
  imageUrl: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '107',
    name: 'RetroAudio',
    rating: 4.5,
    isVerified: false
  },
  year: 1975,
  brand: 'AudioClassics',
  dimensions: '40cm x 35cm x 15cm',
  weight: '5kg',
  quantity: 1,
  sustainabilityScore: 75
}, {
  id: '8',
  title: 'Upcycled Denim Tote Bag',
  description: 'Handmade tote bag created from upcycled denim jeans. Durable and stylish.',
  price: 29.99,
  category: 'Accessories',
  condition: 'New',
  imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  seller: {
    id: '108',
    name: 'UpcycledFashion',
    rating: 4.7,
    isVerified: true
  },
  dimensions: '40cm x 35cm x 10cm',
  material: 'Upcycled Denim',
  quantity: 7,
  isEcoFriendly: true,
  sustainabilityScore: 93
}];
export const purchases: Purchase[] = [{
  id: 'p1',
  product: products[2],
  purchaseDate: '2023-09-15',
  quantity: 1
}, {
  id: 'p2',
  product: products[4],
  purchaseDate: '2023-08-22',
  quantity: 2
}, {
  id: 'p3',
  product: products[7],
  purchaseDate: '2023-07-10',
  quantity: 1
}];
export const categories = ['All Categories', 'Furniture', 'Kitchen', 'Clothing', 'Electronics', 'Home Decor', 'Accessories', 'Books', 'Sports', 'Toys', 'Garden'];
export const conditions = ['All Conditions', 'New', 'Like New', 'Used'];
export const sortOptions = [{
  value: 'newest',
  label: 'Newest First'
}, {
  value: 'oldest',
  label: 'Oldest First'
}, {
  value: 'price-low',
  label: 'Price: Low to High'
}, {
  value: 'price-high',
  label: 'Price: High to Low'
}, {
  value: 'sustainability',
  label: 'Sustainability Score'
}];
export const myListings = [products[0], products[3], products[5]];