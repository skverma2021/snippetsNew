"use server";

import { prisma } from "@/lib/prisma";
import {
  createSnippetSchema,
  updateSnippetSchema,
} from "@/lib/validations/snippet";
// import type { SnippetActionState } from "./types";
import type { SnippetActionState } from "./types";

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
    return {
      errors: Object.fromEntries(
        result.error.issues.map(i => [i.path[0], i.message])
      ),
    };
  }

  await prisma.snippet.create({
    data: result.data,
  });

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

// "use server";

// import { prisma } from "@/lib/prisma";
// import type { SnippetActionState } from "./types";

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

  return { success: true };
}


