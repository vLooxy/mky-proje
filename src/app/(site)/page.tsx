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
    // Return empty page instead of 404 to allow build to pass even if DB is empty
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome to Engisafe Web</h1>
          <p className="mt-2 text-gray-600">Site content is being initialized...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageRenderer sections={page.sections} />
    </main>
  );
}
