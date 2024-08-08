import React, { useCallback } from "react";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";

export const search = (
  searchRef: React.RefObject<HTMLInputElement>,
  destinations: Destination[],
  countries: Country[],
  blogs: Blog[],
  setDestinationResults: React.Dispatch<React.SetStateAction<Destination[]>>,
  setCountryResults: React.Dispatch<React.SetStateAction<Country[]>>,
  setBlogResults: React.Dispatch<React.SetStateAction<Blog[]>>,
  setSearchResultOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const searchValue = searchRef.current?.value;
  if (searchValue && searchValue !== "") {
    const filteredDestinations = destinations.filter(
      (destination) =>
        destination.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        destination.country.toLowerCase().includes(searchValue.toLowerCase()) ||
        destination.continent
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        destination.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );
    const filteredCountries = countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        country.continent.toLowerCase().includes(searchValue.toLowerCase()),
    );
    const filteredBlogs = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchValue.toLowerCase()),
        ),
    );

    if (
      filteredDestinations.length > 0 ||
      filteredCountries.length > 0 ||
      filteredBlogs.length > 0
    ) {
      setDestinationResults(filteredDestinations);
      setCountryResults(filteredCountries);
      setBlogResults(filteredBlogs);
      setSearchResultOpen(true);
    }
  }
};
