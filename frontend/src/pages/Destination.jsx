import React from "react";
import useFetch from "../hooks/useFetch";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import Slider from "react-slick";
import "../styles/destination.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Destination() {
  const { id } = useParams();

  const {
    data: destination,
    error,
    loading,
  } = useFetch(`${BASE_URL}/destinations/${id}`);

  const {
    name,
    video,
    images,
    country,
    location,
    description,
    places,
    transportation,
    types,
    reviews,
    summary,
  } = destination;

  let typesString = types?.join(", ");

  const videoUrl = `https://www.youtube.com/embed/${video}?autoplay=1&mute=1&loop=1`;

  const settings = {
    dots: true, 
    infinite: true, 
    speed: 2000, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    pauseOnHover: false, 
    adaptiveHeight: true,
    arrows: false,
    fade: true,
    cssEase: "linear",
  };

  const settingsPlaces = {
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    adaptiveHeight: true,
    
  };

  return (
    <>
      <section className="destination__overview">
        <Container>
          <Row className="flex justify-center">
            <Col className="flex flex-col items-start">
              <span>{country}</span>
              <h1>{name}</h1>
            </Col>
            {/* <Col>
              <span>{country}</span>
            </Col> */}
          </Row>
          <Row className="flex justify-betwee">
            <Col>
              <span>
                {" "}
                <i class="ri-bard-fill"></i> {typesString}
              </span>
              <span>
                {" "}
                <i class="ri-map-pin-fill"></i> {location}
              </span>
              <p>{description}</p>
            </Col>
            <Col>
              <Slider {...settings} className="destination__carousel ">
                {images?.map((image, index) => (
                  // <div className="carousel__image">
                  <img key={index} src={image} alt={name} />
                  // </div>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="destination__video">
        <iframe
          width="100%"
          height="100%"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          src={videoUrl}
        ></iframe>
      </section>
      <section className="destination__transportation">
        <Container className="flex flex-col">
          <Row>
            <h1 className="flex text-light-gradient">
              <i class="ri-bus-fill"></i>
              Transportation
            </h1>
          </Row>
          <Row className="flex justify-between">
            <Col>
              <p>{transportation?.overview}</p>
            </Col>
            <Col>
              {transportation?.types.map((type, index) => (
                <div
                  key={index}
                  className="transportation__option flex flex-col"
                >
                  <div className="flex justify-between">
                    <button>{type.name}</button>
                    <i class="ri-checkbox-blank-circle-line d-off"></i>
                    <i class="ri-checkbox-blank-circle-fill"></i>
                  </div>
                  <div className="">
                    <div className="flex">
                      <i class="ri-information-line"></i>
                      <div className="flex flex-col">
                        <p>{type.description}</p>
                        <ul>
                          {type?.options.map((option, index) => (
                            <li key={index}>
                              <strong>{option.name}</strong>
                              {option.description
                                ? ": " + option.description
                                : ""}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex">
                      <i class="ri-price-tag-3-line"></i>
                      <span>
                        {type.price_range.currency !== ""
                          ? type.price_range.currency + " "
                          : ""}
                        {type.price_range.range !== ""
                          ? type.price_range.range + "/ passenger"
                          : "Depend on you"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>
      <section className="destination__places">
        <Container className="flex flex-col">
          <Row>
            <h1 className="flex text-light-gradient">
              <i class="ri-map-pin-3-fill"></i> Places
            </h1>
          </Row>
          <Row className="flex flex-col places__category">
            <div className="flex justify-between items-baseline">
              <h1>
                <i className="ri-arrow-right-line"></i> To stay
              </h1>
              <p>
                {" "}
                (Selected based on the best balance between factors: Price,
                Distance, Quality, and Ratings)
              </p>
            </div>
            <div>
              <Slider {...settingsPlaces}>
                {places?.to_stay.map((place, index) => (
                  <div key={index} className="places flex flex-col">
                    <img src={place.image_url} alt="place_img" />
                    <span>{place.name}</span>
                  </div>
                ))}
              </Slider>
            </div>
            {/* <button>See All</button> */}
          </Row>
          <Row className="flex flex-col places__category">
            <div className="flex justify-between items-baseline">
              <h1>
                <i className="ri-arrow-right-line"></i> To visit
              </h1>
              <p>(The most popular places that worth visiting)</p>
            </div>
            <div>
              <Slider {...settingsPlaces}>
                {places?.to_visit.map((place, index) => (
                  <div key={index} className="places flex flex-col">
                    <img src={place.image_url} alt="place_img" />
                    <span>{place.name}</span>
                  </div>
                ))}
              </Slider>
            </div>
            {/* <button>See All</button> */}
          </Row>
          <Row className="flex flex-col places__category">
            <div className="flex justify-between items-baseline">
              <h1>
                <i className="ri-arrow-right-line"></i> To eat
              </h1>
              <p>
                {" "}
                (Don’t forget to feed yourself with good local dishes, served by
                these good restaurants)
              </p>
            </div>
            <div>
              <Slider {...settingsPlaces}>
                {places?.to_eat.map((place, index) => (
                  <div key={index} className="places flex flex-col">
                    <img src={place.image_url} alt="place_img" />
                    <span>{place.name}</span>
                  </div>
                ))}
              </Slider>
            </div>
          </Row>
        </Container>
      </section>
      <section className="destination__insight">
        <Container className="flex flex-col">
          <Row>
            <h1 className="flex text-light-gradient">
              <i class="ri-eye-fill"></i> Insight
            </h1>
          </Row>
          <Row className="flex justify-between">
            <Col>
              <div className="insight__blogs insight__category flex flex-col">
                <span className="flex"><i class="ri-quill-pen-line"></i> Blogs</span>
                <div className="flex flex-col">
                  {reviews?.blogs?.map((blog, index) => (
                    <a href={blog.link} key={index} className="underline__btn">
                      {blog.name}{" "} <i class="ri-arrow-right-up-line"></i>
                    </a>
                  ))}
                </div>
              </div>
              <div className="insight__videos insight__category flex flex-col">
                <span className="flex"><i class="ri-movie-line"></i> Videos</span>
                <div className="flex flex-col">
                  {reviews?.videos?.map((video, index) => (
                    <a href={video.link} key={index} className="underline__btn">
                      {video.name} <i class="ri-arrow-right-up-line"></i>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
            <Col>
              <p>
                Travel blogs and vlogs are great for trip planning. They give
                real experiences about places, food, and culture. They also show
                pictures and videos of the places. This helps travelers know
                what to expect and plan better.
              </p>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="destination__summary">
        <Container className="flex flex-col">
          <Row>
            <h1 className="flex text-light-gradient">
              <i class="ri-shining-2-fill"></i>
              Summary
            </h1>
          </Row>
          <Row className="flex justify-center items-center">
            <p>{summary}</p>
          </Row>
          <Row className="flex justify-end">
            <span>Have a good trip!</span>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Destination;
