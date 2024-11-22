// Import necessary React hooks and libraries
import React, {
  useCallback,
  useEffect,
  useReducer,
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
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";
import { useViewportWidth } from "src/hooks/useViewportWidth/useViewportWidth";

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
  onDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { point?: { x: number; y: number } },
  ) => void;
  dragConstraints: DragConstraints;
}> = React.memo(
  ({ blog, position, onDragStart, onDragEnd, dragConstraints }) => {
    const viewportWidth = useViewportWidth();
    const dragControls = useDragControls();

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        variants={variants}
        className="blog absolute flex h-[30svh] w-1/2 flex-col gap-4 overflow-hidden rounded-xl bg-background-light pb-3 shadow-component dark:bg-background-dark dark:shadow-component-dark md:h-[45svh] lg:h-[50svh] lg:w-1/3 lg:pb-4 2xl:pb-8"
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
        <div className="relative flex h-3/4 flex-col items-start justify-end gap-0 px-4 pb-4 md:h-1/2 md:px-8 2xl:h-3/4">
          <div className="absolute right-0 top-0 h-full w-full select-none overflow-hidden brightness-75">
            <OptimizedImage
              whileHover="hoverScale"
              variants={variants}
              transition={{ duration: 0.5 }}
              className="pointer-events-none h-full w-full brightness-75"
              src={blog.image}
              alt={blog.title}
            />
          </div>
          <span className="span-small z-20 text-text-dark">{blog.author}</span>
          {viewportWidth > 768 && (
            <motion.span
              whileHover="hoverX"
              transition={{ duration: 0.3 }}
              variants={variants}
              className="cursor-hover-small span-medium line-clamp-2 z-20 cursor-pointer uppercase leading-[0.8] text-text-dark"
            >
              <Link to={`/inspiration/${blog._id}`}>{blog.title}</Link>
            </motion.span>
          )}
          {viewportWidth <= 768 && (
            <span
              className="cursor-hover-small span-small line-clamp-3 z-20 cursor-pointer uppercase text-text-dark"
            >
              {blog.title}
            </span>
          )}
        </div>
        {/* Blog content preview and link */}
        {viewportWidth > 768 && (
          <div className="flex flex-col gap-4 px-4 lg:px-8">
            <p className="p-regular line-clamp-6 w-full overflow-hidden lg:line-clamp-5">
              {blog.content[0].sectionText[0]}
            </p>
            <button className="underline-btn span-medium uppercase">
              <Link to={`/inspiration/${blog._id}`}>
                View
                <i className="ri-arrow-right-up-line pointer-events-none"></i>
              </Link>
            </button>
          </div>
        )}
        {viewportWidth <= 768 && (
          <div className="flex w-full items-center justify-center">
            <button className="underline-btn span-medium uppercase">
              <Link to={`/inspiration/${blog._id}`}>
                View
                <i className="ri-arrow-right-up-line pointer-events-none"></i>
              </Link>
            </button>
          </div>
        )}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState<DragConstraints>({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  });

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
      info: { point?: { x: number; y: number } },
    ) => {
      if (!containerRef.current || !info?.point) {
        // If no point info, use the current position
        const currentPosition = positions[title];
        dispatchPositions({
          type: "UPDATE_POSITION",
          payload: {
            title,
            position: {
              x: currentPosition.x,
              y: currentPosition.y,
              zIndex: currentPosition.zIndex,
            },
          },
        });
        return;
      }

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
          dragConstraints={dragConstraints}
        />
      ))}
    </motion.div>
  );
});

export default StarterBlogs;
