import { PageRenderer } from "@/components/PageRenderer";
import { prisma } from "@/lib/db";
import { incrementVisit } from "@/actions/analytics-actions";
import { notFound } from "next/navigation";

export default async function Home() {
  await incrementVisit(); // Track visit

  const page = await prisma.page.findUnique({
    where: { slug: 'home', isPublished: true },
    include: { sections: { orderBy: { order: "asc" } } }
  });

  if (!page) {
    return notFound();
  }

  return (
    <main>
      <PageRenderer sections={page.sections} />
    </main>
  );
}
