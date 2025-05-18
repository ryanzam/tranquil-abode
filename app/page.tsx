import HotelFeatures from "@/components/home/HotelFeatures";
import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import About from "@/components/home/About";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <HotelFeatures />
      <FeaturedRooms />
      <About />
      <Footer />
    </div>
  );
}
