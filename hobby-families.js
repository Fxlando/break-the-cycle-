(function() {
  function normalizeHobbyName(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  const catalogHobbyNames = Object.values(window.lifePaths || {})
    .map((path) => path && path.name)
    .filter(Boolean);

  const catalogHobbyLookup = new Map(
    catalogHobbyNames.map((name) => [normalizeHobbyName(name), name])
  );

  function resolveHobbyList(preferredHobbies) {
    const resolved = [];
    const seen = new Set();

    for (const rawHobby of preferredHobbies || []) {
      const normalized = normalizeHobbyName(rawHobby);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      resolved.push(catalogHobbyLookup.get(normalized) || rawHobby);
    }

    return resolved;
  }

  function buildFamily(definition) {
    const exampleHobbies = resolveHobbyList(definition.exampleHobbies).slice(0, 6);
    const backingHobbies = resolveHobbyList([
      ...exampleHobbies,
      ...(definition.backingHobbies || [])
    ]).slice(0, 20);

    return {
      familyKey: definition.familyKey,
      name: definition.name,
      category: definition.category,
      description: definition.description,
      timeCommitment: definition.timeCommitment,
      startupCost: definition.startupCost,
      timeToEnjoyment: definition.timeToEnjoyment,
      energyType: definition.energyType,
      socialLevel: definition.socialLevel,
      physicalDemand: definition.physicalDemand,
      lifestyle: definition.lifestyle,
      detailed: definition.detailed || {},
      exampleHobbies,
      backingHobbies,
      fitTags: definition.fitTags || [],
      conflictTags: definition.conflictTags || [],
      fitReasonsTemplate: definition.fitReasonsTemplate || {}
    };
  }

  const familyList = [
    {
      familyKey: 'creative_visual_making',
      name: 'Creative Visual Making',
      category: 'Creative Expression',
      description: 'Visual, tactile, and design-based hobbies for people who want to make something personal and visible.',
      timeCommitment: '1-8 hours/week',
      startupCost: [0, 600],
      timeToEnjoyment: 'First session to 1 month',
      energyType: 'calming to balanced',
      socialLevel: 'solo or small group',
      physicalDemand: 'low',
      lifestyle: 'flexible, home-friendly, and creative',
      detailed: {
        whoYouAre: 'You want a real outlet for taste, emotion, and imagination without needing a perfect schedule or big audience.',
        whatToDo: 'Pick one low-friction medium, gather a simple starter kit, and make one small finished piece per week for a month.'
      },
      exampleHobbies: ['Drawing', 'Painting', 'Photography', 'Pottery', 'Calligraphy', 'Digital Art'],
      backingHobbies: ['Watercolor', 'Acrylic Painting', 'Oil Painting', 'Sketching', 'Sculpting', 'Graphic Design', 'Fashion Design', 'Scrapbooking', 'Origami', 'Pixel Art', 'Photo Editing', 'Interior Decorating'],
      fitTags: ['low_cost', 'low_time', 'creative_expression', 'hands_on_making', 'solo_recharge', 'low_physical', 'indoor_friendly', 'home_based', 'beginner_friendly', 'flexible_drop_in', 'calming'],
      conflictTags: ['high_physical', 'competition_play'],
      fitReasonsTemplate: {
        low_cost: 'You can start visually creating without a big upfront spend.',
        creative_expression: 'You wanted more room for personal expression and originality.',
        hands_on_making: 'Making something tangible or visual seems satisfying for you.',
        flexible_drop_in: 'This family can fit around inconsistent time and energy.',
        low_physical: 'It works well when you want lower-strain activities.'
      }
    },
    {
      familyKey: 'music_sound_performance',
      name: 'Music, Sound, and Performance',
      category: 'Performance and Sound',
      description: 'Sound, rhythm, voice, and performance hobbies for people who process life through music or being heard.',
      timeCommitment: '2-10 hours/week',
      startupCost: [0, 1200],
      timeToEnjoyment: 'First week to 3 months',
      energyType: 'energizing',
      socialLevel: 'solo, small group, or community',
      physicalDemand: 'low-medium',
      lifestyle: 'practice-based, expressive, and often social',
      detailed: {
        whoYouAre: 'You are moved by rhythm, voice, or performance and want an outlet that can be private practice or shared energy.',
        whatToDo: 'Choose one lane, schedule two practice blocks a week, and look for a low-pressure class, jam, open mic, or online community.'
      },
      exampleHobbies: ['Learning an Instrument', 'Singing', 'Music Production & DJing', 'Podcasting', 'Dance', 'Public Speaking'],
      backingHobbies: ['Guitar', 'Piano', 'Drums', 'Violin', 'Bass', 'Songwriting', 'Beat Making', 'Rapping', 'Public Speaking', 'Stand-Up Comedy', 'Theater & Acting', 'Hip-Hop Dance', 'Salsa', 'Ballroom Dancing'],
      fitTags: ['creative_expression', 'performance_sharing', 'energizing', 'mastery_path', 'small_group', 'community_social', 'learning_growth'],
      conflictTags: ['low_energy', 'screen_free'],
      fitReasonsTemplate: {
        performance_sharing: 'You left room for being heard, seen, or shared with others.',
        energizing: 'You sounded open to hobbies that lift your energy instead of only calming it down.',
        mastery_path: 'This family gives you a skill you can keep improving over time.',
        community_social: 'Music and performance can create natural community when you want it.'
      }
    },
    {
      familyKey: 'writing_story_reflection',
      name: 'Writing, Story, and Reflection',
      category: 'Words and Reflection',
      description: 'Writing and reflection hobbies for people who want clarity, storytelling, emotional processing, or a private creative outlet.',
      timeCommitment: '15 minutes-6 hours/week',
      startupCost: [0, 100],
      timeToEnjoyment: 'Immediate start',
      energyType: 'calming',
      socialLevel: 'solo or small group',
      physicalDemand: 'very low',
      lifestyle: 'quiet, flexible, and private-friendly',
      detailed: {
        whoYouAre: 'You need a place for thoughts, memories, ideas, or feelings to land so they stop circling in your head.',
        whatToDo: 'Start with a 15-minute writing ritual, then choose one form: journal entries, poems, essays, stories, or a small blog.'
      },
      exampleHobbies: ['Creative Writing', 'Journaling', 'Poetry', 'Blogging', 'Storytelling', 'Screenwriting'],
      backingHobbies: ['Writing', 'Songwriting', 'Reading', 'Book Clubs', 'Debate', 'Studying Philosophy', 'Watching Documentaries', 'Cinema Appreciation', 'Journaling Your Life', 'Self-Improvement', 'Goal Setting', 'Habit Tracking'],
      fitTags: ['low_cost', 'low_time', 'solo_recharge', 'low_energy', 'calming', 'indoor_friendly', 'screen_based', 'creative_expression', 'meaning_reflection', 'home_based', 'beginner_friendly'],
      conflictTags: ['high_physical', 'community_social'],
      fitReasonsTemplate: {
        low_time: 'This can start small without needing a huge weekly commitment.',
        meaning_reflection: 'You seemed to want more self-understanding and depth.',
        low_cost: 'It is easy to start without buying much.',
        solo_recharge: 'It gives you alone time that still feels purposeful.'
      }
    },
    {
      familyKey: 'movement_fitness_sports',
      name: 'Movement, Fitness, and Sports',
      category: 'Movement and Sports',
      description: 'Active hobbies for people who want strength, sweat, progress, play, or a healthier relationship with their body.',
      timeCommitment: '2-10 hours/week',
      startupCost: [0, 800],
      timeToEnjoyment: 'First week to 2 months',
      energyType: 'energizing',
      socialLevel: 'solo, small group, or team',
      physicalDemand: 'high',
      lifestyle: 'routine-building and body-based',
      detailed: {
        whoYouAre: 'You feel better when your body is involved, and you want visible progress, stress release, or playful competition.',
        whatToDo: 'Choose a beginner-friendly activity, start below your ego, and build a weekly rhythm before chasing intensity.'
      },
      exampleHobbies: ['Weightlifting', 'Running & Marathon Training', 'Yoga', 'Martial Arts', 'Pickleball', 'Dance'],
      backingHobbies: ['Fitness', 'Calisthenics', 'Walking', 'Swimming', 'Boxing', 'Kickboxing', 'Jiu-Jitsu', 'Pilates', 'Mobility Work', 'Basketball', 'Soccer', 'Tennis', 'Bowling', 'Disc Golf', 'Archery', 'Local Sports Leagues'],
      fitTags: ['energizing', 'high_physical', 'steady_routine', 'competition_play', 'small_group', 'community_social', 'mastery_path', 'screen_free'],
      conflictTags: ['low_physical', 'low_energy'],
      fitReasonsTemplate: {
        high_physical: 'You were open to movement, sweat, or a more active reset.',
        steady_routine: 'This family works well when a regular rhythm would help you.',
        competition_play: 'Play, goals, or friendly competition can keep this interesting.',
        screen_free: 'It gives you a clean break from screens.'
      }
    },
    {
      familyKey: 'outdoors_adventure_nature',
      name: 'Outdoors, Adventure, and Nature',
      category: 'Nature and Exploration',
      description: 'Outdoor hobbies for people who need fresh air, exploration, scenery, and a bigger world outside the usual routine.',
      timeCommitment: '2 hours/week to weekend focus',
      startupCost: [0, 1500],
      timeToEnjoyment: 'Immediate start to 3 months',
      energyType: 'energizing and grounding',
      socialLevel: 'solo, small group, or community',
      physicalDemand: 'medium-high',
      lifestyle: 'outdoor, seasonal, and exploratory',
      detailed: {
        whoYouAre: 'You want your life to feel wider, less boxed in, and more connected to place, weather, nature, or discovery.',
        whatToDo: 'Start local and simple: a nearby trail, park, water day, photo walk, or day trip before investing in serious gear.'
      },
      exampleHobbies: ['Hiking', 'Camping', 'Fishing', 'Kayaking', 'Birdwatching', 'Stargazing'],
      backingHobbies: ['Backpacking', 'Paddleboarding', 'Canoeing', 'Snorkeling', 'Scuba Diving', 'Surfing', 'Rock Climbing', 'Bouldering', 'Geocaching', 'Road Trips', 'Visiting National Parks', 'Urban Exploration', 'Beach Days', 'Lake Days', 'Bonfires', 'Picnics'],
      fitTags: ['outdoor_nature', 'exploration_adventure', 'screen_free', 'energizing', 'high_physical', 'small_group', 'flexible_drop_in', 'calming'],
      conflictTags: ['indoor_friendly', 'low_physical'],
      fitReasonsTemplate: {
        outdoor_nature: 'Fresh air, place, or nature showed up as a strong need.',
        exploration_adventure: 'You seem to want novelty and a wider sense of life.',
        screen_free: 'This family gives you time away from screens and indoor loops.',
        flexible_drop_in: 'You can start with local, low-pressure outings.'
      }
    },
    {
      familyKey: 'mindful_spiritual_wellbeing',
      name: 'Mindful, Spiritual, and Wellbeing Practices',
      category: 'Calm and Meaning',
      description: 'Reflective hobbies for people who want calm, grounding, spiritual depth, emotional repair, or a steadier inner life.',
      timeCommitment: '10 minutes-5 hours/week',
      startupCost: [0, 300],
      timeToEnjoyment: 'Immediate start to 1 month',
      energyType: 'calming',
      socialLevel: 'solo or community',
      physicalDemand: 'very low-low',
      lifestyle: 'gentle, reflective, and routine-friendly',
      detailed: {
        whoYouAre: 'You are looking for a reset that lowers noise, rebuilds presence, and gives your inner life more room.',
        whatToDo: 'Pick one grounding ritual and keep it tiny at first. Add a class, group, book, or guide only after the habit feels real.'
      },
      exampleHobbies: ['Meditation', 'Prayer', 'Yoga', 'Spiritual Study', 'Therapy Work', 'Habit Tracking'],
      backingHobbies: ['Self-Improvement', 'Shadow Work', 'Goal Setting', 'Journaling', 'Studying Religion', 'Studying Philosophy', 'Stretching', 'Mobility Work', 'Reading', 'Walking', 'Tea Tasting', 'Stargazing'],
      fitTags: ['low_cost', 'low_time', 'steady_routine', 'solo_recharge', 'low_energy', 'calming', 'low_physical', 'indoor_friendly', 'meaning_reflection', 'home_based', 'beginner_friendly'],
      conflictTags: ['competition_play', 'performance_sharing'],
      fitReasonsTemplate: {
        calming: 'You seemed to need something that settles your system.',
        meaning_reflection: 'Depth, meaning, or inner clarity mattered in your answers.',
        low_energy: 'This family can work even when your energy is limited.',
        steady_routine: 'Small repeatable rituals can give you a steadier reset.'
      }
    },
    {
      familyKey: 'social_community_belonging',
      name: 'Social, Community, and Belonging',
      category: 'Connection and Community',
      description: 'Connection-based hobbies for people who want friends, recurring community, shared activities, and a reason to show up.',
      timeCommitment: '2-8 hours/week',
      startupCost: [0, 400],
      timeToEnjoyment: 'First week to 2 months',
      energyType: 'balanced to energizing',
      socialLevel: 'community',
      physicalDemand: 'low-medium',
      lifestyle: 'regular, people-centered, and local or online',
      detailed: {
        whoYouAre: 'You do not just want an activity. You want a place to be known, a recurring rhythm, and people to do life with.',
        whatToDo: 'Choose one recurring group and attend at least three times before deciding whether it is your people.'
      },
      exampleHobbies: ['Book Clubs', 'Game Nights', 'Volunteering', 'Meetups', 'Hosting Gatherings', 'Local Sports Leagues'],
      backingHobbies: ['Networking Events', 'Hiking Clubs', 'Photography Walks', 'Church Groups', 'Youth Groups', 'Community Service', 'Dating', 'Socializing', 'Making Friends', 'Family Time', 'Parenting Activities', 'Discord Community Building', 'Online Communities', 'Festivals', 'Conventions'],
      fitTags: ['community_social', 'small_group', 'service_connection', 'steady_routine', 'energizing', 'family_friendly', 'beginner_friendly'],
      conflictTags: ['solo_recharge'],
      fitReasonsTemplate: {
        community_social: 'You sounded like connection and belonging matter right now.',
        steady_routine: 'Recurring activities can make social momentum easier.',
        service_connection: 'Helping, hosting, or showing up for others may feel meaningful.',
        family_friendly: 'Many of these can include friends, family, or local community.'
      }
    },
    {
      familyKey: 'games_strategy_play',
      name: 'Games, Strategy, and Play',
      category: 'Play and Strategy',
      description: 'Playful and strategic hobbies for people who want challenge, fun, friendly competition, or structured social time.',
      timeCommitment: '1-8 hours/week',
      startupCost: [0, 500],
      timeToEnjoyment: 'Immediate start',
      energyType: 'balanced',
      socialLevel: 'solo, small group, or online community',
      physicalDemand: 'very low-low',
      lifestyle: 'drop-in, playful, and skill-building',
      detailed: {
        whoYouAre: 'You want something fun enough to pull you in, but structured enough that it gives your brain a satisfying challenge.',
        whatToDo: 'Start with one format: tabletop, puzzles, casual sports, or online play. Then find a weekly group or personal progress goal.'
      },
      exampleHobbies: ['Board Games', 'Chess', 'Gaming', 'Dungeons & Dragons', 'Trivia', 'Puzzles'],
      backingHobbies: ['Card Games', 'Game Nights', 'Esports', 'Speedrunning', 'Modding Games', 'Speedcubing', 'Table Tennis', 'Pool', 'Darts', 'Mini Golf', 'Bowling', 'Disc Golf', 'Fantasy Sports'],
      fitTags: ['competition_play', 'learning_growth', 'screen_based', 'indoor_friendly', 'small_group', 'community_social', 'low_physical', 'beginner_friendly', 'mastery_path'],
      conflictTags: ['screen_free', 'high_physical'],
      fitReasonsTemplate: {
        competition_play: 'Friendly challenge or play seems likely to keep you engaged.',
        small_group: 'This can give you structured time with other people without forcing constant small talk.',
        learning_growth: 'Games offer visible progress without making the hobby feel like work.',
        beginner_friendly: 'You can start casually and deepen only if it sticks.'
      }
    },
    {
      familyKey: 'learning_ideas_skills',
      name: 'Learning, Ideas, and Skill Building',
      category: 'Learning and Ideas',
      description: 'Curiosity-driven hobbies for people who want to learn, understand, research, build knowledge, or sharpen a skill.',
      timeCommitment: '1-10 hours/week',
      startupCost: [0, 600],
      timeToEnjoyment: 'Immediate start to 3 months',
      energyType: 'balanced',
      socialLevel: 'solo or small group',
      physicalDemand: 'very low',
      lifestyle: 'self-paced, focused, and flexible',
      detailed: {
        whoYouAre: 'Your brain wants something to chew on: ideas, skills, systems, history, language, or a project that gets sharper over time.',
        whatToDo: 'Pick one learning lane and one output: notes, a project, a discussion group, or a small challenge you can finish.'
      },
      exampleHobbies: ['Reading', 'Learning Languages', 'Studying History', 'Coding', 'Robotics', 'Trivia'],
      backingHobbies: ['Studying Philosophy', 'Studying Psychology', 'Studying Business', 'App Building', 'Game Development', 'Web Design', 'Electronics', 'Watching Documentaries', 'Visiting Museums', 'Debate', 'Chess', 'Astronomy', 'Budgeting', 'Investing'],
      fitTags: ['learning_growth', 'mastery_path', 'low_cost', 'low_physical', 'indoor_friendly', 'screen_based', 'solo_recharge', 'flexible_drop_in', 'meaning_reflection'],
      conflictTags: ['high_physical'],
      fitReasonsTemplate: {
        learning_growth: 'You sounded interested in growth, ideas, or building capability.',
        mastery_path: 'This family rewards patience and deeper skill over time.',
        flexible_drop_in: 'You can fit it into odd pockets of time.',
        low_cost: 'A lot of these paths start with free or inexpensive resources.'
      }
    },
    {
      familyKey: 'food_home_garden_care',
      name: 'Food, Home, Garden, and Care',
      category: 'Home and Care',
      description: 'Practical, nurturing hobbies that make home, food, plants, pets, and daily life feel more alive.',
      timeCommitment: '1-8 hours/week',
      startupCost: [0, 1000],
      timeToEnjoyment: 'Immediate start to 2 months',
      energyType: 'calming to balanced',
      socialLevel: 'solo, family, or small group',
      physicalDemand: 'low-medium',
      lifestyle: 'home-based, practical, and nurturing',
      detailed: {
        whoYouAre: 'You want hobbies that make ordinary life richer: better meals, better space, living things, shared rituals, or a calmer home.',
        whatToDo: 'Start with one repeatable ritual like Sunday cooking, one plant shelf, a weekly bake, or a simple home project.'
      },
      exampleHobbies: ['Cooking', 'Baking', 'Gardening', 'Coffee Brewing', 'Indoor Plants', 'Dog Training'],
      backingHobbies: ['Grilling', 'Smoking Meats', 'Meal Prep', 'Espresso Making', 'Tea Tasting', 'Vegetable Gardening', 'Flower Gardening', 'Bonsai', 'Aquariums', 'Fishkeeping', 'Pet Care', 'Home Improvement', 'Organizing Your Room', 'Family Time', 'Parenting Activities'],
      fitTags: ['low_cost', 'low_time', 'flexible_drop_in', 'hands_on_making', 'home_based', 'family_friendly', 'calming', 'low_physical', 'steady_routine', 'screen_free', 'service_connection', 'beginner_friendly'],
      conflictTags: ['performance_sharing'],
      fitReasonsTemplate: {
        flexible_drop_in: 'You can start with small rituals that fit around real life.',
        home_based: 'You seemed to want something that can fit close to home.',
        family_friendly: 'This family can include family, pets, or shared routines.',
        hands_on_making: 'It gives you practical, visible results.',
        calming: 'These hobbies can be grounding without being too intense.'
      }
    },
    {
      familyKey: 'tech_digital_creation',
      name: 'Tech and Digital Creation',
      category: 'Digital Creation',
      description: 'Screen-based creative and technical hobbies for people who like tools, systems, media, building, and online creation.',
      timeCommitment: '2-12 hours/week',
      startupCost: [0, 1500],
      timeToEnjoyment: 'First week to 3 months',
      energyType: 'engaging',
      socialLevel: 'solo or online community',
      physicalDemand: 'very low',
      lifestyle: 'digital, flexible, and project-based',
      detailed: {
        whoYouAre: 'You enjoy tools, systems, media, or digital spaces and want a hobby that can turn curiosity into finished projects.',
        whatToDo: 'Choose one tool and one beginner project. Finish something small before adding more software, gear, or platforms.'
      },
      exampleHobbies: ['Video Editing & Content Creation', 'Coding', 'Game Development', '3D Modeling', 'Animation', 'Drone Flying'],
      backingHobbies: ['App Building', 'Web Design', 'Digital Art', 'Pixel Art', 'Podcasting', 'Streaming', 'YouTube', 'TikTok Creation', 'Meme Making', 'Discord Community Building', 'Modding Games', 'Robotics', 'Electronics', 'Photo Editing'],
      fitTags: ['screen_based', 'creative_expression', 'learning_growth', 'mastery_path', 'low_physical', 'indoor_friendly', 'solo_recharge', 'flexible_drop_in', 'home_based'],
      conflictTags: ['screen_free', 'high_physical'],
      fitReasonsTemplate: {
        screen_based: 'You were open to screen-based hobbies when the activity is engaging.',
        learning_growth: 'This family gives you tools and skills to keep improving.',
        creative_expression: 'It blends creativity with structure and finished projects.',
        home_based: 'It is easy to practice from home with flexible timing.'
      }
    },
    {
      familyKey: 'collecting_culture_exploration',
      name: 'Collecting, Culture, and Exploration',
      category: 'Culture and Discovery',
      description: 'Discovery-based hobbies for people who like taste, identity, local exploration, history, objects, events, and finding hidden gems.',
      timeCommitment: '1-8 hours/week',
      startupCost: [0, 1200],
      timeToEnjoyment: 'Immediate start',
      energyType: 'balanced',
      socialLevel: 'solo, small group, or community',
      physicalDemand: 'low-medium',
      lifestyle: 'curious, flexible, and experience-led',
      detailed: {
        whoYouAre: 'You enjoy the hunt, the story, the taste, or the vibe. A good hobby for you may be about discovery more than mastery.',
        whatToDo: 'Choose one collecting or exploration lane, set a simple budget, and turn it into a recurring ritual or local route.'
      },
      exampleHobbies: ['Thrifting', 'Collecting', 'Visiting Museums', 'Trying New Restaurants', 'Attending Concerts', 'Exploring Your City'],
      backingHobbies: ['Sneaker Collecting', 'Coin Collecting', 'Card Collecting', 'Comic Collecting', 'Vinyl Collecting', 'Watch Collecting', 'Flea Markets', 'Farmers Markets', 'Swap Meets', 'Car Meets', 'Festivals', 'Conventions', 'Fashion', 'Fragrance Collecting', 'Cinema Appreciation', 'Road Trips'],
      fitTags: ['exploration_adventure', 'flexible_drop_in', 'screen_free', 'small_group', 'community_social', 'creative_expression', 'beginner_friendly', 'moderate_cost'],
      conflictTags: ['steady_routine'],
      fitReasonsTemplate: {
        exploration_adventure: 'Discovery and novelty seem like they would bring you back to life.',
        flexible_drop_in: 'This works well when you want flexible outings instead of strict practice.',
        beginner_friendly: 'You can start with curiosity, not expertise.',
        small_group: 'It can be solo or shared with one or two people.'
      }
    },
    {
      familyKey: 'service_mentoring_family',
      name: 'Service, Mentoring, and Family Connection',
      category: 'Service and Family',
      description: 'Relationship-centered hobbies for people who feel better when they are helping, mentoring, caring, or investing in people close to them.',
      timeCommitment: '1-8 hours/week',
      startupCost: [0, 300],
      timeToEnjoyment: 'Immediate start to 1 month',
      energyType: 'balanced',
      socialLevel: 'small group or community',
      physicalDemand: 'low',
      lifestyle: 'people-centered, meaningful, and routine-friendly',
      detailed: {
        whoYouAre: 'You may not need a flashy hobby. You may need a meaningful role, a place to contribute, or intentional time with people who matter.',
        whatToDo: 'Choose one relationship lane: mentoring, volunteering, family ritual, tutoring, coaching, or community support. Make it recurring.'
      },
      exampleHobbies: ['Volunteering', 'Mentoring', 'Tutoring', 'Coaching Kids', 'Family Time', 'Pet Care'],
      backingHobbies: ['Community Service', 'Youth Groups', 'Church Groups', 'Parenting Activities', 'Dog Training', 'Hosting Gatherings', 'Book Clubs', 'Meetups', 'Discord Community Building', 'Moderation', 'Online Communities', 'Teaching Online', 'Photography Walks', 'Local Sports Leagues'],
      fitTags: ['service_connection', 'family_friendly', 'community_social', 'small_group', 'steady_routine', 'meaning_reflection', 'low_cost', 'low_physical', 'beginner_friendly'],
      conflictTags: ['solo_recharge'],
      fitReasonsTemplate: {
        service_connection: 'Helping or supporting others seemed meaningful in your answers.',
        family_friendly: 'This family can fit people with family or caregiving priorities.',
        meaning_reflection: 'It gives the hobby a reason beyond entertainment.',
        low_cost: 'Most of these start with time and care more than equipment.'
      }
    },
    {
      familyKey: 'low_energy_restorative',
      name: 'Low-Energy Restorative Hobbies',
      category: 'Rest and Recovery',
      description: 'Gentle hobbies for people who need recovery, low pressure, accessibility, and small sparks of enjoyment.',
      timeCommitment: '10 minutes-4 hours/week',
      startupCost: [0, 300],
      timeToEnjoyment: 'Immediate start',
      energyType: 'calming',
      socialLevel: 'solo or flexible',
      physicalDemand: 'very low-low',
      lifestyle: 'gentle, accessible, and flexible',
      detailed: {
        whoYouAre: 'You may not need a bigger life project right now. You may need something kind, doable, and easy to return to.',
        whatToDo: 'Pick two tiny options: one for five minutes, one for an hour. Let consistency be softer than discipline at first.'
      },
      exampleHobbies: ['Reading', 'Puzzles', 'Journaling', 'Meditation', 'Tea Tasting', 'Stargazing'],
      backingHobbies: ['Walking', 'Indoor Plants', 'Watching Documentaries', 'Cinema Appreciation', 'Sketching', 'Coloring', 'Origami', 'Birdwatching', 'Listening to Music', 'Scrapbooking', 'Habit Tracking', 'Prayer', 'Stretching', 'Photography', 'Collecting'],
      fitTags: ['low_cost', 'low_time', 'flexible_drop_in', 'solo_recharge', 'low_energy', 'calming', 'low_physical', 'indoor_friendly', 'home_based', 'beginner_friendly'],
      conflictTags: ['high_physical', 'performance_sharing', 'competition_play'],
      fitReasonsTemplate: {
        low_energy: 'You seemed to need something gentle enough for tired days.',
        low_time: 'This can fit in tiny pockets of time.',
        calming: 'The goal here is restoration, not pressure.',
        beginner_friendly: 'You can start immediately and keep the bar low.'
      }
    }
  ];

  const hobbyFamilies = {};
  for (const family of familyList) {
    hobbyFamilies[family.familyKey] = buildFamily(family);
  }

  window.hobbyFamilies = hobbyFamilies;
})();
