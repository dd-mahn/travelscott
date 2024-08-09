import React, { useEffect, useState } from "react";
import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import Routers from "src/router/Routers";
import { useLocation } from "react-router-dom";
import Loading from "src/pages/Loading";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else setLoading(false);

    return () => {
      setLoading(true);
    };
  }, [location]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {loading ? (
        <Loading/>
      ) : (
        <>
          <Header />
          <Routers />
          <Footer />
        </>
      )}
    </>
  );
};

export default Layout;
