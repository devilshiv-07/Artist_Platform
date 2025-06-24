"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/constants";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [startScale, setStartScale] = useState(false);

  useEffect(() => {
    // 1s for logo on black, then scale up
    const logoTimer = setTimeout(() => setStartScale(true), 1000);
    // 1.7s for scale up, then show content
    const contentTimer = setTimeout(() => setShowContent(true), 1700);
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <main className="container mx-auto px-2 sm:px-4 lg:px-8 mt-12">
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
            style={{ pointerEvents: "none" }}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={startScale ? { scale: 14, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: startScale ? 0.7 : 0.7, ease: "easeInOut" }}
              className="text-4xl font-bold text-white"
              style={{ zIndex: 51, willChange: "transform, color" }}
            >
              {/* Replace with your SVG logo if desired */}
              Artistify
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {showContent && (
        <>
          {/* Hero Section without animation */}
          <div className="text-center mb-12 max-w-2xl mx-auto section">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">Find, Book, and Manage Performing Artists Effortlessly</h2>
            <p className="mb-6 text-lg text-muted-foreground">
              Artistly.com connects <span className="font-semibold">Event Planners</span> and <span className="font-semibold">Artist Managers</span> for seamless artist discovery, booking, and management.
            </p>
            <div>
              <Button asChild size="lg" className="hover:scale-105 transition-all duration-300">
                <Link href="/artists">Explore Artists</Link>
              </Button>
            </div>
          </div>
          {/* Category Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl mx-auto mb-16">
            {categories.map((cat) => (
              <div
                key={cat}
                className="block hover:scale-107 transition-all duration-300"
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
        </>
      )}
    </main>
  );
}
