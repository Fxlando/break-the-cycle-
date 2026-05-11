(function() {
  function normalizeRoleName(value) {
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  const catalogRoleNames = Object.values(window.careerPaths || {})
    .map((path) => path && path.name)
    .filter(Boolean);

  const catalogRoleLookup = new Map(
    catalogRoleNames.map((name) => [normalizeRoleName(name), name])
  );

  function resolveRoleList(preferredRoles) {
    const resolved = [];
    const seen = new Set();

    for (const rawRole of preferredRoles || []) {
      const normalized = normalizeRoleName(rawRole);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      resolved.push(catalogRoleLookup.get(normalized) || rawRole);
    }

    return resolved;
  }

  function buildFamily(definition) {
    const exampleRoles = resolveRoleList(definition.exampleRoles).slice(0, 5);
    const backingRoles = resolveRoleList([
      ...exampleRoles,
      ...(definition.backingRoles || [])
    ]).slice(0, 15);

    return {
      familyKey: definition.familyKey,
      name: definition.name,
      category: definition.category,
      description: definition.description,
      incomeRange: definition.incomeRange,
      startupCost: definition.startupCost,
      timeToProfit: definition.timeToProfit,
      riskLevel: definition.riskLevel,
      lifestyle: definition.lifestyle,
      physicalDemand: definition.physicalDemand,
      educationRequired: definition.educationRequired,
      detailed: definition.detailed,
      exampleRoles,
      backingRoles,
      fitTags: definition.fitTags || [],
      conflictTags: definition.conflictTags || [],
      fitReasonsTemplate: definition.fitReasonsTemplate || {}
    };
  }

  const familyList = [
    {
      familyKey: 'steady_support_ops',
      name: 'Steady Support and Operations',
      category: 'Support and Operations',
      description: 'Reliable support, coordination, and office-based work that keeps teams moving and creates a steady floor.',
      incomeRange: [38000, 78000],
      startupCost: [0, 1500],
      timeToProfit: '1-4 months',
      riskLevel: 'low',
      lifestyle: 'structured, team-based, and predictable',
      physicalDemand: 'low',
      educationRequired: 'certificate or experience-based',
      detailed: {
        whoYouAre: 'You want practical work with clearer expectations, sustainable pace, and a dependable path into a team environment.',
        whatToDo: 'Target support, coordination, and office operations roles first. Tighten your resume around reliability, organization, customer communication, and follow-through.'
      },
      exampleRoles: [
        'Administrative Assistant',
        'Bookkeeper',
        'Office Manager',
        'Project Coordinator',
        'Customer Success Specialist'
      ],
      backingRoles: [
        'Billing Specialist',
        'Payroll Clerk',
        'Accounts Payable Clerk',
        'Accounts Receivable Clerk',
        'Administrative Coordinator',
        'Front Desk Coordinator',
        'Business Office Manager',
        'Client Onboarding Coordinator',
        'Scheduling Coordinator',
        'Operations Assistant'
      ],
      fitTags: [
        'fast_entry',
        'low_cost',
        'credential_light',
        'structured_schedule',
        'low_physical',
        'team_based',
        'high_stability',
        'desk_work',
        'caregiver_friendly'
      ],
      conflictTags: ['high_physical', 'field_work', 'high_upside'],
      fitReasonsTemplate: {
        high_stability: 'You asked for a steadier income floor and lower volatility.',
        structured_schedule: 'This family usually offers clearer hours and a more predictable routine.',
        low_physical: 'It fits lower-physical-demand workdays better than field-heavy paths.',
        credential_light: 'You can usually break in without a long academic runway.',
        caregiver_friendly: 'It can fit people who need more sustainable structure around life responsibilities.'
      }
    },
    {
      familyKey: 'people_care_service',
      name: 'People Care and Service',
      category: 'People Care and Service',
      description: 'Direct support work focused on helping, guiding, and caring for people in structured environments.',
      incomeRange: [35000, 85000],
      startupCost: [0, 3000],
      timeToProfit: '2-9 months',
      riskLevel: 'low',
      lifestyle: 'structured, people-centered, and mission-led',
      physicalDemand: 'low-medium',
      educationRequired: 'certificate or employer training',
      detailed: {
        whoYouAre: 'You are energized by helping people directly and want work that feels useful, grounded, and relational.',
        whatToDo: 'Look for care, education support, and service roles with short training paths. Emphasize patience, communication, reliability, and calm presence.'
      },
      exampleRoles: [
        'Medical Assistant',
        'Dental Assistant',
        'Childcare Worker',
        'Direct Support Professional',
        'Care Coordinator'
      ],
      backingRoles: [
        'Patient Service Representative',
        'Patient Coordinator',
        'Behavioral Health Technician',
        'Family Support Specialist',
        'Community Outreach Coordinator',
        'Tutor',
        'Youth Mentor',
        'Volunteer Coordinator',
        'Resident Services Coordinator',
        'Daycare Assistant'
      ],
      fitTags: [
        'fast_entry',
        'credential_light',
        'structured_schedule',
        'high_people',
        'service_mission',
        'team_based',
        'high_stability',
        'caregiver_friendly'
      ],
      conflictTags: ['low_people', 'independent_work', 'high_upside'],
      fitReasonsTemplate: {
        service_mission: 'You said impact and helping people matter in your next move.',
        high_people: 'This family fits people who want direct human contact built into the work.',
        credential_light: 'A lot of these roles have shorter training ramps than degree-heavy paths.',
        caregiver_friendly: 'Several of these roles can work for people balancing real-life responsibilities.'
      }
    },
    {
      familyKey: 'hands_on_trades',
      name: 'Hands-On Trades and Technical Field Work',
      category: 'Trades and Field Work',
      description: 'Practical, skill-based work where you build, fix, install, or maintain real things in the field.',
      incomeRange: [45000, 120000],
      startupCost: [500, 12000],
      timeToProfit: '3-12 months',
      riskLevel: 'low-medium',
      lifestyle: 'structured, field-based, and skill-driven',
      physicalDemand: 'high',
      educationRequired: 'trade school, apprenticeship, or certification',
      detailed: {
        whoYouAre: 'You prefer real-world, practical work over abstract desk-only work and want income attached to a concrete skill.',
        whatToDo: 'Research local trade programs, paid apprenticeships, and employers willing to train. Prioritize licenses, safety basics, and reliable transportation.'
      },
      exampleRoles: [
        'HVAC Technician',
        'Licensed Plumber',
        'Carpenter',
        'Welder',
        'Auto Mechanic/Technician'
      ],
      backingRoles: [
        'Licensed Electrician',
        'Maintenance Technician',
        'Mobile Mechanic',
        'Facilities Technician',
        'Pool Technician',
        'Pest Control Technician',
        'Restoration Technician',
        'Flooring Installer',
        'Pressure Washing Technician',
        'Window Installer'
      ],
      fitTags: [
        'fast_entry',
        'credential_light',
        'structured_schedule',
        'high_physical',
        'high_stability',
        'field_work',
        'team_based'
      ],
      conflictTags: ['low_physical', 'remote_possible', 'desk_work', 'caregiver_friendly'],
      fitReasonsTemplate: {
        high_physical: 'You are open to active, hands-on work instead of staying at a desk all day.',
        field_work: 'This family matches people who want to be out in the real world fixing or building things.',
        fast_entry: 'Many of these paths can start paying faster than long degree tracks.',
        high_stability: 'Trade skills can create a strong income floor once you are employable.'
      }
    },
    {
      familyKey: 'logistics_mobility',
      name: 'Logistics and Mobility',
      category: 'Logistics and Mobility',
      description: 'Movement, delivery, routing, warehouse, and coordination work that keeps goods and schedules on track.',
      incomeRange: [38000, 90000],
      startupCost: [0, 4000],
      timeToProfit: '1-6 months',
      riskLevel: 'low',
      lifestyle: 'structured, route-based, and task-focused',
      physicalDemand: 'medium',
      educationRequired: 'on-the-job training or license',
      detailed: {
        whoYouAre: 'You like movement, clarity, and visible output, and you do well when the workday has a practical rhythm.',
        whatToDo: 'Target employers with clear shift structures and fast onboarding. Highlight reliability, pace, attention to detail, and comfort with process.'
      },
      exampleRoles: [
        'Commercial Truck Driver',
        'Delivery Driver',
        'Dispatcher',
        'Warehouse Supervisor',
        'Fleet Coordinator'
      ],
      backingRoles: [
        'Warehouse Lead',
        'Warehouse Associate',
        'Route Coordinator',
        'Shipping Clerk',
        'Receiving Clerk',
        'Inventory Clerk',
        'Order Pickup Associate',
        'Logistics Clerk',
        'Transportation Clerk',
        'Shuttle Driver'
      ],
      fitTags: [
        'fast_entry',
        'low_cost',
        'credential_light',
        'structured_schedule',
        'field_work',
        'team_based',
        'high_stability'
      ],
      conflictTags: ['remote_possible', 'high_upside'],
      fitReasonsTemplate: {
        fast_entry: 'You can often enter these roles quickly and start earning sooner.',
        structured_schedule: 'This family tends to come with clear shifts, routes, and expectations.',
        field_work: 'It fits people who prefer movement and real-world coordination over purely desk-based work.',
        high_stability: 'The work is practical, needed, and often easier to understand day to day.'
      }
    },
    {
      familyKey: 'sales_relationships',
      name: 'Sales and Relationship Growth',
      category: 'Sales and Relationship Growth',
      description: 'People-facing work where communication, trust, persuasion, and follow-through drive income growth.',
      incomeRange: [45000, 180000],
      startupCost: [0, 2500],
      timeToProfit: '1-4 months',
      riskLevel: 'medium',
      lifestyle: 'people-heavy, performance-driven, and flexible',
      physicalDemand: 'low',
      educationRequired: 'experience-based or employer training',
      detailed: {
        whoYouAre: 'You can handle conversations, momentum, and a little pressure if the upside is there and the work stays human.',
        whatToDo: 'Look for sales organizations with onboarding, coaching, and realistic entry points. Practice outreach, discovery calls, and objection handling.'
      },
      exampleRoles: [
        'Sales Representative (B2B)',
        'Account Executive',
        'Account Manager',
        'Insurance Agent',
        'Relationship Banker'
      ],
      backingRoles: [
        'Inside Sales Representative',
        'Outside Sales Representative',
        'Real Estate Agent',
        'Territory Manager',
        'Wireless Sales Consultant',
        'Optical Sales Associate',
        'Home Warranty Sales Rep',
        'Sales Setter',
        'Phone Sales Associate',
        'Furniture Sales Consultant'
      ],
      fitTags: [
        'fast_entry',
        'low_cost',
        'flexible_schedule',
        'high_people',
        'sales_orientation',
        'high_upside',
        'team_based',
        'field_work'
      ],
      conflictTags: ['low_people', 'service_mission'],
      fitReasonsTemplate: {
        sales_orientation: 'You said you are open to persuasion, commission, or closing-based work.',
        high_upside: 'This family makes more sense when upside matters as much as stability.',
        high_people: 'It rewards people who do not mind staying in conversation with clients or prospects.',
        fast_entry: 'You can often start sooner here than in heavily credentialed fields.'
      }
    },
    {
      familyKey: 'digital_builders',
      name: 'Digital Builders and Technical Problem Solvers',
      category: 'Digital and Technical',
      description: 'Tech, systems, and digital product work for people who like solving problems, building things, and learning tools deeply.',
      incomeRange: [55000, 165000],
      startupCost: [0, 5000],
      timeToProfit: '4-18 months',
      riskLevel: 'low-medium',
      lifestyle: 'project-based, desk-heavy, and often remote-capable',
      physicalDemand: 'very low',
      educationRequired: 'portfolio, certificate, or degree',
      detailed: {
        whoYouAre: 'You are comfortable with digital systems, patient learning curves, and work that rewards deep skill over surface energy.',
        whatToDo: 'Choose one lane, build a starter portfolio, and practice consistently. Focus on proof of skill, not just passive learning.'
      },
      exampleRoles: [
        'Software Developer/Engineer',
        'Web Developer',
        'Data Analyst',
        'Cloud Engineer',
        'UX/UI Designer'
      ],
      backingRoles: [
        'Frontend Developer',
        'Backend Developer',
        'Full-stack Developer',
        'Mobile App Developer',
        'IT Support Specialist',
        'IT Support Analyst',
        'Business Analyst',
        'Cybersecurity Analyst',
        'Product Manager',
        'QA Tester'
      ],
      fitTags: [
        'low_cost',
        'credential_heavy',
        'flexible_schedule',
        'remote_possible',
        'low_physical',
        'technical_depth',
        'independent_work',
        'high_upside',
        'desk_work',
        'low_people'
      ],
      conflictTags: ['high_physical', 'field_work'],
      fitReasonsTemplate: {
        technical_depth: 'You sounded comfortable with systems, tools, and deeper problem-solving work.',
        remote_possible: 'This family can line up well if location flexibility matters to you.',
        desk_work: 'It fits people who are okay spending focused time at a screen or workstation.',
        credential_heavy: 'You showed enough patience for a longer skill-building runway if the fit is strong.'
      }
    },
    {
      familyKey: 'creative_content_brand',
      name: 'Creative, Content, and Brand Work',
      category: 'Creative and Brand',
      description: 'Creative digital work that turns taste, storytelling, design, or audience understanding into income.',
      incomeRange: [35000, 130000],
      startupCost: [0, 7000],
      timeToProfit: '2-12 months',
      riskLevel: 'medium',
      lifestyle: 'flexible, portfolio-driven, and often self-directed',
      physicalDemand: 'very low',
      educationRequired: 'portfolio or experience-based',
      detailed: {
        whoYouAre: 'You want expressive work with room for originality, and you are willing to build a body of work over time.',
        whatToDo: 'Pick one output format first, publish consistently, and collect proof of skill. Use small client work or freelance projects to build traction.'
      },
      exampleRoles: [
        'Graphic Designer',
        'Video Editor',
        'Copywriter',
        'Social Media Manager',
        'YouTube Content Creator'
      ],
      backingRoles: [
        'Videographer',
        'Web Designer (No-Code)',
        'Thumbnail Designer',
        'Marketing Coordinator',
        'Social Media Coordinator',
        'Youtube Assistant',
        'Podcast Assistant',
        'Brand Outreach Assistant',
        'Public Relations Coordinator',
        'UGC Creator'
      ],
      fitTags: [
        'fast_entry',
        'flexible_schedule',
        'remote_possible',
        'low_physical',
        'creative_expression',
        'independent_work',
        'high_upside',
        'desk_work'
      ],
      conflictTags: ['high_physical', 'structured_schedule'],
      fitReasonsTemplate: {
        creative_expression: 'You left room for creative output instead of wanting purely procedural work.',
        flexible_schedule: 'This family fits better when you want more control over how the workday feels.',
        remote_possible: 'A lot of these roles can be built or delivered from a digital workspace.',
        high_upside: 'There is more upside here for people willing to build skill, portfolio, and reputation over time.'
      }
    },
    {
      familyKey: 'business_ops_leadership',
      name: 'Business Operations and Leadership',
      category: 'Operations and Leadership',
      description: 'Work centered on ownership, coordination, accountability, and moving teams or systems toward outcomes.',
      incomeRange: [55000, 140000],
      startupCost: [0, 5000],
      timeToProfit: '6-18 months',
      riskLevel: 'medium',
      lifestyle: 'structured, responsibility-heavy, and growth-minded',
      physicalDemand: 'low-medium',
      educationRequired: 'experience-based or degree',
      detailed: {
        whoYouAre: 'You are thinking beyond just doing tasks. You want responsibility, decision-making, and room to grow into leadership.',
        whatToDo: 'Build proof that you can own processes, improve systems, and keep people aligned. Project delivery and communication matter here.'
      },
      exampleRoles: [
        'General And Operations Manager',
        'Property Manager',
        'Branch Manager',
        'Product Manager',
        'Construction Manager/PM'
      ],
      backingRoles: [
        'Office Manager',
        'Store Manager',
        'District Manager',
        'Regional Sales Manager',
        'Parts Manager',
        'Maintenance Manager',
        'Community Manager',
        'Apartment Manager',
        'Category Manager',
        'Dispatch Supervisor'
      ],
      fitTags: [
        'structured_schedule',
        'high_people',
        'team_based',
        'high_stability',
        'high_upside',
        'desk_work'
      ],
      conflictTags: ['low_people', 'independent_work'],
      fitReasonsTemplate: {
        team_based: 'You did not sound like you want to work in a vacuum with zero coordination.',
        high_upside: 'This family gives more room to grow into bigger responsibility and earnings.',
        high_stability: 'It can still offer more structure than purely entrepreneurial paths.',
        high_people: 'Leadership and operations work usually rewards communication and accountability with people.'
      }
    },
    {
      familyKey: 'independent_service_business',
      name: 'Independent Service Business',
      category: 'Independent Business',
      description: 'Owner-led service paths for people who want autonomy, practical demand, and the chance to build something that is theirs.',
      incomeRange: [50000, 200000],
      startupCost: [1500, 25000],
      timeToProfit: '3-18 months',
      riskLevel: 'high',
      lifestyle: 'owner-led, flexible, and self-managed',
      physicalDemand: 'medium',
      educationRequired: 'experience-based',
      detailed: {
        whoYouAre: 'You want more control over your direction and are willing to own the messier parts if the payoff and freedom are there.',
        whatToDo: 'Pick a simple service with local demand, learn pricing, and start with one offer. Keep the first version operationally easy.'
      },
      exampleRoles: [
        'Cleaning Business Owner',
        'Landscaping Business Owner',
        'Bookkeeping Business Owner',
        'Pressure Washing Business Owner',
        'Tax Prep Business Owner'
      ],
      backingRoles: [
        'Small Business Owner',
        'Moving Company Owner',
        'Junk Removal Business Owner',
        'Pool Service Business Owner',
        'Painting Business Owner',
        'Courier Company Owner',
        'Digital Marketing Agency Owner',
        'Virtual Assistant Business Owner',
        'Customer Support Agency Owner',
        'Pest Control Business Owner'
      ],
      fitTags: [
        'fast_entry',
        'flexible_schedule',
        'high_people',
        'independent_work',
        'high_upside',
        'caregiver_friendly',
        'field_work'
      ],
      conflictTags: ['high_stability', 'credential_heavy'],
      fitReasonsTemplate: {
        independent_work: 'You asked for more control and ownership over how the work is done.',
        high_upside: 'This family makes more sense when you care about building beyond a fixed ceiling.',
        flexible_schedule: 'It can support more control over time once the operation is set up.',
        fast_entry: 'A lot of these businesses can start small without a multi-year entry path.'
      }
    },
    {
      familyKey: 'remote_flexible_services',
      name: 'Remote and Flexible Services',
      category: 'Remote and Flexible Services',
      description: 'Service and support work that can often be done from a laptop with lower physical strain and more location flexibility.',
      incomeRange: [40000, 95000],
      startupCost: [0, 2500],
      timeToProfit: '1-6 months',
      riskLevel: 'low-medium',
      lifestyle: 'remote-capable, flexible, and digitally organized',
      physicalDemand: 'very low',
      educationRequired: 'experience-based or short training',
      detailed: {
        whoYouAre: 'You want sustainable work that can fit around real life, with lower physical demand and clearer digital workflows.',
        whatToDo: 'Aim for support, implementation, bookkeeping, or remote coordination roles. Build confidence with communication, systems, and dependable follow-through.'
      },
      exampleRoles: [
        'Virtual Assistant',
        'Customer Success Specialist',
        'IT Support Specialist',
        'Bookkeeping Assistant',
        'Implementation Specialist'
      ],
      backingRoles: [
        'Project Coordinator',
        'Client Services Coordinator',
        'Member Support Specialist',
        'Live Chat Support Rep',
        'IT Support Analyst',
        'Customer Support Representative',
        'Subscription Support Rep',
        'Seller Support Rep',
        'Operations Assistant',
        'Client Onboarding Coordinator'
      ],
      fitTags: [
        'fast_entry',
        'low_cost',
        'credential_light',
        'flexible_schedule',
        'remote_possible',
        'low_physical',
        'team_based',
        'high_stability',
        'caregiver_friendly',
        'desk_work'
      ],
      conflictTags: ['high_physical', 'field_work'],
      fitReasonsTemplate: {
        remote_possible: 'Location flexibility showed up as an important constraint for you.',
        caregiver_friendly: 'This family can be easier to shape around family, recovery, or schedule constraints.',
        low_physical: 'It fits better if you need a lower-strain workday.',
        fast_entry: 'A lot of these roles are reachable without a long academic runway.'
      }
    },
    {
      familyKey: 'health_fitness_wellness',
      name: 'Health, Fitness, and Wellness',
      category: 'Health and Wellness',
      description: 'Supportive, active, and health-oriented work for people who want to guide well-being, routine, or recovery.',
      incomeRange: [40000, 100000],
      startupCost: [0, 6000],
      timeToProfit: '2-12 months',
      riskLevel: 'low-medium',
      lifestyle: 'people-centered, active, and coaching-driven',
      physicalDemand: 'medium',
      educationRequired: 'certificate or specialized training',
      detailed: {
        whoYouAre: 'You want work that feels helpful and energizing, and you do not mind being visible, supportive, or physically engaged.',
        whatToDo: 'Look at certifications, employer-sponsored training, and assistant roles that let you build credibility while learning the field.'
      },
      exampleRoles: [
        'Fitness Coach/Personal Trainer',
        'Online Fitness Coach',
        'Wellness Coordinator',
        'Chiropractic Assistant',
        'Occupational Health Coordinator'
      ],
      backingRoles: [
        'Optometric Assistant',
        'Fitness Manager',
        'Gym Manager',
        'Recreation Coordinator',
        'Rehabilitation Aide',
        'Therapy Aide',
        'Medical Assistant',
        'Patient Coordinator',
        'Dental Treatment Coordinator',
        'Registered Nurse (RN)'
      ],
      fitTags: [
        'credential_light',
        'flexible_schedule',
        'high_people',
        'service_mission',
        'high_physical',
        'team_based',
        'caregiver_friendly'
      ],
      conflictTags: ['low_people'],
      fitReasonsTemplate: {
        service_mission: 'You wanted work that feels useful, supportive, or health-centered.',
        high_people: 'This family fits better if you are okay staying present with people most of the day.',
        high_physical: 'It makes more sense when some movement or physical engagement feels okay to you.',
        flexible_schedule: 'Several of these paths can offer nontraditional or more flexible schedules over time.'
      }
    },
    {
      familyKey: 'mission_safety_public',
      name: 'Mission, Safety, and Public Service',
      category: 'Mission and Public Service',
      description: 'Protective, civic, or mission-led work for people who care about service, responsibility, and steady structure.',
      incomeRange: [42000, 98000],
      startupCost: [0, 5000],
      timeToProfit: '1-12 months',
      riskLevel: 'low-medium',
      lifestyle: 'structured, team-based, and mission-driven',
      physicalDemand: 'medium-high',
      educationRequired: 'employer training, certificate, or academy',
      detailed: {
        whoYouAre: 'You want work that feels meaningful, grounded, and bigger than personal preference alone, even if it comes with rules and responsibility.',
        whatToDo: 'Look for public-facing service roles with clear hiring pipelines. Highlight composure, responsibility, teamwork, and commitment.'
      },
      exampleRoles: [
        'Firefighter/Paramedic',
        'Security Officer',
        'Caseworker',
        'Housing Specialist',
        'Animal Control Officer'
      ],
      backingRoles: [
        'Security Guard',
        'Armed Guard',
        'Patrol Officer',
        'Nonprofit Program Coordinator',
        'Volunteer Coordinator',
        'Resident Services Coordinator',
        'Family Advocate',
        'Shelter Advocate',
        'Military Career',
        'Crossing Guard'
      ],
      fitTags: [
        'credential_light',
        'structured_schedule',
        'high_people',
        'high_physical',
        'service_mission',
        'team_based',
        'high_stability',
        'field_work'
      ],
      conflictTags: ['low_people', 'remote_possible'],
      fitReasonsTemplate: {
        service_mission: 'You clearly left room for service, responsibility, and real-world impact in your next move.',
        structured_schedule: 'This family tends to work best for people who can handle clearer rules and expectations.',
        high_stability: 'It can offer a stronger floor than riskier or more self-directed paths.',
        field_work: 'It fits people who are open to being out in the world instead of staying purely desk-bound.'
      }
    },
    {
      familyKey: 'education_coaching_training',
      name: 'Education, Coaching, and Training',
      category: 'Education and Training',
      description: 'Teaching, coaching, tutoring, and training work for people who like helping others grow and explaining things clearly.',
      incomeRange: [38000, 95000],
      startupCost: [0, 6000],
      timeToProfit: '2-18 months',
      riskLevel: 'low-medium',
      lifestyle: 'structured, people-centered, and growth-focused',
      physicalDemand: 'low-medium',
      educationRequired: 'certificate, degree, or experience-based depending on setting',
      detailed: {
        whoYouAre: 'You are patient enough to help people learn, practice, and improve. You want work where communication and encouragement matter.',
        whatToDo: 'Start by choosing your learner group: kids, adults, employees, athletes, or online students. Build proof through tutoring, coaching, training materials, or assistant roles.'
      },
      exampleRoles: [
        'School Teacher',
        'Tutor',
        'Corporate Trainer',
        'Instructional Designer',
        'Youth Mentor'
      ],
      backingRoles: [
        'Teacher Assistant',
        'Special Education Aide',
        'Online Tutor',
        'Test Prep Tutor',
        'Career Coach',
        'Life Coach',
        'Academic Advisor',
        'Learning and Development Coordinator',
        'Training Specialist',
        'Workshop Facilitator',
        'Coach Kids',
        'Recreation Coordinator'
      ],
      fitTags: [
        'credential_light',
        'credential_heavy',
        'structured_schedule',
        'flexible_schedule',
        'high_people',
        'service_mission',
        'team_based',
        'high_stability',
        'caregiver_friendly',
        'desk_work'
      ],
      conflictTags: ['low_people', 'high_physical', 'sales_orientation'],
      fitReasonsTemplate: {
        service_mission: 'You left room for work that helps people grow, learn, or gain confidence.',
        high_people: 'This family fits people who are comfortable guiding others directly.',
        structured_schedule: 'Education and training roles often provide a clearer weekly rhythm.',
        caregiver_friendly: 'Some tutoring, coaching, and training paths can flex around real-life responsibilities.'
      }
    },
    {
      familyKey: 'finance_legal_compliance',
      name: 'Finance, Legal, and Compliance',
      category: 'Finance and Compliance',
      description: 'Detail-oriented money, records, rules, and risk work for people who like accuracy, structure, and trusted processes.',
      incomeRange: [45000, 130000],
      startupCost: [0, 8000],
      timeToProfit: '3-24 months',
      riskLevel: 'low-medium',
      lifestyle: 'structured, desk-based, and detail-heavy',
      physicalDemand: 'very low',
      educationRequired: 'certificate, degree, license, or experience-based',
      detailed: {
        whoYouAre: 'You can handle details, rules, documents, and responsibility. You may prefer a quieter professional lane with clearer expectations.',
        whatToDo: 'Start with bookkeeping, banking, claims, compliance, or legal support roles. Build Excel, documentation, accuracy, and confidentiality into your resume.'
      },
      exampleRoles: [
        'Bookkeeper',
        'Accountant (CPA)',
        'Financial Advisor',
        'Paralegal',
        'Compliance Analyst'
      ],
      backingRoles: [
        'Payroll Clerk',
        'Billing Specialist',
        'Accounts Payable Clerk',
        'Accounts Receivable Clerk',
        'Tax Prep Specialist',
        'Loan Processor',
        'Insurance Claims Adjuster',
        'Bank Teller',
        'Relationship Banker',
        'Legal Assistant',
        'Risk Analyst',
        'Audit Associate',
        'Financial Analyst'
      ],
      fitTags: [
        'credential_light',
        'credential_heavy',
        'structured_schedule',
        'remote_possible',
        'low_people',
        'low_physical',
        'technical_depth',
        'high_stability',
        'desk_work'
      ],
      conflictTags: ['high_physical', 'field_work', 'creative_expression'],
      fitReasonsTemplate: {
        high_stability: 'You leaned toward a steadier professional lane with a clearer income floor.',
        low_people: 'This family can fit people who prefer focused work over constant social interaction.',
        desk_work: 'It lines up with lower-physical, desk-based work.',
        technical_depth: 'You sounded open to details, systems, records, or rule-based problem solving.'
      }
    },
    {
      familyKey: 'hospitality_food_events',
      name: 'Hospitality, Food, Events, and Guest Experience',
      category: 'Hospitality and Events',
      description: 'Service, food, events, and guest-facing work for people who like pace, people, hosting, and memorable experiences.',
      incomeRange: [35000, 120000],
      startupCost: [0, 15000],
      timeToProfit: '1-12 months',
      riskLevel: 'medium',
      lifestyle: 'people-facing, fast-moving, and schedule-varied',
      physicalDemand: 'medium-high',
      educationRequired: 'experience-based, certification, or hospitality training',
      detailed: {
        whoYouAre: 'You can handle movement, people, timing, and pressure when the work feels alive. You may like making an experience run well.',
        whatToDo: 'Start with coordinator, guest service, restaurant, catering, or venue roles. Build proof around reliability, calm under pressure, service, and vendor coordination.'
      },
      exampleRoles: [
        'Event Planner',
        'Restaurant Owner',
        'Food Truck Owner',
        'Hotel Manager',
        'Catering Coordinator'
      ],
      backingRoles: [
        'Restaurant Manager',
        'Banquet Coordinator',
        'Wedding Planner',
        'Venue Coordinator',
        'Guest Services Manager',
        'Front Desk Supervisor',
        'Travel Agent',
        'Tour Guide',
        'Bar Manager',
        'Catering Manager',
        'Conference Coordinator',
        'Customer Experience Manager'
      ],
      fitTags: [
        'fast_entry',
        'credential_light',
        'flexible_schedule',
        'high_people',
        'sales_orientation',
        'service_mission',
        'team_based',
        'high_physical',
        'field_work',
        'high_upside'
      ],
      conflictTags: ['low_people', 'remote_possible', 'structured_schedule'],
      fitReasonsTemplate: {
        high_people: 'You sounded open to work with regular human energy and interaction.',
        flexible_schedule: 'This family fits people who can handle nontraditional or varied schedules.',
        service_mission: 'Hospitality and events reward people who care about helping guests feel taken care of.',
        high_upside: 'There is room to grow into management, ownership, premium events, or specialized service niches.'
      }
    },
    {
      familyKey: 'science_research_specialized_tech',
      name: 'Science, Research, and Specialized Technical Work',
      category: 'Science and Specialized Technical',
      description: 'Lab, research, environmental, engineering, and specialized technical roles for people who like evidence, precision, and deeper systems.',
      incomeRange: [48000, 135000],
      startupCost: [0, 12000],
      timeToProfit: '6-30 months',
      riskLevel: 'low-medium',
      lifestyle: 'structured, technical, and focused',
      physicalDemand: 'low-medium',
      educationRequired: 'certificate, associate degree, bachelor degree, or specialized training',
      detailed: {
        whoYouAre: 'You are drawn to careful work, technical tools, research, data, systems, or real-world problem solving that needs precision.',
        whatToDo: 'Look at lab assistant, environmental tech, engineering tech, QA, and research coordinator roles. Build proof through coursework, certifications, lab skills, and documentation.'
      },
      exampleRoles: [
        'Lab Technician',
        'Research Assistant',
        'Environmental Technician',
        'Engineering Technician',
        'Quality Assurance Technician'
      ],
      backingRoles: [
        'Clinical Lab Assistant',
        'Medical Laboratory Technician',
        'Field Sampling Technician',
        'Water Quality Technician',
        'Manufacturing QA Technician',
        'Biotech Manufacturing Associate',
        'CAD Technician',
        'GIS Technician',
        'Survey Technician',
        'Process Technician',
        'Research Coordinator',
        'Data Analyst',
        'Cybersecurity Analyst'
      ],
      fitTags: [
        'credential_heavy',
        'structured_schedule',
        'low_people',
        'low_physical',
        'technical_depth',
        'team_based',
        'high_stability',
        'field_work',
        'desk_work'
      ],
      conflictTags: ['sales_orientation', 'high_people', 'creative_expression'],
      fitReasonsTemplate: {
        technical_depth: 'You sounded open to deeper systems, tools, data, or precision work.',
        high_stability: 'This family can offer a steadier technical lane once your skills are in place.',
        credential_heavy: 'You left room for a longer training runway if the path is worthwhile.',
        low_people: 'Many roles here involve focused work more than constant client-facing interaction.'
      }
    }
  ];

  const careerFamilies = {};
  for (const family of familyList) {
    careerFamilies[family.familyKey] = buildFamily(family);
  }

  window.careerFamilies = careerFamilies;
})();
