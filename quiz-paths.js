// ADVANCED CAREER PATH RECOMMENDATION SYSTEM
// Analyzes 20+ dimensions to recommend perfect life paths

const lifePaths = {
  // CONTENT CREATION PATHS
  youtuber: {
    name: "YouTube Content Creator",
    emoji: "🎥",
    category: "Content Creation",
    personalityFit: ["creative", "confident", "consistent", "patient"],
    skillsRequired: ["video editing", "storytelling", "marketing", "on-camera presence"],
    incomeRange: [0, 500000], // per month range
    startupCost: [500, 5000],
    timeToProfit: "6-18 months",
    lifestyle: "flexible",
    riskLevel: "high",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Build an audience by creating video content on topics you're passionate about. Monetize through ads, sponsorships, and products.",
    detailed: {
      whoYouAre: "You love creating, teaching, or entertaining. You're comfortable on camera and have something unique to share. You understand that building an audience takes time but compounds over years.",
      whatToDo: "Pick a profitable niche (tech reviews, finance, fitness, education, commentary). Study top creators. Post 2-3x/week consistently. Master thumbnails and titles (80% of your success). Learn editing. Engage your audience. Collaborate. Diversify income (merch, courses, sponsors).",
      firstYear: "Months 1-3: Learn basics, post weekly, get comfortable on camera. Months 4-6: Increase to 2-3x/week, improve quality. Months 7-12: Hit monetization (1k subs, 4k watch hours), land first sponsor.",
      income: "Month 1-6: $0. Month 7-12: $100-500. Year 2: $500-3k/month. Year 3: $3-10k/month. Year 5+: $10k-100k+/month (if successful)",
      dailyLife: "Wake up → brainstorm ideas → film content → edit → upload → engage comments → research trending topics → repeat. 4-8 hours/day.",
      prosAndCons: "PROS: Unlimited income ceiling, work from anywhere, creative freedom, build lasting asset. CONS: Slow start, algorithm dependent, burnout risk, inconsistent income early on.",
      bestNiches: ["Personal finance/investing", "Tech reviews", "Educational (coding, business, skills)", "Fitness/health", "Gaming", "Commentary/drama", "How-to tutorials", "Vlogging (if unique angle)"],
      skillsToLearn: ["Adobe Premiere/DaVinci Resolve editing", "Thumbnail design (Canva/Photoshop)", "YouTube SEO", "Storytelling structure", "Speaking on camera", "Analytics interpretation"],
      tools: ["Camera (phone works initially)", "$50-100 microphone", "Lighting", "Editing software", "TubeBuddy/VidIQ for SEO"],
      successFactors: ["Consistency (post schedule)", "Unique angle/personality", "Understanding your audience", "Strong thumbnails/titles", "Patience (takes time)"]
    }
  },

  twitchStreamer: {
    name: "Twitch/Kick Streamer",
    emoji: "🎮", 
    category: "Content Creation",
    personalityFit: ["entertaining", "social", "quick-witted", "consistent"],
    skillsRequired: ["entertainment", "real-time engagement", "community building"],
    incomeRange: [0, 200000],
    startupCost: [300, 3000],
    timeToProfit: "3-12 months",
    lifestyle: "flexible",
    riskLevel: "high",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Stream live content (gaming, chatting, creative) and build a loyal community that supports you through subs, donations, and ads.",
    detailed: {
      whoYouAre: "You're naturally entertaining and thrive in live interaction. You don't need a script. You can talk for hours and make it interesting. You're willing to stream to 0 viewers for months to build.",
      whatToDo: "Choose platform (Twitch/Kick/YouTube). Stream 5+ days/week, 3-4 hours minimum. Same schedule always. Engage EVERY chatter. Network with other streamers your size. Clip highlights for TikTok/YouTube. Join communities. Build brand.",
      firstYear: "Months 1-3: Stream consistently, network, 0-10 avg viewers. Months 4-6: 10-30 viewers, affiliate status. Months 7-12: 30-100 viewers, first sponsorships.",
      income: "Month 1-3: $0-50. Month 4-6: $100-300. Month 7-12: $300-1k. Year 2: $1-5k/month. Year 3+: $5-50k/month.",
      dailyLife: "Check Discord/socials → prep stream → go live 3-4 hours → export clips → post to socials → engage in other streams → sleep → repeat.",
      prosAndCons: "PROS: Direct community connection, instant feedback, diverse income (subs/donos/ads/sponsors). CONS: Requires consistent schedule, can't take days off easily, algorithm-dependent, burnout common.",
      bestNiches: ["Variety gaming (play multiple games)", "Single game main (Valorant, League, etc)", "Just Chatting", "IRL streams", "Art/music streams", "Fitness streams", "Cooking streams"],
      skillsToLearn: ["OBS Studio setup", "Stream overlays/alerts", "Community moderation", "Social media marketing", "Networking", "Entertainment/improv"],
      tools: ["OBS Studio (free)", "Good microphone ($80-200)", "Webcam", "Stream deck (optional)", "Dual monitors", "Good internet (upload speed)"],
      successFactors: ["Consistency (same schedule)", "Entertainment value", "Networking with other streamers", "Clipping for socials", "Community engagement"]
    }
  },

  podcaster: {
    name: "Podcast Host",
    emoji: "🎙️",
    category: "Content Creation", 
    personalityFit: ["conversational", "curious", "consistent", "authentic"],
    skillsRequired: ["interviewing", "storytelling", "audio editing"],
    incomeRange: [0, 100000],
    startupCost: [200, 2000],
    timeToProfit: "12-24 months",
    lifestyle: "flexible",
    riskLevel: "medium",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Create audio content on topics you're knowledgeable/passionate about. Build audience and monetize through sponsors, ads, and premium content.",
    detailed: {
      whoYouAre: "You love deep conversations. You're curious and can ask great questions. You have opinions and insights people want to hear. You're okay with slow growth - podcasting takes patience.",
      whatToDo: "Pick niche (business, true crime, comedy, education, interviews). Get decent mic. Record weekly minimum. Learn basic editing. Publish to all platforms (Spotify, Apple, YouTube). Promote on social media. Guest on other pods. Eventually monetize via sponsors.",
      firstYear: "Months 1-6: Record weekly, build catalog, promote, 50-500 downloads/episode. Months 7-12: 500-2k downloads, first sponsors, guest appearances.",
      income: "Month 1-12: $0-100. Year 2: $200-1k/month. Year 3: $1-5k/month. Year 5+: $5-30k/month.",
      dailyLife: "Research topics → prep questions → record episode (1-3 hours) → edit (2-4 hours) → publish → promote → engage audience → repeat weekly.",
      prosAndCons: "PROS: Low startup cost, no camera needed, can batch record, intimate audience connection. CONS: Slow growth, audio-only limits reach, requires consistency, hard to stand out.",
      bestNiches: ["Business/entrepreneurship interviews", "True crime", "Comedy/entertainment", "Self-improvement", "Industry-specific (marketing, tech, etc)", "News/politics commentary"],
      skillsToLearn: ["Audio recording/editing (Audacity/Adobe Audition)", "Interviewing techniques", "Story structure", "Marketing/promotion", "Sponsorship sales"],
      tools: ["Quality microphone ($100-300)", "Audio interface (optional)", "Editing software", "Hosting platform (Buzzsprout, Anchor)", "Promotion tools"],
      successFactors: ["Unique angle/niche", "Great guests (if interview format)", "Consistency", "Audio quality", "Strong titles/descriptions"]
    }
  },

  // COACHING & EDUCATION PATHS
  fitnessCoach: {
    name: "Fitness Coach/Personal Trainer",
    emoji: "💪",
    category: "Health & Fitness",
    personalityFit: ["motivational", "disciplined", "patient", "empathetic"],
    skillsRequired: ["fitness knowledge", "nutrition", "motivation", "sales"],
    incomeRange: [2000, 50000],
    startupCost: [500, 5000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible",
    riskLevel: "low-medium",
    educationRequired: "certification",
    physicalDemand: "medium-high",
    description: "Help people transform their bodies and lives. Coach in-person or online. Build physique-based business.",
    detailed: {
      whoYouAre: "You've transformed yourself physically and mentally. You understand discipline. You genuinely want to help others. You lead by example. Your body is your billboard.",
      whatToDo: "Get certified (NASM, ACE, ISSA). Build impressive physique. Start with 3 free transformation clients for testimonials. Document everything. Launch online coaching $200-500/month per client. Scale to 10-20 clients. Create group programs. Eventually add courses, app, gym.",
      firstYear: "Months 1-3: Get certified, transform 3 people free. Months 4-6: Launch paid program, get 5-10 clients. Months 7-12: Scale to 15-20 clients, launch group program.",
      income: "Month 1-3: $0. Month 4-6: $1-3k. Month 7-12: $3-8k. Year 2: $8-15k/month. Year 3+: $15-50k/month.",
      dailyLife: "Morning workout (lead by example) → client check-ins → create workout plans → film content → post to socials → client calls → meal prep → study.",
      prosAndCons: "PROS: Fulfilling, scalable online, you stay in great shape, decent income. CONS: Client-dependent, results determine reputation, need to stay fit always.",
      bestNiches: ["Weight loss for women", "Muscle building for men", "Athletes/sports performance", "Busy professionals", "Bodybuilding prep", "Seniors", "Postpartum"],
      skillsToLearn: ["Exercise programming", "Nutrition science", "Client psychology", "Sales/marketing", "Content creation", "App-based coaching"],
      tools: ["Certification", "Coaching app (Trainerize)", "Meal planning software", "Social media", "Payment processing", "Form check videos"],
      successFactors: ["Your own transformation", "Client results/testimonials", "Consistent content", "Niche specificity", "Community building"]
    }
  },

  lifeCoach: {
    name: "Life/Business Coach",
    emoji: "🎯",
    category: "Coaching",
    personalityFit: ["empathetic", "motivational", "organized", "confident"],
    skillsRequired: ["listening", "questioning", "goal-setting", "accountability"],
    incomeRange: [3000, 100000],
    startupCost: [500, 3000],
    timeToProfit: "3-9 months",
    lifestyle: "very flexible",
    riskLevel: "medium",
    educationRequired: "certification (optional)",
    physicalDemand: "low",
    description: "Help people achieve their goals, overcome obstacles, and design their ideal lives. Coach 1-on-1 or in groups.",
    detailed: {
      whoYouAre: "You've overcome significant challenges yourself. You're great at seeing potential in others. You ask powerful questions. You hold people accountable lovingly. You genuinely care about transformation.",
      whatToDo: "Get certified (ICF accredited program). Niche down (business coaching, relationship coaching, career coaching). Offer free discovery calls. Convert to $500-2k/month packages. Build client base of 5-15 clients. Create group programs. Scale with courses.",
      firstYear: "Months 1-3: Get certified, coach 3 people free/cheap. Months 4-6: Land 5-10 paying clients. Months 7-12: Scale to 10-15 clients, launch group program.",
      income: "Month 1-3: $0-1k. Month 4-6: $3-8k. Month 7-12: $8-20k. Year 2: $15-40k/month. Year 3+: $30-100k/month.",
      dailyLife: "Morning routine → client calls (4-8 per day) → admin work → content creation → learning/development → evening reflection.",
      prosAndCons: "PROS: Extremely fulfilling, flexible schedule, high income potential, location independent. CONS: Emotionally draining, client-dependent, requires certifications/credibility.",
      bestNiches: ["Business/executive coaching ($2-10k/month)", "Career transition coaching", "Relationship/dating coaching", "Health/wellness coaching", "Confidence/mindset coaching"],
      skillsToLearn: ["Coaching frameworks", "Active listening", "Powerful questioning", "Sales/enrollment", "Marketing", "Program design"],
      tools: ["Certification program", "Scheduling software (Calendly)", "Video conferencing (Zoom)", "CRM", "Payment processing", "Website"],
      successFactors: ["Strong results", "Clear niche", "Sales skills", "Authenticity", "Testimonials", "Network/referrals"]
    }
  },

  // Add 40+ more paths...
  // Let me continue with diverse categories

  softwareDeveloper: {
    name: "Software Developer/Engineer",
    emoji: "💻",
    category: "Technology",
    personalityFit: ["logical", "patient", "detail-oriented", "continuous learner"],
    skillsRequired: ["programming", "problem-solving", "debugging"],
    incomeRange: [4000, 30000],
    startupCost: [0, 2000],
    timeToProfit: "6-18 months",
    lifestyle: "flexible/remote-friendly",
    riskLevel: "low-medium",
    educationRequired: "self-taught or degree",
    physicalDemand: "low",
    description: "Build software, websites, apps. Work for companies or freelance. High demand, great pay, work from anywhere.",
    detailed: {
      whoYouAre: "You enjoy solving puzzles. You're okay sitting at a computer for hours. You like building things from nothing. You're patient with debugging. You enjoy continuous learning (tech changes constantly).",
      whatToDo: "Learn to code (Python, JavaScript, or both). Build 5-10 projects for portfolio. Get internship or junior job. OR freelance on Upwork. Specialize (web dev, mobile apps, AI, blockchain). Keep learning. Eventually: senior dev, team lead, or start your own company.",
      firstYear: "Months 1-6: Learn fundamentals, build projects. Months 7-9: Apply to 100+ jobs, do freelance gigs. Months 10-12: Land first job $50-70k/year or steady freelance clients.",
      income: "Learning phase: $0. Junior dev: $50-80k/year. Mid-level (2-5 years): $80-130k. Senior (5-10 years): $130-200k+. Staff/Principal: $200-500k+.",
      dailyLife: "Standup meeting → code 4-6 hours → lunch → more coding → debugging → code review → learning new tech → repeat.",
      prosAndCons: "PROS: High pay, remote work, job security, intellectual stimulation, constant learning. CONS: Sedentary, can be isolating, imposter syndrome common, ageism concerns, need continuous learning.",
      bestNiches: ["Web development (frontend/backend/full-stack)", "Mobile apps (iOS/Android)", "AI/Machine Learning", "Blockchain/Web3", "Game development", "DevOps/Cloud", "Cybersecurity"],
      skillsToLearn: ["Programming language (Python/JavaScript/etc)", "Git version control", "Databases (SQL/NoSQL)", "Frameworks (React, Node, Django, etc)", "Testing", "System design"],
      tools: ["Computer", "Code editor (VS Code)", "GitHub", "Online courses (freeCodeCamp, Udemy)", "Documentation", "Stack Overflow"],
      successFactors: ["Strong portfolio projects", "Continuous learning", "Networking (GitHub, Twitter)", "Specialization", "Soft skills (communication)", "Consistency"]
    }
  },

  // MILITARY & SERVICE
  military: {
    name: "Military Career",
    emoji: "🪖",
    category: "Military & Service",
    personalityFit: ["disciplined", "patriotic", "team-oriented", "resilient"],
    skillsRequired: ["physical fitness", "following orders", "leadership"],
    incomeRange: [2500, 15000],
    startupCost: [0, 0],
    timeToProfit: "immediate (after basic)",
    lifestyle: "structured",
    riskLevel: "medium-high",
    educationRequired: "high school diploma",
    physicalDemand: "high",
    description: "Serve your country. Gain skills, discipline, benefits. 20 years = pension. Use GI Bill for free college. Honorable path.",
    detailed: {
      whoYouAre: "You want structure, purpose, and to serve something bigger. You're disciplined or want to become disciplined. You value honor and patriotism. You're okay with sacrifice. You want free education and healthcare.",
      whatToDo: "Research all 6 branches (Army, Navy, Air Force, Marines, Coast Guard, Space Force). Take ASVAB practice tests. Choose MOS/job wisely (pick skills that transfer: IT, medical, engineering, languages). Stay fit. Talk to recruiters. Sign up. Crush basic training. Serve well. Use benefits.",
      firstYear: "Months 1-3: Basic training (hell but you make it). Months 4-12: Technical training for your job, first duty station, learn the ropes.",
      income: "E-1 (new): $1,800/month base + housing + food + healthcare (total value ~$3-4k). E-5 (5 years): $3,200/month + benefits (~$5-6k value). Officer: $4-10k/month.",
      dailyLife: "Wake up early (PT) → work your MOS → training → downtime → required tasks → sleep → repeat. Weekends usually off unless deployed.",
      prosAndCons: "PROS: Free housing/healthcare/food, GI Bill ($100k+ education), job training, structure, respect, pension after 20 years. CONS: Loss of freedom, deployment risk, difficult lifestyle for families, can be boring, bureaucracy.",
      bestNiches: ["IT/Cyber (transfers to civilian $100k+ jobs)", "Medical (nurse, medic)", "Aviation/mechanics", "Intelligence", "Special Forces (if elite)", "Engineering"],
      skillsToLearn: ["Leadership", "Technical skills (depends on MOS)", "Discipline", "Teamwork", "Physical fitness", "Stress management"],
      tools: ["Physical fitness", "ASVAB study guide", "Recruiter", "Military benefits", "GI Bill", "VA loan"],
      successFactors: ["Choose right MOS", "Stay out of trouble", "Network", "Use education benefits", "Plan civilian transition", "Save money"]
    }
  },

  // MODERN ONLINE MONEY-MAKING PATHS
  dropshipping: {
    name: "Dropshipping Business Owner",
    emoji: "📦",
    category: "E-commerce",
    personalityFit: ["entrepreneurial", "marketing-savvy", "adaptable", "risk-tolerant"],
    skillsRequired: ["marketing", "product research", "customer service", "ads"],
    incomeRange: [0, 100000],
    startupCost: [500, 5000],
    timeToProfit: "1-6 months",
    lifestyle: "very flexible",
    riskLevel: "high",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Sell products online without holding inventory. Find winning products, run ads, fulfill through suppliers. Scale to 6-7 figures.",
    detailed: {
      whoYouAre: "You're entrepreneurial and willing to test/fail fast. You understand marketing psychology. You can handle inconsistent income. You're okay with managing customer complaints. You move fast when you find winners.",
      whatToDo: "Find winning products (spy on competitors, use tools). Set up Shopify store. Import products from AliExpress/CJ Dropshipping. Create video ads. Run Facebook/TikTok ads. Test 10-20 products until you find winner. Scale winners with more ad spend. Eventually: branded store or private label.",
      firstYear: "Months 1-3: Test 10 products, lose money learning. Months 4-6: Find first winner, break even or small profit. Months 7-12: Scale winner to $5-20k/month revenue ($1-5k profit).",
      income: "Month 1-3: -$500 to -$2k (learning). Month 4-6: $0-2k profit. Month 7-12: $2-10k profit. Year 2+: $10-100k+/month (if you scale).",
      dailyLife: "Check ad performance → adjust campaigns → respond to customer service → find new products to test → create new ads → analyze data → scale winners.",
      prosAndCons: "PROS: Low startup cost, no inventory, scalable, location independent, unlimited income potential. CONS: Competitive, ad costs rising, customer service headaches, unstable (products die fast), refunds/chargebacks.",
      bestNiches: ["Beauty/skincare", "Pet products", "Fitness accessories", "Home/garden gadgets", "Phone accessories", "Jewelry", "Fashion accessories", "Hobby/interest products"],
      skillsToLearn: ["Facebook Ads Manager", "Product research (using tools)", "Copywriting for ads", "Video ad creation", "Shopify setup", "Customer service", "Data analysis"],
      tools: ["Shopify ($29/month)", "Product research tools (Sell The Trend, AutoDS)", "Suppliers (AliExpress, CJ, Spocket)", "Ad accounts (Facebook, TikTok)", "Video editing", "Customer service apps"],
      successFactors: ["Fast testing (fail quick)", "Strong ad creatives", "Good product margins (3x+)", "Excellent customer service", "Scaling mindset", "Ad spend management"]
    }
  },

  affiliateMarketing: {
    name: "Affiliate Marketer",
    emoji: "🔗",
    category: "Online Marketing",
    personalityFit: ["marketing-oriented", "content creator", "patient", "analytical"],
    skillsRequired: ["content creation", "SEO/traffic", "copywriting"],
    incomeRange: [0, 50000],
    startupCost: [100, 2000],
    timeToProfit: "3-12 months",
    lifestyle: "very flexible",
    riskLevel: "low-medium",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Promote other people's products and earn commissions. Build audience, recommend products, get paid when people buy through your links.",
    detailed: {
      whoYouAre: "You're good at recommending products. You can create content consistently. You understand how to build trust with an audience. You're patient (takes time to build). You like passive income once systems are built.",
      whatToDo: "Choose niche (tech, finance, fitness, etc). Build platform (blog, YouTube, TikTok, Instagram). Create valuable content. Join affiliate programs (Amazon Associates, ClickBank, individual programs). Add affiliate links naturally. Build email list. Scale traffic. Eventually: high-ticket affiliate products or create own products.",
      firstYear: "Months 1-3: Build content, 0 sales. Months 4-6: First commissions $50-500/month. Months 7-12: $500-3k/month if building consistently.",
      income: "Month 1-6: $0-100. Month 7-12: $200-2k. Year 2: $2-10k/month. Year 3+: $10-50k/month (if you build big audience).",
      dailyLife: "Create content (video/blog/social) → promote affiliate products → engage audience → build email list → send promotional emails → analyze what converts → repeat.",
      prosAndCons: "PROS: Low startup, passive income potential, no customer service, work anywhere, unlimited niches. CONS: Slow growth, algorithm dependent, commission cuts possible, competitive.",
      bestNiches: ["Make money online/business tools", "Finance/credit cards/investing", "Tech/software reviews", "Web hosting/domain names", "Fitness/supplements", "Online education courses"],
      skillsToLearn: ["SEO (if blogging)", "YouTube/TikTok growth", "Email marketing", "Copywriting", "Traffic generation", "Conversion optimization"],
      tools: ["Website/blog (WordPress)", "YouTube/TikTok account", "Email service (ConvertKit)", "Link management (Pretty Links)", "Analytics", "Affiliate networks"],
      successFactors: ["High-value niche", "Consistent content", "Building trust", "Email list growth", "Promoting quality products", "Diversifying income sources"]
    }
  },

  printOnDemand: {
    name: "Print on Demand Store Owner",
    emoji: "👕",
    category: "E-commerce",
    personalityFit: ["creative", "entrepreneurial", "design-oriented", "marketing-savvy"],
    skillsRequired: ["graphic design", "niche research", "marketing"],
    incomeRange: [0, 30000],
    startupCost: [100, 1000],
    timeToProfit: "1-6 months",
    lifestyle: "very flexible",
    riskLevel: "low-medium",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Create designs, upload to products (shirts, mugs, phone cases). No inventory. Print and ship when someone orders. Passive income potential.",
    detailed: {
      whoYouAre: "You're creative or can hire designers. You understand niche communities and what they'd wear/buy. You're okay with slow growth initially. You can create lots of designs and test fast.",
      whatToDo: "Choose niche (dogs, nurses, gamers, funny quotes, etc). Create designs or hire on Fiverr. Upload to Printify/Printful. List on Etsy or your Shopify store. Run ads or organic marketing. Test 50-100 designs. Scale winners. Repeat.",
      firstYear: "Months 1-3: Upload 50+ designs, first sales. Months 4-6: Find winning designs, $200-1k/month. Months 7-12: Scale to $1-5k/month.",
      income: "Month 1-3: $0-200. Month 4-6: $200-1k. Month 7-12: $1-5k. Year 2: $5-15k/month. Year 3+: $15-30k/month.",
      dailyLife: "Create/upload new designs → market on social media → run ads → check sales → reinvest in more designs → find trending niches → repeat.",
      prosAndCons: "PROS: No inventory, low risk, passive once designs uploaded, creative outlet, scalable. CONS: Competitive, low profit margins, copyright issues, hard to stand out.",
      bestNiches: ["Occupation-based (nurses, teachers, etc)", "Pet owners", "Hobbies (gaming, fishing, etc)", "Funny quotes/memes", "Political/causes", "Sports teams/fans"],
      skillsToLearn: ["Graphic design (Canva/Photoshop)", "Niche research", "Etsy SEO", "Facebook ads", "Trend spotting", "Copyright basics"],
      tools: ["Printify/Printful (POD suppliers)", "Etsy or Shopify store", "Design software (Canva, Photoshop)", "Mockup generators", "Research tools"],
      successFactors: ["Volume of designs", "Niche specificity", "Trendy designs", "Good mockup photos", "SEO or paid ads", "Fast testing"]
    }
  },

  tikTokShop: {
    name: "TikTok Shop Affiliate/Seller",
    emoji: "🛍️",
    category: "Social Commerce",
    personalityFit: ["social media savvy", "on-camera comfortable", "trend-aware", "sales-oriented"],
    skillsRequired: ["TikTok content", "product selection", "video creation"],
    incomeRange: [0, 50000],
    startupCost: [0, 500],
    timeToProfit: "1-3 months",
    lifestyle: "flexible",
    riskLevel: "low-medium",
    educationRequired: "none",
    physicalDemand: "low",
    description: "Sell products directly on TikTok or promote TikTok Shop products as affiliate. Create viral product videos. Get paid instantly.",
    detailed: {
      whoYouAre: "You understand TikTok. You can create engaging short videos. You're comfortable showing products on camera. You move fast with trends. You're okay filming content daily.",
      whatToDo: "Join TikTok Shop (seller or affiliate program). Find trending products. Create hook-based videos showing product benefits. Post 2-3x daily. Use trending sounds. Go viral. Drive sales. Scale by finding more winning products.",
      firstYear: "Months 1-2: Learn platform, test products, first sales. Months 3-6: Find viral products, $500-3k/month. Months 7-12: Scale to $3-15k/month.",
      income: "Month 1-2: $0-500. Month 3-6: $500-3k. Month 7-12: $3-15k. Year 2: $15-50k/month if you master it.",
      dailyLife: "Check trending products → order samples → film 5-10 product videos → post throughout day → respond to comments → check sales → reinvest in more products.",
      prosAndCons: "PROS: Low/no startup cost, instant payments, massive reach, easy to start, viral potential. CONS: Algorithm dependent, competitive, some products need inventory, constant content creation.",
      bestNiches: ["Beauty/skincare", "Gadgets/electronics", "Kitchen tools", "Cleaning products", "Fashion accessories", "Pet products", "Home organization"],
      skillsToLearn: ["TikTok algorithm understanding", "Hook-based content", "Product selection", "On-camera presenting", "Editing", "Trend awareness"],
      tools: ["TikTok Shop account", "Phone camera", "Ring light", "CapCut editing app", "Product samples", "Amazon/TikTok products"],
      successFactors: ["Consistent posting (2-3x daily)", "Strong hooks (first 3 seconds)", "Trending sounds", "Authentic presentation", "Fast trend adoption", "Product quality"]
    }
  },

  onlyFansCreator: {
    name: "OnlyFans / Fansly Creator",
    emoji: "💋",
    category: "Content Creation",
    personalityFit: ["confident", "entrepreneurial", "comfortable with sexuality", "marketing-savvy"],
    skillsRequired: ["content creation", "marketing", "engagement", "personal branding"],
    incomeRange: [0, 100000],
    startupCost: [200, 2000],
    timeToProfit: "0-3 months",
    lifestyle: "very flexible",
    riskLevel: "medium-high",
    educationRequired: "none",
    physicalDemand: "low-medium",
    description: "Create adult or exclusive content for paying subscribers. Build fanbase, engage with subscribers, monetize through subscriptions and tips.",
    detailed: {
      whoYouAre: "You're comfortable with your body and sexuality. You understand this is a business, not just posting photos. You're okay with potential stigma. You have thick skin for internet comments. You're willing to engage with fans daily.",
      whatToDo: "Choose content level (non-nude, lingerie, explicit). Set up profile. Promote on Twitter/Reddit/Instagram. Post daily (photos, videos). Engage with fans (messages, custom content). Offer PPV content. Build up recurring subscribers. Consider cam shows. Eventually: coaching other creators or pivot to mainstream.",
      firstYear: "Months 1-3: Build following, $500-3k/month. Months 4-6: $3-10k/month. Months 7-12: $10-30k/month (top creators: $50k-500k+).",
      income: "Month 1: $0-1k. Month 2-3: $1-5k. Month 4-12: $5-30k. Top 1%: $100k+/month. Most creators: $1-5k/month.",
      dailyLife: "Wake up → respond to messages → create content (photos/videos) → post to OnlyFans → promote on social media → engage with fans → create custom content → repeat.",
      prosAndCons: "PROS: Extremely high income potential, flexible hours, work from home, be your own boss, loyal fanbase. CONS: Stigma, privacy concerns, content leaks, burnout, competitive, long-term implications, emotional labor.",
      bestNiches: ["Girl next door", "Fitness/athletic", "Cosplay", "MILF/mature", "Fetish-specific", "Couples content", "Non-nude/teasing"],
      skillsToLearn: ["Photography/lighting", "Content planning", "Fan engagement", "Boundaries setting", "Social media growth", "Privacy protection"],
      tools: ["Quality camera/phone", "Lighting setup", "Lingerie/props", "Editing apps", "Social media accounts", "VPN/privacy tools"],
      successFactors: ["Consistent posting", "Fan engagement (respond to everyone)", "Unique niche/personality", "Smart promotion", "Boundaries", "Long-term thinking"]
    }
  },

  amazonFBA: {
    name: "Amazon FBA Seller",
    emoji: "📦",
    category: "E-commerce",
    personalityFit: ["entrepreneurial", "analytical", "detail-oriented", "risk-tolerant"],
    skillsRequired: ["product research", "supply chain", "Amazon platform knowledge"],
    incomeRange: [0, 100000],
    startupCost: [2000, 20000],
    timeToProfit: "3-9 months",
    lifestyle: "flexible",
    riskLevel: "medium-high",
    educationRequired: "none",
    physicalDemand: "low-medium",
    description: "Sell physical products on Amazon. Amazon stores and ships products (FBA = Fulfilled By Amazon). Find products, source from manufacturers, scale.",
    detailed: {
      whoYouAre: "You have capital to invest ($5-20k minimum). You're willing to deal with logistics/suppliers. You understand business is about systems and metrics. You can handle competition. You're patient with slow starts.",
      whatToDo: "Research profitable products (tools: Jungle Scout, Helium 10). Find suppliers on Alibaba. Order samples. Negotiate with manufacturer. Order inventory ($2-10k). Ship to Amazon warehouses. Launch with PPC ads. Optimize listings. Scale with more inventory. Repeat with new products.",
      firstYear: "Months 1-3: Product research, sourcing, waiting for inventory. Months 4-6: Launch, initial sales, breaking even. Months 7-12: Scale to $5-20k/month revenue ($1-5k profit).",
      income: "Month 1-6: $0 (investing). Month 7-9: $500-3k profit. Month 10-12: $3-10k profit. Year 2: $10-50k/month profit. Year 3+: $50-100k+/month.",
      dailyLife: "Check sales/rankings → manage PPC campaigns → respond to customer questions → order more inventory → work with suppliers → optimize listings → find new products.",
      prosAndCons: "PROS: Amazon handles shipping, huge customer base, scalable, passive-ish once running, high profit potential. CONS: High startup cost, inventory risk, competition, Amazon fees/suspensions, cash flow intensive.",
      bestNiches: ["Home/kitchen gadgets", "Pet supplies", "Sports/outdoors", "Baby products", "Health/beauty", "Office supplies", "Hobby/craft items"],
      skillsToLearn: ["Product research", "Amazon SEO (keywords)", "PPC advertising", "Supply chain management", "Negotiation", "Listing optimization"],
      tools: ["Jungle Scout or Helium 10 (research)", "Alibaba (suppliers)", "Amazon Seller Central", "Inventory management software", "PPC tools"],
      successFactors: ["Good product selection (demand + low competition)", "Quality suppliers", "Strong listings (photos, copy, SEO)", "PPC management", "Cash flow management", "Diversification"]
    }
  },

  digitalProducts: {
    name: "Digital Product Creator",
    emoji: "💾",
    category: "Online Business",
    personalityFit: ["creative", "entrepreneurial", "teaching-oriented", "technical"],
    skillsRequired: ["expertise in something", "content creation", "marketing"],
    incomeRange: [0, 100000],
    startupCost: [100, 2000],
    timeToProfit: "1-6 months",
    lifestyle: "very flexible",
    riskLevel: "low",
    educationRequired: "expertise in chosen field",
    physicalDemand: "low",
    description: "Create and sell digital products: courses, ebooks, templates, software, presets, etc. Create once, sell infinitely. True passive income.",
    detailed: {
      whoYouAre: "You have expertise people want to learn. You're good at teaching/explaining. You understand packaging knowledge into products. You're okay with upfront work for long-term payoff.",
      whatToDo: "Choose what to create (course, ebook, templates, presets, etc). Create the product. Set up sales page. Price it ($7-997). Market via content (YouTube, blog, social media). Build email list. Launch to list. Automate sales funnel. Create more products. Build product suite.",
      firstYear: "Months 1-3: Create product, build audience. Months 4-6: Launch, first $1-5k. Months 7-12: Scale to $3-15k/month through consistent marketing.",
      income: "Month 1-3: $0 (creating). Month 4-6: $500-3k. Month 7-12: $3-15k. Year 2: $15-50k/month. Year 3+: $50-100k+/month.",
      dailyLife: "Create content marketing product → nurture email list → improve product → create new products → automate sales → repeat. After setup: mostly passive.",
      prosAndCons: "PROS: Passive income, no inventory, unlimited scalability, work once sell forever, high profit margins (90%+). CONS: Upfront work, requires audience/traffic, competitive, refunds, need consistent marketing.",
      bestNiches: ["Make money online/business", "Design (Figma templates, Canva templates)", "Photography (presets, Lightroom)", "Fitness (workout programs)", "Music (beats, loops)", "Software/apps", "Productivity templates"],
      skillsToLearn: ["Content creation", "Marketing/copywriting", "Email marketing", "Product creation", "Platform setup (Gumroad, Teachable)", "Funnel building"],
      tools: ["Gumroad/Teachable/Kajabi (selling platform)", "Canva/tools to create product", "Email service (ConvertKit)", "Payment processing", "Landing page builder"],
      successFactors: ["Quality product solving real problem", "Building audience first", "Strong sales copy", "Email marketing", "Product-market fit", "Upsells/product suite"]
    }
  },

  // TRADITIONAL HIGH-PAYING CAREERS
  softwareEngineer: {
    name: "Software Engineer (FAANG/Tech)",
    emoji: "💻",
    category: "Technology",
    personalityFit: ["logical", "patient", "problem-solver", "continuous learner"],
    skillsRequired: ["programming", "algorithms", "system design"],
    incomeRange: [8000, 50000],
    startupCost: [0, 5000],
    timeToProfit: "6-24 months",
    lifestyle: "flexible/remote",
    riskLevel: "low",
    educationRequired: "degree or bootcamp or self-taught",
    physicalDemand: "low",
    description: "Write code for top tech companies. $150k-500k+ salaries. Work remotely. Solve complex problems. Build the future.",
    detailed: {
      whoYouAre: "You enjoy solving logical puzzles. You're okay sitting at computer all day. You like building things. You're patient with bugs/debugging. You enjoy continuous learning (tech evolves fast). You want high pay and job security.",
      whatToDo: "Learn to code (Python, JavaScript, Java). Study data structures/algorithms. Build projects for portfolio. Grind LeetCode (500+ problems). Apply to companies. Ace interviews. Get job at FAANG or startup. Keep learning. Level up to senior → staff → principal engineer. Or: start your own company.",
      firstYear: "Months 1-12: Learn fundamentals, build projects, apply to 100+ jobs. Land first job $60-120k (or more at top companies).",
      income: "Junior (0-2 years): $80-150k. Mid (2-5 years): $120-250k. Senior (5-10 years): $180-400k. Staff+ (10+ years): $300-700k at FAANG. Startups: equity can be worth millions.",
      dailyLife: "Standup meeting → write code → code reviews → meetings → more coding → debugging → learning new tech → repeat. 40-50 hours/week (better than most jobs).",
      prosAndCons: "PROS: Very high pay, remote work, job security, intellectual stimulation, great benefits, respected profession. CONS: Sitting all day, can be isolating, interview process brutal, ageism exists, need constant learning.",
      bestNiches: ["Frontend (React, etc)", "Backend (APIs, databases)", "Full-stack", "Mobile (iOS/Android)", "AI/ML", "DevOps", "Security", "Blockchain"],
      skillsToLearn: ["Programming language (Python, JS, Java, etc)", "Data structures & algorithms", "System design", "Git", "Testing", "Frameworks", "Cloud platforms"],
      tools: ["Computer", "VS Code or JetBrains", "GitHub", "LeetCode for practice", "Documentation", "AWS/GCP/Azure"],
      successFactors: ["Strong fundamentals", "LeetCode grinding", "Good portfolio projects", "Communication skills", "Networking", "Interview prep"]
    }
  },

  nurse: {
    name: "Registered Nurse (RN)",
    emoji: "👩‍⚕️",
    category: "Healthcare",
    personalityFit: ["caring", "resilient", "detail-oriented", "team-player"],
    skillsRequired: ["medical knowledge", "patient care", "stress management"],
    incomeRange: [5000, 15000],
    startupCost: [10000, 50000],
    timeToProfit: "24-48 months",
    lifestyle: "structured shifts",
    riskLevel: "low",
    educationRequired: "nursing degree (2-4 years) + license",
    physicalDemand: "high",
    description: "Care for patients, work in hospitals/clinics. Good pay, job security, respected. Physically and emotionally demanding but rewarding.",
    detailed: {
      whoYouAre: "You want to help people directly. You're compassionate but can handle stress. You're okay with 12-hour shifts and bodily fluids. You want job security and good pay without 10+ years of school. You work well under pressure.",
      whatToDo: "Get nursing degree (2-year ADN or 4-year BSN). Pass NCLEX exam. Get nursing license. Start at hospital (med-surg usually). Gain experience. Specialize (ICU, ER, OR, etc). Eventually: travel nursing ($3-8k/week), nurse practitioner (extra 2-3 years school, $100-150k+/year), or management.",
      firstYear: "Years 1-2: Nursing school. Year 3: Pass NCLEX, get first job, learn the ropes ($25-35/hour).",
      income: "New grad: $50-70k/year. 2-5 years: $60-90k. 5-10 years: $70-100k. Travel nursing: $100-200k/year. Nurse practitioner: $100-150k/year.",
      dailyLife: "Check in patients → give medications → monitor vitals → respond to emergencies → chart everything → communicate with doctors → comfort patients/families → 12-hour shifts (3-4 days/week).",
      prosAndCons: "PROS: Good pay, job security (always needed), flexible schedules (12-hour shifts means more days off), meaningful work, respect. CONS: Physically exhausting, emotionally draining, exposure to illness, dealing with death, understaffed often.",
      bestNiches: ["ICU (intensive care)", "ER (emergency)", "OR (operating room)", "NICU (babies)", "Travel nursing", "School nursing", "Nurse practitioner"],
      skillsToLearn: ["Patient assessment", "Medication administration", "IV insertion", "Emergency response", "Charting/documentation", "Communication", "Time management"],
      tools: ["Nursing degree/license", "Scrubs", "Stethoscope", "Clinical experience", "NCLEX study materials", "Continuing education"],
      successFactors: ["Compassion + toughness balance", "Time management", "Communication", "Continuous learning", "Self-care (avoid burnout)", "Specialization"]
    }
  },

  realEstateAgent: {
    name: "Real Estate Agent",
    emoji: "🏠",
    category: "Real Estate",
    personalityFit: ["social", "sales-oriented", "self-motivated", "persistent"],
    skillsRequired: ["sales", "networking", "negotiation", "marketing"],
    incomeRange: [2000, 50000],
    startupCost: [1000, 5000],
    timeToProfit: "3-9 months",
    lifestyle: "flexible but demanding",
    riskLevel: "medium",
    educationRequired: "real estate license (3-6 months)",
    physicalDemand: "medium",
    description: "Help people buy/sell houses. Commission-based ($3-15k per sale). Unlimited income potential. Build real estate empire.",
    detailed: {
      whoYouAre: "You're a people person. You don't mind inconsistent income. You're self-motivated (no boss watching). You love selling. You're okay working evenings/weekends (when clients are available). You can handle rejection.",
      whatToDo: "Get real estate license (online course + exam, 3-6 months, $500-2k). Join brokerage. Build sphere of influence (tell everyone). Farm a neighborhood. Door knock, cold call, social media. List properties. Show houses. Close deals. Eventually: build team or invest in properties yourself.",
      firstYear: "Months 1-3: Get licensed. Months 4-6: First deals (1-3). Months 7-12: Build momentum (5-10 deals). Year income: $30-80k.",
      income: "Year 1: $30-60k. Year 2-3: $60-120k. Year 5: $100-300k. Top agents: $500k-1M+/year. Commission: $3-15k per sale (average).",
      dailyLife: "Prospecting (calls, door knocking, social media) → showing properties → negotiations → open houses → networking → paperwork → repeat. Inconsistent schedule.",
      prosAndCons: "PROS: Unlimited income, flexible schedule, meet interesting people, can build passive income (rentals), respected. CONS: Inconsistent income, lots of rejection, weekends/evenings, market dependent, competitive.",
      bestNiches: ["Luxury homes (high commissions)", "First-time buyers", "Investment properties", "Commercial real estate", "New construction", "Relocation specialist"],
      skillsToLearn: ["Sales/persuasion", "Marketing (social media, ads)", "Negotiation", "Local market knowledge", "Contracts/legal basics", "CRM management"],
      tools: ["Real estate license", "MLS access", "CRM software", "Car", "Phone", "Marketing materials", "Brokerage support"],
      successFactors: ["Consistency (daily prospecting)", "Networking/sphere", "Personal brand", "Market knowledge", "Follow-up", "Customer service"]
    }
  },

  electrician: {
    name: "Licensed Electrician",
    emoji: "⚡",
    category: "Skilled Trade",
    personalityFit: ["hands-on", "problem-solver", "detail-oriented", "safety-conscious"],
    skillsRequired: ["electrical knowledge", "problem-solving", "manual dexterity"],
    incomeRange: [4000, 15000],
    startupCost: [2000, 10000],
    timeToProfit: "12-48 months",
    lifestyle: "structured but physical",
    riskLevel: "low",
    educationRequired: "apprenticeship (4-5 years) + license",
    physicalDemand: "high",
    description: "Install/maintain electrical systems. Good pay, job security, no college debt. Can start own business. Physical but respected trade.",
    detailed: {
      whoYouAre: "You like working with your hands. You're good at figuring things out. You don't want college debt. You're okay with physical work. You want a stable career that pays well. You're safety-conscious.",
      whatToDo: "Join apprenticeship program (while earning ~$15-20/hour). Learn on job for 4-5 years. Take classes (nights/weekends). Pass licensing exam. Become journeyman electrician ($25-40/hour). Eventually: master electrician or start own electrical company.",
      firstYear: "Years 1-4: Apprentice earning $30-50k/year while learning. Year 5: Get license, journeyman earning $50-80k. Year 10+: Master or own business $80-150k+.",
      income: "Apprentice: $30-50k. Journeyman: $50-80k. Master: $70-100k. Own business: $80-200k+.",
      dailyLife: "Arrive at job site → install/repair electrical systems → troubleshoot issues → follow code requirements → physical labor (climbing, lifting, tight spaces) → 8-10 hour days.",
      prosAndCons: "PROS: Good pay, job security, no college debt, can own business, respected trade, union benefits. CONS: Physical (hard on body long-term), dangerous (electricity), crawl spaces/attics, weather exposure, licensing takes years.",
      bestNiches: ["Residential wiring", "Commercial/industrial", "Solar installation (growing fast)", "Maintenance electrician", "Controls/automation", "Own electrical company"],
      skillsToLearn: ["Electrical theory", "National Electrical Code", "Wiring techniques", "Blueprint reading", "Troubleshooting", "Safety protocols"],
      tools: ["Hand tools", "Power tools", "Multimeter", "Wire strippers", "Licensing", "Truck/van", "Safety gear"],
      successFactors: ["Safety first always", "Master the code", "Continuous learning", "Quality work", "Customer service", "Business skills (if going solo)"]
    }
  },

  // SKILLED TRADES
  plumber: {
    name: "Licensed Plumber",
    emoji: "🔧",
    category: "Skilled Trade",
    personalityFit: ["hands-on", "problem-solver", "reliable", "customer-focused"],
    skillsRequired: ["plumbing knowledge", "problem-solving", "customer service"],
    incomeRange: [4000, 20000],
    startupCost: [2000, 15000],
    timeToProfit: "12-48 months",
    lifestyle: "structured but physical",
    riskLevel: "low",
    educationRequired: "apprenticeship (4-5 years) + license",
    physicalDemand: "high",
    description: "Install/repair water, drainage, and gas systems. Excellent pay, job security, can start own company. Always in demand.",
    detailed: {
      whoYouAre: "You don't mind getting dirty. You're good with your hands and solving problems. You want job security without college debt. Emergency calls don't bother you - they pay premium rates.",
      whatToDo: "Join apprenticeship (earn while you learn $15-20/hour). Complete 4-5 year program. Get licensed. Work as journeyman ($25-45/hour). Eventually master plumber or start own company. Market is huge - everyone needs plumbers.",
      firstYear: "Years 1-4: Apprentice earning $30-50k/year. Year 5: Licensed journeyman $55-90k. Year 7+: Master or own business $80-250k+.",
      income: "Apprentice: $30-50k. Journeyman: $55-90k. Master: $70-120k. Own company: $100-300k+. Emergency calls pay 2-3x normal rate.",
      dailyLife: "Drive to jobs → diagnose issues → install/repair pipes, fixtures, drains → crawl under houses/in tight spaces → customer interaction → physical work → 8-12 hour days (emergencies = more pay).",
      prosAndCons: "PROS: Excellent pay, job security, no college debt, own business potential, emergency calls pay great, recession-proof. CONS: Dirty work (sewage, etc), physical toll, tight spaces, on-call emergencies, requires licensing.",
      bestNiches: ["Residential service", "Commercial plumbing", "New construction", "Emergency service (highest pay)", "Backflow testing", "Own plumbing company"],
      skillsToLearn: ["Pipe fitting", "Code compliance", "Drain cleaning", "Water heater installation", "Gas line work", "Customer service", "Business/marketing (if solo)"],
      tools: ["Hand tools", "Power tools", "Snake/auger", "Camera inspection", "Torch", "Truck/van", "License", "Insurance"],
      successFactors: ["Quality work", "Good customer service", "Reliable/punctual", "Fair pricing", "Build reputation", "Answer emergency calls"]
    }
  },

  hvacTech: {
    name: "HVAC Technician",
    emoji: "❄️",
    category: "Skilled Trade",
    personalityFit: ["technical", "problem-solver", "detail-oriented", "customer-focused"],
    skillsRequired: ["mechanical knowledge", "electrical basics", "troubleshooting"],
    incomeRange: [4000, 18000],
    startupCost: [3000, 20000],
    timeToProfit: "6-36 months",
    lifestyle: "structured but seasonal",
    riskLevel: "low",
    educationRequired: "trade school or apprenticeship + EPA certification",
    physicalDemand: "high",
    description: "Install/repair heating, ventilation, and air conditioning systems. High demand, good pay, can own company. Hot attics in summer though.",
    detailed: {
      whoYouAre: "You like mechanical work and problem-solving. You're okay with extreme temps (hot attics in summer, cold outdoors in winter). You want stable career without college. You're detail-oriented - one mistake can break expensive equipment.",
      whatToDo: "Get EPA certification (required). Trade school or apprenticeship (6 months - 2 years). Start as helper/apprentice. Get experience with residential then commercial. Eventually: master HVAC tech or own company. Summer = busy season, winter = steady.",
      firstYear: "Year 1: Helper/apprentice $30-40k. Year 2-3: Certified tech $45-70k. Year 5+: Senior tech $60-90k. Own company: $80-250k+.",
      income: "Helper: $30-40k. Certified tech: $45-70k. Senior/specialized: $60-90k. Own company: $80-250k+. Summer OT can double income.",
      dailyLife: "Service calls → diagnose AC/heat issues → install new systems → work in attics/crawl spaces → heavy lifting (units are heavy) → customer interaction → 8-12 hours (busy in summer).",
      prosAndCons: "PROS: High demand, good pay, job security, own business potential, diverse work, recession-resistant. CONS: Extreme temps (hot attics), physical (heavy equipment), seasonal workload, on-call, requires ongoing training (tech changes).",
      bestNiches: ["Residential service", "Commercial HVAC", "Industrial", "Installation specialist", "Refrigeration", "Own HVAC company", "Smart home integration"],
      skillsToLearn: ["Refrigeration cycle", "Electrical diagnostics", "Sheet metal", "Ductwork", "EPA regulations", "Customer service", "Smart thermostats/controls"],
      tools: ["Gauges/meters", "Vacuum pump", "Recovery machine", "Hand tools", "Power tools", "EPA certification", "Truck/van", "Ladder"],
      successFactors: ["Technical expertise", "Troubleshooting skills", "Customer service", "Stay current with tech", "Quality work", "Reliable/fast service"]
    }
  },

  welder: {
    name: "Welder",
    emoji: "🔥",
    category: "Skilled Trade",
    personalityFit: ["focused", "precise", "hands-on", "safety-conscious"],
    skillsRequired: ["welding techniques", "metal knowledge", "attention to detail"],
    incomeRange: [3500, 15000],
    startupCost: [1000, 10000],
    timeToProfit: "3-12 months",
    lifestyle: "structured and physical",
    riskLevel: "low",
    educationRequired: "trade school or apprenticeship (6 months - 2 years)",
    physicalDemand: "high",
    description: "Join metal using heat. Work in manufacturing, construction, oil rigs, etc. Specialized welders (underwater, pipeline) make $150k+. Good career path.",
    detailed: {
      whoYouAre: "You have steady hands and focus. You like working with fire and metal. You're safety-conscious. You want good pay without college. You're okay with potentially traveling (pipeline/rig welders make most).",
      whatToDo: "Trade school or apprenticeship (6-24 months). Learn MIG, TIG, Stick welding. Get certified. Start in shop/manufacturing. Gain experience. Get specialized certifications (pipeline, underwater, aerospace). Travel jobs pay most.",
      firstYear: "Year 1: Entry level $35-50k. Year 2-3: Experienced $50-75k. Year 5+: Specialized $70-150k+. Underwater/pipeline/rig: $100-250k.",
      income: "Entry: $35-50k. Experienced: $50-75k. Specialized/traveling: $70-150k. Underwater/rig: $100-250k+. Overtime common.",
      dailyLife: "Read blueprints → prep materials → weld joints → inspect quality → grind/finish → repeat. 8-12 hours. May work outdoors, high places, confined spaces.",
      prosAndCons: "PROS: Good pay, job security, no college debt, can specialize for more $, satisfaction of creating. CONS: Physical toll, dangerous (heat/fumes), can be repetitive, travel required for highest pay, hard on eyes long-term.",
      bestNiches: ["Manufacturing (steady)", "Construction", "Pipeline (high pay, travel)", "Underwater welding ($$$)", "Oil rigs (high pay)", "Aerospace (precision)", "Custom fabrication"],
      skillsToLearn: ["MIG welding", "TIG welding", "Stick welding", "Blueprint reading", "Metal properties", "Safety protocols", "Quality inspection"],
      tools: ["Welding machine", "Helmet/safety gear", "Grinder", "Measuring tools", "Certifications", "Truck (if mobile)", "Torch/cutting tools"],
      successFactors: ["Precision/quality", "Safety focus", "Get multiple certifications", "Willing to travel for high-pay jobs", "Physical fitness", "Continuous learning"]
    }
  },

  carpenter: {
    name: "Carpenter",
    emoji: "🪚",
    category: "Skilled Trade",
    personalityFit: ["hands-on", "creative", "precise", "physically-fit"],
    skillsRequired: ["woodworking", "measurement", "blueprint reading"],
    incomeRange: [3000, 12000],
    startupCost: [2000, 15000],
    timeToProfit: "3-12 months",
    lifestyle: "physical and project-based",
    riskLevel: "low",
    educationRequired: "apprenticeship or vocational training",
    physicalDemand: "very high",
    description: "Build and repair wooden structures - houses, furniture, cabinets. Can specialize in finish carpentry, framing, or custom woodworking. Own business potential.",
    detailed: {
      whoYouAre: "You love working with wood and creating things. You're physically fit. You have an eye for detail and measurements. You want tangible results from your work - see what you built. College isn't for you.",
      whatToDo: "Apprenticeship or vocational school. Start as helper/laborer. Learn framing, finish work, cabinets. Gain experience in residential and/or commercial. Specialize (custom cabinets pay most). Eventually own carpentry business.",
      firstYear: "Year 1: Helper $28-40k. Year 2-3: Journeyman $40-65k. Year 5+: Master carpenter $55-90k. Own business: $60-150k+.",
      income: "Helper: $28-40k. Journeyman: $40-65k. Master/specialized: $55-90k. Custom woodworking: $70-120k. Own company: $60-150k+.",
      dailyLife: "Arrive at job site → measure/cut materials → build structures/cabinets → install → physical labor (lifting, climbing) → 8-10 hour days → see tangible progress.",
      prosAndCons: "PROS: Tangible results, creative, good pay, own business potential, satisfaction, diverse projects. CONS: Very physical (hard on body), weather exposure, seasonal slow periods, tool investment, repetitive motions.",
      bestNiches: ["Framing (volume, good pay)", "Finish carpentry (trim, doors)", "Custom cabinets (highest pay)", "Deck building", "Furniture making", "Remodeling", "Own construction company"],
      skillsToLearn: ["Blueprint reading", "Precision measuring", "Saw operation", "Joinery techniques", "Finish work", "Project estimation", "Business management"],
      tools: ["Saws (circular, miter, table)", "Drill/driver", "Nail gun", "Measuring tools", "Safety gear", "Truck", "Job-specific tools"],
      successFactors: ["Precision/quality", "Efficiency", "Customer service", "Diverse skills", "Physical fitness", "Build reputation", "Fair pricing"]
    }
  },

  // PROFESSIONAL SERVICES
  teacher: {
    name: "School Teacher",
    emoji: "👨‍🏫",
    category: "Education",
    personalityFit: ["patient", "organized", "empathetic", "passionate"],
    skillsRequired: ["subject expertise", "classroom management", "communication"],
    incomeRange: [3500, 8000],
    startupCost: [20000, 80000], // college debt
    timeToProfit: "48 months", // 4 year degree
    lifestyle: "structured with summers off",
    riskLevel: "very low",
    educationRequired: "bachelor's degree + teaching credential",
    physicalDemand: "medium",
    description: "Educate students K-12. Job security, pension, summers off, healthcare. Not high pay but stable. Fulfilling if you love teaching.",
    detailed: {
      whoYouAre: "You're passionate about education. You're patient with kids. You want job security and benefits over high pay. Summers off matters to you. You care about making a difference in young lives.",
      whatToDo: "Get bachelor's degree (4 years). Complete teaching credential program. Student teach. Pass exams. Get hired at school district. Teach, grade, plan lessons. Eventually tenure (job security). Can tutor on side for extra income.",
      firstYear: "Years 1-4: College (accumulate debt). Year 5: First year teacher $40-55k. Year 10: $50-70k. Year 20+: $65-95k + pension.",
      income: "Starting: $40-55k. Mid-career: $50-70k. Late career: $65-95k. Summer tutoring/summer school: +$5-15k. Pension in retirement.",
      dailyLife: "Morning prep → teach classes → manage students → grade work → meetings → plan lessons → evening grading → repeat. Summers off (but plan for next year).",
      prosAndCons: "PROS: Job security, pension, healthcare, summers off, make a difference, tenure protection. CONS: Low pay vs education required, challenging students, bureaucracy, bring work home, burnout common, college debt.",
      bestNiches: ["High school (more $ than elementary)", "Math/Science (shortage = higher pay)", "Special education (bonuses)", "Private schools (no credential needed but lower pay)", "International schools (travel)"],
      skillsToLearn: ["Classroom management", "Lesson planning", "Student engagement", "Assessment", "Technology integration", "Differentiated instruction", "Patience"],
      tools: ["Teaching credential", "Classroom supplies", "Computer", "Educational software", "Grading tools", "Curriculum materials"],
      successFactors: ["Classroom management", "Student relationships", "Organization", "Patience", "Continuous learning", "Work-life balance", "Supplement income with tutoring"]
    }
  },

  lawyer: {
    name: "Attorney/Lawyer",
    emoji: "⚖️",
    category: "Professional Services",
    personalityFit: ["analytical", "argumentative", "detail-oriented", "driven"],
    skillsRequired: ["legal analysis", "writing", "argumentation", "research"],
    incomeRange: [4000, 50000],
    startupCost: [100000, 300000], // law school debt
    timeToProfit: "84 months", // 4 year undergrad + 3 year law school
    lifestyle: "demanding but prestigious",
    riskLevel: "medium",
    educationRequired: "bachelor's + law degree (JD) + bar exam",
    physicalDemand: "low",
    description: "Practice law - represent clients, draft contracts, litigate cases. Can make great money but requires 7 years education + huge debt. Big law = big money but brutal hours.",
    detailed: {
      whoYouAre: "You love arguing and analyzing. You're driven and ambitious. You're okay with 7 years of education and $100-300k debt. You want prestige and high earning potential. Long hours don't scare you.",
      whatToDo: "4-year undergrad → 3-year law school (accumulate massive debt) → pass bar exam → work at firm or go solo. Big law = $190k starting but 80-hour weeks. Small firm/solo = less $ but better hours. Specialize (corporate, criminal, family, etc).",
      firstYear: "Years 1-7: School (debt accumulation). Year 8: Big law $190-220k (brutal hours) OR small firm $60-90k. Year 10+: Partner track $200k-1M+ OR solo $80-300k.",
      income: "Big law starting: $190-220k (but 80+ hour weeks). Small/mid firm: $60-120k. Solo: $50-300k (highly variable). Partner: $300k-2M+. Public defender: $50-80k.",
      dailyLife: "Legal research → draft contracts/briefs → client meetings → court appearances → negotiations → billable hours pressure → evenings/weekends common in big law.",
      prosAndCons: "PROS: High earning potential, prestigious, intellectually challenging, help people, diverse specialties. CONS: Massive debt, brutal hours (big law), high stress, competitive, burnout common, 7 years of school.",
      bestNiches: ["Big law/corporate (highest pay)", "Personal injury (contingency fees)", "Tax law", "IP/patent law", "Criminal defense", "Real estate", "Solo practice (flexible)"],
      skillsToLearn: ["Legal research", "Writing/drafting", "Negotiation", "Litigation", "Client management", "Business development", "Specialized area of law"],
      tools: ["Law degree + bar", "Legal research databases (Westlaw/LexisNexis)", "Office space", "Malpractice insurance", "Case management software"],
      successFactors: ["Strong writing", "Work ethic (long hours)", "Client development", "Specialization", "Reputation", "Networking", "Manage debt"]
    }
  },

  accountant: {
    name: "Accountant/CPA",
    emoji: "💼",
    category: "Professional Services",
    personalityFit: ["detail-oriented", "analytical", "organized", "ethical"],
    skillsRequired: ["accounting knowledge", "tax law", "attention to detail"],
    incomeRange: [4000, 20000],
    startupCost: [30000, 80000], // college debt
    timeToProfit: "48 months",
    lifestyle: "structured with busy seasons",
    riskLevel: "very low",
    educationRequired: "bachelor's in accounting + CPA license (optional but recommended)",
    physicalDemand: "very low",
    description: "Manage financials, taxes, audits. Very stable career. Tax season = brutal hours but good pay. Can own accounting firm. Remote work common.",
    detailed: {
      whoYouAre: "You like numbers and organization. You're detail-oriented - one decimal place matters. You want stable career with good pay. You don't mind repetitive work. Tax season craziness is worth it for the pay.",
      whatToDo: "4-year accounting degree → pass CPA exam (highly recommended) → work at firm or corporate → gain experience → either stay corporate (stable) or start own accounting/bookkeeping firm. Tax season = busy but lucrative.",
      firstYear: "Years 1-4: College. Year 5: Staff accountant $45-65k. Year 7: Senior $65-90k. Year 10+: Manager/Director $90-150k. Own firm: $80-300k+.",
      income: "Entry: $45-65k. Mid-level: $65-90k. Senior/manager: $90-150k. Own firm: $80-300k+. Tax season can add $20-50k.",
      dailyLife: "Review financials → prepare tax returns → audit work → client meetings → data entry/analysis → spreadsheets all day → long hours Jan-April (tax season) → easier rest of year.",
      prosAndCons: "PROS: Job security, good pay, remote work possible, clear career path, recession-resistant, own firm potential. CONS: Tax season = brutal 60-80 hour weeks, can be boring, sedentary, detail-heavy (stressful), requires CPA for best jobs.",
      bestNiches: ["Public accounting (Big 4 = prestige)", "Corporate accounting (stable, 40-hour weeks)", "Tax preparation (seasonal but profitable)", "Forensic accounting", "Government accounting", "Own CPA firm"],
      skillsToLearn: ["GAAP/accounting principles", "Tax law", "Excel (advanced)", "Audit procedures", "Financial analysis", "Accounting software (QuickBooks)", "Client management"],
      tools: ["CPA license", "Computer", "Accounting software", "Excel", "Tax software", "Office (if own firm)"],
      successFactors: ["Get CPA license", "Attention to detail", "Time management (tax season)", "Client relationships", "Stay updated (tax laws change)", "Build own firm for highest income"]
    }
  },

  // HEALTHCARE
  dentist: {
    name: "Dentist",
    emoji: "🦷",
    category: "Healthcare",
    personalityFit: ["detail-oriented", "steady-handed", "patient", "entrepreneurial"],
    skillsRequired: ["dental procedures", "diagnosis", "patient care", "manual dexterity"],
    incomeRange: [12000, 40000],
    startupCost: [300000, 500000], // dental school debt + practice startup
    timeToProfit: "96 months", // 4 year undergrad + 4 year dental school
    lifestyle: "structured and lucrative",
    riskLevel: "low",
    educationRequired: "bachelor's + dental school (DDS/DMD) + license",
    physicalDemand: "medium",
    description: "One of the best careers financially. Own your practice = $200-500k+/year. Massive debt but massive earning potential. Good work-life balance. Respected.",
    detailed: {
      whoYouAre: "You want high income and respect. You're okay with 8 years of school and $300-500k debt - you'll pay it off. You're good with your hands. You want to own a business (your practice). You care about health but not emergency medicine.",
      whatToDo: "4-year undergrad (science heavy) → 4-year dental school (expensive) → pass boards → work as associate dentist ($120-180k) → buy/start own practice ($200-500k+). Own practice = best income but manage business.",
      firstYear: "Years 1-8: School (massive debt). Year 9-10: Associate dentist $120-180k (pay off debt). Year 11+: Own practice $200-500k+. Debt payoff takes 5-10 years.",
      income: "Associate: $120-180k. Owner (solo practice): $200-400k. Multi-location: $400k-1M+. Specialists (orthodontist, oral surgeon): $300-700k.",
      dailyLife: "See patients → cleanings, fillings, crowns, etc → diagnose issues → treatment planning → manage staff (if owner) → 4-day work weeks common → good work-life balance.",
      prosAndCons: "PROS: Very high income, own business, respected, good hours (4-day weeks), job security, help people. CONS: Massive debt, 8 years school, repetitive procedures, business management stress, patient anxiety.",
      bestNiches: ["General dentistry (own practice)", "Orthodontics (braces, highest pay)", "Oral surgery", "Pediatric dentistry", "Cosmetic dentistry", "Multi-location ownership"],
      skillsToLearn: ["Dental procedures", "Diagnosis", "Business management", "Staff management", "Marketing", "Patient communication", "Insurance billing"],
      tools: ["Dental license", "Practice location", "Dental equipment ($$$)", "Staff", "Insurance contracts", "Billing software", "Marketing"],
      successFactors: ["Own your practice", "Patient care/experience", "Business management", "Marketing", "Efficient operations", "Debt management", "Work-life balance"]
    }
  },

  pharmacist: {
    name: "Pharmacist",
    emoji: "💊",
    category: "Healthcare",
    personalityFit: ["detail-oriented", "helpful", "reliable", "analytical"],
    skillsRequired: ["pharmaceutical knowledge", "patient counseling", "accuracy"],
    incomeRange: [9000, 14000],
    startupCost: [150000, 250000], // pharmacy school debt
    timeToProfit: "72 months", // 4 year undergrad + 4 year pharmacy school
    lifestyle: "structured and stable",
    riskLevel: "very low",
    educationRequired: "bachelor's + pharmacy school (PharmD) + license",
    physicalDemand: "low",
    description: "Dispense medications, counsel patients. Very stable career, good pay, but job market competitive. Retail vs hospital vs industry. Standing all day.",
    detailed: {
      whoYouAre: "You like healthcare but not the intensity of being a doctor. You're detail-oriented - errors can kill. You want stability and good pay. You're okay with standing most of the day. You like helping people with their health.",
      whatToDo: "4-year undergrad → 4-year pharmacy school (expensive) → pass licensing exam (NAPLEX) → work retail (CVS, Walgreens), hospital, or industry. Retail = standing all day but flexible shifts. Hospital = better hours, clinical work.",
      firstYear: "Years 1-8: School (large debt $150-250k). Year 9+: Pharmacist $100-140k. Career is stable - not much upward movement unless management or industry.",
      income: "Retail pharmacist: $100-130k. Hospital: $100-140k. Industry/pharma: $110-150k+. Management: $120-160k. Stable but plateaus.",
      dailyLife: "Fill prescriptions → verify accuracy → counsel patients → manage pharmacy techs → insurance issues → standing 8-12 hours → retail can be hectic, hospital more clinical.",
      prosAndCons: "PROS: Good pay, job security, help people, healthcare benefits, stable hours (usually), respected. CONS: Large debt, standing all day, repetitive, job market competitive, insurance hassles, retail can be stressful, limited upward mobility.",
      bestNiches: ["Retail pharmacy (most jobs)", "Hospital pharmacy (more clinical)", "Pharmaceutical industry (highest pay)", "Specialty pharmacy", "Compounding", "Pharmacy management"],
      skillsToLearn: ["Pharmacology", "Drug interactions", "Patient counseling", "Insurance processing", "Medication therapy management", "Regulatory compliance"],
      tools: ["Pharmacy license", "Computer", "Pharmacy software", "Drug references", "Compounding equipment (if applicable)"],
      successFactors: ["Accuracy (critical)", "Patient communication", "Efficiency", "Continuing education", "Network for industry jobs", "Consider management path"]
    }
  },

  // CREATIVE CAREERS
  photographer: {
    name: "Professional Photographer",
    emoji: "📸",
    category: "Creative",
    personalityFit: ["artistic", "client-focused", "entrepreneurial", "flexible"],
    skillsRequired: ["photography", "editing", "client management", "marketing"],
    incomeRange: [2000, 25000],
    startupCost: [2000, 15000],
    timeToProfit: "3-12 months",
    lifestyle: "flexible and project-based",
    riskLevel: "medium",
    educationRequired: "none (skill-based)",
    physicalDemand: "medium",
    description: "Capture photos for weddings, portraits, products, real estate, etc. Can make great money but competitive. Need business skills, not just photography skills.",
    detailed: {
      whoYouAre: "You have an eye for composition. You're comfortable with clients and sales. You want creative work with flexible schedule. You're okay with inconsistent income early on. You're entrepreneurial - you'll build a business.",
      whatToDo: "Learn photography (YouTube, courses, practice). Buy gear (camera + lenses = $2-5k minimum). Build portfolio (free/cheap shoots). Choose niche (weddings pay most). Market heavily (IG, Facebook, website, referrals). Book clients. Deliver great work. Raise prices as you grow.",
      firstYear: "Months 1-3: Learn + build portfolio. Months 4-6: First paid gigs $200-500. Months 7-12: $1-3k/month. Year 2: $3-8k/month. Year 3+: $5-25k/month (if successful).",
      income: "Starting: $500-2k/month. Established: $3-10k/month. Wedding photographer (busy season): $10-25k/month. Product/commercial: $5-30k/month. Highly variable.",
      dailyLife: "Client communications → shoot sessions (2-4 hours) → edit photos (4-8 hours per session) → deliver → marketing → repeat. Weekend shoots common (weddings).",
      prosAndCons: "PROS: Creative freedom, flexible schedule, good income potential, meet people, diverse work, work from anywhere. CONS: Competitive, inconsistent income, long editing hours, expensive gear, weekends occupied, client management.",
      bestNiches: ["Wedding photography (highest pay, seasonal)", "Portrait/family", "Product photography (e-commerce)", "Real estate", "Events", "Boudoir", "Commercial/corporate"],
      skillsToLearn: ["Photography fundamentals", "Lightroom/Photoshop editing", "Posing/directing", "Lighting", "Client management", "Marketing/social media", "Business/contracts"],
      tools: ["Camera body ($1-3k)", "Lenses ($500-3k)", "Lighting", "Editing software", "Computer", "Website", "Backup storage", "Insurance"],
      successFactors: ["Master your niche", "Consistent marketing", "Amazing portfolio", "Client experience", "Fast turnaround", "Competitive pricing → raise as you grow", "Word of mouth/referrals"]
    }
  },

  graphicDesigner: {
    name: "Graphic Designer",
    emoji: "🎨",
    category: "Creative",
    personalityFit: ["creative", "detail-oriented", "client-focused", "trendy"],
    skillsRequired: ["design software", "creativity", "communication", "branding"],
    incomeRange: [3000, 20000],
    startupCost: [500, 3000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible (freelance) or structured (agency/in-house)",
    riskLevel: "medium",
    educationRequired: "portfolio-based (degree optional)",
    physicalDemand: "very low",
    description: "Create visual content - logos, branding, ads, social media graphics, websites. Can freelance or work in-house. Remote friendly.",
    detailed: {
      whoYouAre: "You're creative and love design. You understand branding and aesthetics. You're comfortable with computers and learning software. You want flexible work (freelance) or stable job (agency). You can take feedback and revisions.",
      whatToDo: "Learn Adobe Creative Suite (Illustrator, Photoshop, InDesign) or Figma. Build portfolio (spec work, redesigns, passion projects). Freelance on Fiverr/Upwork early on. Build client base OR get hired at agency/company. Specialize (logo design, UI/UX, branding, etc).",
      firstYear: "Months 1-3: Learn + build portfolio. Months 4-6: First clients $500-2k/month. Months 7-12: $2-5k/month. Agency job: $40-60k starting. Year 3+: $5-20k/month freelance or $60-120k agency.",
      income: "Freelance starting: $1-3k/month. Established freelance: $5-20k/month. Agency: $40-80k. Senior/creative director: $80-150k. Top freelancers: $10-50k/month.",
      dailyLife: "Client briefs → research/inspiration → sketch concepts → design in software → present to client → revisions → finalize → deliver. Repeat. Remote work common.",
      prosAndCons: "PROS: Creative work, remote friendly, flexible, good pay potential, diverse projects, always learning. CONS: Client revisions (endless sometimes), competitive, screen time all day, inconsistent income (freelance), need constant self-promotion.",
      bestNiches: ["Logo/branding (high value)", "UI/UX design (tech pay)", "Social media graphics", "Packaging design", "Print design", "Advertising", "Agency work (stable)"],
      skillsToLearn: ["Adobe Illustrator", "Photoshop", "Figma/Sketch", "Branding principles", "Typography", "Color theory", "Client communication", "Marketing yourself"],
      tools: ["Computer", "Adobe Creative Cloud ($55/month)", "Figma (free/paid)", "Wacom tablet (optional)", "Portfolio website", "Project management tools"],
      successFactors: ["Strong portfolio", "Find your style", "Client communication", "Fast turnaround", "Marketing/social presence", "Specialize in profitable niche", "Consistent self-promotion"]
    }
  },

  videoEditor: {
    name: "Video Editor",
    emoji: "🎬",
    category: "Creative",
    personalityFit: ["patient", "detail-oriented", "creative", "tech-savvy"],
    skillsRequired: ["video editing", "storytelling", "software proficiency"],
    incomeRange: [3000, 25000],
    startupCost: [1000, 5000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible and remote-friendly",
    riskLevel: "medium",
    educationRequired: "portfolio-based (no degree needed)",
    physicalDemand: "very low",
    description: "Edit videos for YouTubers, brands, agencies. HUGE demand right now. Can make $5-20k/month with good clients. Fully remote. Learn in months.",
    detailed: {
      whoYouAre: "You're detail-oriented and patient (editing takes time). You understand pacing and storytelling. You're tech-savvy. You want remote work with flexible hours. You're okay sitting at computer all day.",
      whatToDo: "Learn editing (Premiere Pro or Final Cut). Study YouTube editing styles (fast pacing, memes, effects). Build portfolio (edit your own videos or spec work). Post on Twitter/IG showing your work. DM YouTubers/brands offering services. Land first client. Deliver fast. Get testimonials. Raise rates. Hire team to scale.",
      firstYear: "Months 1-2: Learn editing. Months 3-4: First client $500-1k/month. Months 5-6: 2-3 clients $2-4k/month. Months 7-12: $5-10k/month. Year 2: $8-20k/month. Can scale by hiring editors.",
      income: "Starting: $500-2k/month. Established: $5-15k/month. Agency/team: $15-50k/month. YouTubers pay $100-500 per video. Brands pay $500-5k per video.",
      dailyLife: "Download footage → cut together sequences → add effects/transitions → color grading → sound design → revisions → export → deliver. 4-10 hours per video depending on complexity.",
      prosAndCons: "PROS: High demand, fully remote, good pay, creative, learn fast, flexible hours, global clients. CONS: Repetitive, long hours at screen, back/neck pain, client deadlines, revision requests, eyes strain.",
      bestNiches: ["YouTube editing (high volume)", "Brand/corporate videos", "Ads/commercials (highest pay)", "Podcast video editing", "Wedding videos", "Real estate videos", "Course/education content"],
      skillsToLearn: ["Adobe Premiere Pro", "After Effects (motion graphics)", "Color grading", "Sound design", "Storytelling/pacing", "YouTube retention tactics", "Client management"],
      tools: ["Powerful computer (editing is intensive)", "Adobe Creative Cloud", "External hard drives (storage)", "Fast internet", "Project management tools"],
      successFactors: ["Fast turnaround", "Study what works (retention)", "Consistent outreach (land clients)", "Portfolio/testimonials", "Specialize in style", "Build system to scale", "Raise rates over time"]
    }
  },

  // MODERN ONLINE CAREERS
  socialMediaManager: {
    name: "Social Media Manager",
    emoji: "📱",
    category: "Digital Marketing",
    personalityFit: ["social", "creative", "analytical", "trendy"],
    skillsRequired: ["content creation", "copywriting", "analytics", "trend awareness"],
    incomeRange: [3000, 15000],
    startupCost: [0, 2000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible and remote",
    riskLevel: "low",
    educationRequired: "none (results-based)",
    physicalDemand: "very low",
    description: "Manage social media accounts for brands/creators. Create content, engage audience, grow followers. Can freelance or work in-house. Remote friendly.",
    detailed: {
      whoYouAre: "You're always on social media and understand what goes viral. You can write engaging captions. You're organized and consistent. You want remote work. You're creative but also data-driven.",
      whatToDo: "Study what works on each platform. Start by managing your own account to show results. Offer free work to build portfolio. Land first client ($500-1k/month). Deliver results (engagement, growth). Get testimonials. Raise rates. Take on more clients or go in-house.",
      firstYear: "Months 1-2: Learn + build own account. Months 3-4: First client $500-1k. Months 5-8: 3-4 clients $3-5k/month. Months 9-12: $5-8k/month. Agency job: $45-70k.",
      income: "Per client: $500-3k/month. Freelance (3-5 clients): $3-10k/month. Agency: $45-80k/year. Senior: $80-120k. Can scale with team.",
      dailyLife: "Create content → schedule posts → engage with audience → respond to comments/DMs → track analytics → strategy planning → client reports → stay on trends.",
      prosAndCons: "PROS: Remote work, creative, low startup, flexible, always learning, good pay potential. CONS: Always on (social never sleeps), algorithm changes, client pressure for results, burnout risk, requires constant content ideas.",
      bestNiches: ["E-commerce brands (results = revenue)", "Personal brands/creators", "B2B/SaaS companies", "Real estate agents", "Restaurants/local businesses", "Agency work"],
      skillsToLearn: ["Content creation", "Copywriting", "Platform algorithms", "Analytics/reporting", "Graphic design basics", "Video editing basics", "Engagement tactics"],
      tools: ["Phone (for content)", "Scheduling tools (Later, Buffer)", "Canva (graphics)", "Analytics tools", "Project management", "CapCut (video editing)"],
      successFactors: ["Results focused (not just vanity metrics)", "Consistent posting", "Engage audience", "Stay on trends", "Great content", "Client communication", "Portfolio/case studies"]
    }
  },

  copywriter: {
    name: "Copywriter",
    emoji: "✍️",
    category: "Digital Marketing",
    personalityFit: ["persuasive", "creative", "strategic", "detail-oriented"],
    skillsRequired: ["writing", "persuasion", "marketing psychology", "research"],
    incomeRange: [3000, 30000],
    startupCost: [0, 1000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible and remote",
    riskLevel: "low",
    educationRequired: "none (results-based)",
    physicalDemand: "very low",
    description: "Write persuasive copy for ads, emails, websites, sales pages. High-paying skill. Top copywriters make $10-50k/month. Fully remote. Learn in months.",
    detailed: {
      whoYouAre: "You love writing and understand psychology. You're persuasive. You can learn what makes people buy. You want high income with flexible work. You're okay with deadlines and revisions.",
      whatToDo: "Learn copywriting (courses, study ads/emails that convert). Write spec work (rewrite bad ads). Build portfolio. Start on Upwork/cold email. Land first client. Deliver results (your copy = $$$). Get testimonials. Raise rates aggressively. Specialize (email, ads, sales pages). Top copywriters charge $5-20k per project.",
      firstYear: "Months 1-2: Learn + spec work. Months 3-4: First clients $1-3k/month. Months 5-8: $4-8k/month. Months 9-12: $8-15k/month. Year 2+: $15-50k/month (top 10%).",
      income: "Starting: $1-3k/month. Intermediate: $5-12k/month. Advanced: $15-50k/month. Per project: $500-20k depending on skill/niche. Email sequences: $2-10k. Sales pages: $5-25k.",
      dailyLife: "Research client/product → study target audience → write copy → revisions → A/B test results → optimize → deliver. Write emails, ads, landing pages, etc.",
      prosAndCons: "PROS: Very high income potential, fully remote, low startup, valuable skill, work with big brands, creative + strategic. CONS: High pressure (your copy = client's revenue), deadlines, writer's block, competitive, need results to charge high rates.",
      bestNiches: ["Email marketing (sequences)", "Facebook/Google ads", "Sales pages", "E-commerce (product descriptions)", "SaaS/B2B", "Info products/courses", "VSLs (video sales letters)"],
      skillsToLearn: ["Persuasion psychology", "Marketing fundamentals", "AIDA/PAS formulas", "Storytelling", "Research skills", "A/B testing", "Client management"],
      tools: ["Computer", "Google Docs", "Grammarly", "Hemingway Editor", "Swipe file (save good ads)", "Portfolio website (optional)"],
      successFactors: ["Results focused (conversions matter)", "Continuous learning", "Testimonials/case studies", "Specialize in niche", "Charge per project not hourly", "Build relationships", "Study top performers"]
    }
  },

  virtualAssistant: {
    name: "Virtual Assistant",
    emoji: "💻",
    category: "Remote Services",
    personalityFit: ["organized", "reliable", "helpful", "adaptable"],
    skillsRequired: ["admin tasks", "communication", "time management", "tech basics"],
    incomeRange: [2000, 10000],
    startupCost: [0, 500],
    timeToProfit: "0-3 months",
    lifestyle: "flexible and remote",
    riskLevel: "low",
    educationRequired: "none",
    physicalDemand: "very low",
    description: "Handle admin tasks for busy entrepreneurs/executives. Email, scheduling, data entry, customer service, etc. Easy to start, fully remote, scale by specializing or building agency.",
    detailed: {
      whoYouAre: "You're organized and reliable. You like helping others succeed. You're tech-savvy enough to learn tools quickly. You want fully remote work with flexible hours. You're detail-oriented.",
      whatToDo: "Decide what services you'll offer (admin, social media, customer service, etc). Create profile on Upwork/Belay/Fancy Hands. Apply to jobs. Start general, then specialize (exec assistant, e-commerce VA, real estate VA = higher pay). Eventually raise rates or start VA agency.",
      firstYear: "Month 1: First clients $10-20/hour. Months 2-4: $20-30/hour. Months 5-8: $30-50/hour. Months 9-12: $3-6k/month. Year 2: Specialize $5-10k/month or build agency.",
      income: "Starting: $10-20/hour ($1.5-3k/month). Experienced: $25-50/hour ($4-8k/month). Specialized/niched: $40-75/hour ($6-12k/month). Agency: $8-30k/month.",
      dailyLife: "Check emails → handle admin tasks → schedule meetings → data entry → customer support → social media → project management → whatever client needs. Very varied.",
      prosAndCons: "PROS: Easy to start, fully remote, flexible hours, low barrier, diverse work, can scale, work global hours for more pay. CONS: Can feel like just a job, capped income (unless specialize/scale), inconsistent work early on, client dependent.",
      bestNiches: ["Executive assistant (high pay)", "E-commerce VA (Shopify, Amazon)", "Real estate VA", "Social media management", "Podcast production", "Bookkeeping", "Customer service"],
      skillsToLearn: ["Email management", "Calendar scheduling", "Data entry", "Customer service", "Project management tools (Asana, Trello)", "Communication", "Specific niche skills"],
      tools: ["Computer", "Fast internet", "Phone (sometimes)", "Google Workspace", "Zoom", "Project management tools", "Whatever client uses"],
      successFactors: ["Reliability (show up)", "Communication", "Proactive", "Learn client's business", "Specialize for higher rates", "Build long-term client relationships", "Scale to agency model"]
    }
  },

  // TECH CAREERS
  dataAnalyst: {
    name: "Data Analyst",
    emoji: "📊",
    category: "Technology",
    personalityFit: ["analytical", "detail-oriented", "curious", "communicative"],
    skillsRequired: ["Excel/SQL", "data visualization", "statistics", "critical thinking"],
    incomeRange: [5000, 15000],
    startupCost: [0, 5000], // bootcamp optional
    timeToProfit: "3-12 months",
    lifestyle: "structured but remote-friendly",
    riskLevel: "low",
    educationRequired: "degree preferred but bootcamps work",
    physicalDemand: "very low",
    description: "Analyze data to help companies make decisions. Learn SQL, Excel, Tableau/Power BI. Remote work common. Good pay, growing field. Less intense than software engineering.",
    detailed: {
      whoYouAre: "You like numbers and patterns. You're curious about why things happen. You want tech pay without hardcore coding. You can explain complex things simply. Remote work appeals to you.",
      whatToDo: "Learn Excel (advanced), SQL, and visualization tool (Tableau/Power BI). Free resources work. Build portfolio (analyze public datasets, create dashboards). Apply to entry-level analyst roles. Get first job. Learn on job. Advance to senior analyst → data scientist if desired.",
      firstYear: "Months 1-6: Learn + build portfolio. Months 7-9: Job hunt. Months 10-12: First job $55-75k. Year 2-3: $70-95k. Year 5+: $90-130k. Senior: $110-180k.",
      income: "Entry: $55-75k. Mid-level: $75-100k. Senior: $100-140k. Lead/manager: $120-180k. Remote roles common. Tech companies pay more.",
      dailyLife: "Pull data from databases (SQL) → clean/analyze in Excel/Python → create visualizations → present insights to stakeholders → meetings → repeat. Mostly computer work.",
      prosAndCons: "PROS: Good pay, remote friendly, growing field, less stressful than engineering, clear learning path, help make business decisions. CONS: Can be repetitive, lots of meetings, dependent on data quality, less creative, need communication skills.",
      bestNiches: ["Tech companies (highest pay)", "Finance/banking", "Healthcare analytics", "Marketing analytics", "E-commerce", "Business intelligence", "Product analytics"],
      skillsToLearn: ["SQL (critical)", "Excel (advanced - pivot tables, formulas)", "Python/R (helpful)", "Tableau/Power BI", "Statistics basics", "Data cleaning", "Storytelling with data"],
      tools: ["Computer", "SQL", "Excel", "Tableau/Power BI", "Python (optional)", "Database tools", "Communication tools (Slack)"],
      successFactors: ["Master SQL", "Communication skills (explain insights)", "Business understanding", "Portfolio projects", "Learn continuously", "Network in tech", "Domain expertise"]
    }
  },

  softwareDeveloper: {
    name: "Software Developer/Engineer",
    emoji: "👨‍💻",
    category: "Technology",
    personalityFit: ["logical", "problem-solver", "persistent", "continuous-learner"],
    skillsRequired: ["programming", "problem-solving", "debugging", "collaboration"],
    incomeRange: [6000, 40000],
    startupCost: [0, 20000], // bootcamp optional
    timeToProfit: "6-18 months",
    lifestyle: "flexible and remote-friendly",
    riskLevel: "low",
    educationRequired: "degree helpful but bootcamps/self-taught works",
    physicalDemand: "very low",
    description: "Build software/apps/websites. One of highest-paying careers. Fully remote options. Can self-teach or bootcamp. Always in demand. FAANG = $200k+ starting.",
    detailed: {
      whoYouAre: "You love solving puzzles. You're okay sitting at computer 8-12 hours. You can teach yourself anything. You want high pay and remote work. You're persistent - coding is frustrating at first. You want options - tech jobs everywhere.",
      whatToDo: "Learn to code (free: The Odin Project, CS50) or bootcamp ($10-20k). Pick path: web dev (easiest entry), mobile dev, backend. Build portfolio projects. Grind LeetCode. Apply to 100+ jobs. Land first role. Study on job. Job hop every 2 years for raises. Aim for FAANG eventually.",
      firstYear: "Months 1-9: Learn + build projects. Months 10-12: Job hunt (hardest part). Year 1: Entry level $60-90k. Year 2-3: $90-130k. Year 5: $130-200k. FAANG: $200-500k+.",
      income: "Entry: $60-90k. Mid-level: $90-140k. Senior: $140-220k. Staff/Principal: $200-400k+. FAANG entry: $180-250k. Equity can add $50-300k/year at top companies.",
      dailyLife: "Morning standup → write code → debug issues → code reviews → meetings → more coding → testing → deploy → repeat. Remote work very common post-COVID.",
      prosAndCons: "PROS: Highest pay, fully remote options, always in demand, creative problem solving, global opportunities, work from anywhere. CONS: Stressful learning curve, imposter syndrome, long screen hours, meeting heavy, ageism concerns, constant learning required.",
      bestNiches: ["Web development (easiest entry)", "Mobile (iOS/Android)", "Backend/APIs", "DevOps", "Cloud engineering", "AI/ML (hot now)", "Blockchain/Web3"],
      skillsToLearn: ["Programming language (JavaScript, Python, Java)", "Data structures/algorithms (for interviews)", "Git/GitHub", "Frameworks (React, etc)", "Databases", "Problem solving", "System design (senior)"],
      tools: ["Computer", "Code editor (VS Code)", "GitHub", "Terminal/command line", "Cloud platforms (AWS)", "Communication tools (Slack)"],
      successFactors: ["Build projects (portfolio)", "LeetCode grind (interviews)", "Network (Twitter, LinkedIn)", "Job hop for raises", "Continuous learning", "Contribute to open source", "Aim for FAANG/top companies"]
    }
  },

  // BUSINESS/ENTREPRENEURSHIP
  restaurantOwner: {
    name: "Restaurant Owner",
    emoji: "🍽️",
    category: "Business",
    personalityFit: ["entrepreneurial", "hardworking", "people-person", "stress-resilient"],
    skillsRequired: ["business management", "customer service", "food knowledge", "leadership"],
    incomeRange: [0, 50000],
    startupCost: [50000, 500000],
    timeToProfit: "12-36 months",
    lifestyle: "demanding and hands-on",
    riskLevel: "very high",
    educationRequired: "none (experience helps)",
    physicalDemand: "high",
    description: "Own/operate a restaurant. Can make great money but very risky - 60% fail within 3 years. Long hours, slim margins. If successful, can build multiple locations.",
    detailed: {
      whoYouAre: "You love food and people. You're willing to work 60-80 hour weeks for years. You can handle stress - restaurant life is chaos. You're okay with high risk. You want to build something tangible.",
      whatToDo: "Gain experience (work in restaurants first). Save capital ($50-500k). Develop concept. Find location. Build out space. Hire team. Launch. Market. Manage operations. Survive first brutal year. Optimize. Eventually profitable or expand.",
      firstYear: "Year 1: Probably losing money (startup costs). Year 2: Break even hopefully. Year 3: $30-100k profit if successful. Year 5+: $80-300k or multiple locations making $200k-1M+. But 60% fail.",
      income: "Year 1-2: $0 or losing money. Year 3+: $50-150k (single location). Multiple locations: $150k-1M+. Fast casual/QSR: better margins than fine dining. Highly variable - can lose everything.",
      dailyLife: "Open restaurant → manage staff → handle customer issues → inventory → payroll → marketing → operations → close late → repeat. No days off early on. Always something breaking.",
      prosAndCons: "PROS: Own business, creative freedom, community connection, can scale (multiple locations), potential high income, be your own boss. CONS: Very risky (60% fail), long hours, slim margins (3-5%), staffing nightmare, food costs volatile, stressful, can lose everything.",
      bestNiches: ["Fast casual (better margins)", "QSR/quick service", "Food trucks (lower startup)", "Ghost kitchen (delivery only)", "Franchise (proven model)", "Niche cuisine", "Bar/alcohol (high margins)"],
      skillsToLearn: ["Restaurant operations", "Food cost management", "Hiring/managing staff", "Marketing/social media", "P&L management", "Customer service", "Crisis management"],
      tools: ["Restaurant space/lease", "Kitchen equipment ($$$)", "POS system", "Staff", "Inventory system", "Permits/licenses", "Marketing budget"],
      successFactors: ["Location location location", "Unique concept OR execution", "Manage costs religiously", "Great staff/culture", "Marketing", "Consistent quality", "Customer experience", "Have capital cushion (will need it)"]
    }
  },

  foodTruck: {
    name: "Food Truck Owner",
    emoji: "🚚",
    category: "Business",
    personalityFit: ["entrepreneurial", "hardworking", "adaptable", "social"],
    skillsRequired: ["cooking", "business management", "customer service", "marketing"],
    incomeRange: [3000, 20000],
    startupCost: [40000, 150000],
    timeToProfit: "6-18 months",
    lifestyle: "demanding but flexible",
    riskLevel: "medium-high",
    educationRequired: "none",
    physicalDemand: "high",
    description: "Mobile restaurant. Lower startup than brick & mortar but still $50-150k. Can make $100-500/day revenue. Go to events, lunch spots, breweries. Scale with multiple trucks.",
    detailed: {
      whoYouAre: "You love cooking and want your own food business without $500k investment. You're okay working in a truck all day. You're social and can market yourself. You want flexibility to move locations.",
      whatToDo: "Save/borrow capital ($50-150k for truck + equipment). Develop menu (limited, high-margin items). Get permits/licenses (varies by city). Buy/build truck. Test menu. Launch. Find good locations (lunch spots, events, breweries). Build social media presence. Grind. Eventually add more trucks.",
      firstYear: "Months 1-6: Startup phase, learning, building following. Months 7-12: $3-8k/month profit. Year 2: $5-15k/month. Year 3: Add truck, $10-30k/month across fleet.",
      income: "$200-800/day revenue typical. After food cost (30%), labor, gas, fees = $3-15k/month profit single truck. Multiple trucks: $15-50k/month. Events can do $2-5k/day.",
      dailyLife: "Prep food → drive to location → setup → serve customers → social media posting → cleanup → drive home → repeat. Long days on your feet. Hot in summer.",
      prosAndCons: "PROS: Lower startup than restaurant, flexibility (move locations), fun/social, scale with more trucks, good margins, build brand. CONS: Weather dependent, permit hassles, truck breakdowns, physically demanding, long hours, seasonal in some areas, competitive.",
      bestNiches: ["Tacos/Mexican (always popular)", "BBQ", "Asian fusion", "Gourmet burgers", "Breakfast", "Dessert/ice cream", "Catering (private events)"],
      skillsToLearn: ["Cooking/menu development", "Food truck operations", "Permits/regulations", "Location scouting", "Social media marketing", "Food cost management", "Event booking"],
      tools: ["Food truck ($40-100k)", "Equipment", "Permits/licenses", "Generator", "POS system", "Social media", "Commissary kitchen (if required)"],
      successFactors: ["Great food (obviously)", "Consistent locations", "Social media presence", "Good branding", "Fast service", "High-margin items", "Catering/events", "Scale with multiple trucks"]
    }
  },

  // TRANSPORTATION/LOGISTICS
  truckDriver: {
    name: "Commercial Truck Driver",
    emoji: "🚛",
    category: "Transportation",
    personalityFit: ["independent", "reliable", "patient", "comfortable-alone"],
    skillsRequired: ["driving", "time management", "navigation", "safety"],
    incomeRange: [4000, 12000],
    startupCost: [3000, 8000], // CDL training
    timeToProfit: "1-3 months",
    lifestyle: "independent but long hours",
    riskLevel: "low",
    educationRequired: "CDL (Commercial Driver's License)",
    physicalDemand: "medium",
    description: "Drive semi trucks long haul or regional. Always in demand. Can make $80-150k/year. Long haul = more money but away from home. Get paid to see country. CDL training 3-8 weeks.",
    detailed: {
      whoYouAre: "You like being alone and don't mind long drives. You're responsible and safety-focused. You want good pay without college. Being away from home doesn't bother you (long haul) or you can do regional/local for less pay but home daily.",
      whatToDo: "Get CDL (3-8 weeks training, $3-8k - many companies pay for it). Pass test. Get hired by trucking company. Start driving OTR (over the road), regional, or local. Gain experience. Eventually: owner-operator (own truck, make more but more responsibility).",
      firstYear: "Months 1-2: CDL training. Months 3-12: New driver $45-60k. Year 2-3: Experienced $60-80k. Year 5+: $70-100k. Owner-operator: $100-250k (but own truck/expenses).",
      income: "Company driver: $50-80k (long haul), $40-60k (regional/local). Specialized (hazmat, tanker): $70-100k. Owner-operator: $100-250k (but expenses too). Always in demand.",
      dailyLife: "Inspect truck → drive 10-11 hours (legally capped) → stops for fuel/food → sleep in truck (long haul) or home (local) → log hours → repeat. Long haul = weeks away.",
      prosAndCons: "PROS: Good pay, always in demand, see country, independent, no college needed, companies hire fast, some pay for training. CONS: Long hours, away from home (OTR), sedentary (health), isolation, safety risks, irregular schedule.",
      bestNiches: ["Long haul/OTR (highest pay)", "Regional (home weekends)", "Local (home daily, lower pay)", "Specialized (hazmat, tanker = more $)", "Owner-operator (own truck)", "Team driving (faster deliveries, more $)"],
      skillsToLearn: ["Safe driving", "Route planning", "Truck maintenance basics", "Logbook/hours management", "Customer service (some)", "Weather driving", "Time management"],
      tools: ["CDL license", "Medical certification", "Clean driving record", "GPS/navigation", "Logbook (electronic)", "Truck (if owner-operator)"],
      successFactors: ["Safety record (critical)", "Reliability", "Efficient routing", "Maintain health (sedentary job)", "Save for owner-operator truck", "Choose right company", "Consider specialized for more pay"]
    }
  },

  // TRADES
  autoMechanic: {
    name: "Auto Mechanic/Technician",
    emoji: "🔧",
    category: "Skilled Trade",
    personalityFit: ["hands-on", "problem-solver", "detail-oriented", "patient"],
    skillsRequired: ["automotive knowledge", "diagnostic skills", "tool proficiency"],
    incomeRange: [3500, 12000],
    startupCost: [5000, 30000], // tools + training
    timeToProfit: "6-24 months",
    lifestyle: "structured and physical",
    riskLevel: "low",
    educationRequired: "trade school or apprenticeship + ASE certification",
    physicalDemand: "high",
    description: "Diagnose and repair vehicles. Always in demand - cars break constantly. Can work at shop or own your own. Dealerships vs independent. Good pay, job security.",
    detailed: {
      whoYouAre: "You like figuring out problems. You're good with your hands and tools. You don't mind getting dirty. You want job security without college. Cars fascinate you.",
      whatToDo: "Trade school or apprenticeship (6-24 months). Get ASE certifications (8 tests). Start as lube tech/entry level. Learn from experienced mechanics. Gain experience. Specialize (transmission, electrical, diesel). Eventually master tech or open own shop.",
      firstYear: "Year 1: Entry/lube tech $30-40k. Year 2-3: Certified tech $40-60k. Year 5+: Master tech $60-90k. Dealership: $50-90k. Own shop: $70-150k.",
      income: "Entry: $30-40k. Certified: $45-70k. Master: $60-90k. Specialized (diesel, European): $70-110k. Own shop: $80-200k. Flat rate pay common (get paid per job, not hour).",
      dailyLife: "Diagnose issues (computer scan, inspection) → disassemble → replace parts → reassemble → test → document → next car. Physical work (lifting, tight spaces). 8-10 hour days.",
      prosAndCons: "PROS: Always in demand, good pay, job security, problem solving, own shop potential, cars everywhere need fixing. CONS: Physically demanding, dirty, tool investment ($), flat rate pressure, back/knee issues long-term, cars getting more complex.",
      bestNiches: ["Dealership (steady work, benefits)", "Independent shop", "Specialization (diesel, Euro, electric)", "Mobile mechanic (flexibility)", "Fleet maintenance (trucks, buses)", "Own shop (highest potential)"],
      skillsToLearn: ["Diagnostics (critical)", "Electrical systems (modern cars)", "Engine repair", "Transmission", "Brakes/suspension", "Computer systems", "Customer communication"],
      tools: ["Hand tools ($5-15k)", "Power tools", "Diagnostic scanner", "Lift access", "ASE certifications", "Toolbox", "Truck (if mobile)"],
      successFactors: ["Master diagnostics", "Keep learning (cars change)", "ASE certifications", "Quality work", "Efficiency (flat rate)", "Specialize for more $", "Consider own shop eventually"]
    }
  },

  // MODERN/CRYPTO
  cryptoTrader: {
    name: "Crypto/Day Trader",
    emoji: "📈",
    category: "Finance/Trading",
    personalityFit: ["analytical", "risk-tolerant", "disciplined", "emotionally-stable"],
    skillsRequired: ["technical analysis", "risk management", "psychology", "market knowledge"],
    incomeRange: [-10000, 100000], // can lose money
    startupCost: [1000, 50000], // trading capital
    timeToProfit: "6-24 months (most lose money)",
    lifestyle: "flexible but stressful",
    riskLevel: "very high",
    educationRequired: "none (self-taught)",
    physicalDemand: "very low",
    description: "Trade crypto/stocks for profit. Can make life-changing money but 90% lose money. Requires discipline, risk management, emotional control. Not recommended unless serious.",
    detailed: {
      whoYouAre: "You understand most traders lose money. You're disciplined and emotionally stable. You can follow a system even when losing. You have capital you can afford to lose. You want potential high upside, understand high risk.",
      whatToDo: "Learn technical analysis. Study successful traders. Paper trade (fake money) for 6 months minimum. Develop system. Start small with real money. Follow strict risk management (never risk >1-2% per trade). Journal every trade. Most fail - have backup plan.",
      firstYear: "Reality: 90% lose money. Months 1-6: Learning (paper trade). Months 7-12: Small real trading (probably losing). Year 2: Break even maybe. Year 3+: If still trading and profitable, $50k-500k+ possible. But most quit losing.",
      income: "Most: Negative (lose money). Break even: 0. Profitable (top 10%): $30k-500k+/year. Top 1%: Millions. Extremely variable. Can make $50k one month, lose $30k next. Not stable income.",
      dailyLife: "Market open → watch charts → execute trades → manage positions → close trades → journal/review → repeat. Crypto = 24/7 market (stressful). Stare at screens all day.",
      prosAndCons: "PROS: Unlimited income potential, work from anywhere, flexible hours, just need laptop, no boss. CONS: 90% lose money, extremely stressful, emotional rollercoaster, sedentary, can lose everything, not stable income, 24/7 markets (crypto).",
      bestNiches: ["Crypto day trading", "Crypto swing trading", "Stock day trading (need $25k minimum)", "Options trading", "Forex", "Futures"],
      skillsToLearn: ["Technical analysis", "Risk management (critical)", "Trading psychology", "Chart patterns", "Position sizing", "Emotional control", "Market structure"],
      tools: ["Trading capital ($1k min, $10k+ better)", "Computer", "Trading platform", "Charting software", "Fast internet", "Multiple monitors (helpful)", "Journal"],
      successFactors: ["Risk management (most important)", "Emotional discipline", "Follow system", "Small position sizes", "Journal trades", "Realistic expectations", "Have backup income (most fail)"]
    }
  },

  webDesigner: {
    name: "Web Designer (No-Code)",
    emoji: "🌐",
    category: "Creative/Tech",
    personalityFit: ["creative", "detail-oriented", "client-focused", "tech-savvy"],
    skillsRequired: ["design sense", "no-code tools", "UX principles", "client management"],
    incomeRange: [3000, 20000],
    startupCost: [100, 2000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible and remote",
    riskLevel: "low",
    educationRequired: "none (skill-based)",
    physicalDemand: "very low",
    description: "Build websites using no-code tools (Webflow, Wix, Squarespace). Easier than coding. High demand from small businesses. Can make $2-8k per website. Fully remote.",
    detailed: {
      whoYouAre: "You have design sense but don't want to code. You want to build websites fast. You're comfortable with tech. You want remote work. Small businesses need websites - huge market.",
      whatToDo: "Learn no-code tool (Webflow best for clients, Squarespace easiest). Study web design principles. Build portfolio sites (free for friends/family). Market on social media. Land first client ($1-3k). Deliver fast. Get testimonials. Raise prices. Scale.",
      firstYear: "Months 1-2: Learn tool. Months 3-4: Build portfolio. Months 5-6: First clients 1-2 sites/month at $1-2k. Months 7-12: $4-8k/month. Year 2: $8-20k/month.",
      income: "Per site: $1-8k depending on complexity. Freelance: $3-15k/month. Agency model: $15-50k/month. Recurring maintenance: +$100-500/site/month.",
      dailyLife: "Client calls → design mockups → build in no-code tool → revisions → launch → collect payment → repeat. Add monthly maintenance for recurring revenue.",
      prosAndCons: "PROS: Easier than coding, fast to build, high demand (small businesses), remote work, good pay, creative. CONS: Client revisions, competitive, need design skills, tool limitations, need constant marketing.",
      bestNiches: ["Small business websites", "Restaurants/local businesses", "E-commerce (Shopify)", "Landing pages", "Coaches/consultants", "Real estate agents", "Memberships/courses"],
      skillsToLearn: ["Webflow/no-code tool", "Web design principles", "UX/UI basics", "Copywriting basics", "SEO fundamentals", "Client management", "Marketing yourself"],
      tools: ["Computer", "Webflow/Squarespace/Wix", "Figma (design mockups)", "Domain/hosting", "Portfolio website", "Project management"],
      successFactors: ["Strong portfolio", "Fast turnaround", "Client communication", "Marketing (social media)", "Testimonials", "Niche down", "Add recurring maintenance revenue"]
    }
  },

  barber: {
    name: "Barber/Men's Stylist",
    emoji: "💈",
    category: "Personal Services",
    personalityFit: ["social", "artistic", "entrepreneurial", "consistent"],
    skillsRequired: ["cutting skills", "customer service", "trend awareness", "business sense"],
    incomeRange: [3000, 15000],
    startupCost: [1000, 50000], // barber school to opening shop
    timeToProfit: "3-12 months",
    lifestyle: "flexible and social",
    riskLevel: "low",
    educationRequired: "barber school (3-12 months) + license",
    physicalDemand: "medium",
    description: "Cut hair, build clientele, potentially own barbershop. Cash business, loyal customers, social work environment. Can make $60-180k/year. Instagram culture = barbering is booming.",
    detailed: {
      whoYouAre: "You're social and love talking to people. You have artistic/creative side. You like working with your hands. You want to build your own client base and maybe own a shop. Standing all day doesn't bother you.",
      whatToDo: "Attend barber school (3-12 months, $5-20k). Get licensed. Start at established shop (booth rent or commission). Build Instagram showing your work. Build loyal clientele. Charge more as you get better. Eventually: senior barber ($50-100/cut) or open own shop. Cash tips = significant income.",
      firstYear: "Months 1-6: Barber school. Months 7-9: New barber $25-40k. Months 10-12: Building clientele $35-60k. Year 2: Established $50-80k. Year 5+: $70-120k. Own shop: $80-180k.",
      income: "Starting: $20-30/cut, maybe 3-5 cuts/day = $2-3k/month. Established: $40-70/cut, 5-8 cuts/day = $5-10k/month. High-end: $80-150/cut = $10-20k/month. Cash tips add 15-30%.",
      dailyLife: "Arrive at shop → cut hair (30-60 min per client) → chat/build relationships → post work on IG → manage bookings → repeat. Standing all day. Weekend/evening hours common but can set own schedule.",
      prosAndCons: "PROS: Social/fun, creative, loyal clients, cash tips, flexible schedule, own business potential, no college needed, Instagram marketing works great, recession-resistant (everyone needs haircuts). CONS: Standing all day (feet/back pain), repetitive motions (carpal tunnel risk), small talk fatigue, weekend/evening work, booth rent eats into income early on.",
      bestNiches: ["Men's cuts/fades (most common)", "Beard grooming specialist", "High-end/luxury barber", "Mobile barber (house calls)", "Own multi-chair shop", "Celebrity/influencer clients", "Barbershop + product line"],
      skillsToLearn: ["Clipper techniques (fades crucial)", "Scissor cuts", "Beard trimming/shaping", "Straight razor shaves", "Customer service/conversation", "Instagram marketing", "Booking management", "Shop management (if owning)"],
      tools: ["Barber license", "Clippers ($200-500)", "Scissors/shears", "Straight razor", "Chair/station", "Cape/tools", "Booth rent (if renting)", "Instagram presence (critical for marketing)"],
      successFactors: ["Master fades/trends", "Build Instagram portfolio", "Consistency (show up)", "Customer experience (conversation + skill)", "Loyalty program", "Raise prices as you improve", "Location (busy shop or own)", "Eventually own shop for max income"]
    }
  },

  tattooArtist: {
    name: "Tattoo Artist",
    emoji: "🎨",
    category: "Creative/Personal Services",
    personalityFit: ["artistic", "detail-oriented", "patient", "bold"],
    skillsRequired: ["drawing/art", "tattoo techniques", "customer interaction", "steady hands"],
    incomeRange: [3000, 30000],
    startupCost: [2000, 100000], // apprenticeship to owning shop
    timeToProfit: "12-36 months",
    lifestyle: "flexible and creative",
    riskLevel: "medium",
    educationRequired: "apprenticeship (1-3 years) + license",
    physicalDemand: "medium",
    description: "Permanent art on skin. Apprenticeship required (often unpaid/low pay for 1-2 years). Once established, make $100-500/hour. Build Instagram following = fully booked. Can own shop.",
    detailed: {
      whoYouAre: "You're an artist - drawing is your thing. You have incredibly steady hands. You're okay with blood/needles. You want creative career with high income potential. You're patient - apprenticeship is tough (essentially hazing). You're comfortable around all types of people.",
      whatToDo: "Build art portfolio. Find shop that takes apprentices (hard - expect rejection). Apprentice for 1-3 years (often unpaid, basically hazing but necessary). Learn technique, sanitation, client interaction. Get licensed. Start tattooing. Build Instagram. Develop unique style. Build clientele. Eventually: established artist ($150-400/hour) or own shop.",
      firstYear: "Years 1-2: Apprentice ($0-20k, essentially paying dues). Year 3: Junior artist $30-50k. Year 4-5: Established $60-120k. Year 7+: In-demand artist $100-250k. Own shop: $150-400k.",
      income: "Apprentice: $0-20k (painful). Junior: $50-100/hour, few clients = $3-5k/month. Established: $150-300/hour, booked = $10-20k/month. Famous/niche: $300-600/hour = $20-50k/month. Can work 3-4 days and make $10k+/week.",
      dailyLife: "Morning: prep station (sterilize everything) → consult clients → design custom piece or apply stencil → tattoo (1-8 hours depending on piece) → aftercare instructions → clean up → post work on IG → repeat. Can work 3-5 days/week when established.",
      prosAndCons: "PROS: Highly creative, excellent pay when established, flexible schedule (3-4 day weeks), permanent art, Instagram marketing works, loyal clients, own shop potential, always learning. CONS: Brutal apprenticeship (1-3 years low/no pay), blood/needles, repetitive motions (back/neck/wrist issues), demanding clients, need constant portfolio building, competitive, client cancellations.",
      bestNiches: ["Black & grey realism (popular)", "Traditional/American traditional", "Japanese", "Watercolor", "Fine line", "Portraits", "Geometric/dotwork", "Cover-ups (always needed)", "Own shop"],
      skillsToLearn: ["Drawing/art fundamentals", "Tattoo machine techniques", "Shading/coloring", "Line work", "Sanitation/safety (critical)", "Skin types/healing", "Client consultation", "Instagram content", "Shop management (if owning)"],
      tools: ["Tattoo machines ($200-2k)", "Power supply", "Needles", "Ink", "Sanitation equipment", "Station setup", "License", "Chair", "Art supplies", "Instagram (critical for booking)", "Shop space (if owning)"],
      successFactors: ["Survive apprenticeship", "Develop unique style", "Master technique", "Build Instagram following (10k+ = fully booked)", "Network with other artists", "Customer experience", "Consistency", "Specialize in style that pays", "Eventually own shop"]
    }
  },

  realEstateInvestor: {
    name: "Real Estate Investor",
    emoji: "🏘️",
    category: "Investment/Business",
    personalityFit: ["strategic", "risk-tolerant", "patient", "financially-savvy"],
    skillsRequired: ["financial analysis", "market knowledge", "negotiation", "property management"],
    incomeRange: [0, 100000],
    startupCost: [15000, 500000], // down payments, rehab costs
    timeToProfit: "6-60 months",
    lifestyle: "flexible but hands-on initially",
    riskLevel: "high",
    educationRequired: "none (knowledge required)",
    physicalDemand: "low to medium",
    description: "Buy rental properties, flip houses, wholesale deals. Can build serious wealth. Need capital to start. Rental income = passive money. Flipping = active income. Can scale to 10+ properties = $10-50k/month cashflow.",
    detailed: {
      whoYouAre: "You want to build wealth, not just income. You have or can get capital (save, partners, hard money loans). You're strategic and can analyze deals. You're okay with risk and problems (tenants, repairs). You play long game - real estate = wealth over time.",
      whatToDo: "Learn (BiggerPockets, books, YouTube). Save for down payment (3.5-25%). Analyze deals (100+ before buying). Buy first rental (house hack = live in one unit, rent others). Learn property management. Refinance/repeat (BRRRR method). Or flip houses (buy distressed, renovate, sell). Scale to 5-10+ properties = financial freedom.",
      firstYear: "Year 1: Learning + saving. Year 2: First property, maybe $200-500/month cashflow. Year 3-4: 2-4 properties, $1-3k/month. Year 5-7: 5-10 properties, $3-10k/month. Year 10+: 10-30 properties, $10-50k/month passive. Flipping: $20-60k profit per flip.",
      income: "Per rental: $200-800/month cashflow. 5 properties: $1-4k/month. 10 properties: $2-8k/month. 20+ properties: $5-20k+/month. Flips: $20-80k profit per flip (2-4 per year = $40-240k/year). Appreciation builds wealth long-term.",
      dailyLife: "Analyze deals → view properties → negotiate → close → renovate (if needed) → find tenants → manage (or hire PM) → handle issues → refinance → repeat. Can be passive with property manager once established.",
      prosAndCons: "PROS: Build real wealth (equity + cashflow), passive income, appreciation, tax benefits, leverage (use bank's money), can quit job, scale infinitely. CONS: Need capital, tenant issues, repairs, market risk, illiquid, time intensive early on, vacancies, learning curve steep.",
      bestNiches: ["Single family rentals (easiest start)", "House hacking (live in + rent out)", "Small multifamily (2-4 units)", "Flipping (active income)", "BRRRR method (buy, rehab, rent, refinance, repeat)", "Short-term rentals (Airbnb)", "Wholesaling (no capital needed)"],
      skillsToLearn: ["Deal analysis (critical)", "Real estate finance", "Property management", "Negotiation", "Renovation (if flipping)", "Market analysis", "Tax strategies", "Tenant screening", "Systems/processes"],
      tools: ["Capital (down payments)", "Real estate agent/network", "Contractors (if renovating)", "Property management (self or hire)", "LLC/insurance", "Calculator/analysis spreadsheet", "BiggerPockets account"],
      successFactors: ["Analyze 100 deals before buying", "Buy right (deal analysis)", "Good financing", "Systems for management", "Screen tenants well", "Maintenance fund", "Scale methodically", "Play long game (wealth, not quick money)"]
    }
  },

  personalTrainerOnline: {
    name: "Online Fitness Coach",
    emoji: "💪",
    category: "Health & Fitness",
    personalityFit: ["motivational", "disciplined", "marketing-savvy", "results-driven"],
    skillsRequired: ["fitness knowledge", "program design", "sales/marketing", "client management"],
    incomeRange: [2000, 40000],
    startupCost: [0, 5000],
    timeToProfit: "1-12 months",
    lifestyle: "flexible and remote",
    riskLevel: "medium",
    educationRequired: "certification helpful but not required",
    physicalDemand: "medium",
    description: "Train clients online via apps/video. Way more scalable than in-person. Can train 20-50 clients at once. Build social media following = endless clients. Some coaches make $50k+/month. Location independent.",
    detailed: {
      whoYouAre: "You're fit and love fitness. You understand this is more marketing than training - you need to sell yourself online. You're comfortable on camera/social media. You want location freedom and scalability (in-person = 1:1, online = 1:many).",
      whatToDo: "Get certified (NASM, ACE - not required but helps credibility). Get in great shape yourself (you're the product). Build social media (post transformation, workouts, tips). Offer free challenge to build email list. Launch program ($100-300/month per client). Scale with ads or continue organic content. Upsell group coaching or courses.",
      firstYear: "Months 1-3: Build social media + get in shape. Months 4-6: First 5-10 clients at $100-200/month = $1-2k. Months 7-12: 15-30 clients = $3-8k/month. Year 2: 30-50 clients + group programs = $10-25k/month. Top coaches: $50-200k/month.",
      income: "Per client: $100-500/month. 20 clients: $2-6k/month. 50 clients: $5-15k/month. Group coaching: $50-100/person, 100 people = $5-10k/month. Courses: $200-2k one-time, sell 50/month = $10-100k/month. Top coaches: $50k-200k/month.",
      dailyLife: "Morning workout (create content) → client check-ins → program design → sales calls → create content (reels, posts) → email marketing → coaching calls → repeat. Much of it can be systematized/automated.",
      prosAndCons: "PROS: Highly scalable (50+ clients possible), work from anywhere, good money, help people transform, passive elements (courses), no gym needed. CONS: Saturated market, constant content creation, need strong social media, client accountability issues, income tied to social media algorithms.",
      bestNiches: ["Women's body transformation (huge market)", "Men's muscle building", "Busy professionals (30-40s)", "Postpartum/moms", "Over 40/50 transformations", "Specific sport training", "Meal planning included"],
      skillsToLearn: ["Program design", "Nutrition basics", "Sales/marketing (critical)", "Content creation (IG/TikTok)", "Copywriting", "Email marketing", "Client onboarding systems", "Facebook ads (for scaling)"],
      tools: ["Certification (optional)", "Coaching app (TrueCoach, MyPTHub)", "Phone (content creation)", "Email platform", "Website/landing page", "Video call software", "Social media presence (essential)"],
      successFactors: ["Get in great shape (you're the proof)", "Post consistently (daily)", "Show client transformations", "Email list building", "Sales skills", "Systematize client delivery", "Offer irresistible transformation", "Scale with ads or courses"]
    }
  },

  chiropractor: {
    name: "Chiropractor",
    emoji: "🦴",
    category: "Healthcare",
    personalityFit: ["helpful", "entrepreneurial", "personable", "detail-oriented"],
    skillsRequired: ["chiropractic technique", "diagnosis", "patient care", "business management"],
    incomeRange: [8000, 35000],
    startupCost: [200000, 400000], // chiropractic school debt + practice startup
    timeToProfit: "96 months", // undergrad + chiro school
    lifestyle: "structured but own schedule",
    riskLevel: "low",
    educationRequired: "bachelor's + chiropractic school (Doctor of Chiropractic) + license",
    physicalDemand: "medium",
    description: "Adjust spines, treat musculoskeletal issues. Own your practice = $150-400k/year. Massive school debt ($200-300k) but good earning potential. 4-day work weeks common. Help people without drugs/surgery.",
    detailed: {
      whoYouAre: "You want to help people with pain but don't want to be an MD (less school/debt than doctor). You're okay with 7-8 years of school and $200-300k debt. You want to own your own practice. You're entrepreneurial - owning practice = managing business. You're physically capable (adjustments require strength).",
      whatToDo: "4-year undergrad → 4-year chiropractic school (expensive, $150-300k debt) → pass boards → work as associate chiropractor ($60-100k) OR open own practice immediately (risky). Build patient base. Marketing crucial. Eventually own thriving practice ($150-400k). Can work 3-4 days/week when established.",
      firstYear: "Years 1-8: School (massive debt accumulation). Year 9: Associate $60-90k OR own practice (slow start, $40-80k). Year 10-12: Established practice $120-200k. Year 15+: Mature practice $150-400k. Debt payoff takes 10-15 years.",
      income: "Associate: $60-100k. New practice: $60-120k (slow build). Established practice: $150-300k. High-volume practice: $250-500k. Cash pay (no insurance) = higher profit. Can work 3-4 day weeks.",
      dailyLife: "Morning consults → patient adjustments (15-30 min each) → new patient exams → X-rays/diagnosis → treatment plans → manage staff (if owner) → marketing/community outreach → repeat. Physical work but not grueling. 4-day weeks common.",
      prosAndCons: "PROS: Own business, good income, help people, 4-day weeks possible, no overnight calls, respected, insurance or cash pay models. CONS: Massive debt ($200-300k school), physical toll (repetitive motions), marketing crucial (competitive), insurance hassles, controversial in medical community, requires business skills.",
      bestNiches: ["Family practice (most common)", "Sports chiropractic", "Pediatric", "Personal injury (insurance pays well)", "Cash-only practice (no insurance)", "Wellness center (multidisciplinary)", "Multiple locations"],
      skillsToLearn: ["Chiropractic techniques", "Diagnosis/exam", "X-ray interpretation", "Patient communication", "Business management (critical)", "Marketing (SEO, Facebook ads)", "Staff management", "Insurance billing OR cash-pay sales"],
      tools: ["Chiropractic license", "Practice location (lease)", "Adjusting table ($2-5k)", "X-ray machine (optional, $20-50k)", "Staff", "Billing software", "Marketing budget", "Liability insurance"],
      successFactors: ["Location (high traffic area)", "Marketing (critical - very competitive)", "Patient experience", "Results (word of mouth)", "Accept insurance OR strong cash-pay sales", "Hire associate docs to scale", "Community involvement", "Manage debt aggressively"]
    }
  },

  massageTherapist: {
    name: "Massage Therapist",
    emoji: "💆",
    category: "Health & Wellness",
    personalityFit: ["nurturing", "empathetic", "physically-strong", "entrepreneurial"],
    skillsRequired: ["massage techniques", "anatomy knowledge", "customer service", "physical strength"],
    incomeRange: [3000, 12000],
    startupCost: [10000, 50000], // school to owning practice
    timeToProfit: "6-18 months",
    lifestyle: "flexible but physically demanding",
    riskLevel: "low",
    educationRequired: "massage therapy program (6-12 months) + license",
    physicalDemand: "very high",
    description: "Therapeutic/relaxation massage. Quick training (6-12 months), get licensed, start earning. Can work at spa, chiropractor office, or own practice. $60-150/hour. Hard on body long-term but good income.",
    detailed: {
      whoYouAre: "You like helping people feel better. You're physically strong (massage is exhausting). You're empathetic and nurturing. You want quick training and start earning fast. You're okay with physical toll (this job is hard on hands/wrists/back long-term). You want flexibility.",
      whatToDo: "Complete massage therapy program (6-12 months, $10-20k). Pass licensing exam. Get liability insurance. Start at spa/chiropractor ($20-40/hour + tips) OR go solo/mobile ($60-120/hour). Build clientele. Get regulars (subscription model). Eventually own spa or go fully mobile/private practice.",
      firstYear: "Months 1-6: School. Months 7-9: Entry level $30-45k/year. Months 10-12: Building clients $40-60k. Year 2: Established $50-75k. Year 5: Own practice/mobile $70-120k. Limited by physical capacity (can only do 4-6 massages/day max).",
      income: "Spa employee: $20-40/hour + tips = $40-70k/year. Independent: $60-120/hour, 4-6 clients/day, 4-5 days/week = $5-12k/month. Subscription clients (weekly regulars) = stable income. Tips add 15-30%.",
      dailyLife: "Setup room → massage client (60-90 min) → cleanup → short break (hands need rest) → repeat. 4-6 massages max per day (physically exhausting). Own practice = set own hours. Evenings/weekends often busiest.",
      prosAndCons: "PROS: Quick training, help people, good hourly rate, flexible schedule, own practice potential, tips, recession-resistant. CONS: Very hard on body (hands, wrists, back, shoulders), limited capacity (only 4-6/day), standing all day, intimate work (boundaries needed), income plateaus (limited by time/physical capacity).",
      bestNiches: ["Deep tissue (high demand)", "Sports massage (athletes pay well)", "Prenatal", "Lymphatic drainage", "Corporate chair massage (office events)", "Mobile massage (go to clients)", "Own spa/wellness center"],
      skillsToLearn: ["Swedish massage", "Deep tissue", "Sports massage", "Trigger point", "Anatomy/physiology", "Body mechanics (protect your body)", "Client communication", "Business/marketing (if solo)"],
      tools: ["License", "Massage table ($200-800)", "Linens/oils", "Liability insurance", "Portable table (if mobile)", "Music/ambiance", "Scheduling software", "Space (rent room or own)"],
      successFactors: ["Master technique", "Build regular clientele", "Subscription model (weekly regulars)", "Protect your body (proper technique)", "Specialize (sports, deep tissue = more $)", "Own practice or mobile", "Tips (provide great experience)", "Consider teaching/other income (body can't do this forever)"]
    }
  },

  constructionManager: {
    name: "Construction Manager/PM",
    emoji: "👷",
    category: "Construction/Trade",
    personalityFit: ["organized", "leadership", "problem-solver", "stress-resistant"],
    skillsRequired: ["project management", "construction knowledge", "budgeting", "communication"],
    incomeRange: [7000, 20000],
    startupCost: [0, 80000], // degree optional, can work up from trade
    timeToProfit: "48 months", // if degree, or 5-10 years working up
    lifestyle: "demanding but rewarding",
    riskLevel: "low",
    educationRequired: "degree in construction management OR work up from trade",
    physicalDemand: "medium",
    description: "Oversee construction projects - budget, schedule, crews, safety. Work up from trade or get degree. Make $90-250k/year. Stressful but well-paid. Can start own construction company.",
    detailed: {
      whoYouAre: "You're a natural leader and organizer. You can handle stress - projects have million things going wrong. You understand construction (either from degree or working trade). You like being on job sites but not doing physical labor yourself. You want high income without starting own company (yet).",
      whatToDo: "Two paths: (1) Get construction management degree → entry level PM → senior PM → superintendent. (2) Work trade (carpenter, electrician, etc) → foreman → superintendent → PM. Both work. Manage projects (timelines, budget, crews, inspections). Eventually: senior PM ($120-180k) or start own construction company.",
      firstYear: "Degree path - Year 5: Entry PM $60-80k. Year 7: PM $80-110k. Year 10: Senior PM/Super $110-160k. Trade path - Year 10: Foreman $60-80k. Year 15: Super/PM $90-140k. Own company: $150-500k.",
      income: "Entry PM: $60-80k. Mid PM: $80-120k. Senior PM: $110-160k. Superintendent: $100-180k. Own company: $150-500k. Bonuses common (project completion).",
      dailyLife: "Morning: walk job site → safety checks → coordinate crews (electricians, plumbers, framers, etc) → solve problems → client meetings → schedule/budget tracking → inspections → repeat. Office + field work. Long days (50-60 hours common).",
      prosAndCons: "PROS: Excellent pay, see tangible results (build things), respected, problem-solving, leadership, own company potential, always different projects. CONS: High stress (delays, budget overruns, client demands), long hours, responsible for everything, dealing with subcontractors, weather delays, liability.",
      bestNiches: ["Residential construction", "Commercial", "Industrial", "Remodeling/renovation", "Luxury homes (highest margins)", "Multi-family", "Own general contracting company"],
      skillsToLearn: ["Project management", "Budgeting/estimating", "Scheduling (Gantt charts)", "Construction methods", "Building codes", "Contract law", "Leadership", "Conflict resolution", "Software (Procore, etc)"],
      tools: ["Truck", "Computer/software", "Phone", "Hard hat/safety gear", "Project management software", "Blueprint reading skills", "Contractor license (if owning)", "Insurance"],
      successFactors: ["Communication (crews, clients, inspectors)", "Problem-solving (something always goes wrong)", "Budget management", "Build good subcontractor relationships", "Safety first", "Eventually start own company for max income"]
    }
  },

  eventPlanner: {
    name: "Event Planner",
    emoji: "🎉",
    category: "Creative Services",
    personalityFit: ["organized", "creative", "social", "detail-oriented"],
    skillsRequired: ["planning", "vendor management", "budgeting", "problem-solving"],
    incomeRange: [3000, 25000],
    startupCost: [500, 5000],
    timeToProfit: "3-12 months",
    lifestyle: "flexible but event-heavy",
    riskLevel: "medium",
    educationRequired: "none (experience-based)",
    physicalDemand: "medium",
    description: "Plan weddings, corporate events, parties. Creative + organizational. Wedding planners make $3-10k per wedding. Corporate events pay well. Need to juggle multiple events. Stressful day-of but rewarding.",
    detailed: {
      whoYouAre: "You're incredibly organized AND creative. You love bringing visions to life. You can handle stress - day-of events are chaos. You're social and good with people (clients, vendors). You want to work weekends (that's when events happen). You're detail-obsessed - one mistake ruins an event.",
      whatToDo: "Start by planning events for friends/family (build portfolio). Choose niche (weddings most profitable). Network with vendors (photographers, caterers, venues). Build Instagram/website. Land first client ($2-5k). Deliver flawlessly. Get testimonials/referrals. Raise prices. Eventually: luxury events ($10-50k+ per event) or own event planning company.",
      firstYear: "Months 1-3: Build portfolio (free/discounted events). Months 4-6: First paid events $1-3k each. Months 7-12: 2-3 events/month at $2-5k = $6-15k/month. Year 2: 3-5 events/month at $3-8k = $12-35k/month. Top planners: $50k+/month (luxury market).",
      income: "Per wedding: $2-10k (luxury weddings: $10-50k+). Corporate events: $3-20k. Plan 3-5 events/month = $6-40k/month. Season-dependent (summer = busy, winter = slow for weddings). Agency: $20-100k+/month.",
      dailyLife: "Client consultations → vendor coordination → budget tracking → timeline creation → site visits → design planning → last-minute problem solving → day-of execution (12-16 hour days) → repeat. Weekends = event days.",
      prosAndCons: "PROS: Creative work, see people's happiest moments, good money, flexible during week, build own business, meet interesting people, every event unique. CONS: Weekend work (always), incredibly stressful day-of, client demands, something always goes wrong, seasonal income (weddings), vendor coordination nightmare sometimes.",
      bestNiches: ["Wedding planning (most profitable)", "Corporate events", "Luxury/high-end events", "Destination weddings", "Non-profit galas", "Social events (birthdays, anniversaries)", "Full-service agency"],
      skillsToLearn: ["Project management", "Budgeting", "Vendor negotiation", "Design/aesthetics", "Problem-solving (critical)", "Time management", "Client communication", "Marketing (IG/Pinterest)", "Contract law"],
      tools: ["Computer", "Planning software (HoneyBook, Aisle Planner)", "Phone (constant communication)", "Website/portfolio", "Instagram presence", "Vendor network", "Contracts/templates", "Timeline templates"],
      successFactors: ["Impeccable organization", "Vendor relationships (critical)", "Portfolio/photos", "Client experience", "Problem-solving (day-of)", "Niche down (weddings or corporate)", "Pricing (don't undercharge)", "Referrals/word of mouth", "Instagram marketing"]
    }
  },

  pilot: {
    name: "Commercial Airline Pilot",
    emoji: "✈️",
    category: "Transportation",
    personalityFit: ["responsible", "calm-under-pressure", "detail-oriented", "adventurous"],
    skillsRequired: ["flying", "navigation", "decision-making", "technical knowledge"],
    incomeRange: [5000, 35000],
    startupCost: [80000, 150000], // flight training
    timeToProfit: "24-36 months",
    lifestyle: "unique schedule (days on/off blocks)",
    riskLevel: "low",
    educationRequired: "flight training + licenses (1500 hours minimum for airlines)",
    physicalDemand: "low",
    description: "Fly commercial aircraft. Expensive training ($80-150k) but major airline captains make $300-400k/year. Takes years to build hours. Lifestyle is unique - gone for days, then off for days. Travel benefits.",
    detailed: {
      whoYouAre: "You've always dreamed of flying. You're okay with $80-150k training debt and 2-5 years of low pay while building hours. You can handle being away from home (regional pilots gone 15+ days/month). You're meticulous - safety is everything. Long-term game - captains at major airlines make $300k+.",
      whatToDo: "Get private pilot license → instrument rating → commercial license → CFI (certified flight instructor) → instruct to build hours (1500 needed for airlines, takes 1-2 years) → regional airline first officer ($40-70k, tough life) → build time → major airline first officer ($100-200k) → captain ($200-400k).",
      firstYear: "Years 1-2: Training (accumulating debt). Years 3-4: Flight instructing $30-50k (building hours). Years 5-7: Regional airline FO $40-80k. Years 8-12: Major airline FO $100-180k. Years 13+: Captain $200-400k. Seniority = everything.",
      income: "CFI (building hours): $30-50k. Regional FO: $40-80k. Regional captain: $80-130k. Major airline FO: $100-180k. Major airline captain: $200-400k. Legacy carriers (United, Delta, American) pay most. Per diem adds $5-15k/year.",
      dailyLife: "Preflight checks → fly multiple legs → overnight in hotels → fly next day → home for days off. Schedule: work 15-18 days/month (blocks of 3-5 days on), rest of month off. Lifestyle unique - gone from home but also lots of time off.",
      prosAndCons: "PROS: Excellent pay (eventually), fly planes (!), travel benefits (free flights for family), unique schedule (work 15 days, off 15), seniority protections, respected career. CONS: Massive training debt, years of low pay building hours, away from home, regional airlines = brutal (low pay, poor conditions), medical exams (lose license if health fails), automation replacing jobs long-term.",
      bestNiches: ["Major airlines (United, Delta, American - best pay)", "Legacy carriers", "Cargo (FedEx, UPS - same pay, different schedule)", "Corporate/private (less pay but better lifestyle)", "International routes (long haul)", "Eventually captain (double pay)"],
      skillsToLearn: ["Flying (obviously)", "Instrument flying", "Navigation", "Weather interpretation", "Emergency procedures", "Crew resource management", "Aircraft systems", "Regulations (FAA)"],
      tools: ["Pilot licenses (PPL, instrument, commercial, ATP)", "Medical certificate", "Flight training ($80-150k)", "Logbook (track hours)", "Uniforms", "Continued education"],
      successFactors: ["Build hours fast (CFI job)", "Apply to regional ASAP (get seniority)", "Move to major airline ASAP", "Seniority = everything (pay, schedule, base choice)", "Stay healthy (medical required)", "Network in aviation", "Play long game (tough early, great later)"]
    }
  },

  firefighter: {
    name: "Firefighter/Paramedic",
    emoji: "🚒",
    category: "Public Service",
    personalityFit: ["brave", "team-player", "physically-fit", "service-oriented"],
    skillsRequired: ["emergency response", "medical skills", "physical fitness", "teamwork"],
    incomeRange: [4000, 12000],
    startupCost: [0, 10000], // EMT/paramedic training
    timeToProfit: "6-18 months",
    lifestyle: "24-hour shifts (48-96 hours off)",
    riskLevel: "low", // job security, not life risk
    educationRequired: "fire academy + EMT/paramedic certification",
    physicalDemand: "very high",
    description: "Fight fires, respond to emergencies, save lives. Excellent benefits, pension, job security. Unique schedule (24-hour shifts then 48-96 hours off). Overtime can double salary. Competitive to get hired.",
    detailed: {
      whoYouAre: "You want to help people and be a hero. You're physically fit and brave. You want job security, pension, and benefits over high salary. The schedule appeals to you (24 on, 48-72 off = lots of free time). You're a team player - firefighting = brotherhood. You're okay with danger.",
      whatToDo: "Get EMT-Basic ($1-2k, few months) → volunteer or paid EMT to build resume → fire academy (often paid by department) → get paramedic cert (preferred, $5-10k) → apply to departments (competitive) → get hired → firefighter/paramedic → eventually: engineer, captain, battalion chief.",
      firstYear: "Year 1-2: EMT/training. Year 3: First firefighter job $45-65k. Year 5: $60-80k. Year 10: $70-95k. Year 20: $80-110k + pension. Overtime easily adds $20-50k/year. Total comp with OT: $90-160k.",
      income: "Starting: $45-65k base. Mid-career: $65-90k base. Late career: $80-110k base. Overtime (common): +$20-50k. Captain/chief: $100-140k. Pension = 50-90% of final salary for life. Benefits worth $20-30k/year (health insurance, etc).",
      dailyLife: "24-hour shift: morning routine/clean station → training/drills → calls (fires, medical, car accidents) → cook meals together → sleep (interrupted by calls) → more calls → next morning go home → 48-72 hours off. Schedule: work 10 days/month.",
      prosAndCons: "PROS: Excellent benefits/pension, job security, help people, brotherhood/team, unique schedule (lots of time off), overtime opportunities, respected, sleep at work. CONS: Dangerous, see traumatic things (PTSD risk), physical toll (injuries common), competitive to get hired, boredom between calls, politics/hierarchy.",
      bestNiches: ["City fire department (busier, more action)", "Suburban (less busy, easier)", "Wildland firefighting (seasonal, adventure)", "Airport fire (high pay, less action)", "Industrial fire brigade", "Eventually promote: captain, chief"],
      skillsToLearn: ["Firefighting techniques", "EMT/paramedic skills (critical - 80% of calls are medical)", "Physical fitness", "Teamwork", "Equipment operation", "Hazmat", "Technical rescue", "Leadership (for promotion)"],
      tools: ["EMT/paramedic license", "Fire academy certification", "Physical fitness (pass test)", "Clean record (background check)", "Driver's license", "CPAT test pass (physical test)"],
      successFactors: ["Get paramedic cert (huge advantage hiring)", "Physical fitness", "Volunteer experience", "Clean background", "Network (know firefighters = insider referrals)", "Apply everywhere (competitive)", "Promote for higher pay", "Work overtime (easy extra $)"]
    }
  },

  uxDesigner: {
    name: "UX/UI Designer",
    emoji: "📱",
    category: "Tech/Design",
    personalityFit: ["creative", "analytical", "user-focused", "detail-oriented"],
    skillsRequired: ["design tools", "user research", "prototyping", "problem-solving"],
    incomeRange: [6000, 20000],
    startupCost: [0, 5000], // bootcamp optional
    timeToProfit: "3-12 months",
    lifestyle: "flexible and remote-friendly",
    riskLevel: "low",
    educationRequired: "portfolio-based (bootcamps work, degree optional)",
    physicalDemand: "very low",
    description: "Design app/website user experiences. Tech pay without coding. High demand. Remote work common. Bootcamp to job in 6-12 months. Senior UX designers make $120-200k+. Freelance or in-house.",
    detailed: {
      whoYouAre: "You love design AND problem-solving. You think about how people use things. You want tech pay without hardcore coding. You're empathetic - you think from user's perspective. Remote work appeals to you. You're creative but also analytical.",
      whatToDo: "Learn Figma (free). Study UX principles (free online). Complete bootcamp ($5-15k, 3-6 months) OR self-teach. Build portfolio (3-5 case studies redesigning apps). Apply to jobs (need 100+ applications). Land first job. Learn on job. Freelance on side. Senior level = $120-180k. Or freelance $80-200/hour.",
      firstYear: "Months 1-6: Learning + portfolio. Months 7-9: Job hunt (tough). Months 10-12: First job $65-85k. Year 2-3: Mid-level $85-120k. Year 5: Senior $120-180k. Staff/Principal: $180-250k. Freelance: $80-200/hour.",
      income: "Entry: $60-85k. Mid-level: $85-120k. Senior: $120-180k. Staff/Principal: $180-250k. FAANG: $200-400k (with equity). Freelance: $80-200/hour, $10-30k/month. Remote work very common.",
      dailyLife: "User research → wireframes → prototypes in Figma → usability testing → iterate → handoff to developers → meetings (lots) → repeat. Collaborate with product managers, engineers, researchers. Mostly screen work.",
      prosAndCons: "PROS: Tech pay, remote work, creative + analytical, see your designs used by millions (if big company), high demand, less stressful than engineering, portfolio-based (no degree required). CONS: Meeting-heavy, need to justify designs, depends on developers implementing correctly, portfolio required (takes time), competitive entry-level, gatekeeping in industry.",
      bestNiches: ["SaaS/B2B products", "Mobile apps", "E-commerce", "Fintech", "Healthcare tech", "Design systems (specialized)", "FAANG/big tech", "Freelance consulting"],
      skillsToLearn: ["Figma (critical)", "User research", "Wireframing/prototyping", "Visual design", "Information architecture", "Usability testing", "Design systems", "Communication (presenting work)"],
      tools: ["Figma (free)", "Adobe XD (optional)", "Computer", "Portfolio website", "Notion (case studies)", "Prototyping tools", "User testing platforms"],
      successFactors: ["Strong portfolio (3-5 case studies)", "Learn Figma inside-out", "Understand user psychology", "Communication skills (sell your designs)", "Network on Twitter/LinkedIn", "Job hunt persistence (100+ applications)", "Learn basic front-end (HTML/CSS) for credibility"]
    }
  },

  salesRep: {
    name: "Sales Representative (B2B)",
    emoji: "💼",
    category: "Sales",
    personalityFit: ["persuasive", "resilient", "competitive", "relationship-builder"],
    skillsRequired: ["communication", "persuasion", "relationship-building", "resilience"],
    incomeRange: [4000, 50000],
    startupCost: [0, 2000],
    timeToProfit: "1-6 months",
    lifestyle: "flexible but quota-driven",
    riskLevel: "medium",
    educationRequired: "none (results-based)",
    physicalDemand: "low",
    description: "Sell products/services to businesses. Commission-based = unlimited income. Tech sales reps make $150-500k+/year. SaaS sales particularly hot. Entry-level SDR → AE → Enterprise = $300k+. Need thick skin.",
    detailed: {
      whoYouAre: "You're competitive and driven by money. You can handle rejection - you'll hear 'no' 50 times before one 'yes'. You're persuasive and build rapport easily. You want unlimited earning potential - commission uncapped. You're okay with pressure - quotas are real.",
      whatToDo: "Start as SDR (Sales Development Rep) cold calling/emailing ($40-70k). Learn the game. Promote to AE (Account Executive) closing deals ($80-180k). Master sales. Move to enterprise sales ($150-400k+). Or industry hop for raises. Top performers = $300-500k+. Tech/SaaS pays most.",
      firstYear: "Year 1: SDR $45-70k (tough, lots of rejection). Year 2: AE $80-140k. Year 3-5: Senior AE/MM $120-220k. Year 7+: Enterprise AE $180-500k. Top 1% = $500k-1M+. All depends on closing deals.",
      income: "SDR: $45-70k (mostly base). AE: $80-180k (50/50 base/commission). Senior/Enterprise: $150-400k. Top performers: $300k-1M. Commission unlimited. Tech/SaaS pays 2-3x other industries.",
      dailyLife: "Prospecting (calls, emails) → demos/presentations → handle objections → negotiate → close deals → repeat. Meetings with leads. CRM data entry. Quota pressure. Hit quota = great. Miss quota = stress/fired.",
      prosAndCons: "PROS: Unlimited income (commission), remote common (tech sales), fast promotions (merit-based), learn business, transferable skills, meet interesting people, can job hop for raises. CONS: High pressure (quotas), constant rejection, competitive, can be fired for missing quota, income inconsistent, long sales cycles stressful.",
      bestNiches: ["SaaS/tech sales (highest pay)", "Medical device", "Enterprise software", "Cybersecurity", "Financial services", "Real estate (commercial)", "Staffing/recruiting"],
      skillsToLearn: ["Prospecting/cold outreach", "Discovery calls", "Demo presentation", "Objection handling", "Closing techniques", "CRM (Salesforce)", "Negotiation", "Resilience/mindset"],
      tools: ["Phone/computer", "CRM (Salesforce)", "LinkedIn Sales Navigator", "Email tools", "Video conferencing", "Sales training courses"],
      successFactors: ["High activity (more calls = more deals)", "Resilience (handle rejection)", "Learn product inside-out", "Relationship building", "Ask for referrals", "Work at company with good product (easier to sell)", "Tech/SaaS = highest pay", "Job hop every 2 years for raises"]
    }
  }
};

// Export to window for use in quiz
window.lifePaths = lifePaths;

export { lifePaths };
