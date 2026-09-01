import { PrismaClient, InquiryStatus, Role } from '@prisma/client';

// Global singleton pattern for PrismaClient
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: [],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

// Timeout wrapper for external DB connection so preview/render never hangs
async function safeDbQuery<T>(queryFn: () => Promise<T>, timeoutMs = 2000): Promise<T | null> {
  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), timeoutMs)
    );
    return await Promise.race([queryFn(), timeoutPromise]);
  } catch {
    return null;
  }
}

// In-memory resilient state store for preview & high-availability fallback
interface ProductItemData {
  id: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string;
  details: string | null;
  price: number;
  currency: string;
  images: string[];
  isFeatured: boolean;
  specifications: Record<string, string> | null;
  categoryId: string;
  category?: { id: string; name: string; slug: string; description: string | null };
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  products?: ProductItemData[];
}

interface InquiryData {
  id: string;
  clientName: string;
  clientEmail: string;
  phone: string | null;
  message: string;
  serviceType: string | null;
  preferredDate: string | null;
  status: InquiryStatus;
  productItemId: string | null;
  productItem?: ProductItemData | null;
  createdAt: Date;
  updatedAt: Date;
}

interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  roleOrPublication: string;
  rating: number;
  createdAt: Date;
}

interface FAQItemData {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

// Initial luxury demo datasets
const defaultCategories: CategoryData[] = [
  {
    id: 'cat-1',
    name: 'Haute Horlogerie',
    slug: 'haute-horlogerie',
    description: 'Masterpieces of micro-mechanical engineering, hand-finished in Geneva with rare metals and perpetual calendar complications.',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'cat-2',
    name: 'Bespoke Leather Craft',
    slug: 'bespoke-leather',
    description: 'Artisanal saddlery, full-grain French calfskin, and hand-stitched luggage made to individual patron specifications.',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'cat-3',
    name: 'Private Aviation & Sanctuaries',
    slug: 'curated-sanctuaries',
    description: 'Discreet private jet itineraries, secluded architectural villas, and bespoke culinary expeditions.',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
];

const defaultProducts: ProductItemData[] = [
  {
    id: 'prod-1',
    title: 'AEREO Celestial Chronograph No. 07',
    slug: 'celestial-chronograph-no-07',
    subtitle: 'Platinum 950 case with meteorite dial and tourbillon cage',
    description: 'A tribute to astronomical precision. Crafted from a solid block of 950 Platinum, featuring a genuine Gibeon meteorite dial and a flying tourbillon oscillating at 21,600 vph. Finished with bespoke crocodile strap and hand-beveled bridges.',
    details: 'Limited to 12 numbered pieces globally. Each timepiece undergoes 420 hours of individual hand-finishing, regulation, and Geneva Seal chronometric certification.',
    price: 148000,
    currency: 'USD',
    isFeatured: true,
    categoryId: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1547996160-71dfa6309697?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Diameter: '41.5 mm',
      Material: 'Platinum 950 & Meteorite',
      Movement: 'Calibre AE-8800 Manual Tourbillon',
      PowerReserve: '72 Hours',
      WaterResistance: '50 Meters (5 ATM)',
      Provenance: 'Geneva, Switzerland',
    },
    createdAt: new Date('2026-02-01'),
    updatedAt: new Date('2026-02-01'),
  },
  {
    id: 'prod-2',
    title: 'The Sovereign Weekender Trunk',
    slug: 'sovereign-weekender-trunk',
    subtitle: 'Full-grain Epsom calfskin with brushed brass hardware',
    description: 'Hand-crafted by master saddlers over sixty-five hours. The Sovereign Weekender is structured with a lightweight poplar wood frame, lined with buttery Italian suede, and reinforced with hand-burnished bridle leather corners.',
    details: 'Featuring modular internal partitions, dual hidden passport compartments, and bespoke initial monogramming applied with hot gold leaf stamping.',
    price: 18500,
    currency: 'USD',
    isFeatured: true,
    categoryId: 'cat-2',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Dimensions: '55 x 35 x 24 cm (Cabin Approved)',
      Leather: 'Full-grain Baranil & Epsom Calf',
      Hardware: 'Solid Brass with Palladium Finish',
      Lining: 'Sand Cashmere & Suede',
      Weight: '3.4 kg',
      Origin: 'Limoges Atelier, France',
    },
    createdAt: new Date('2026-02-05'),
    updatedAt: new Date('2026-02-05'),
  },
  {
    id: 'prod-3',
    title: 'AEREO Grand Complication Étoile',
    slug: 'grand-complication-etoile',
    subtitle: 'Rose Gold 18K with perpetual calendar & minute repeater',
    description: 'The pinnacle of acoustic and astronomical horology. The Étoile produces a crystal-clear cathedral chime striking hours, quarters, and minutes, paired with a perpetual calendar requiring zero correction until the year 2100.',
    details: 'Assembled entirely by a single Master Watchmaker from start to finish. Delivered in an acoustic resonator presentation box crafted from aged Alpine spruce.',
    price: 265000,
    currency: 'USD',
    isFeatured: true,
    categoryId: 'cat-1',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Diameter: '42.0 mm',
      Material: '18K 5N Rose Gold',
      Complications: 'Minute Repeater, Perpetual Calendar, Moonphase',
      PowerReserve: '65 Hours',
      Strap: 'Hand-stitched Alligator leather in Obsidian',
      Origin: 'Vallée de Joux, Switzerland',
    },
    createdAt: new Date('2026-02-10'),
    updatedAt: new Date('2026-02-10'),
  },
  {
    id: 'prod-4',
    title: 'L’Atelier Architectural Briefcase',
    slug: 'latelier-architectural-briefcase',
    subtitle: 'Monolithic bridle leather with stealth titanium lock',
    description: 'Engineered for visionary leaders. Features a flush-integrated biometric titanium lock system, lined with anti-static velvet, and sculpted from vegetable-tanned Tuscan bridle leather that develops an extraordinary patina over decades.',
    details: 'Accommodates a 16-inch laptop, dedicated document folders, and a shielded privacy pouch. Backed by AEREO’s lifetime artisanal warranty.',
    price: 12400,
    currency: 'USD',
    isFeatured: false,
    categoryId: 'cat-2',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1628149455678-16f37bc392f4?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Dimensions: '40 x 30 x 8 cm',
      Material: 'Tuscan Vegetable-Tanned Bridle Leather',
      Lock: 'Titanium Grade 5 Biometric Integration',
      Internal: 'Anti-static microfiber & laptop cradle',
      Origin: 'Florence, Italy',
    },
    createdAt: new Date('2026-02-12'),
    updatedAt: new Date('2026-02-12'),
  },
  {
    id: 'prod-5',
    title: 'The Kyoto Zen Sanctuary Residency',
    slug: 'kyoto-zen-sanctuary-experience',
    subtitle: '7-night private residency in a preserved 17th-century heritage estate',
    description: 'An unprecedented private immersion into Japanese aesthetics. Exclusive access to a restored Daitoku-ji sub-temple, private tea ceremonies with 15th-generation tea masters, bespoke Kaiseki by three-star Michelin masters, and curated garden meditation.',
    details: 'Includes dedicated multilingual concierge, private chauffeured transfers in vintage Century limousines, and after-hours access to historical national treasures.',
    price: 85000,
    currency: 'USD',
    isFeatured: true,
    categoryId: 'cat-3',
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Duration: '8 Days / 7 Nights',
      Capacity: 'Up to 4 Guests (Private Exclusive)',
      Included: 'All private access, culinary residencies, bespoke aviation charter',
      Availability: 'Spring Sakura & Autumn Koyo seasons only',
      Location: 'Kyoto & Uji, Japan',
    },
    createdAt: new Date('2026-02-14'),
    updatedAt: new Date('2026-02-14'),
  },
  {
    id: 'prod-6',
    title: 'The Nordic Fjord Arctic Pavilion',
    slug: 'nordic-fjord-arctic-pavilion',
    subtitle: 'Helicopter-access glass architectural dwelling above the Aurora',
    description: 'Perched upon a granite cliff overlooking the Sunnmøre Alps, this cantilevered glass and cedar sanctuary provides panoramic views of the Northern Lights and deep ocean fjords, paired with private polar wellness suites.',
    details: 'Includes private alpine guides, bespoke deep-fjord submarine excursions, and private dining prepared with rare wild Arctic ingredients.',
    price: 68000,
    currency: 'USD',
    isFeatured: false,
    categoryId: 'cat-3',
    images: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    ],
    specifications: {
      Duration: '5 Days / 4 Nights',
      Capacity: 'Up to 6 Guests',
      Transport: 'Twin-engine AgustaWestland charter from Oslo',
      Season: 'October through March',
      Location: 'Sunnmøre Fjords, Norway',
    },
    createdAt: new Date('2026-02-18'),
    updatedAt: new Date('2026-02-18'),
  },
];

