import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/discover.css";
import buttonSvg1 from "../assets/svg/discover-button1.svg";
import buttonSvg2 from "../assets/svg/discover-button2.svg";
import { BASE_URL } from "../utils/config";
import useFetch from "../hooks/useFetch";
import MasonryImagesGallery from "./DiscoverComponents/MasonryGallery";

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

const { data: destinationInfoData, error: destinationInfoError, loading: destinationInfoLoading } = useFetch(destinationInfoUrl);
const { data: destinationCountData, error: destinationCountError } = useFetch(destinationCountUrl);

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
}, [destinationInfoData, destinationInfoError, destinationCountData, destinationCountError, destinationInfoLoading]);

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
        <Container className="flex flex-col relative">
          <Row className="flex justify-end">
            <a
              href="/test"
              className="test__btn relative flex justify-center items-center cursor-pointer"
            >
              <img src={buttonSvg1} alt="" />
              <img src={buttonSvg2} alt="" />
              <span className="underline font-medium z-5">
                Find out your travel spirit first
              </span>
            </a>
          </Row>
          <Row className="flex justify-center items-center">
            <h1 className="font-medium z-10">
              Then <strong>EXPLORE</strong> our great collection of <br></br>{" "}
              travel destinations around the world.
            </h1>
          </Row>
          <Row className="font-medium">
            <a>
              Scroll <i className="ri-arrow-down-line font-medium"></i>
            </a>
          </Row>
          <div className="bg__float"></div>
          <div className="bg__float"></div>
          <div className="bg__float"></div>
          <div className="bg__float"></div>
          <div className="bg__float"></div>
          <div className="bg__float"></div>
        </Container>
      </section>

      <section className="discover__catalogue">
        <Container>
          <Row className="flex justify-center">
            <h1>
              <i class="ri-shining-2-fill"></i>
            </h1>
          </Row>
          <Row className="flex justify-between">
            <Col className="flex flex-col">
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
