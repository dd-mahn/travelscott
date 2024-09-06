import React, { memo, useCallback, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import {
  setDestinationContinents,
  setDestinationCountries,
  setDestinationTags,
  setDestinationSearchQuery,
  setBlogTags,
  setBlogSearchQuery,
} from "src/store/slices/filterSlice";

interface FullFilterBoardProps {
  continentNames: string[];
  countryNames: string[];
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  tapScale: {
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const FullFilterBoard: React.FC<FullFilterBoardProps> = ({
  continentNames,
  countryNames,
}) => {
  const dispatch = useDispatch();
  const { continents, countries, tags } = useSelector(
    (state: RootState) => state.filter.destination,
  );
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const predefinedTags = useMemo(
    () => [
      "Wilderness",
      "Culture&Heritage",
      "Food&Drink",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
    ],
    [],
  );

  const continentFilterClick = useCallback(
    (continent: string) => {
      dispatch(
        setDestinationContinents(
          continents.includes(continent)
            ? continents.filter((item: string) => item !== continent)
            : [...continents, continent],
        ),
      );
    },
    [continents, dispatch],
  );

  const countryFilterClick = useCallback(
    (country: string) => {
      dispatch(
        setDestinationCountries(
          countries.includes(country)
            ? countries.filter((item: string) => item !== country)
            : [...countries, country],
        ),
      );
    },
    [countries, dispatch],
  );

  const tagFilterClick = useCallback(
    (tag: string) => {
      dispatch(
        setDestinationTags(
          tags.includes(tag)
            ? tags.filter((item: string) => item !== tag)
            : [...tags, tag],
        ),
      );
    },
    [tags, dispatch],
  );

  const handleSearchClick = useCallback(() => {
    const value = inputRef.current?.value as string;
    dispatch(setDestinationSearchQuery(value));
  }, [dispatch]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearchClick();
      }
    },
    [handleSearchClick],
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      transition={{ duration: 0.3 }}
      key={"filter-board"}
      className={`filter-board absolute right-[5%] top-2/3 z-10 flex flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-20 pt-4 shadow-section lg:w-[40svw] 2xl:w-[30svw]`}
    >
      <div className="flex w-full flex-row items-end gap-4">
        <div
          className={`${inputFocus ? "border-text-light shadow-lg" : "border-gray border-opacity-50"} flex h-fit items-center justify-between rounded-2xl px-2 py-1 transition-all duration-300 lg:border-[1.5px] 2xl:border-[2px]`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="span-small w-4/5 bg-transparent outline-none"
            onClick={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            onKeyDown={handleKeyDown}
          />
          <motion.button
            whileHover="hoverScale"
            variants={variants}
            whileTap="tapScale"
            transition={{ duration: 0.3 }}
            title="search"
            className="outline-none transition-none"
            onClick={handleSearchClick}
          >
            <i className="ri-search-line span-regular"></i>
          </motion.button>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <span className="span-medium font-prima uppercase">Location</span>
        <div className="flex flex-wrap gap-2">
          {continentNames.map((continent) => (
            <motion.button
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.3 }}
              whileTap="tapScale"
              key={continent}
              className={`${continents.includes(continent) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4`}
              onClick={() => continentFilterClick(continent)}
            >
              {continent}
            </motion.button>
          ))}
          {countryNames.map((country) => (
            <motion.button
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.3 }}
              whileTap="tapScale"
              key={country}
              className={`${countries.includes(country) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4`}
              onClick={() => countryFilterClick(country)}
            >
              {country}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <span className="span-medium font-prima uppercase">Tags</span>
        <div className="flex flex-wrap gap-2">
          {predefinedTags.map((tag) => (
            <motion.button
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.3 }}
              whileTap="tapScale"
              key={tag}
              className={`${tags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4`}
              onClick={() => tagFilterClick(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(FullFilterBoard);

export const ContinentFilter: React.FC<{ continentNames: string[] }> =
  React.memo(({ continentNames }) => {
    const dispatch = useDispatch();
    const { tags } = useSelector((state: RootState) => state.filter.blog);
    const { searchQuery } = useSelector(
      (state: RootState) => state.filter.blog,
    );
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectBlogFilterState = useCallback((state: RootState) => ({
      tags: state.filter.blog.tags,
      searchQuery: state.filter.blog.searchQuery
    }), []);
    const { tags: selectTags, searchQuery: selectSearchQuery } = useSelector(selectBlogFilterState);

    const handleContinentFilter = useCallback((continent: string) => {
      dispatch(setBlogTags(
        selectTags.includes(continent)
          ? selectTags.filter((c: string) => c !== continent)
          : [...selectTags, continent]
      ));
    }, [selectTags, dispatch]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setBlogSearchQuery(e.target.value));
    }, [dispatch]);

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{
          duration: 0.5,
          delay: 0.5,
          staggerChildren: 0.2,
          delayChildren: 0.5,
        }}
        className="continent-filter flex flex-row flex-wrap items-center justify-center shadow-component lg:gap-3 lg:rounded-2xl lg:px-12 lg:py-6 2xl:gap-4 2xl:rounded-3xl 2xl:px-sect-short 2xl:py-8"
      >
        {continentNames.map((continent) => (
          <motion.button
            variants={variants}
            key={continent}
            onClick={() => handleContinentFilter(continent)}
            whileHover="hoverScale"
            whileTap="tapScale"
            transition={{ duration: 0.3 }}
            className={`continent-btn span-regular rounded-3xl border border-gray lg:border-[1.5px] lg:px-6 lg:py-1 2xl:border-[2px] 2xl:px-8 2xl:py-2 ${
              selectTags.includes(continent)
                ? "bg-background-dark text-text-dark"
                : "bg-transparent text-text-light"
            }`}
          >
            {continent}
          </motion.button>
        ))}
        <motion.div variants={variants} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={selectSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className={`w-full rounded-full border border-gray bg-background-light text-text-light transition-all duration-300 focus:outline-none lg:border-[1.5px] lg:px-3 lg:py-1 2xl:border-[2px] 2xl:px-4 2xl:py-2 ${
              inputFocus ? "border-text-light shadow-lg" : ""
            }`}
          />
          <i
            className={`ri-search-line cursor-hover-small span-regular absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-text-light transition-all duration-300`}
          ></i>
        </motion.div>
      </motion.div>
    );
  });
