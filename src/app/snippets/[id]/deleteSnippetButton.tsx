"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteSnippet } from "@/actions";
import type { SnippetActionState } from "@/actions";

const initialState: SnippetActionState = {};

export default function DeleteSnippetButton({ id }: { id: number }) {
  const router = useRouter();
  const [state, formAction] = useActionState(deleteSnippet, initialState);
  const [isPending] = useTransition();

  useEffect(() => {
    if (state.success) {
      toast.success("Snippet deleted");
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm("Are you sure you want to delete this snippet?")) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        disabled={isPending}
        className="border rounded p-2 bg-red-500 text-white disabled:opacity-50"
      >
        {isPending ? "Deleting..." : "Delete"}
      </button>

      {state.errors?.id && (
        <p className="text-red-600 text-sm">{state.errors.id}</p>
      )}
    </form>
  );
}
