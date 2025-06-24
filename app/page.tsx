import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";

export default function Home() {
  return (
    <main className="container mx-auto px-2 sm:px-4 lg:px-8 mt-12">
      {/* Hero Section without animation */}
      <div className="text-center mb-12 max-w-2xl mx-auto section">
        <h2 className="text-2xl sm:text-4xl font-bold mb-4">Find, Book, and Manage Performing Artists Effortlessly</h2>
        <p className="mb-6 text-lg text-muted-foreground">
          Artistly.com connects <span className="font-semibold">Event Planners</span> and <span className="font-semibold">Artist Managers</span> for seamless artist discovery, booking, and management.
        </p>
        <div>
          <Button asChild size="lg">
            <Link href="/artists">Explore Artists</Link>
          </Button>
        </div>
      </div>
      {/* Category Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto mb-16">
        {categories.map((cat) => (
          <div
            key={cat}
            className="block"
          >
            <Link href={`/artists?category=${cat}`} className="block">
              <Card className="flex flex-col items-center p-6 hover:shadow-lg transition-shadow h-full">
                <span className="text-4xl mb-2">
                  {cat === "Singer" ? "🎤" : cat === "Dancer" ? "💃" : cat === "Speaker" ? "🎙️" : cat === "DJ" ? "🎧" : ""}
                </span>
                <span className="text-lg font-semibold">{cat}</span>
              </Card>
            </Link>
          </div>
        ))}
      </section>
      {/* Footer CTA */}
      <div className="text-center text-muted-foreground mt-auto pb-8 footer">
        <p>Ready to perform or manage artists? <Link href="/onboard" className="underline font-medium">Onboard Now</Link></p>
      </div>
    </main>
  );
}
