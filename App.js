import React, { lazy, Suspense, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./src/Components/Header";
import Body from "./src/Components/Body";
import Footer from "./src/Components/Footer";
import Error from "./src/Components/Error";
import Contact from "./src/Components/Contact";
import { BrowserRouter as Router, createBrowserRouter, RouterProvider, Outlet, Routes, Route } from "react-router-dom";
import UserContext from "./src/utils/UserContext";
import { Provider } from "react-redux";
import store from "./src/utils/store";
import Cart from "./src/Components/Cart";
import Help from "./src/Components/Help";
import ShimmerMenu from "./src/Components/ShimmerMenu";
// import ShimmerInstamart from "./src/Components/ShimmerInstamart";
import ShimmerAbout from "./src/Components/ShimmerAbout";
import LogIn from "./src/Components/Login";
import Signup from "./src/Components/Signup";
import Main from "./src/Components/Main";

// Chunking -- Code Splitting -- Dynamic Bundling -- Lazy Loading -- On Demand Loading -- Dynamic Import
const Instamart = lazy(() => import("./src/Components/Instamart"));
const About = lazy(() => import("./src/Components/About"));
const RestaurantMenu = lazy(() => import("./src/Components/RestaurantMenu"));

const AppLayout = () => {
  const [user, setUser] = useState({
    name: "Mohd Amaan",
    email: "mhdamaan79@gmail.com",
  });

  return (

    <Provider store={store}>
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/main" element={<Main />}>
              <Route path="about" element={
                <Suspense fallback={<ShimmerAbout />}>
                  <About />
                </Suspense>
              } />
              <Route path="/main" element={<Body />} />
              <Route path="help" element={<Help />} />
              <Route path="contact" element={<Contact />} />
              <Route path="cart" element={<Cart />} />
              <Route path="restaurant/:resId" element={
                <Suspense fallback={<ShimmerMenu />}>
                  <RestaurantMenu />
                </Suspense>
              } />
            </Route>
          </Routes>
        </Router>

      </UserContext.Provider>
    </Provider>

  );
};



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
