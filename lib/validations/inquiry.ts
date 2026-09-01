import { z } from 'zod';

export const InquirySchema = z.object({
  clientName: z
    .string()
    .min(2, { message: 'Client name must be at least 2 characters.' })
    .max(100, { message: 'Client name cannot exceed 100 characters.' }),
  clientEmail: z
    .string()
    .email({ message: 'Please provide a valid private client email address.' }),
  phone: z
    .string()
    .max(30, { message: 'Phone number format is invalid.' })
    .optional()
    .or(z.literal('')),
  serviceType: z
    .string()
    .optional()
    .or(z.literal('')),
  preferredDate: z
    .string()
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, { message: 'Please provide at least 10 characters detailing your consultation or bespoke commission request.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),
  productItemId: z
    .string()
    .optional()
    .or(z.literal('')),
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export const InquiryStatusUpdateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(['PENDING', 'REVIEWED', 'RESOLVED']),
});
