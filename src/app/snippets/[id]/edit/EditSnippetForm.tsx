"use client";

import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateSnippet } from "@/actions";
import type { SnippetActionState } from "@/actions";

type Props = {
  snippet: {
    id: number;
    title: string;
    code: string;
    snippetTypeId: number | null;
  };
  snippetTypes: Array<{
    id: number;
    description: string;
  }>;
};

const initialState: SnippetActionState = {};

export default function EditSnippetForm({ snippet, snippetTypes }: Props) {
  const router = useRouter();
  const [state, formAction] = useActionState(updateSnippet, initialState);
  const [isPending] = useTransition();

  useEffect(() => {
    if (state.success) {
      toast.success("Snippet updated successfully");
      // router.push(`/snippets/${snippet.id}`);
      router.push(`/`);
    }
  }, [state.success, router, snippet.id]);

  return (
    <form action={formAction} className="space-y-4">
      <h3 className="font-bold text-lg">Edit Snippet</h3>

      {/* IMPORTANT: pass id */}
      <input type="hidden" name="id" value={snippet.id} />

      <div>
        <label className="font-medium">Title</label>
        <input
          name="title"
          defaultValue={snippet.title}
          disabled={isPending}
          className="border rounded p-2 w-full"
        />
        {state.errors?.title && (
          <p className="text-red-600 text-sm">{state.errors.title}</p>
        )}
      </div>

      <div>
        <label className="font-medium">Code</label>
        <textarea
          name="code"
          defaultValue={snippet.code}
          disabled={isPending}
          className="border rounded p-2 w-full"
        />
        {state.errors?.code && (
          <p className="text-red-600 text-sm">{state.errors.code}</p>
        )}
      </div>

      <div>
        <label className="font-medium">Snippet Type</label>
        <select
          name="snippetTypeId"
          defaultValue={snippet.snippetTypeId ?? ""}
          disabled={isPending}
          className="border rounded p-2 w-full"
        >
          <option value="">Select a type (optional)</option>
          {snippetTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.description}
            </option>
          ))}
        </select>
        {state.errors?.snippetTypeId && (
          <p className="text-red-600 text-sm">{state.errors.snippetTypeId}</p>
        )}
      </div>

      {state.errors?.id && (
        <p className="text-red-600 text-sm">{state.errors.id}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="border rounded p-2 bg-blue-200 disabled:opacity-50"
      >
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
