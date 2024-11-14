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
  setDestinationTags,
  setDestinationSearchQuery,
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
                data-testid="ri-search-line"
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
