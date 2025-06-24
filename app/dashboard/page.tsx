"use client";
import { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Submission = {
  id: number;
  name: string;
  category: string[] | string;
  city: string;
  fee: string;
  status: string;
};

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/submissions")
      .then((res) => res.json())
      .then(setSubmissions)
      .catch(() => setError("Failed to load submissions."))
      .finally(() => setLoading(false));
  }, []);

  // Dynamic status update (in-memory)
  const updateStatus = (id: number, status: string) => {
    setSubmissions((subs) =>
      subs.map((s) => (s.id === id ? { ...s, status } : s))
    );
  };

  return (
    <main className="container mx-auto py-8 max-w-4xl px-2 sm:px-4 lg:px-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Manager Dashboard</h1>
      <Card className="p-6 shadow-md">
        {loading && <p>Loading submissions...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="overflow-x-auto">
          <Table className="min-w-[700px]">
            <thead>
              <tr className="bg-muted">
                <th className="py-3 px-4 text-left font-semibold">Name</th>
                <th className="py-3 px-4 text-left font-semibold">Category</th>
                <th className="py-3 px-4 text-left font-semibold">City</th>
                <th className="py-3 px-4 text-left font-semibold">Fee</th>
                <th className="py-3 px-4 text-left font-semibold">Status</th>
                <th className="py-3 px-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                  <td className="py-2 px-4 font-medium">{s.name}</td>
                  <td className="py-2 px-4">{Array.isArray(s.category) ? s.category.join(", ") : s.category}</td>
                  <td className="py-2 px-4">{s.city}</td>
                  <td className="py-2 px-4 text-green-700 font-semibold">{s.fee}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${s.status === "Approved" ? "bg-green-100 text-green-700" : s.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-800"}`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => updateStatus(s.id, "Approved")} disabled={s.status === "Approved"}>Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(s.id, "Rejected")} disabled={s.status === "Rejected"}>Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        {!loading && submissions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No submissions found.</div>
        )}
      </Card>
    </main>
  );
} 