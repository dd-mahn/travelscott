import React from "react";
import { useNavigate } from "react-router-dom";
import Country from "src/types/Country";

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const navigate = useNavigate();
  return (
    <div key={country.name} className="flex h-fit flex-row gap-4">
      <div
        className="flex cursor-pointer items-center justify-center rounded-xl bg-gray lg:h-20 lg:w-32"
        onClick={() => {
          navigate(`countries/${country._id}`);
        }}
      >
        <img
          src={country?.images?.flagImage}
          alt={country.name}
          className="h-full w-full rounded-xl"
        />
      </div>
      <div className="flex h-fit flex-col justify-start gap-0">
        <span className="span-medium">{country.name}</span>
        <span className="span-regular">
          {country.totalDestinations} destinations
        </span>
      </div>
    </div>
  );
};

export default CountryCard;
