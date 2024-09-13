import React, { memo } from "react";
import { placeToEat, placeToStay, placeToVisit } from "src/types/Destination";
import bookingImg from "src/assets/images/ui/destination/booking.png";
import agodaImg from "src/assets/images/ui/destination/agoda-light.png";
import tripadvisorImg from "src/assets/images/ui/destination/tripadvisor-light.png";

type PlaceDialogProps = {
  place: placeToEat | placeToStay | placeToVisit;
  category: string;
};

const PlaceDialog: React.FC<PlaceDialogProps> = ({ place, category }) => {
  const renderDialogContent = () => {
    switch (category) {
      case "to_stay":
        return <PlaceToStayDialog place={place as placeToStay} />;
      case "to_visit":
        return <PlaceToVisitDialog place={place as placeToVisit} />;
      case "to_eat":
        return <PlaceToEatDialog place={place as placeToEat} />;
      default:
        return null;
    }
  };

  return <>{renderDialogContent()}</>;
};

const PlaceToStayDialog: React.FC<{ place: placeToStay }> = ({ place }) => {
  const { name, type, image_url, description, location, price, rating } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="flex flex-col gap-4 px-8">
        <DialogHeader name={name} type={type} rating={rating} />
        <DialogLocation location={location} />
        <DialogPrice price={price} />
        <p className="p-regular mt-4 pb-sect-short">{description}</p>
      </div>
    </DialogWrapper>
  );
};

const PlaceToVisitDialog: React.FC<{ place: placeToVisit }> = ({ place }) => {
  const { name, type, image_url, description, location } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="mt-4 flex flex-col gap-4 px-8">
        <DialogHeader name={name} type={type} />
        <DialogLocation location={location} />
        <p className="p-regular mt-4">{description}</p>
      </div>
    </DialogWrapper>
  );
};

const PlaceToEatDialog: React.FC<{ place: placeToEat }> = ({ place }) => {
  const { name, type, image_url, description, location, price, rating } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="flex flex-col gap-4 px-8">
        <DialogHeader name={name} type={type} rating={rating} />
        <DialogLocation location={location} />
        <DialogPrice price={price} />
        <p className="p-regular mt-4">{description}</p>
      </div>
    </DialogWrapper>
  );
};

const DialogWrapper: React.FC<{
  name: string;
  image_url: string;
  children: React.ReactNode;
}> = ({ name, image_url, children }) => (
  <dialog
    hidden
    data-name={name}
    className="place-dialog h-[75svh] w-[60svw] overflow-y-scroll rounded-xl pb-8"
  >
    <div className="dialog-content h-full w-full">
      <div
        className="h-1/3"
        style={{
          backgroundImage: `url(${image_url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      {children}
    </div>
  </dialog>
);

const DialogHeader: React.FC<{
  name: string;
  type: string;
  rating?: Record<string, number>;
}> = ({ name, type, rating }) => (
  <div className="mt-4 flex justify-between">
    <div className="flex flex-col gap-2">
      <span className="span-small uppercase text-gray">{type}</span>
      <h3 className="h3-md">{name}</h3>
    </div>
    {rating && (
      <div className="grid grid-cols-2 items-center justify-end gap-x-2 gap-y-4 lg:w-2/5 2xl:w-1/3">
        {Object.entries(rating).map(([website, rating]) => (
          <div
            key={website}
            className="flex h-12 flex-row items-center gap-4 rounded-xl bg-background-light px-4 py-2 shadow-component only:col-start-2"
          >
            <img
              src={
                website === "booking.com"
                  ? bookingImg
                  : website === "agoda"
                    ? agodaImg
                    : tripadvisorImg
              }
              className="max-h-full max-w-[66.66%]"
              alt=""
            />
            <span className="span-regular flex items-center gap-2">
              {rating}{" "}
              <i className="ri-shining-2-fill span-small text-yellow"></i>
            </span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const DialogLocation: React.FC<{
  location: { on_map: string; address: string };
}> = ({ location }) => (
  <div className="mt-4 flex items-center gap-2">
    <i className="p-medium ri-map-pin-2-line"></i>
    <a className="span-regular border-none outline-none" href={location.on_map}>
      {location.address}
    </a>
  </div>
);

const DialogPrice: React.FC<{ price: { currency: string; value: number } }> = ({
  price,
}) => (
  <div className="flex items-center gap-2">
    <i className="p-medium ri-price-tag-3-line"></i>
    <span className="span-regular">
      From: {" " + price.currency + " - " + price.value}
    </span>
  </div>
);

export default memo(PlaceDialog);
