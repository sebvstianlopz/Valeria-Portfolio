/* ==========================================================================
   SITE CONTENT: the one file to edit.
   Swap the placeholders below with Valeria's real work. No build step needed:
   save the file, refresh the page.
   ========================================================================== */

window.SITE = {
  /* ---- WhatsApp -------------------------------------------------------- */
  // International format, digits only (country code + number). e.g. "34612345678"
  whatsappNumber: "10000000000",
  // Message pre-filled when someone taps a general "Let's talk" button.
  whatsappMessage:
    "Hi Valeria! I just saw your portfolio and I'd love to talk about my brand's social media.",

  /* ---- Social profiles ------------------------------------------------- */
  // icon: "instagram" | "tiktok" | "linkedin" | "youtube" | "pinterest"
  socials: [
    { label: "Instagram", icon: "instagram", url: "https://instagram.com/" },
    { label: "TikTok", icon: "tiktok", url: "https://tiktok.com/" },
    { label: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/" },
  ],

  /* ---- Page photos (replace the files, or point to new ones) ---------- */
  photos: {
    hero: "assets/media/photos/hero.svg",                       // 4:5, ~1200×1500
    about: "assets/media/photos/about.svg",                     // 4:5, ~800×1000
    services: "assets/media/photos/services.svg",               // 3:4, ~900×1200
    testimonialsBg: "assets/media/photos/testimonials-bg.svg",  // 16:9, ~2400×1350
    contactBg: "assets/media/photos/contact-bg.svg",            // 16:9, ~2400×1350
  },

  /* ---- "Backed by brands" stat boxes ---------------------------------- */
  highlights: [
    { value: "40+", label: "Brands" },
    { value: "12M+", label: "Organic views" },
    { value: "5 yrs", label: "Of experience" },
  ],

  /* ---- Brand names (shown as wordmarks; swap for logo images later) --- */
  brands: ["Maison Lune", "Nº 7 Skincare", "Oro Coffee", "Alma Swim", "Terra Living", "Kintsu"],

  /* ---- Niches & services pills ---------------------------------------- */
  services: [
    "Social Media Management", "Content Strategy", "Reels & TikTok", "Brand Films",
    "UGC Content", "Product Photography", "Community Management", "Paid Social Creative",
  ],

  /* ---- "Content that performs" headline numbers (count up) ------------ */
  metrics: [
    { value: 320, prefix: "+", suffix: "%", label: "Avg. reach growth in 90 days" },
    { value: 12, suffix: "M+", label: "Organic views generated" },
    { value: 5.6, decimals: 1, suffix: "%", label: "Avg. engagement rate" },
    { value: 98, suffix: "%", label: "Client renewal rate" },
  ],

  /* ---- Charts --------------------------------------------------------- */
  charts: {
    growth: {
      title: "Follower growth",
      note: "Maison Lune · Instagram, thousands",
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
      note: "Oro Coffee · all platforms, thousands",
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

  /* ---- Videos ---------------------------------------------------------- */
  // category: "paid" (paid social / ads) or "organic" (organic concepts)
  // poster: thumbnail image (a frame from the video, 9:16).
  // src (optional): a self-hosted file ("assets/media/my-reel.mp4"), a YouTube or Vimeo
  //   link (embedded), or an Instagram/TikTok post link (opens in a new tab).
  videos: [
    { category: "paid", client: "Alma Swim", title: "Summer drop", desc: "Launch ad set for the new collection.", metric: "Sold out in 48h", poster: "assets/media/reel-01.svg", src: "" },
    { category: "paid", client: "Nº 7 Skincare", title: "The ritual", desc: "Hero film cut into 24 ad variations.", metric: "−42% CPA", poster: "assets/media/reel-02.svg", src: "" },
    { category: "paid", client: "Velvet & Co.", title: "Holiday edit", desc: "Gift-guide ads for the holiday season.", metric: "3.1× ROAS", poster: "assets/media/reel-03.svg", src: "" },
    { category: "paid", client: "Bloom Studio", title: "Unboxing, honestly", desc: "UGC-style ads with real customers.", metric: "4.8% CTR", poster: "assets/media/reel-04.svg", src: "" },
    { category: "organic", client: "Maison Lune", title: "Golden hour", desc: "Weekly reel series for the brand feed.", metric: "1.4M views", poster: "assets/media/reel-05.svg", src: "" },
    { category: "organic", client: "Oro Coffee", title: "Behind the roast", desc: "Day-in-the-life storytelling.", metric: "920K views", poster: "assets/media/reel-06.svg", src: "" },
    { category: "organic", client: "Terra Living", title: "Slow mornings", desc: "Lifestyle concept for home goods.", metric: "38K shares", poster: "assets/media/reel-07.svg", src: "" },
    { category: "organic", client: "Kintsu", title: "Made by hand", desc: "Process video for a ceramics studio.", metric: "2.2M views", poster: "assets/media/reel-08.svg", src: "" },
  ],

  /* ---- Photography ----------------------------------------------------- */
  // category: "paid" or "organic" · src: the photo itself (4:5 works best)
  photography: [
    { category: "paid", client: "Nº 7 Skincare", desc: "Product hero for paid social.", src: "assets/media/photos/photo-01.svg" },
    { category: "paid", client: "Alma Swim", desc: "Campaign still for the summer drop.", src: "assets/media/photos/photo-02.svg" },
    { category: "paid", client: "Oro Coffee", desc: "Menu launch creative.", src: "assets/media/photos/photo-03.svg" },
    { category: "paid", client: "Velvet & Co.", desc: "Gift-guide product flat lay.", src: "assets/media/photos/photo-04.svg" },
    { category: "organic", client: "Maison Lune", desc: "Lifestyle shoot for the feed.", src: "assets/media/photos/photo-05.svg" },
    { category: "organic", client: "Terra Living", desc: "Interior styling series.", src: "assets/media/photos/photo-06.svg" },
    { category: "organic", client: "Kintsu", desc: "Studio and process details.", src: "assets/media/photos/photo-07.svg" },
    { category: "organic", client: "Bloom Studio", desc: "Behind-the-scenes content.", src: "assets/media/photos/photo-08.svg" },
  ],

  /* ---- Case studies ---------------------------------------------------- */
  cases: [
    { client: "Maison Lune", industry: "Fashion", challenge: "A beautiful product with a quiet feed and posts that vanished in hours.", kpi: "Followers", from: "4K", to: "61K", time: "in 9 months" },
    { client: "Nº 7 Skincare", industry: "Beauty", challenge: "A new line launching against brands with ten times the budget.", kpi: "Cost per sale", from: "$38", to: "$22", time: "in 1 launch" },
    { client: "Oro Coffee", industry: "Hospitality", challenge: "A loved café with no time to post and no clear voice online.", kpi: "Engagement", from: "0.9%", to: "5.6%", time: "in 6 months" },
  ],

  /* ---- Packages ------------------------------------------------------- */
  packages: [
    {
      name: "Essential", price: "$900", per: "/ month", featured: false,
      tagline: "Show up consistently.",
      items: ["1 platform managed", "12 posts / month incl. 4 reels", "Content calendar & captions", "Monthly performance report"],
    },
    {
      name: "Signature", price: "$1,800", per: "/ month", featured: true,
      tagline: "Full management + original video.",
      items: ["2 platforms managed", "20 posts / month incl. 8 reels", "Monthly on-location shoot", "Product & lifestyle photography", "Community management"],
    },
    {
      name: "Studio", price: "$3,200", per: "/ month", featured: false,
      tagline: "Your complete content department.",
      items: ["Up to 4 platforms", "Brand film + short-form cut-downs", "Paid social creative & testing", "UGC & creator coordination", "Priority WhatsApp line"],
    },
  ],

  /* ---- Testimonials --------------------------------------------------- */
  testimonials: [
    { quote: "Valeria didn't just make our feed beautiful, she made it sell. We sold out our summer collection in two days.", name: "Lucía M.", role: "Founder, Alma Swim" },
    { quote: "For the first time our content feels like us. People actually stop to watch, and then they buy.", name: "Daniel R.", role: "Marketing Lead, Nº 7 Skincare" },
    { quote: "I handed over social media completely and got my evenings back. The numbers keep going up every month.", name: "Sofía T.", role: "Owner, Oro Coffee" },
  ],
};
