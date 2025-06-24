"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
  bio: yup.string().required("Bio is required").min(10, "Bio must be at least 10 characters"),
  category: yup.array().min(1, "Select at least one category").required(),
  languages: yup.array().min(1, "Select at least one language").required(),
  feeRange: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
});

const categories = ["Singer", "Dancer", "Speaker", "DJ"];
const languages = ["Hindi", "English", "Tamil", "Telugu", "Marathi", "Bengali"];
const feeRanges = [
  "₹5,000 - ₹10,000",
  "₹10,000 - ₹20,000", 
  "₹20,000 - ₹50,000",
  "₹50,000+"
];

export default function OnboardPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      bio: "",
      category: [],
      languages: [],
      feeRange: "",
      location: "",
    },
  });

  const toggleCategory = (cat: string) => {
    const updated = selectedCategories.includes(cat)
      ? selectedCategories.filter(c => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(updated);
    form.setValue("category", updated, { shouldValidate: true });
  };

  const toggleLanguage = (lang: string) => {
    const updated = selectedLanguages.includes(lang)
      ? selectedLanguages.filter(l => l !== lang)
      : [...selectedLanguages, lang];
    setSelectedLanguages(updated);
    form.setValue("languages", updated, { shouldValidate: true });
  };

  type FormValues = {
    name: string;
    bio: string;
    category: string[];
    languages: string[];
    feeRange: string;
    location: string;
  };
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch("/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          category: selectedCategories,
          languages: selectedLanguages,
        }),
      });
      if (response.ok) {
        setSuccess(true);
        form.reset();
        setSelectedCategories([]);
        setSelectedLanguages([]);
      }
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="container mx-auto py-8 max-w-2xl px-2 sm:px-4 lg:px-8">
        <Card className="p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-green-600">Submission Successful! 🎉</h1>
          <p className="mb-4">Your artist profile has been submitted for review.</p>
          <Button onClick={() => setSuccess(false)}>Submit Another</Button>
        </Card>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 max-w-2xl px-2 sm:px-4 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Artist Onboarding Form</h1>
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio *</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your experience and specialties..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category (Multi-select with checkboxes) */}
            <FormField
              control={form.control}
              name="category"
              render={() => (
                <FormItem>
                  <FormLabel>Category * (Select all that apply)</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <label key={cat} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{cat}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Languages (Multi-select with checkboxes) */}
            <FormField
              control={form.control}
              name="languages"
              render={() => (
                <FormItem>
                  <FormLabel>Languages Spoken * (Select all that apply)</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {languages.map((lang) => (
                      <label key={lang} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedLanguages.includes(lang)}
                          onChange={() => toggleLanguage(lang)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{lang}</span>
                      </label>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fee Range */}
            <FormField
              control={form.control}
              name="feeRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee Range *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your fee range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {feeRanges.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Profile Image Upload (Optional) */}
            <FormItem>
              <FormLabel>Profile Image (Optional)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" className="cursor-pointer" />
              </FormControl>
            </FormItem>

            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </Card>
    </main>
  );
} 