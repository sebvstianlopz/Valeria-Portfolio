/* ==========================================================================
   SITE CONTENT — the one file to edit.
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

  /* ---- Social profiles (footer) --------------------------------------- */
  socials: [
    { label: "Instagram", url: "https://instagram.com/" },
    { label: "TikTok", url: "https://tiktok.com/" },
    { label: "LinkedIn", url: "https://linkedin.com/" },
  ],

  /* ---- Brands strip (plain names render as elegant wordmarks) --------- */
  brands: [
    "Maison Lune", "Atelier Sol", "Nº 7 Skincare", "Casa Verde", "Oro Coffee",
    "Bloom Studio", "Terra Living", "Alma Swim", "Kintsu", "Velvet & Co.",
  ],

  /* ---- Headline results (count up when they scroll into view) --------- */
  // value: number to count to · prefix/suffix: text around it · label: caption
  metrics: [
    { value: 320, prefix: "+", suffix: "%", label: "Average growth in reach within 90 days" },
    { value: 12, suffix: "M+", label: "Organic views generated for clients" },
    { value: 40, suffix: "+", label: "Brands managed across 6 industries" },
    { value: 98, suffix: "%", label: "Of clients renew after the first quarter" },
  ],

  /* ---- Video work ----------------------------------------------------- */
  // category must be one of: "reels" | "brand" | "ugc" | "campaign"
  // poster: thumbnail image (jpg/png/webp/svg) — use a frame from the video.
  // src (optional): one of
  //   • a self-hosted file:   "assets/media/my-reel.mp4"   (plays on hover + in the lightbox)
  //   • a YouTube link:       "https://www.youtube.com/watch?v=XXXX" or youtu.be/XXXX
  //   • a Vimeo link:         "https://vimeo.com/123456"
  //   • Instagram / TikTok:   the post URL (opens in a new tab)
  // Leave src empty to show the poster with project details only.
  videos: [
    { title: "Golden hour launch", client: "Maison Lune", category: "reels",    metric: "1.4M views",       poster: "assets/media/reel-01.svg", src: "" },
    { title: "The ritual",         client: "Nº 7 Skincare", category: "brand", metric: "+210% saves",      poster: "assets/media/reel-02.svg", src: "" },
    { title: "Morning in Terra",   client: "Terra Living", category: "ugc",    metric: "38K shares",       poster: "assets/media/reel-03.svg", src: "" },
    { title: "Summer drop",        client: "Alma Swim",    category: "campaign", metric: "Sold out in 48h", poster: "assets/media/reel-04.svg", src: "" },
    { title: "Behind the roast",   client: "Oro Coffee",   category: "reels",  metric: "920K views",       poster: "assets/media/reel-05.svg", src: "" },
    { title: "Slow living",        client: "Casa Verde",   category: "brand",  metric: "+64% site visits", poster: "assets/media/reel-06.svg", src: "" },
    { title: "Unboxing, honestly", client: "Bloom Studio", category: "ugc",    metric: "4.8% engagement",  poster: "assets/media/reel-07.svg", src: "" },
    { title: "Holiday edit",       client: "Velvet & Co.", category: "campaign", metric: "3.1× ROAS",      poster: "assets/media/reel-08.svg", src: "" },
    { title: "Made by hand",       client: "Kintsu",       category: "reels",  metric: "2.2M views",       poster: "assets/media/reel-09.svg", src: "" },
  ],

  /* ---- Case studies --------------------------------------------------- */
  cases: [
    {
      client: "Maison Lune", industry: "Fashion · Instagram & TikTok", image: "assets/media/case-01.svg",
      challenge: "Beautiful product, quiet feed. 4K followers and posts that disappeared within hours.",
      strategy: "A calm, cinematic content system: three weekly reels, a consistent colour story and community replies within the hour.",
      stats: [{ k: "Followers", from: "4K", to: "61K" }, { k: "Monthly reach", from: "18K", to: "1.2M" }, { k: "Time", to: "6 months" }],
    },
    {
      client: "Nº 7 Skincare", industry: "Beauty · Brand films & paid social", image: "assets/media/case-02.svg",
      challenge: "A new line launching against bigger brands with ten times the budget.",
      strategy: "One hero brand film cut into 24 short-form assets, tested weekly and scaled only what people saved and shared.",
      stats: [{ k: "Saves", from: "", to: "+210%" }, { k: "Cost per sale", from: "", to: "−42%" }, { k: "Launch", to: "Sold out" }],
    },
    {
      client: "Oro Coffee", industry: "Hospitality · Full management", image: "assets/media/case-03.svg",
      challenge: "A loved local café with no time to post and no clear voice online.",
      strategy: "Full hand-off: monthly shoot days, a warm storytelling voice and a content calendar the team never has to think about.",
      stats: [{ k: "Footfall", from: "", to: "+35%" }, { k: "Engagement", from: "0.9%", to: "5.6%" }, { k: "Hours saved", to: "20 / mo" }],
    },
  ],

  /* ---- Packages ------------------------------------------------------- */
  // price is optional — leave "" to show "Tailored quote".
  packages: [
    {
      name: "Essential", tagline: "For brands ready to show up consistently.", price: "from $900 / mo", featured: false,
      items: ["1 platform managed", "12 posts per month incl. 4 reels", "Content calendar & captions", "Monthly performance report"],
    },
    {
      name: "Signature", tagline: "Full management with original video.", price: "from $1,800 / mo", featured: true,
      items: ["2 platforms managed", "20 posts per month incl. 8 reels", "Monthly on-location shoot", "Community management", "Bi-weekly strategy calls"],
    },
    {
      name: "Full Studio", tagline: "Your complete content department.", price: "Tailored quote", featured: false,
      items: ["Up to 4 platforms", "Brand film + short-form cut-downs", "Paid social creative & testing", "Influencer & UGC coordination", "Priority WhatsApp line"],
    },
  ],

  /* ---- Testimonials --------------------------------------------------- */
  testimonials: [
    { quote: "Valeria didn't just make our feed beautiful — she made it sell. We sold out our summer collection in two days.", name: "Lucía M.", role: "Founder, Alma Swim" },
    { quote: "For the first time, our content feels like us. Calm, intentional, and people actually stop to watch.", name: "Daniel R.", role: "Marketing Lead, Nº 7 Skincare" },
    { quote: "I handed over social media completely and got my evenings back. The numbers keep going up every month.", name: "Sofía T.", role: "Owner, Oro Coffee" },
  ],
};
