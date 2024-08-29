// Import necessary React hooks and libraries
import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  useRef,
} from "react";
import { motion, useDragControls } from "framer-motion";
import { Link } from "react-router-dom";

// Import custom types and utility functions
import BlogType from "src/types/Blog";
import { optimizeImage } from "src/utils/optimizeImage";
import { useViewportWidth } from "src/utils/imageUtils";

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
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hoverScale: {
    scale: 1.05,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  hoverX: {
    x: 5,
    transition: { duration: 1, type: "spring", bounce: 0.5 },
  },
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
          width: Math.min(viewportWidth, 400),
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
        transition={{ duration: 0.5 }}
        variants={variants}
        className="blog absolute flex h-[50svh] w-1/3 flex-col justify-between gap-4 overflow-hidden rounded-xl bg-background-light pb-8 shadow-component"
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
        <div className="relative flex h-3/4 flex-col items-start justify-end gap-0 px-8 pb-4">
          <div className="absolute right-0 top-0 h-full w-full overflow-hidden">
            <motion.img
              whileHover="hoverScale"
              variants={variants}
              loading="lazy"
              className="h-full w-full object-cover brightness-75"
              {...imageProps}
              alt={blog.title}
            />
          </div>
          <div className="absolute right-0 top-0 z-10 h-full w-full bg-background-dark bg-opacity-30"></div>
          <span className="span-small z-20 text-text-dark">{blog.author}</span>
          <motion.span
            whileHover="hoverX"
            variants={variants}
            className="cursor-hover-small span-medium z-20 cursor-pointer uppercase text-text-dark"
          >
            <Link to={`/inspiration/${blog._id}`} target="_top">
              {blog.title}
            </Link>
          </motion.span>
        </div>
        {/* Blog content preview and link */}
        <div className="flex flex-col gap-4 px-8">
          <p className="p-regular line-clamp-2 w-full overflow-hidden">
            {blog.content[0].sectionText[0]}
          </p>
          <button className="underline-btn text-sm uppercase">
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
  const [positions, dispatch] = useReducer(positionReducer, {});
  const [maxZIndex, setMaxZIndex] = React.useState(1);
  const viewportWidth = useViewportWidth();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = React.useState<DragConstraints>(
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
    dispatch({ type: "SET_INITIAL_POSITIONS", payload: initialPositions });
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
      dispatch({
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

      dispatch({
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

  // Filter blogs for "FirstTimeAbroad" category
  const starterBlogs = useMemo(
    () =>
      blogs.filter((blog) => blog.category === "FirstTimeAbroad" && blog.image),
    [blogs],
  );

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
