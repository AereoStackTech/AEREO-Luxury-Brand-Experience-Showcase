import { PrismaClient, InquiryStatus, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seed() {
  console.log('Seeding luxury brand platform database...');

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash('AereoLuxury2026!', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'curator@aereostack.luxury' },
    update: {},
    create: {
      email: 'curator@aereostack.luxury',
      name: 'Alexandre Vance',
      passwordHash,
      role: Role.ADMIN,
    },
  });
  console.log('Admin user created:', adminUser.email);

  // 2. Seed Categories
  const horologyCategory = await prisma.category.upsert({
    where: { slug: 'haute-horlogerie' },
    update: {},
    create: {
      name: 'Haute Horlogerie',
      slug: 'haute-horlogerie',
      description: 'Masterpieces of micro-mechanical engineering, hand-finished in Geneva with rare metals and perpetual calendar complications.',
    },
  });

  const leatherCategory = await prisma.category.upsert({
    where: { slug: 'bespoke-leather' },
    update: {},
    create: {
      name: 'Bespoke Leather Craft',
      slug: 'bespoke-leather',
      description: 'Artisanal saddlery, full-grain French calfskin, and hand-stitched luggage made to individual patron specifications.',
    },
  });

  const experiencesCategory = await prisma.category.upsert({
    where: { slug: 'curated-sanctuaries' },
    update: {},
    create: {
      name: 'Private Aviation & Sanctuaries',
      slug: 'curated-sanctuaries',
      description: 'Discreet private jet itineraries, secluded architectural villas, and bespoke culinary expeditions.',
    },
  });

  // 3. Seed Products / Offerings
  const products = [
    {
      title: 'AEREO Celestial Chronograph No. 07',
      slug: 'celestial-chronograph-no-07',
      subtitle: 'Platinum 950 case with meteorite dial and tourbillon cage',
      description: 'A tribute to astronomical precision. Crafted from a solid block of 950 Platinum, featuring a genuine Gibeon meteorite dial and a flying tourbillon oscillating at 21,600 vph. Finished with bespoke crocodile strap and hand-beveled bridges.',
      details: 'Limited to 12 numbered pieces globally. Each timepiece undergoes 420 hours of individual hand-finishing, regulation, and Geneva Seal chronometric certification.',
      price: 148000,
      currency: 'USD',
      isFeatured: true,
      categoryId: horologyCategory.id,
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
    },
    {
      title: 'The Sovereign Weekender Trunk',
      slug: 'sovereign-weekender-trunk',
      subtitle: 'Full-grain Epsom calfskin with brushed brass hardware',
      description: 'Hand-crafted by master saddlers over sixty-five hours. The Sovereign Weekender is structured with a lightweight poplar wood frame, lined with buttery Italian suede, and reinforced with hand-burnished bridle leather corners.',
      details: 'Featuring modular internal partitions, dual hidden passport compartments, and bespoke initial monogramming applied with hot gold leaf stamping.',
      price: 18500,
      currency: 'USD',
      isFeatured: true,
      categoryId: leatherCategory.id,
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
    },
    {
      title: 'AEREO Grand Complication Étoile',
      slug: 'grand-complication-etoile',
      subtitle: 'Rose Gold 18K with perpetual calendar & minute repeater',
      description: 'The pinnacle of acoustic and astronomical horology. The Étoile produces a crystal-clear cathedral chime striking hours, quarters, and minutes, paired with a perpetual calendar requiring zero correction until the year 2100.',
      details: 'Assembled entirely by a single Master Watchmaker from start to finish. Delivered in an acoustic resonator presentation box crafted from aged Alpine spruce.',
      price: 265000,
      currency: 'USD',
      isFeatured: true,
      categoryId: horologyCategory.id,
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
    },
    {
      title: 'L’Atelier Architectural Briefcase',
      slug: 'latelier-architectural-briefcase',
      subtitle: 'Monolithic bridle leather with stealth titanium lock',
      description: 'Engineered for visionary leaders. Features a flush-integrated biometric titanium lock system, lined with anti-static velvet, and sculpted from vegetable-tanned Tuscan bridle leather that develops an extraordinary patina over decades.',
      details: 'Accommodates a 16-inch laptop, dedicated document folders, and a shielded privacy pouch. Backed by AEREO’s lifetime artisanal warranty.',
      price: 12400,
      currency: 'USD',
      isFeatured: false,
      categoryId: leatherCategory.id,
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
    },
    {
      title: 'The Kyoto Zen Sanctuary Experience',
      slug: 'kyoto-zen-sanctuary-experience',
      subtitle: '7-night private residency in a preserved 17th-century heritage estate',
      description: 'An unprecedented private immersion into Japanese aesthetics. Exclusive access to a restored Daitoku-ji sub-temple, private tea ceremonies with 15th-generation tea masters, bespoke Kaiseki by three-star Michelin masters, and curated garden meditation.',
      details: 'Includes dedicated multilingual concierge, private chauffeured transfers in vintage Century limousines, and after-hours access to historical national treasures.',
      price: 85000,
      currency: 'USD',
      isFeatured: true,
      categoryId: experiencesCategory.id,
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
    },
    {
      title: 'The Nordic Fjord Arctic Pavilion',
      slug: 'nordic-fjord-arctic-pavilion',
      subtitle: 'Helicopter-access glass architectural dwelling above the Aurora',
      description: 'Perched upon a granite cliff overlooking the Sunnmøre Alps, this cantilevered glass and cedar sanctuary provides panoramic views of the Northern Lights and deep ocean fjords, paired with private polar wellness suites.',
      details: 'Includes private alpine guides, bespoke deep-fjord submarine excursions, and private dining prepared with rare wild Arctic ingredients.',
      price: 68000,
      currency: 'USD',
      isFeatured: false,
      categoryId: experiencesCategory.id,
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
    },
  ];

  for (const item of products) {
    await prisma.productItem.upsert({
      where: { slug: item.slug },
      update: {},
      create: {
        title: item.title,
        slug: item.slug,
        subtitle: item.subtitle,
        description: item.description,
        details: item.details,
        price: item.price,
        currency: item.currency,
        isFeatured: item.isFeatured,
        images: item.images,
        specifications: item.specifications,
        categoryId: item.categoryId,
      },
    });
  }
  console.log('Product items seeded successfully.');

  // 4. Seed Testimonials
  const testimonials = [
    {
      quote: 'AEREO redefines modern luxury not through ostentation, but through extraordinary restraint, quiet perfection, and transcendent tactile craftsmanship.',
      author: 'Lord Julian Sterling',
      roleOrPublication: 'Patron & Collector, Geneva',
      rating: 5,
    },
    {
      quote: 'The Celestial Chronograph is among the rare horological achievements of this century. The dial work evokes pure reverence.',
      author: 'The Financial Times',
      roleOrPublication: 'How To Spend It — Special Horology Edition',
      rating: 5,
    },
    {
      quote: 'From private consultation to white-glove courier delivery, the entire AEREO experience reflects an uncompromising commitment to nobility in design.',
      author: 'Claire de Montmirail',
      roleOrPublication: 'Architecture & Design Principal, Paris',
      rating: 5,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: t,
    });
  }

  // 5. Seed FAQ Items
  const faqs = [
    {
      question: 'How do I arrange a private consultation or acquire an AEREO piece?',
      answer: 'Each creation in our catalog is made in strictly limited editions or on a bespoke commission basis. You may submit an inquiry through our platform, after which your assigned Private Client Liaison will contact you within 12 hours to coordinate a viewing at our Geneva salon, a private suite consultation in your city, or an encrypted digital session.',
      order: 1,
    },
    {
      question: 'Can specifications and materials be customized for bespoke orders?',
      answer: 'Yes. Our bespoke atelier accommodates individual requests for precious metal alloy selection, custom dial engravings, exotic leather selections with certified ethical provenance, and personalized monogram stamping.',
      order: 2,
    },
    {
      question: 'What is the standard production timeline for commissioned pieces?',
      answer: 'Standard inventory creations are prepared for secure armored courier dispatch within 48 hours. Bespoke horological timepieces and custom leather trunks require between 8 to 16 weeks of meticulous handcrafting by our master artisans.',
      order: 3,
    },
    {
      question: 'How does AEREO guarantee authentication, provenance, and warranty?',
      answer: 'Every piece is registered on our private cryptographic registry with a physical NFC-embedded certificate of origin. All horological creations carry an international 5-year manufacture warranty, and our leather goods include lifetime complimentary conditioning and maintenance.',
      order: 4,
    },
    {
      question: 'What delivery methods and security protocols are utilized?',
      answer: 'We provide fully insured global armored transport (Brink’s / Malca-Amit) with direct hand-to-hand delivery to your residence, private aircraft, or financial institution vault, requiring photographic biometric confirmation.',
      order: 5,
    },
  ];

  for (const faq of faqs) {
    await prisma.fAQItem.create({
      data: faq,
    });
  }

  // 6. Seed Sample Inquiries for Admin Review
  const sampleInquiry = await prisma.inquiry.create({
    data: {
      clientName: 'Countess Elena Rossi',
      clientEmail: 'elena.rossi@rossigroup.it',
      phone: '+39 02 8845 2910',
      message: 'I would like to commission an AEREO Celestial Chronograph No. 07 with custom hand-engraved initials on the movement balance bridge for our anniversary in Milan.',
      serviceType: 'Bespoke Commission & Viewing',
      preferredDate: 'Next Month (October)',
      status: InquiryStatus.PENDING,
      productItemId: (await prisma.productItem.findFirst({ where: { slug: 'celestial-chronograph-no-07' } }))?.id,
    },
  });

  const sampleInquiry2 = await prisma.inquiry.create({
    data: {
      clientName: 'Marcus Kensington, Esq.',
      clientEmail: 'mkensington@kensingtoncapital.co.uk',
      phone: '+44 20 7946 0912',
      message: 'Requesting private aviation consultation and booking for the Kyoto Zen Sanctuary residency for four guests.',
      serviceType: 'Private Sanctuary Residency',
      preferredDate: 'Spring Season (Cherry Blossom)',
      status: InquiryStatus.REVIEWED,
      productItemId: (await prisma.productItem.findFirst({ where: { slug: 'kyoto-zen-sanctuary-experience' } }))?.id,
    },
  });

  console.log('Seeding completed successfully!');
}

seed()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
