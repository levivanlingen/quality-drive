// TypeScript interfaces voor AutorijlesStad components

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface WhyPoint {
  title: string;
  description: string;
}

export interface Package {
  name: string;
  price: number;
  lessons: number;
  popular: boolean;
  features: string[];
  note?: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
  location?: string;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
