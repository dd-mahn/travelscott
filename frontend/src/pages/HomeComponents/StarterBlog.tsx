// Import necessary React hooks and libraries
import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useDragControls } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "src/store/store";
import { setStarterBlogs } from "src/store/slices/blogSlice";

// Import custom types and utility functions
import BlogType from "src/types/Blog";
import {
  getImageSize,
  useViewportWidth,
  optimizeImage,
} from "src/utils/imageUtils";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

// Define interfaces for component props and state
interface Position {
  x: number;
  y: number;
  zIndex: number;
}

interface Positions {
  [title: string]: Position;
}

interface DragConstraints {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface StarterBlogsProps {
  blogs: BlogType[];
}

// Define action types for the reducer
type Action =
  | { type: "SET_INITIAL_POSITIONS"; payload: Positions }
  | { type: "UPDATE_POSITION"; payload: { title: string; position: Position } }
  | { type: "INCREMENT_Z_INDEX"; payload: { title: string; zIndex: number } };

// Reducer function to manage blog positions
const positionReducer = (state: Positions, action: Action): Positions => {
  switch (action.type) {
    case "SET_INITIAL_POSITIONS":
      return action.payload;
    case "UPDATE_POSITION":
      return { ...state, [action.payload.title]: action.payload.position };
    case "INCREMENT_Z_INDEX":
      return {
        ...state,
        [action.payload.title]: {
          ...state[action.payload.title],
          zIndex: action.payload.zIndex,
        },
      };
    default:
      return state;
  }
};

// Animation variants for Framer Motion
const variants = {
  hidden: VisibilityVariants.hidden,
  visible: { opacity: 1 },
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
};

// BlogComponent: Renders individual blog cards
const BlogComponent: React.FC<{
  blog: BlogType;
  position: Position;
  onDragStart: () => void;
  onDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: any) => void;
  viewportWidth: number;
  dragConstraints: DragConstraints;
}> = React.memo(
  ({
    blog,
    position,
    onDragStart,
    onDragEnd,
    viewportWidth,
    dragConstraints,
  }) => {
    const dragControls = useDragControls();

    // Optimize image based on viewport width
    const imageProps = useMemo(
      () =>
        optimizeImage(blog.image, {
          width: getImageSize(viewportWidth),
          quality: 80,
          format: "auto",
        }),
      [blog.image, viewportWidth],
    );

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        variants={variants}
        className="blog absolute flex h-[35svh] md:h-[45svh] lg:h-[50svh] w-1/2 lg:w-1/3 flex-col gap-4 overflow-hidden rounded-xl bg-background-light dark:bg-background-dark pb-3 lg:pb-4 2xl:pb-8 shadow-component dark:shadow-component-dark"
        style={{
          x: position.x,
          y: position.y,
          zIndex: position.zIndex,
        }}
        drag
        dragControls={dragControls}
        dragMomentum={true}
        dragElastic={0.5}
        dragConstraints={dragConstraints}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        {/* Blog image and title section */}
        <div className="relative flex flex-col items-start justify-end gap-0 px-4 lg:px-8 pb-4 h-1/2 lg:h-1/2 2xl:h-3/4">
          <div className="absolute right-0 select-none top-0 h-full w-full overflow-hidden bg-gradient-to-t from-blue-gray-900 to-gray brightness-75">
            <motion.img
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.5 }}
              loading="lazy"
              className="h-full w-full object-cover pointer-events-none brightness-75"
              {...imageProps}
              alt={blog.title}
            />
          </div>
          <span className="span-small z-20 text-text-dark">{blog.author}</span>
          <motion.span
            whileHover="hoverX"
            transition={{ duration: 0.3 }}
            variants={variants}
            className="cursor-hover-small span-medium leading-[0.8] z-20 cursor-pointer uppercase line-clamp-21 text-text-dark"
          >
            <Link to={`/inspiration/${blog._id}`} target="_top">
              {blog.title}
            </Link>
          </motion.span>
        </div>
        {/* Blog content preview and link */}
        <div className="flex flex-col gap-4 px-4 lg:px-8">
          <p className="p-regular line-clamp-6 lg:line-clamp-5 w-full overflow-hidden">
            {blog.content[0].sectionText[0]}
          </p>
          <button className="underline-btn span-medium uppercase">
            <Link to={`/inspiration/${blog._id}`} target="_top">
              View<i className="ri-arrow-right-up-line pointer-events-none"></i>
            </Link>
          </button>
        </div>
      </motion.div>
    );
  },
);

