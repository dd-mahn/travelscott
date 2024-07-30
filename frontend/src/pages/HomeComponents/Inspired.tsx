import React from "react";

const Inspired: React.FC = () => {
  return (
    <section className="px-sect inspired flex items-center justify-center lg:pb-sect-semi lg:pt-sect-default 2xl:pb-sect-semi 2xl:pt-sect-medium">
      <div className="relative flex w-fit flex-col lg:gap-2 xl:gap-2 2xl:gap-4 3xl:gap-4">
        <div className="blob blur-blob absolute z-0 h-full w-1/2"></div>
        <h1 className="h2-inter text-center leading-normal tracking-tight">
          We got inspired by travelers of <br />
          <span className="text-main-green">20</span>+ countries around the
          world
        </h1>
        <span className="p-medium self-end">(Maybe you are one)</span>
      </div>
    </section>
  );
};

export default Inspired;
