import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditSnippetForm from "./EditSnippetForm";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditSnippetPage({ params }: PageProps) {
  const { id } = await params;

  const snippet = await prisma.snippet.findUnique({
    where: { id: Number(id) },
  });

  if (!snippet) {
    notFound();
  }

  return (
    <EditSnippetForm snippet={snippet} />
  );
}

