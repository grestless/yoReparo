import { Hero } from "@/components/home/Hero";
import { ServicesBento } from "@/components/home/ServicesBento";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <ServicesBento />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </div>
  );
}
