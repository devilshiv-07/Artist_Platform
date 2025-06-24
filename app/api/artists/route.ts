import { NextRequest, NextResponse } from "next/server";

// In-memory mock data for artists
const artists = [
  {
    id: 1,
    name: "Asha Singh",
    bio: "Award-winning singer with 10+ years of experience.",
    category: ["Singer"],
    languages: ["Hindi", "English"],
    feeRange: "₹10,000 - ₹20,000",
    location: "Mumbai",
    image: "/artist1.jpg",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    bio: "Dynamic DJ for weddings and corporate events.",
    category: ["DJ"],
    languages: ["English"],
    feeRange: "₹15,000 - ₹25,000",
    location: "Delhi",
    image: "/artist2.jpg",
  },
  {
    id: 3,
    name: "Priya Sharma",
    bio: "Professional dancer specializing in Bollywood and contemporary.",
    category: ["Dancer"],
    languages: ["Hindi"],
    feeRange: "₹8,000 - ₹18,000",
    location: "Bangalore",
    image: "/artist3.jpg",
  },
  {
    id: 4,
    name: "Vikram Rao",
    bio: "Motivational speaker and event host.",
    category: ["Speaker"],
    languages: ["English", "Hindi"],
    feeRange: "₹12,000 - ₹22,000",
    location: "Chennai",
    image: "/artist4.jpg",
  },
];

export async function GET(req: NextRequest) {
  // Optionally filter by query params (category, location, feeRange)
  const { searchParams } = new URL(req.url);
  let filtered = [...artists];

  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const feeRange = searchParams.get("feeRange");

  if (category) filtered = filtered.filter(a => a.category.includes(category));
  if (location) filtered = filtered.filter(a => a.location === location);
  if (feeRange) filtered = filtered.filter(a => a.feeRange === feeRange);

  return NextResponse.json(filtered);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newArtist = { ...data, id: artists.length + 1 };
  artists.push(newArtist);
  return NextResponse.json(newArtist, { status: 201 });
} 