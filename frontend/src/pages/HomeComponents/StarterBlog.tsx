import React, {
  useCallback,
  useEffect,
  useReducer,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import BlogType from "src/types/Blog";

// Interfaces and types
interface Position {
  x: number;
  y: number;
  zIndex: number;
}

interface Positions {
  [title: string]: Position;
}

interface StarterBlogsProps {
  blogs: BlogType[];
}

type Action =
  | { type: "SET_INITIAL_POSITIONS"; payload: Positions }
  | { type: "UPDATE_POSITION"; payload: { title: string; position: Position } }
  | { type: "INCREMENT_Z_INDEX"; payload: { title: string; zIndex: number } };

// Reducer function

const positionReducer = (state: Positions, action: Action): Positions => {
  switch (action.type) {
    case "SET_INITIAL_POSITIONS":
      return action.payload;
    case "UPDATE_POSITION":
      const { title, position } = action.payload;
      return { ...state, [title]: position };
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

// Component
const BlogComponent = ({
  blog,
  onDragStart,
  position,
}: {
  blog: BlogType;
  onDragStart: (event: React.MouseEvent<HTMLDivElement>) => void;
  position: Position;
}) => {
  const navigate = useNavigate();
  return (
    <div
      key={blog.title}
      className="blog absolute flex h-[50svh] w-1/3 flex-col justify-between gap-4 overflow-hidden rounded-xl bg-background-light pb-8 shadow-component"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: position.zIndex,
      }}
      onMouseDown={onDragStart}
    >
      <div
        className="relative flex h-3/4 flex-col items-start justify-end gap-0 px-8 pb-4"
        style={{
          backgroundImage: `url(${blog.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute right-0 top-0 z-0 h-full w-full bg-background-dark bg-opacity-30"></div>
        <span className="span-small z-10 text-text-dark">{blog.author}</span>
        <span className="span-medium z-10 uppercase text-text-dark">
          {blog.title}
        </span>
      </div>
      <div className="flex flex-col gap-4 px-8">
        <p className="p-regular w-full overflow-hidden">
          {blog.content[0].sectionText[0]}
        </p>
        <button
          className="underline-btn uppercase"
          onClick={() => navigate(`/inspiration/${blog._id}`)}
        >
          View<i className="ri-arrow-right-up-line"></i>
        </button>
      </div>
    </div>
  );
};

// Main component
const StarterBlogs: React.FC<StarterBlogsProps> = ({ blogs }) => {
  // Handling move and drag behavior
  const [positions, dispatch] = useReducer(positionReducer, {});
  const [maxZIndex, setMaxZIndex] = useState(1);

  useEffect(() => {
    const initialPositions: Positions = {};
    blogs.forEach((blog) => {
      initialPositions[blog.title] = {
        x: Math.random() * 500 + window.innerWidth / 2 - 600 - 100,
        y: Math.random() * 200 + window.innerHeight / 2 - 100,
        zIndex: 1,
      };
    });
    dispatch({ type: "SET_INITIAL_POSITIONS", payload: initialPositions });
  }, [blogs]);

  const updatePosition = useCallback(
    (title: string, x: number, y: number, zIndex: number) => {
      dispatch({
        type: "UPDATE_POSITION",
        payload: {
          title,
          position: { x, y, zIndex },
        },
      });
    },
    [],
  );

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

  const handleDragStart = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, title: string) => {
      incrementZIndex(title);

      const startX = event.pageX;
      const startY = event.pageY;
      const initialX = positions[title].x;
      const initialY = positions[title].y;

      const moveHandler = (moveEvent: MouseEvent) => {
        const newPos = {
          x: initialX + (moveEvent.pageX - startX),
          y: initialY + (moveEvent.pageY - startY),
          zIndex: maxZIndex + 1,
        };
        updatePosition(title, newPos.x, newPos.y, newPos.zIndex);
      };

      const upHandler = () => {
        document.removeEventListener("mousemove", moveHandler);
        document.removeEventListener("mouseup", upHandler);
      };

      document.addEventListener("mousemove", moveHandler);
      document.addEventListener("mouseup", upHandler);
    },
    [incrementZIndex, maxZIndex, positions, updatePosition],
  );

  // Displaying starter blogs
  const starterBlogs = useMemo(
    () =>
      blogs.filter((blog) => blog.category === "FirstTimeAbroad" && blog.image),
    [blogs],
  );

  return (
    <>
      {starterBlogs.map((blog) => (
        <BlogComponent
          key={blog.title}
          blog={blog}
          onDragStart={(event: React.MouseEvent<HTMLDivElement>) =>
            handleDragStart(event, blog.title)
          }
          position={positions[blog.title] || { x: 0, y: 0, zIndex: 1 }}
        />
      ))}
    </>
  );
};

export default StarterBlogs;
