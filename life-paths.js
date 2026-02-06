// LIFE PATHS DATABASE - 53 Ways to Find Yourself Beyond Your Job
// For people who have a career but feel lost and need hobbies, passions, and personal fulfillment

const lifePaths = {
  // CREATIVE ARTS (8 paths)
  painting: {
    name: "Painting & Visual Arts",
    emoji: "🎨",
    category: "Creative Arts",
    description: "Express yourself through colors, canvas, and creativity. Paint your emotions, tell stories, and create beauty.",
    personalityFit: ["creative", "introspective", "expressive", "patient"],
    skillsRequired: ["creativity", "patience", "observation", "hand-eye coordination"],
    timeCommitment: "2-10 hours/week",
    startupCost: [50, 500],
    timeToSkill: "3-6 months to feel competent",
    lifestyle: "flexible schedule",
    fulfillmentLevel: "very high",
    energyType: "calming",
    socialLevel: "mostly solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You feel things deeply and need an outlet for emotions that words can't express. Art lets you create something beautiful from nothing and escape into flow states.",
      whatToDo: "Start with beginner acrylic painting kits. Watch YouTube tutorials, join local art classes, paint for 30 minutes daily. Try Bob Ross videos for relaxing practice. Join online art communities.",
      experience: "Month 1-3: Basic techniques, color theory. Month 4-6: Finding your style. Month 7-12: Creating pieces you're proud of. Year 2+: Possible side income, local shows.",
      benefits: "Stress relief, creative outlet, mindfulness, self-expression, tangible creations, possible passive income, meditative state, sense of accomplishment.",
      bestFor: "People who overthink, need stress relief, want solo creative time, enjoy process over results, want to decorate their space with personal art."
    }
  },

  musicProduction: {
    name: "Music Production & DJing",
    emoji: "🎵",
    category: "Creative Arts",
    description: "Create beats, mix tracks, and express yourself through sound. From bedroom producer to local DJ.",
    personalityFit: ["creative", "technical", "night owl", "persistent"],
    skillsRequired: ["rhythm", "audio editing", "creativity", "technical learning"],
    timeCommitment: "5-15 hours/week",
    startupCost: [200, 2000],
    timeToSkill: "6-12 months for basic competency",
    lifestyle: "flexible, can be social",
    fulfillmentLevel: "very high",
    energyType: "energizing",
    socialLevel: "flexible - solo or social",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "Music moves you. You hear beats in everyday sounds. You want to create soundscapes that make people feel something or just vibe out in your bedroom studio.",
      whatToDo: "Get FL Studio or Ableton (free trials). Watch YouTube tutorials. Practice daily. Join r/edmproduction. Learn music theory basics. Start with remixes before originals.",
      experience: "Month 1-3: Learning DAW basics. Month 4-6: First complete tracks. Month 7-12: Finding your sound. Year 2+: Possible gigs, SoundCloud following, pure creative joy.",
      benefits: "Creative expression, flow state, possible performance opportunities, online community, side income potential, therapeutic outlet, sense of creation.",
      bestFor: "Night owls, music lovers, tech-savvy creatives, people who want to perform or just create for themselves, anyone needing emotional outlet."
    }
  },

  writing: {
    name: "Creative Writing",
    emoji: "✍️",
    category: "Creative Arts",
    description: "Write stories, poetry, blogs, or journals. Process your thoughts, build worlds, or share your perspective.",
    personalityFit: ["introspective", "imaginative", "observant", "patient"],
    skillsRequired: ["language", "imagination", "discipline", "observation"],
    timeCommitment: "3-10 hours/week",
    startupCost: [0, 100],
    timeToSkill: "Immediate start, lifetime mastery",
    lifestyle: "ultimate flexibility",
    fulfillmentLevel: "very high",
    energyType: "contemplative",
    socialLevel: "mostly solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "Your mind is full of stories, observations, or emotions that need to get out. You process life through words and find clarity in writing.",
      whatToDo: "Write 15 minutes daily. Start a blog, journal, or fiction project. Join writing communities online. Try NaNoWriMo. Read 'Bird by Bird' by Anne Lamott. Use Notion or Google Docs.",
      experience: "Month 1-3: Building habit, finding voice. Month 4-6: First complete pieces. Month 7-12: Sharing work, getting feedback. Year 2+: Possible publication, blog following, or just personal fulfillment.",
      benefits: "Emotional processing, self-discovery, creative outlet, legacy creation, possible passive income, clarity of thought, therapeutic benefits, flexible schedule.",
      bestFor: "Overthinkers, introverts, people processing life changes, anyone with stories to tell, people seeking self-understanding through reflection."
    }
  },

  photography: {
    name: "Photography",
    emoji: "📸",
    category: "Creative Arts",
    description: "Capture moments, explore your city, document life. From phone photography to professional gear.",
    personalityFit: ["observant", "patient", "adventurous", "artistic"],
    skillsRequired: ["composition", "technical knowledge", "eye for detail", "photo editing"],
    timeCommitment: "3-12 hours/week",
    startupCost: [0, 3000],
    timeToSkill: "3-6 months for solid basics",
    lifestyle: "flexible, encourages exploration",
    fulfillmentLevel: "high",
    energyType: "moderate",
    socialLevel: "flexible - solo or social",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You notice beauty in everyday moments. You want to preserve memories and see your world differently. You love exploring with purpose.",
      whatToDo: "Start with your phone. Learn composition basics. Take daily photo walks. Join Instagram photography communities. Eventually upgrade to mirrorless camera. Learn Lightroom basics.",
      experience: "Month 1-3: Learning basics, eye development. Month 4-6: Finding your style. Month 7-12: Building portfolio. Year 2+: Possible freelance work, prints sales, or pure hobby enjoyment.",
      benefits: "Mindfulness, exploration encouragement, creative outlet, memory preservation, possible side income, reason to travel, artistic development, tangible results.",
      bestFor: "Observant people, explorers, anyone wanting to see their city differently, travelers, people who love capturing moments, introverts with adventurous side."
    }
  },

  videoEditing: {
    name: "Video Editing & Content Creation",
    emoji: "🎬",
    category: "Creative Arts",
    description: "Tell stories through video. Edit travel footage, create YouTube content, or just preserve memories artistically.",
    personalityFit: ["creative", "technical", "detail-oriented", "patient"],
    skillsRequired: ["video editing", "storytelling", "technical learning", "creativity"],
    timeCommitment: "5-15 hours/week",
    startupCost: [0, 500],
    timeToSkill: "4-8 months for proficiency",
    lifestyle: "flexible schedule",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "mostly solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You have footage of your life but it sits unwatched. You want to create something that tells your story, makes people laugh, or just preserves memories beautifully.",
      whatToDo: "Start with free tools (DaVinci Resolve). Edit your phone videos. Watch tutorials. Create monthly video diaries. Learn transitions and color grading. Join r/VideoEditing.",
      experience: "Month 1-3: Learning software basics. Month 4-6: First polished videos. Month 7-12: Developing style. Year 2+: Possible freelance work, YouTube channel, or family legacy videos.",
      benefits: "Creative outlet, storytelling ability, memory preservation, technical skill development, possible side income, satisfaction of finishing projects, personal documentaries.",
      bestFor: "People with footage they never use, travelers, parents, anyone wanting to preserve memories, creative technical minds, people who love the editing process."
    }
  },

  crafting: {
    name: "Crafting & DIY Projects",
    emoji: "🧵",
    category: "Creative Arts",
    description: "Make things with your hands. Knitting, woodworking, jewelry, pottery - create functional art.",
    personalityFit: ["patient", "detail-oriented", "hands-on", "creative"],
    skillsRequired: ["hand-eye coordination", "patience", "attention to detail", "creativity"],
    timeCommitment: "3-10 hours/week",
    startupCost: [50, 1000],
    timeToSkill: "2-6 months depending on craft",
    lifestyle: "flexible, home-based",
    fulfillmentLevel: "very high",
    energyType: "calming",
    socialLevel: "mostly solo",
    physicalDemand: "low",
    detailed: {
      whoYouAre: "You want to make things with your hands. You're tired of consuming and want to create. You want tangible results and the satisfaction of 'I made this.'",
      whatToDo: "Pick ONE craft to start. Join local classes or online communities. Start with beginner kits. Dedicate space for your craft. Set aside craft time weekly. Share on Etsy or locally.",
      experience: "Month 1-3: Learning basics, first pieces. Month 4-6: Improving quality. Month 7-12: Creating gifts for others. Year 2+: Possible Etsy shop, craft fairs, or pure hobby joy.",
      benefits: "Tangible creations, stress relief, gift-giving ability, possible income, meditative state, sense of accomplishment, unique home decor, functional art.",
      bestFor: "People who love working with hands, gift-givers, those seeking calm hobbies, anyone wanting to create functional items, people who love process and results."
    }
  },

  graphicDesign: {
    name: "Graphic Design",
    emoji: "🖌️",
    category: "Creative Arts",
    description: "Design logos, posters, digital art. Express creativity through visual communication and help others with their brands.",
    personalityFit: ["creative", "technical", "visual thinker", "problem-solver"],
    skillsRequired: ["design software", "creativity", "visual composition", "color theory"],
    timeCommitment: "5-15 hours/week",
    startupCost: [0, 600],
    timeToSkill: "4-8 months for marketable skills",
    lifestyle: "flexible, mostly digital",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "flexible",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You see the world in layouts and colors. You want to create visual impact and help people communicate better through design.",
      whatToDo: "Learn Figma (free) or Adobe Creative Cloud. Take online courses. Do daily design challenges. Build portfolio on Behance. Offer free work to friends' projects initially.",
      experience: "Month 1-3: Learning software, design principles. Month 4-6: First portfolio pieces. Month 7-12: Taking client work. Year 2+: Solid side income or satisfying creative outlet.",
      benefits: "Creative expression, technical skill, freelance income potential, helping others, portfolio building, remote work possibility, visual problem-solving, tangible results.",
      bestFor: "Visual thinkers, people wanting creative + technical mix, side hustlers, anyone wanting to help others visually, those seeking flexible creative work."
    }
  },

  standup: {
    name: "Stand-Up Comedy",
    emoji: "🎤",
    category: "Creative Arts",
    description: "Express your perspective through humor. Hit open mics, make people laugh, process life through comedy.",
    personalityFit: ["outgoing", "observant", "brave", "self-deprecating"],
    skillsRequired: ["humor", "public speaking", "writing", "thick skin"],
    timeCommitment: "5-10 hours/week",
    startupCost: [0, 200],
    timeToSkill: "6-12 months to feel comfortable",
    lifestyle: "nighttime commitment",
    fulfillmentLevel: "very high",
    energyType: "highly energizing",
    socialLevel: "highly social",
    physicalDemand: "low",
    detailed: {
      whoYouAre: "You're the funny one in your friend group. You have observations about life that you turn into jokes. You need an outlet for your voice and perspective.",
      whatToDo: "Write 5 minutes of material. Find local open mics. Go watch comedy shows. Record your sets. Join comedy communities. Accept bombing as part of growth.",
      experience: "Month 1-3: Terrifying first sets. Month 4-6: Finding your voice. Month 7-12: Regular spot at mics. Year 2+: Local comedy scene regular, showcase opportunities.",
      benefits: "Confidence building, creative outlet, community, self-expression, conquering fear, making people laugh, processing life through humor, performance high.",
      bestFor: "Naturally funny people, those seeking community, people processing life experiences, confidence seekers, observers of human behavior, extroverts with creative side."
    }
  },

  // PHYSICAL & SPORTS (7 paths)
  martialArts: {
    name: "Martial Arts",
    emoji: "🥋",
    category: "Physical & Sports",
    description: "Discipline, fitness, and self-defense. BJJ, Muay Thai, Boxing, or traditional martial arts.",
    personalityFit: ["disciplined", "competitive", "physical", "respectful"],
    skillsRequired: ["physicality", "coordination", "discipline", "humility"],
    timeCommitment: "6-12 hours/week",
    startupCost: [100, 500],
    timeToSkill: "6-12 months for basics, years for mastery",
    lifestyle: "structured schedule",
    fulfillmentLevel: "very high",
    energyType: "highly energizing",
    socialLevel: "social",
    physicalDemand: "very high",
    detailed: {
      whoYouAre: "You need physical challenge and mental discipline. You want to feel strong, capable, and in control of your body. You respect the martial arts philosophy.",
      whatToDo: "Try multiple gyms before committing. Start with beginner classes 2-3x/week. Buy basic gear. Train consistently. Respect the belt system. Embrace being a beginner.",
      experience: "Month 1-3: Intense soreness, learning basics. Month 4-6: First flow moments. Month 7-12: First belt promotion. Year 2+: Instructor-level skills, competition option, lifelong practice.",
      benefits: "Fitness, self-defense, discipline, confidence, stress relief through intensity, brotherhood/sisterhood, goal progression, mental clarity, respect for body.",
      bestFor: "People needing structure, those wanting physical intensity, respect-minded individuals, people seeking discipline, fitness enthusiasts, anyone wanting real-world skills."
    }
  },

  running: {
    name: "Running & Marathon Training",
    emoji: "🏃",
    category: "Physical & Sports",
    description: "From couch to 5K to marathons. Run for clarity, fitness, competition, or just because.",
    personalityFit: ["persistent", "goal-oriented", "solitary comfortable", "disciplined"],
    skillsRequired: ["endurance building", "discipline", "pain tolerance", "consistency"],
    timeCommitment: "4-10 hours/week",
    startupCost: [100, 500],
    timeToSkill: "3 months to 5K, 6-12 months to half marathon",
    lifestyle: "flexible schedule",
    fulfillmentLevel: "high",
    energyType: "energizing and calming",
    socialLevel: "solo or group",
    physicalDemand: "high",
    detailed: {
      whoYouAre: "You need to clear your head. Running is your therapy. You want tangible fitness goals and the high of crossing finish lines. You think clearly in motion.",
      whatToDo: "Start with Couch to 5K app. Get proper running shoes. Join Strava community. Sign up for a 5K race. Join local running groups. Build slowly to avoid injury.",
      experience: "Month 1-3: Building base, first 5K. Month 4-6: 10K capability. Month 7-12: Half marathon ready. Year 2+: Marathon potential, running community, lifelong habit.",
      benefits: "Mental clarity, fitness, goal achievement, runner's high, outdoor time, race community, measurable progress, stress relief, portable workout.",
      bestFor: "Thinkers who need to move, goal-oriented people, those seeking solitude with purpose, fitness seekers, people who think while moving, stress relievers."
    }
  },

  climbing: {
    name: "Rock Climbing",
    emoji: "🧗",
    category: "Physical & Sports",
    description: "Indoor bouldering or outdoor sport climbing. Physical chess that builds strength and problem-solving.",
    personalityFit: ["adventurous", "problem-solver", "physical", "social"],
    skillsRequired: ["strength building", "problem-solving", "flexibility", "technique"],
    timeCommitment: "4-10 hours/week",
    startupCost: [50, 800],
    timeToSkill: "3-6 months for gym climbing competency",
    lifestyle: "flexible, social activity",
    fulfillmentLevel: "very high",
    energyType: "energizing",
    socialLevel: "highly social",
    physicalDemand: "high",
    detailed: {
      whoYouAre: "You want fitness that feels like playing. You're a problem-solver who wants full-body challenge. You want a social activity that pushes your limits.",
      whatToDo: "Join local climbing gym. Take intro class. Start with bouldering. Climb 2-3x/week. Watch technique videos. Join climbing community. Progress to outdoor climbing eventually.",
      experience: "Month 1-3: Learning basics, V2-V3 grades. Month 4-6: V4-V5, technique clicking. Month 7-12: Strong climber, gym regular. Year 2+: Outdoor trips, climbing crew, lifelong passion.",
      benefits: "Full-body workout, problem-solving, social community, goal progression, outdoor opportunities, strength building, immediate feedback, addictive progression system.",
      bestFor: "Problem-solvers, social fitness seekers, people wanting challenging but accessible sport, outdoorsy people, those seeking community through activity."
    }
  },

  cycling: {
    name: "Cycling & Bikepacking",
    emoji: "🚴",
    category: "Physical & Sports",
    description: "Road cycling, mountain biking, or bikepacking adventures. Explore on two wheels.",
    personalityFit: ["adventurous", "endurance-minded", "exploratory", "gear-loving"],
    skillsRequired: ["endurance", "mechanical basics", "navigation", "cycling technique"],
    timeCommitment: "5-15 hours/week",
    startupCost: [300, 5000],
    timeToSkill: "Immediate start, 3-6 months for long distances",
    lifestyle: "flexible, adventure-enabling",
    fulfillmentLevel: "very high",
    energyType: "energizing",
    socialLevel: "solo or group",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "You want to cover serious distance and explore. Cycling gives you the freedom to adventure farther than running, with the wind in your face and new views constantly.",
      whatToDo: "Get a decent used bike. Join group rides. Use Strava. Learn basic maintenance. Start with 10-mile rides, build up. Join r/cycling. Consider bikepacking trips.",
      experience: "Month 1-3: Building base fitness, first 20-mile ride. Month 4-6: 50-mile capability. Month 7-12: Century ride ready. Year 2+: Multi-day trips, cycling lifestyle, endless exploration.",
      benefits: "Transportation + fitness, exploration, cycling community, environmental impact, adventure enabling, measurable progress, outdoor time, meditative flow.",
      bestFor: "Explorers, outdoor enthusiasts, people wanting distance adventures, environmental-minded folks, those seeking meditative movement, gear enthusiasts."
    }
  },

  swimming: {
    name: "Swimming & Open Water",
    emoji: "🏊",
    category: "Physical & Sports",
    description: "Lap swimming, open water swimming, or triathlons. Low-impact full-body workout.",
    personalityFit: ["disciplined", "meditative", "water-loving", "persistent"],
    skillsRequired: ["swimming technique", "breathing control", "endurance", "discipline"],
    timeCommitment: "3-8 hours/week",
    startupCost: [50, 300],
    timeToSkill: "3-6 months for solid technique",
    lifestyle: "flexible, pool/ocean access needed",
    fulfillmentLevel: "high",
    energyType: "calming and energizing",
    socialLevel: "mostly solo",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "You love water. Swimming gives you a meditative full-body workout with no joint impact. The water quiets your mind and makes you feel alive.",
      whatToDo: "Join a pool with lap times. Get swim lessons to fix technique. Use swim workouts from MySwimPro. Build to 30-minute continuous swims. Try open water swimming.",
      experience: "Month 1-3: Technique improvement, building endurance. Month 4-6: Swimming 1000+ yards. Month 7-12: Open water swimming. Year 2+: Possible triathlons, lifelong practice.",
      benefits: "Full-body workout, low impact, meditative state, unique skill, triathlon option, beach/pool enjoyment, shoulder strength, calming effect.",
      bestFor: "Water lovers, people with joint issues, meditative personalities, those seeking low-impact intensity, beach/pool enthusiasts, unique fitness seekers."
    }
  },

  dance: {
    name: "Dance (Salsa, Hip-Hop, Ballroom)",
    emoji: "💃",
    category: "Physical & Sports",
    description: "Express yourself through movement. Partner dancing or solo. Social dance scene or just for yourself.",
    personalityFit: ["expressive", "social", "rhythmic", "confident"],
    skillsRequired: ["rhythm", "coordination", "body awareness", "social comfort"],
    timeCommitment: "3-8 hours/week",
    startupCost: [0, 200],
    timeToSkill: "3-6 months for basics",
    lifestyle: "social, evening activities",
    fulfillmentLevel: "very high",
    energyType: "highly energizing",
    socialLevel: "highly social",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "You need to move to music. Dance gives you expression, social connection, fitness, and the joy of losing yourself in rhythm. You want to feel free in your body.",
      whatToDo: "Take beginner classes at local studios. Go to social dance nights. Practice at home. Watch tutorials. Commit to one style first. Embrace looking silly initially.",
      experience: "Month 1-3: Learning basic steps, feeling awkward. Month 4-6: First flow moments. Month 7-12: Social dancing regularly. Year 2+: Dance community regular, confident mover.",
      benefits: "Fitness, social life, self-expression, confidence, music connection, cultural immersion, dating opportunities, creative outlet, full-body workout.",
      bestFor: "Social people, music lovers, those seeking embodied expression, singles scene, cultural explorers, people wanting fun fitness, confidence seekers."
    }
  },

  yoga: {
    name: "Yoga & Meditation",
    emoji: "🧘",
    category: "Physical & Sports",
    description: "Mind-body practice. Flexibility, strength, mental clarity. From gentle to power yoga.",
    personalityFit: ["patient", "mindful", "introspective", "body-aware"],
    skillsRequired: ["flexibility development", "breathing", "mindfulness", "patience"],
    timeCommitment: "2-8 hours/week",
    startupCost: [20, 300],
    timeToSkill: "Immediate benefits, lifetime practice",
    lifestyle: "flexible schedule",
    fulfillmentLevel: "very high",
    energyType: "calming and strengthening",
    socialLevel: "solo or class",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You need to slow down and get out of your head and into your body. Yoga gives you flexibility, strength, mental clarity, and a practice that grows with you.",
      whatToDo: "Start with YouTube yoga (Yoga With Adriene). Join studio for proper alignment. Practice 15 minutes daily. Try different styles. Consider teacher training eventually.",
      experience: "Month 1-3: Learning poses, feeling benefits. Month 4-6: Building strength and flexibility. Month 7-12: Deeper practice. Year 2+: Transformative practice, possible teaching.",
      benefits: "Flexibility, strength, stress relief, mental clarity, injury prevention, aging well, spiritual growth option, portable practice, community.",
      bestFor: "Stressed people, desk workers, spiritual seekers, those needing mind-body connection, flexibility seekers, people wanting sustainable lifetime practice."
    }
  },

  // ADVENTURE & OUTDOORS (6 paths)
  hiking: {
    name: "Hiking & Backpacking",
    emoji: "🥾",
    category: "Adventure & Outdoors",
    description: "Explore trails, summit mountains, backpack through wilderness. Nature is your therapy.",
    personalityFit: ["adventurous", "nature-loving", "persistent", "introspective"],
    skillsRequired: ["navigation", "wilderness basics", "endurance", "planning"],
    timeCommitment: "Weekend commitment",
    startupCost: [100, 1000],
    timeToSkill: "Immediate start, skills build over time",
    lifestyle: "weekend warrior",
    fulfillmentLevel: "very high",
    energyType: "rejuvenating",
    socialLevel: "solo or group",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "Nature recharges you. You need to escape city noise and feel small in the wilderness. Hiking gives you adventure, fitness, and mental reset on trails.",
      whatToDo: "Start with local day hikes. Join AllTrails. Build gear slowly. Join hiking groups. Progress to overnight backpacking. Learn Leave No Trace. Bag peaks.",
      experience: "Month 1-3: Local trails, building fitness. Month 4-6: Longer hikes, first overnights. Month 7-12: Backpacking trips. Year 2+: Through-hikes possible, wilderness confidence.",
      benefits: "Nature immersion, fitness, mental clarity, adventure, self-reliance, photography opportunities, disconnection from tech, summit highs.",
      bestFor: "Nature lovers, city escapers, introverts seeking adventure, fitness seekers, people needing mental breaks, photographers, solitude seekers."
    }
  },

  camping: {
    name: "Camping & Overlanding",
    emoji: "⛺",
    category: "Adventure & Outdoors",
    description: "Car camping, dispersed camping, or overlanding adventures. Weekend escapes to nature.",
    personalityFit: ["adventurous", "DIY-minded", "nature-loving", "social"],
    skillsRequired: ["camping basics", "fire building", "outdoor cooking", "navigation"],
    timeCommitment: "Weekend trips",
    startupCost: [200, 5000],
    timeToSkill: "Learn as you go",
    lifestyle: "weekend adventures",
    fulfillmentLevel: "high",
    energyType: "rejuvenating",
    socialLevel: "flexible",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You want adventure without extreme difficulty. Camping gives you nature, starry nights, campfire conversations, and disconnection from daily grind.",
      whatToDo: "Start with car camping at established sites. Build gear collection. Learn campfire cooking. Try dispersed camping. Join r/camping. Upgrade to rooftop tent or overland rig.",
      experience: "Month 1-3: First camping trips, learning basics. Month 4-6: More ambitious locations. Month 7-12: Regular weekend warrior. Year 2+: Overlanding trips, camping lifestyle.",
      benefits: "Nature connection, stress relief, adventure, social or solo time, affordable travel, stargazing, unplugging, outdoor skills, family bonding.",
      bestFor: "Weekend adventurers, families, people needing nature breaks, budget travelers, social outdoor types, stargazing lovers."
    }
  },

  fishing: {
    name: "Fishing",
    emoji: "🎣",
    category: "Adventure & Outdoors",
    description: "Meditative time on water. Fly fishing, bass fishing, ocean fishing. Patient pursuit.",
    personalityFit: ["patient", "nature-loving", "observant", "persistent"],
    skillsRequired: ["patience", "technique", "knowledge of water/fish", "casting"],
    timeCommitment: "4-12 hours/week",
    startupCost: [100, 2000],
    timeToSkill: "6-12 months for consistent success",
    lifestyle: "flexible, water access needed",
    fulfillmentLevel: "high",
    energyType: "calming",
    socialLevel: "solo or social",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You need forced patience and connection to nature. Fishing makes you slow down, be present, and gives you the thrill of the catch and meditative waiting.",
      whatToDo: "Take a beginner fishing class. Get basic rod setup. Learn local fish species. Join fishing communities. Start with easy species. Upgrade gear over time.",
      experience: "Month 1-3: Learning basics, first catches. Month 4-6: Understanding patterns. Month 7-12: Consistent success. Year 2+: Advanced techniques, boat possibly, lifelong pursuit.",
      benefits: "Patience development, nature time, food provision, meditative state, outdoor skills, social bonding, sunrise/sunset experiences, tech detox.",
      bestFor: "Patient people, nature lovers, those seeking meditation through activity, food providers, people needing to slow down, water lovers."
    }
  },

  gardening: {
    name: "Gardening & Urban Farming",
    emoji: "🌱",
    category: "Adventure & Outdoors",
    description: "Grow your own food or create beauty. From balcony gardens to backyard farms.",
    personalityFit: ["patient", "nurturing", "sustainable-minded", "observant"],
    skillsRequired: ["plant knowledge", "patience", "consistency", "observation"],
    timeCommitment: "3-10 hours/week",
    startupCost: [50, 1000],
    timeToSkill: "One season to learn basics",
    lifestyle: "daily commitment during season",
    fulfillmentLevel: "very high",
    energyType: "calming",
    socialLevel: "mostly solo",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You want to create life and eat what you grow. Gardening connects you to seasons, gives you daily purpose, and rewards patience with literal fruits of labor.",
      whatToDo: "Start small with herbs or tomatoes. Learn your growing zone. Join r/gardening. Build soil. Plant in spring. Expect failures first season. Expand yearly.",
      experience: "Season 1: Learning, some success. Season 2: Better results. Season 3+: Abundant harvests, deep knowledge, possible food self-sufficiency.",
      benefits: "Fresh food, sustainability, daily purpose, outdoor time, stress relief, connection to seasons, sense of accomplishment, legacy skill.",
      bestFor: "Patient people, environmentalists, food security seekers, those wanting daily gentle purpose, homebodies, people needing grounding activity."
    }
  },

  vanLife: {
    name: "Van Life & Travel",
    emoji: "🚐",
    category: "Adventure & Outdoors",
    description: "Build out a van and travel. Weekend trips or extended adventures. Freedom on four wheels.",
    personalityFit: ["adventurous", "minimalist", "DIY-minded", "free-spirited"],
    skillsRequired: ["DIY building", "planning", "minimalism", "adaptability"],
    timeCommitment: "Weekend trips or full lifestyle",
    startupCost: [5000, 50000],
    timeToSkill: "3-6 months to build van",
    lifestyle: "adventurous, location freedom",
    fulfillmentLevel: "very high",
    energyType: "energizing",
    socialLevel: "solo or couple",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You're tired of being tied down. You want adventure, minimalism, and the freedom to chase sunsets and seasons. Van life gives you a home that goes anywhere.",
      whatToDo: "Buy a used van. Build it out yourself or hire out. Join r/vandwellers. Plan weekend trips. Use apps like iOverlander. Start part-time before committing fully.",
      experience: "Month 1-6: Building out van. Month 7-12: Weekend warrior trips. Year 2+: Possible full-time travel, location independence, adventure lifestyle.",
      benefits: "Adventure, freedom, minimalism, travel affordability, nature access, unique lifestyle, photography opportunities, meeting nomads, life on your terms.",
      bestFor: "Adventurers, minimalists, remote workers, free spirits, travel lovers, people needing radical change, DIY enthusiasts, nature seekers."
    }
  },

  skiing: {
    name: "Skiing/Snowboarding",
    emoji: "⛷️",
    category: "Adventure & Outdoors",
    description: "Winter adventure. Downhill or backcountry. Speed, snow, and mountain highs.",
    personalityFit: ["adventurous", "thrill-seeking", "winter-loving", "persistent"],
    skillsRequired: ["balance", "coordination", "fear management", "physical fitness"],
    timeCommitment: "Winter weekends",
    startupCost: [500, 5000],
    timeToSkill: "1 season for competency",
    lifestyle: "seasonal, mountain access needed",
    fulfillmentLevel: "very high",
    energyType: "highly energizing",
    socialLevel: "social",
    physicalDemand: "high",
    detailed: {
      whoYouAre: "You come alive in winter. You want speed, adrenaline, and the pure joy of carving down mountains with friends. Winter becomes your favorite season.",
      whatToDo: "Get season pass. Take lessons first season. Rent before buying. Go weekly to improve. Join ski community. Progress from greens to blacks. Consider backcountry.",
      experience: "Season 1: Learning, lots of falling. Season 2: Confident on blues. Season 3+: All-mountain rider, powder chasing, lifelong passion.",
      benefits: "Adrenaline, fitness, winter purpose, mountain beauty, social scene, adventure, progression addiction, alpine environment, full-body workout.",
      bestFor: "Thrill seekers, winter lovers, mountain people, social adventurers, those needing winter purpose, adrenaline junkies, outdoor enthusiasts."
    }
  },

  // INTELLECTUAL & LEARNING (6 paths)
  languages: {
    name: "Language Learning",
    emoji: "🗣️",
    category: "Intellectual & Learning",
    description: "Learn Spanish, Japanese, French. Connect with new cultures and expand your world.",
    personalityFit: ["curious", "patient", "culturally interested", "disciplined"],
    skillsRequired: ["memory", "persistence", "pronunciation", "grammar"],
    timeCommitment: "3-7 hours/week",
    startupCost: [0, 500],
    timeToSkill: "6-12 months for conversational",
    lifestyle: "daily practice needed",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "solo practice, social application",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You want to connect with other cultures and expand your mind. Language learning gives you new perspectives, travel confidence, and cognitive benefits.",
      whatToDo: "Use Duolingo daily (15 min). Add Anki flashcards. Watch shows in target language. Join language exchange apps. Take italki lessons. Immerse when possible.",
      experience: "Month 1-3: Basic phrases, frustration. Month 4-6: First conversations. Month 7-12: Conversational ability. Year 2+: Fluency path, cultural immersion.",
      benefits: "Cognitive benefits, cultural connection, travel enhancement, brain exercise, confidence, new perspectives, career boost, lifelong learning.",
      bestFor: "Curious minds, travelers, cultural explorers, brain exercisers, people planning moves abroad, career advancers, patient learners."
    }
  },

  reading: {
    name: "Dedicated Reading Practice",
    emoji: "📚",
    category: "Intellectual & Learning",
    description: "50-100 books per year. Fiction, non-fiction, classics. Make reading a core identity.",
    personalityFit: ["introspective", "curious", "patient", "intellectual"],
    skillsRequired: ["focus", "comprehension", "time management", "discipline"],
    timeCommitment: "5-15 hours/week",
    startupCost: [0, 200],
    timeToSkill: "Immediate start",
    lifestyle: "flexible, requires dedicated time",
    fulfillmentLevel: "very high",
    energyType: "calming and engaging",
    socialLevel: "solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You used to read constantly but life got busy. You want back that feeling of being lost in books and the growth that comes from consuming ideas.",
      whatToDo: "Set goal of 1-2 books per month. Join Goodreads. Create reading time ritual. Join book clubs. Mix fiction and non-fiction. Track your reading.",
      experience: "Month 1-3: Rebuilding habit, 3-6 books. Month 4-6: Flow returning. Month 7-12: 15-20 books. Year 2+: 50+ books annually, transformed perspective.",
      benefits: "Knowledge expansion, vocabulary, empathy, stress relief, imagination, better thinking, sleep aid, intellectual growth, perspective broadening.",
      bestFor: "Intellectually curious, people wanting mental escape, lifelong learners, introverts, those seeking wisdom, people wanting to slow down."
    }
  },

  chess: {
    name: "Chess",
    emoji: "♟️",
    category: "Intellectual & Learning",
    description: "The ultimate strategy game. Play online, study theory, compete in tournaments.",
    personalityFit: ["strategic", "patient", "competitive", "analytical"],
    skillsRequired: ["strategy", "pattern recognition", "patience", "analysis"],
    timeCommitment: "3-10 hours/week",
    startupCost: [0, 100],
    timeToSkill: "6-12 months for intermediate",
    lifestyle: "flexible, mostly digital",
    fulfillmentLevel: "high",
    energyType: "mentally engaging",
    socialLevel: "online community",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You love strategy and competition. Chess gives you infinite depth, clear improvement metrics, and the satisfaction of outthinking opponents.",
      whatToDo: "Create Chess.com account. Do daily puzzles. Watch GothamChess on YouTube. Play 10-minute games. Study openings. Join a club. Analyze your games.",
      experience: "Month 1-3: Learning basics, 400-600 rating. Month 4-6: First tactics understanding. Month 7-12: 1000+ rating. Year 2+: 1500+ possible, deep passion.",
      benefits: "Strategic thinking, patience, competition, cognitive exercise, measurable progress, online community, portable hobby, lifetime pursuit.",
      bestFor: "Strategic thinkers, competitive minds, pattern recognizers, people wanting cerebral challenge, those seeking measurable improvement, online competitors."
    }
  },

  philosophy: {
    name: "Philosophy & Deep Thinking",
    emoji: "🤔",
    category: "Intellectual & Learning",
    description: "Study Stoicism, existentialism, ethics. Question everything. Develop your worldview.",
    personalityFit: ["introspective", "curious", "questioning", "thoughtful"],
    skillsRequired: ["critical thinking", "reading comprehension", "patience", "open-mindedness"],
    timeCommitment: "3-8 hours/week",
    startupCost: [0, 200],
    timeToSkill: "Immediate engagement, lifelong practice",
    lifestyle: "flexible",
    fulfillmentLevel: "very high",
    energyType: "contemplative",
    socialLevel: "solo or discussion groups",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You ask 'why' about everything. You want deeper understanding of existence, ethics, meaning. Philosophy gives you frameworks for life's big questions.",
      whatToDo: "Start with Meditations by Marcus Aurelius. Join r/philosophy. Listen to philosophy podcasts. Take free online courses. Join philosophy discussion groups. Keep a philosophy journal.",
      experience: "Month 1-3: Introduction to major ideas. Month 4-6: Developing your views. Month 7-12: Deeper study. Year 2+: Transformed worldview, guiding principles.",
      benefits: "Life perspective, ethical framework, critical thinking, meaning-making, coping mechanisms, intellectual depth, better decisions, life examination.",
      bestFor: "Deep thinkers, those seeking meaning, people questioning existence, intellectual types, those needing ethical framework, searchers."
    }
  },

  history: {
    name: "History Deep Dives",
    emoji: "📜",
    category: "Intellectual & Learning",
    description: "Become an expert in specific historical periods. Podcasts, books, documentaries.",
    personalityFit: ["curious", "detail-oriented", "patient", "storytelling-minded"],
    skillsRequired: ["reading", "research", "synthesis", "retention"],
    timeCommitment: "5-12 hours/week",
    startupCost: [0, 300],
    timeToSkill: "Ongoing learning",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "mostly solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You're fascinated by how we got here. History gives context to modern life and satisfies your curiosity about human nature and civilization.",
      whatToDo: "Pick era or topic. Listen to history podcasts (Hardcore History). Read popular histories. Watch documentaries. Join history communities. Visit museums.",
      experience: "Month 1-3: Survey of topics. Month 4-6: Deep dive into favorites. Month 7-12: Expert-level knowledge in areas. Year 2+: Encyclopedic knowledge, sharing with others.",
      benefits: "Perspective, understanding present, conversation topics, intellectual satisfaction, pattern recognition, wisdom, context for life.",
      bestFor: "Curious minds, conversationalists, people seeking perspective, those wanting intellectual pursuit, pattern seekers, story lovers."
    }
  },

  coding: {
    name: "Coding Side Projects",
    emoji: "💻",
    category: "Intellectual & Learning",
    description: "Learn Python, build websites, create apps. Code for fun, not for work.",
    personalityFit: ["logical", "creative", "problem-solver", "persistent"],
    skillsRequired: ["logic", "problem-solving", "patience", "learning mindset"],
    timeCommitment: "5-15 hours/week",
    startupCost: [0, 500],
    timeToSkill: "3-6 months for basic projects",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "online community",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You want to create things digitally. Coding lets you build tools, websites, games - anything you can imagine. It's creative problem-solving.",
      whatToDo: "Learn Python via FreeCodeCamp. Build small projects. Contribute to open source. Join r/learnprogramming. Build something useful for yourself. Deploy it.",
      experience: "Month 1-3: Basics, frustration. Month 4-6: First working projects. Month 7-12: Building useful things. Year 2+: Side income possible, or pure creative joy.",
      benefits: "Creation ability, problem-solving, possible income, marketable skill, building useful tools, cognitive exercise, online community, tangible results.",
      bestFor: "Problem-solvers, builders, logical minds, people wanting to create digital things, side income seekers, tech-curious."
    }
  },

  // SOCIAL & COMMUNITY (5 paths)
  volunteering: {
    name: "Regular Volunteering",
    emoji: "🤝",
    category: "Social & Community",
    description: "Serve your community. Food banks, animal shelters, mentoring, whatever calls to you.",
    personalityFit: ["empathetic", "service-minded", "social", "purposeful"],
    skillsRequired: ["compassion", "reliability", "communication", "patience"],
    timeCommitment: "2-8 hours/week",
    startupCost: [0, 50],
    timeToSkill: "Immediate start",
    lifestyle: "regular commitment",
    fulfillmentLevel: "very high",
    energyType: "fulfilling",
    socialLevel: "highly social",
    physicalDemand: "low to medium",
    detailed: {
      whoYouAre: "You want to give back and feel useful beyond your job. Volunteering connects you to community and reminds you there's more to life than work.",
      whatToDo: "Find opportunities on VolunteerMatch. Pick cause that matters to you. Commit to weekly schedule. Build relationships with other volunteers. Make it a ritual.",
      experience: "Month 1-3: Finding fit, initial impact. Month 4-6: Regular routine, relationships. Month 7-12: Deep connections. Year 2+: Core part of identity, lasting impact.",
      benefits: "Purpose, community, perspective, helping others, social connections, gratitude, skills, feeling useful, legacy building.",
      bestFor: "Service-minded people, those seeking purpose, community seekers, empathetic types, people wanting perspective, social connectors."
    }
  },

  boardGames: {
    name: "Board Game Groups",
    emoji: "🎲",
    category: "Social & Community",
    description: "Join game nights, play strategy games, build a collection. Social hobby for nerdy types.",
    personalityFit: ["social", "strategic", "competitive", "geeky"],
    skillsRequired: ["strategy", "social skills", "rule learning", "sportsmanship"],
    timeCommitment: "4-10 hours/week",
    startupCost: [0, 500],
    timeToSkill: "Learn as you play",
    lifestyle: "social evenings",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "highly social",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You want social time that's not just drinking and small talk. Board games give you strategy, competition, and friendship wrapped in fun.",
      whatToDo: "Find local game groups on Meetup. Visit board game cafes. Start with gateway games (Catan, Ticket to Ride). Build collection. Host game nights.",
      experience: "Month 1-3: Learning games, finding group. Month 4-6: Regular attendee. Month 7-12: Deep in hobby. Year 2+: Game collection, hosting, core friend group.",
      benefits: "Social life, strategy exercise, competition, community, affordable entertainment, substance-free fun, cognitive challenge, regular social ritual.",
      bestFor: "Nerdy types, strategy lovers, people seeking social hobby, competitive minds, those wanting regular friend time, introverts who need structure."
    }
  },

  pub: {
    name: "Pub Trivia Regular",
    emoji: "🍺",
    category: "Social & Community",
    description: "Join a weekly trivia team. Beer, friends, competition, and random knowledge.",
    personalityFit: ["social", "knowledgeable", "competitive", "team-minded"],
    skillsRequired: ["general knowledge", "teamwork", "memory", "social skills"],
    timeCommitment: "2-4 hours/week",
    startupCost: [0, 50],
    timeToSkill: "Immediate start",
    lifestyle: "weekly evening commitment",
    fulfillmentLevel: "high",
    energyType: "fun",
    socialLevel: "highly social",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You know random facts and love friendly competition. Trivia gives you weekly social time, uses your knowledge, and builds camaraderie with your team.",
      whatToDo: "Find local trivia nights. Join a team or form one. Make it weekly ritual. Study trivia topics. Build team chemistry. Enjoy the process.",
      experience: "Week 1-3: Finding your team. Week 4-12: Regular attendee, improving. Month 4-12: Core friend group, weekly highlight. Year 2+: Trivia family, running gag jokes.",
      benefits: "Weekly social time, knowledge use, team bonding, competition, affordable night out, regular ritual, community, laughs.",
      bestFor: "Social types, knowledge hoarders, people needing regular social ritual, competitive friendly types, those seeking weekly anchor event."
    }
  },

  sports: {
    name: "Recreational Sports Leagues",
    emoji: "⚽",
    category: "Social & Community",
    description: "Join adult soccer, softball, basketball leagues. Fitness + social + competition.",
    personalityFit: ["social", "competitive", "athletic", "team-minded"],
    skillsRequired: ["sport-specific skills", "teamwork", "fitness", "sportsmanship"],
    timeCommitment: "3-6 hours/week",
    startupCost: [50, 300],
    timeToSkill: "Depends on sport background",
    lifestyle: "seasonal commitment",
    fulfillmentLevel: "high",
    energyType: "energizing",
    socialLevel: "highly social",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "You miss playing sports. Rec leagues give you fitness, competition, camaraderie, and the joy of being on a team again without crazy intensity.",
      whatToDo: "Join leagues on Meetup or local sports organizations. Try different sports. Commit to the season. Go to post-game socials. Build team chemistry.",
      experience: "Season 1: Finding fit. Season 2: Improving, bonding. Season 3+: Core friend group, fitness habit, looking forward to game days.",
      benefits: "Fitness, social life, competition, teamwork, consistent exercise, post-game socials, sense of belonging, stress relief through movement.",
      bestFor: "Former athletes, social fitness seekers, competitive types, team-minded people, those wanting consistent social + physical outlet."
    }
  },

  meetups: {
    name: "Meetup Groups",
    emoji: "👥",
    category: "Social & Community",
    description: "Join interest-based groups. Hiking, book clubs, language exchange, whatever interests you.",
    personalityFit: ["social", "curious", "open-minded", "initiative-taking"],
    skillsRequired: ["social skills", "open-mindedness", "consistency", "vulnerability"],
    timeCommitment: "2-8 hours/week",
    startupCost: [0, 50],
    timeToSkill: "Immediate participation",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "variable",
    socialLevel: "highly social",
    physicalDemand: "variable",
    detailed: {
      whoYouAre: "You moved to a new city, or your friends got busy, or you just want to expand your circle. Meetups connect you with people who share your interests.",
      whatToDo: "Download Meetup app. Join 3-5 groups that interest you. Actually show up consistently. Talk to people. Be patient building friendships. Host events eventually.",
      experience: "Month 1-3: Attending events, meeting people. Month 4-6: Regular face recognition. Month 7-12: Real friendships forming. Year 2+: Core friend group, social calendar full.",
      benefits: "New friends, shared interests, social calendar, community, trying new things, combating loneliness, networking, regular social structure.",
      bestFor: "New to city, people seeking friends, those who moved away from friend groups, social types, people wanting to try new things, networkers."
    }
  },

  // SPIRITUAL & MINDFULNESS (4 paths)
  meditation: {
    name: "Daily Meditation Practice",
    emoji: "🧘‍♂️",
    category: "Spiritual & Mindfulness",
    description: "Build a meditation practice. 10 minutes to 2 hours. Find inner peace.",
    personalityFit: ["introspective", "patient", "spiritual", "self-aware"],
    skillsRequired: ["stillness", "patience", "consistency", "non-judgment"],
    timeCommitment: "15-60 minutes daily",
    startupCost: [0, 100],
    timeToSkill: "Immediate benefits, lifetime practice",
    lifestyle: "daily morning/evening ritual",
    fulfillmentLevel: "very high",
    energyType: "calming",
    socialLevel: "solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "Your mind never stops. You need tools to find peace in the chaos. Meditation gives you space between stimulus and response, and a calm center to return to.",
      whatToDo: "Use Headspace or Insight Timer. Start with 10 minutes daily. Same time and place. Join meditation groups. Try different styles. Be patient with yourself.",
      experience: "Week 1-4: Difficult, restless mind. Month 2-3: First glimpses of peace. Month 4-12: Noticeable life changes. Year 2+: Transformed relationship with mind.",
      benefits: "Stress reduction, emotional regulation, self-awareness, peace, clarity, better sleep, reactivity reduction, presence, life satisfaction.",
      bestFor: "Anxious minds, overthinkers, spiritual seekers, stressed people, those seeking inner peace, people wanting self-awareness, mental health seekers."
    }
  },

  journaling: {
    name: "Daily Journaling",
    emoji: "📔",
    category: "Spiritual & Mindfulness",
    description: "Morning pages, gratitude journal, or stream of consciousness. Process life through writing.",
    personalityFit: ["introspective", "writer", "self-aware", "disciplined"],
    skillsRequired: ["writing", "honesty", "consistency", "reflection"],
    timeCommitment: "15-30 minutes daily",
    startupCost: [5, 50],
    timeToSkill: "Immediate practice",
    lifestyle: "daily ritual",
    fulfillmentLevel: "very high",
    energyType: "clarifying",
    socialLevel: "solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You need to process your thoughts and emotions. Journaling gives you clarity, tracks your growth, and serves as your therapist that's always available.",
      whatToDo: "Get a nice notebook or use Day One app. Write 3 pages every morning (Morning Pages). Or gratitude journal nightly. Make it non-negotiable ritual.",
      experience: "Week 1-4: Building habit. Month 2-3: Seeing patterns. Month 4-12: Deep self-awareness. Year 2+: Years of documented growth, invaluable self-knowledge.",
      benefits: "Self-awareness, emotional processing, clarity, anxiety reduction, goal tracking, pattern recognition, life documentation, therapeutic outlet.",
      bestFor: "Introspective types, overthinkers, people processing emotions, writers, those seeking self-understanding, anxious minds, goal-setters."
    }
  },

  spirituality: {
    name: "Spiritual Practice",
    emoji: "🙏",
    category: "Spiritual & Mindfulness",
    description: "Explore religion, spirituality, consciousness. Church, temple, meditation groups, or solo practice.",
    personalityFit: ["spiritual", "seeking", "open-minded", "introspective"],
    skillsRequired: ["open-mindedness", "consistency", "faith", "patience"],
    timeCommitment: "2-10 hours/week",
    startupCost: [0, 100],
    timeToSkill: "Lifelong journey",
    lifestyle: "regular practice",
    fulfillmentLevel: "very high",
    energyType: "centering",
    socialLevel: "solo or community",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You sense there's more to life than material existence. You're seeking meaning, connection to something greater, and answers to life's biggest questions.",
      whatToDo: "Explore different traditions with open mind. Visit churches, temples, meditation centers. Read spiritual texts. Find community. Develop daily practice. Give it time.",
      experience: "Month 1-6: Exploration, questioning. Month 7-12: Finding path. Year 2: Deepening practice. Year 3+: Transformed worldview, community, peace.",
      benefits: "Meaning, community, ethical framework, peace, purpose, dealing with mortality, connection, perspective, hope, life guidance.",
      bestFor: "Seekers, those questioning meaning, people facing mortality, community seekers, those needing ethical framework, peace seekers."
    }
  },

  mindfulness: {
    name: "Mindfulness Living",
    emoji: "🌸",
    category: "Spiritual & Mindfulness",
    description: "Practice presence in daily life. Mindful eating, walking, breathing. Be here now.",
    personalityFit: ["present-focused", "patient", "aware", "intentional"],
    skillsRequired: ["awareness", "patience", "consistency", "non-judgment"],
    timeCommitment: "Integrated into daily life",
    startupCost: [0, 50],
    timeToSkill: "Immediate practice, lifetime mastery",
    lifestyle: "way of living",
    fulfillmentLevel: "very high",
    energyType: "centering",
    socialLevel: "solo",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "Life passes you by while you're planning or ruminating. You want to actually be present for your life instead of lost in thought constantly.",
      whatToDo: "Read 'Power of Now.' Practice mindful eating, walking, breathing throughout day. Set phone reminders to check in with present moment. Join mindfulness courses.",
      experience: "Week 1-4: Catching moments of presence. Month 2-3: More frequent awareness. Month 4-12: Noticeable shift. Year 2+: Present as default, life satisfaction transformed.",
      benefits: "Presence, life satisfaction, anxiety reduction, appreciation, slowing down, enjoyment increase, stress relief, better relationships, quality of life.",
      bestFor: "Chronically distracted, anxious minds, people feeling life passes by, stressed people, those seeking more from daily life, quality of life seekers."
    }
  },

  // SIDE HUSTLES (FOR PASSION) (4 paths)
  reselling: {
    name: "Reselling & Flipping",
    emoji: "🏷️",
    category: "Side Hustles",
    description: "Thrift store flips, sneaker reselling, vintage finds. Treasure hunting for profit.",
    personalityFit: ["entrepreneurial", "keen-eyed", "persistent", "business-minded"],
    skillsRequired: ["product knowledge", "negotiation", "photography", "online selling"],
    timeCommitment: "5-15 hours/week",
    startupCost: [100, 2000],
    timeToSkill: "3-6 months to profit consistently",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "exciting",
    socialLevel: "mostly solo",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You love the hunt for deals and treasure. Reselling gives you treasure-hunting adventure, business skills, and extra income from a fun hobby.",
      whatToDo: "Learn valuable brands. Hit thrift stores on restock days. List on eBay/Poshmark. Learn photography. Start small. Reinvest profits. Join r/Flipping.",
      experience: "Month 1-3: Learning what sells, first flips. Month 4-6: Consistent profits. Month 7-12: $500-2000/month possible. Year 2+: Could scale to serious income.",
      benefits: "Extra income, treasure hunting, business skills, flexible schedule, entrepreneurship, excitement of finds, sustainable shopping, negotiation skills.",
      bestFor: "Treasure hunters, entrepreneurial types, deal seekers, business-minded, people wanting fun side income, thrift store lovers."
    }
  },

  teaching: {
    name: "Online Teaching/Tutoring",
    emoji: "👨‍🏫",
    category: "Side Hustles",
    description: "Teach English online, tutor students, create courses. Share your knowledge for income.",
    personalityFit: ["patient", "knowledgeable", "communicative", "helpful"],
    skillsRequired: ["teaching ability", "patience", "subject knowledge", "communication"],
    timeCommitment: "5-15 hours/week",
    startupCost: [0, 200],
    timeToSkill: "Immediate start",
    lifestyle: "flexible schedule",
    fulfillmentLevel: "high",
    energyType: "fulfilling",
    socialLevel: "interactive",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You're good at something and want to help others learn. Teaching gives you extra income, fulfillment, and the joy of seeing others succeed.",
      whatToDo: "Sign up for VIPKid, Wyzant, or Outschool. Or create Udemy course. Set your rates. Build reviews. Schedule flexibly. Perfect for nights/weekends.",
      experience: "Month 1-3: First students, building reputation. Month 4-6: Consistent bookings. Month 7-12: $500-2000/month. Year 2+: Could become primary income.",
      benefits: "Extra income, helping others, flexibility, work from home, using expertise, rewarding, relationship building, resume building, teaching skills.",
      bestFor: "Patient people, experts in anything, people wanting meaningful side income, flexible schedulers, helpful types, educators at heart."
    }
  },

  petSitting: {
    name: "Pet Sitting & Dog Walking",
    emoji: "🐕",
    category: "Side Hustles",
    description: "Use Rover or Wag. Get paid to hang with dogs. Perfect side income for animal lovers.",
    personalityFit: ["animal-loving", "reliable", "active", "trustworthy"],
    skillsRequired: ["animal handling", "reliability", "physical fitness", "responsibility"],
    timeCommitment: "5-20 hours/week",
    startupCost: [0, 100],
    timeToSkill: "Immediate start",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "energizing",
    socialLevel: "solo + animals",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You love animals but can't have your own (apartment, travel, money). Pet sitting lets you hang with dogs, get exercise, and make money doing what you'd do free.",
      whatToDo: "Sign up for Rover and Wag. Set competitive rates. Build 5-star reviews. Book initially through friends. Take good photos. Be reliable.",
      experience: "Month 1-3: First clients, building reviews. Month 4-6: Regular clients. Month 7-12: $500-1500/month. Year 2+: Full schedule possible, love your work.",
      benefits: "Extra income, animal time, exercise, flexibility, outdoors time, animal therapy, no degree needed, instant startup, rewarding.",
      bestFor: "Animal lovers, active people, those wanting outdoor income, flexible schedulers, people who can't have pets, fitness seekers with income need."
    }
  },

  freelance: {
    name: "Freelance Your Skill",
    emoji: "💼",
    category: "Side Hustles",
    description: "Freelance writing, design, consulting in your expertise. Turn your skill into side income.",
    personalityFit: ["entrepreneurial", "skilled", "self-directed", "communicative"],
    skillsRequired: ["marketable skill", "business basics", "communication", "self-management"],
    timeCommitment: "5-20 hours/week",
    startupCost: [0, 300],
    timeToSkill: "Based on existing skill",
    lifestyle: "flexible",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "client interaction",
    physicalDemand: "very low",
    detailed: {
      whoYouAre: "You're good at something people pay for. Freelancing lets you use your skills on your terms, earn extra income, and maybe escape 9-5 someday.",
      whatToDo: "Identify your marketable skill. Create Upwork/Fiverr profile or pitch directly. Start with low rates to build portfolio. Network. Raise rates as you grow.",
      experience: "Month 1-3: First clients, finding niche. Month 4-6: Steady work. Month 7-12: $1000-3000/month possible. Year 2+: Could replace full-time income.",
      benefits: "Extra income, skill development, flexibility, entrepreneurship, portfolio building, potential freedom, using expertise, client relationships.",
      bestFor: "Skilled people, entrepreneurial minds, side income seekers, people testing business ideas, potential future freelancers, freedom seekers."
    }
  },

  // BUILDING & MAKING (3 paths)
  woodworking: {
    name: "Woodworking",
    emoji: "🪚",
    category: "Building & Making",
    description: "Build furniture, cutting boards, decorations. Create with your hands using wood.",
    personalityFit: ["hands-on", "patient", "creative", "detail-oriented"],
    skillsRequired: ["tool use", "precision", "safety awareness", "spatial reasoning"],
    timeCommitment: "5-15 hours/week",
    startupCost: [200, 3000],
    timeToSkill: "3-6 months for basic projects",
    lifestyle: "space requirement",
    fulfillmentLevel: "very high",
    energyType: "satisfying",
    socialLevel: "mostly solo",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You want to build things that last. Woodworking gives you tangible creations, useful skills, and the satisfaction of saying 'I made that.'",
      whatToDo: "Start with basic hand tools. Take community workshop class. Build simple projects. Watch YouTube tutorials. Upgrade tools over time. Join r/woodworking.",
      experience: "Month 1-3: Basic projects, learning safety. Month 4-6: First furniture piece. Month 7-12: Quality creations. Year 2+: Heirloom pieces, possible income.",
      benefits: "Tangible creations, useful skill, home improvement ability, gifts, possible income, stress relief, problem-solving, functional art.",
      bestFor: "Hands-on people, creators, practical types, those wanting functional art, DIYers, people needing tactile hobby, gift-makers."
    }
  },

  homebrewing: {
    name: "Homebrewing Beer/Kombucha",
    emoji: "🍺",
    category: "Building & Making",
    description: "Brew your own beer, kombucha, mead. Science + creativity + drinkable results.",
    personalityFit: ["patient", "scientific", "creative", "experimental"],
    skillsRequired: ["patience", "cleanliness", "recipe following", "experimentation"],
    timeCommitment: "3-8 hours/week",
    startupCost: [100, 1000],
    timeToSkill: "3-6 months for quality brews",
    lifestyle: "space requirement",
    fulfillmentLevel: "high",
    energyType: "engaging",
    socialLevel: "solo creation, social sharing",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You love beer/kombucha and want to create your own. Homebrewing combines science, creativity, and the reward of drinking your creation.",
      whatToDo: "Get starter kit. Follow recipes exactly first. Join r/Homebrewing. Take notes on batches. Experiment after basics down. Share with friends.",
      experience: "Batch 1-3: Learning process. Batch 4-6: Drinkable beer. Batch 7-12: Good beer. Year 2+: Great beer, signature recipes, brew master.",
      benefits: "Drinkable results, science learning, creativity, cheaper beer long-term, social sharing, experimentation, party hosting, unique skill.",
      bestFor: "Beer/kombucha lovers, science-minded, patient experimenters, hosts, people wanting unique hobby, creative chemists."
    }
  },

  automotive: {
    name: "Car Modification & Maintenance",
    emoji: "🚗",
    category: "Building & Making",
    description: "Work on your car. Maintenance, modifications, detailing. Mechanical satisfaction.",
    personalityFit: ["mechanical", "hands-on", "patient", "problem-solver"],
    skillsRequired: ["mechanical aptitude", "tool use", "patience", "problem-solving"],
    timeCommitment: "3-10 hours/week",
    startupCost: [200, 3000],
    timeToSkill: "6-12 months for competency",
    lifestyle: "garage/driveway needed",
    fulfillmentLevel: "high",
    energyType: "satisfying",
    socialLevel: "solo or car community",
    physicalDemand: "medium to high",
    detailed: {
      whoYouAre: "You love cars and want to understand how they work. Wrenching gives you self-sufficiency, saves money, and connects you to car culture.",
      whatToDo: "Start with basic maintenance (oil, brakes). Watch ChrisFix on YouTube. Buy quality tools. Join car forums for your model. Progress to modifications.",
      experience: "Month 1-3: Basic maintenance. Month 4-6: Brake jobs, suspension. Month 7-12: Engine work. Year 2+: Full modifications, car meet regular.",
      benefits: "Money savings, self-sufficiency, problem-solving, community, mechanical knowledge, car improvement, stress relief through wrenching, useful skill.",
      bestFor: "Car lovers, mechanical minds, DIYers, money savers, people wanting self-sufficiency, problem-solvers, gearheads."
    }
  },

  // PERFORMANCE & EXPRESSION (2 paths)
  music: {
    name: "Learn an Instrument",
    emoji: "🎸",
    category: "Performance & Expression",
    description: "Guitar, piano, drums. Create music. Join a band. Express yourself through sound.",
    personalityFit: ["creative", "patient", "expressive", "dedicated"],
    skillsRequired: ["rhythm", "coordination", "persistence", "practice discipline"],
    timeCommitment: "5-15 hours/week",
    startupCost: [200, 2000],
    timeToSkill: "6-12 months for basic songs",
    lifestyle: "daily practice needed",
    fulfillmentLevel: "very high",
    energyType: "expressive",
    socialLevel: "solo or band",
    physicalDemand: "low",
    detailed: {
      whoYouAre: "Music moves you and you want to create it yourself. Learning an instrument gives you lifelong skill, creative outlet, and possibility of jamming with others.",
      whatToDo: "Pick ONE instrument. Take lessons initially. Practice 30 min daily. Use YouTube tutorials. Join music communities. Jam with others when ready.",
      experience: "Month 1-3: Basics, frustration. Month 4-6: First songs. Month 7-12: Playing music you love. Year 2+: Jamming, maybe band, lifelong joy.",
      benefits: "Creative expression, cognitive benefits, stress relief, possible band, confidence, lifelong skill, music appreciation, meditative practice.",
      bestFor: "Music lovers, creative types, dedicated practicers, patient people, those wanting expressive outlet, potential band members."
    }
  },

  acting: {
    name: "Community Theater",
    emoji: "🎭",
    category: "Performance & Expression",
    description: "Audition for local plays. Express yourself on stage. Build confidence through performance.",
    personalityFit: ["expressive", "brave", "creative", "social"],
    skillsRequired: ["memorization", "public speaking", "emotion access", "commitment"],
    timeCommitment: "10-20 hours/week during shows",
    startupCost: [0, 200],
    timeToSkill: "Learn through doing",
    lifestyle: "evening/weekend commitment during shows",
    fulfillmentLevel: "very high",
    energyType: "highly energizing",
    socialLevel: "highly social",
    physicalDemand: "medium",
    detailed: {
      whoYouAre: "You're expressive and miss performing. Theater gives you creative outlet, community, confidence, and the high of performance.",
      whatToDo: "Find local community theaters. Audition for shows. Take acting classes. Be prepared for rejection. Commit fully when cast. Build theater family.",
      experience: "Show 1: Nervous, small role. Show 2-3: Bigger roles, confidence building. Show 4+: Lead roles possible, deep community, transformative.",
      benefits: "Creative expression, confidence, community, performing high, skill building, making art, social life, personal growth, facing fears.",
      bestFor: "Expressive people, former theater kids, confidence seekers, social types, creative performers, brave people wanting to try something new."
    }
  }
};

// Export to window for use in quiz
window.lifePaths = lifePaths;
