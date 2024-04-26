import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import destination from "../assets/data/sampleDestination.json";
import "../styles/discover.css";
import buttonSvg1 from "../assets/svg/discover-button1.svg";
import buttonSvg2 from "../assets/svg/discover-button2.svg";

const Discover = () => {
  const types = [
    "Nature",
    "Relaxation",
    "Culture",
    "Adventure",
    "Urban",
    "Nostalgia",
  ];
  const countries = [
    "Vietnam",
    "America",
    "France",
    "Japan",
    "Thailand",
    "Italy",
    "Spain",
    "Australia",
    "Greece",
    "Brazil",
    "India",
    "Canada",
    "Mexico",
    "Germany",
    "China",
    "Egypt",
    "South Africa",
    "Argentina",
    "New Zealand",
  ];

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

  return (
    <div className="discover">
      <section className="discover__hero">
        <Container className="flex flex-col relative">
          <Row className="flex justify-end">
            <a href="/test" className="test__btn relative flex justify-center items-center cursor-pointer">
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
          <Row>
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
            <Col></Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Discover;
