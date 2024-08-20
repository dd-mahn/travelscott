import React, {
  memo,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";

interface FullFilterBoardProps {
  continentNames: string[];
  countryNames: string[];
  filterContinents: string[];
  filterCountries: string[];
  filterTags: string[];
  setFilterContinents: React.Dispatch<SetStateAction<string[]>>;
  setFilterCountries: React.Dispatch<SetStateAction<string[]>>;
  setFilterTags: React.Dispatch<SetStateAction<string[]>>;
  setSearchQuery: React.Dispatch<SetStateAction<string>>;
}

const variants = {
  hidden: { opacity: 0, y: 40 },
  hiddenY: (y: string) => {
    return {
      y: y,
    };
  },
  hiddenYScale: { scale: 0.95, y: 100 },
  visible: { opacity: 1, scale: 1, y: 0, x: 0 },
  scaleHover: {
    scale: 1.05,
  },
};

const FullFilterBoard: React.FC<FullFilterBoardProps> = ({
  continentNames,
  countryNames,
  filterContinents,
  filterCountries,
  filterTags,
  setFilterContinents,
  setFilterCountries,
  setFilterTags,
  setSearchQuery,
}) => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tags = useMemo(
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

  // Click handlers
  const continentFilterClick = useCallback((continent: string) => {
    setFilterContinents((prev) =>
      prev.includes(continent)
        ? prev.filter((item) => item !== continent)
        : [...prev, continent],
    );
  }, []);

  const countryFilterClick = useCallback((country: string) => {
    setFilterCountries((prev) =>
      prev.includes(country)
        ? prev.filter((item) => item !== country)
        : [...prev, country],
    );
  }, []);

  const tagFilterClick = useCallback((tag: string) => {
    setFilterTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  }, []);

  const handleSearchClick = useCallback(() => {
    const value = inputRef.current?.value as string;
    setSearchQuery(value);
  }, [setSearchQuery]);

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
          className={`${inputFocus ? "border-text-light" : "border-gray border-opacity-50"} flex h-fit items-center justify-between rounded-md px-2 py-1 transition-all lg:border-[1.5px] 2xl:border-[2px]`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="span-small w-4/5 bg-transparent outline-none"
            onClick={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            variants={variants}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            title="search"
            className="outline-none"
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
            <span
              key={continent}
              className={`${filterContinents.includes(continent) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
              onClick={() => continentFilterClick(continent)}
            >
              {continent}
            </span>
          ))}
          {countryNames.map((country) => (
            <span
              key={country}
              className={`${filterCountries.includes(country) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
              onClick={() => countryFilterClick(country)}
            >
              {country}
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-2">
        <span className="span-medium font-prima uppercase">Tags</span>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`${filterTags.includes(tag) ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"} span-small cursor-pointer rounded-2xl border border-gray px-4 transition-all hover:scale-[1.05] hover:border-text-light`}
              onClick={() => tagFilterClick(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default memo(FullFilterBoard);
