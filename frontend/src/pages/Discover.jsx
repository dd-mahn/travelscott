import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/discover.css";
import buttonSvg1 from "../assets/svg/discover-button1.svg";
import buttonSvg2 from "../assets/svg/discover-button2.svg";
import { BASE_URL } from "../utils/config";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import useFetch from "../hooks/useFetch";
import ImageComponent from "../utils/ImageComponent";

const Discover = () => {
  const types = [
    "Nature",
    "Relaxation",
    "Culture",
    "Adventure",
    "Urban",
    "Nostalgia",
  ];

  // const countries = [
  //   "Vietnam",
  //   "America",
  //   "France",
  //   "Japan",
  //   "Thailand",
  //   "Italy",
  //   "Spain",
  //   "Australia",
  //   "Greece",
  //   "Brazil",
  //   "India",
  //   "Canada",
  //   "Mexico",
  //   "Germany",
  //   "China",
  //   "Egypt",
  //   "South Africa",
  //   "Argentina",
  //   "New Zealand",
  // ];

  let filter = {
    type: [],
    country: "",
  };

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

  function filterByType(e) {
    const type = e.target.innerText;
    if (filter.type.includes(type)) {
      e.target.classList.remove("type__selected");
      filter.type = filter.type.filter((item) => item !== type);
    } else {
      e.target.classList.add("type__selected");
      filter.type.push(type);
    }
    console.log(filter);
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

    filter.country = isCountrySelected ? "" : country;
    console.log(filter);
  }

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data: destinationInfo,
    error,
    loading,
  } = useFetch(`${BASE_URL}/destinations?page=${page}`);
  const destinations = destinationInfo?.destinations || [];
  // console.log(destinations)

  const { data: destinationCount } = useFetch(`${BASE_URL}/destinations/count`);
  const count = destinationCount?.count || 0;
  // console.log(count)

  const {data: countriesInfo} = useFetch(`${BASE_URL}/destinations/countries`);
  const countries = countriesInfo?.countries || [];
  // console.log(countries)


  useEffect(() => {
    const pages = Math.ceil(count / 20);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, count]);


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
                  {types.map((type, index) => (
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
            <Col>
              {loading && <h4 className="text-center pt-5">Loading...</h4>}
              {error && <h4 className="text-center pt-5">{error}</h4>}

              {!loading  && !error && destinations.length === 0 && (
                <h4 className="text-center pt-5">No destinations found</h4>
              )}

              {!loading && !error && <ResponsiveMasonry columnsCountBreakPoints={{350:1, 768:3, 992:4}}>
                  <Masonry gutter='1rem'>             
                    {
                      destinations?.map((destination, index) => (
                        // <ImageComponent key={index} base64String={destination?.images[0] || ''} />
                        <img src="../assets/destination_images/moc-chau/ban-ang-pine-forest.jpg" key={index} alt="" style={{'width':'100%',
                        'display':'block', 'borderRadius':'20px'}} ></img>
                      ))
                    }
                  </Masonry>
                </ResponsiveMasonry>
              }

              <div className="pagination">
                {[...Array(pageCount).keys()].map((number) => (
                  <span
                    key={number}
                    onClick={() => setPage(number)}
                    className={page === number ? "active__page" : ""}
                  >
                    {number + 1}
                  </span>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Discover;
