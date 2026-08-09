import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { DemoLibrary } from "@/components/DemoLibrary";
import { About } from "@/components/About";
import { Terms } from "@/components/Terms";
import { Calculator } from "@/components/Calculator";
import { Footer } from "@/components/Footer";

const title = "Saff ♫ Voice actor for characters, animation and games";
const description =
  "Saff is a voice actor for characters, animation, games, narration and creative projects. Listen to demos and build a quick project quote.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: import.meta.env.BASE_URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: import.meta.env.BASE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Saff",
          jobTitle: "Voice actor",
          description,
          sameAs: ["https://www.youtube.com/channel/UC6dTdLwmJ93AfGJSr1b6Arw"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DemoLibrary />
        <About />
        <Terms />
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
