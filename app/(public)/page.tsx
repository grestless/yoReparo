import { Hero } from "@/components/home/Hero";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-white">
      <Hero />
      <ServiceCategories />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </div>
  );
}
