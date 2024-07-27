import React from "react";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";
import "src/components/ui/style/search-result.css";
import { useNavigate } from "react-router-dom";

type SearchResultProps = {
  open: boolean;
  blogs: Blog[];
  countries: Country[];
  destinations: Destination[];
  closeFunc: () => void;
};

const SearchResult: React.FC<SearchResultProps> = ({
  open,
  blogs,
  countries,
  destinations,
  closeFunc,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${open ? "fixed top-20 z-50 lg:right-12 xl:right-16 2xl:right-20 3xl:right-24" : "hidden"} search-result flex h-0.5svh w-0.3svw flex-col overflow-y-scroll rounded-2xl bg-background-light px-8 pb-8 pt-4 shadow-component`}
    >
      <div className="sticky top-0 flex w-full justify-end">
        <button title="Close" onClick={closeFunc}>
          <i className="p-large ri-close-line"></i>
        </button>
      </div>
      {countries.length > 0 && (
        <div className="border-t border-gray pt-2">
          <p className="p-large mb-2 font-prima">Countries</p>
          <div className="grid gap-x-2 gap-y-4 lg:grid-cols-4">
            {countries.map((country) => (
              <div
                key={country._id}
                className="flex cursor-pointer flex-col items-center gap-2"
                onClick={() => navigate(`/discover/countries/${country._id}`)}
              >
                <img
                  src={country.images.flagImages?.[0]}
                  alt={country.name}
                  className="rounded-xl lg:h-16 2xl:h-20"
                />
                <span className="span-regular">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {destinations.length > 0 && (
        <div
          className={`${countries.length > 0 ? "mt-16" : ""} flex flex-col border-t border-gray pt-2`}
        >
          <p className="p-large mb-2 font-prima">Destinations</p>
          <div className="grid h-fit grid-cols-3 gap-x-2 gap-y-4">
            {destinations.map((destination) => (
              <div
                key={destination._id}
                className="flex flex-col items-center gap-2 rounded-xl cursor-pointer"
                onClick={() =>
                  navigate(`/discover/destinations/${destination._id}`)
                }
              >
                <img
                  src={destination.images?.[0]}
                  alt={destination.name}
                  className="h-full rounded-xl"
                />
                <span className="span-regular">{destination.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {blogs.length > 0 && (
        <div
          className={`${destinations.length > 0 || countries.length > 0 ? "mt-16" : ""} flex flex-col gap-4 border-t border-gray pt-2`}
        >
          <p className="p-large mb-2 font-prima">Articles</p>
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex gap-4 rounded-xl lg:h-24 2xl:h-32 cursor-pointer"
              onClick={() => navigate(`/inspiration/${blog._id}`)}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-1/3 rounded-xl"
              />
              <span className="span-regular mt-3 w-2/3">{blog.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
