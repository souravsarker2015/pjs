import About from "../../../Components/Home/About/About";
import ClientSlider from "../../../Components/Home/ClientSlider";
import Contact from "../../../Components/Home/Contact";
import ContactUs from "../../../Components/Home/ContactUs";
import Counter from "../../../Components/Home/Counter";
import Features from "../../../Components/Home/Features/Features";
import Gallery from "../../../Components/Home/Gallery/Gallery";
import Hero from "../../../Components/Home/Hero/Hero";
import ProjectHighlight from "../../../Components/Home/ProjectHighlight/ProjectHighlight";
import { useEffect } from "react";
import Services from "../../../Components/Home/Services";
import WhyChoose from "../../../Components/Home/WhyChoose/WhyChoose";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <div className="mt-[25vh] sm:mt-[80vh]">
        <About />
      </div>
      <Services />
      <ProjectHighlight />
      <Features />
      <WhyChoose />
      <Gallery />
      <Contact />
      <ClientSlider />
      <Counter />
      <ContactUs />
    </>
  );
}
