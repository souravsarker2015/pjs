import { useEffect } from "react";
import Services from "../../Components/Home/Services";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Services />
    </>
  );
}
