/* ==========================================================================
   SITE CONTENT: the one file to edit.
   Real work from Valeria's Canva portfolio is already in. Items marked
   PLACEHOLDER still need her real details. No build step: save and refresh.
   ========================================================================== */

window.SITE = {
  /* ---- WhatsApp -------------------------------------------------------- */
  // PLACEHOLDER: international format, digits only (country code + number). e.g. "34612345678"
  whatsappNumber: "10000000000",
  whatsappMessage:
    "Hi Valeria! I just saw your portfolio and I'd love to talk about my brand's social media.",

  /* ---- Social profiles (PLACEHOLDER links) ---------------------------- */
  // icon: "instagram" | "tiktok" | "linkedin" | "youtube" | "pinterest"
  socials: [
    { label: "Instagram", icon: "instagram", url: "https://instagram.com/" },
    { label: "TikTok", icon: "tiktok", url: "https://tiktok.com/" },
    { label: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/" },
  ],

  /* ---- Page photos ----------------------------------------------------- */
  photos: {
    hero: "assets/media/work/valeria-portrait.jpg",
    aboutA: "assets/media/work/video-04.jpg",
    aboutB: "assets/media/work/campaign-03.jpg",
    aboutC: "assets/media/work/social-05.jpg",
    services: "assets/media/work/social-02.jpg",
    testimonialsBg: "assets/media/work/testimonials-bg.jpg",
    contactBg: "assets/media/work/contact-bg.jpg",
  },

  /* ---- "Backed by brands" stat boxes (PLACEHOLDER numbers) ------------ */
  highlights: [
    { value: "40+", label: "Brands" },
    { value: "12M+", label: "Organic views" },
    { value: "5 yrs", label: "Of experience" },
  ],

  /* ---- Brand names (PLACEHOLDER: replace with real clients) ----------- */
  brands: ["Maison Lune", "Nº 7 Skincare", "Oro Coffee", "Alma Swim", "Terra Living", "Kintsu"],

  /* ---- Skills & expertise (from the Canva portfolio) ------------------ */
  skills: [
    { title: "Social Media Management", items: ["Content Strategy", "Content Planning & Scheduling", "Community Management"] },
    { title: "Content Creation", items: ["Photography & Videography", "Video Editing", "Copywriting & Captions"] },
    { title: "Event Coverage", items: ["Event Photography & Videography", "Event Recaps"] },
  ],
  niches: "Health & Aesthetics · Wellness · Hospitality · Events",

  /* ---- "Content that performs" numbers (PLACEHOLDER) ------------------ */
  metrics: [
    { value: 320, prefix: "+", suffix: "%", label: "Avg. reach growth in 90 days" },
    { value: 12, suffix: "M+", label: "Organic views generated" },
    { value: 5.6, decimals: 1, suffix: "%", label: "Avg. engagement rate" },
    { value: 98, suffix: "%", label: "Client renewal rate" },
  ],

  /* ---- Charts (PLACEHOLDER data) -------------------------------------- */
  charts: {
    growth: {
      title: "Follower growth",
      note: "Example client · Instagram, thousands",
      unit: "K",
      points: [
        { label: "Jan", value: 4 }, { label: "Feb", value: 6 }, { label: "Mar", value: 9 },
        { label: "Apr", value: 15 }, { label: "May", value: 24 }, { label: "Jun", value: 33 },
        { label: "Jul", value: 41 }, { label: "Aug", value: 52 }, { label: "Sep", value: 61 },
      ],
    },
    platforms: {
      title: "Where the views come from",
      note: "Share of views across all clients",
      unit: "%",
      items: [
        { label: "Instagram", value: 54 }, { label: "TikTok", value: 31 },
        { label: "YouTube Shorts", value: 9 }, { label: "Other", value: 6 },
      ],
    },
    reach: {
      title: "Monthly reach",
      note: "Example client · all platforms, thousands",
      unit: "K",
      items: [
        { label: "Apr", value: 42 }, { label: "May", value: 68 }, { label: "Jun", value: 95 },
        { label: "Jul", value: 140 }, { label: "Aug", value: 188 }, { label: "Sep", value: 236 },
      ],
    },
  },
  performanceNote:
    "Content built around saves, shares and repeat views, the signals the algorithm rewards most, " +
    "so growth keeps compounding long after a post goes live.",

  /* ---- Social media shoot (from the Canva portfolio) ------------------ */
  social: {
    text: "Content shoots for an aesthetics clinic: treatments, technology and the team behind them, shot and edited for Instagram.",
    photos: [
      { src: "assets/media/work/social-01.jpg", client: "Aesthetics clinic", desc: "Facial treatment, detail shot." },
      { src: "assets/media/work/social-02.jpg", client: "Aesthetics clinic", desc: "Hydrating mask treatment." },
      { src: "assets/media/work/social-03.jpg", client: "Aesthetics clinic", desc: "Specialist at work." },
      { src: "assets/media/work/social-04.jpg", client: "Aesthetics clinic", desc: "Treatment technology." },
      { src: "assets/media/work/social-05.jpg", client: "Aesthetics clinic", desc: "Laser session with the team." },
      { src: "assets/media/work/social-06.jpg", client: "Aesthetics clinic", desc: "The treatment room." },
    ],
  },

  /* ---- Videos (from the Canva portfolio) ------------------------------ */
  // poster: cover image (9:16). src (optional): a self-hosted file ("assets/media/my-reel.mp4"),
  // a YouTube/Vimeo link (embedded), or an Instagram/TikTok post link (opens in a new tab).
  videoGroups: [{ id: "launch", caps: "Service launches for", script: "Brands" }],
  videos: [
    { group: "launch", client: "Psiquiatría", title: "Welcome to the future", desc: "Service launch video for a psychiatry practice.", metric: "Service launch", poster: "assets/media/work/video-01.jpg", src: "" },
    { group: "launch", client: "Esteticista", title: "Your skincare routine", desc: "Educational reel for an aesthetician.", metric: "Service launch", poster: "assets/media/work/video-02.jpg", src: "" },
    { group: "launch", client: "Psiquiatría", title: "Your first appointment", desc: "What to expect at a first psychiatry visit.", metric: "Service launch", poster: "assets/media/work/video-03.jpg", src: "" },
    { group: "launch", client: "Barra", title: "Fall cocktails", desc: "Seasonal menu launch for a cocktail bar.", metric: "Menu launch", poster: "assets/media/work/video-04.jpg", src: "" },
  ],

  /* ---- Campaign (from the Canva portfolio) ---------------------------- */
  campaign: {
    name: "Mother's Day",
    text: "A Mother's Day creative campaign concept, from art direction to final design.",
    photos: [
      { src: "assets/media/work/campaign-01.jpg", desc: "Hands, flowers and a quiet moment." },
      { src: "assets/media/work/campaign-02.jpg", desc: "The bouquet and the handwritten card." },
      { src: "assets/media/work/campaign-03.jpg", desc: "Mother and daughter, the hero shot." },
      { src: "assets/media/work/campaign-04.jpg", desc: "The “Mamá” card, styled detail." },
      { src: "assets/media/work/campaign-05.jpg", desc: "A single gerbera, closing frame." },
    ],
  },

  /* ---- Case studies (PLACEHOLDER) ------------------------------------- */
  cases: [
    { client: "Aesthetics clinic", industry: "Health & Aesthetics", challenge: "Great treatments, but a feed that didn't show the experience.", kpi: "Followers", from: "4K", to: "61K", time: "in 9 months" },
    { client: "Psychiatry practice", industry: "Health", challenge: "A new service that patients needed explained, warmly and clearly.", kpi: "Booked consults", from: "12", to: "40", time: "per month" },
    { client: "Cocktail bar", industry: "Hospitality", challenge: "A seasonal menu launch that needed to fill tables fast.", kpi: "Engagement", from: "0.9%", to: "5.6%", time: "in 6 months" },
  ],

  /* ---- Packages (PLACEHOLDER prices) ---------------------------------- */
  packages: [
    {
      name: "Essential", price: "$900", per: "/ month", featured: false,
      tagline: "Show up consistently.",
      items: ["1 platform managed", "12 posts / month incl. 4 reels", "Content planning & captions", "Monthly performance report"],
    },
    {
      name: "Signature", price: "$1,800", per: "/ month", featured: true,
      tagline: "Full management + original content.",
      items: ["2 platforms managed", "20 posts / month incl. 8 reels", "Monthly photo & video shoot", "Community management", "Strategy calls"],
    },
    {
      name: "Studio", price: "$3,200", per: "/ month", featured: false,
      tagline: "Your complete content department.",
      items: ["Up to 4 platforms", "Service & product launch videos", "Seasonal campaigns, concept to design", "Event coverage & recaps", "Priority WhatsApp line"],
    },
  ],

  /* ---- Testimonials (PLACEHOLDER) ------------------------------------- */
  testimonials: [
    { quote: "Valeria understood our clinic right away. Our content finally shows what it feels like to be treated here.", name: "Client name", role: "Aesthetics clinic" },
    { quote: "The launch videos explained our new service better than we ever could. Patients mention them at their first visit.", name: "Client name", role: "Psychiatry practice" },
    { quote: "Our fall menu sold out the first weekend. The cocktail video did all the work.", name: "Client name", role: "Cocktail bar" },
  ],
};
