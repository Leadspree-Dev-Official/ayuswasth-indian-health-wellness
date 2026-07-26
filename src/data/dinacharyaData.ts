import { DinacharyaItem } from '../types';

export const initialDinacharyaItems: DinacharyaItem[] = [
  {
    id: 'd1',
    timeSlot: '05:30 AM - 06:00 AM',
    sanskritTitle: 'Brahma Muhurta Jagrana',
    englishTitle: 'Dawn Awakening',
    description: 'Wake up during the auspicious ambrosial quiet period before sunrise when Prana is purest in the atmosphere.',
    benefits: 'Calms mind, enhances alertness, synchronizes circadian pineal rhythm.',
    completed: false,
    category: 'Morning'
  },
  {
    id: 'd2',
    timeSlot: '06:05 AM',
    sanskritTitle: 'Ushapana',
    englishTitle: 'Copper Water Rehydration',
    description: 'Drink 1-2 glasses of warm water stored overnight in a pure copper vessel (Tamra Jal).',
    benefits: 'Flushes overnight GI waste, stimulates peristalsis, balances digestive Agni.',
    completed: false,
    category: 'Morning'
  },
  {
    id: 'd3',
    timeSlot: '06:15 AM',
    sanskritTitle: 'Danta Dhavana & Jihva Nirlekhana',
    englishTitle: 'Herb Brush & Copper Tongue Scrape',
    description: 'Clean teeth with herbal paste (neem, clove, babool) and gently scrape tongue 7-10 times using a copper scraper.',
    benefits: 'Removes overnight white oral toxin film (Ama) and enhances taste bud sensitivity.',
    completed: false,
    category: 'Morning'
  },
  {
    id: 'd4',
    timeSlot: '06:30 AM - 07:15 AM',
    sanskritTitle: 'Vyayama & Pranayama',
    englishTitle: 'Yoga Movement & Breath Control',
    description: 'Perform gentle Surya Namaskar salutations followed by 10 minutes of Anulom Vilom breathwork.',
    benefits: 'Metabolizes Kapha sluggishness, lubricates joints, elevates oxygen supply.',
    completed: false,
    category: 'Morning'
  },
  {
    id: 'd5',
    timeSlot: '07:30 AM',
    sanskritTitle: 'Abhyanga & Snana',
    englishTitle: 'Self Sesame Oil Massage & Warm Bath',
    description: 'Massage warm sesame oil (or coconut in summer) over skin before taking a refreshing warm shower.',
    benefits: 'Soothes dry Vata skin, relaxes nervous system, improves lymphatic circulation.',
    completed: false,
    category: 'Morning'
  },
  {
    id: 'd6',
    timeSlot: '12:30 PM - 01:30 PM',
    sanskritTitle: 'Madhyahna Sattvic Ahara',
    englishTitle: 'Mindful Main Lunch',
    description: 'Consume your primary nutrient-dense meal when solar Pitta and digestive Agni peak at noon.',
    benefits: 'Optimal nutrient breakdown, prevents post-lunch sluggishness.',
    completed: false,
    category: 'Afternoon'
  },
  {
    id: 'd7',
    timeSlot: '05:30 PM',
    sanskritTitle: 'Sandhya Herb Tea & Walk',
    englishTitle: 'Dusk Herb Brew & Barefoot Walk',
    description: 'Enjoy a warm cup of Tulsi-Ginger tea and take a 100-step light walk (Shatapadi) outdoors.',
    benefits: 'Reduces cortisol after work, aids evening digestion, Grounds nervous system.',
    completed: false,
    category: 'Evening'
  },
  {
    id: 'd8',
    timeSlot: '09:30 PM - 10:00 PM',
    sanskritTitle: 'Ratricharya & Sleep',
    englishTitle: 'Golden Moon Milk & Restful Sleep',
    description: 'Sip warm Golden Milk with Ashwagandha & Nutmeg, turn off screens, and sleep before 10 PM.',
    benefits: 'Aligns with Kapha sleep cycle for uninterrupted cell regeneration.',
    completed: false,
    category: 'Night'
  }
];
