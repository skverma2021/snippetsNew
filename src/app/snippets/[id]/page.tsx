import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function showOneSnippet(props: PageProps) {
    await new Promise((r) => {
        setTimeout(r, 1000)
    })
    const { id } = await props.params
    // Get one Snippet
    const snippet = await prisma.snippet.findFirst({
        where: {
            // ... provide filter here
            id: parseInt(id)
        }
    })
    if (!snippet) return notFound();


    return (
        <div>
            <div className="flex justify-between items-center m-4">
                <h1 className="text-xl font-bold">{snippet.title}</h1>
                <div className="flex gap-4 ">
                    <button className="border rounded p-2">Delete</button>
                    <button className="border rounded p-2"><Link href={`/snippets/${snippet.id}/edit`}>Edit</Link></button>
                </div>
            </div>
            <pre className="bg-gray-200 p-3">
                <code>{snippet.code}</code>
            </pre>
        </div>

    )
}