import { Question } from '../types';

export const prakritiQuestions: Question[] = [
  {
    id: 1,
    category: 'Physical Structure',
    title: 'Body Frame & Physical Build',
    subtitle: 'How would you describe your natural physical frame?',
    options: [
      { text: 'Slender, lean, difficulty gaining weight or muscle', dosha: 'vata' },
      { text: 'Medium, athletic, well-proportioned, moderate muscle', dosha: 'pitta' },
      { text: 'Broad, sturdy, large-boned, gains weight easily', dosha: 'kapha' }
    ]
  },
  {
    id: 2,
    category: 'Skin & Complexion',
    title: 'Skin Texture & Characteristics',
    subtitle: 'What is your natural skin tendency?',
    options: [
      { text: 'Dry, thin, cool to touch, prone to chapping/roughness', dosha: 'vata' },
      { text: 'Warm, oily T-zone, reddish tone, prone to acne or sunburn', dosha: 'pitta' },
      { text: 'Thick, smooth, oily, soft, pale, moist and cool', dosha: 'kapha' }
    ]
  },
  {
    id: 3,
    category: 'Digestion & Agni',
    title: 'Appetite & Digestive Metabolism (Agni)',
    subtitle: 'How does your appetite and digestion usually function?',
    options: [
      { text: 'Irregular (Visham Agni) - variable appetite, prone to gas/bloating', dosha: 'vata' },
      { text: 'Strong & Sharp (Tikshna Agni) - intense hunger, irritable if missed meals', dosha: 'pitta' },
      { text: 'Slow & Steady (Manda Agni) - low appetite, feels heavy after eating', dosha: 'kapha' }
    ]
  },
  {
    id: 4,
    category: 'Sleep Pattern',
    title: 'Sleep Duration & Sleep Quality',
    subtitle: 'Which description best matches your night rest?',
    options: [
      { text: 'Light, interrupted sleep, difficulty falling asleep, vivid dreams', dosha: 'vata' },
      { text: 'Moderate sleep (6-7 hrs), sound, wake up feeling sharp & alert', dosha: 'pitta' },
      { text: 'Deep, heavy, prolonged sleep (8+ hrs), hard to wake up early', dosha: 'kapha' }
    ]
  },
  {
    id: 5,
    category: 'Mental Temperament',
    title: 'Mind, Learning & Emotional Reaction',
    subtitle: 'How does your mind process information and stress?',
    options: [
      { text: 'Learns quickly, forgets easily, active, anxious or restless under stress', dosha: 'vata' },
      { text: 'Intellectual, focused, precise, ambitious, impatient or fiery under stress', dosha: 'pitta' },
      { text: 'Calm, patient, deliberate, learns slowly but retains permanently, steady', dosha: 'kapha' }
    ]
  },
  {
    id: 6,
    category: 'Climatic Preference',
    title: 'Temperature & Weather Sensitivity',
    subtitle: 'Which weather condition bothers you the most?',
    options: [
      { text: 'Dislike cold, windy, or dry weather; love warm sunlight', dosha: 'vata' },
      { text: 'Dislike heat, humidity, and direct hot sun; prefer cool breezes', dosha: 'pitta' },
      { text: 'Dislike cold, damp, rainy, or cloudy weather; prefer dry warmth', dosha: 'kapha' }
    ]
  },
  {
    id: 7,
    category: 'Speech & Energy',
    title: 'Physical Energy & Speech Style',
    subtitle: 'How would you describe your natural energy levels?',
    options: [
      { text: 'Bursts of high energy followed by sudden fatigue; fast, quick speech', dosha: 'vata' },
      { text: 'Sustained intensity, medium speed, precise & articulate speech', dosha: 'pitta' },
      { text: 'Steady, durable stamina, slow-paced movement and melodic speech', dosha: 'kapha' }
    ]
  },
  {
    id: 8,
    category: 'Joints & Movement',
    title: 'Joints, Hair & Flexibility',
    subtitle: 'What are the physical details of your joints and hair?',
    options: [
      { text: 'Dry/frizzy hair, prominent joints that may crack during movement', dosha: 'vata' },
      { text: 'Fine, thin hair (early graying/balding tendency), flexible warm joints', dosha: 'pitta' },
      { text: 'Thick, lustrous, wavy hair, padded well-lubricated strong joints', dosha: 'kapha' }
    ]
  }
];
