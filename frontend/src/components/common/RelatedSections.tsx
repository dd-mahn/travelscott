import React from "react";
import Slider from "react-slick";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import {
  FetchBlogsType,
  FetchCountriesType,
  FetchDestinationType,
} from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";
import { Link } from "react-router-dom";

// Slider settings
const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 4000,
  autoplaySpeed: 4000,
  slidesToShow: 5,
  cssEase: "linear",
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1536,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
  ],
};

// Related sections types
type RelatedSectionsProps = {
  type: string;
  data: Blog | Country | Destination | string;
};

// Related sections component
const RelatedSections: React.FC<RelatedSectionsProps> = ({ type, data }) => {
  return type === "country" ? (
    <RelatedCountries country={data as Country} />
  ) : type === "destination" ? (
    <RelatedDestinations destination={data as Destination} />
  ) : type === "blog" ? (
    <RelatedArticles data={data} />
  ) : (
    <p>No related</p>
  );
};

// Corrected prop types for each component
type CountryProps = {
  country: Country;
};

type DestinationProps = {
  destination: Destination;
};

type BlogProps = {
  data: Blog | Destination | Country | string;
};

// Related countries component
const RelatedCountries: React.FC<CountryProps> = ({ country }) => {
  const continent = country.continent;

  const {
    data: countriesData,
    error: countriesError,
    loading: countriesLoading,
  } = useFetch<FetchCountriesType>(
    `${BASE_URL}/countries?continent=${continent}`,
  );

  const relatedCountries = countriesData?.result.filter(
    (c) => c.name !== country.name,
  );

  if (countriesLoading) return <div>Loading...</div>;
  if (countriesError) return <div>Error: {countriesError}</div>;
  if (!relatedCountries || relatedCountries.length === 0)
    return (
      <div className="px-sect">
        <p className="p-regular mt-4">
          There are no related countries at the moment
        </p>
      </div>
    );

  return (
    <>
      {relatedCountries.length < 5 && (
        <div className="related-countries min-w-screen flex cursor-pointer flex-nowrap gap-2 py-sect-short">
          {relatedCountries.map((country) => (
            <Link
              to={`/discover/countries/${country._id}`}
              target="_top"
              key={country.name}
              className="relative w-[20svw] lg:h-[35svh] 2xl:h-[30svh]"
            >
              <img
                src={country.images.otherImages?.[0]}
                alt={country.name}
                className="absolute right-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {country.name}
              </p>
            </Link>
          ))}
        </div>
      )}
      {relatedCountries.length >= 5 && (
        <Slider {...settings}>
          {relatedCountries.map((country) => (
            <Link
              to={`/discover/countries/${country._id}`}
              target="_top"
              key={country.name}
              className="relative w-[20svw] cursor-pointer lg:h-[35svh] 2xl:h-[30svh]"
            >
              <img
                src={country.images.otherImages?.[0]}
                alt={country.name}
                className="absolute right-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {country.name}
              </p>
            </Link>
          ))}
        </Slider>
      )}
    </>
  );
};

