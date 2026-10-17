// src/i18n/translations.js
//
// All translated UI text for the customer-facing site lives here, keyed
// by a short id. Each id has four versions: en (English), ha (Hausa),
// pcm (Nigerian Pidgin), ff (Fulfulde / Fulani).
//
// IMPORTANT for the restaurant owner: these translations were written by
// an AI, not a native speaker. English and Pidgin should be solid; Hausa
// should be understandable but may read a little formal/stiff in
// places; Fulfulde has many regional dialects, so this is the roughest
// of the four — it's worth asking a native Fulfulde-speaking customer
// or staff member to check it and suggest corrections, which can then
// be edited right here in this file.
//
// Product names, descriptions and anything typed into the Admin
// Dashboard are NOT translated — they always show exactly as the admin
// typed them.

export const LANGUAGES = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "ha", nativeName: "Hausa", englishName: "Hausa" },
  { code: "pcm", nativeName: "Naija Pidgin", englishName: "Nigerian Pidgin" },
  { code: "ff", nativeName: "Fulfulde", englishName: "Fulani" },
];

export const DEFAULT_LANGUAGE = "en";

export const translations = {
  // Language picker screen itself
  choose_language_title: {
    en: "Choose your language",
    ha: "Zaɓi yarenku",
    pcm: "Choose di language wey you want",
    ff: "Suɓo ɗemngal maa",
  },
  choose_language_subtitle: {
    en: "You can change this anytime from the menu.",
    ha: "Za ku iya canza wannan a kowane lokaci daga menu.",
    pcm: "You fit change dis any time from di menu.",
    ff: "Aɗa waawi waylude ɗum nder tuugnde nden saa'i fof.",
  },

  // Navbar
  nav_home: { en: "Home", ha: "Gida", pcm: "Home", ff: "Galle" },
  nav_about: { en: "About Us", ha: "Game da Mu", pcm: "About Us", ff: "Fii Amen" },
  nav_menu: { en: "Menu", ha: "Jerin Abinci", pcm: "Menu", ff: "Tabik Nyaamnde" },
  nav_reviews: { en: "Reviews", ha: "Ra'ayoyi", pcm: "Reviews", ff: "Winndanɗe" },
  nav_track: { en: "Track Order", ha: "Bin Oda", pcm: "Track Order", ff: "Ƴeewndo Oda" },
  nav_contact: { en: "Contact Us", ha: "Tuntube Mu", pcm: "Contact Us", ff: "Heɓto Amen" },
  nav_cart: { en: "Cart", ha: "Kwando", pcm: "Cart", ff: "Saggitde" },

  // Bottom tab bar (short labels)
  tab_home: { en: "Home", ha: "Gida", pcm: "Home", ff: "Galle" },
  tab_menu: { en: "Menu", ha: "Menu", pcm: "Menu", ff: "Tabik" },
  tab_cart: { en: "Cart", ha: "Kwando", pcm: "Cart", ff: "Saggitde" },
  tab_contact: { en: "Contact", ha: "Tuntuɓa", pcm: "Contact", ff: "Heɓto" },
  tab_track: { en: "Track", ha: "Bin Oda", pcm: "Track", ff: "Ƴeewndo" },

  // Footer
  footer_visit: { en: "Visit us", ha: "Ziyarce mu", pcm: "Come visit us", ff: "Ƴeewo amen" },
  footer_contact: { en: "Get in touch", ha: "Tuntube mu", pcm: "Reach us", ff: "Heɓto amen" },
  footer_order_online: { en: "Order online", ha: "Yi oda akan layi", pcm: "Order online", ff: "Odo onlaynu" },

  // Closed banner
  closed_banner: {
    en: "We're currently closed. Our hours are {hours} — browse the menu, but ordering opens again when we're back.",
    ha: "A yanzu haka mun rufe. Lokutan mu na aiki shi ne {hours} — ku duba menu, amma za a sake buɗe oda idan mun dawo.",
    pcm: "We don close for now. Our hours na {hours} — you fit still check di menu, but ordering go open again when we don come back.",
    ff: "Minen ɓaawo ɗum jooni. Waktu amen ko {hours} — ƴeewee tabik, kono odo artata ko fo min arti.",
  },

  // Home page
  home_order_now: { en: "Order Now", ha: "Yi Oda Yanzu", pcm: "Order Now", ff: "Odo Jooni" },
  home_view_menu: { en: "View Menu", ha: "Duba Menu", pcm: "Check Menu", ff: "Ƴeewo Tabik" },
  home_browse_category: { en: "Browse by category", ha: "Duba ta rukuni", pcm: "Browse by category", ff: "Ƴeewo e dental" },
  home_featured_today: { en: "Featured today", ha: "Fitattu na yau", pcm: "Wetin dey trend today", ff: "Ɓurɗe hannde" },
  home_popular_now: { en: "Popular right now", ha: "Mafiya shahara yanzu", pcm: "Popular right now", ff: "Ɓurɗe anndaaɗe jooni" },
  home_see_full_menu: { en: "See full menu", ha: "Duba cikakken menu", pcm: "See full menu", ff: "Ƴeewo tabik fof" },
  home_menu_empty: {
    en: "The menu will appear here as soon as products are added from the Admin Dashboard.",
    ha: "Menu zai bayyana nan da zarar an kara kayayyaki daga Admin Dashboard.",
    pcm: "Di menu go show here as soon as items dey add from Admin Dashboard.",
    ff: "Tabik oo ɓoltoyta nder nii saka ko ɓeydaa kuutorɗe ɗen nder Admin Dashboard.",
  },
  home_benefit1_title: { en: "Made fresh, daily", ha: "Ana dafa shi sabo kowace rana", pcm: "We dey cook am fresh daily", ff: "Defee kesal ñalawma kala" },
  home_benefit1_body: {
    en: "Every pot is cooked to order from ingredients sourced around Jos.",
    ha: "Kowane tukunya ana dafa shi bisa oda da kayayyakin da aka samo a Jos.",
    pcm: "Every pot dem cook am fresh from ingredients wey dem get around Jos.",
    ff: "Kala ndiyam ɗum defaa ko e nder oda immorde e kaalisi ɓaŋŋinaa Jos.",
  },
  home_benefit2_title: { en: "Fast in and out", ha: "Sauri wajen sayarwa", pcm: "Quick service", ff: "Yaawi e naatde yaltude" },
  home_benefit2_body: {
    en: "Dine-in, takeaway, or delivery — order ahead on WhatsApp and skip the wait.",
    ha: "Ci a wurin, ɗauka, ko a kawo maka — yi oda ta WhatsApp kafin lokaci don kaucewa jira.",
    pcm: "Dine-in, takeaway, or delivery — order first on WhatsApp make you no go wait.",
    ff: "Ñaamu nder, ɓama, maa nawee ma — odo gaɗo nder WhatsApp fii nde a heɓataa habbaade.",
  },
  home_benefit3_title: { en: "Real Nigerian flavour", ha: "Dandanon abincin Najeriya na gaskiya", pcm: "Original Naija taste", ff: "Ñaamri Najeriya dewti" },
  home_benefit3_body: {
    en: "Jollof, swallow, pepper soup, and combos made the way you actually want them.",
    ha: "Jollof, tuwo, miyar barkono, da sauran abinci ana yin su yadda kake so.",
    pcm: "Jollof, swallow, pepper soup, and combo wey dem make as you really want am.",
    ff: "Jollof, ñaamri moɓɓondi, soppu kaani, e combo defaaɗi hono no yiɗirɗaa.",
  },
  home_customers_say: { en: "What customers say", ha: "Abin da abokan ciniki suke faɗi", pcm: "Wetin customers dey talk", ff: "Ko coggitooɓe wi'ata" },
  home_see_all_reviews: { en: "See all reviews", ha: "Duba dukkan ra'ayoyi", pcm: "See all reviews", ff: "Ƴeewo winndanɗe fof" },
  home_no_reviews: {
    en: "No reviews yet — be the first to share yours!",
    ha: "Babu ra'ayi tukuna — ka kasance na farko da ya bayar da naka!",
    pcm: "No reviews yet — be di first to drop yours!",
    ff: "Alaa winndande jooni — jaɓ ko adii hollirde ma'aa!",
  },
  home_leave_review: { en: "Leave a review", ha: "Bar ra'ayi", pcm: "Drop a review", ff: "Winndu winndande" },
  home_hero_title: {
    en: "Delicious Meals, Made With Love.",
    ha: "Abinci Mai Daɗi, An Yi Shi Da Soyayya.",
    pcm: "Sweet Chop, Made With Love.",
    ff: "Ñaamri Welaa, Defaande e Yiɗde.",
  },
  home_hero_subtitle: {
    en: "Enjoy delicious, fresh and affordable meals from {brand}.",
    ha: "Ku ji daɗin abinci mai daɗi, sabo kuma mai araha daga {brand}.",
    pcm: "Enjoy sweet, fresh and affordable chop from {brand}.",
    ff: "Ñaamee ñaamri welaa, kesal, e tiimoowa immorde e {brand}.",
  },
  review_singular: { en: "review", ha: "ra'ayi", pcm: "review", ff: "winndande" },
  review_plural: { en: "reviews", ha: "ra'ayoyi", pcm: "reviews", ff: "winndanɗe" },

  // Menu page
  menu_title: { en: "Our Menu", ha: "Menu Dinmu", pcm: "Our Menu", ff: "Tabik Amen" },
  menu_subtitle: {
    en: "Search, filter, and add your favourites to the cart.",
    ha: "Yi bincike, tace, kuma ƙara abin da kake so a cikin kwando.",
    pcm: "Search, filter, and add di ones you like to di cart.",
    ff: "Ɗaɓɓito, suɓo, ɓeydu ko yiɗ-ɗaa nder saggitde.",
  },
  menu_search_placeholder: { en: "Search for food…", ha: "Nemo abinci…", pcm: "Search for chop…", ff: "Ɗaɓɓito ñaamri…" },
  menu_sort_prefix: { en: "Sort: ", ha: "Tsara: ", pcm: "Sort: ", ff: "Dammbu: " },
  menu_sort_popular: { en: "Most popular", ha: "Mafiya shahara", pcm: "Most popular", ff: "Ɓurɗe anndaaɗe" },
  menu_sort_price_asc: { en: "Price: low to high", ha: "Farashi: ƙaranci zuwa yawa", pcm: "Price: small to big", ff: "Coggu: famɗo haa ɓuri" },
  menu_sort_price_desc: { en: "Price: high to low", ha: "Farashi: yawa zuwa ƙaranci", pcm: "Price: big to small", ff: "Coggu: ɓuri haa famɗo" },
  menu_sort_name: { en: "Name A–Z", ha: "Suna A–Z", pcm: "Name A–Z", ff: "Innde A–Z" },
  menu_all: { en: "All", ha: "Duka", pcm: "All", ff: "Fof" },
  menu_no_match: {
    en: "No dishes match your search yet. Try a different keyword or category.",
    ha: "Babu abincin da ya dace da binciken ka tukuna. Gwada wata kalma ko rukuni.",
    pcm: "No chop match your search yet. Try different word or category.",
    ff: "Alaa ñaamri hawtindii e ɗaɓɓaande maa jooni. Eto wonnde goo maa dental goo.",
  },
  menu_banner_title: { en: "Fast Delivery & Take Away", ha: "Saurin Kawo Abinci & Ɗauka", pcm: "Fast Delivery & Take Away", ff: "Nawdu Yaawo & Ɓamde" },
  menu_banner_body: {
    en: "Order ahead and we'll have it ready — delivered to you or packed for pickup.",
    ha: "Yi oda tun da wuri za mu shirya shi — a kawo maka ko a shirya don ɗauka.",
    pcm: "Order before time make we ready am — we go deliver am or pack am for you to pick.",
    ff: "Odo gaɗo min heblitoo — nawee ma maa falee fii ɓamde.",
  },
  menu_order_whatsapp: { en: "Order on WhatsApp", ha: "Yi Oda Ta WhatsApp", pcm: "Order on WhatsApp", ff: "Odo e WhatsApp" },

  // FoodCard
  card_add_to_cart: { en: "Add to cart", ha: "Ƙara a kwando", pcm: "Add to cart", ff: "Ɓeydu nder saggitde" },
  card_photo_soon: { en: "Photo coming soon", ha: "Hoto zai zo nan ba da jimawa ba", pcm: "Photo dey come soon", ff: "Natal arata yoga" },
  card_featured: { en: "Featured", ha: "Fitaccen", pcm: "Featured", ff: "Ɓuraa" },
  card_out_of_stock: { en: "Out of stock", ha: "Ya ƙare", pcm: "Don finish", ff: "Timmii" },

  // Cart page
  cart_title: { en: "Your Cart", ha: "Kwandon Ka", pcm: "Your Cart", ff: "Saggitde Maa" },
  cart_empty_title: { en: "Your cart is empty", ha: "Kwandon ka babu kome", pcm: "Your cart empty", ff: "Saggitde maa ɗum alaa huunde" },
  cart_empty_body: {
    en: "Add something delicious from the menu to get started.",
    ha: "Ƙara wani abinci mai daɗi daga menu don farawa.",
    pcm: "Add sweet thing from di menu to start.",
    ff: "Ɓeydu huunde welaa immorde e tabik fii fuɗɗaade.",
  },
  cart_browse_menu: { en: "Browse the menu", ha: "Duba menu", pcm: "Browse di menu", ff: "Ƴeewo tabik" },
  cart_each: { en: "each", ha: "kowanne", pcm: "each", ff: "kala gooto" },
  cart_remove: { en: "Remove", ha: "Cire", pcm: "Remove", ff: "Ittu" },
  cart_finding_suggestions: { en: "Finding things that go well together…", ha: "Ana neman abubuwan da suka dace tare…", pcm: "We dey find things wey go fine together…", ff: "Min ɗaɓɓoyii kuutorɗe hawtindiiɗe…" },
  cart_goes_well: { en: "Goes well with your order", ha: "Ya dace da odar ka", pcm: "E go fine well with your order", ff: "Ɗum hawta e odaa ma" },
  cart_add: { en: "Add", ha: "Ƙara", pcm: "Add", ff: "Ɓeydu" },
  cart_subtotal: { en: "Subtotal", ha: "Jumla", pcm: "Subtotal", ff: "Limoore seeɗa" },
  cart_checkout: { en: "Proceed to checkout", ha: "Ci gaba zuwa biya", pcm: "Go to checkout", ff: "Jokku to yoɓde" },

  // Checkout page
  checkout_title: { en: "Checkout", ha: "Biya", pcm: "Checkout", ff: "Yoɓde" },
  checkout_empty: {
    en: "Your cart is empty, so there's nothing to check out yet.",
    ha: "Kwandon ka babu kome, don haka babu abin biya tukuna.",
    pcm: "Your cart empty, so nothing to checkout yet.",
    ff: "Saggitde maa alaa huunde, alaa ko yoɓetee jooni.",
  },
  checkout_go_menu: { en: "Go to the menu", ha: "Je zuwa menu", pcm: "Go to di menu", ff: "Yah to tabik" },
  checkout_full_name: { en: "Full name", ha: "Cikakken suna", pcm: "Full name", ff: "Innde timmunde" },
  checkout_phone: { en: "Phone number", ha: "Lambar waya", pcm: "Phone number", ff: "Limngal tele" },
  checkout_phone_placeholder: { en: "080…", ha: "080…", pcm: "080…", ff: "080…" },
  checkout_order_type: { en: "Order type", ha: "Irin oda", pcm: "Order type", ff: "Nooɗe odaa" },
  checkout_dine_in: { en: "Dine-in", ha: "Ci a wurin", pcm: "Dine-in", ff: "Ñaamu nder" },
  checkout_takeaway: { en: "Takeaway", ha: "Ɗauka", pcm: "Takeaway", ff: "Ɓamde" },
  checkout_delivery: { en: "Delivery", ha: "Kawo wa", pcm: "Delivery", ff: "Nawdu" },
  checkout_delivery_address: { en: "Delivery address", ha: "Adireshin kawowa", pcm: "Delivery address", ff: "Ƴettirde nawdu" },
  checkout_pickup_notes: { en: "Pickup notes (optional)", ha: "Bayani kan ɗauka (ba dole ba)", pcm: "Pickup notes (optional)", ff: "Tintinoore ɓamde (hoynde)" },
  checkout_share_location: {
    en: "Share your location for an accurate delivery fee based on distance, or skip to use the standard fee.",
    ha: "Raba wurin da kake domin daidai kudin kawowa bisa nisa, ko ka tsallake don amfani da kudin da aka saba.",
    pcm: "Share your location so we go sabi correct delivery fee based on distance, or skip use di normal fee.",
    ff: "Winndito nokku maa fii yoɓde nawdu yoocaare e njaawdi, maa ɓaŋ-ɗaa jogaade yoɓde adaande.",
  },
  checkout_use_my_location: { en: "📍 Use my location", ha: "📍 Yi amfani da wurina", pcm: "📍 Use my location", ff: "📍 Jogaade nokku am" },
  checkout_distance_fee: {
    en: "You're about {km} km away — delivery fee: {fee}",
    ha: "Kana nisan kilomita {km} — kudin kawowa: {fee}",
    pcm: "You dey about {km} km away — delivery fee: {fee}",
    ff: "A woɗɗitii ko ɓadii {km} km — coggu nawdu: {fee}",
  },
  checkout_getting_location: { en: "Getting your location…", ha: "Ana samo wurin ka…", pcm: "We dey get your location…", ff: "Min ɗaɓɓoyii nokku maa…" },
  checkout_location_denied: {
    en: "Couldn't access your location — using the standard delivery fee instead.",
    ha: "Ba mu iya samun wurin ka ba — za mu yi amfani da kudin kawowa na asali maimakon.",
    pcm: "We no fit reach your location — we go use di normal delivery fee instead.",
    ff: "Min heɓaa nokku maa — min jogaade yoɓde nawdu adaande.",
  },
  checkout_notes_label: { en: "Additional notes (optional)", ha: "Ƙarin bayani (ba dole ba)", pcm: "Additional notes (optional)", ff: "Tintinoore goɗɗo (hoynde)" },
  checkout_subtotal: { en: "Subtotal", ha: "Jumla", pcm: "Subtotal", ff: "Limoore seeɗa" },
  checkout_takeaway_fee: { en: "Takeaway fee", ha: "Kudin ɗauka", pcm: "Takeaway fee", ff: "Coggu ɓamde" },
  checkout_delivery_fee: { en: "Delivery fee", ha: "Kudin kawowa", pcm: "Delivery fee", ff: "Coggu nawdu" },
  checkout_total: { en: "Total", ha: "Jimla duka", pcm: "Total", ff: "Limoore fof" },
  checkout_currently_closed: { en: "Currently closed", ha: "A yanzu haka an rufe", pcm: "Currently closed", ff: "Ɓaawo jooni" },
  checkout_placing_order: { en: "Placing order…", ha: "Ana shirya oda…", pcm: "We dey place order…", ff: "Min wadii odaa…" },
  checkout_submit: { en: "Checkout on WhatsApp", ha: "Biya Ta WhatsApp", pcm: "Checkout on WhatsApp", ff: "Yoɓ e WhatsApp" },
  checkout_footnote: {
    en: "Your order is saved first, then WhatsApp opens with the details pre-filled — just hit send to confirm.",
    ha: "Da farko za a adana odar ka, sannan WhatsApp zai buɗe da cikakkun bayanai — kawai danna aika domin tabbatarwa.",
    pcm: "Your order go save first, then WhatsApp go open with di details already fill — just hit send to confirm.",
    ff: "Odaa ma waɗata adan, refti WhatsApp uddata e kabaruuji ɗin fuɗɗiiɗi — yottu neldu fii tabitinde.",
  },
  checkout_closed_message: {
    en: "We're currently closed ({hours}). You can't check out right now, but your cart is saved — come back when we're open!",
    ha: "A yanzu haka mun rufe ({hours}). Ba za ka iya biya yanzu ba, amma kwandon ka an adana shi — dawo idan mun buɗe!",
    pcm: "We don close for now ({hours}). You no fit checkout now, but your cart dey save — come back when we open!",
    ff: "Minen ɓaawii jooni ({hours}). A waawaa yoɓde jooni, kono saggitde maa ndenndaama — artu ko min uddi!",
  },
  checkout_submit_error: {
    en: "We couldn't save your order right now. Please check your connection and try again, or call us directly.",
    ha: "Ba mu iya adana odar ka yanzu ba. Don Allah duba hadin yanar gizo kuma gwada sake, ko ka kira mu kai tsaye.",
    pcm: "We no fit save your order now. Please check your connection try again, or call us directly.",
    ff: "Min waawaa danndude odaa ma jooni. Ƴeewo hawtitaare internet maa eto kadi, maa noddu min.",
  },
  checkout_error_name: { en: "Please enter your name.", ha: "Don Allah shigar da sunanka.", pcm: "Abeg enter your name.", ff: "Winndu innde maa." },
  checkout_error_phone_required: { en: "Please enter a phone number.", ha: "Don Allah shigar da lambar waya.", pcm: "Abeg enter phone number.", ff: "Winndu limngal tele." },
  checkout_error_phone_invalid: { en: "Enter a valid Nigerian phone number.", ha: "Shigar da lambar waya ta Najeriya da ta dace.", pcm: "Enter correct Nigerian phone number.", ff: "Winndu limngal tele Najeriya moƴƴungal." },
  checkout_error_address: { en: "Delivery address is required for delivery orders.", ha: "Ana bukatar adireshin kawowa domin odar kawowa.", pcm: "Delivery address dey needed for delivery orders.", ff: "Ƴettirde nawdu haani fii oda nawdu." },

  // Contact page
  contact_title: { en: "Contact Us", ha: "Tuntube Mu", pcm: "Contact Us", ff: "Heɓto Amen" },
  contact_visit: { en: "Visit", ha: "Ziyarta", pcm: "Visit", ff: "Ƴeewo" },
  contact_open_daily: { en: "Open {hours} daily", ha: "Muna buɗe {hours} kowace rana", pcm: "We open {hours} every day", ff: "Uddaama {hours} ñalawma kala" },
  contact_call_whatsapp: { en: "Call or WhatsApp", ha: "Kira ko WhatsApp", pcm: "Call or WhatsApp", ff: "Noddu maa WhatsApp" },
  contact_chat_whatsapp: { en: "Chat on WhatsApp", ha: "Hira a WhatsApp", pcm: "Chat on WhatsApp", ff: "Haalu e WhatsApp" },
  contact_email: { en: "Email", ha: "Imel", pcm: "Email", ff: "Imeel" },

  // About page
  about_title: { en: "About {brand}", ha: "Game da {brand}", pcm: "About {brand}", ff: "Fii {brand}" },
  about_our_story: { en: "Our Story", ha: "Labarinmu", pcm: "Our Story", ff: "Daartol Amen" },
  about_our_mission: { en: "Our Mission", ha: "Manufarmu", pcm: "Our Mission", ff: "Mijo Amen" },
  about_our_vision: { en: "Our Vision", ha: "Hangen Nesanmu", pcm: "Our Vision", ff: "Tasarwa Amen" },
  about_quality_food: { en: "Quality Food", ha: "Abinci Mai Inganci", pcm: "Quality Food", ff: "Ñaamri Moƴƴiri" },
  about_quality_food_body: { en: "Every dish is prepared fresh using quality ingredients.", ha: "Kowane abinci ana shirya shi sabo da kayan inganci.", pcm: "Every dish dem prepare fresh with quality ingredients.", ff: "Kala ñaamri defaama kesal e kaalisi moƴƴi." },
  about_customer_satisfaction: { en: "Customer Satisfaction", ha: "Gamsar Da Abokin Ciniki", pcm: "Customer Satisfaction", ff: "Weltaare Coggitooɓe" },
  about_customer_satisfaction_body: { en: "We aim to get your order right, every single time.", ha: "Muna ƙoƙari mu tabbatar oda ta daidaita a kowane lokaci.", pcm: "We dey try make your order correct every single time.", ff: "Min eto odaa ma yo wonu moƴƴi saa'i kala." },
  about_clean_environment: { en: "Clean Environment", ha: "Tsaftataccen Wuri", pcm: "Clean Environment", ff: "Nokku Laɓɓinaaɗo" },
  about_clean_environment_body: { en: "A welcoming, clean space whether you dine in or pick up.", ha: "Wuri mai tsabta kuma mai karbar baki, ko ka ci a wurin ko ka ɗauka.", pcm: "A welcoming, clean place whether you dine in or pick up.", ff: "Nokku jaɓɓiiɗo, laɓɓinaaɗo so a ñaamii nder maa ɓami." },

  // Reviews page
  reviews_title: { en: "Customer Reviews", ha: "Ra'ayoyin Abokan Ciniki", pcm: "Customer Reviews", ff: "Winndanɗe Coggitooɓe" },
  reviews_subtitle: {
    en: "Share your experience, or reply to what others are saying — just like a normal discussion.",
    ha: "Raba abin da ka samu, ko ka amsa wa abin da wasu suke faɗi — kamar tattaunawa ta yau da kullum.",
    pcm: "Share your experience, or reply to wetin others dey talk — just like normal discussion.",
    ff: "Winndito ko a tamii, maa jaabo ko goɗɓe wi'i — hono haaltol saɗtuɗol.",
  },
  reviews_leave_review: { en: "Leave a review", ha: "Bar ra'ayi", pcm: "Drop a review", ff: "Winndu winndande" },
  reviews_name_placeholder: { en: "Your name", ha: "Sunanka", pcm: "Your name", ff: "Innde maa" },
  reviews_message_placeholder: { en: "What did you think?", ha: "Me ka gani?", pcm: "Wetin you think?", ff: "Ko miijii-ɗaa?" },
  reviews_rating_label: { en: "Rating:", ha: "Daraja:", pcm: "Rating:", ff: "Dammbugol:" },
  reviews_post_review: { en: "Post review", ha: "Tura ra'ayi", pcm: "Post review", ff: "Nelu winndande" },
  reviews_posting: { en: "Posting…", ha: "Ana tura…", pcm: "Posting…", ff: "Neldata…" },
  reviews_no_reviews: {
    en: "No reviews yet — be the first to share your experience!",
    ha: "Babu ra'ayi tukuna — ka zama na farko da ya raba abin da ka samu!",
    pcm: "No reviews yet — be di first to share your experience!",
    ff: "Alaa winndande jooni — jaɓ ko adii hollirde tamuru maa!",
  },
  reviews_reply: { en: "Reply", ha: "Amsa", pcm: "Reply", ff: "Jaabo" },
  reviews_cancel: { en: "Cancel", ha: "Soke", pcm: "Cancel", ff: "Haaytu" },
  reviews_reply_placeholder: { en: "Write a reply…", ha: "Rubuta amsa…", pcm: "Write a reply…", ff: "Winndu jaabawol…" },
  reviews_post_reply: { en: "Post reply", ha: "Tura amsa", pcm: "Post reply", ff: "Nelu jaabawol" },

  // Track order page
  track_title: { en: "Track Your Order", ha: "Bin Diddigin Odar Ka", pcm: "Track Your Order", ff: "Ƴeewndo Odaa Ma" },
  track_subtitle: {
    en: "Paste the order ID from your WhatsApp confirmation message to see its status.",
    ha: "Liƙa lambar odar da ka samu a saƙon tabbatarwa na WhatsApp domin ganin matsayinta.",
    pcm: "Paste di order ID from your WhatsApp confirmation message to see di status.",
    ff: "Winndito ID odaa ɓamaa e nder battande WhatsApp fii yiɛtaade darnde mum.",
  },
  track_placeholder: { en: "Order ID", ha: "Lambar Oda", pcm: "Order ID", ff: "ID Odaa" },
  track_button: { en: "Track", ha: "Bi Diddigi", pcm: "Track", ff: "Ƴeewndo" },
  track_looking_up: { en: "Looking up your order…", ha: "Ana neman odar ka…", pcm: "We dey look up your order…", ff: "Min ɗaɓɓotii odaa ma…" },
  track_not_found: {
    en: "We couldn't find an order with that ID. Double-check it and try again.",
    ha: "Ba mu samu odar da wannan lamba ba. Sake duba sannan ka gwada.",
    pcm: "We no fit find order with dat ID. Double-check am try again.",
    ff: "Min heɓaa odaa e ID ngoon. Ƴeewtu kadi eto kadi.",
  },
  track_status_pending: { en: "Pending", ha: "Jiran Aiki", pcm: "Pending", ff: "Habbetee" },
  track_status_confirmed: { en: "Confirmed", ha: "An Tabbatar", pcm: "Confirmed", ff: "Tabitinaama" },
  track_status_preparing: { en: "Preparing", ha: "Ana Shiryawa", pcm: "Dem dey prepare am", ff: "Hiɓɓaama" },
  track_status_ready: { en: "Ready", ha: "An Shirya", pcm: "Ready", ff: "Deƴƴii" },
  track_status_out_for_delivery: { en: "Out for Delivery", ha: "Ana Kai Shi", pcm: "Dem dey bring am", ff: "Nder nawdu" },
  track_status_completed: { en: "Completed", ha: "An Kammala", pcm: "Completed", ff: "Timmii" },
  track_status_cancelled: {
    en: "This order was cancelled.",
    ha: "An soke wannan odar.",
    pcm: "Dis order don cancel.",
    ff: "Odaa ɗii haaytaama.",
  },
};

export function t(key, lang, vars) {
  const entry = translations[key];
  if (!entry) return key;
  let text = entry[lang] || entry[DEFAULT_LANGUAGE] || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
}
