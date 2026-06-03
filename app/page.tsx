import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import BrandStory from "../components/BrandStory";
import GalleryPreview from "../components/GalleryPreview";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Stats from "../components/Stats";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Stats />
      <FeaturedProducts />
      <BrandStory />
      <GalleryPreview />
      <Newsletter />
      <Footer />
    </main>
  );
}