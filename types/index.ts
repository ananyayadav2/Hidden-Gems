export type Language = 'en' | 'hi' | 'mr';
export type UserRole = 'tourist' | 'owner';
export type Atmosphere = 'quiet' | 'moderate' | 'lively';

export type Category = 
  | 'cheap_eats'
  | 'study_work'
  | 'parks_peaceful'
  | 'scenic_viewpoints'
  | 'art_culture'
  | 'bookshops'
  | 'local_markets'
  | 'stay_accommodation';

export interface Place {
  id: string;
  name: string;
  description: string;
  city: string;
  area: string;
  lat: number;
  lng: number;
  category: Category;
  costPerPerson: number;
  entryFee: number;
  atmosphere: Atmosphere;
  photos: string[];
  isStudyFriendly: boolean;
  upvotes: number;
  status: 'approved' | 'pending';
}