import React, { useCallback, useEffect, useMemo, useState } from "react";
import Blog from "src/types/Blog";

interface Position {
  x: number;
  y: number;
  zIndex: number;
}

interface Positions {
  [title: string]: Position;
}

interface StarterBlogsProps {
  blogs: Blog[];
}

const StarterBlogs: React.FC<StarterBlogsProps> = ({ blogs }) => {
  const [positions, setPositions] = useState<Positions>({});
  const [maxZIndex, setMaxZIndex] = useState(1);

  useEffect(() => {
    const screenCenterX = window.innerWidth / 2 - 600;
    const screenCenterY = window.innerHeight / 2;
    const initialPositions: Positions = {};

    blogs.forEach((blog) => {
      const x = Math.random() * 500 + screenCenterX - 100;
      const y = Math.random() * 200 + screenCenterY - 100;
      initialPositions[blog.title] = { x, y, zIndex: 1 };
    });

    setPositions(initialPositions);
  }, [blogs]);

  const handleDragStart = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, title: string) => {
      const newPosZIndex = maxZIndex + 1;
      const startPos = positions[title] || { x: 0, y: 0, zIndex: newPosZIndex };

      setPositions((prev) => ({
        ...prev,
        [title]: { ...startPos, zIndex: newPosZIndex },
      }));
      setMaxZIndex(newPosZIndex);

      const startX = event.pageX;
      const startY = event.pageY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newX = startPos.x + (moveEvent.pageX - startX);
        const newY = startPos.y + (moveEvent.pageY - startY);

        setPositions((prev) => ({
          ...prev,
          [title]: { x: newX, y: newY, zIndex: newPosZIndex },
        }));
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    },
    [maxZIndex, positions],
  );

  const starterBlogs = useMemo(
    () => blogs.filter((blog) => blog.category === "Starter" && blog.image),
    [blogs],
  );

  return (
    <>
      {starterBlogs.map((blog) => (
        <div
          key={blog.title} 
          className="blog absolute flex h-0.5svh w-1/3 flex-col justify-between gap-4 overflow-hidden rounded-xl bg-background-light pb-8 shadow-xl"
          style={{
            left: `${positions[blog.title]?.x}px`,
            top: `${positions[blog.title]?.y}px`,
            zIndex: positions[blog.title]?.zIndex,
          }}
          onMouseDown={(event) => handleDragStart(event, blog.title)}
        >
          <div
            className="flex h-3/4 flex-col items-start justify-end gap-0 px-8 pb-4"
            style={{
              backgroundImage: `url(${blog.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <span className="font-medium text-text-dark lg:text-sm 2xl:text-base">
              {blog.author}
            </span>
            <h2 className="font-semibold uppercase text-text-dark lg:text-lg xl:text-xl 2xl:text-2xl">
              {blog.title}
            </h2>
          </div>
          <div className="flex flex-col gap-4 px-8">
            <p className="w-full overflow-hidden font-medium lg:text-base xl:text-lg 2xl:text-xl">
              {blog.content[0].sectionText[0]}
            </p>
            <button className="underline-btn uppercase">
              View<i className="ri-arrow-right-up-line"></i>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default StarterBlogs;
