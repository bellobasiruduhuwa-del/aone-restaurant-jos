// src/i18n/translations.js
//
// All translated UI text for the customer-facing site lives here, keyed
// by a short id. Each id has seven versions: en (English), ha (Hausa),
// pcm (Nigerian Pidgin), ff (Fulfulde / Fulani), yo (Yoruba),
// ar (Arabic), zh (Chinese, Simplified).
//
// IMPORTANT for the restaurant owner: these translations were written by
// an AI, not a native speaker. English and Pidgin should be solid; Hausa,
// Yoruba, Arabic and Chinese should be understandable but may read a
// little formal/stiff in places; Fulfulde has many regional dialects, so
// it's the roughest of the bunch. It's worth asking a native speaker of
// each language (a customer or staff member) to check their language and
// suggest corrections, which can then be edited right here in this file.
//
// Note on Arabic: Arabic is normally read right-to-left, but this app's
// layout does not automatically flip direction when Arabic is chosen —
// the Arabic text itself will display correctly, but buttons, icons and
// alignment stay left-to-right. Full right-to-left layout support would
// be a separate, bigger piece of work if ever wanted.
//
// Product names, descriptions and anything typed into the Admin
// Dashboard are NOT translated — they always show exactly as the admin
// typed them.

export const LANGUAGES = [
  { code: "en", nativeName: "English", englishName: "English" },
  { code: "ha", nativeName: "Hausa", englishName: "Hausa" },
  { code: "pcm", nativeName: "Naija Pidgin", englishName: "Nigerian Pidgin" },
  { code: "ff", nativeName: "Fulfulde", englishName: "Fulani" },
  { code: "yo", nativeName: "Yorùbá", englishName: "Yoruba" },
  { code: "ar", nativeName: "العربية", englishName: "Arabic" },
  { code: "zh", nativeName: "中文", englishName: "Chinese" },
];

export const DEFAULT_LANGUAGE = "en";

