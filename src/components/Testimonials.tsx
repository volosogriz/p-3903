import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
  avatar,
}: TestimonialProps) {
  return (
    <Card className="border border-border/40 shadow-sm h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <Quote className="w-10 h-10 text-primary/20 mb-4" />
        <p className="text-gray-700 italic mb-4">{quote}</p>
      </CardContent>
      <CardFooter className="border-t border-border/20 pt-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={avatar} alt={author} />
            <AvatarFallback>{author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">
              {role}, {company}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "This platform has completely transformed how we approach our digital strategy. The results have been nothing short of amazing.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      quote:
        "The ease of use combined with powerful features makes this the perfect solution for businesses of any size.",
      author: "Michael Chen",
      role: "CTO",
      company: "Innovate Inc",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      quote:
        "We've seen a 40% increase in conversion rates since implementing this platform. The ROI has been incredible.",
      author: "Jessica Williams",
      role: "E-commerce Manager",
      company: "Retail Giants",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      quote:
        "The customer support team is responsive and helpful. They've been there every step of the way during our implementation.",
      author: "David Rodriguez",
      role: "Operations Lead",
      company: "Service Pro",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const testimonialsPerPage = 2;
  const pageCount = Math.ceil(testimonials.length / testimonialsPerPage);

  const displayedTestimonials = testimonials.slice(
    currentPage * testimonialsPerPage,
    (currentPage + 1) * testimonialsPerPage,
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % pageCount);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + pageCount) % pageCount);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our clients have to say
            about their experience.
          </p>
        </div>

        <div className="relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/24721c969a8641f49dddc9964ffeebe0/098d7e0cb647246516cda2ed8d535a246f9dbe03?placeholderIfAbsent=true"
            alt="Testimonials background"
            className="w-full object-contain mb-12 hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {displayedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
                avatar={testimonial.avatar}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevPage}
              disabled={pageCount <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextPage}
              disabled={pageCount <= 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
