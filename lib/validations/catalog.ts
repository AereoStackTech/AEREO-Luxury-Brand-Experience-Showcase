import { z } from 'zod';

export const ProductItemSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters.' }),
  subtitle: z.string().optional().or(z.literal('')),
  description: z.string().min(15, { message: 'Description must be at least 15 characters.' }),
  details: z.string().optional().or(z.literal('')),
  price: z.coerce.number().positive({ message: 'Price must be a positive number.' }),
  currency: z.string().default('USD'),
  images: z.array(z.string().url({ message: 'Each image must be a valid URL.' })).min(1, { message: 'At least one showcase image URL is required.' }),
  isFeatured: z.boolean().default(false),
  categoryId: z.string().min(1, { message: 'Please select a catalog category.' }),
  specifications: z.record(z.string(), z.string()).optional(),
});

export type ProductItemInput = z.infer<typeof ProductItemSchema>;
