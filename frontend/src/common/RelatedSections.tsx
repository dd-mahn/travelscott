import React, { useMemo } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "src/common/style/related-section.css";

// Component imports
import useFetch from "src/hooks/useFetch";
import { useViewportWidth } from "src/utils/imageUtils";
import config from "src/config/config";
import OptimizedImage from "src/common/OptimizedImage";

// Types
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import {
  FetchBlogsType,
  FetchCountriesType,
  FetchDestinationType,
} from "src/types/FetchData";
import { HoverVariants } from "src/utils/constants/variants";

// Constants
const CONTINENTS = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Oceania",
  "South America",
];

// Framer motion variants
const variants = {
  hoverBrightness: HoverVariants.hoverBrightness,
};

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
      breakpoint: 756,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
        infinite: true,
        dots: false,
      },
    },
  ],
};

// Helper functions
const isBlog = (data: any): data is Blog => data && data.category;
const isDestination = (data: any): data is Destination => data && data._id;
const isCountry = (data: any): data is Country => data && data.name;
const isContinent = (data: any): data is string => CONTINENTS.includes(data);

// Main component
const RelatedSections: React.FC<{
  type: string;
  data: Blog | Country | Destination | string;
}> = ({ type, data }) => {
  switch (type) {
    case "country":
      return <RelatedCountries country={data as Country} />;
    case "destination":
      return <RelatedDestinations destination={data as Destination} />;
    case "blog":
      return <RelatedArticles data={data} />;
    default:
      return (
        <div className="px-sect w-full">
          <p className="h3-md mt-4">Nothing related at the moment.</p>
        </div>
      );
  }
};

// RelatedCountries component
const RelatedCountries: React.FC<{ country: Country }> = ({ country }) => {
  const {
    data: countriesData,
    error: countriesError,
    loading: countriesLoading,
  } = useFetch<FetchCountriesType>(
    `${config.api.baseUrl}/countries?continent=${country.continent}`,
  );

  // Filter out the current country from the related countries
  const relatedCountries = useMemo(() => {
    if (!countriesData?.result) return [];
    return countriesData.result.filter((c) => c.name !== country.name);
  }, [countriesData, country.name]);

  if (countriesLoading || countriesError || !relatedCountries || relatedCountries.length === 0) {
    return (
      <div className="">
        <p className="h3-md mt-4">
          There are no related countries at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      {relatedCountries.length < 6 ? (
        <div className="related-countries px-sect grid min-h-[20svh] w-screen gap-2 pb-12 md:pb-sect-short grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {relatedCountries.map((country) => (
            <CountryCard
              key={country._id}
              country={country}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedCountries.map((country) => (
            <CountryCard
              key={country._id}
              country={country}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

// RelatedDestinations component
const RelatedDestinations: React.FC<{ destination: Destination }> = ({
  destination,
}) => {
  const {
    data: destinationsData,
    error: destinationsError,
    loading: destinationsLoading,
  } = useFetch<FetchDestinationType>(`${config.api.baseUrl}/destinations?limit=100`);

  // Filter out the current destination from the related destinations
  const relatedDestinations = useMemo(() => {
    if (!destinationsData?.result) return [];
    return destinationsData.result.filter(
      (d) =>
        (d.continent === destination.continent ||
          d.tags.some((tag) => destination.tags.includes(tag))) &&
        d._id !== destination._id,
    );
  }, [destinationsData, destination]);

  if (destinationsLoading || destinationsError || !relatedDestinations || relatedDestinations.length === 0) {
    return (
      <div className="px-sect grid place-items-center">
        <p className="h3-md mt-4">
          There are no related destinations at the moment.
        </p>
      </div>
    );
  }

  return (
    <>
      {relatedDestinations.length < 5 ? (
        <div className="related-destinations px-sect grid min-h-[20svh] w-screen gap-2 pb-12 md:pb-sect-short grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {relatedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

// RelatedArticles component
const RelatedArticles: React.FC<{
  data: Blog | Destination | Country | string;
}> = ({ data }) => {
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
  } = useFetch<FetchBlogsType>(`${config.api.baseUrl}/blogs?limit=100`);

  // Filter related blogs based on the type of data
  const relatedBlogs = useMemo(() => {
    if (!blogData?.result) return [];
    let filtered = blogData.result;

    if (isBlog(data)) {
      filtered = filtered.filter(
        (blog) =>
          blog._id !== data._id &&
          (blog.category === data.category ||
            data.tags.some((tag) => blog.tags.includes(tag))),
      );
    } else if (isDestination(data)) {
      filtered = filtered.filter(
        (blog) => blog.related_destination === data._id,
      );
    } else if (isCountry(data)) {
      filtered = filtered.filter((blog) => blog.tags.includes(data.name));
    } else if (isContinent(data)) {
      filtered = filtered.filter((blog) => blog.tags.includes(data));
    }

    return filtered;
  }, [blogData, data]);

  if (blogLoading || blogError || !relatedBlogs || relatedBlogs.length === 0) {
    return <div className="mt-4 h3-md">There are no related articles at the moment.</div>;
  }

  return (
    <>
      {relatedBlogs.length < 5 ? (
        <div className="related-blogs px-sect grid min-h-[20svh] w-screen gap-2 pb-12 md:pb-sect-short grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {relatedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

// Card components
const CountryCard: React.FC<{ country: Country }> = ({ country }) => {
  const imageSrc = country.images.otherImages && country.images.otherImages.length > 0 ? country.images.otherImages[0] : "";

  return (
    <Link
      to={`/discover/countries/${country._id}`}
      target="_top"
      className="relative block w-full cursor-hover cursor-pointer rounded-lg bg-gradient-to-t from-blue-gray-900 to-gray h-[25svh] md:h-[30svh] lg:h-[35svh] 2xl:h-[30svh]"
    >
      <OptimizedImage
        src={imageSrc}
        alt={country.name}
        className="cursor-hover absolute right-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
      />
      <p className="cursor-hover-small h3-md pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
        {country.name}
      </p>
    </Link>
  );
};

const DestinationCard: React.FC<{
  destination: Destination;
}> = ({ destination }) => {
  const imageSrc = destination.images && destination.images[0] ? destination.images[0] : "";

  return (
    <Link
      to={`/discover/destinations/${destination._id}`}
      target="_top"
      className="relative block w-full cursor-hover cursor-pointer rounded-lg bg-gradient-to-t from-blue-gray-900 to-gray h-[25svh] md:h-[30svh] lg:h-[35svh] 2xl:h-[30svh]"
    >
      <OptimizedImage
        src={imageSrc}
        alt={destination.name}
        className="absolute right-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
      />
      <p className="cursor-hover-small h3-md pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
        {destination.name}
      </p>
    </Link>
  );
};

const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
  const viewportWidth = useViewportWidth();
  const imageSrc = blog.image ? blog.image : "";

  return (
    <Link
      to={`/inspiration/${blog._id}`}
      target="_top"
      className="relative block w-full cursor-hover cursor-pointer rounded-lg border-background-light bg-gradient-to-t from-blue-gray-900 to-gray h-[25svh] md:h-[30svh] lg:h-[35svh] 2xl:h-[30svh]"
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <OptimizedImage
        src={imageSrc}
        alt={blog.title}
        className="cursor-hover absolute left-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
      />
      <p className={`cursor-hover-small ${viewportWidth < 768 ? "h3-md" : "p-large"} pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark`}>
        {blog.title}
      </p>
    </Link>
  );
};

export default RelatedSections;
