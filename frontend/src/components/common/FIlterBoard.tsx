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
import useDebounce from "src/hooks/useDebounce";

interface DestinationFilterProps {
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

export const DestinationFilter: React.FC<DestinationFilterProps> = memo(
  ({ continentNames, countryNames }) => {
    const dispatch = useDispatch();
    const selectDestinationFilterState = useCallback(
      (state: RootState) => ({
        continents: state.filter.destination.continents,
        countries: state.filter.destination.countries,
        tags: state.filter.destination.tags,
        searchQuery: state.filter.destination.searchQuery,
      }),
      [],
    );
    const { continents, countries, tags, searchQuery } = useSelector(
      selectDestinationFilterState,
    );
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
    const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

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
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{ once: true }}
        exit="hidden"
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`filter-board absolute right-[5%] top-2/3 z-10 flex flex-col items-center gap-8 rounded-2xl bg-background-light px-4 pb-10 pt-6 shadow-section lg:w-[40svw] 2xl:w-[30svw]`}
      >
        <motion.div variants={variants} className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className={`w-full rounded-full border border-gray bg-background-light text-text-light transition-all duration-300 focus:outline-none lg:border-[1px] lg:px-3 lg:py-1 2xl:border-[1.5px] 2xl:px-4 2xl:py-2 ${
              inputFocus ? "border-text-light shadow-lg" : ""
            }`}
          />
          <i
            className={`ri-search-line cursor-hover-small span-regular absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-text-light transition-all duration-300`}
          ></i>
        </motion.div>

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
                className={`${continents.includes(continent) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
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
                className={`${countries.includes(country) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
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
                className={`${tags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
                onClick={() => tagFilterClick(tag)}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    );
  },
);

export const CountryDestinationFilter: React.FC = memo(() => {
  const dispatch = useDispatch();
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectDestinationFilterState = useCallback(
    (state: RootState) => ({
      tags: state.filter.destination.tags,
      searchQuery: state.filter.destination.searchQuery,
    }),
    [],
  );
  const { tags: selectTags, searchQuery: selectSearchQuery } = useSelector(
    selectDestinationFilterState,
  );
  const [localSearchQuery, setLocalSearchQuery] = useState(selectSearchQuery);
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

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
    <div className="flex w-full flex-col items-start gap-8">
      <div className="flex w-full flex-col items-start gap-2">
        <span className="span-medium font-prima uppercase">Search</span>
        <div className="relative flex w-full items-center">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search destinations..."
            value={localSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className="w-full rounded-full border-[1px] border-gray bg-background-light px-4 py-2 text-text-light outline-none transition-all duration-300 focus:border-text-light focus:shadow-lg"
          />
          <div className="absolute right-[5%] overflow-hidden">
            <motion.i
              variants={variants}
              animate={inputFocus ? "visible" : "hidden"}
              className="cursor-hover-small cursor-pointer ri-search-line text-text-light"
            ></motion.i>
          </div>
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
              className={`${
                selectTags.includes(tag)
                  ? "bg-background-dark text-text-dark"
                  : "bg-background-light text-text-light"
              } span-small cursor-pointer rounded-2xl border-gray px-4 lg:border-[1px] 2xl:border-[1.5px]`}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
});

export const InspirationFilter: React.FC<{ continentNames: string[] }> = memo(
  ({ continentNames }) => {
    const dispatch = useDispatch();
    const [inputFocus, setInputFocus] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const selectBlogFilterState = useCallback(
      (state: RootState) => ({
        tags: state.filter.blog.tags,
        searchQuery: state.filter.blog.searchQuery,
      }),
      [],
    );
    const { tags: selectTags, searchQuery: selectSearchQuery } = useSelector(
      selectBlogFilterState,
    );
    const [localSearchQuery, setLocalSearchQuery] = useState(selectSearchQuery);
    const debouncedSearchQuery = useDebounce(localSearchQuery, 500);

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
            className={`continent-btn span-regular rounded-3xl border border-gray lg:border-[1px] lg:px-6 lg:py-1 2xl:border-[1.5px] 2xl:px-8 2xl:py-2 ${
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
            value={localSearchQuery}
            onChange={handleSearchChange}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            className={`w-full rounded-full border border-gray bg-background-light text-text-light transition-all duration-300 focus:outline-none lg:border-[1px] lg:px-3 lg:py-1 2xl:border-[1.5px] 2xl:px-4 2xl:py-2 ${
              inputFocus ? "border-text-light shadow-lg" : ""
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
