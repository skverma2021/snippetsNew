
import { prisma } from "@/lib/prisma";
import CreateNewSnippet from "./form";

export default async function Page() {
  const snippetTypes = await prisma.snippetType.findMany({
    orderBy: { description: "asc" },
  });

  return <CreateNewSnippet snippetTypes={snippetTypes} />;
}


