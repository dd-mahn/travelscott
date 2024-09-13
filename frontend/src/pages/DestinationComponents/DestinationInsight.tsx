import React, { memo } from "react";
import RelatedSections from "src/common/RelatedSections";
import DestinationType from "src/types/Destination";

type DestinationInsightProps = {
  destination: DestinationType;
};

const DestinationInsight: React.FC<DestinationInsightProps> = ({
  destination,
}) => {
  const renderTips = () =>
    destination.insight?.from_us?.tips.map((tip, index) => (
      <div
        className="rounded-xl bg-background-light bg-opacity-70 px-6 py-4 shadow-component"
        key={index}
      >
        <p className="p-medium text-text-light">{tip}</p>
      </div>
    ));

  const renderArticles = () =>
    destination.insight?.from_others?.map((article, index) => (
      <div
        className="rounded-xl bg-background-light bg-opacity-70 px-6 py-2 shadow-component"
        key={index}
      >
        <a
          href={article.link}
          className="p-medium text-center"
          target="_blank"
          rel="noreferrer"
        >
          {article.title} <i className="ri-arrow-right-up-line p-large"></i>
        </a>
      </div>
    ));

  return (
    <section
      id="insight"
      className="insight px-sect sticky flex flex-col gap-20 rounded-3xl bg-light-brown pb-sect-default pt-sect-short shadow-section"
    >
      <h1 className="h1-md">
        <i className="ri-eye-fill"></i>Insight
      </h1>

      <div className="flex flex-col items-center gap-8">
        <h2 className="h2-md">From us</h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-8">{renderTips()}</div>
        <RelatedSections type={"blog"} data={destination} />
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="h2-md">From others</h2>
        <p className="p-regular w-2/5">
          Leveraging others’ travel experiences and insights can save you time
          and money by helping you avoid common mistakes. It also provides
          practical tips and recommendations that enhance your trip, making it
          more enjoyable and stress-free. Additionally, learning from others’
          experiences can inspire you and give you a clearer idea of what to
          expect.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">{renderArticles()}</div>
      </div>
    </section>
  );
};

export default memo(DestinationInsight);
