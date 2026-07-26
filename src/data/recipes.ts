import { Recipe } from '../types';

export const indianRecipes: Recipe[] = [
  {
    id: 'kitchari-tridoshic',
    title: 'Tridoshic Healing Moong Dal Kitchari',
    sanskritName: 'Sattva Kitchari',
    category: 'Lunch',
    region: 'Pan-Indian',
    prepTime: '15 mins',
    cookTime: '25 mins',
    calories: 340,
    protein: '14g',
    fiber: '8g',
    doshaSuitability: {
      vata: 'Balances',
      pitta: 'Balances',
      kapha: 'Balances'
    },
    attributes: ['Sattvic', 'Gut Healing', 'Gluten Free', 'Immunity'],
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800',
    description: 'The quintessential Ayurvedic comfort food made with split yellow moong, basmati rice, A2 cow ghee, cumin, turmeric, and fresh ginger. Restores digestive fire (Agni).',
    ingredients: [
      '1/2 cup Split Yellow Moong Dal',
      '1/2 cup Organic Basmati Rice',
      '1 tbsp Pure A2 Cow Ghee',
      '1 tsp Cumin Seeds (Jeera)',
      '1/2 tsp Turmeric Powder (Haldi)',
      '1 tsp Freshly Grated Ginger',
      '1 pinch Asafoetida (Hing)',
      'Pink Himalayan Salt to taste',
      'Fresh Coriander & Lime juice for garnish'
    ],
    ayurvedicBenefits: [
      'Gentle on the GI tract, perfect for detox and resetting digestion',
      'Balanced protein profile without producing Ama (toxins)',
      'Ginger and cumin stimulate Agni while ghee soothes mucosal lining'
    ],
    instructions: [
      'Wash moong dal and rice together until water runs clear. Soak for 20 minutes.',
      'Heat ghee in a heavy-bottom pot or pressure cooker on medium flame.',
      'Add cumin seeds and let them splutter, then add grated ginger and hing.',
      'Add turmeric powder, drained rice, and moong dal. Sauté gently for 1 minute.',
      'Pour 4 cups of hot water, add pink salt, and cover. Simmer for 20-25 mins until soft and porridge-like.',
      'Finish with a spoonful of fresh ghee, chopped cilantro, and a squeeze of fresh lime.'
    ]
  },
  {
    id: 'sprouted-moong-chilla',
    title: 'Sprouted Moong & Spinach Protein Chilla',
    sanskritName: 'Mudga Pupa',
    category: 'Breakfast',
    region: 'North Indian',
    prepTime: '10 mins',
    cookTime: '15 mins',
    calories: 280,
    protein: '18g',
    fiber: '10g',
    doshaSuitability: {
      vata: 'Neutral',
      pitta: 'Balances',
      kapha: 'Balances'
    },
    attributes: ['Sattvic', 'High Protein', 'Gluten Free', 'Diabetic Friendly'],
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&q=80&w=800',
    description: 'Crispy savory Indian crepes loaded with plant protein, fresh baby spinach, carom seeds (ajwain), and roasted cumin. Served with mint-coriander chutney.',
    ingredients: [
      '1 cup Sprouted Whole Green Gram (Moong)',
      '1/2 cup Fresh Spinach Leaves',
      '1 Green Chili (seeded)',
      '1/2 tsp Carom Seeds (Ajwain)',
      '1/2 tsp Roasted Cumin Powder',
      '1 pinch Asafoetida',
      '1 tbsp Sesame or Cold-pressed Coconut Oil',
      'Pink Salt to taste'
    ],
    ayurvedicBenefits: [
      'High Bio-available protein with low glycemic index',
      'Ajwain prevents gas and enhances Kapha digestibility',
      'Spinach supplies iron and vital prana'
    ],
    instructions: [
      'Blend sprouted moong, spinach, green chili, ginger, and 1/4 cup water into a smooth batter.',
      'Mix in carom seeds, cumin powder, hing, and pink salt.',
      'Heat a iron tawa or skillet, grease lightly with cold-pressed oil.',
      'Pour a ladle of batter and spread circularly into a thin crepe.',
      'Drizzle a few drops of oil around edges, cook until golden brown on both sides.',
      'Serve hot with fresh mint coconut chutney.'
    ]
  },
  {
    id: 'ragi-almond-sattvic-malt',
    title: 'Warm Finger Millet (Ragi) & Almond Malt',
    sanskritName: 'Rajika Yavagu',
    category: 'Beverages & Kadha',
    region: 'South Indian',
    prepTime: '5 mins',
    cookTime: '10 mins',
    calories: 210,
    protein: '7g',
    fiber: '6g',
    doshaSuitability: {
      vata: 'Balances',
      pitta: 'Neutral',
      kapha: 'Balances'
    },
    attributes: ['Sattvic', 'Gluten Free', 'Immunity'],
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    description: 'Nourishing, calcium-rich traditional South Indian elixir made with sprouted ragi flour, crushed almonds, green cardamom, and organic jaggery or dates.',
    ingredients: [
      '2 tbsp Sprouted Ragi (Finger Millet) Flour',
      '1.5 cups A2 Milk or Oat/Almond Milk',
      '1 tbsp Almond Flour or soaked peeled crushed almonds',
      '1/4 tsp Green Cardamom Powder (Elaichi)',
      '1 tbsp Organic Jaggery Powder or Date Paste',
      '1 pinch Saffron Strands (Kesar)'
    ],
    ayurvedicBenefits: [
      'Exceptional natural calcium, iron, and fiber for bone strength',
      'Cardamom calms Pitta and enhances milk digestibility',
      'Jaggery builds hemoglobin and warms Vata in cooler seasons'
    ],
    instructions: [
      'Whisk ragi flour in 1/2 cup cold water to form a smooth lump-free paste.',
      'Bring milk to a gentle boil in a pan, turn heat to low.',
      'Slowly pour the ragi paste while stirring continuously to avoid lumps.',
      'Simmer for 5-7 minutes until the malt thickens and looks glossy.',
      'Stir in almond powder, cardamom, saffron, and jaggery. Turn off heat.',
      'Serve warm in a clay cuppa or mug.'
    ]
  },
  {
    id: 'golden-turmeric-ashwagandha-milk',
    title: 'Ayurvedic Golden Turmeric Ashwagandha Moon Milk',
    sanskritName: 'Kanchana Ksheera',
    category: 'Beverages & Kadha',
    region: 'Pan-Indian',
    prepTime: '5 mins',
    cookTime: '8 mins',
    calories: 180,
    protein: '6g',
    fiber: '2g',
    doshaSuitability: {
      vata: 'Balances',
      pitta: 'Balances',
      kapha: 'Balances'
    },
    attributes: ['Sattvic', 'Immunity', 'Gut Healing'],
    image: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80&w=800',
    description: 'A restorative evening brew featuring wild Lakadong turmeric, organic Ashwagandha, freshly cracked black pepper, nutmeg, and warm A2 milk.',
    ingredients: [
      '1 cup Warm Organic Milk or Coconut Milk',
      '1/2 tsp Lakadong High-Curcumin Turmeric',
      '1/2 tsp Organic Ashwagandha Powder',
      '1/2 tsp A2 Ghee or Virgin Coconut Oil',
      '1 pinch Freshly Ground Black Pepper (Piperine activator)',
      '1 pinch Nutmeg Powder (Jaiphal for restful sleep)',
      '1 tsp Raw Honey (added after cooling slightly)'
    ],
    ayurvedicBenefits: [
      'Ashwagandha reduces cortisol, calms nervous system and improves sleep latency',
      'Black pepper increases curcumin absorption by up to 2000%',
      'Nutmeg acts as a gentle natural sleep sedative in Ayurveda'
    ],
    instructions: [
      'Simmer milk with turmeric, ashwagandha, black pepper, nutmeg, and ghee for 5 minutes.',
      'Pour into your favorite mug.',
      'Let it cool to warm temperature before whisking in raw honey (honey should never be boiled).',
      'Sip slowly 30 minutes before bed.'
    ]
  },
  {
    id: 'foxtail-millet-poha',
    title: 'Kangni (Foxtail Millet) Vegetable Poha',
    sanskritName: 'Kangni Poha',
    category: 'Breakfast',
    region: 'West Indian',
    prepTime: '10 mins',
    cookTime: '15 mins',
    calories: 310,
    protein: '9g',
    fiber: '9g',
    doshaSuitability: {
      vata: 'Neutral',
      pitta: 'Balances',
      kapha: 'Balances'
    },
    attributes: ['Sattvic', 'Gluten Free', 'Diabetic Friendly', 'High Protein'],
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    description: 'A low-GI millet twist on traditional Maharashtrian poha tossed with curry leaves, crunchy peanuts, mustard seeds, green peas, and fresh pomegranate.',
    ingredients: [
      '1 cup Cooked Foxtail Millet (Kangni)',
      '10 Fresh Curry Leaves (Kadi Patta)',
      '1/2 tsp Black Mustard Seeds (Rai)',
      '2 tbsp Roasted Unsalted Peanuts',
      '1/2 cup Green Peas & Diced Carrots',
      '1/2 tsp Turmeric & Pink Salt',
      '1 tbsp Cold-Pressed Groundnut Oil',
      'Fresh Pomegranate seeds & Coriander for top'
    ],
    ayurvedicBenefits: [
      'Foxtail millet cleanses blood tissues (Rakta Dhatu) and manages blood sugar',
      'Curry leaves bolster hair root strength and improve digestion',
      'Light and fluffy, ideal for Kapha and Pitta morning fuel'
    ],
    instructions: [
      'Fluff cooked foxtail millet with a fork.',
      'Heat groundnut oil in a pan, pop mustard seeds and curry leaves.',
      'Add peanuts, green peas, carrots, and turmeric. Sauté for 4 minutes till tender.',
      'Add millet and pink salt. Toss gently on low flame for 3 minutes.',
      'Garnish with pomegranate arils, cilantro, and lemon juice.'
    ]
  }
];
