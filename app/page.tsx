import HotelFeatures from "@/components/home/HotelFeatures";
import Hero from "@/components/home/Hero";
import Image from "next/image";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import About from "@/components/home/About";

export default function Home() {
  return (
    <div>
      <Hero />
      <HotelFeatures />
      <FeaturedRooms />
      <About />
    </div>
  );
}
