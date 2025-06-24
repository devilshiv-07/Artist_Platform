"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { categories, feeRanges, locations } from "@/constants/index";

function parsePriceRange(range: string) {
  // Extract the lower bound of the price range for sorting
  const match = range.match(/\d[\d,]*/g);
  if (!match) return 0;
  return parseInt(match[0].replace(/,/g, ""), 10);
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Use 'all' as the default value for filters
  const category = searchParams.get("category") || "all";
  const location = searchParams.get("location") || "all";
  const feeRange = searchParams.get("feeRange") || "all";
  const sort = searchParams.get("sort") || "none";

  const fetchArtists = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category && category !== "all") params.append("category", category);
      if (location && location !== "all") params.append("location", location);
      if (feeRange && feeRange !== "all") params.append("feeRange", feeRange);
      
      const response = await fetch(`/api/artists?${params}`);
      let data = await response.json();
      // Sort by price if needed
      if (sort === "asc") {
        data = data.slice().sort((a: any, b: any) => parsePriceRange(a.feeRange) - parsePriceRange(b.feeRange));
      } else if (sort === "desc") {
        data = data.slice().sort((a: any, b: any) => parsePriceRange(b.feeRange) - parsePriceRange(a.feeRange));
      }
      setArtists(data);
    } catch (err) {
      setError("Failed to load artists.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtists();
    // eslint-disable-next-line
  }, [category, location, feeRange, sort]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all" && value !== "none") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/artists?${params}`);
  };

  const clearFilters = () => {
    router.push("/artists");
  };

  return (
    <main className="container mx-auto py-8 px-2 sm:px-4 lg:px-8">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
        <h1 className="text-2xl font-bold">Artist Listing</h1>
        <div className="text-sm text-muted-foreground">
          {artists.length} artist{artists.length !== 1 ? "s" : ""} found
        </div>
      </div>
      {/* Responsive Filter controls */}
      <section className="mb-6">
        <div className="flex flex-wrap gap-3 overflow-x-auto pb-2 -mx-2 px-2">
          <div className="min-w-[160px]">
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={(value) => updateFilter("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[160px]">
            <label className="text-sm font-medium mb-2 block">Location</label>
            <Select value={location} onValueChange={(value) => updateFilter("location", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[160px]">
            <label className="text-sm font-medium mb-2 block">Fee Range</label>
            <Select value={feeRange} onValueChange={(value) => updateFilter("feeRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Ranges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranges</SelectItem>
                {feeRanges.map((range) => (
                  <SelectItem key={range} value={range}>{range}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Sort by Price */}
          <div className="min-w-[160px]">
            <label className="text-sm font-medium mb-2 block">Sort by Price</label>
            <Select value={sort} onValueChange={(value) => updateFilter("sort", value)}>
              <SelectTrigger>
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="asc">Low to High</SelectItem>
                <SelectItem value="desc">High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button variant="outline" onClick={clearFilters} className="w-full">Clear Filters</Button>
          </div>
        </div>
      </section>
      {/* Loading/Error States */}
      {loading && <p>Loading artists...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {/* Artist cards grid with animation */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {artists.map((artist, i) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, delay: i * 0.07 }}
              layout
            >
              <Card className="flex flex-col gap-2 p-4 hover:shadow-lg transition-shadow h-full">
                <div className="flex-1">
                  <div className="font-bold text-lg mb-1">{artist.name}</div>
                  <div className="text-sm text-muted-foreground mb-1">{artist.category.join(", ")}</div>
                  <div className="text-sm mb-1">📍 {artist.location}</div>
                  <div className="text-sm mb-2 font-medium text-green-600">{artist.feeRange}</div>
                  <div className="text-xs text-muted-foreground mb-2 line-clamp-2">{artist.bio}</div>
                  <div className="text-xs text-muted-foreground">
                    Languages: {artist.languages.join(", ")}
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="mt-2">
                  Ask for Quote
                </Button>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
      {!loading && artists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No artists found matching your criteria.</p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </main>
  );
} 