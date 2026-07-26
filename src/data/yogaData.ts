import { YogaPose, PranayamaSession } from '../types';

export const yogaPoses: YogaPose[] = [
  {
    id: 'surya-namaskar',
    sanskritName: 'Surya Namaskar',
    englishName: 'Sun Salutation (12 Dynamic Sequence)',
    category: 'Asana',
    difficulty: 'Beginner',
    duration: '10 - 15 mins',
    targetDosha: 'Tridoshic (Balances Vata, Pitta & Kapha)',
    benefits: [
      'Invigorates cardiovascular circulatory health',
      'Stretches spine, hamstrings, shoulders, and abdomen',
      'Kindles solar plexus Agni and promotes metabolic balance'
    ],
    cautions: ['Avoid in high fever, acute back injury, or third trimester pregnancy'],
    steps: [
      'Pranamasana (Prayer Pose) at the front of your mat',
      'Hastauttanasana (Raised Arms Pose) extending spine upwards',
      'Padahastasana (Standing Forward Bend) touching toes',
      'Ashwa Sanchalanasana (Equestrian Pose) stepping right leg back',
      'Dandasana (Plank Pose) engaging core',
      'Ashtanga Namaskar (8-Limbed Salute) chest and chin to floor',
      'Bhujangasana (Cobra Pose) lifting chest smoothly',
      'Adho Mukha Svanasana (Downward Dog) pressing heels toward ground',
      'Repeat on left side to complete 1 round'
    ],
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bhujangasana',
    sanskritName: 'Bhujangasana',
    englishName: 'Cobra Pose',
    category: 'Asana',
    difficulty: 'Beginner',
    duration: '3 - 5 mins',
    targetDosha: 'Pacifies Vata & Kapha',
    benefits: [
      'Strengthens entire spinal column and lower lumbar',
      'Opens chest cavity for deeper lung expansion',
      'Gently massages abdominal organs and adrenal glands'
    ],
    cautions: ['Avoid forcing back bend if experiencing severe sciatica or hernia'],
    steps: [
      'Lie flat on abdomen with forehead resting on mat.',
      'Place palms flat beside shoulders, elbows kept close to body.',
      'Inhale deeply and gently peel chest off the floor using back muscles.',
      'Keep shoulders relaxed away from ears, gaze gently forward or upward.',
      'Hold position for 30-45 seconds taking slow, steady belly breaths.',
      'Exhale slowly and lower chest back down.'
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'trikonasana',
    sanskritName: 'Trikonasana',
    englishName: 'Extended Triangle Pose',
    category: 'Asana',
    difficulty: 'Beginner',
    duration: '3 mins each side',
    targetDosha: 'Pacifies Pitta & Kapha',
    benefits: [
      'Improves spinal lateral flexibility and hip opening',
      'Stimulates liver, spleen, and intestinal peristalsis',
      'Relieves stress and improves grounding stability'
    ],
    cautions: ['Look straight ahead rather than up if neck strain is present'],
    steps: [
      'Stand with feet wide apart (about 3.5 to 4 feet).',
      'Turn right foot out 90 degrees and left foot in 15 degrees.',
      'Extend arms parallel to floor, inhale lengthen spine.',
      'Exhale and hinge right torso over right leg, lowering right hand to shin or ankle.',
      'Reach left arm straight up toward sky, stacking shoulders.',
      'Hold for 5 deep breaths, repeat on opposite side.'
    ],
    image: 'https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'viparita-karani',
    sanskritName: 'Viparita Karani',
    englishName: 'Legs-Up-The-Wall Restorative Pose',
    category: 'Asana',
    difficulty: 'Beginner',
    duration: '10 - 15 mins',
    targetDosha: 'Pacifies Vata & Pitta',
    benefits: [
      'Promotes lymphatic drainage and leg edema reduction',
      'Calms parasympathetic nervous system for instant anxiety relief',
      'Improves sleep induction and lowers elevated heart rate'
    ],
    cautions: ['Avoid during heavy menstrual flow or unmanaged glaucoma'],
    steps: [
      'Sit close to a clean wall with hips touching or near the baseboard.',
      'Swing legs up against the wall as you swing shoulders down to floor.',
      'Rest arms relaxed by your sides with palms facing upward.',
      'Close eyes, soften forehead, and breathe deeply into belly.',
      'Stay in pose for 10-15 quiet minutes.'
    ],
    image: 'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=800'
  }
];

export const pranayamaSessions: PranayamaSession[] = [
  {
    id: 'anulom-vilom',
    name: 'Alternate Nostril Breathing',
    sanskritName: 'Anulom Vilom (Nadi Shodhana)',
    description: 'Harmonizes left (Ida/Lunar) and right (Pingala/Solar) energy channels, balances brain hemispheres, and dissolves nervous tension.',
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
    holdAfterExhaleSec: 0,
    recommendedRounds: 12,
    benefits: [
      'Cleanses 72,000 subtle Nadis (energy channels)',
      'Lowers mental chatter and anxiety within 3 minutes',
      'Promotes pristine mental focus and oxygen supply'
    ]
  },
  {
    id: 'bhramari',
    name: 'Humming Bee Breath',
    sanskritName: 'Bhramari Pranayama',
    description: 'Produces a soothing resonance humming sound in the cranium that stimulates nitric oxide release, lowers blood pressure, and calms anger.',
    inhaleSec: 4,
    holdSec: 0,
    exhaleSec: 8,
    holdAfterExhaleSec: 0,
    recommendedRounds: 9,
    benefits: [
      'Instant relief from frustration, anger, and mental fatigue',
      'Vibrational acoustic waves calm hyperactive Pitta mind',
      'Stimulates pineal and pituitary endocrine health'
    ]
  },
  {
    id: 'kapalabhati',
    name: 'Skull Shining Breath',
    sanskritName: 'Kapalabhati Kriya',
    description: 'Dynamic abdominal expulsion breathing that clears sinuses, metabolizes excess Kapha, kindles Agni, and sharpens alertness.',
    inhaleSec: 1,
    holdSec: 0,
    exhaleSec: 1,
    holdAfterExhaleSec: 0,
    recommendedRounds: 30,
    benefits: [
      'Burns visceral abdominal fat and boosts oxygen intake',
      'Clears mucus accumulation from respiratory bronchial tree',
      'Gives a radiant facial glow and elevated mental clarity'
    ]
  },
  {
    id: 'sheetali',
    name: 'Cooling Tube Breath',
    sanskritName: 'Sheetali Pranayama',
    description: 'Inhaling through a curled tongue cools internal body temperature, quenches thirst, and soothes acidity and inflammatory heat.',
    inhaleSec: 5,
    holdSec: 3,
    exhaleSec: 5,
    holdAfterExhaleSec: 0,
    recommendedRounds: 10,
    benefits: [
      'Instantly reduces internal heat, hyperacidity, and hot flashes',
      'Pacifies aggravated Pitta dosha during summer months',
      'Refreshes mouth and promotes calm state'
    ]
  }
];