const defaultTestimonials: TestimonialData[] = [
  {
    id: 'test-1',
    quote: 'AEREO redefines modern luxury not through ostentation, but through extraordinary restraint, quiet perfection, and transcendent tactile craftsmanship.',
    author: 'Lord Julian Sterling',
    roleOrPublication: 'Patron & Collector, Geneva',
    rating: 5,
    createdAt: new Date('2026-01-20'),
  },
  {
    id: 'test-2',
    quote: 'The Celestial Chronograph is among the rare horological achievements of this century. The dial work evokes pure reverence.',
    author: 'The Financial Times',
    roleOrPublication: 'How To Spend It — Special Horology Edition',
    rating: 5,
    createdAt: new Date('2026-01-25'),
  },
  {
    id: 'test-3',
    quote: 'From private consultation to white-glove courier delivery, the entire AEREO experience reflects an uncompromising commitment to nobility in design.',
    author: 'Claire de Montmirail',
    roleOrPublication: 'Architecture & Design Principal, Paris',
    rating: 5,
    createdAt: new Date('2026-02-01'),
  },
];

const defaultFaqs: FAQItemData[] = [
  {
    id: 'faq-1',
    question: 'How do I arrange a private consultation or acquire an AEREO piece?',
    answer: 'Each creation in our catalog is made in strictly limited editions or on a bespoke commission basis. You may submit an inquiry through our platform, after which your assigned Private Client Liaison will contact you within 12 hours to coordinate a viewing at our Geneva salon, a private suite consultation in your city, or an encrypted digital session.',
    order: 1,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-2',
    question: 'Can specifications and materials be customized for bespoke orders?',
    answer: 'Yes. Our bespoke atelier accommodates individual requests for precious metal alloy selection, custom dial engravings, exotic leather selections with certified ethical provenance, and personalized monogram stamping.',
    order: 2,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-3',
    question: 'What is the standard production timeline for commissioned pieces?',
    answer: 'Standard inventory creations are prepared for secure armored courier dispatch within 48 hours. Bespoke horological timepieces and custom leather trunks require between 8 to 16 weeks of meticulous handcrafting by our master artisans.',
    order: 3,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-4',
    question: 'How does AEREO guarantee authentication, provenance, and warranty?',
    answer: 'Every piece is registered on our private cryptographic registry with a physical NFC-embedded certificate of origin. All horological creations carry an international 5-year manufacture warranty, and our leather goods include lifetime complimentary conditioning and maintenance.',
    order: 4,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-5',
    question: 'What delivery methods and security protocols are utilized?',
    answer: 'We provide fully insured global armored transport (Brink’s / Malca-Amit) with direct hand-to-hand delivery to your residence, private aircraft, or financial institution vault, requiring photographic biometric confirmation.',
    order: 5,
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const defaultInquiries: InquiryData[] = [
  {
    id: 'inq-1',
    clientName: 'Countess Elena Rossi',
    clientEmail: 'elena.rossi@rossigroup.it',
    phone: '+39 02 8845 2910',
    message: 'I would like to commission an AEREO Celestial Chronograph No. 07 with custom hand-engraved initials on the movement balance bridge for our anniversary in Milan.',
    serviceType: 'Bespoke Commission & Viewing',
    preferredDate: 'Next Month (October)',
    status: InquiryStatus.PENDING,
    productItemId: 'prod-1',
    createdAt: new Date('2026-02-20T14:30:00Z'),
    updatedAt: new Date('2026-02-20T14:30:00Z'),
  },
  {
    id: 'inq-2',
    clientName: 'Marcus Kensington, Esq.',
    clientEmail: 'mkensington@kensingtoncapital.co.uk',
    phone: '+44 20 7946 0912',
    message: 'Requesting private aviation consultation and booking for the Kyoto Zen Sanctuary residency for four guests.',
    serviceType: 'Private Sanctuary Residency',
    preferredDate: 'Spring Season (Cherry Blossom)',
    status: InquiryStatus.REVIEWED,
    productItemId: 'prod-5',
    createdAt: new Date('2026-02-22T09:15:00Z'),
    updatedAt: new Date('2026-02-22T11:00:00Z'),
  },
  {
    id: 'inq-3',
    clientName: 'Dr. Sophia Lindqvist',
    clientEmail: 'sophia.lindqvist@karolinska.se',
    phone: '+46 8 123 4567',
    message: 'Inquiring about acquisition of The Sovereign Weekender Trunk in Cognac Baranil leather for delivery to Stockholm.',
    serviceType: 'Acquisition Consultation',
    preferredDate: 'Immediate Dispatch',
    status: InquiryStatus.RESOLVED,
    productItemId: 'prod-2',
    createdAt: new Date('2026-02-18T16:45:00Z'),
    updatedAt: new Date('2026-02-19T10:20:00Z'),
  },
];

// Memory state singleton to persist across hot requests in same process
declare global {
  var storeData: {
    categories: CategoryData[];
    products: ProductItemData[];
    testimonials: TestimonialData[];
    faqs: FAQItemData[];
    inquiries: InquiryData[];
  } | undefined;
}

if (!globalThis.storeData) {
  globalThis.storeData = {
    categories: defaultCategories,
    products: defaultProducts,
    testimonials: defaultTestimonials,
    faqs: defaultFaqs,
    inquiries: defaultInquiries,
  };
}

const memoryStore = globalThis.storeData;

// Data Access Layer (with Prisma primary + resilient store fallback)
export const db = {
  // Products
  async getProducts(options?: { categorySlug?: string; featuredOnly?: boolean; search?: string }) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const whereClause: Record<string, unknown> = {};
      if (options?.featuredOnly) whereClause.isFeatured = true;
      if (options?.categorySlug) whereClause.category = { slug: options.categorySlug };
      if (options?.search) {
        whereClause.OR = [
          { title: { contains: options.search, mode: 'insensitive' } },
          { description: { contains: options.search, mode: 'insensitive' } },
        ];
      }
      const results = await safeDbQuery(() =>
        prisma.productItem.findMany({
          where: whereClause,
          include: { category: true },
          orderBy: { createdAt: 'desc' },
        })
      );
      if (results && results.length > 0) return results as unknown as ProductItemData[];
    }

    let items = memoryStore.products.map((p) => {
      const category = memoryStore.categories.find((c) => c.id === p.categoryId);
      return { ...p, category };
    });

    if (options?.categorySlug) {
      items = items.filter((p) => p.category?.slug === options.categorySlug);
    }
    if (options?.featuredOnly) {
      items = items.filter((p) => p.isFeatured);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    }
    return items;
  },

  async getProductBySlug(slug: string) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const item = await safeDbQuery(() =>
        prisma.productItem.findUnique({
          where: { slug },
          include: { category: true },
        })
      );
      if (item) return item as unknown as ProductItemData;
    }

    const item = memoryStore.products.find((p) => p.slug === slug);
    if (!item) return null;
    const category = memoryStore.categories.find((c) => c.id === item.categoryId);
    return { ...item, category };
  },

  async createProduct(data: Omit<ProductItemData, 'id' | 'createdAt' | 'updatedAt'>) {
    const { category, ...restData } = data;
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const created = await safeDbQuery(() =>
        prisma.productItem.create({
          data: {
            ...restData,
            specifications: restData.specifications as object,
          },
          include: { category: true },
        })
      );
      if (created) return created as unknown as ProductItemData;
    }

    const newProduct: ProductItemData = {
      ...data,
      id: `prod-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.products.unshift(newProduct);
    const cat = memoryStore.categories.find((c) => c.id === newProduct.categoryId);
    return { ...newProduct, category: cat };
  },

  async updateProduct(id: string, data: Partial<ProductItemData>) {
    const { category, ...restData } = data;
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const updated = await safeDbQuery(() =>
        prisma.productItem.update({
          where: { id },
          data: {
            ...restData,
            specifications: restData.specifications ? (restData.specifications as object) : undefined,
          },
          include: { category: true },
        })
      );
      if (updated) return updated as unknown as ProductItemData;
    }

    const index = memoryStore.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      memoryStore.products[index] = {
        ...memoryStore.products[index],
        ...data,
        updatedAt: new Date(),
      };
      const cat = memoryStore.categories.find((c) => c.id === memoryStore.products[index].categoryId);
      return { ...memoryStore.products[index], category: cat };
    }
    return null;
  },

  async deleteProduct(id: string) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const deleted = await safeDbQuery(() => prisma.productItem.delete({ where: { id } }));
      if (deleted) return deleted;
    }

    const index = memoryStore.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      const removed = memoryStore.products.splice(index, 1);
      return removed[0];
    }
    return null;
  },

  // Categories
  async getCategories() {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const cats = await safeDbQuery(() =>
        prisma.category.findMany({
          include: { products: true },
          orderBy: { name: 'asc' },
        })
      );
      if (cats && cats.length > 0) return cats as unknown as CategoryData[];
    }

    return memoryStore.categories.map((c) => ({
      ...c,
      products: memoryStore.products.filter((p) => p.categoryId === c.id),
    }));
  },

  // Inquiries
  async getInquiries(statusFilter?: InquiryStatus) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const list = await safeDbQuery(() =>
        prisma.inquiry.findMany({
          where: statusFilter ? { status: statusFilter } : undefined,
          include: { productItem: true },
          orderBy: { createdAt: 'desc' },
        })
      );
      if (list) return list as unknown as InquiryData[];
    }

    let items = memoryStore.inquiries.map((inq) => {
      const productItem = memoryStore.products.find((p) => p.id === inq.productItemId) || null;
      return { ...inq, productItem };
    });

    if (statusFilter) {
      items = items.filter((inq) => inq.status === statusFilter);
    }
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  async createInquiry(data: {
    clientName: string;
    clientEmail: string;
    phone?: string;
    message: string;
    serviceType?: string;
    preferredDate?: string;
    productItemId?: string;
  }) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const created = await safeDbQuery(() =>
        prisma.inquiry.create({
          data: {
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            phone: data.phone || null,
            message: data.message,
            serviceType: data.serviceType || null,
            preferredDate: data.preferredDate || null,
            productItemId: data.productItemId || null,
            status: InquiryStatus.PENDING,
          },
          include: { productItem: true },
        })
      );
      if (created) return created as unknown as InquiryData;
    }

    const newInquiry: InquiryData = {
      id: `inq-${Date.now()}`,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      phone: data.phone || null,
      message: data.message,
      serviceType: data.serviceType || null,
      preferredDate: data.preferredDate || null,
      status: InquiryStatus.PENDING,
      productItemId: data.productItemId || null,
      productItem: memoryStore.products.find((p) => p.id === data.productItemId) || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.inquiries.unshift(newInquiry);
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: InquiryStatus) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const updated = await safeDbQuery(() =>
        prisma.inquiry.update({
          where: { id },
          data: { status },
          include: { productItem: true },
        })
      );
      if (updated) return updated as unknown as InquiryData;
    }

    const index = memoryStore.inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      memoryStore.inquiries[index] = {
        ...memoryStore.inquiries[index],
        status,
        updatedAt: new Date(),
      };
      return memoryStore.inquiries[index];
    }
    return null;
  },

  async deleteInquiry(id: string) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const deleted = await safeDbQuery(() => prisma.inquiry.delete({ where: { id } }));
      if (deleted) return deleted;
    }

    const index = memoryStore.inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      const removed = memoryStore.inquiries.splice(index, 1);
      return removed[0];
    }
    return null;
  },

  // Testimonials & FAQs
  async getTestimonials() {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const list = await safeDbQuery(() =>
        prisma.testimonial.findMany({
          orderBy: { createdAt: 'asc' },
        })
      );
      if (list && list.length > 0) return list as unknown as TestimonialData[];
    }
    return memoryStore.testimonials;
  },

  async getFaqs() {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const list = await safeDbQuery(() =>
        prisma.fAQItem.findMany({
          orderBy: { order: 'asc' },
        })
      );
      if (list && list.length > 0) return list as unknown as FAQItemData[];
    }
    return memoryStore.faqs.sort((a, b) => a.order - b.order);
  },

  async createFaq(question: string, answer: string, order = 0) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const created = await safeDbQuery(() =>
        prisma.fAQItem.create({
          data: { question, answer, order },
        })
      );
      if (created) return created as unknown as FAQItemData;
    }

    const newFaq: FAQItemData = {
      id: `faq-${Date.now()}`,
      question,
      answer,
      order: order || memoryStore.faqs.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    memoryStore.faqs.push(newFaq);
    return newFaq;
  },

  async deleteFaq(id: string) {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost:5432')) {
      const deleted = await safeDbQuery(() => prisma.fAQItem.delete({ where: { id } }));
      if (deleted) return deleted;
    }

    const index = memoryStore.faqs.findIndex((f) => f.id === id);
    if (index !== -1) {
      const removed = memoryStore.faqs.splice(index, 1);
      return removed[0];
    }
    return null;
  },
};

export type {
  ProductItemData,
  CategoryData,
  InquiryData,
  TestimonialData,
  FAQItemData,
};
