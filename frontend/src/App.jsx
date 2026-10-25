import "./App.css";
import Navigation from "./components/navigation/Navigation";
import Hero from "./components/hero/Hero";
import NewArrivals from "./components/section/NewArrivals";
import Categories from "./components/section/Categories";
import Story from "./components/section/Story";
import Footer from "./components/footer/Footer";
import { useEffect } from "react";
import { fetchCategories } from "./api/fetchCategories";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./components/spinner/Spinner";
import { loadCategories } from "./store/features/category";
import { setLoading } from "./store/features/common";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.common.loading);

  /* remember these are always at the top level but of a component */
  useEffect(
    function () {
      function fetchCat() {
        try {
          dispatch(setLoading(true));

          fetchCategories().then((response) => {
            console.log(`response \n`, response);
            dispatch(loadCategories(response)); // put it in our store
          });
        } catch (err) {
          console.log(err);
        } finally {
          console.log("killing spinner");
          dispatch(setLoading(false));
        }
      }
      fetchCat();
    },
    [dispatch],
  ); /* added dispatch to dep array for linting purposes, this is stable */
  /* empty array means this will only run once when we mount the data */

  return (
    <>
      <Navigation />
      <main className="flex flex-1 flex-col">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Hero />
            <NewArrivals />
            <Categories />
            <Story />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
