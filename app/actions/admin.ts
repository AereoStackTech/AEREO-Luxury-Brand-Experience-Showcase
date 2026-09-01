'use server';

import { db } from '@/lib/db';
import { getAdminSession, loginAdmin, logoutAdmin } from '@/lib/auth';
import { ProductItemSchema, ProductItemInput } from '@/lib/validations/catalog';
import { InquiryStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function adminLoginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { success: false, error: 'Please enter your curator email and password.' };
  }

  const result = await loginAdmin(email, password);
  if (!result.success) {
    return { success: false, error: result.error || 'Authentication failed.' };
  }

  revalidatePath('/admin');
  return { success: true };
}

export async function adminLogoutAction() {
  await logoutAdmin();
  revalidatePath('/admin');
  redirect('/admin/login');
}

export async function updateInquiryStatusAction(id: string, status: InquiryStatus) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized. Please sign in as a curator.' };
  }

  try {
    const updated = await db.updateInquiryStatus(id, status);
    if (!updated) {
      return { success: false, error: 'Inquiry record not found.' };
    }
    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');
    return { success: true, inquiry: updated };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function deleteInquiryAction(id: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized.' };
  }

  try {
    await db.deleteInquiry(id);
    revalidatePath('/admin');
    revalidatePath('/admin/inquiries');
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function createCatalogProductAction(data: ProductItemInput) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized.' };
  }

  const validation = ProductItemSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, errors: validation.error.flatten().fieldErrors };
  }

  try {
    const product = await db.createProduct({
      title: validation.data.title,
      slug: validation.data.slug,
      subtitle: validation.data.subtitle || null,
      description: validation.data.description,
      details: validation.data.details || null,
      price: validation.data.price,
      currency: validation.data.currency,
      images: validation.data.images,
      isFeatured: validation.data.isFeatured,
      categoryId: validation.data.categoryId,
      specifications: validation.data.specifications || null,
    });

    revalidatePath('/catalog');
    revalidatePath('/admin/catalog');
    revalidatePath('/');
    return { success: true, product };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function deleteCatalogProductAction(id: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized.' };
  }

  try {
    await db.deleteProduct(id);
    revalidatePath('/catalog');
    revalidatePath('/admin/catalog');
    revalidatePath('/');
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function createFaqAction(question: string, answer: string, order: number) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized.' };
  }

  if (!question || !answer) {
    return { success: false, error: 'Both question and answer are required.' };
  }

  try {
    const faq = await db.createFaq(question, answer, order);
    revalidatePath('/faq');
    revalidatePath('/admin');
    return { success: true, faq };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}

export async function deleteFaqAction(id: string) {
  const session = await getAdminSession();
  if (!session) {
    return { success: false, error: 'Unauthorized.' };
  }

  try {
    await db.deleteFaq(id);
    revalidatePath('/faq');
    revalidatePath('/admin');
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: errorMsg };
  }
}
