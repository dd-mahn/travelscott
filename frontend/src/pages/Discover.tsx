import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "src/styles/discover.css";
import buttonSvg1 from "src/assets/svg/discover-button1.svg";
import buttonSvg2 from "src/assets/svg/discover-button2.svg";
import { BASE_URL } from "src/utils/config";
import useFetch from "src/hooks/useFetch";
import MasonryImagesGallery from "src/pages/DiscoverComponents/MasonryGallery";
import natureGif from "src/assets/videos/nature.gif";
import adventureGif from "src/assets/videos/adventure.gif";
import cultureGif from "src/assets/videos/culture.gif";
import relaxationGif from "src/assets/videos/relaxation.gif";
import urbanGif from "src/assets/videos/urban.gif";
import nostalgiaGif from "src/assets/videos/nostalgia.gif";

const Discover = () => {
  const DOMTypes: string[] = [
    "Nature",
    "Relaxation",
    "Culture",
    "Adventure",
    "Urban",
    "Nostalgia",
  ];

  
  return (
    <div className="discover">
      <section className="discover__hero">
        <Container className="flex flex-col">
          <Row className="flex justify-end">
            <a
              href="/test"
              className="test__btn relative flex justify-center items-center cursor-pointer"
            >
              <img src={buttonSvg1} alt="" />
              <img src={buttonSvg2} alt="" />
              <span className="underline__btn z-5">
                But first, take this test
                <i className="ri-arrow-right-line"></i>
              </span>
            </a>
          </Row>
          <Row className="flex justify-center items-center relative">
            <h1 className="font-medium z-10">
              <strong>EXPLORE</strong> our great collection of <br></br>{" "}
              travel destinations around the world.
            </h1>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={relaxationGif} alt="gif" />
                </div>
              </div>
            </div>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={natureGif} alt="gif"></img>
                </div>
              </div>
            </div>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={adventureGif} alt="gif"></img>
                </div>
              </div>
            </div>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={urbanGif} alt="gif"></img>
                </div>
              </div>
            </div>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={nostalgiaGif} alt="gif"></img>
                </div>
              </div>
            </div>
            <div className="bg__float">
              <div className="float__inner">
                <div className="float__front"></div>
                <div className="float__back">
                  <img src={cultureGif} alt="gif"></img>
                </div>
              </div>
            </div>
          </Row>
          <Row className="font-medium">
            <a>
              Scroll <i className="ri-arrow-down-line font-medium"></i>
            </a>
          </Row>
        </Container>
      </section>

      <section className="discover__catalogue">
        <Container>
          <Row className="flex justify-center">
            <h1>
              <i className="ri-shining-2-fill"></i> Everything takes time.
            </h1>
          </Row>
          <Row className="flex justify-between items-baseline">
            <Col>
              <h1 className="text-light-gradient">ALL DESTINATIONS</h1>
            </Col>
            {/* <Col>
              <span>(Thanks for being patient)</span>
            </Col> */}
          </Row>
          <Row className="flex justify-between">
            <Col className="flex flex-col">
              <div className="search__bar">
                <form className="form">
                  <button title="something" type="button">
                    <i className="ri-search-2-line"></i>
                  </button>
                  <input
                    className="input"
                    placeholder="Search"
                    required
                    type="text"
                  />
                  <button title="something" className="reset" type="reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </form>
              </div>
              <div className="type__select">
                <span>
                  Type
                  <i className="ri-checkbox-blank-circle-line d-off"></i>
                  <i className="ri-checkbox-blank-circle-fill"></i>
                </span>
                <ul className="type__list">
                  {DOMTypes.map((type, index) => (
                    <li key={index}>
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="country__select">
                <span >
                  Country
                  <i className="ri-checkbox-blank-circle-line d-off"></i>
                  <i className="ri-checkbox-blank-circle-fill"></i>
                </span>
                <ul className="country__list">
                  {/* {countries.map((country, index) => (
                    <li key={index} onClick={filterByCountry}>
                      {country}
                    </li>
                  ))} */}
                </ul>
              </div>
            </Col>
            <Col className="gallery flex flex-col justify-between w-full">
              {/* {loading && <h4 className="text-center pt-5">Loading...</h4>}
              {error && <h4 className="text-center pt-5">{error}</h4>}

              {!loading &&
                !error &&
                (destinations.length === 0 ||
                  destinations === null ||
                  destinations === undefined) && (
                  <h4 className="text-center pt-5">No destinations found</h4>
                )}

              {!loading && !error && (
                <MasonryImagesGallery destinations={destinations} />
              )}

              <div className="pagination flex justify-between">
                <div className="flex ">
                  <span>Page:</span>
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number + 1}
                      onClick={() => setPage(number + 1)}
                      className={page === number + 1 ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
                <span>
                  Showing {destinations.length} of {count}
                </span>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Discover;
