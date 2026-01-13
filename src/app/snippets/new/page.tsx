// "use client";

// import { useActionState } from "react";
// import { createSnippet, type CreateSnippetState } from "@/actions";

// const initialState: CreateSnippetState = {};

// export default function CreateNewSnippet() {
//   const [state, formAction] = useActionState(createSnippet, initialState);

//   return (
//     <form action={formAction}>
//       <h3 className="font-bold m-3">Create a new Snippet</h3>

//       <div className="flex flex-col gap-4">
//         {/* TITLE */}
//         <div>
//           <label className="font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             className="border rounded p-2 w-full"
//           />
//           {state.errors?.title && (
//             <p className="text-red-600 text-sm">
//               {state.errors.title}
//             </p>
//           )}
//         </div>

//         {/* CODE */}
//         <div>
//           <label className="font-medium">Code</label>
//           <textarea
//             name="code"
//             className="border rounded p-2 w-full"
//           />
//           {state.errors?.code && (
//             <p className="text-red-600 text-sm">
//               {state.errors.code}
//             </p>
//           )}
//         </div>

//         <button className="border rounded p-2 bg-blue-200">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// }

// "use client";

// import { useActionState, useTransition } from "react";
// import { createSnippet, type CreateSnippetState } from "@/actions";

// const initialState: CreateSnippetState = {};

// export default function CreateNewSnippet() {
//   const [state, formAction] = useActionState(createSnippet, initialState);
//   const [isPending] = useTransition();

//   return (
//     <form action={formAction}>
//       <h3 className="font-bold m-3">Create a new Snippet</h3>

//       <div className="flex flex-col gap-4">
//         {/* TITLE */}
//         <div>
//           <label className="font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             className="border rounded p-2 w-full"
//             disabled={isPending}
//           />
//           {state.errors?.title && (
//             <p className="text-red-600 text-sm">
//               {state.errors.title}
//             </p>
//           )}
//         </div>

//         {/* CODE */}
//         <div>
//           <label className="font-medium">Code</label>
//           <textarea
//             name="code"
//             className="border rounded p-2 w-full"
//             disabled={isPending}
//           />
//           {state.errors?.code && (
//             <p className="text-red-600 text-sm">
//               {state.errors.code}
//             </p>
//           )}
//         </div>

//         <button
//           type="submit"
//           disabled={isPending}
//           className="border rounded p-2 bg-blue-200 disabled:opacity-50"
//         >
//           {isPending ? "Saving..." : "Submit"}
//         </button>
//       </div>
//     </form>
//   );
// }

"use client";

import { useActionState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSnippet, type SnippetActionState } from "@/actions";

const initialState: SnippetActionState = {};

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


