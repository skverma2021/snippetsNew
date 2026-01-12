import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  const renderedSnippets = snippets.map((t) => {
    return (
      <Link key={t.id} href={`/snippets/${t.id}`} className="flex justify-between items-center border rounded p-2">
        <div>{t.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex justify-between items-center m-2">
        <h1 className="p-5">Snippets:</h1>
        <Link href="/snippets/new" className="border rounded p-2">New</Link>
      </div>
      <div>{renderedSnippets}</div>

    </div>
  );
}

