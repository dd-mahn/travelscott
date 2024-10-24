import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
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
import useDebounce from "src/hooks/useDebounce/useDebounce";
import {
  HoverVariants,
  TapVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { createSelector } from "reselect";

// Define motion variants
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  tapScale: TapVariants.tapScale,
};

// Selectors
const selectDestinationFilterState = createSelector(
  (state: RootState) => state.filter.destination,
  (destination) => ({
    continents: destination.continents,
    countries: destination.countries,
    tags: destination.tags,
    searchQuery: destination.searchQuery,
  }),
);

const selectCountryState = createSelector(
  (state: RootState) => state.country,
  (country) => country.countries,
);

const selectContinentState = createSelector(
  (state: RootState) => state.continent,
  (continent) => continent.continents,
);

// DestinationFilter Component
export const DestinationFilter: React.FC = memo(() => {
  const dispatch = useDispatch();
  const {
    continents: filterContinents,
    countries: filterCountries,
    tags: filterTags,
    searchQuery,
  } = useSelector(selectDestinationFilterState);
  const countries = useSelector(selectCountryState);
  const continents = useSelector(selectContinentState);
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

  // Memoized values
  const countryNames = useMemo(
    () => countries.map((country) => country.name),
    [countries],
  );

  const continentNames = useMemo(
    () => continents.map((continent) => continent.name),
    [continents],
  );

  const predefinedTags = useMemo(
    () => [
      "Wilderness",
      "Culture&Heritage",
      "FoodLovers",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
    ],
    [],
  );

  // Handlers
  const continentFilterClick = useCallback(
    (continent: string) => {
      dispatch(
        setDestinationContinents(
          filterContinents.includes(continent)
            ? filterContinents.filter((item: string) => item !== continent)
            : [...filterContinents, continent],
        ),
      );
    },
    [filterContinents, dispatch],
  );

  const countryFilterClick = useCallback(
    (country: string) => {
      dispatch(
        setDestinationCountries(
          filterCountries.includes(country)
            ? filterCountries.filter((item: string) => item !== country)
            : [...filterCountries, country],
        ),
      );
    },
    [filterCountries, dispatch],
  );

  const tagFilterClick = useCallback(
    (tag: string) => {
      dispatch(
        setDestinationTags(
          filterTags.includes(tag)
            ? filterTags.filter((item: string) => item !== tag)
            : [...filterTags, tag],
        ),
      );
    },
    [filterTags, dispatch],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    [],
  );

  useEffect(() => {
    dispatch(setDestinationSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  return (
    <motion.div
      initial="hiddenY"
      whileInView="visible"
      variants={variants}
      viewport={{ once: true }}
      exit="hiddenY"
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`filter-board absolute right-[5%] top-2/3 z-10 flex w-[80svw] flex-col items-center gap-8 rounded-2xl bg-background-light px-4 pb-10 pt-6 shadow-section dark:bg-background-dark dark:shadow-section-dark sm:w-[60svw] md:w-[50svw] lg:w-[40svw] 2xl:w-[30svw]`}
    >
      <div className="flex w-full flex-col items-start gap-2">
        <span className="p-large font-prima uppercase">Search</span>
        <div className="relative flex w-full items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search destinations..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className="w-full rounded-full border-[1px] border-gray bg-background-light px-3 py-1 text-text-light outline-none transition-all duration-300 focus:border-text-light focus:shadow-lg dark:bg-background-dark dark:focus:border-text-dark lg:px-4 lg:py-2"
          />
          <div className="absolute right-[5%] overflow-hidden">
            <motion.i
              variants={variants}
              animate={inputFocus ? "visible" : "hiddenY"}
              className="cursor-hover-small ri-search-line cursor-pointer text-text-light"
            ></motion.i>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <span className="p-large font-prima uppercase">Location filter</span>
        <div className="flex flex-wrap gap-2">
          {continentNames.map((continent) => (
            <motion.button
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.3 }}
              whileTap="tapScale"
              key={continent}
              className={`${filterContinents.includes(continent) ? "bg-background-dark text-text-dark dark:bg-background-light dark:text-text-light" : "bg-background-light text-text-light dark:bg-background-dark"} span-small cursor-pointer rounded-2xl border border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
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
              className={`${filterCountries.includes(country) ? "bg-background-dark text-text-dark dark:bg-background-light dark:text-text-light" : "bg-background-light text-text-light dark:bg-background-dark"} span-small cursor-pointer rounded-2xl border border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
              onClick={() => countryFilterClick(country)}
            >
              {country}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <span className="p-large font-prima uppercase">Tag filter</span>
        <div className="flex flex-wrap gap-2">
          {predefinedTags.map((tag) => (
            <motion.button
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.3 }}
              whileTap="tapScale"
              key={tag}
              className={`${filterTags.includes(tag) ? "bg-background-dark text-text-dark dark:bg-background-light dark:text-text-light" : "bg-background-light text-text-light dark:bg-background-dark"} span-small cursor-pointer rounded-2xl border border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
              onClick={() => tagFilterClick(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

// Selectors for CountryDestinationFilter
const selectCountryDestinationFilterState = createSelector(
  (state: RootState) => state.filter.destination,
  (destination) => ({
    tags: destination.tags,
    searchQuery: destination.searchQuery,
  }),
);

// CountryDestinationFilter Component
export const CountryDestinationFilter: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { tags: selectTags, searchQuery: selectSearchQuery } = useSelector(
    selectCountryDestinationFilterState,
  );
  const [localSearchQuery, setLocalSearchQuery] = useState(selectSearchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

  const predefinedTags = useMemo(
    () => [
      "Wilderness",
      "Culture&Heritage",
      "FoodLovers",
      "SoloJourneys",
      "CityScape",
      "Season&Festival",
      "Relaxation",
    ],
    [],
  );

  // Handlers
  const handleTagFilter = useCallback(
    (tag: string) => {
      dispatch(
        setDestinationTags(
          selectTags.includes(tag)
            ? selectTags.filter((t: string) => t !== tag)
            : [...selectTags, tag],
        ),
      );
    },
    [selectTags, dispatch],
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalSearchQuery(e.target.value);
    },
    [],
  );

  useEffect(() => {
    dispatch(setDestinationSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  return (
    <motion.div
      initial="hiddenY"
      animate="visible"
      exit="hiddenY"
      variants={variants}
      transition={{ duration: 0.3 }}
      className="filter-board absolute right-[5%] top-2/3 z-10 flex w-[80svw] flex-col items-center gap-8 rounded-xl bg-background-light px-4 pb-8 pt-4 shadow-component dark:bg-background-dark dark:shadow-component-dark md:w-[50svw] lg:w-[30svw] 2xl:w-[25svw]"
    >
      <div className="flex w-full flex-col items-start gap-8">
        <div className="flex w-full flex-col items-start gap-2">
          <span className="p-large font-prima uppercase">Search</span>
          <div className="relative flex w-full items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search destinations..."
              value={localSearchQuery}
              onChange={handleSearchChange}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              className="w-full rounded-full border-[1px] border-gray bg-background-light px-3 py-1 text-text-light outline-none transition-all duration-300 focus:border-text-light focus:shadow-component dark:bg-background-dark dark:focus:border-text-dark dark:focus:shadow-component-dark md:px-4 md:py-2"
            />
            <div className="absolute right-[5%] overflow-hidden">
              <motion.i
                variants={variants}
                animate={inputFocus ? "visible" : "hiddenY"}
                className="cursor-hover-small ri-search-line cursor-pointer text-text-light"
              ></motion.i>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-2">
          <span className="p-large font-prima uppercase">Tag filter</span>
          <div className="flex flex-wrap gap-2">
            {predefinedTags.map((tag) => (
              <motion.button
                whileHover="hoverScale"
                variants={variants}
                transition={{ duration: 0.3 }}
                whileTap="tapScale"
                key={tag}
                className={`${
                  selectTags.includes(tag)
                    ? "bg-background-dark text-text-dark dark:bg-background-light dark:text-text-light"
                    : "bg-background-light text-text-light dark:bg-background-dark"
                } span-small cursor-pointer rounded-2xl border border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
                onClick={() => handleTagFilter(tag)}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Selectors for InspirationFilter
const selectBlogFilterState = createSelector(
  (state: RootState) => state.filter.blog,
  (blog) => ({
    tags: blog.tags,
    searchQuery: blog.searchQuery,
  }),
);

// InspirationFilter Component
export const InspirationFilter: React.FC<{ continentNames: string[] }> = memo(
  ({ continentNames }) => {
    const dispatch = useDispatch();
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const { tags: selectTags, searchQuery: selectSearchQuery } = useSelector(
      selectBlogFilterState,
    );
    const [localSearchQuery, setLocalSearchQuery] = useState(selectSearchQuery);
    const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

    // Handlers
    const handleContinentFilter = useCallback(
      (continent: string) => {
        dispatch(
          setBlogTags(
            selectTags.includes(continent)
              ? selectTags.filter((c: string) => c !== continent)
              : [...selectTags, continent],
          ),
        );
      },
      [selectTags, dispatch],
    );

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalSearchQuery(e.target.value);
      },
      [],
    );

    useEffect(() => {
      dispatch(setBlogSearchQuery(debouncedSearchQuery));
    }, [debouncedSearchQuery, dispatch]);

    return (
      <motion.div
        initial="hiddenY"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        transition={{
          duration: 0.5,
          delay: 0.5,
          staggerChildren: 0.2,
          delayChildren: 0.5,
        }}
        className="continent-filter flex w-full flex-row flex-wrap items-center justify-center gap-2 rounded-xl px-2 py-4 shadow-component dark:shadow-component-dark sm:px-4 md:px-4 lg:gap-3 lg:rounded-2xl lg:px-12 lg:py-6 2xl:gap-4 2xl:rounded-3xl 2xl:px-sect-short 2xl:py-8"
      >
        {continentNames.map((continent) => (
          <motion.button
            variants={variants}
            key={continent}
            onClick={() => handleContinentFilter(continent)}
            whileHover="hoverScale"
            whileTap="tapScale"
            transition={{ duration: 0.3 }}
            className={`continent-btn span-regular rounded-3xl border border-gray px-2 py-1 lg:border-[1px] lg:px-6 lg:py-1 2xl:border-[1.5px] 2xl:px-8 2xl:py-2 ${
              selectTags.includes(continent)
                ? "bg-background-dark text-text-dark dark:bg-background-light dark:text-text-light"
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
            value={localSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className={`w-full rounded-full border border-gray bg-background-light px-2 text-text-light transition-all duration-300 focus:outline-none dark:bg-background-dark lg:border-[1px] lg:px-3 lg:py-1 2xl:border-[1.5px] 2xl:px-4 2xl:py-2 ${
              inputFocus
                ? "border-text-light shadow-component dark:border-text-dark dark:shadow-component-dark"
                : ""
            }`}
          />
          <i
            className={`ri-search-line cursor-hover-small span-regular absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-text-light transition-all duration-300`}
          ></i>
        </motion.div>
      </motion.div>
    );
  },
);
