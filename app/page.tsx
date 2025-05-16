import HotelFeatures from "@/components/home/HotelFeatures";
import Hero from "@/components/home/Hero";
import Image from "next/image";
import FeaturedRooms from "@/components/home/FeaturedRooms";

export default function Home() {
  return (
    <div>
      <Hero />
      <HotelFeatures />
      <FeaturedRooms />
    </div>
  );
}
