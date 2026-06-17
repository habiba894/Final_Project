import { useState, useEffect } from "react";
import Hero from "./Hero";
import Destinations from "./Destinations";
import CTA from "./CTA";
import Footer from "./Footer";
import Aboutus from "./Aboutus";
const Home = () => {
  const countries = ["egypt", "france", "turkey"];
  const [currentCountry, setCurrentCountry] = useState(countries[0]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % countries.length;
      setCurrentCountry(countries[index]);
    }, 4000); // كل 4 ثواني

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Hero />
      <Destinations />
      <Aboutus />
      <div className="transition-all duration-700 ease-in-out">
      </div>

      <CTA />
      <Footer />
    </>
  );
};

export default Home;
