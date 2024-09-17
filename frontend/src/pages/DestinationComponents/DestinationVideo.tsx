import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { VisibilityVariants } from "src/utils/variants";
import Destination from "src/types/Destination";
import ReactPlayer from "react-player";

const variants = {
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
};

const DestinationVideo = ({ videoCode }: { videoCode: string }) => {
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const videoInView = useInView(videoContainerRef, {
    once: false,
    margin: "-40%",
  });

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
      initial="hiddenY"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 1 }}
      className="px-sect video h-screen py-sect-short"
    >
      <div className="relative grid h-full w-full place-items-center overflow-hidden rounded-2xl">
        {videoPlayer}
      </div>
    </motion.section>
  );
};

export default memo(DestinationVideo);
