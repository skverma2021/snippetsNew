"use server";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import {
  createSnippetSchema,
  updateSnippetSchema,
} from "@/lib/validations/snippet";
import { redirect } from "next/navigation";

export type SnippetActionState = {
  errors?: {
    id?: string;
    title?: string;
    code?: string;
  };
  success?: boolean;
};

export async function createSnippet(
  _prevState: SnippetActionState,
  formData: FormData
): Promise<SnippetActionState> {
  const rawData = {
    title: formData.get("title"),
    code: formData.get("code"),
  };

  const result = createSnippetSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: SnippetActionState["errors"] = {};

    for (const issue of result.error.issues) {
      const field = issue.path[0];
      if (field === "title" || field === "code") {
        fieldErrors[field] = issue.message;
      }
    }
    return { errors: fieldErrors };
  }
  
  await prisma.snippet.create({
    data: result.data,
  });
  
  revalidatePath("/")
  return { success: true };
}

export async function updateSnippet(
  _prevState: SnippetActionState,
  formData: FormData
): Promise<SnippetActionState> {
  const rawData = {
    id: formData.get("id"),
    title: formData.get("title"),
    code: formData.get("code"),
  };

  const result = updateSnippetSchema.safeParse(rawData);

  if (!result.success) {
    return {
      errors: Object.fromEntries(
        result.error.issues.map(i => [i.path[0], i.message])
      ),
    };
  }

  const { id, title, code } = result.data;

  try {
    await prisma.snippet.update({
      where: { id: Number(id) },
      data: { title, code },
    });
  } catch {
    // record not found
    return {
      errors: { id: "Snippet not found" },
    };
  }

  return { success: true };
}

export async function deleteSnippet(
  _prevState: SnippetActionState,
  formData: FormData
): Promise<SnippetActionState> {
  const id = formData.get("id");

  if (!id) {
    return {
      errors: { id: "Snippet id is required" },
    };
  }

  try {
    await prisma.snippet.delete({
      where: { id: Number(id) },
    });
  } catch {
    return {
      errors: { id: "Snippet not found" },
    };
  }
  revalidatePath("/")
  // return { success: true };
  redirect("/");
}

