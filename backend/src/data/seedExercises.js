export const seedExercises = [
  // CHEST
  {
    id: 'ex-bench-press',
    name: 'Barbell Flat Bench Press',
    slug: 'barbell-bench-press',
    category: 'Chest',
    primaryMuscle: 'Pectoralis Major (Mid/Lower)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie flat on the bench with eyes positioned directly under the barbell.',
      'Grip the bar slightly wider than shoulder-width, retact and depress shoulder blades.',
      'Unrack the bar and stabilize it directly over mid-chest with elbows extended.',
      'Inhale and lower the bar in a controlled diagonal arc to touch the mid-sternum.',
      'Press explosively through the palms while driving feet into the floor until arms lock out.'
    ],
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 120,
    tempo: '3-1-1-0',
    safetyNotes: [
      'Always keep wrists neutral and directly stacked over elbows.',
      'Do not bounce the bar off your ribcage.',
      'Use safety pins or a spotter when lifting near failure.'
    ],
    alternatives: [
      { name: 'Dumbbell Flat Bench Press', equipment: 'dumbbell', reason: 'Better range of motion and joint-friendly unilateral loading.' },
      { name: 'Machine Chest Press', equipment: 'machine', reason: 'Fixed path reduces stabilizer fatigue and maximizes mechanical tension.' },
      { name: 'Push-ups', equipment: 'bodyweight', reason: 'No equipment needed; can be elevated or weighted for progressive overload.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    tips: ['Think about bending the bar in half to engage your lats and stabilize your shoulders.']
  },
  {
    id: 'ex-incline-db-press',
    name: 'Incline Dumbbell Press',
    slug: 'incline-dumbbell-press',
    category: 'Chest',
    primaryMuscle: 'Clavicular Pectoral (Upper Chest)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Set an adjustable bench to a 30 to 45-degree angle.',
      'Sit back with dumbbells rested on thighs, kick them up to shoulder level one by one.',
      'Retract your scapulae and keep your lower back slightly arched.',
      'Press dumbbells upward along a natural convergent arc until elbows are almost locked.',
      'Lower under control until you feel a deep stretch in the upper pectorals.'
    ],
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    tempo: '3-0-1-0',
    safetyNotes: [
      'Avoid setting the bench higher than 45 degrees to avoid shifting emphasis to shoulders.',
      'Do not let dumbbells flare outward past 75 degrees from torso.'
    ],
    alternatives: [
      { name: 'Incline Barbell Bench Press', equipment: 'barbell', reason: 'Higher absolute load capability.' },
      { name: 'Low-to-High Cable Fly', equipment: 'cable', reason: 'Continuous tension at peak contraction.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    tips: ['Tuck your elbows at roughly a 45-degree angle to save the rotator cuff.']
  },
  {
    id: 'ex-cable-crossover',
    name: 'Cable Chest Fly',
    slug: 'cable-chest-fly',
    category: 'Chest',
    primaryMuscle: 'Sternal Pectoralis',
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Set cable pulleys at chest height with D-handles attached.',
      'Step forward into a staggered stance to stabilize your core.',
      'Maintain a slight bend in your elbows throughout the movement.',
      'Bring handles together in front of your chest in a hugging motion, squeezing hard for 1s.',
      'Control the eccentric return until you feel a mild stretch.'
    ],
    defaultSets: 3,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    tempo: '2-1-1-1',
    safetyNotes: [
      'Do not overstretch shoulders behind torso plane if you have anterior shoulder instability.'
    ],
    alternatives: [
      { name: 'Dumbbell Flys', equipment: 'dumbbell', reason: 'Free weight alternative with stretch focus.' },
      { name: 'Resistance Band Chest Fly', equipment: 'resistance_bands', reason: 'Home gym setup without pulleys.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tips: ['Focus on driving your inner elbows toward each other, not just hands touching.']
  },

  // BACK
  {
    id: 'ex-barbell-deadlift',
    name: 'Conventional Barbell Deadlift',
    slug: 'conventional-deadlift',
    category: 'Back',
    primaryMuscle: 'Erector Spinae & Posterior Chain',
    secondaryMuscles: ['Latissimus Dorsi', 'Glutes', 'Hamstrings', 'Trapezius', 'Forearms'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Stand with feet hip-width apart, barbell crossing directly over mid-foot.',
      'Hinge at hips to grab the bar just outside your knees with double-overhand or hook grip.',
      'Pull your chest proud, engage your lats ("pack your armpits"), and wedge your hips.',
      'Drive the floor away through mid-foot while keeping the bar in contact with shins.',
      'Lock out hips and knees simultaneously without hyperextending your lumbar spine.'
    ],
    defaultSets: 3,
    defaultReps: '5-6',
    defaultRestSeconds: 180,
    tempo: '2-1-1-0',
    safetyNotes: [
      'Never allow the lower back to round into flexion under heavy loading.',
      'Reset your breath and brace using the Valsalva maneuver before every single rep.'
    ],
    alternatives: [
      { name: 'Trap Bar Deadlift', equipment: 'barbell', reason: 'More upright torso, lowers shear stress on lumbar spine.' },
      { name: 'Dumbbell Romanian Deadlift', equipment: 'dumbbell', reason: 'Excellent hamstring and glute isolation.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    tips: ['Think of the deadlift as pushing the earth away rather than pulling the bar up.']
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Wide-Grip Lat Pulldown',
    slug: 'lat-pulldown',
    category: 'Back',
    primaryMuscle: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps Brachii', 'Rhomboids', 'Rear Deltoids'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Sit comfortably at the lat pulldown station with thighs secured under roller pads.',
      'Grip the bar slightly wider than shoulder width with an overhand grip.',
      'Lean back slightly (10-15 degrees) and draw scapulae down before pulling.',
      'Pull the bar down toward upper chest by driving elbows down and back.',
      'Pause briefly at the bottom, then resist the bar as it ascends to a full stretch.'
    ],
    defaultSets: 4,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    tempo: '3-0-1-1',
    safetyNotes: [
      'Never pull behind the neck, which places excessive stress on the cervical spine.',
      'Avoid swinging excessively with momentum.'
    ],
    alternatives: [
      { name: 'Pull-ups', equipment: 'bodyweight', reason: 'Gold standard bodyweight vertical pull.' },
      { name: 'Resistance Band Pulldown', equipment: 'resistance_bands', reason: 'Can be anchored to a high door or bar.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    tips: ['Visualize tucking your elbows straight into your back pockets.']
  },
  {
    id: 'ex-seated-cable-row',
    name: 'Seated Cable Row',
    slug: 'seated-cable-row',
    category: 'Back',
    primaryMuscle: 'Rhomboids & Mid Traps',
    secondaryMuscles: ['Latissimus Dorsi', 'Biceps Brachii', 'Erector Spinae'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Sit on the bench with knees slightly bent and feet firmly on footrests.',
      'Grasp the V-grip handle and sit upright with spine neutral and shoulders relaxed.',
      'Pull the handle into your lower abdomen while retracting your shoulder blades.',
      'Squeeze your back muscles for 1 full second at peak contraction.',
      'Return smoothly with arms extending and shoulder blades opening into a gentle stretch.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 75,
    tempo: '3-0-1-1',
    safetyNotes: [
      'Keep core braced; do not let your torso rock back and forth significantly.'
    ],
    alternatives: [
      { name: 'Single-Arm Dumbbell Row', equipment: 'dumbbell', reason: 'Unilateral free weight option with deep stretch.' },
      { name: 'Barbell Bent-Over Row', equipment: 'barbell', reason: 'High recruitment of full posterior chain.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    tips: ['Keep your chest proud and do not let your shoulders roll forward.']
  },

  // SHOULDERS
  {
    id: 'ex-overhead-press',
    name: 'Standing Barbell Overhead Press',
    slug: 'barbell-overhead-press',
    category: 'Shoulders',
    primaryMuscle: 'Anterior Deltoid & Lateral Deltoid',
    secondaryMuscles: ['Triceps Brachii', 'Upper Trapezius', 'Serratus Anterior', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet shoulder-width apart, gripping bar just outside your shoulders.',
      'Rest bar across upper clavicles, squeeze glutes, brace abs, and tighten quads.',
      'Tilt head slightly back to clear chin and press the bar straight up.',
      'Once bar passes forehead, push head slightly forward to lock bar directly over crown.',
      'Lower under control back to clavicle shelf.'
    ],
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 120,
    tempo: '2-1-1-0',
    safetyNotes: [
      'Do not lean backward excessively to turn the lift into an incline bench press.',
      'Keep your glutes locked to protect the lumbar spine.'
    ],
    alternatives: [
      { name: 'Seated Dumbbell Shoulder Press', equipment: 'dumbbell', reason: 'Reduced balance demand and independent arm control.' },
      { name: 'Pike Push-ups', equipment: 'bodyweight', reason: 'No equipment needed vertical pressing pattern.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    tips: ['Active shrugging at the very top provides scapular upward rotation and clears the subacromial space.']
  },
  {
    id: 'ex-db-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    slug: 'dumbbell-lateral-raise',
    category: 'Shoulders',
    primaryMuscle: 'Lateral Deltoid',
    secondaryMuscles: ['Supraspinatus', 'Upper Trapezius'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand with feet hip-width apart, holding dumbbells at sides with neutral grip.',
      'Slight forward lean (10 degrees) at hips to align with scapular plane.',
      'Raise dumbbells out to the sides leading with elbows until parallel to the floor.',
      'Brief pause at shoulder height, then lower slowly for a 3-second count.'
    ],
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    tempo: '3-0-1-1',
    safetyNotes: [
      'Do not swing or use hip thrusting momentum.',
      'Avoid internally rotating hands ("pouring water"), which impinges the rotator cuff.'
    ],
    alternatives: [
      { name: 'Cable Lateral Raise', equipment: 'cable', reason: 'Maintains uniform resistance curve throughout entire arc.' },
      { name: 'Resistance Band Lateral Raise', equipment: 'resistance_bands', reason: 'Easily adjustable tension.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=800&q=80',
    tips: ['Think of reaching outward toward the walls rather than simply lifting upward.']
  },
  {
    id: 'ex-face-pull',
    name: 'Cable Face Pull',
    slug: 'cable-face-pull',
    category: 'Shoulders',
    primaryMuscle: 'Posterior Deltoid & External Rotators',
    secondaryMuscles: ['Infraspinatus', 'Teres Minor', 'Rhomboids', 'Mid/Lower Traps'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Attach a rope to cable pulley set around eye level.',
      'Grip rope ends with thumbs pointing backward or overhand.',
      'Step back, pull rope directly toward bridge of nose or forehead.',
      'Externally rotate shoulders at the finish so your knuckles are pointing back and elbows stay high.',
      'Hold the contraction for 2 seconds, then slowly return.'
    ],
    defaultSets: 3,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    tempo: '2-2-1-1',
    safetyNotes: [
      'Keep weight light; this is a posture-restoration and shoulder-health builder.'
    ],
    alternatives: [
      { name: 'Band Pull-Aparts', equipment: 'resistance_bands', reason: 'Convenient warm-up and postural accessory anywhere.' },
      { name: 'Dumbbell Rear Delt Fly', equipment: 'dumbbell', reason: 'Free weight isolation of rear delts.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1584865288632-0545fb91ba03?auto=format&fit=crop&w=800&q=80',
    tips: ['Finish every rep by flexing the back of your shoulders and feeling the upper back pinch.']
  },

  // LEGS / QUADS / HAMSTRINGS
  {
    id: 'ex-barbell-squat',
    name: 'Barbell Back Squat',
    slug: 'barbell-back-squat',
    category: 'Legs',
    primaryMuscle: 'Quadriceps Femoris',
    secondaryMuscles: ['Gluteus Maximus', 'Adductor Magnus', 'Hamstrings', 'Core'],
    equipment: 'barbell',
    difficulty: 'Advanced',
    instructions: [
      'Step under bar resting across upper traps (high bar) or rear delts (low bar).',
      'Unrack, take two controlled steps back into shoulder-width stance, toes angled slightly out.',
      'Take a deep belly breath, brace core 360 degrees.',
      'Break at hips and knees simultaneously, descending until hip crease is below knee cap.',
      'Drive powerfully out of the hole, keeping chest tall and knees tracking over toes.'
    ],
    defaultSets: 4,
    defaultReps: '6-8',
    defaultRestSeconds: 150,
    tempo: '3-1-1-0',
    safetyNotes: [
      'Ensure knees do not collapse inward (valgus collapse).',
      'Keep heels glued to the floor; use squat shoes or heel plates if ankle mobility is tight.'
    ],
    alternatives: [
      { name: 'Goblet Squat', equipment: 'dumbbell', reason: 'Superb for beginners learning upright squat posture.' },
      { name: 'Leg Press', equipment: 'machine', reason: 'High quad overload with zero spinal loading.' },
      { name: 'Bodyweight Squats', equipment: 'bodyweight', reason: 'Fundamentals and high-rep endurance.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    tips: ['Spread the floor with your feet to engage your glute medius and keep hips open.']
  },
  {
    id: 'ex-romanian-deadlift',
    name: 'Barbell Romanian Deadlift (RDL)',
    slug: 'barbell-rdl',
    category: 'Legs',
    primaryMuscle: 'Hamstrings & Gluteus Maximus',
    secondaryMuscles: ['Erector Spinae', 'Latissimus Dorsi', 'Forearms'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold barbell at hip level with an overhand grip, knees slightly soft (unlocked).',
      'Hinge hips backward as if touching a wall behind you with your glutes.',
      'Slide the barbell down your thighs while keeping your spine neutral and lats packed.',
      'Descend until you feel a maximum stretch in hamstrings (usually mid-shin).',
      'Contract hamstrings and drive hips forward to return to standing lockout.'
    ],
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 90,
    tempo: '3-1-1-0',
    safetyNotes: [
      'Do not bend knees into a squat; this is a pure hip hinge movement.',
      'Stop descending once your hips stop traveling backward to prevent lower back rounding.'
    ],
    alternatives: [
      { name: 'Dumbbell Romanian Deadlift', equipment: 'dumbbell', reason: 'Allows natural arm path closer to body center of mass.' },
      { name: 'Lying Leg Curl', equipment: 'machine', reason: 'Direct knee flexion isolation for hamstrings.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    tips: ['Keep the bar shaving against your legs the entire descent.']
  },
  {
    id: 'ex-walking-lunges',
    name: 'Dumbbell Walking Lunges',
    slug: 'dumbbell-walking-lunges',
    category: 'Legs',
    primaryMuscle: 'Quadriceps & Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core Stabilizers'],
    equipment: 'dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Hold dumbbells at sides with arms relaxed and torso upright.',
      'Take a comfortable forward stride and lower your rear knee until it gently hovers above the floor.',
      'Ensure front shin is relatively vertical or tracking over mid-foot.',
      'Push through front heel to rise smoothly into the next forward step.'
    ],
    defaultSets: 3,
    defaultReps: '10-12 per leg',
    defaultRestSeconds: 90,
    tempo: '2-0-1-0',
    safetyNotes: [
      'Avoid slamming your rear kneecap into the gym floor.',
      'Keep pelvis level to avoid twisting.'
    ],
    alternatives: [
      { name: 'Bulgarian Split Squat', equipment: 'dumbbell', reason: 'Static unilateral exercise with high hypertrophy stimulus.' },
      { name: 'Bodyweight Reverse Lunges', equipment: 'bodyweight', reason: 'Kinder on knees and requires no equipment.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    tips: ['Lean your torso forward 15 degrees if you want to emphasize glutes over quads.']
  },

  // GLUTES
  {
    id: 'ex-barbell-hip-thrust',
    name: 'Barbell Hip Thrust',
    slug: 'barbell-hip-thrust',
    category: 'Glutes',
    primaryMuscle: 'Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Quadriceps', 'Core'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Sit on floor with upper back against a sturdy bench (below scapula).',
      'Roll a padded barbell over hips with feet flat, hip-width apart.',
      'Drive through your heels to extend hips toward the ceiling until thighs and torso form a straight line.',
      'Keep chin tucked and ribs down to prevent lumbar hyperextension.',
      'Squeeze glutes maximally for a full 2-second hold at the top before lowering.'
    ],
    defaultSets: 4,
    defaultReps: '8-12',
    defaultRestSeconds: 90,
    tempo: '2-2-1-0',
    safetyNotes: [
      'Always use a bar pad to protect pelvic crests.',
      'Keep eyes forward looking at your knees at lockout to maintain posterior pelvic tilt.'
    ],
    alternatives: [
      { name: 'Dumbbell Glute Bridge', equipment: 'dumbbell', reason: 'Simple setup on the floor.' },
      { name: 'Cable Pull-Through', equipment: 'cable', reason: 'Excellent horizontal hip extension pattern.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
    tips: ['Your shins should be vertical at full hip extension.']
  },

  // BICEPS
  {
    id: 'ex-barbell-curl',
    name: 'Standing Barbell Bicep Curl',
    slug: 'barbell-bicep-curl',
    category: 'Biceps',
    primaryMuscle: 'Biceps Brachii',
    secondaryMuscles: ['Brachialis', 'Brachioradialis', 'Forearm Flexors'],
    equipment: 'barbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand upright holding bar with shoulder-width underhand (supinated) grip.',
      'Keep elbows pinned closely by your ribcage.',
      'Curl the bar upward toward upper chest by flexing elbows.',
      'Squeeze biceps hard at the peak, then lower in a controlled 3-second descent.'
    ],
    defaultSets: 3,
    defaultReps: '8-10',
    defaultRestSeconds: 75,
    tempo: '3-0-1-1',
    safetyNotes: [
      'Do not lean backward or swing with your lower back.',
      'Use an EZ-curl bar if straight bar creates wrist or elbow discomfort.'
    ],
    alternatives: [
      { name: 'Dumbbell Incline Curl', equipment: 'dumbbell', reason: 'Maximizes long head stretch under passive tension.' },
      { name: 'Cable Bicep Curl', equipment: 'cable', reason: 'Continuous tension at peak contraction.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    tips: ['Keep your wrists slightly extended or neutral to prevent forearm pump from dominating.']
  },
  {
    id: 'ex-db-hammer-curl',
    name: 'Dumbbell Hammer Curl',
    slug: 'dumbbell-hammer-curl',
    category: 'Biceps',
    primaryMuscle: 'Brachialis & Brachioradialis',
    secondaryMuscles: ['Biceps Brachii (Short Head)'],
    equipment: 'dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Stand holding dumbbells with palms facing each other (neutral grip).',
      'Curl dumbbells simultaneously or alternating, keeping elbows tucked.',
      'Hold at the top for 1 second, then lower steadily.'
    ],
    defaultSets: 3,
    defaultReps: '10-12',
    defaultRestSeconds: 60,
    tempo: '2-0-1-1',
    safetyNotes: ['Keep shoulders back and chest open.'],
    alternatives: [
      { name: 'Rope Cable Hammer Curl', equipment: 'cable', reason: 'Constant resistance through elbow flexion.' },
      { name: 'Resistance Band Hammer Curl', equipment: 'resistance_bands', reason: 'Portable high-rep finisher.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    tips: ['Building the brachialis underneath pushes the bicep peak up for fuller arm thickness.']
  },

  // TRICEPS
  {
    id: 'ex-tricep-rope-pushdown',
    name: 'Cable Tricep Rope Pushdown',
    slug: 'cable-tricep-pushdown',
    category: 'Triceps',
    primaryMuscle: 'Triceps Brachii (Lateral & Medial Head)',
    secondaryMuscles: ['Anconeus'],
    equipment: 'cable',
    difficulty: 'Beginner',
    instructions: [
      'Attach rope attachment to high cable pulley.',
      'Grasp rope, bend elbows 90 degrees with upper arms pinned to your sides.',
      'Extend elbows downward, spreading rope ends apart at the bottom to lock out.',
      'Hold peak squeeze for 1 second, then allow forearms to rise to 90 degrees under control.'
    ],
    defaultSets: 3,
    defaultReps: '10-14',
    defaultRestSeconds: 60,
    tempo: '3-0-1-1',
    safetyNotes: ['Keep elbows stationary; do not let elbows drift forward and back.'],
    alternatives: [
      { name: 'Overhead Dumbbell Tricep Extension', equipment: 'dumbbell', reason: 'Focuses heavily on the triceps long head.' },
      { name: 'Bench Dips', equipment: 'bodyweight', reason: 'Bodyweight tricep builder.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tips: ['Flare the rope outward around your hips at the bottom for intense lateral head recruitment.']
  },
  {
    id: 'ex-skull-crushers',
    name: 'EZ-Bar Lying Triceps Extension (Skull Crushers)',
    slug: 'lying-tricep-extension',
    category: 'Triceps',
    primaryMuscle: 'Triceps Brachii (Long Head)',
    secondaryMuscles: ['Lateral & Medial Triceps'],
    equipment: 'barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on flat bench with EZ-bar held directly above forehead with overhand grip.',
      'Angle upper arms slightly back toward your head (10 degrees) to keep tension on triceps.',
      'Hinge strictly at elbows to lower the bar toward the crown of your head.',
      'Contract triceps to extend arms back to the starting position.'
    ],
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSeconds: 75,
    tempo: '3-1-1-0',
    safetyNotes: [
      'Use a controlled descent to protect your forehead and elbows.',
      'Warm up elbows thoroughly before heavy sets.'
    ],
    alternatives: [
      { name: 'Dumbbell Skull Crushers', equipment: 'dumbbell', reason: 'Allows natural wrist rotation without joint strain.' },
      { name: 'Diamond Push-ups', equipment: 'bodyweight', reason: 'Bodyweight tricep extension movement.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    tips: ['Lowering the bar slightly behind your head rather than forehead provides a safer angle for elbows.']
  },

  // CORE
  {
    id: 'ex-hanging-leg-raise',
    name: 'Hanging Leg / Knee Raise',
    slug: 'hanging-leg-raise',
    category: 'Core',
    primaryMuscle: 'Rectus Abdominis & Iliopsoas',
    secondaryMuscles: ['Obliques', 'Forearm Flexors'],
    equipment: 'bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Hang from a pull-up bar with overhand grip, shoulders engaged.',
      'Without swinging, posteriorly tilt your pelvis and raise legs or knees toward chest.',
      'Pause for a fraction of a second at peak abdominal flexion.',
      'Lower under complete control without letting momentum take over.'
    ],
    defaultSets: 3,
    defaultReps: '10-15',
    defaultRestSeconds: 60,
    tempo: '2-1-1-1',
    safetyNotes: ['Do not use lumbar arching to swing yourself up.'],
    alternatives: [
      { name: 'Cable Woodchoppers', equipment: 'cable', reason: 'Rotational core power.' },
      { name: 'Plank with Shoulder Taps', equipment: 'bodyweight', reason: 'Anti-rotational stability.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    tips: ['Think about curling your pelvis up toward your ribcage rather than just lifting thighs.']
  },
  {
    id: 'ex-ab-wheel-rollout',
    name: 'Abdominal Wheel Rollout',
    slug: 'ab-wheel-rollout',
    category: 'Core',
    primaryMuscle: 'Rectus Abdominis (Anti-Extension)',
    secondaryMuscles: ['Lats', 'Serratus Anterior', 'Hip Flexors'],
    equipment: 'bodyweight',
    difficulty: 'Advanced',
    instructions: [
      'Kneel on a soft mat holding ab wheel with both hands.',
      'Round upper back slightly and tuck pelvis into posterior pelvic tilt.',
      'Roll the wheel forward as far as you can control without letting hips sag.',
      'Pull with your abs and lats to roll back into starting position.'
    ],
    defaultSets: 3,
    defaultReps: '8-12',
    defaultRestSeconds: 60,
    tempo: '3-1-1-0',
    safetyNotes: [
      'Never allow your lower back to dip or extend into an anterior pelvic tilt.'
    ],
    alternatives: [
      { name: 'Forearm Plank', equipment: 'bodyweight', reason: 'Isometric anti-extension hold.' },
      { name: 'Deadbug', equipment: 'bodyweight', reason: 'Safe, ground-based core brace.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
    tips: ['Keep your glutes tight during the rollout to lock your pelvis in position.']
  },

  // CALVES
  {
    id: 'ex-standing-calf-raise',
    name: 'Standing Calf Raise',
    slug: 'standing-calf-raise',
    category: 'Calves',
    primaryMuscle: 'Gastrocnemius',
    secondaryMuscles: ['Soleus', 'Plantaris'],
    equipment: 'machine',
    difficulty: 'Beginner',
    instructions: [
      'Position balls of feet on platform with heels hanging off edge.',
      'Lower heels as deep as comfortable into a full 3-second calf stretch.',
      'Press up through the balls of your big toes into maximal ankle plantarflexion.',
      'Hold the top contraction for 2 seconds before descending.'
    ],
    defaultSets: 4,
    defaultReps: '12-15',
    defaultRestSeconds: 60,
    tempo: '3-2-1-0',
    safetyNotes: ['Do not bounce quickly at the bottom to avoid Achilles tendon irritation.'],
    alternatives: [
      { name: 'Single-Leg Dumbbell Calf Raise', equipment: 'dumbbell', reason: 'Unilateral free weight option on a step.' },
      { name: 'Seated Calf Raise', equipment: 'machine', reason: 'Emphasizes soleus muscle with bent knees.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tips: ['A 2-second dead stop at the bottom dissipates elastic tendon recoil, forcing pure muscle work.']
  },

  // CARDIO / FULL BODY
  {
    id: 'ex-kettlebell-swing',
    name: 'Kettlebell Russian Swing',
    slug: 'kettlebell-swing',
    category: 'Full Body',
    primaryMuscle: 'Glutes & Hamstrings',
    secondaryMuscles: ['Core', 'Lats', 'Cardiorespiratory System'],
    equipment: 'kettlebell',
    difficulty: 'Intermediate',
    instructions: [
      'Stand feet shoulder-width apart, kettlebell 1 foot in front of you.',
      'Hinge back and hike kettlebell back between upper thighs like a football snap.',
      'Drive hips forward explosively, snapping knees and glutes to float kettlebell to chest height.',
      'Let kettlebell fall back into the hinge arc under control.'
    ],
    defaultSets: 4,
    defaultReps: '15-20',
    defaultRestSeconds: 60,
    tempo: '1-0-1-0',
    safetyNotes: ['Do not pull with your arms; all upward momentum comes from the violent hip snap.'],
    alternatives: [
      { name: 'Dumbbell Swings', equipment: 'dumbbell', reason: 'Easy substitute if kettlebells are unavailable.' },
      { name: 'Assault Bike Sprint', equipment: 'cardio_machine', reason: 'Maximum calorie burn with low joint impact.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    tips: ['Keep the kettlebell above knee level during the backswing.']
  },
  {
    id: 'ex-hiit-rower-sprint',
    name: 'Concept2 Rowing Machine Intervals',
    slug: 'rower-sprints',
    category: 'Cardio',
    primaryMuscle: 'Cardiorespiratory System',
    secondaryMuscles: ['Legs', 'Back', 'Core', 'Shoulders'],
    equipment: 'cardio_machine',
    difficulty: 'Beginner',
    instructions: [
      'Strap feet firmly into footplates and set damper between 4 and 6.',
      'Drive with legs first, lean back slightly with torso, then pull handle into lower sternum.',
      'Reverse in opposite order: arms extend, torso hinges forward, knees bend.',
      'Perform 30-second maximum effort sprints followed by 60 seconds easy recovery.'
    ],
    defaultSets: 5,
    defaultReps: '30s on / 60s off',
    defaultRestSeconds: 60,
    tempo: 'Interval',
    safetyNotes: ['Do not bend knees before arms clear them on the recovery stroke.'],
    alternatives: [
      { name: 'Treadmill Incline Sprints', equipment: 'cardio_machine', reason: 'High intensity conditioning.' },
      { name: 'Jump Rope High Knees', equipment: 'bodyweight', reason: 'Zero equipment agility cardio.' }
    ],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    tips: ['60% of the rowing power comes from your legs, 20% from core swing, 20% from arm pull.']
  }
];
