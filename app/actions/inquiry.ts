'use server';

import { db } from '@/lib/db';
import { InquirySchema, InquiryInput } from '@/lib/validations/inquiry';
import { revalidatePath } from 'next/cache';

export async function submitInquiryAction(data: InquiryInput) {
  const result = InquirySchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: 'Please refine your submission fields according to our requirements.',
    };
  }

  try {
    const inquiry = await db.createInquiry({
      clientName: result.data.clientName,
      clientEmail: result.data.clientEmail,
      phone: result.data.phone,
      message: result.data.message,
      serviceType: result.data.serviceType,
      preferredDate: result.data.preferredDate,
      productItemId: result.data.productItemId,
    });

    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');

    return {
      success: true,
      inquiryId: inquiry.id,
      message: 'Your inquiry has been received. Our Private Client Liaison will be in touch within 12 hours.',
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return {
      success: false,
      message: `We encountered an issue submitting your request: ${errorMsg}`,
    };
  }
}
