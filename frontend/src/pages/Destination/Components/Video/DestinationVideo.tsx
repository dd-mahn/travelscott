import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { VisibilityVariants } from "src/utils/constants/variants";
import ReactPlayer from "react-player";

// Define animation variants for the motion component
const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

interface DestinationVideoProps {
  videoCode: string;
}

const DestinationVideo: React.FC<DestinationVideoProps> = ({ videoCode }) => {
  // Reference to the video container element
  const videoContainerRef = useRef<HTMLDivElement>(null);

  // Check if the video container is in view
  const videoInView = useInView(videoContainerRef, {
    once: false,
    margin: "-40%",
  });

  // Memoize the ReactPlayer component to optimize performance
  const videoPlayer = useMemo(
    () => (
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoCode}`}
        playing={videoInView}
        loop={true}
        controls
        width="100%"
        height="100%"
      />
    ),
    [videoInView, videoCode],
  );

  return (
    <motion.section
      ref={videoContainerRef}
      variants={variants}
      // initial="hiddenY"
      // whileInView="visible"
      // viewport={{ once: true }}
      // transition={{ duration: 0.8, delay: 1 }}
      className="px-sect video h-screen py-sect-short"
    >
      <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl">
        {videoPlayer}
      </div>
    </motion.section>
  );
};

export default DestinationVideo;
