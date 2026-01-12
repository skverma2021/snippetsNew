import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createSnippetSchema } from "@/lib/validations/snippet";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // ✅ Validate input
    const data = createSnippetSchema.parse(body);

    // ✅ Safe to use
    const snippet = await prisma.snippet.create({
      data,
    });

    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    // ❌ Validation error
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          // issues: error.errors,
          issues: error.issues,
        },
        { status: 400 }
      );
    }

    // ❌ Unknown error
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// without zod
// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();
//   const { title, code } = body;

//   if (!title || !code) {
//     return NextResponse.json(
//       { error: "Title and code are required" },
//       { status: 400 }
//     );
//   }

//   const snippet = await prisma.snippet.create({
//     data: {
//       title,
//       code,
//     },
//   });

//   return NextResponse.json(snippet, { status: 201 });
// }