// StarterBlogs: Main component to render all blog cards
const StarterBlogs: React.FC<StarterBlogsProps> = React.memo(({ blogs }) => {
  const dispatch = useDispatch();
  const { starterBlogs } = useSelector((state: RootState) => state.blog);
  const [positions, dispatchPositions] = useReducer(positionReducer, {});
  const [maxZIndex, setMaxZIndex] = useState(1);
  const viewportWidth = useViewportWidth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState<DragConstraints>(
    { top: 0, left: 0, right: 0, bottom: 0 },
  );

  // Initialize blog positions
  const initializePositions = useCallback(() => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const blogWidth = containerRect.width / 3; // Assuming the blog width is 1/3 of the container
    const blogHeight = containerRect.height / 2; // Assuming the blog height is 1/2 of the container
    const initialPositions: Positions = {};
    blogs.forEach((blog) => {
      const x =
        containerRect.width / 2 - blogWidth / 2 + Math.random() * 200 - 100;
      const y =
        containerRect.height / 2 - blogHeight / 2 + Math.random() * 200 - 100;
      initialPositions[blog.title] = { x, y, zIndex: 1 };
    });
    dispatchPositions({
      type: "SET_INITIAL_POSITIONS",
      payload: initialPositions,
    });
    setDragConstraints({
      top: 0,
      left: 0,
      right: containerRect.width - blogWidth,
      bottom: containerRect.height - blogHeight,
    });
  }, [blogs]);

  // Set up event listener for window resize
  useEffect(() => {
    initializePositions();
    window.addEventListener("resize", initializePositions);
    return () => window.removeEventListener("resize", initializePositions);
  }, [initializePositions]);

  // Increment z-index when a blog is dragged
  const incrementZIndex = useCallback(
    (title: string) => {
      const newPosZIndex = maxZIndex + 1;
      setMaxZIndex(newPosZIndex);
      dispatchPositions({
        type: "INCREMENT_Z_INDEX",
        payload: { title, zIndex: newPosZIndex },
      });
    },
    [maxZIndex],
  );

  // Handle drag start
  const handleDragStart = useCallback(
    (title: string) => {
      incrementZIndex(title);
    },
    [incrementZIndex],
  );

  // Handle drag end and update position
  const handleDragEnd = useCallback(
    (
      title: string,
      event: MouseEvent | TouchEvent | PointerEvent,
      info: any,
    ) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const blogWidth = containerRect.width / 3;
      const blogHeight = containerRect.height / 2;
      const x = Math.max(
        0,
        Math.min(
          info.point.x - containerRect.left,
          containerRect.width - blogWidth,
        ),
      );
      const y = Math.max(
        0,
        Math.min(
          info.point.y - containerRect.top,
          containerRect.height - blogHeight,
        ),
      );

      dispatchPositions({
        type: "UPDATE_POSITION",
        payload: {
          title,
          position: {
            x,
            y,
            zIndex: positions[title].zIndex,
          },
        },
      });
    },
    [positions],
  );

  // Filter blogs based on category and image availability
  useEffect(() => {
    const filteredBlogs = blogs.filter(
      (blog) => blog.category === "FirstTimeAbroad" && blog.image,
    );
    dispatch(setStarterBlogs(filteredBlogs));
  }, [blogs, dispatch]);

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={variants}
      transition={{ staggerChildren: 0.2 }}
      className="relative h-full w-full"
    >
      {starterBlogs.map((blog) => (
        <BlogComponent
          key={blog.title}
          blog={blog}
          onDragStart={() => handleDragStart(blog.title)}
          onDragEnd={(event, info) => handleDragEnd(blog.title, event, info)}
          position={positions[blog.title] || { x: 0, y: 0, zIndex: 1 }}
          viewportWidth={viewportWidth}
          dragConstraints={dragConstraints}
        />
      ))}
    </motion.div>
  );
});

export default StarterBlogs;
