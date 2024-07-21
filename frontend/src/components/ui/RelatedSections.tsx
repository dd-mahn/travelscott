import React from "react";
import useFetch from "src/hooks/useFetch";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import { FetchBlogsType, FetchCountriesType, FetchDestinationType } from "src/types/FetchData";
import { BASE_URL } from "src/utils/config";

type RelatedSectionsProps = {
  type: string;
  data: Blog | Country | Destination | string;
};

const RelatedSections: React.FC<RelatedSectionsProps> = ({ type, data }) => {
  return type === "country" ? (
    <RelatedCountries country={data as Country} />
  ) : type === "destination" ? (
    <RelatedDestinations destination={data as Destination} />
  ) : (
    <RelatedArticles data={data} />
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
    <div className="min-w-screen flex flex-nowrap gap-0 py-sect-short">
      {relatedCountries.map((country) => (
        <div
          key={country.name}
          className="grid h-0.3svh w-0.2svw place-items-center bg-background-dark bg-opacity-20"
          style={{
            backgroundImage: `url(${country.images.otherImages?.[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="h3-md text-text-dark">{country.name}</h3>
        </div>
      ))}
    </div>
  );
};

const RelatedDestinations: React.FC<DestinationProps> = ({ destination }) => {
  const continent = destination.continent;
  const tags = destination.tags;

  const {
    data: destinationsData,
    error: destinationsError,
    loading: destinationsLoading,
  } = useFetch<FetchDestinationType>(
    `${BASE_URL}/destinations?limit=100`,
  );

  const continentRelatedDestinations = destinationsData?.result.filter(
    (d) => d.continent === continent,
  );

  const tagsRelatedDestinations = destinationsData?.result.filter(
    (d) => d._id !== destination._id && d.tags.some((tag) => tags.includes(tag)),
  );

  const relatedDestinations = [...(continentRelatedDestinations || []), ...(tagsRelatedDestinations || [])];

  if (destinationsLoading) return <div>Loading...</div>;
  if (destinationsError) return <div>Error: {destinationsError}</div>;
  if (!relatedDestinations || relatedDestinations.length === 0)
    return (
      <div className="px-sect">
        <p className="p-regular mt-4">
          There are no related destinations at the moment
        </p>
      </div>
    );
  return (
    <div className="min-w-screen flex flex-nowrap gap-0 py-sect-short">
      {relatedDestinations.map((destination) => (
        <div
          key={destination.name}
          className="grid h-0.3svh w-0.2svw place-items-center bg-background-dark bg-opacity-20"
          style={{
            backgroundImage: `url(${destination.images?.[0]}})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="h3-md text-text-dark">{destination.name}</h3>
        </div>
      ))}
    </div>
  );
};

const RelatedArticles: React.FC<BlogProps> = ({ data }) => {
  const continents = [
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "Oceania",
    "South America",
  ];
  // Improved type handling using type guards
  const isBlog = (data: any): data is Blog => data && data.category;
  const isDestination = (data: any): data is Destination => data && data._id;
  const isCountry = (data: any): data is Country => data && data.name;
  const isContinent = (data: any): data is string => continents.includes(data);
  // Fetch related blogs
  const {
    data: blogData,
    error: blogError,
    loading: blogLoading,
  } = useFetch<FetchBlogsType>(`${BASE_URL}/blogs/limit=100`);
  const blogs = blogData?.result;

  if (blogLoading) return <div>Loading...</div>;
  if (blogError) return <div>Error: {blogError}</div>;
  if (!blogs) {
    return (
      <div className="px-sect">
        <p className="p-regular mt-4">
          There are no related articles at the moment
        </p>
      </div>
    );
  }

  let relatedBlogs = blogs;

  if (isBlog(data)) {
    relatedBlogs = relatedBlogs.filter(
      (blog) => blog.category !== data.category,
    );
  }
  if (isDestination(data)) {
    relatedBlogs = relatedBlogs.filter(
      (blog) => blog.related_destination !== data._id,
    );
  }
  if (isCountry(data)) {
    relatedBlogs = relatedBlogs.filter((blog) => blog.tags.includes(data.name));
  }
  if(isContinent(data)) {
    relatedBlogs = relatedBlogs.filter((blog) => blog.tags.includes(data));
  }

  return (
    <div className="min-w-screen flex flex-nowrap gap-0 py-sect-short">
      {relatedBlogs.map((blog) => (
        <div
          key={blog.title}
          className="grid h-0.3svh w-0.2svw place-items-center bg-background-dark bg-opacity-20"
          style={{
            backgroundImage: `url(${blog.image}})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h3 className="h3-md text-text-dark">{blog.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default RelatedSections;
