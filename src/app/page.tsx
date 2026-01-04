import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import AboutUs from "@/components/AboutUs";
import OurProducts from "@/components/OurProducts";
import HowItWorks from "@/components/HowItWorks";
import ChooseUs from "@/components/ChooseUs";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-app-white dark:bg-app-gray-900 transition-colors duration-300 scroll-smooth">
            <NavBar />
            <HeroSection />
            <AboutUs />
            <OurProducts />
            <HowItWorks />
            <ChooseUs />
            <Banner />
            <Footer />
        </div>
    );
}
