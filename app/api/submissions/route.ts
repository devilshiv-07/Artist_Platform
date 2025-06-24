import { NextRequest, NextResponse } from "next/server";

// In-memory mock data for submissions
let submissions = [
  {
    id: 1,
    name: "Asha Singh",
    category: ["Singer"],
    city: "Mumbai",
    fee: "₹10,000 - ₹20,000",
    status: "Pending",
  },
  {
    id: 2,
    name: "Rahul Mehra",
    category: ["DJ"],
    city: "Delhi",
    fee: "₹15,000 - ₹25,000",
    status: "Approved",
  },
];

export async function GET() {
  return NextResponse.json(submissions);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newSubmission = { ...data, id: submissions.length + 1, status: "Pending" };
  submissions.push(newSubmission);
  return NextResponse.json(newSubmission, { status: 201 });
} 