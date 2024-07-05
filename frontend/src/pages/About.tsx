import React from "react";

import "src/styles/about.css";
import heroVideo from "src/assets/videos/about-hero.mp4";
import manhDo from "src/assets/images/ui/about/manhdo.jpg";
import who1 from "src/assets/images/ui/about/about-1.jpg";
import who2 from "src/assets/images/ui/about/about-2.jpg";
import who3 from "src/assets/images/ui/about/about-3.jpg";
import who4 from "src/assets/images/ui/about/about-4.jpg";
import who5 from "src/assets/images/ui/about/about-5.jpg";
import who6 from "src/assets/images/ui/about/about-6.jpg";
import who7 from "src/assets/images/ui/about/about-7.jpg";
import who8 from "src/assets/images/ui/about/about-8.jpg";
import airplane1 from "src/assets/svg/airplane-1.svg";
import airplane2 from "src/assets/svg/airplane-2.svg";
import airplane3 from "src/assets/svg/airplane-3.svg";

const people = [
  {
    name: "Manh Do",
    role: "Founder",
    img: manhDo,
  },
  {
    name: "Scott",
    role: "Frontend Developer",
    img: "",
  },
  {
    name: "Scott",
    role: "Backend Developer",
    img: "",
  },
  {
    name: "Scott",
    role: "UI/UX Designer",
    img: "",
  },
  {
    name: "Scott",
    role: "Product Manager",
    img: "",
  },
  {
    name: "Scott",
    role: "Lead Travel Guide",
    img: "",
  },
  {
    name: "Scott",
    role: "Cultural Experience Coordinator",
    img: "",
  },
  {
    name: "Scott",
    role: "Adventure & Activities Specialist",
    img: "",
  },
];

