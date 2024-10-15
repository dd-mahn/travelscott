import React, { memo } from "react";
import { motion } from "framer-motion";
import { placeToEat, placeToStay, placeToVisit } from "src/types/Destination";
import bookingImg from "src/assets/images/ui/destination/booking.png";
import agodaImg from "src/assets/images/ui/destination/agoda-light.png";
import tripadvisorImg from "src/assets/images/ui/destination/tripadvisor-light.png";
import { HoverVariants, VisibilityVariants } from "src/utils/variants";

// Define animation variants
const variants = {
  hidden: VisibilityVariants.hidden,
  hiddenY: VisibilityVariants.hiddenY,
  visible: VisibilityVariants.visible,
  hoverScale: HoverVariants.hoverScale,
  hoverX: HoverVariants.hoverX,
  hoverRotate: HoverVariants.hoverRotate,
};

// Define the props for the PlaceDialog component
type PlaceDialogProps = {
  place: placeToEat | placeToStay | placeToVisit;
  category: string;
};

// Main component to render the dialog based on the category
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

// Component to render the dialog for "to_stay" category
const PlaceToStayDialog: React.FC<{ place: placeToStay }> = ({ place }) => {
  const { name, type, image_url, description, location, price, rating } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="flex flex-col gap-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <DialogHeader name={name} type={type} rating={rating} />
        <DialogLocation location={location} />
        <DialogPrice price={price} />
        <p className="p-regular mt-4 pb-4 sm:pb-6 md:pb-sect-short">
          {description}
        </p>
      </div>
    </DialogWrapper>
  );
};

// Component to render the dialog for "to_visit" category
const PlaceToVisitDialog: React.FC<{ place: placeToVisit }> = ({ place }) => {
  const { name, type, image_url, description, location } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="mt-4 flex flex-col gap-4 px-2 sm:px-4 md:px-6 lg:px-8">
        <DialogHeader name={name} type={type} />
        <DialogLocation location={location} />
        <p className="p-regular mt-4">{description}</p>
      </div>
    </DialogWrapper>
  );
};

// Component to render the dialog for "to_eat" category
const PlaceToEatDialog: React.FC<{ place: placeToEat }> = ({ place }) => {
  const { name, type, image_url, description, location, price, rating } = place;
  return (
    <DialogWrapper name={name} image_url={image_url}>
      <div className="flex flex-col gap-4 px-4 sm:px-4 md:px-6 lg:px-8">
        <DialogHeader name={name} type={type} rating={rating} />
        <DialogLocation location={location} />
        <DialogPrice price={price} />
        <p className="p-regular mt-4">{description}</p>
      </div>
    </DialogWrapper>
  );
};

// Wrapper component for the dialog
const DialogWrapper: React.FC<{
  name: string;
  image_url: string;
  children: React.ReactNode;
}> = ({ name, image_url, children }) => (
  <motion.dialog
    open={true}
    className="place-dialog custom-scrollbar h-[85svh] w-[90vw] overflow-y-scroll rounded-xl pb-8 sm:w-[80vw] md:w-[60svw]"
  >
    <motion.div
      className="dialog-content h-full w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="h-2/5 bg-gradient-to-t from-blue-gray-900 to-gray">
        <img
          src={image_url}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      {children}
    </motion.div>
  </motion.dialog>
);

// Component to render the header of the dialog
const DialogHeader: React.FC<{
  name: string;
  type: string;
  rating?: Record<string, number>;
}> = ({ name, type, rating }) => (
  <div className="mt-4 flex flex-col gap-2 lg:gap-4">
    <div className="flex flex-col lg:gap-2">
      <motion.span
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="span-small uppercase text-gray"
      >
        {type}
      </motion.span>
      <motion.h3
        variants={variants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
        className="h3-md"
      >
        {name}
      </motion.h3>
    </div>
    {rating && (
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 items-center justify-start gap-x-2 gap-y-4">
        {Object.entries(rating).map(([website, rating], index) => (
          <motion.div
            key={website}
            variants={variants}
            initial="hidden"
            animate="visible"
            whileHover="hoverRotate"
            transition={{ duration: 0.3 }}
            className="flex h-8 sm:h-10 lg:h-12 items-center gap-4 sm:gap-8 rounded-xl bg-background-light px-2 shadow-component dark:shadow-component-dark"
          >
            <div className="h-full p-1 grid place-items-center">
              <img
                src={
                  website === "booking.com"
                    ? bookingImg
                    : website === "agoda"
                      ? agodaImg
                      : tripadvisorImg
                }
                className="h-full w-auto max-h-full max-w-full"
                alt=""
              />
            </div>

            <span className="span-regular flex items-center gap-2">
              {rating}{" "}
              <i className="ri-shining-2-fill span-small text-yellow"></i>
            </span>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

// Component to render the location of the place
const DialogLocation: React.FC<{
  location: { on_map: string; address: string };
}> = ({ location }) => (
  <motion.div
    className="mt-4 flex items-center gap-2"
    initial="hidden"
    animate="visible"
    whileHover="hoverX"
    variants={variants}
    transition={{ duration: 0.5 }}
  >
    <i className="p-medium ri-map-pin-2-line"></i>
    <a
      className="span-regular cursor-hover border-none underline outline-none md:no-underline"
      href={location.on_map}
    >
      {location.address}
    </a>
  </motion.div>
);

// Component to render the price of the place
const DialogPrice: React.FC<{ price: { currency: string; value: number } }> = ({
  price,
}) => (
  <motion.div
    className="flex items-center gap-2"
    initial="hidden"
    animate="visible"
    variants={variants}
    transition={{ duration: 0.5 }}
  >
    <i className="p-medium ri-price-tag-3-line"></i>
    <span className="span-regular">
      From: {" " + price.currency + " - " + price.value}
    </span>
  </motion.div>
);

export default memo(PlaceDialog);
