
import { WeddingEvent } from './types';

export const COLORS = {
  primary: '#800000', // Deep Maroon
  secondary: '#FFD700', // Gold
  accent: '#FF8C00', // Dark Orange/Saffron
  background: '#FDF5E6', // Old Lace
  text: '#4A0E0E', // Darker Maroon for text
};

export const WEDDING_DATE = new Date('2026-02-22T02:30:00');

export const WEDDING_EVENTS: WeddingEvent[] = [
  {
    id: 'haldi',
    name: 'Haldi Ceremony',
    date: 'February 19, 2026',
    time: 'Thursday',
    venue: 'Kapu Mondivenganapalli',
    description: 'A joyous pre-wedding ritual celebrating love and prosperity with turmeric.',
    icon: '✨',
    color: '#FFD700'
  },
  {
    id: 'reception',
    name: 'Reception',
    date: 'February 21, 2026',
    time: '07:00 PM onwards',
    venue: 'Sri Padmavathi Kalyana Mandapam, Tirupati',
    description: 'Join us for an evening of celebration with dinner and blessings.',
    icon: '🥂',
    color: '#C0C0C0'
  },
  {
    id: 'muhurtham',
    name: 'Subha Muhurtham',
    date: 'February 22, 2026',
    time: '02:30 AM - 04:30 AM (Dhanassu Lagnam)',
    venue: 'Sri Padmavathi Kalyana Mandapam, Block No. 2, Tiruchanoor Road, Lakshmipuram Circle, Tirupati',
    description: 'The sacred moment of union where Pujitha & Devendra tie the knot in the presence of family and the divine.',
    icon: '🔥',
    color: '#800000'
  }
];

export const SLOKAS = [
  "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ। निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥",
  "ॐ सह नाववतु। सह नौ भुनक्तु। सह वीर्यं करवावहै। तेजस्वि नावधीतमस्तु मा विद्विषावहै॥",
  "यदेतद्धृदयं तव तदस्तु हृदयं मम। यदिदं हृदयं मम तदस्तु हृदयं तव॥"
];

export const GALLERY_IMAGES = [
  { url: '/f33.jpg' },
  { url: '/f11.jpg' },
  { url: '/f22.jpg' },
  { url: '/5.jpg' },
  { url: '/4.jpg' },
  { url: '/3.jpg' },
];
