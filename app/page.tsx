import HotelFeatures from "@/components/home/HotelFeatures";
import Hero from "@/components/home/Hero";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import About from "@/components/home/About";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <HotelFeatures />
      <FeaturedRooms />
      <About />
      <Footer />
    </div>
  );
}
