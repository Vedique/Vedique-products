export const products = [
  {
    id: 1,
    slug: 'black-kavuni',
    name: 'Black Kavuni Mix',
    category: 'Food',
    subCategory: 'Ancient Grain Blend',
    shortDescription: 'Ancient grain blend for vitality and wellness',
    fullDescription: 'Black Kavuni, also known as Black Rice, has been treasured for centuries in traditional wellness practices. Our premium blend combines this rare grain with carefully selected herbs and natural ingredients to create a powerful wellness supplement.',
    price: 75,
    stockStatus: 'In Stock',
    // images array now supports multiple photos for carousel slides
    image: new URL('../assets/images/products/black_kavuni_mix/Black_kavuni_mix_1.jpeg', import.meta.url).href,
    images: [
      new URL('../assets/images/products/black_kavuni_mix/Black_kavuni_mix_1.jpeg', import.meta.url).href,
      new URL('../assets/images/products/black_kavuni_mix/Black_kavuni_mix_2.jpeg', import.meta.url).href,
      new URL('../assets/images/products/black_kavuni_mix/Black_kavuni_mix_3.jpeg', import.meta.url).href,
    ],
    netWeight: '250 g',
    servingSize: '2 teaspoons (10 g)',
    servingsPerPack: '25 servings',
    origin: 'Tamil Nadu, India',
    shelfLife: '6 months',
    dietaryInfo: ['No Added Sugar', 'No Preservatives', 'Vegetarian'],
    ingredients: [
      'Organic Black Kavuni Rice',
      'Ashwagandha',
      'Brahmi',
      'Shatavari',
      'Natural Honey',
      'Saffron'
    ],
    howToUse: 'Mix 2 teaspoons with warm water or milk once daily, preferably in the morning on an empty stomach.',
    benefits: [
      'Boosts natural immunity',
      'Enhances vitality',
      'Supports mental clarity',
      'Rich in antioxidants',
      'Promotes overall wellness'
    ]
  },

  {
    id: 2, // Assuming this follows Black Kavuni
    slug: 'karuva-mix',
    name: 'Karuva Mix',
    category: 'Food',
    subCategory: 'Herbal Spice Blend',
    shortDescription: 'Traditional South Indian wellness spice blend',
    fullDescription: 'Rooted in tradition and crafted for today, Karuva Mix is a premium wellness blend inspired by authentic Tamil heritage. This coarse herbal spice powder is meticulously prepared using a time-honored roasting process to ensure maximum depth of flavor and aroma.',
    price: 55,
    stockStatus: 'In Stock',
    image: new URL('../assets/images/products/karuva_mix/karuva_mix_1.png', import.meta.url).href,
    images: [
      new URL('../assets/images/products/karuva_mix/karuva_mix_1.png', import.meta.url).href,
      new URL('../assets/images/products/karuva_mix/karuva_mix_2.jpeg', import.meta.url).href,
      new URL('../assets/images/products/karuva_mix/karuva_mix_3.jpeg', import.meta.url).href,
      new URL('../assets/images/products/karuva_mix/karuva_mix_4.jpeg', import.meta.url).href,
    ],
    netWeight: '150 g',
    servingSize: '1 tablespoon (15 g)',
    servingsPerPack: '13 servings',
    origin: 'Tamil Nadu, India',
    shelfLife: '6 months',
    dietaryInfo: ['100% Natural', 'No Artificial Additives', 'No Preservatives', 'Vegetarian'],
    ingredients: [
      'Curry Leaves',
      'Coriander Leaves',
      'Flax Seeds',
      'Chana Dal',
      'Urad Dal',
      'Peanuts',
      'Black Urad',
      'Dried Red Chilli',
      'Kashmiri Red Chilli',
      'Asafoetida',
      'Salt'
    ],
    howToUse: 'Pairs perfectly with hot rice and ghee, or as a flavorful accompaniment to idli and dosa. Can also be used to garnish traditional South Indian curries.',
    benefits: [
      'Rich in iron-supporting ingredients',
      'Balanced blend of protein and fiber sources',
      'Traditionally roasted for depth and aroma',
      'Promotes digestive wellness',
      'Authentic traditional flavor profile'
    ]
  },

]

export const videos = [
  {
    id: 1,
    title: 'The Making of Black Kavuni',
    thumbnail: 'https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&w=800&q=80',
    link: 'https://instagram.com/vedique/reel1'
  },
  {
    id: 2,
    title: 'Wellness Tips with Vedique',
    thumbnail: 'https://images.unsplash.com/photo-1519823551278-64ac92734ab2?auto=format&fit=crop&w=800&q=80',
    link: 'https://youtube.com/vedique/shorts1'
  }
]
