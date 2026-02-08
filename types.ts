
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Drink' | 'Care' | 'Seed';
  image: string;
  ingredients?: string;
  usage?: string;
  size?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  url: string;
  views: string;
  date: string;
  category?: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Event {
  id: string;
  date: string;
  title: string;
  time: string;
  location: string;
  description: string;
}
