// Using Zod Schema in a Server Action - createSnippet function in a separate file (actions folder)
// + using transition and toast

"use client";

import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { createSnippet, type CreateSnippetState } from "./actions";
import { createSnippet, type CreateSnippetState } from "@/actions";

const initialState: CreateSnippetState = {};

export default function CreateNewSnippet() {
  const router = useRouter();
  const [state, formAction] = useActionState(createSnippet, initialState);
  const [isPending] = useTransition();

  // ✅ React to success
  useEffect(() => {
    if (state.success) {
      toast.success("Snippet created successfully!");
      router.push("/");
    }
  }, [state.success, router]);

  return (
    <form action={formAction}>
      <h3 className="font-bold m-3">Create a new Snippet</h3>

      <div className="flex flex-col gap-4">
        {/* TITLE */}
        <div>
          <label className="font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
            disabled={isPending}
          />
          {state.errors?.title && (
            <p className="text-red-600 text-sm">
              {state.errors.title}
            </p>
          )}
        </div>

        {/* CODE */}
        <div>
          <label className="font-medium">Code</label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            disabled={isPending}
          />
          {state.errors?.code && (
            <p className="text-red-600 text-sm">
              {state.errors.code}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="border rounded p-2 bg-blue-200 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
// --------------------------------------

// API Version (using Zod)
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// type FieldErrors = {
//   title?: string;
//   code?: string;
// };

// export default function CreateNewSnippet() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState<FieldErrors>({});

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();
//     setLoading(true);
//     setErrors({});

//     const formData = new FormData(e.currentTarget);

//     const res = await fetch("/api/snippets", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         title: formData.get("title"),
//         code: formData.get("code"),
//       }),
//     });

//     if (!res.ok) {
//       const data = await res.json();

//       if (data.issues) {
//         const fieldErrors: FieldErrors = {};

//         for (const issue of data.issues) {
//           const field = issue.path[0] as keyof FieldErrors;
//           fieldErrors[field] = issue.message;
//         }

//         setErrors(fieldErrors);
//       }

//       setLoading(false);
//       return;
//     }

//     router.push("/");
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h3 className="font-bold m-3">Create a new Snippet</h3>

//       <div className="flex flex-col gap-4">
//         {/* TITLE */}
//         <div className="flex flex-col gap-1">
//           <label className="font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             className="border rounded p-2"
//           />
//           {errors.title && (
//             <p className="text-red-600 text-sm">{errors.title}</p>
//           )}
//         </div>

//         {/* CODE */}
//         <div className="flex flex-col gap-1">
//           <label className="font-medium">Code</label>
//           <textarea
//             name="code"
//             className="border rounded p-2"
//           />
//           {errors.code && (
//             <p className="text-red-600 text-sm">{errors.code}</p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="border rounded p-2 bg-blue-200"
//         >
//           {loading ? "Saving..." : "Submit"}
//         </button>
//       </div>
//     </form>
//   );
// }

