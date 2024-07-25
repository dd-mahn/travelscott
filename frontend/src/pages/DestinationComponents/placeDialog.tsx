import React from "react";
import { placeToEat, placeToStay, placeToVisit } from "src/types/Destination";
import bookingImg from "src/assets/images/ui/destination/booking.png";
import agodaImg from "src/assets/images/ui/destination/agoda-light.png";
import tripadvisorImg from "src/assets/images/ui/destination/tripadvisor-light.png";

type placeDialogProps = {
  place: placeToEat | placeToStay | placeToVisit;
  category: string;
};
const PlaceDialog: React.FC<placeDialogProps> = ({ place, category }) => {
  if (category === "to_stay") return placeToStayDialog(place as placeToStay);
  if (category === "to_visit") return placeToVisitDialog(place as placeToVisit);
  if (category === "to_eat") return placeToEatDialog(place as placeToEat);
  return <></>;
};

const placeToStayDialog = (place: placeToStay) => {
  const { name, type, image_url, description, location, price, rating } = place;
  return (
    <dialog
      hidden
      data-name={name}
      className="place-dialog h-0.75svh w-0.6svw overflow-y-scroll rounded-xl pb-sect-short"
    >
      <div className="dialog-content h-full w-full">
        <div
          className="h-1/2"
          style={{
            backgroundImage: `url(${image_url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex flex-col gap-4 px-8">
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-2">
              <span className="span-small uppercase text-gray">{type}</span>
              <h3 className="h3-md">{name}</h3>
            </div>
            <div className="grid lg:w-2/5 2xl:w-1/3 grid-cols-2 items-center justify-end gap-x-2 gap-y-4">
              {Object.entries(rating).map(([website, rating]) => (
                <div
                  key={website}
                  className="flex only:col-start-2 h-12 flex-row items-center gap-4 rounded-xl bg-background-light px-4 py-2 shadow-component"
                >
                  <img
                    src={
                      website === "booking.com"
                        ? bookingImg
                        : website === "agoda"
                          ? agodaImg
                          : tripadvisorImg
                    }
                    className="max-w-2/3 max-h-full"
                    alt=""
                  />
                  <span className="span-regular flex items-center gap-2">
                    {rating}{" "}
                    <i className="ri-shining-2-fill span-small text-yellow"></i>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <i className="p-medium ri-map-pin-2-line"></i>
            <a
              className="span-regular border-none outline-none"
              href={location.on_map}
            >
              {location.address}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <i className="p-medium ri-price-tag-3-line"></i>
            <span className="span-regular">
              From: {" " + price.currency + " - " + price.value}
            </span>
          </div>

          <p className="p-regular mt-4 pb-sect-short">{description}</p>
        </div>
      </div>
    </dialog>
  );
};

const placeToVisitDialog = (place: placeToVisit) => {
  const { name, type, image_url, description, location, tips } = place;
  return (
    <dialog
      hidden
      data-name={name}
      className="place-dialog h-0.75svh w-0.6svw overflow-y-scroll rounded-xl pb-8"
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

        <div className="flex flex-col gap-4 px-8 mt-4">
          <div className="flex flex-col gap-2">
            <span className="span-small uppercase text-gray">{type}</span>
            <h3 className="h3-md">{name}</h3>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <i className="p-medium ri-map-pin-2-line"></i>
            <a
              className="span-regular border-none outline-none"
              href={location.on_map}
            >
              {location.address}
            </a>
          </div>

          <p className="p-regular mt-4">{description}</p>
        </div>
      </div>
    </dialog>
  );
};

const placeToEatDialog = (place: placeToEat) => {
  const {
    name,
    type,
    image_url,
    description,
    location,
    price,
    favorites,
    rating,
  } = place;
  return (
    <dialog
      hidden
      data-name={name}
      className="place-dialog h-0.75svh w-0.6svw overflow-y-scroll rounded-xl pb-8"
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

        <div className="flex flex-col gap-4 px-8">
          <div className="mt-4 flex justify-between">
            <div className="flex flex-col gap-2">
              <span className="span-small uppercase text-gray">{type}</span>
              <h3 className="h3-md">{name}</h3>
            </div>
            <div className="grid justify-content-end items-center w-1/3 grid-cols-2 gap-x-2 gap-y-4">
              {Object.entries(rating).map(([website, rating]) => (
                <div
                  key={website}
                  className="flex only:col-start-2 h-12 flex-row items-center gap-4 rounded-xl bg-background-light px-4 py-2 shadow-component"
                >
                  <img
                    src={
                      website === "booking.com"
                        ? bookingImg
                        : website === "agoda"
                          ? agodaImg
                          : tripadvisorImg
                    }
                    className="max-w-2/3 max-h-full"
                    alt=""
                  />
                  <span className="span-regular flex items-center gap-2">
                    {rating}{" "}
                    <i className="ri-shining-2-fill span-small text-yellow"></i>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <i className="p-medium ri-map-pin-2-line"></i>
            <a
              className="span-regular border-none outline-none"
              href={location.on_map}
            >
              {location.address}
            </a>
          </div>

          <div className="flex items-center gap-2">
            <i className="p-medium ri-price-tag-3-line"></i>
            <span className="span-regular">
              From: {" " + price.currency + " - " + price.value}
            </span>
          </div>

          <p className="p-regular mt-4">{description}</p>
        </div>
      </div>
    </dialog>
  );
};

export default PlaceDialog;
