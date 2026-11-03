import { useEffect } from "react";
import About from "../../../Components/Home/About/About";
import Counter from "../../../Components/Home/Counter";
import ClientSlider from "../../../Components/Home/ClientSlider";

export default function Aboutus() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section>
      <About />
      <Counter />
      <ClientSlider />
    </section>
  );
}
