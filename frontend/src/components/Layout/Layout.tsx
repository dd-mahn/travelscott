import React, { useEffect, useState } from "react";
import { ReactLenis } from "lenis/dist/lenis-react";
import { useLocation } from "react-router-dom";

import Header from "src/components/Header/Header";
import Footer from "src/components/Footer/Footer";
import Routers from "src/router/Routers";
import Loading from "src/components/ui/Loading";

const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [loadingShown, setLoadingShown] = useState(false);

  useEffect(() => {
    if (location.pathname === "/") {
      setTimeout(() => {
        setLoading(false);
        setLoadingShown(true);
      }, 3000);
    } else setLoading(false);

    return () => {
      setLoading(true);
    };
  }, [location]);

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [location.pathname]);

  return (
    <>
      {loading && !loadingShown ? (
        <Loading />
      ) : (
        <>
          <ReactLenis root options={{ lerp: 0.08 }}>
            <Header />
            <Routers />
            <Footer />
          </ReactLenis>
        </>
      )}
    </>
  );
};

export default Layout;
