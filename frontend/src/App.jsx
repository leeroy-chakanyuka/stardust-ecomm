import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";
import NewArrivals from "./components/section/NewArrivals";
import Categories from "./components/section/Categories";
import Story from "./components/section/Story";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { fetchCategories } from "./api/fetchCategories";

function App() {
  /* remember these are always at the top level but of a component */

  useEffect(function () {
    function fetchCat() {
      fetchCategories().then((response) => {
        console.log(`response \n}`, response);
      });
    }
    fetchCat();
  }, []); /* empty array means this will only run once when we mount the data */

  return (
    <>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Hero />
        <NewArrivals />
        <Categories />
        <Story />
      </main>
      <Footer />
    </>
  );
}

export default App;
