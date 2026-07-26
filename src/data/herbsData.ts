import { Herb } from '../types';

export const herbsData: Herb[] = [
  {
    id: 'ashwagandha',
    name: 'Ashwagandha',
    sanskritName: 'Withania Somnifera (Indian Ginseng)',
    botanicalName: 'Withania somnifera',
    primaryBenefit: 'Adaptogen for Cortisol Reduction, Stamina & Nervous System Healing',
    rasa: 'Tikta (Bitter), Kashaya (Astringent), Madhura (Sweet)',
    virya: 'Ushna (Heating)',
    vipaka: 'Madhura (Sweet)',
    doshaImpact: 'Pacifies Vata & Kapha; May increase Pitta in high doses',
    keyUses: [
      'Stress & Anxiety Management',
      'Muscle Strength & Recovery',
      'Cognitive Stamina & Deep Sleep',
      'Adrenal & Thyroid Harmonization'
    ],
    homeRemedy: {
      title: 'Ashwagandha Night Ksheerapaka (Herbal Milk)',
      ingredients: [
        '1/2 tsp Organic Ashwagandha Root Powder',
        '1 cup A2 Warm Cow Milk or Almond Milk',
        '1/4 tsp Green Cardamom Powder',
        '1 tsp Raw Honey or Jaggery'
      ],
      preparation: 'Simmer ashwagandha powder and cardamom in milk on low heat for 5 minutes.',
      howToConsume: 'Drink 30 minutes before bedtime for deep restorative sleep.'
    },
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'tulsi',
    name: 'Holy Basil (Tulsi)',
    sanskritName: 'Surasa / Ocimum Sanctum',
    botanicalName: 'Ocimum sanctum',
    primaryBenefit: 'Queen of Herbs for Respiratory Immunity, Detox & Stress Shield',
    rasa: 'Katu (Pungent), Tikta (Bitter)',
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    doshaImpact: 'Pacifies Kapha & Vata; Mildly increases Pitta if consumed in excess',
    keyUses: [
      'Seasonal Respiratory Immunity & Cough Relief',
      'Antimicrobial & Anti-inflammatory detox',
      'Mental Focus & Prana Enhancer',
      'Regulates Blood Sugar & Lipid Levels'
    ],
    homeRemedy: {
      title: 'Tulsi Ginger Immunity Infusion',
      ingredients: [
        '8-10 Fresh Tulsi (Rama or Krishna) leaves',
        '1/2 inch Fresh Ginger Root, crushed',
        '3 Black Peppercorns, cracked',
        '1 tsp Organic Honey'
      ],
      preparation: 'Boil crushed tulsi leaves, ginger, and pepper in 2 cups of water until reduced to 1 cup.',
      howToConsume: 'Strain, let cool to warm, stir in honey and sip twice daily during seasonal shifts.'
    },
    image: 'https://images.unsplash.com/photo-1509358211563-f222956f4810?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'turmeric-haridra',
    name: 'Lakadong Turmeric (Haridra)',
    sanskritName: 'Haridra (Golden Goddess)',
    botanicalName: 'Curcuma longa',
    primaryBenefit: 'High-Curcumin Anti-Inflammatory, Blood Purifier & Skin Radiance',
    rasa: 'Tikta (Bitter), Katu (Pungent)',
    virya: 'Ushna (Heating)',
    vipaka: 'Katu (Pungent)',
    doshaImpact: 'Tridoshic (Balances all 3 doshas when used in cooking)',
    keyUses: [
      'Joint Lubrication & Anti-Arthritis',
      'Liver Detoxification & Rakta Shodhana',
      'Skin Radiance & Wound Healing',
      'Gut Microbiome Support'
    ],
    homeRemedy: {
      title: 'Golden Paste for Joint Comfort',
      ingredients: [
        '1/4 cup Organic High-Curcumin Turmeric Powder',
        '1/2 cup Pure Filtered Water',
        '1.5 tsp Freshly Ground Black Pepper',
        '1 tbsp Cold-Pressed Virgin Coconut Oil or Ghee'
      ],
      preparation: 'Cook turmeric and water on low heat for 7-10 mins forming a thick paste. Off heat, stir in black pepper and oil.',
      howToConsume: 'Take 1/2 tsp daily stirred in warm milk, oatmeal, or golden smoothies.'
    },
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'triphala',
    name: 'Triphala (Three Fruits)',
    sanskritName: 'Amalaki, Haritaki & Bibhitaki Trio',
    botanicalName: 'Phyllanthus emblica, Terminalia chebula, Terminalia bellirica',
    primaryBenefit: 'Master Colon Cleanser, Gentle Laxative & Ocular Health Booster',
    rasa: 'Contains 5 tastes (except Salty)',
    virya: 'Anushna Sheeta (Slightly Cooling to Balanced)',
    vipaka: 'Madhura (Sweet)',
    doshaImpact: 'Ultimate Tridoshic Formularizer',
    keyUses: [
      'Gentle Overnight Bowel Regularity without cramping',
      'Metabolic Waste (Ama) Scavenger',
      'Eye Vision Strength (Chakshushya)',
      'Rich Vitamin C & Antioxidant Shield'
    ],
    homeRemedy: {
      title: 'Triphala Bedtime Water (Anupana)',
      ingredients: [
        '1 tsp Organic Triphala Churna (Powder)',
        '1 cup Warm Filtered Water'
      ],
      preparation: 'Stir 1 tsp triphala powder into warm water. Let sit for 2 minutes.',
      howToConsume: 'Drink before bed on an empty stomach for morning regularity and gastrointestinal rejuvenation.'
    },
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'brahmi',
    name: 'Brahmi (Gotu Kola / Bacopa)',
    sanskritName: 'Brahmi (Herb of Grace)',
    botanicalName: 'Bacopa monnieri',
    primaryBenefit: 'Brain Tonic for Memory, Synaptic Speed, Clarity & Nervous Calming',
    rasa: 'Tikta (Bitter), Kashaya (Astringent)',
    virya: 'Sheeta (Cooling)',
    vipaka: 'Madhura (Sweet)',
    doshaImpact: 'Pacifies Pitta & Kapha; Calms Vata brain hyperactivity',
    keyUses: [
      'Memory Retention & Focus Enhancement',
      'Soothes Stress-Induced Pitta Headaches',
      'Nourishes Brain Cells & Synapses',
      'Hair Root Vitality when applied as oil'
    ],
    homeRemedy: {
      title: 'Brahmi Ghee Memory Elixir',
      ingredients: [
        '1/2 tsp Brahmi Powder or 1 tsp Fresh Brahmi Juice',
        '1 tsp Pure Warm A2 Ghee'
      ],
      preparation: 'Mix fresh brahmi or powder thoroughly into warm A2 ghee.',
      howToConsume: 'Consume early morning on an empty stomach followed by warm water.'
    },
    image: 'https://images.unsplash.com/photo-1509358211563-f222956f4810?auto=format&fit=crop&q=80&w=800'
  }
];
