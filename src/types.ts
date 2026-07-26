export type DoshaType = 'vata' | 'pitta' | 'kapha';

export interface PrakritiScore {
  vata: number;
  pitta: number;
  kapha: number;
  dominant: string;
}

export interface QuestionOption {
  text: string;
  dosha: DoshaType;
  description?: string;
}

export interface Question {
  id: number;
  category: string;
  title: string;
  subtitle?: string;
  options: QuestionOption[];
}

export interface Recipe {
  id: string;
  title: string;
  sanskritName?: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks' | 'Beverages & Kadha';
  region: 'North Indian' | 'South Indian' | 'West Indian' | 'East Indian' | 'Pan-Indian';
  prepTime: string;
  cookTime: string;
  calories: number;
  protein: string;
  fiber: string;
  doshaSuitability: {
    vata: 'Balances' | 'Neutral' | 'Increases';
    pitta: 'Balances' | 'Neutral' | 'Increases';
    kapha: 'Balances' | 'Neutral' | 'Increases';
  };
  attributes: ('Sattvic' | 'High Protein' | 'Gut Healing' | 'Gluten Free' | 'Immunity' | 'Diabetic Friendly')[];
  image: string;
  description: string;
  ingredients: string[];
  ayurvedicBenefits: string[];
  instructions: string[];
}

export interface MealPlanDay {
  day: number;
  breakfast: string;
  lunch: string;
  eveningSnack: string;
  dinner: string;
  herbalKadha: string;
  dailyTip: string;
}

export interface YogaPose {
  id: string;
  sanskritName: string;
  englishName: string;
  category: 'Asana' | 'Pranayama' | 'Kriya';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  targetDosha: string;
  benefits: string[];
  cautions: string[];
  steps: string[];
  image: string;
}

export interface PranayamaSession {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  holdAfterExhaleSec: number;
  recommendedRounds: number;
  benefits: string[];
}

export interface Herb {
  id: string;
  name: string;
  sanskritName: string;
  botanicalName: string;
  primaryBenefit: string;
  rasa: string; // Taste
  virya: string; // Energy (Heating/Cooling)
  vipaka: string; // Post-digestive effect
  doshaImpact: string;
  keyUses: string[];
  homeRemedy: {
    title: string;
    ingredients: string[];
    preparation: string;
    howToConsume: string;
  };
  image: string;
  price?: number;
}

export interface DinacharyaItem {
  id: string;
  timeSlot: string;
  sanskritTitle: string;
  englishTitle: string;
  description: string;
  benefits: string;
  completed: boolean;
  category: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
}

export interface VaidyaChatMessage {
  id: string;
  sender: 'user' | 'vaidya';
  text: string;
  timestamp: string;
  suggestedHerbs?: string[];
}

export interface BrandProfile {
  businessName: string;
  contactName: string;
  phone: string;
  address: string;
  primaryColor: string;
  submittedAt: number; // timestamp in ms
}

export interface OrderInquiry {
  id: string;
  customerName: string;
  businessName: string;
  phone: string;
  address: string;
  type: 'Meal Plan Request' | 'Herb Order' | 'Consultation Lead' | 'Prakriti Assessment';
  details: string;
  amount: string;
  status: 'New' | 'Confirmed' | 'Out for Delivery' | 'Completed';
  createdAt: string;
  notes?: string;
}

export interface SiteSettings {
  defaultBusinessName: string;
  defaultContactName: string;
  defaultPhone: string;
  defaultAddress: string;
  defaultPrimaryColor: string;
  supportEmail: string;
  tagline: string;
  adminPin: string;
}

