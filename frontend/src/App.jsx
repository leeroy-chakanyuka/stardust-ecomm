import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";
import NewArrivals from "./components/section/NewArrivals";

function App() {
  return (
    <>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Hero />
        <NewArrivals />
      </main>
    </>
  );
}

export default App;
