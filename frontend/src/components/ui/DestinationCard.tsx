import React from "react";
import { useNavigate } from "react-router-dom";
import Destination from "src/types/Destination";

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const navigate = useNavigate();
  return (
    <div
      key={destination.name}
      className="destination-card flex w-full cursor-pointer flex-col gap-2"
    >
      <div
        className="relative flex h-[50svh] items-center justify-center rounded-xl bg-gray"
        onClick={() => {
          navigate(`/discover/destinations/${destination._id}`);
        }}
      >
        <img
          src={destination.images[0]}
          alt={destination.name}
          className="h-full w-full rounded-xl"
        />
      </div>
      <div className="flex h-fit flex-col justify-start gap-0">
        <span className="span-regular text-gray">
          {destination.country || "Country"}
        </span>
        <span className="span-medium uppercase">{destination.name}</span>
        <div className="mt-4 flex flex-row items-start justify-start gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="span-small rounded-2xl border-solid border-gray px-4 lg:border 2xl:border-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