const About: React.FC = () => {
  return (
    <main className="about">
      {/* HERO SECTION */}

      <section className="hero px-sect flex flex-col items-center gap-12 py-sect-short">
        <h1 className="pt-sect-short text-center h1-md text-main-green">
          Travel
          <span className="font-logo font-medium normal-case text-text-light">
            Scott,
          </span>{" "}
          <span className="text-text-light">your</span> guide
        </h1>

        <p className="text-center p-medium lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3">
          We simply want to awaken the passion for <br />
          travel within you.
        </p>

        <p className="text-center p-medium lg:w-2/5 xl:w-2/5 2xl:w-1/3 3xl:w-1/3">
          We simplify your travel experience.
        </p>

        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          className="mt-sect-default w-full rounded-xl shadow-section"
        ></video>
      </section>

      {/* STACKED SECTION */}
      <section className="flex flex-col items-center justify-start py-sect-semi">
        {/* HOW SECTION */}
        <h2 className="text-center h3-inter">
          How?
        </h2>
        <div className="how relative">
          <div className="sticky lg:top-24 2xl:top-48 z-0 mx-auto mt-sect-medium mb-24 flex h-0.5svh lg:w-2/3 2xl:w-3/4 flex-row items-start justify-between rounded-xl bg-background-light px-8 pb-sect-short pt-4 shadow-section">
            <div className="flex flex-col items-start justify-start gap-12">
              <div className="flex flex-col justify-start gap-0">
                <h1 className="h1-md-bold">
                  Optimal
                </h1>
                <span className="span-medium uppercase">
                  Information
                </span>
              </div>

              <p className="p-medium lg:w-3/4 xl:w-3/4 2xl:w-2/5 3xl:w-2/3">
                From the must-see landmarks to the hidden gems, our guides are
                designed to ensure you’re well-informed. Whether it’s an
                upcoming journey or a place you’re curious about, our resources
                are tailored to provide just the right insights to fuel your
                wanderlust and help you travel smarter.
              </p>
            </div>

            <h1 className="text-stroke h1-md-bold text-transparent">
              01
            </h1>
          </div>

          <div className="sticky lg:top-48 2xl:top-72 z-0 mx-auto mt-sect-medium mb-24 flex h-0.5svh lg:w-2/3 2xl:w-3/4 flex-row items-start justify-between rounded-xl bg-light-brown px-8 pb-sect-short pt-4 shadow-section">
            <h1 className="text-stroke h1-md-bold text-transparent">
              02
            </h1>

            <div className="flex flex-col items-end justify-start gap-12">
              <div className="flex flex-col justify-end gap-0">
                <h1 className="h1-md-bold">
                  Vibrant
                </h1>
                <h2 className="text-end font-sans span-medium uppercase">
                  Experience
                </h2>
              </div>

              <p className="p-medium lg:w-3/4 xl:w-3/4 2xl:w-2/5 3xl:w-2/3">
                We provide a streamlined research experience with high-quality
                visual content that aims to inspire your travel plans. Each
                search is an opportunity for discovery, and our vivid imagery
                stirs the urge to see the world. With practical resources that
                vividly depict your next destination, we empower you to travel
                with enthusiasm and insight.
              </p>
            </div>
          </div>

          <div className="sticky lg:top-72 2xl:top-96 z-0 mx-auto mt-sect-medium mb-24 flex h-0.5svh lg:w-2/3 2xl:w-3/4 flex-row items-start justify-between rounded-xl bg-light-green px-8 pb-sect-short pt-4 shadow-section">
            <div className="flex flex-col items-start justify-start gap-12">
              <div className="flex flex-col justify-start gap-0">
                <h1 className="h1-md-bold">
                  Verified
                </h1>
                <span className="font-sans span-medium uppercase ">
                  Resources
                </span>
              </div>

              <p className="p-medium lg:w-3/4 xl:w-3/4 2xl:w-2/5 3xl:w-2/3">
                Our platform curates content from renowned travel
                websites and authentic traveler reviews to create a
                comprehensive travel resource. Rest assured, the credibility of
                our information is our top priority, ensuring you have reliable
                insights for your journey.
              </p>
            </div>

            <h1 className="text-stroke h1-md-bold text-transparent">
              03
            </h1>
          </div>

          <div className="py-sect-default"></div>

          {/* WHO SECTION */}
          <section className="who px-sect sticky top-0 z-10 rounded-5xl bg-background-dark lg:py-sect-default shadow-section">
            <div className="relative flex flex-col gap-sect-default">
              <div className="blob-1 blur-blob z-0 h-1/4 w-1/4"></div>
              <div className="blob-2 blur-blob z-0 h-3/5 w-3/5"></div>
              <h2 className="text-center text-text-dark h3-inter">
                Who?
              </h2>
              <div className="z-10 flex flex-wrap justify-center gap-12">
                {people.map((person, index) => (
                  <div
                    className="person flex w-1/5 flex-col items-center gap-4"
                    key={index}
                  >
                    <div
                      className="h-0.3svh w-full rounded-xl bg-gray shadow-lg saturate-0"
                      style={{
                        backgroundImage: `url(${person.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-center span-regular text-text-dark">
                        {person.name}
                      </h3>
                      <p className="text-center span-small text-text-dark">
                        {person.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-sect relative pb-sect-default pt-sect-long">
                <div className="blob-3 blur-blob z-0 h-3/5 w-3/5"></div>
                <img src={who1} alt="" className="img-1 absolute rounded-lg" />
                <img src={who2} alt="" className="img-2 absolute rounded-lg" />
                <img src={who3} alt="" className="img-3 absolute rounded-lg" />
                <img src={who4} alt="" className="img-4 absolute rounded-lg" />
                <img src={who5} alt="" className="img-5 absolute rounded-lg" />
                <img src={who6} alt="" className="img-6 absolute rounded-lg" />
                <img src={who7} alt="" className="img-7 absolute rounded-lg" />
                <img src={who8} alt="" className="img-8 absolute rounded-lg" />
                <p className="p-regular text-text-dark lg:w-2/3 xl:w-2/3 2xl:w-1/2 3xl:w-2/5">
                  In 2024, we came together, fueled by an unwavering passion for
                  adventure and a deep-seated commitment to unveiling the
                  splendor of our planet. Our aspiration is to witness the joy
                  of discovery on the faces of those who traverse the globe, and
                  we take pride in extending a helping hand to make each journey
                  unforgettable.
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="why px-sect relative flex flex-col items-center pb-sect-semi pt-sect-default lg:gap-48 2xl:gap-64">
        <img src={airplane1} alt="" className="plane-1 absolute" />
        <img src={airplane2} alt="" className="plane-2 absolute" />
        <img src={airplane3} alt="" className="plane-3 absolute" />
        <h2 className="text-center h3-inter">
          Why?
        </h2>
        <p className="p-large">
          “A paper plane’s journey, however brief, reminds us that <br /> even
          the simplest dreams can take flight.”
        </p>
      </section>
    </main>
  );
};

export default About;