export const translations = {
  // Language picker screen itself
  choose_language_title: {
    en: "Choose your language",
    ha: "Zaɓi yarenku",
    pcm: "Choose di language wey you want",
    ff: "Suɓo ɗemngal maa",
    yo: "Yan èdè tí o fẹ́",
    ar: "اختر لغتك",
    zh: "选择您的语言",
  },
  choose_language_subtitle: {
    en: "You can change this anytime from the menu.",
    ha: "Za ku iya canza wannan a kowane lokaci daga menu.",
    pcm: "You fit change dis any time from di menu.",
    ff: "Aɗa waawi waylude ɗum nder tuugnde nden saa'i fof.",
    yo: "O lè yí èyí padà nígbàkigbà láti orí mẹ́nu.",
    ar: "يمكنك تغيير هذا في أي وقت من القائمة.",
    zh: "您可以随时从菜单中更改此设置。",
  },

  // Navbar
  nav_home: { en: "Home", ha: "Gida", pcm: "Home", ff: "Galle", yo: "Ilé", ar: "الرئيسية", zh: "首页" },
  nav_about: { en: "About Us", ha: "Game da Mu", pcm: "About Us", ff: "Fii Amen", yo: "Nípa Wa", ar: "من نحن", zh: "关于我们" },
  nav_menu: { en: "Menu", ha: "Jerin Abinci", pcm: "Menu", ff: "Tabik Nyaamnde", yo: "Mẹ́nu", ar: "القائمة", zh: "菜单" },
  nav_reviews: { en: "Reviews", ha: "Ra'ayoyi", pcm: "Reviews", ff: "Winndanɗe", yo: "Àwọn Àtúnyẹ̀wò", ar: "التقييمات", zh: "评价" },
  nav_track: { en: "Track Order", ha: "Bin Oda", pcm: "Track Order", ff: "Ƴeewndo Oda", yo: "Tọpa Oda", ar: "تتبع الطلب", zh: "跟踪订单" },
  nav_contact: { en: "Contact Us", ha: "Tuntube Mu", pcm: "Contact Us", ff: "Heɓto Amen", yo: "Kàn Sí Wa", ar: "تواصل معنا", zh: "联系我们" },
  nav_cart: { en: "Cart", ha: "Kwando", pcm: "Cart", ff: "Saggitde", yo: "Apẹ̀rẹ̀", ar: "السلة", zh: "购物车" },

  // Bottom tab bar (short labels)
  tab_home: { en: "Home", ha: "Gida", pcm: "Home", ff: "Galle", yo: "Ilé", ar: "الرئيسية", zh: "首页" },
  tab_menu: { en: "Menu", ha: "Menu", pcm: "Menu", ff: "Tabik", yo: "Mẹ́nu", ar: "القائمة", zh: "菜单" },
  tab_cart: { en: "Cart", ha: "Kwando", pcm: "Cart", ff: "Saggitde", yo: "Apẹ̀rẹ̀", ar: "السلة", zh: "购物车" },
  tab_contact: { en: "Contact", ha: "Tuntuɓa", pcm: "Contact", ff: "Heɓto", yo: "Kàn Sí", ar: "تواصل", zh: "联系" },
  tab_track: { en: "Track", ha: "Bin Oda", pcm: "Track", ff: "Ƴeewndo", yo: "Tọpa", ar: "تتبع", zh: "跟踪" },

  // Footer
  footer_visit: { en: "Visit us", ha: "Ziyarce mu", pcm: "Come visit us", ff: "Ƴeewo amen", yo: "Wá bẹ̀ wá wò", ar: "زورونا", zh: "欢迎光临" },
  footer_contact: { en: "Get in touch", ha: "Tuntube mu", pcm: "Reach us", ff: "Heɓto amen", yo: "Kàn sí wa", ar: "تواصل معنا", zh: "联系我们" },
  footer_order_online: { en: "Order online", ha: "Yi oda akan layi", pcm: "Order online", ff: "Odo onlaynu", yo: "Pàṣẹ oúnjẹ lórí ayélujára", ar: "اطلب عبر الإنترنت", zh: "在线订购" },

  // Closed banner
  closed_banner: {
    en: "We're currently closed. Our hours are {hours} — browse the menu, but ordering opens again when we're back.",
    ha: "A yanzu haka mun rufe. Lokutan mu na aiki shi ne {hours} — ku duba menu, amma za a sake buɗe oda idan mun dawo.",
    pcm: "We don close for now. Our hours na {hours} — you fit still check di menu, but ordering go open again when we don come back.",
    ff: "Minen ɓaawo ɗum jooni. Waktu amen ko {hours} — ƴeewee tabik, kono odo artata ko fo min arti.",
    yo: "A ti pa ilé-iṣẹ́ wa fún ìsinsìnyí. Àkókò wa ni {hours} — wo mẹ́nu, ṣùgbọ́n pípàṣẹ yóò wà nígbà tí a bá padà.",
    ar: "نحن مغلقون حاليًا. ساعات عملنا هي {hours} — تصفح القائمة، ولكن الطلب سيُفتح مرة أخرى عند رجوعنا.",
    zh: "我们目前暂停营业。营业时间为 {hours} — 您可以浏览菜单，待我们恢复营业后即可再次下单。",
  },

  // Home page
  home_order_now: { en: "Order Now", ha: "Yi Oda Yanzu", pcm: "Order Now", ff: "Odo Jooni", yo: "Pàṣẹ Nísìnyí", ar: "اطلب الآن", zh: "立即下单" },
  home_view_menu: { en: "View Menu", ha: "Duba Menu", pcm: "Check Menu", ff: "Ƴeewo Tabik", yo: "Wo Mẹ́nu", ar: "عرض القائمة", zh: "查看菜单" },
  home_browse_category: { en: "Browse by category", ha: "Duba ta rukuni", pcm: "Browse by category", ff: "Ƴeewo e dental", yo: "Wo nípa ẹ̀ka", ar: "تصفح حسب الفئة", zh: "按分类浏览" },
  home_featured_today: { en: "Featured today", ha: "Fitattu na yau", pcm: "Wetin dey trend today", ff: "Ɓurɗe hannde", yo: "Tí a ṣàfihàn lónìí", ar: "مميز اليوم", zh: "今日精选" },
  home_popular_now: { en: "Popular right now", ha: "Mafiya shahara yanzu", pcm: "Popular right now", ff: "Ɓurɗe anndaaɗe jooni", yo: "Olókìkí nísinsìnyí", ar: "الأكثر طلبًا الآن", zh: "热门推荐" },
  home_see_full_menu: { en: "See full menu", ha: "Duba cikakken menu", pcm: "See full menu", ff: "Ƴeewo tabik fof", yo: "Wo mẹ́nu kíkún", ar: "عرض القائمة الكاملة", zh: "查看完整菜单" },
  home_menu_empty: {
    en: "The menu will appear here as soon as products are added from the Admin Dashboard.",
    ha: "Menu zai bayyana nan da zarar an kara kayayyaki daga Admin Dashboard.",
    pcm: "Di menu go show here as soon as items dey add from Admin Dashboard.",
    ff: "Tabik oo ɓoltoyta nder nii saka ko ɓeydaa kuutorɗe ɗen nder Admin Dashboard.",
    yo: "Mẹ́nu yóò farahàn níhìn-ín ní kété tí a bá fi àwọn ọjà kún un láti orí Admin Dashboard.",
    ar: "ستظهر القائمة هنا بمجرد إضافة المنتجات من لوحة التحكم.",
    zh: "管理员在后台添加商品后，菜单将在此处显示。",
  },
  home_benefit1_title: { en: "Made fresh, daily", ha: "Ana dafa shi sabo kowace rana", pcm: "We dey cook am fresh daily", ff: "Defee kesal ñalawma kala", yo: "A ṣe é tuntun, lójoojúmọ́", ar: "طعام طازج يوميًا", zh: "每日新鲜制作" },
  home_benefit1_body: {
    en: "Every pot is cooked to order from ingredients sourced around Jos.",
    ha: "Kowane tukunya ana dafa shi bisa oda da kayayyakin da aka samo a Jos.",
    pcm: "Every pot dem cook am fresh from ingredients wey dem get around Jos.",
    ff: "Kala ndiyam ɗum defaa ko e nder oda immorde e kaalisi ɓaŋŋinaa Jos.",
    yo: "A máa ń se oúnjẹ kọ̀ọ̀kan nígbà tí a bá pàṣẹ, pẹ̀lú àwọn ohun èlò tí a rí ní àyíká Jos.",
    ar: "يُحضَّر كل طبق عند الطلب باستخدام مكونات من محيط جوس.",
    zh: "每一份餐食都是接到订单后现做，食材均采自乔斯周边。",
  },
  home_benefit2_title: { en: "Fast in and out", ha: "Sauri wajen sayarwa", pcm: "Quick service", ff: "Yaawi e naatde yaltude", yo: "Yára wíwọlé àti jáde", ar: "خدمة سريعة", zh: "快速出入" },
  home_benefit2_body: {
    en: "Dine-in, takeaway, or delivery — order ahead on WhatsApp and skip the wait.",
    ha: "Ci a wurin, ɗauka, ko a kawo maka — yi oda ta WhatsApp kafin lokaci don kaucewa jira.",
    pcm: "Dine-in, takeaway, or delivery — order first on WhatsApp make you no go wait.",
    ff: "Ñaamu nder, ɓama, maa nawee ma — odo gaɗo nder WhatsApp fii nde a heɓataa habbaade.",
    yo: "Jíjẹ nílé, gbígbé lọ, tàbí fífiránṣẹ́ sí ilé — pàṣẹ ṣáájú lórí WhatsApp kí o má ṣe dúró pẹ́.",
    ar: "تناول في المطعم، أو استلام، أو توصيل — اطلب مسبقًا عبر واتساب وتجنب الانتظار.",
    zh: "堂食、打包或外送——提前通过WhatsApp下单，省去等待。",
  },
  home_benefit3_title: { en: "Real Nigerian flavour", ha: "Dandanon abincin Najeriya na gaskiya", pcm: "Original Naija taste", ff: "Ñaamri Najeriya dewti", yo: "Adùn oúnjẹ Nàìjíríà tòótọ́", ar: "نكهة نيجيرية أصيلة", zh: "正宗尼日利亚风味" },
  home_benefit3_body: {
    en: "Jollof, swallow, pepper soup, and combos made the way you actually want them.",
    ha: "Jollof, tuwo, miyar barkono, da sauran abinci ana yin su yadda kake so.",
    pcm: "Jollof, swallow, pepper soup, and combo wey dem make as you really want am.",
    ff: "Jollof, ñaamri moɓɓondi, soppu kaani, e combo defaaɗi hono no yiɗirɗaa.",
    yo: "Jollof, ẹ̀ba, ìsápá, àti àpapọ̀ oúnjẹ tí a ṣe gẹ́gẹ́ bí ìwọ fẹ́.",
    ar: "جولوف، وأطباق السوالو، وشوربة الفلفل، والتوليفات، كل ذلك يُحضَّر بالطريقة التي تفضلها.",
    zh: "Jollof、Swallow、辣椒汤以及各种套餐，均按您喜欢的方式制作。",
  },
  home_customers_say: { en: "What customers say", ha: "Abin da abokan ciniki suke faɗi", pcm: "Wetin customers dey talk", ff: "Ko coggitooɓe wi'ata", yo: "Ohun tí àwọn oníbàárà wa ń sọ", ar: "ما يقوله عملاؤنا", zh: "顾客评价" },
  home_see_all_reviews: { en: "See all reviews", ha: "Duba dukkan ra'ayoyi", pcm: "See all reviews", ff: "Ƴeewo winndanɗe fof", yo: "Wo gbogbo àtúnyẹ̀wò", ar: "عرض جميع التقييمات", zh: "查看所有评价" },
  home_no_reviews: {
    en: "No reviews yet — be the first to share yours!",
    ha: "Babu ra'ayi tukuna — ka kasance na farko da ya bayar da naka!",
    pcm: "No reviews yet — be di first to drop yours!",
    ff: "Alaa winndande jooni — jaɓ ko adii hollirde ma'aa!",
    yo: "Kò sí àtúnyẹ̀wò tí í — jẹ́ ẹni àkọ́kọ́ tí yóò pín tirẹ!",
    ar: "لا توجد تقييمات حتى الآن — كن أول من يشارك رأيه!",
    zh: "暂无评价——快来抢先分享您的看法！",
  },
  home_leave_review: { en: "Leave a review", ha: "Bar ra'ayi", pcm: "Drop a review", ff: "Winndu winndande", yo: "Fi àtúnyẹ̀wò sílẹ̀", ar: "أضف تقييمًا", zh: "写评价" },
  home_hero_title: {
    en: "Delicious Meals, Made With Love.",
    ha: "Abinci Mai Daɗi, An Yi Shi Da Soyayya.",
    pcm: "Sweet Chop, Made With Love.",
    ff: "Ñaamri Welaa, Defaande e Yiɗde.",
    yo: "Oúnjẹ Dídùn, Tí a Ṣe Pẹ̀lú Ìfẹ́.",
    ar: "وجبات شهية، أُعدت بحب.",
    zh: "美味佳肴，用心烹制。",
  },
  home_hero_subtitle: {
    en: "Enjoy delicious, fresh and affordable meals from {brand}.",
    ha: "Ku ji daɗin abinci mai daɗi, sabo kuma mai araha daga {brand}.",
    pcm: "Enjoy sweet, fresh and affordable chop from {brand}.",
    ff: "Ñaamee ñaamri welaa, kesal, e tiimoowa immorde e {brand}.",
    yo: "Gbádùn oúnjẹ dídùn, tuntun àti owó-ọ̀wọ̀n láti ọwọ́ {brand}.",
    ar: "تذوق وجبات شهية وطازجة وبأسعار معقولة من {brand}.",
    zh: "在{brand}享受美味、新鲜又实惠的餐点。",
  },
  review_singular: { en: "review", ha: "ra'ayi", pcm: "review", ff: "winndande", yo: "àtúnyẹ̀wò", ar: "تقييم", zh: "条评价" },
  review_plural: { en: "reviews", ha: "ra'ayoyi", pcm: "reviews", ff: "winndanɗe", yo: "àwọn àtúnyẹ̀wò", ar: "تقييمات", zh: "条评价" },

  // Menu page
  menu_title: { en: "Our Menu", ha: "Menu Dinmu", pcm: "Our Menu", ff: "Tabik Amen", yo: "Mẹ́nu Wa", ar: "قائمتنا", zh: "我们的菜单" },
  menu_subtitle: {
    en: "Search, filter, and add your favourites to the cart.",
    ha: "Yi bincike, tace, kuma ƙara abin da kake so a cikin kwando.",
    pcm: "Search, filter, and add di ones you like to di cart.",
    ff: "Ɗaɓɓito, suɓo, ɓeydu ko yiɗ-ɗaa nder saggitde.",
    yo: "Wá, yan, kí o sì fi àwọn tí o fẹ́ràn sí inú apẹ̀rẹ̀.",
    ar: "ابحث، صفِّ، وأضف المفضلة لديك إلى السلة.",
    zh: "搜索、筛选，并将喜欢的菜品加入购物车。",
  },
  menu_search_placeholder: { en: "Search for food…", ha: "Nemo abinci…", pcm: "Search for chop…", ff: "Ɗaɓɓito ñaamri…", yo: "Wá oúnjẹ…", ar: "ابحث عن طعام…", zh: "搜索餐食…" },
  menu_sort_prefix: { en: "Sort: ", ha: "Tsara: ", pcm: "Sort: ", ff: "Dammbu: ", yo: "Ìtòsí: ", ar: "ترتيب: ", zh: "排序：" },
  menu_sort_popular: { en: "Most popular", ha: "Mafiya shahara", pcm: "Most popular", ff: "Ɓurɗe anndaaɗe", yo: "Tí ó gbajúmọ̀ jùlọ", ar: "الأكثر شيوعًا", zh: "最受欢迎" },
  menu_sort_price_asc: { en: "Price: low to high", ha: "Farashi: ƙaranci zuwa yawa", pcm: "Price: small to big", ff: "Coggu: famɗo haa ɓuri", yo: "Owó: kékeré sí ńlá", ar: "السعر: من الأقل إلى الأعلى", zh: "价格：从低到高" },
  menu_sort_price_desc: { en: "Price: high to low", ha: "Farashi: yawa zuwa ƙaranci", pcm: "Price: big to small", ff: "Coggu: ɓuri haa famɗo", yo: "Owó: ńlá sí kékeré", ar: "السعر: من الأعلى إلى الأقل", zh: "价格：从高到低" },
  menu_sort_name: { en: "Name A–Z", ha: "Suna A–Z", pcm: "Name A–Z", ff: "Innde A–Z", yo: "Orúkọ A–Z", ar: "الاسم أ–ي", zh: "名称 A–Z" },
  menu_all: { en: "All", ha: "Duka", pcm: "All", ff: "Fof", yo: "Gbogbo", ar: "الكل", zh: "全部" },
  menu_no_match: {
    en: "No dishes match your search yet. Try a different keyword or category.",
    ha: "Babu abincin da ya dace da binciken ka tukuna. Gwada wata kalma ko rukuni.",
    pcm: "No chop match your search yet. Try different word or category.",
    ff: "Alaa ñaamri hawtindii e ɗaɓɓaande maa jooni. Eto wonnde goo maa dental goo.",
    yo: "Kò sí oúnjẹ tí ó bá àwárí rẹ mu. Gbìyànjú ọ̀rọ̀ mìíràn tàbí ẹ̀ka mìíràn.",
    ar: "لا توجد أطباق تطابق بحثك حتى الآن. جرّب كلمة مفتاحية أو فئة مختلفة.",
    zh: "暂无符合搜索条件的菜品，请尝试其他关键词或分类。",
  },
  menu_banner_title: { en: "Fast Delivery & Take Away", ha: "Saurin Kawo Abinci & Ɗauka", pcm: "Fast Delivery & Take Away", ff: "Nawdu Yaawo & Ɓamde", yo: "Ìfiránṣẹ́ Yára & Gbígbé Lọ", ar: "توصيل سريع واستلام", zh: "快速配送与自取" },
  menu_banner_body: {
    en: "Order ahead and we'll have it ready — delivered to you or packed for pickup.",
    ha: "Yi oda tun da wuri za mu shirya shi — a kawo maka ko a shirya don ɗauka.",
    pcm: "Order before time make we ready am — we go deliver am or pack am for you to pick.",
    ff: "Odo gaɗo min heblitoo — nawee ma maa falee fii ɓamde.",
    yo: "Pàṣẹ ṣáájú, a ó sì múra sílẹ̀ — a ó fi ránṣẹ́ sí ọ tàbí kó ó fún gbígbé.",
    ar: "اطلب مسبقًا وسنجهزه لك — يُرسل إليك أو يُعبّأ للاستلام.",
    zh: "提前下单，我们将为您备好——送货上门或打包自取均可。",
  },
  menu_order_whatsapp: { en: "Order on WhatsApp", ha: "Yi Oda Ta WhatsApp", pcm: "Order on WhatsApp", ff: "Odo e WhatsApp", yo: "Pàṣẹ Lórí WhatsApp", ar: "اطلب عبر واتساب", zh: "通过WhatsApp下单" },

  // FoodCard
  card_add_to_cart: { en: "Add to cart", ha: "Ƙara a kwando", pcm: "Add to cart", ff: "Ɓeydu nder saggitde", yo: "Fi sínú apẹ̀rẹ̀", ar: "أضف إلى السلة", zh: "加入购物车" },
  card_photo_soon: { en: "Photo coming soon", ha: "Hoto zai zo nan ba da jimawa ba", pcm: "Photo dey come soon", ff: "Natal arata yoga", yo: "Àwòrán ń bọ̀ láìpẹ́", ar: "الصورة قريبًا", zh: "图片即将上传" },
  card_featured: { en: "Featured", ha: "Fitaccen", pcm: "Featured", ff: "Ɓuraa", yo: "Tí a ṣàfihàn", ar: "مميز", zh: "精选" },
  card_out_of_stock: { en: "Out of stock", ha: "Ya ƙare", pcm: "Don finish", ff: "Timmii", yo: "Ti tán", ar: "غير متوفر", zh: "已售罄" },

  // Cart page
  cart_title: { en: "Your Cart", ha: "Kwandon Ka", pcm: "Your Cart", ff: "Saggitde Maa", yo: "Apẹ̀rẹ̀ Rẹ", ar: "سلتك", zh: "您的购物车" },
  cart_empty_title: { en: "Your cart is empty", ha: "Kwandon ka babu kome", pcm: "Your cart empty", ff: "Saggitde maa ɗum alaa huunde", yo: "Apẹ̀rẹ̀ rẹ ṣófo", ar: "سلتك فارغة", zh: "购物车为空" },
  cart_empty_body: {
    en: "Add something delicious from the menu to get started.",
    ha: "Ƙara wani abinci mai daɗi daga menu don farawa.",
    pcm: "Add sweet thing from di menu to start.",
    ff: "Ɓeydu huunde welaa immorde e tabik fii fuɗɗaade.",
    yo: "Fi ohun dídùn kan kún inú rẹ̀ láti orí mẹ́nu láti bẹ̀rẹ̀.",
    ar: "أضف شيئًا شهيًا من القائمة للبدء.",
    zh: "从菜单中添加美味佳肴，开始购物吧。",
  },
  cart_browse_menu: { en: "Browse the menu", ha: "Duba menu", pcm: "Browse di menu", ff: "Ƴeewo tabik", yo: "Wo mẹ́nu", ar: "تصفح القائمة", zh: "浏览菜单" },
  cart_each: { en: "each", ha: "kowanne", pcm: "each", ff: "kala gooto", yo: "ọ̀kọ̀ọ̀kan", ar: "للواحد", zh: "每份" },
  cart_remove: { en: "Remove", ha: "Cire", pcm: "Remove", ff: "Ittu", yo: "Yọ Kúrò", ar: "إزالة", zh: "移除" },
  cart_finding_suggestions: { en: "Finding things that go well together…", ha: "Ana neman abubuwan da suka dace tare…", pcm: "We dey find things wey go fine together…", ff: "Min ɗaɓɓoyii kuutorɗe hawtindiiɗe…", yo: "Ń wá àwọn ohun tí ó bá a mu dáradára…", ar: "نبحث عن أطباق تتناسب مع طلبك…", zh: "正在寻找搭配推荐…" },
  cart_goes_well: { en: "Goes well with your order", ha: "Ya dace da odar ka", pcm: "E go fine well with your order", ff: "Ɗum hawta e odaa ma", yo: "Ó bá àṣẹ rẹ mu dáradára", ar: "يتناسب جيدًا مع طلبك", zh: "与您的订单很搭" },
  cart_add: { en: "Add", ha: "Ƙara", pcm: "Add", ff: "Ɓeydu", yo: "Fi Kún", ar: "أضف", zh: "添加" },
  cart_subtotal: { en: "Subtotal", ha: "Jumla", pcm: "Subtotal", ff: "Limoore seeɗa", yo: "Àpapọ̀ Apá kan", ar: "المجموع الفرعي", zh: "小计" },
  cart_checkout: { en: "Proceed to checkout", ha: "Ci gaba zuwa biya", pcm: "Go to checkout", ff: "Jokku to yoɓde", yo: "Tẹ̀síwájú sí Ìsanwó", ar: "المتابعة إلى الدفع", zh: "去结算" },

  // Checkout page
  checkout_title: { en: "Checkout", ha: "Biya", pcm: "Checkout", ff: "Yoɓde", yo: "Ìsanwó", ar: "الدفع", zh: "结算" },
  checkout_empty: {
    en: "Your cart is empty, so there's nothing to check out yet.",
    ha: "Kwandon ka babu kome, don haka babu abin biya tukuna.",
    pcm: "Your cart empty, so nothing to checkout yet.",
    ff: "Saggitde maa alaa huunde, alaa ko yoɓetee jooni.",
    yo: "Apẹ̀rẹ̀ rẹ ṣófo, nítorí náà kò sí ohun tí ó yẹ kí a sanwó fún.",
    ar: "سلتك فارغة، فلا يوجد ما يمكن الدفع مقابله حاليًا.",
    zh: "您的购物车为空，暂时没有可结算的内容。",
  },
  checkout_go_menu: { en: "Go to the menu", ha: "Je zuwa menu", pcm: "Go to di menu", ff: "Yah to tabik", yo: "Lọ sí mẹ́nu", ar: "الذهاب إلى القائمة", zh: "前往菜单" },
  checkout_full_name: { en: "Full name", ha: "Cikakken suna", pcm: "Full name", ff: "Innde timmunde", yo: "Orúkọ Kíkún", ar: "الاسم الكامل", zh: "姓名" },
  checkout_phone: { en: "Phone number", ha: "Lambar waya", pcm: "Phone number", ff: "Limngal tele", yo: "Nọ́mbà Fóònù", ar: "رقم الهاتف", zh: "电话号码" },
  checkout_phone_placeholder: { en: "080…", ha: "080…", pcm: "080…", ff: "080…", yo: "080…", ar: "080…", zh: "080…" },
  checkout_order_type: { en: "Order type", ha: "Irin oda", pcm: "Order type", ff: "Nooɗe odaa", yo: "Irú Oda", ar: "نوع الطلب", zh: "订单类型" },
  checkout_dine_in: { en: "Dine-in", ha: "Ci a wurin", pcm: "Dine-in", ff: "Ñaamu nder", yo: "Jíjẹun Nílé", ar: "تناول في المطعم", zh: "堂食" },
  checkout_takeaway: { en: "Takeaway", ha: "Ɗauka", pcm: "Takeaway", ff: "Ɓamde", yo: "Gbígbé Lọ", ar: "استلام", zh: "打包自取" },
  checkout_delivery: { en: "Delivery", ha: "Kawo wa", pcm: "Delivery", ff: "Nawdu", yo: "Ìfiránṣẹ́", ar: "توصيل", zh: "外送" },
  checkout_delivery_address: { en: "Delivery address", ha: "Adireshin kawowa", pcm: "Delivery address", ff: "Ƴettirde nawdu", yo: "Àdírẹ́sì Ìfiránṣẹ́", ar: "عنوان التوصيل", zh: "配送地址" },
  checkout_pickup_notes: { en: "Pickup notes (optional)", ha: "Bayani kan ɗauka (ba dole ba)", pcm: "Pickup notes (optional)", ff: "Tintinoore ɓamde (hoynde)", yo: "Àkíyèsí fún gbígbé (kò pọn dandan)", ar: "ملاحظات الاستلام (اختياري)", zh: "取餐备注（可选）" },
  checkout_share_location: {
    en: "Share your location for an accurate delivery fee based on distance, or skip to use the standard fee.",
    ha: "Raba wurin da kake domin daidai kudin kawowa bisa nisa, ko ka tsallake don amfani da kudin da aka saba.",
    pcm: "Share your location so we go sabi correct delivery fee based on distance, or skip use di normal fee.",
    ff: "Winndito nokku maa fii yoɓde nawdu yoocaare e njaawdi, maa ɓaŋ-ɗaa jogaade yoɓde adaande.",
    yo: "Pín ipò rẹ fún owó ìfiránṣẹ́ tí ó pé gẹ́gẹ́ bí ìjìnà, tàbí fo ìgbésẹ̀ yìí láti lo owó ìfiránṣẹ́ déédé.",
    ar: "شارك موقعك للحصول على رسوم توصيل دقيقة بحسب المسافة، أو تخطَّ هذه الخطوة لاستخدام الرسوم القياسية.",
    zh: "分享您的位置以获取按距离计算的准确配送费，或跳过此步骤使用标准配送费。",
  },
  checkout_use_my_location: { en: "📍 Use my location", ha: "📍 Yi amfani da wurina", pcm: "📍 Use my location", ff: "📍 Jogaade nokku am", yo: "📍 Lo ipò mi", ar: "📍 استخدم موقعي", zh: "📍 使用我的位置" },
  checkout_distance_fee: {
    en: "You're about {km} km away — delivery fee: {fee}",
    ha: "Kana nisan kilomita {km} — kudin kawowa: {fee}",
    pcm: "You dey about {km} km away — delivery fee: {fee}",
    ff: "A woɗɗitii ko ɓadii {km} km — coggu nawdu: {fee}",
    yo: "O wà ní bíi {km} km síbi — owó ìfiránṣẹ́: {fee}",
    ar: "أنت على بعد حوالي {km} كم — رسوم التوصيل: {fee}",
    zh: "您距离约 {km} 公里——配送费：{fee}",
  },
  checkout_getting_location: { en: "Getting your location…", ha: "Ana samo wurin ka…", pcm: "We dey get your location…", ff: "Min ɗaɓɓoyii nokku maa…", yo: "Ń rí ipò rẹ…", ar: "جارٍ تحديد موقعك…", zh: "正在获取您的位置…" },
  checkout_location_denied: {
    en: "Couldn't access your location — using the standard delivery fee instead.",
    ha: "Ba mu iya samun wurin ka ba — za mu yi amfani da kudin kawowa na asali maimakon.",
    pcm: "We no fit reach your location — we go use di normal delivery fee instead.",
    ff: "Min heɓaa nokku maa — min jogaade yoɓde nawdu adaande.",
    yo: "A kò lè rí ipò rẹ — a ó lo owó ìfiránṣẹ́ déédé dípò rẹ̀.",
    ar: "تعذّر الوصول إلى موقعك — سنستخدم رسوم التوصيل القياسية بدلاً من ذلك.",
    zh: "无法获取您的位置——将改用标准配送费。",
  },
  checkout_notes_label: { en: "Additional notes (optional)", ha: "Ƙarin bayani (ba dole ba)", pcm: "Additional notes (optional)", ff: "Tintinoore goɗɗo (hoynde)", yo: "Àkíyèsí mìíràn (kò pọn dandan)", ar: "ملاحظات إضافية (اختياري)", zh: "其他备注（可选）" },
  checkout_subtotal: { en: "Subtotal", ha: "Jumla", pcm: "Subtotal", ff: "Limoore seeɗa", yo: "Àpapọ̀ Apá kan", ar: "المجموع الفرعي", zh: "小计" },
  checkout_takeaway_fee: { en: "Takeaway fee", ha: "Kudin ɗauka", pcm: "Takeaway fee", ff: "Coggu ɓamde", yo: "Owó Gbígbé Lọ", ar: "رسوم الاستلام", zh: "打包费" },
  checkout_delivery_fee: { en: "Delivery fee", ha: "Kudin kawowa", pcm: "Delivery fee", ff: "Coggu nawdu", yo: "Owó Ìfiránṣẹ́", ar: "رسوم التوصيل", zh: "配送费" },
  checkout_total: { en: "Total", ha: "Jimla duka", pcm: "Total", ff: "Limoore fof", yo: "Àpapọ̀", ar: "الإجمالي", zh: "总计" },
  checkout_currently_closed: { en: "Currently closed", ha: "A yanzu haka an rufe", pcm: "Currently closed", ff: "Ɓaawo jooni", yo: "Ti pa ní ìsinsìnyí", ar: "مغلق حاليًا", zh: "当前已关闭" },
  checkout_placing_order: { en: "Placing order…", ha: "Ana shirya oda…", pcm: "We dey place order…", ff: "Min wadii odaa…", yo: "Ń fi àṣẹ ránṣẹ́…", ar: "جارٍ تقديم الطلب…", zh: "正在提交订单…" },
  checkout_submit: { en: "Checkout on WhatsApp", ha: "Biya Ta WhatsApp", pcm: "Checkout on WhatsApp", ff: "Yoɓ e WhatsApp", yo: "Sanwó Lórí WhatsApp", ar: "الدفع عبر واتساب", zh: "通过WhatsApp结算" },
  checkout_footnote: {
    en: "Your order is saved first, then WhatsApp opens with the details pre-filled — just hit send to confirm.",
    ha: "Da farko za a adana odar ka, sannan WhatsApp zai buɗe da cikakkun bayanai — kawai danna aika domin tabbatarwa.",
    pcm: "Your order go save first, then WhatsApp go open with di details already fill — just hit send to confirm.",
    ff: "Odaa ma waɗata adan, refti WhatsApp uddata e kabaruuji ɗin fuɗɗiiɗi — yottu neldu fii tabitinde.",
    yo: "A kọ́kọ́ máa fi àṣẹ rẹ pamọ́, lẹ́yìn náà WhatsApp yóò ṣí sílẹ̀ pẹ̀lú àwọn ìsọfúnni tí a ti kọ sí i — kàn tẹ fi ránṣẹ́ láti jẹ́rìí sí i.",
    ar: "يُحفظ طلبك أولًا، ثم يُفتح واتساب مع تعبئة التفاصيل مسبقًا — فقط اضغط إرسال للتأكيد.",
    zh: "您的订单会先保存，随后WhatsApp会打开并自动填好订单详情——只需点击发送即可确认。",
  },
  checkout_closed_message: {
    en: "We're currently closed ({hours}). You can't check out right now, but your cart is saved — come back when we're open!",
    ha: "A yanzu haka mun rufe ({hours}). Ba za ka iya biya yanzu ba, amma kwandon ka an adana shi — dawo idan mun buɗe!",
    pcm: "We don close for now ({hours}). You no fit checkout now, but your cart dey save — come back when we open!",
    ff: "Minen ɓaawii jooni ({hours}). A waawaa yoɓde jooni, kono saggitde maa ndenndaama — artu ko min uddi!",
    yo: "A ti pa ní ìsinsìnyí ({hours}). O kò lè sanwó nísinsìnyí, ṣùgbọ́n apẹ̀rẹ̀ rẹ ti wà ní pamọ́ — padà wá nígbà tí a bá ṣí!",
    ar: "نحن مغلقون حاليًا ({hours}). لا يمكنك الدفع الآن، ولكن سلتك محفوظة — عد إلينا عندما نكون مفتوحين!",
    zh: "我们目前暂停营业（{hours}）。暂时无法结算，但您的购物车内容已保存——营业后请再回来下单！",
  },
  checkout_submit_error: {
    en: "We couldn't save your order right now. Please check your connection and try again, or call us directly.",
    ha: "Ba mu iya adana odar ka yanzu ba. Don Allah duba hadin yanar gizo kuma gwada sake, ko ka kira mu kai tsaye.",
    pcm: "We no fit save your order now. Please check your connection try again, or call us directly.",
    ff: "Min waawaa danndude odaa ma jooni. Ƴeewo hawtitaare internet maa eto kadi, maa noddu min.",
    yo: "A kò lè fi àṣẹ rẹ pamọ́ nísinsìnyí. Jọ̀wọ́ ṣayẹ̀wò ìsopọ̀ rẹ kí o sì gbìyànjú lẹ́ẹ̀kan sí i, tàbí pe wá tààrà.",
    ar: "تعذّر حفظ طلبك الآن. يرجى التحقق من اتصالك والمحاولة مرة أخرى، أو الاتصال بنا مباشرة.",
    zh: "目前无法保存您的订单。请检查网络连接后重试，或直接联系我们。",
  },
  checkout_error_name: { en: "Please enter your name.", ha: "Don Allah shigar da sunanka.", pcm: "Abeg enter your name.", ff: "Winndu innde maa.", yo: "Jọ̀wọ́ kọ orúkọ rẹ.", ar: "يرجى إدخال اسمك.", zh: "请输入您的姓名。" },
  checkout_error_phone_required: { en: "Please enter a phone number.", ha: "Don Allah shigar da lambar waya.", pcm: "Abeg enter phone number.", ff: "Winndu limngal tele.", yo: "Jọ̀wọ́ kọ nọ́mbà fóònù rẹ.", ar: "يرجى إدخال رقم هاتف.", zh: "请输入电话号码。" },
  checkout_error_phone_invalid: { en: "Enter a valid Nigerian phone number.", ha: "Shigar da lambar waya ta Najeriya da ta dace.", pcm: "Enter correct Nigerian phone number.", ff: "Winndu limngal tele Najeriya moƴƴungal.", yo: "Kọ nọ́mbà fóònù Nàìjíríà tí ó tọ́.", ar: "أدخل رقم هاتف نيجيري صحيح.", zh: "请输入有效的尼日利亚电话号码。" },
  checkout_error_address: { en: "Delivery address is required for delivery orders.", ha: "Ana bukatar adireshin kawowa domin odar kawowa.", pcm: "Delivery address dey needed for delivery orders.", ff: "Ƴettirde nawdu haani fii oda nawdu.", yo: "Àdírẹ́sì ìfiránṣẹ́ pọn dandan fún àṣẹ ìfiránṣẹ́.", ar: "عنوان التوصيل مطلوب لطلبات التوصيل.", zh: "外送订单必须填写配送地址。" },

  // Contact page
  contact_title: { en: "Contact Us", ha: "Tuntube Mu", pcm: "Contact Us", ff: "Heɓto Amen", yo: "Kàn Sí Wa", ar: "تواصل معنا", zh: "联系我们" },
  contact_visit: { en: "Visit", ha: "Ziyarta", pcm: "Visit", ff: "Ƴeewo", yo: "Bẹ̀ Wá Wò", ar: "زورونا", zh: "到店地址" },
  contact_open_daily: { en: "Open {hours} daily", ha: "Muna buɗe {hours} kowace rana", pcm: "We open {hours} every day", ff: "Uddaama {hours} ñalawma kala", yo: "A ń ṣí ní {hours} lójoojúmọ́", ar: "نعمل من {hours} يوميًا", zh: "每日营业时间 {hours}" },
  contact_call_whatsapp: { en: "Call or WhatsApp", ha: "Kira ko WhatsApp", pcm: "Call or WhatsApp", ff: "Noddu maa WhatsApp", yo: "Pe tàbí WhatsApp", ar: "اتصل أو واتساب", zh: "电话或WhatsApp" },
  contact_chat_whatsapp: { en: "Chat on WhatsApp", ha: "Hira a WhatsApp", pcm: "Chat on WhatsApp", ff: "Haalu e WhatsApp", yo: "Bá Wa Sọ̀rọ̀ Lórí WhatsApp", ar: "تحدث معنا عبر واتساب", zh: "通过WhatsApp联系我们" },
  contact_email: { en: "Email", ha: "Imel", pcm: "Email", ff: "Imeel", yo: "Ímeèlì", ar: "البريد الإلكتروني", zh: "电子邮箱" },

  // About page
  about_title: { en: "About {brand}", ha: "Game da {brand}", pcm: "About {brand}", ff: "Fii {brand}", yo: "Nípa {brand}", ar: "عن {brand}", zh: "关于{brand}" },
  about_our_story: { en: "Our Story", ha: "Labarinmu", pcm: "Our Story", ff: "Daartol Amen", yo: "Ìtàn Wa", ar: "قصتنا", zh: "我们的故事" },
  about_our_mission: { en: "Our Mission", ha: "Manufarmu", pcm: "Our Mission", ff: "Mijo Amen", yo: "Ìpinnu Wa", ar: "مهمتنا", zh: "我们的使命" },
  about_our_vision: { en: "Our Vision", ha: "Hangen Nesanmu", pcm: "Our Vision", ff: "Tasarwa Amen", yo: "Ìran Wa", ar: "رؤيتنا", zh: "我们的愿景" },
  about_quality_food: { en: "Quality Food", ha: "Abinci Mai Inganci", pcm: "Quality Food", ff: "Ñaamri Moƴƴiri", yo: "Oúnjẹ Dáradára", ar: "طعام ذو جودة عالية", zh: "优质美食" },
  about_quality_food_body: { en: "Every dish is prepared fresh using quality ingredients.", ha: "Kowane abinci ana shirya shi sabo da kayan inganci.", pcm: "Every dish dem prepare fresh with quality ingredients.", ff: "Kala ñaamri defaama kesal e kaalisi moƴƴi.", yo: "A máa ń pèsè oúnjẹ kọ̀ọ̀kan pẹ̀lú àwọn ohun èlò dáradára.", ar: "يُحضَّر كل طبق طازجًا باستخدام مكونات ذات جودة.", zh: "每道菜都使用优质食材新鲜制作。" },
  about_customer_satisfaction: { en: "Customer Satisfaction", ha: "Gamsar Da Abokin Ciniki", pcm: "Customer Satisfaction", ff: "Weltaare Coggitooɓe", yo: "Ìtẹ́lọ́rùn Oníbàárà", ar: "رضا العملاء", zh: "顾客满意度" },
  about_customer_satisfaction_body: { en: "We aim to get your order right, every single time.", ha: "Muna ƙoƙari mu tabbatar oda ta daidaita a kowane lokaci.", pcm: "We dey try make your order correct every single time.", ff: "Min eto odaa ma yo wonu moƴƴi saa'i kala.", yo: "Ète wa ni láti rí i dájú pé àṣẹ rẹ bá dáa, ní gbogbo ìgbà.", ar: "هدفنا هو إعداد طلبك بشكل صحيح في كل مرة.", zh: "我们致力于每一次都做对您的订单。" },
  about_clean_environment: { en: "Clean Environment", ha: "Tsaftataccen Wuri", pcm: "Clean Environment", ff: "Nokku Laɓɓinaaɗo", yo: "Àyíká Mímọ́", ar: "بيئة نظيفة", zh: "清洁环境" },
  about_clean_environment_body: { en: "A welcoming, clean space whether you dine in or pick up.", ha: "Wuri mai tsabta kuma mai karbar baki, ko ka ci a wurin ko ka ɗauka.", pcm: "A welcoming, clean place whether you dine in or pick up.", ff: "Nokku jaɓɓiiɗo, laɓɓinaaɗo so a ñaamii nder maa ɓami.", yo: "Ààyè tí ó mọ́ tí ó sì ṣe ìtẹ́wọ́gbà yálà o jẹun nílé tàbí o gbé lọ.", ar: "مكان نظيف ومرحّب سواء تناولت الطعام هنا أو استلمته.", zh: "无论堂食还是自取，都能享受干净舒适的环境。" },

  // Reviews page
  reviews_title: { en: "Customer Reviews", ha: "Ra'ayoyin Abokan Ciniki", pcm: "Customer Reviews", ff: "Winndanɗe Coggitooɓe", yo: "Àtúnyẹ̀wò Oníbàárà", ar: "تقييمات العملاء", zh: "顾客评价" },
  reviews_subtitle: {
    en: "Share your experience, or reply to what others are saying — just like a normal discussion.",
    ha: "Raba abin da ka samu, ko ka amsa wa abin da wasu suke faɗi — kamar tattaunawa ta yau da kullum.",
    pcm: "Share your experience, or reply to wetin others dey talk — just like normal discussion.",
    ff: "Winndito ko a tamii, maa jaabo ko goɗɓe wi'i — hono haaltol saɗtuɗol.",
    yo: "Pín ìrírí rẹ, tàbí dáhùn sí ohun tí àwọn mìíràn ń sọ — gẹ́gẹ́ bí ìjíròrò lélẹ̀.",
    ar: "شارك تجربتك، أو ردّ على ما يقوله الآخرون — تمامًا كالنقاش العادي.",
    zh: "分享您的体验，或回复其他人的评论——就像平常聊天一样。",
  },
  reviews_leave_review: { en: "Leave a review", ha: "Bar ra'ayi", pcm: "Drop a review", ff: "Winndu winndande", yo: "Fi àtúnyẹ̀wò sílẹ̀", ar: "أضف تقييمًا", zh: "写评价" },
  reviews_name_placeholder: { en: "Your name", ha: "Sunanka", pcm: "Your name", ff: "Innde maa", yo: "Orúkọ rẹ", ar: "اسمك", zh: "您的姓名" },
  reviews_message_placeholder: { en: "What did you think?", ha: "Me ka gani?", pcm: "Wetin you think?", ff: "Ko miijii-ɗaa?", yo: "Kín ni o rò?", ar: "ما رأيك؟", zh: "您的感受如何？" },
  reviews_rating_label: { en: "Rating:", ha: "Daraja:", pcm: "Rating:", ff: "Dammbugol:", yo: "Ìwọ̀n:", ar: "التقييم:", zh: "评分：" },
  reviews_post_review: { en: "Post review", ha: "Tura ra'ayi", pcm: "Post review", ff: "Nelu winndande", yo: "Fi Àtúnyẹ̀wò Ránṣẹ́", ar: "نشر التقييم", zh: "发布评价" },
  reviews_posting: { en: "Posting…", ha: "Ana tura…", pcm: "Posting…", ff: "Neldata…", yo: "Ń fi ránṣẹ́…", ar: "جارٍ النشر…", zh: "正在发布…" },
  reviews_no_reviews: {
    en: "No reviews yet — be the first to share your experience!",
    ha: "Babu ra'ayi tukuna — ka zama na farko da ya raba abin da ka samu!",
    pcm: "No reviews yet — be di first to share your experience!",
    ff: "Alaa winndande jooni — jaɓ ko adii hollirde tamuru maa!",
    yo: "Kò sí àtúnyẹ̀wò tí í — jẹ́ ẹni àkọ́kọ́ tí yóò pín ìrírí rẹ!",
    ar: "لا توجد تقييمات حتى الآن — كن أول من يشارك تجربته!",
    zh: "暂无评价——快来抢先分享您的体验！",
  },
  reviews_reply: { en: "Reply", ha: "Amsa", pcm: "Reply", ff: "Jaabo", yo: "Dáhùn", ar: "رد", zh: "回复" },
  reviews_cancel: { en: "Cancel", ha: "Soke", pcm: "Cancel", ff: "Haaytu", yo: "Fagilé", ar: "إلغاء", zh: "取消" },
  reviews_reply_placeholder: { en: "Write a reply…", ha: "Rubuta amsa…", pcm: "Write a reply…", ff: "Winndu jaabawol…", yo: "Kọ ìdáhùn kan…", ar: "اكتب ردًا…", zh: "写下回复…" },
  reviews_post_reply: { en: "Post reply", ha: "Tura amsa", pcm: "Post reply", ff: "Nelu jaabawol", yo: "Fi Ìdáhùn Ránṣẹ́", ar: "نشر الرد", zh: "发布回复" },

  // Track order page
  track_title: { en: "Track Your Order", ha: "Bin Diddigin Odar Ka", pcm: "Track Your Order", ff: "Ƴeewndo Odaa Ma", yo: "Tọpa Àṣẹ Rẹ", ar: "تتبع طلبك", zh: "跟踪您的订单" },
  track_subtitle: {
    en: "Paste the order ID from your WhatsApp confirmation message to see its status.",
    ha: "Liƙa lambar odar da ka samu a saƙon tabbatarwa na WhatsApp domin ganin matsayinta.",
    pcm: "Paste di order ID from your WhatsApp confirmation message to see di status.",
    ff: "Winndito ID odaa ɓamaa e nder battande WhatsApp fii yiɛtaade darnde mum.",
    yo: "Fi ìdí àṣẹ (Order ID) tí ó wà nínú ìránṣẹ́ ìjẹ́rìí WhatsApp rẹ síbí láti rí ipò rẹ̀.",
    ar: "ألصق رقم الطلب من رسالة تأكيد واتساب لمعرفة حالته.",
    zh: "粘贴WhatsApp确认消息中的订单编号以查看订单状态。",
  },
  track_placeholder: { en: "Order ID", ha: "Lambar Oda", pcm: "Order ID", ff: "ID Odaa", yo: "Ìdí Àṣẹ", ar: "رقم الطلب", zh: "订单编号" },
  track_button: { en: "Track", ha: "Bi Diddigi", pcm: "Track", ff: "Ƴeewndo", yo: "Tọpa", ar: "تتبع", zh: "查询" },
  track_looking_up: { en: "Looking up your order…", ha: "Ana neman odar ka…", pcm: "We dey look up your order…", ff: "Min ɗaɓɓotii odaa ma…", yo: "Ń wá àṣẹ rẹ…", ar: "جارٍ البحث عن طلبك…", zh: "正在查询您的订单…" },
  track_not_found: {
    en: "We couldn't find an order with that ID. Double-check it and try again.",
    ha: "Ba mu samu odar da wannan lamba ba. Sake duba sannan ka gwada.",
    pcm: "We no fit find order with dat ID. Double-check am try again.",
    ff: "Min heɓaa odaa e ID ngoon. Ƴeewtu kadi eto kadi.",
    yo: "A kò rí àṣẹ kan pẹ̀lú ìdí yẹn. Ṣayẹ̀wò rẹ̀ dáadáa kí o sì gbìyànjú lẹ́ẹ̀kan sí i.",
    ar: "لم نتمكن من العثور على طلب بهذا الرقم. تحقق منه وحاول مرة أخرى.",
    zh: "未找到该编号对应的订单，请核对后重试。",
  },
  track_status_pending: { en: "Pending", ha: "Jiran Aiki", pcm: "Pending", ff: "Habbetee", yo: "Ń dúró", ar: "قيد الانتظار", zh: "待处理" },
  track_status_confirmed: { en: "Confirmed", ha: "An Tabbatar", pcm: "Confirmed", ff: "Tabitinaama", yo: "Ti Jẹ́rìí", ar: "مؤكَّد", zh: "已确认" },
  track_status_preparing: { en: "Preparing", ha: "Ana Shiryawa", pcm: "Dem dey prepare am", ff: "Hiɓɓaama", yo: "Ń Múra Sílẹ̀", ar: "قيد التحضير", zh: "制作中" },
  track_status_ready: { en: "Ready", ha: "An Shirya", pcm: "Ready", ff: "Deƴƴii", yo: "Ti Ṣetán", ar: "جاهز", zh: "已备好" },
  track_status_out_for_delivery: { en: "Out for Delivery", ha: "Ana Kai Shi", pcm: "Dem dey bring am", ff: "Nder nawdu", yo: "Ń Lọ fún Ìfiránṣẹ́", ar: "في الطريق للتوصيل", zh: "配送中" },
  track_status_completed: { en: "Completed", ha: "An Kammala", pcm: "Completed", ff: "Timmii", yo: "Ti Parí", ar: "مكتمل", zh: "已完成" },
  track_status_cancelled: {
    en: "This order was cancelled.",
    ha: "An soke wannan odar.",
    pcm: "Dis order don cancel.",
    ff: "Odaa ɗii haaytaama.",
    yo: "A ti fagilé àṣẹ yìí.",
    ar: "تم إلغاء هذا الطلب.",
    zh: "该订单已取消。",
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
