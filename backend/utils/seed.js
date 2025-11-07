const Exercise = require('../models/Exercise');
const Affirmation = require('../models/Affirmation');

async function seedExercises() {
  const count = await Exercise.estimatedDocumentCount();
  if (count > 0) return;
  const items = [
    // Breathing Exercises
    {
      category: 'breathing',
      title: '4-7-8 Breathing',
      description: 'Inhale for 4 counts, hold for 7, exhale for 8. Calms the nervous system.',
      duration: 5
    },
    {
      category: 'breathing',
      title: 'Box Breathing',
      description: 'Inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat for 5 minutes.',
      duration: 5
    },
    {
      category: 'breathing',
      title: 'Diaphragmatic Breathing',
      description: 'Deep belly breathing to reduce stress and anxiety.',
      duration: 10
    },
    {
      category: 'breathing',
      title: 'Alternate Nostril Breathing',
      description: 'Nadi Shodhana - balances the nervous system and calms the mind.',
      duration: 8
    },

    // Meditation Exercises
    {
      category: 'meditation',
      title: 'Body Scan Meditation',
      description: 'Gently scan attention from head to toe, noticing sensations without judgment.',
      duration: 15
    },
    {
      category: 'meditation',
      title: 'Loving-Kindness Meditation',
      description: 'Send loving thoughts to yourself and others. Cultivates compassion.',
      duration: 10
    },
    {
      category: 'meditation',
      title: 'Mindful Breathing',
      description: 'Focus on the natural rhythm of your breath. Let thoughts pass like clouds.',
      duration: 10
    },
    {
      category: 'meditation',
      title: 'Guided Visualization',
      description: 'Journey to a peaceful place in your mind. Relax and restore.',
      duration: 12
    },

    // Mindfulness Exercises
    {
      category: 'mindfulness',
      title: 'Mindful Walking',
      description: 'Walk slowly, paying attention to each step, sounds, and breath.',
      duration: 10
    },
    {
      category: 'mindfulness',
      title: '5-4-3-2-1 Grounding',
      description: 'Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste.',
      duration: 5
    },
    {
      category: 'mindfulness',
      title: 'Mindful Eating',
      description: 'Eat slowly, savoring each bite. Notice textures, flavors, and sensations.',
      duration: 15
    },
    {
      category: 'mindfulness',
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release each muscle group. Release physical tension.',
      duration: 20
    },

    // Yoga Poses & Sequences
    {
      category: 'yoga',
      title: 'Sun Salutation A',
      description: 'Classic yoga flow to energize and warm up the body.',
      duration: 10
    },
    {
      category: 'yoga',
      title: 'Child\'s Pose Flow',
      description: 'Gentle forward fold to calm the mind and stretch the back.',
      duration: 5
    },
    {
      category: 'yoga',
      title: 'Warrior Poses',
      description: 'Build strength and confidence with Warrior I, II, and III.',
      duration: 15
    },
    {
      category: 'yoga',
      title: 'Tree Pose Balance',
      description: 'Standing balance pose to improve focus and stability.',
      duration: 8
    },
    {
      category: 'yoga',
      title: 'Cat-Cow Stretch',
      description: 'Gentle spinal movement to release tension and improve flexibility.',
      duration: 5
    },
    {
      category: 'yoga',
      title: 'Downward Dog Flow',
      description: 'Inversion pose to energize and strengthen the whole body.',
      duration: 8
    },
    {
      category: 'yoga',
      title: 'Seated Forward Fold',
      description: 'Calming forward bend to stretch the spine and hamstrings.',
      duration: 5
    },
    {
      category: 'yoga',
      title: 'Corpse Pose (Savasana)',
      description: 'Final relaxation pose to integrate the practice and restore.',
      duration: 10
    },
    {
      category: 'yoga',
      title: 'Mountain Pose Meditation',
      description: 'Standing meditation to ground and center yourself.',
      duration: 8
    },
    {
      category: 'yoga',
      title: 'Gentle Hip Openers',
      description: 'Release tension in the hips with gentle stretches.',
      duration: 12
    },

    // Additional Wellness Exercises
    {
      category: 'mindfulness',
      title: 'Gratitude Practice',
      description: 'Reflect on three things you\'re grateful for today.',
      duration: 5
    },
    {
      category: 'meditation',
      title: 'Mantra Meditation',
      description: 'Repeat a calming phrase or word to focus the mind.',
      duration: 10
    },
    {
      category: 'breathing',
      title: 'Ocean Breath (Ujjayi)',
      description: 'Deep breathing with a soft sound to calm and focus.',
      duration: 8
    }
  ];
  await Exercise.insertMany(items);
  console.log('Seeded exercises');
}

async function seedAffirmations() {
  const count = await Affirmation.estimatedDocumentCount();
  if (count > 0) return;
  const items = [
    { text: 'I am safe, I am grounded, I can do hard things.', category: 'mindfulness' },
    { text: 'I treat myself with kindness today.', category: 'self-love' },
    { text: 'I am improving a little every day.', category: 'motivation' }
  ];
  await Affirmation.insertMany(items);
  console.log('Seeded affirmations');
}

async function runAllSeeds() {
  await seedExercises();
  await seedAffirmations();
}

module.exports = { runAllSeeds };


