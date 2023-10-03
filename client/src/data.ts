import { Store } from "./app/shared/models/Store";
import { Tag } from "./app/shared/models/Tag";
import { News } from "./app/shared/models/News";

export const sample_stores: Store[] = [
  {
    id: '1',
    name: 'Champagne Dom Perignon Vintage 2008',
    price: 10,
    origins: ['italy', 'vine'],
    stars: 4.5,
    imageUrl: 'assets/vine.jpg',
    tags: ['Vine'],
    capacity: 750,
    strength: 12,
    added: false,
  },
  {
    id: '2',
    name: '14 Hands Winery Selfpoint',
    price: 20,
    origins: ['columbia', 'vine'],
    stars: 4.7,
    imageUrl: 'assets/vine2.jpg',
    tags: ['Vine'],
    capacity: 700,
    strength: 14.5,
    added: false,
  },
  {
    id: '3',
    name: 'Beer Corona Extra',
    price: 5,
    origins: ['mexico', 'beer'],
    stars: 3.5,
    imageUrl: 'assets/beer1.jpg',
    tags: ['Beer'],
    capacity: 355,
    strength: 4.5,
    added: false,
  },
  {
    id: '4',
    name: 'Chimay Doree Gold',
    price: 11,
    origins: ['Belgium', 'beer'],
    stars: 3.3,
    imageUrl: 'assets/beer2.jpg',
    tags: ['Beer'],
    capacity: 330,
    strength: 4.8,
    added: false,
  },
  {
    id: '5',
    name: 'Mad River Distillers Bourbon',
    price: 11,
    origins: ['israel', 'whiskey'],
    stars: 3.0,
    imageUrl: 'assets/spri1.jpg',
    tags: ['Whiskey'],
    capacity: 700,
    strength: 45,
    added: false,
  },
  {
    id: '6',
    name: 'Lyres Dry London Spirit',
    price: 15,
    origins: ['canada', 'whiskey'],
    stars: 3.0,
    imageUrl: 'assets/spri2.jpg',
    tags: ['whiskey'],
    capacity: 650,
    strength: 37.5,
    added: false,
  },
  {
    id: '7',
    name: 'GIN BOMBAY SAPPHIRE',
    price: 14,
    origins: ['lodon', 'Spririts & Liqueur'],
    stars: 3.0,
    imageUrl: 'assets/bombay.jpg',
    tags: ['Spririts & Liqueur'],
    capacity: 750,
    strength: 47,
    added: false,
  },
  {
    id: '8',
    name: 'VODKA DANZKA',
    price: 15,
    origins: ['Denmark', 'Spririts & Liqueur'],
    stars: 3.0,
    imageUrl: 'assets/danzka.jpg',
    tags: ['Spririts & Liqueur'],
    capacity: 750,
    strength: 40,
    added: false,
  },
]

export const sample_tags: Tag[] = [
  // {name:'All', count:6, imageUrlTag: 'assets/vine2.jpg'},
  { name: 'Vine', count: 2, imageUrlTag: 'assets/spri2.jpg' },
  { name: 'Beer', count: 1, imageUrlTag: 'assets/beer1.jpg' },
  { name: 'Whiskey', count: 4, imageUrlTag: 'assets/spri1.jpg' },
  { name: 'Spririts & Liqueur', count: 2, imageUrlTag: 'assets/bombay.jpg' },
]
export const sample_news: News[] = [
  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

  {
    imageUrlnew: 'assets/advertisement2.jpeg',
    title: 'Nine things you need to know about the new alcohol duty system',
    content: 'Alcohol duty is a type of tax paid by companies that produce alcohol.The change in August makes duty across different drinks more consistent by taxing based on strength (ABV).',
    btn: 'Read more'

  },

]