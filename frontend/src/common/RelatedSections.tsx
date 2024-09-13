import React, { useMemo } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "src/common/style/related-section.css";
// Component imports
import useFetch from "src/hooks/useFetch";
import { useViewportWidth } from "src/utils/imageUtils";
import { optimizeImage } from "src/utils/optimizeImage";
import { BASE_URL } from "src/utils/config";

// Types
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import {
  FetchBlogsType,
  FetchCountriesType,
  FetchDestinationType,
} from "src/types/FetchData";
import { HoverVariants } from "src/utils/variants";

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

// Helper functions
const isBlog = (data: any): data is Blog => data && data.category;
const isDestination = (data: any): data is Destination => data && data._id;
const isCountry = (data: any): data is Country => data && data.name;
const isContinent = (data: any): data is string => CONTINENTS.includes(data);

// Components
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
          <p className="p-regular mt-4">Nothing related at the moment.</p>
        </div>
      );
  }
};

const RelatedCountries: React.FC<{ country: Country }> = ({ country }) => {
  const viewportWidth = useViewportWidth();
  const {
    data: countriesData,
    error: countriesError,
    loading: countriesLoading,
  } = useFetch<FetchCountriesType>(
    `${BASE_URL}/countries?continent=${country.continent}`,
  );

  const relatedCountries = countriesData?.result.filter(
    (c) => c.name !== country.name,
  );

  if (countriesLoading) return null;
  if (countriesError) return null;
  if (!relatedCountries || relatedCountries.length === 0)
    return (
      <div className="">
        <p className="p-regular mt-4">
          There are no related countries at the moment.
        </p>
      </div>
    );

  return (
    <>
      {relatedCountries.length < 5 ? (
        <div className="related-countries min-w-screen flex min-h-[20svh] cursor-pointer flex-nowrap gap-2 pb-sect-short">
          {relatedCountries.map((country) => (
            <CountryCard
              key={country._id}
              country={country}
              viewportWidth={viewportWidth}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedCountries.map((country) => (
            <CountryCard
              key={country._id}
              country={country}
              viewportWidth={viewportWidth}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

const RelatedDestinations: React.FC<{ destination: Destination }> = ({
  destination,
}) => {
  const viewportWidth = useViewportWidth();
  const {
    data: destinationsData,
    error: destinationsError,
    loading: destinationsLoading,
  } = useFetch<FetchDestinationType>(`${BASE_URL}/destinations?limit=100`);

  const relatedDestinations = useMemo(() => {
    if (!destinationsData?.result) return [];
    return destinationsData.result.filter(
      (d) =>
        (d.continent === destination.continent ||
          d.tags.some((tag) => destination.tags.includes(tag))) &&
        d._id !== destination._id,
    );
  }, [destinationsData, destination]);

  if (destinationsLoading) return null;
  if (destinationsError) return null;
  if (!relatedDestinations || relatedDestinations.length === 0)
    return (
      <div className="px-sect grid place-items-center">
        <p className="p-regular mt-4">
          There are no related destinations at the moment.
        </p>
      </div>
    );

  return (
    <>
      {relatedDestinations.length < 5 ? (
        <div className="related-destinations min-w-screen flex min-h-[20svh] flex-nowrap gap-2 py-sect-short">
          {relatedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
              viewportWidth={viewportWidth}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedDestinations.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
              viewportWidth={viewportWidth}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

const RelatedArticles: React.FC<{
  data: Blog | Destination | Country | string;
}> = ({ data }) => {
  const viewportWidth = useViewportWidth();
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs?limit=100`);

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

  if (blogLoading) return null;
  if (blogError) return null;
  if (!relatedBlogs || relatedBlogs.length === 0)
    return <div>There are no related articles at the moment.</div>;

  return (
    <>
      {relatedBlogs.length < 5 ? (
        <div className="related-blogs min-w-screen pl-sect grid min-h-[20svh] gap-2 pb-sect-short lg:grid-cols-4 2xl:grid-cols-5">
          {relatedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              viewportWidth={viewportWidth}
            />
          ))}
        </div>
      ) : (
        <Slider {...settings}>
          {relatedBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              viewportWidth={viewportWidth}
            />
          ))}
        </Slider>
      )}
    </>
  );
};

// Card components
const CountryCard: React.FC<{ country: Country; viewportWidth: number }> = ({
  country,
  viewportWidth,
}) => {
  const imageProps = useMemo(() => {
    if (country.images.otherImages && country.images.otherImages.length > 0) {
      return optimizeImage(country.images.otherImages[0], {
        width: Math.min(viewportWidth, 1920),
        quality: 80,
        format: "auto",
      });
    }
    return { src: "", srcSet: "" };
  }, [country.images.otherImages, viewportWidth]);

  return (
    <Link
      to={`/discover/countries/${country._id}`}
      target="_top"
      className="relative block w-full rounded-lg bg-gradient-to-t from-background-dark to-transparent lg:h-[35svh] 2xl:h-[30svh]"
    >
      <motion.img
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
        {...imageProps}
        alt={country.name}
        className="cursor-hover absolute right-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
      />
      <p className="cursor-hover-small p-large pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
        {country.name}
      </p>
    </Link>
  );
};

const DestinationCard: React.FC<{
  destination: Destination;
  viewportWidth: number;
}> = ({ destination, viewportWidth }) => {
  const imageProps = useMemo(() => {
    if (destination.images && destination.images[0]) {
      return optimizeImage(destination.images[0], {
        width: Math.min(viewportWidth, 1920),
        quality: 80,
        format: "auto",
      });
    }
    return { src: "", srcSet: "" };
  }, [destination.images, viewportWidth]);

  return (
    <Link
      to={`/discover/destinations/${destination._id}`}
      target="_top"
      className="relative block w-full rounded-lg bg-gradient-to-t from-background-dark to-transparent lg:h-[35svh] 2xl:h-[30svh]"
    >
      <motion.img
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
        {...imageProps}
        alt={destination.name}
        className="absolute right-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
      />
      <p className="cursor-hover-small p-large pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
        {destination.name}
      </p>
    </Link>
  );
};

const BlogCard: React.FC<{ blog: Blog; viewportWidth: number }> = ({
  blog,
  viewportWidth,
}) => {
  const imageProps = useMemo(() => {
    if (blog.image) {
      return optimizeImage(blog.image, {
        width: Math.min(viewportWidth, 1920),
        quality: 80,
        format: "auto",
      });
    }
    return { src: "", srcSet: "" };
  }, [blog.image, viewportWidth]);

  return (
    <Link
      to={`/inspiration/${blog._id}`}
      target="_top"
      className="relative block w-full cursor-pointer rounded-lg border-background-light bg-gradient-to-t from-background-dark to-transparent lg:h-[35svh] 2xl:h-[30svh]"
      style={{
        backgroundImage: `url(${imageProps.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.img
        variants={variants}
        whileHover="hoverBrightness"
        transition={{ duration: 0.4 }}
        {...imageProps}
        alt={blog.title}
        className="cursor-hover absolute left-0 top-0 z-0 h-full w-full rounded-lg brightness-75"
      />
      <p className="cursor-hover-small p-large pointer-events-none absolute left-0 right-0 top-[40%] z-10 px-8 text-center font-prima text-text-dark">
        {blog.title}
      </p>
    </Link>
  );
};

export default RelatedSections;
