import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";
import NewArrivals from "./components/section/NewArrivals";
import Categories from "./components/section/Categories";
import Story from "./components/section/Story";
import Footer from "./components/footer/Footer";

function App() {
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
