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

export interface CostBreakdown {
  travelEstimate: number;
  foodEstimate: number;
  entryFee: number;
}

export interface Review {
  id: string;
  authorName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  photoUrl?: string; // photo uploaded by visitor or reviewer
}

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
  costBreakdown?: CostBreakdown;
  atmosphere: Atmosphere;
  photos: string[];
  isStudyFriendly: boolean;
  upvotes: number;
  status: 'approved' | 'pending';
  
  facilities?: string[];
  visitorTips?: string;
  sourceOfInfo?: string;
  idealDurationHours?: number;
  matchReason?: string;
  reviews?: Review[];
}