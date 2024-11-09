import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
} from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import {
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
