import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

// Asset imports
import "src/styles/about.css";
import heroVideo from "src/assets/videos/about-hero.mp4";
import who1 from "src/assets/images/ui/about/about-1.webp";
import who2 from "src/assets/images/ui/about/about-2.webp";
import who3 from "src/assets/images/ui/about/about-3.webp";
import who4 from "src/assets/images/ui/about/about-4.webp";
import who5 from "src/assets/images/ui/about/about-5.webp";
import who6 from "src/assets/images/ui/about/about-6.webp";
import who7 from "src/assets/images/ui/about/about-7.webp";
import who8 from "src/assets/images/ui/about/about-8.webp";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";
import { people } from "src/data/about-people";

// Framer motion variants
const variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  hiddenFullY: {
    y: "100%"
  },

  visible: {
    opacity: 1,
    y: 0,
  },

  imgVisible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },

  imgFloat: {
    y: [0, 10, -10, 0],
    scale: [1, 0.98, 1.02, 1],
    transition: {
      duration: 5,
      repeat: Infinity,
    },
  },
  
  hoverScale: {
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

// Images for the who section
const whoImages = [who1, who2, who3, who4, who5, who6, who7, who8];

// About page component
const About: React.FC = () => {
  // Create refs for the side blocks, block and container
  const [leftValue, setLeftValue] = useState(0);
  const sideBlockRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const blockRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  // Create controls for the side blocks and block
  const sideBlockControls = [useAnimation(), useAnimation()];
  const blockControls = useAnimation();

  // Set the left value for the block when the component mounts and handle animations
  useEffect(() => {
    const handleResize = () => {
      if (blockRef.current && containerRef.current) {
        const blockWidth = blockRef.current.offsetWidth;
        setLeftValue(containerRef.current.offsetWidth / 2 - blockWidth / 2);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (blockRef.current) {
      resizeObserver.observe(blockRef.current);
    }

    handleResize(); // Initial calculation

    return () => {
      if (blockRef.current) {
        resizeObserver.unobserve(blockRef.current);
      }
    };
  }, [blockRef, containerRef]);

  useEffect(() => {
    if (blockRef.current) {
      const blockWidth = blockRef.current.offsetWidth;

      sideBlockControls[0].start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeInOut" },
      });
      sideBlockControls[1].start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeInOut" },
      });
      sideBlockControls[0].start({
        x: -blockWidth / 2,
        transition: { delay: 0.9, duration: 0.6, ease: "circInOut" },
      });
      sideBlockControls[1].start({
        x: blockWidth / 2,
        transition: { delay: 0.9, duration: 0.6, ease: "circInOut" },
      });

      blockControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 1, ease: "easeInOut" },
      });
    }
  }, [sideBlockControls, blockRef]);

  // Handle about video scroll animation
  const { scrollYProgress } = useScroll({
    target: aboutVideoRef,
    offset: ["start 30%", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Render logic
  return (
    <main className="about">
      {/* HERO SECTION */}

      <section className="hero px-sect relative flex flex-col items-center gap-12 py-sect-short">
        <div className="blur-blob blob-brown left-[10%] top-0 h-1/3 w-1/5 opacity-50"></div>
        <div className="blur-blob blob-green right-1/3 top-[10%] h-[20%] w-1/3 opacity-50"></div>
        <motion.div
          ref={containerRef}
          className="h1-md-bold relative z-10 w-screen overflow-hidden pt-sect-short text-center"
        >
          <motion.div
            initial="hiddenFullY"
            ref={sideBlockRefs[0]}
            animate={sideBlockControls[0]}
            variants={variants}
            className="inline-block text-main-green"
          >
            Travel
          </motion.div>
          <motion.div
            ref={blockRef}
            initial={{
              opacity: 0,
              y: "100%",
            }}
            animate={blockControls}
            variants={variants}
            className={`bot-0 absolute inline-block w-fit`}
            style={{
              left: leftValue ? leftValue : "50%",
            }}
          >
            <span className="font-logo font-medium normal-case text-text-light">
              Scott,
            </span>{" "}
            <span className="text-text-light">your</span>
          </motion.div>{" "}
          <motion.div
            ref={sideBlockRefs[1]}
            initial="hiddenFullY"
            animate={sideBlockControls[1]}
            variants={variants}
            className="inline-block text-main-green"
          >
            guide
          </motion.div>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1 }}
          className="p-medium z-10 text-center lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
        >
          We simply want to awaken the passion for <br />
          travel within you.
        </motion.p>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="p-medium z-10 text-center lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3"
        >
          We simplify your travel experience.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: "100%",
          }}
          animate="visible"
          variants={variants}
          transition={{ duration: 0.4, delay: 1.4 }}
          className="relative h-screen w-full lg:mt-40 2xl:mt-sect-default"
        >
          <motion.video
            ref={aboutVideoRef}
            src={heroVideo}
            style={{ scale }}
            autoPlay
            loop
            muted
            className="absolute top-0 z-10 w-full rounded-3xl shadow-section"
          ></motion.video>
          <motion.h2
            style={{ opacity }}
            className="h2-md absolute top-1/2 z-[15] w-full text-center text-text-dark"
          >
            {" "}
            We want you to travel.
          </motion.h2>
          :
        </motion.div>
      </section>

      {/* STACKED SECTION */}
      <section className="flex flex-col items-center justify-start lg:py-sect-default 2xl:py-sect-semi">
        {/* HOW SECTION */}
        <motion.h2
          initial="hidden"
          whileInView="visible"
          variants={variants}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          transition={{ duration: 0.5 }}
          className="h3-inter text-center"
        >
          How?
        </motion.h2>

        <div className="how relative">
          <div
            className={`sticky z-0 mx-auto mb-24 flex h-[50svh] flex-row items-start justify-between rounded-xl bg-background-light px-8 pb-sect-short pt-4 shadow-section lg:top-24 lg:mt-40 lg:w-3/4 2xl:top-48 2xl:mt-sect-medium 2xl:w-3/4`}
          >
            <div className="flex w-2/3 flex-col items-start justify-start gap-12">
              <div className="flex flex-col justify-start gap-0">
                <div className="overflow-hidden">
                  <motion.h1
                    initial="hiddenFullY"
                    whileInView="visible"
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                    variants={variants}
                    className="h1-md-bold"
                  >
                    Optimal
                  </motion.h1>
                </div>

                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  variants={variants}
                  className="span-medium uppercase"
                >
                  Information
                </motion.span>
              </div>

              <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
                From the must-see landmarks to the hidden gems, our guides are
                designed to ensure you’re well-informed. Whether it’s an
                upcoming journey or a place you’re curious about, our resources
                are tailored to provide just the right insights to fuel your
                wanderlust and help you travel smarter.
              </p>
            </div>

            <div className="w-fit overflow-hidden">
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                0
              </motion.div>
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                1
              </motion.div>
            </div>
          </div>

          <div
            className={`sticky z-0 mx-auto mb-24 mt-sect-medium flex h-[50svh] flex-row items-start justify-between rounded-xl bg-light-brown px-8 pb-sect-short pt-4 shadow-section lg:top-48 lg:w-3/4 2xl:top-72 2xl:w-3/4`}
          >
            <div className="w-2/3 overflow-hidden">
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                0
              </motion.div>
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                2
              </motion.div>
            </div>

            <div className="flex flex-col items-end justify-start gap-12">
              <div className="flex w-2/3 flex-col justify-end gap-0">
                <div className="overflow-hidden">
                  <motion.h1
                    initial="hiddenFullY"
                    whileInView="visible"
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                    variants={variants}
                    className="h1-md-bold text-end"
                  >
                    Vibrant
                  </motion.h1>
                </div>

                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  variants={variants}
                  className="span-medium text-end uppercase"
                >
                  Experience
                </motion.span>
              </div>

              <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
                We provide a streamlined research experience with high-quality
                visual content that aims to inspire your travel plans. Each
                search is an opportunity for discovery, and our vivid imagery
                stirs the urge to see the world. With practical resources that
                vividly depict your next destination, we empower you to travel
                with enthusiasm and insight.
              </p>
            </div>
          </div>

          <div
            className={`sticky z-0 mx-auto mb-24 mt-sect-medium flex h-[50svh] flex-row items-start justify-between rounded-xl bg-light-green px-8 pb-sect-short pt-4 shadow-section lg:top-72 lg:w-3/4 2xl:top-96 2xl:w-3/4`}
          >
            <div className="flex w-2/3 flex-col items-start justify-start gap-12">
              <div className="flex flex-col justify-start gap-0">
                <div className="overflow-hidden">
                  <motion.h1
                    initial="hiddenFullY"
                    whileInView="visible"
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                    variants={variants}
                    className="h1-md-bold"
                  >
                    Verified
                  </motion.h1>
                </div>

                <motion.span
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  variants={variants}
                  className="span-medium uppercase"
                >
                  Resource
                </motion.span>
              </div>

              <p className="p-medium lg:w-full 2xl:w-3/4 3xl:w-3/4">
                Our platform curates content from renowned travel
                websites and authentic traveler reviews to create a
                comprehensive travel resource. Rest assured, the credibility of
                our information is our top priority, ensuring you have reliable
                insights for your journey.
              </p>
            </div>

            <div className="w-fit overflow-hidden">
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.6 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                0
              </motion.div>
              <motion.div
                initial="hiddenFullY"
                whileInView="visible"
                transition={{ duration: 0.4, delay: 0.8 }}
                viewport={{ once: true, margin: "0% 0% -10% 0%" }}
                variants={variants}
                className="text-stroke h1-md-bold inline-block text-transparent"
              >
                3
              </motion.div>
            </div>
          </div>
          <div className="py-sect-default"></div>

          {/* WHO SECTION */}
          <section className="who px-sect sticky top-0 z-20 rounded-5xl bg-background-dark shadow-section lg:pb-sect-default lg:pt-40 2xl:py-sect-default">
            <div className="relative flex flex-col">
              <div className="blob-brown blur-blob left-1/2 top-[20%] h-1/4 w-1/4 opacity-30"></div>
              <div className="blob-green blur-blob -top-[20%] left-[5%] h-3/5 w-3/5 opacity-20"></div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={variants}
                viewport={{ once: true, margin: "0% 0% -20% 0%" }}
                transition={{ duration: 0.5 }}
                className="h3-inter text-center lg:py-40 2xl:pb-sect-default"
              >
                <h1 className="text-text-dark">Who?</h1>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={variants}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="z-10 flex flex-wrap justify-center gap-12"
              >
                {people.map((person, index) => (
                  <div
                    className="person flex w-1/5 flex-col items-center gap-4"
                    key={index}
                  >
                    <div className="h-[35svh] w-full overflow-hidden rounded-xl bg-gradient-to-t from-gray to-blue-gray-800 shadow-component saturate-0 duration-300 hover:saturate-[0.75]">
                      {person.img && (
                        <motion.img
                          whileHover="hoverScale"
                          variants={variants}
                          transition={{ duration: 0.4 }}
                          src={person.img}
                          alt=""
                          className="h-full w-full rounded-xl object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="span-regular text-center text-text-dark">
                        {person.name}
                      </h3>
                      <p className="span-small text-center text-text-dark">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <div className="px-sect relative pb-sect-default pt-sect-long 2xl:mt-sect-default">
                <div className="blob-brown blur-blob left-[20%] top-1/3 h-3/5 w-3/5 opacity-30"></div>

                {whoImages.map((img, index) => (
                  <Suspense key={"whoImg-" + index} fallback={null}>
                    <motion.img
                      initial="hidden"
                      whileInView={["visible", "imgFloat"]}
                      variants={variants}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.4 }}
                      src={img}
                      loading="lazy"
                      className={`img-${index + 1} absolute rounded-lg`}
                    />
                  </Suspense>
                ))}

                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  variants={variants}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="p-regular text-text-dark lg:w-2/3 xl:w-2/3 2xl:w-1/2 3xl:w-2/5"
                >
                  In 2024, we came together, fueled by an unwavering passion for
                  adventure and a deep-seated commitment to unveiling the
                  splendor of our planet. Our aspiration is to witness the joy
                  of discovery on the faces of those who traverse the globe, and
                  we take pride in extending a helping hand to make each journey
                  unforgettable.
                </motion.p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="why px-sect relative flex h-[50svh] flex-col items-center lg:mb-sect-default lg:mt-40 lg:gap-48 2xl:my-sect-default 2xl:gap-64">
        <img src={airplane1} alt="" className="plane-1 absolute" />
        <img src={airplane2} alt="" className="plane-2 absolute" />
        <img src={airplane3} alt="" className="plane-3 absolute" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          className="h3-inter text-center"
        >
          <h2>Why?</h2>
        </motion.div>
        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={variants}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "0% 0% -30% 0%" }}
          className="p-large"
        >
          “A paper plane’s journey, however brief, reminds us that <br /> even
          the simplest dreams can take flight.”
        </motion.p>
      </section>
    </main>
  );
};

export default memo(About);
