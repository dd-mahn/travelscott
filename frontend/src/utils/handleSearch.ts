import React, { useCallback } from "react";
import Blog from "src/types/Blog";
import Country from "src/types/Country";
import Destination from "src/types/Destination";

// Helper function to filter destinations
const filterDestinations = (
  searchValue: string,
  destinations: Destination[],
) => {
  return destinations.filter(
    (destination) =>
      destination.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.continent.toLowerCase().includes(searchValue.toLowerCase()) ||
      destination.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase()),
      ),
  );
};

// Helper function to filter countries
const filterCountries = (searchValue: string, countries: Country[]) => {
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      country.continent.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

// Helper function to filter blogs
const filterBlogs = (searchValue: string, blogs: Blog[]) => {
  return blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase()),
      ),
  );
};

export const search = (
  searchValue: string,
  destinations: Destination[],
  countries: Country[],
  blogs: Blog[],
  setDestinationResults: React.Dispatch<React.SetStateAction<Destination[]>>,
  setCountryResults: React.Dispatch<React.SetStateAction<Country[]>>,
  setBlogResults: React.Dispatch<React.SetStateAction<Blog[]>>,
  setSearchResultOpen: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (searchValue && searchValue !== "") {
    const filteredDestinations = filterDestinations(searchValue, destinations);
    const filteredCountries = filterCountries(searchValue, countries);
    const filteredBlogs = filterBlogs(searchValue, blogs);

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