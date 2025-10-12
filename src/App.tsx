import { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import { CartProvider } from "./context/CartContext";
import Refresh from "./components/refreshCroll";
import Loader from "./components/loader";
// Import dynamique des pages
const Home = lazy(() => import("./pages/Home"));
const Contact = lazy(() => import("./pages/contact"));
const Panier = lazy(() => import("./pages/cartPage"));
const About = lazy(() => import("./pages/about"));
const Gallery = lazy(() => import("./pages/gallery"));
const ReservationPage = lazy(() => import("./pages/reservation"));
const MenuPage = lazy(() => import("./pages/menu"));
const Menuafricain = lazy(() => import("./pages/menuafricain"));
const Menustreet = lazy(() => import("./pages/street"));
const Menudrink = lazy(() => import("./pages/drink"));
const Success = lazy(() => import("./pages/succes"));
const Cancel = lazy(() => import("./pages/cancel"));
const Commander = lazy(() => import("./pages/commander"));
const Dessert = lazy(() => import("./pages/dessert"));
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/contact"
              element={
                <Suspense fallback={<Loader />}>
                  <Contact />
                </Suspense>
              }
            />
            <Route
              path="/panier"
              element={
                <Suspense fallback={<Loader />}>
                  <Panier />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<Loader />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="/gallery"
              element={
                <Suspense fallback={<Loader />}>
                  <Gallery />
                </Suspense>
              }
            />
             <Route
              path="/menu"
              element={
                <Suspense fallback={<Loader />}>
                  <MenuPage />
                </Suspense>
              }
            />
            <Route
              path="/reservation"
              element={
                <Suspense fallback={<Loader />}>
                  <ReservationPage />
                </Suspense>
              }
            />
            <Route
              path="/menuafricain"
              element={
                <Suspense fallback={<Loader />}>
                  <Menuafricain />
                </Suspense>
              }
            />
            <Route
              path="/drink"
              element={
                <Suspense fallback={<Loader />}>
                  <Menudrink />
                </Suspense>
              }
            />
            <Route
              path="/street"
              element={
                <Suspense fallback={<Loader />}>
                  <Menustreet />
                </Suspense>
              }
            />
            <Route
              path="/success"
              element={
                <Suspense fallback={<Loader />}>
                  <Success/>
                </Suspense>
              }
            />
            <Route
              path="/cancel"
              element={
                <Suspense fallback={<Loader />}>
                  <Cancel/>
                </Suspense>
              }
            />
            <Route
              path="/commander"
              element={
                <Suspense fallback={<Loader />}>
                  <Commander/>
                </Suspense>
              }
            />
            <Route
              path="/dessert"
              element={
                <Suspense fallback={<Loader />}>
                  <Dessert/>
                </Suspense>
              }
            />
           
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
        <Refresh />
      </Router>
    </CartProvider>
  );
}

export default App;
