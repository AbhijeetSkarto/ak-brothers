
export const BRAND = {
  name: 'AK BROTHERS',
  logo: 'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/94792149-d0b8-4e3e-b801-c62ef1297368-IMG_5256.PNG',
  heroBg: 'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/f9cfc13f-a90b-45f1-b554-289482e6140a-88.jpg',
  phone: '07566075512',
  email: 'akbrothersweddings@gmail.com',
  instagram: 'https://www.instagram.com/ak_brothers_photography?igsh=dHk1a2hudW81NWN3',
  address: 'House no 78 Bhavani Dham, Phase-2, Ayodhya Bypass Road, Narela Shankri. Bhopal',
};

export const WHATSAPP_NUMBER = '917566075512';

export const THEME_EFFECTS = {
  natural: '',
  noir: 'grayscale contrast-125',
  vintage: 'sepia-[.3] contrast-[0.9] brightness-110',
  vivid: 'saturate-[1.4] contrast-110',
  matte: 'brightness-110 contrast-90 saturate-[0.8]',
};

export const NAV_SECTIONS = [
  { name: 'Stories', path: '/stories' },
  { name: 'Portraits', path: '/images' },
  { name: 'Films', path: '/films' },
  { name: 'Photobooks', path: '/photobooks' },
  { name: 'Pre-Weddings', path: '/pre-weddings' },
  { name: 'Special Highlights', path: '/special' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/Contact Us' },
];

export const GALLERY_DATABASE = {
  portraits: [
    'https://images.unsplash.com/photo-1512100356132-db7f5c4e319a?q=80&w=1200',
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/eae86dfb-7c55-4691-9b9a-60b1677fb07e-005.jpg',
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/97978b63-dbed-4fff-a61e-b60f5fd6eb57-69.jpg',
    'https://images.unsplash.com/photo-1583939411023-1478317ad1f9?q=80&w=1200',
    'https://images.unsplash.com/photo-1604017011836-739921773ee3?q=80&w=1200',
    'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200',
  ],
  stories: [
    'https://acqlo-fff.s3.ap-south-1.amazonaws.com/user_uploads/f9cfc13f-a90b-45f1-b554-289482e6140a-88.jpg',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200',
    'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?q=80&w=1200',
  ],
  preWeddings: [
    'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=1200',
    'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=1200',
    'https://images.unsplash.com/photo-1529634597503-139d672a783e?q=80&w=1200',
    'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200',
  ],
  photobooks: [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800',
    'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800',
  ],
  films: [
    { title: 'The Royal Wedding of Bhopal', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Eternal Vows at Lake View', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Golden Hour Memories', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Love in the Pink City', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'A Udaipur Fairytale', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Monsoon Wedding', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'Sangeet Night Lights', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { title: 'The Grand Reception', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ]
};

export const PORTFOLIO_IMAGES = [...GALLERY_DATABASE.portraits, ...GALLERY_DATABASE.stories];