// Related destinations component
const RelatedDestinations: React.FC<DestinationProps> = ({ destination }) => {
  const continent = destination.continent;
  const tags = destination.tags;

  const {
    data: destinationsData,
    error: destinationsError,
    loading: destinationsLoading,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?limit=100`);

  const continentRelatedDestinations = destinationsData?.result.filter(
    (d) => d.continent === continent && d._id !== destination._id,
  );

  const tagsRelatedDestinations = destinationsData?.result.filter(
    (d) =>
      d._id !== destination._id && d.tags.some((tag) => tags.includes(tag)),
  );

  const relatedDestinations = [
    ...(continentRelatedDestinations || []),
    ...(tagsRelatedDestinations || []),
  ];

  if (destinationsLoading) return <div>Loading...</div>;
  if (destinationsError) return <div>Error: {destinationsError}</div>;
  if (!relatedDestinations || relatedDestinations.length === 0)
    return (
      <div className="px-sect grid place-items-center">
        <p className="p-regular mt-4">
          There are no related destinations at the moment
        </p>
      </div>
    );
  return (
    <>
      {relatedDestinations.length < 5 && (
        <div className="related-destinations min-w-screen flex flex-nowrap gap-2 py-sect-short">
          {relatedDestinations.map((destination) => (
            <Link
              to={`/discover/destinations/${destination._id}`}
              target="_top"
              key={destination.name}
              className="relative w-[20svw] lg:h-[35svh] 2xl:h-[30svh]"
            >
              <img
                src={destination.images?.[0]}
                alt={destination.name}
                className="absolute right-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {destination.name}
              </p>
            </Link>
          ))}
        </div>
      )}

      {relatedDestinations.length >= 5 && (
        <Slider {...settings}>
          {relatedDestinations.map((destination) => (
            <Link
              to={`/discover/destinations/${destination._id}`}
              target="_top"
              key={destination.name}
              className="relative w-[20svw] lg:h-[35svh] 2xl:h-[30svh]"
            >
              <img
                src={destination.images?.[0]}
                alt={destination.name}
                className="absolute right-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {destination.name}
              </p>
            </Link>
          ))}
        </Slider>
      )}
    </>
  );
};

// Related articles component
const RelatedArticles: React.FC<BlogProps> = ({ data }) => {
  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ];
  // Fetch related blogs
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=100`);
  const blogs = blogData?.result;

  // Handle type checking
  const isBlog = (data: any): data is Blog => data && data.category;
  const isDestination = (data: any): data is Destination => data && data._id;
  const isCountry = (data: any): data is Country => data && data.name;
  const isContinent = (data: any): data is string => continents.includes(data);

  const checkDataType = (data: any): string => {
    if (isBlog(data)) return "Blog";
    if (isDestination(data)) return "Destination";
    if (isCountry(data)) return "Country";
    if (isContinent(data)) return "Continent";
    return "Unknown";
  };

  // Render logic
  if (blogLoading) return <div>Loading...</div>;
  if (blogError) return <div>Error: {blogError}</div>;
  if (!blogs) {
    return (
      <div className="">
        <p className="p-regular mt-4">
          There are no related articles at the moment
        </p>
      </div>
    );
  }

  // Handle cases for rendering
  let relatedBlogs = blogs;

  if (isBlog(data) && checkDataType(data) === "Blog") {
    relatedBlogs = relatedBlogs.filter(
      (blog) =>
        blog._id !== data._id &&
        (blog.category === data.category ||
          data.tags.some((tag) => blog.tags.includes(tag))),
    );
  }
  if (isDestination(data) && checkDataType(data) === "Destination") {
    relatedBlogs = relatedBlogs.filter(
      (blog) => blog.related_destination === data._id,
    );
  }
  if (isCountry(data) && checkDataType(data) === "Country") {
    relatedBlogs = relatedBlogs.filter((blog) => blog.tags.includes(data.name));
  }
  if (isContinent(data) && checkDataType(data) === "Continent") {
    relatedBlogs = relatedBlogs.filter((blog) => blog.tags.includes(data));
  }

  if (relatedBlogs.length === 0) {
    return (
      <div className="">
        <p className="p-regular mt-4">
          There are no related articles at the moment
        </p>
      </div>
    );
  }

  return (
    <>
      {relatedBlogs.length < 5 && (
        <div className="related-blogs flex min-w-full flex-nowrap gap-2 py-sect-short">
          {relatedBlogs.map((blog) => (
            <Link
              to={`/inspiration/${blog._id}`}
              target="_top"
              key={blog.title}
              className="relative w-[20svw] cursor-pointer border-background-light lg:h-[35svh] 2xl:h-[30svh]"
              style={{
                backgroundImage: `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="absolute left-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {blog.title}
              </p>
            </Link>
          ))}
        </div>
      )}
      {relatedBlogs.length >= 5 && (
        <Slider {...settings}>
          {relatedBlogs.map((blog) => (
            <Link
              to={`/inspiration/${blog._id}`}
              target="_top"
              key={blog.title}
              className="relative cursor-pointer border-r-8 border-background-light lg:h-[35svh] 2xl:h-[30svh] 2xl:w-[20svw]"
              style={{
                backgroundImage: `url(${blog.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="absolute left-0 top-0 z-0 h-full w-full brightness-75 transition-all duration-300 hover:brightness-50"
              />
              <p className="p-large absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
                {blog.title}
              </p>
            </Link>
          ))}
        </Slider>
      )}
    </>
  );
};

export default RelatedSections;
