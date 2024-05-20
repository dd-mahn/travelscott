import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/discover.css";
import buttonSvg1 from "../assets/svg/discover-button1.svg";
import buttonSvg2 from "../assets/svg/discover-button2.svg";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import MasonryImagesGallery from "./DiscoverComponents/MasonryGallery";
import natureGif from "../assets/videos/nature.gif";
import adventureGif from "../assets/videos/adventure.gif";
import cultureGif from "../assets/videos/culture.gif";
import relaxationGif from "../assets/videos/relaxation.gif";
import urbanGif from "../assets/videos/urban.gif";
import nostalgiaGif from "../assets/videos/nostalgia.gif";

const Discover = () => {
  const DOMTypes = [
    "Nature",
    "Relaxation",
    "Culture",
    "Adventure",
    "Urban",
    "Nostalgia",
  ];

  function toggle(e) {
    console.log(e);
    if (
      e.target.classList.contains("ri-checkbox-blank-circle-line") ||
      e.target.classList.contains("ri-checkbox-blank-circle-fill")
    ) {
      return;
    }

    const isOpen = e.target.nextElementSibling.classList.contains("d-off");
    const firstIcon = e.target.querySelector(".ri-checkbox-blank-circle-line");
    const secondIcon = e.target.querySelector(".ri-checkbox-blank-circle-fill");

    if (isOpen) {
      e.target.nextElementSibling.classList.toggle("d-off");
      firstIcon.classList.toggle("d-off");
      secondIcon.classList.toggle("d-off");
    } else {
      e.target.nextElementSibling.classList.toggle("d-off");
      firstIcon.classList.toggle("d-off");
      secondIcon.classList.toggle("d-off");
    }
  }

  function objectToQueryString(obj) {
    return Object.keys(obj)
      .filter((key) => obj[key].length > 0) // Ignore keys with empty values
      .map((key) => {
        if (Array.isArray(obj[key])) {
          // For arrays, add each item as a separate query parameter
          return obj[key]
            .map(
              (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            )
            .join("&");
        } else {
          // For strings, add the key-value pair as a single query parameter
          return `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`;
        }
      })
      .join("&");
  }

  const [filter, setFilter] = useState({ types: [], country: "" });
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [destinationInfo, setDestinationInfo] = useState(null);
  const [destinationCount, setDestinationCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function filterByType(e) {
    const type = e.target.innerText;
    if (filter.types.includes(type)) {
      e.target.classList.remove("type__selected");
      setFilter((prevFilter) => ({
        ...prevFilter,
        types: prevFilter.types.filter((item) => item !== type),
      }));
    } else {
      e.target.classList.add("type__selected");
      setFilter((prevFilter) => ({
        ...prevFilter,
        types: [...prevFilter.types, type],
      }));
    }
  }

  function filterByCountry(e) {
    const country = e.target.innerText;
    const countryList = document.querySelectorAll(".country__list li");
    const isCountrySelected = e.target.classList.contains("country__selected");

    countryList.forEach((item) => {
      if (item.innerText === country) {
        item.classList.toggle("country__selected", !isCountrySelected);
      } else {
        item.classList.remove("country__selected");
      }
    });

    setFilter((prevFilter) => ({
      ...prevFilter,
      country: isCountrySelected ? "" : country,
    }));
  }

  const filterQueryString = objectToQueryString(filter);
  const destinationInfoUrl = `${BASE_URL}/destinations?page=${page}&${filterQueryString}`;
  const destinationCountUrl = `${BASE_URL}/destinations/count?${filterQueryString}`;

  const {
    data: destinationInfoData,
    error: destinationInfoError,
    loading: destinationInfoLoading,
  } = useFetch(destinationInfoUrl);
  const { data: destinationCountData, error: destinationCountError } =
    useFetch(destinationCountUrl);

  useEffect(() => {
    if (!destinationInfoError) {
      setDestinationInfo(destinationInfoData);
    } else {
      setError(destinationInfoError);
    }

    if (!destinationCountError) {
      setDestinationCount(destinationCountData);
    } else {
      setError(destinationCountError);
    }

    setLoading(destinationInfoLoading);
  }, [
    destinationInfoData,
    destinationInfoError,
    destinationCountData,
    destinationCountError,
    destinationInfoLoading,
  ]);

  const destinations = destinationInfo?.destinations || [];
  const count = destinationCount?.count || 0;

  useEffect(() => {
    const pages = Math.ceil(count / 20);
    setPageCount(pages);
    // window.scrollTo(0, 0);
  }, [count]);

  const { data: countriesInfo } = useFetch(
    `${BASE_URL}/destinations/countries`
  );
  const countries = countriesInfo?.countries || [];

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
              <i class="ri-shining-2-fill"></i> Everything takes time.
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
                <form class="form">
                  <button type="button">
                    <i class="ri-search-2-line"></i>
                  </button>
                  <input
                    class="input"
                    placeholder="Search"
                    required=""
                    type="text"
                  />
                  <button class="reset" type="reset">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
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
                <span onClick={toggle}>
                  Type
                  <i class="ri-checkbox-blank-circle-line d-off"></i>
                  <i class="ri-checkbox-blank-circle-fill"></i>
                </span>
                <ul className="type__list">
                  {DOMTypes.map((type, index) => (
                    <li key={index} onClick={filterByType}>
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="country__select">
                <span onClick={toggle}>
                  Country
                  <i class="ri-checkbox-blank-circle-line d-off"></i>
                  <i class="ri-checkbox-blank-circle-fill"></i>
                </span>
                <ul className="country__list">
                  {countries.map((country, index) => (
                    <li key={index} onClick={filterByCountry}>
                      {country}
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col className="gallery flex flex-col justify-between w-full">
              {loading && <h4 className="text-center pt-5">Loading...</h4>}
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
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Discover;
