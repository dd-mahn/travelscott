import React, { useEffect } from "react";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import Routers from "src/router/Routers";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Header />
      <Routers />
      <Footer />
    </>
  );
};

export default Layout;
