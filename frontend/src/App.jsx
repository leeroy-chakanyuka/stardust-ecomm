import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";

function App() {
  return (
    <>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Hero />
      </main>
    </>
  );
}

export default App;
