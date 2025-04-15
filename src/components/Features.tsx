import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Zap, Shield, BarChart } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="border border-border/40 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="text-primary mb-2">{icon}</div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export function Features() {
  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Easy Integration",
      description:
        "Seamlessly integrate with your existing systems and workflows without disruption.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures your applications run smoothly and efficiently.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure by Design",
      description:
        "Built with security in mind, protecting your data and your users at every step.",
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Advanced Analytics",
      description:
        "Gain valuable insights with comprehensive analytics and reporting tools.",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform comes packed with everything you need to build and grow
            your digital presence.
          </p>
        </div>

        <div className="relative">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/24721c969a8641f49dddc9964ffeebe0/bef4cb624d7e716a0767b9ecf6140d4484d35c65?placeholderIfAbsent=true"
            alt="Features overview"
            className="w-full object-contain mb-12 hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
