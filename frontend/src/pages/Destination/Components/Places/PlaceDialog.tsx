import React, { memo } from "react";
import { motion } from "framer-motion";
import {
  placeToEat,
  placeToStay,
  placeToVisit,
  Rating,
} from "src/types/Destination";
import bookingImg from "src/assets/images/ui/destination/booking.png";
import agodaImg from "src/assets/images/ui/destination/agoda-light.png";
import tripadvisorImg from "src/assets/images/ui/destination/tripadvisor-light.png";
import {
  HoverVariants,
  VisibilityVariants,
} from "src/utils/constants/variants";
import { Link } from "react-router-dom";
import OptimizedImage from "src/common/OptimizedImage/OptimizedImage";

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
  // Function to render dialog content based on category
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
        <DialogHeader
          name={name}
          type={type}
          rating={rating as unknown as Rating[]}
        />
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
        <DialogHeader
          name={name}
          type={type}
          rating={rating as unknown as Rating[]}
        />
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
    className="place-dialog custom-scrollbar h-[85svh] w-[90vw] overflow-y-scroll rounded-xl bg-background-light pb-8 dark:bg-background-dark sm:w-[80vw] md:w-[60svw]"
  >
    <motion.div
      className="dialog-content h-full w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="image-suspense h-2/5">
        <OptimizedImage src={image_url} alt={name} className="h-full w-full" />
      </div>
      {children}
    </motion.div>
  </motion.dialog>
);

// Component to render the header of the dialog
const DialogHeader: React.FC<{
  name: string;
  type: string;
  rating?: Rating[];
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
      <div className="grid grid-cols-2 items-center justify-start gap-x-2 gap-y-4 md:grid-cols-3 2xl:grid-cols-4">
        {rating.map(({ website, value, link }) => (
          <Link to={link} target="_blank" key={link}>
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              whileHover="hoverRotate"
              transition={{ duration: 0.3 }}
              className="flex h-8 items-center gap-4 rounded-xl bg-background-light px-2 shadow-component dark:bg-gray dark:shadow-component-dark sm:h-10 sm:gap-8 lg:h-12"
            >
              <div className="grid h-full place-items-center p-1">
                <img
                  src={
                    website === "booking.com"
                      ? bookingImg
                      : website === "agoda"
                        ? agodaImg
                        : tripadvisorImg
                  }
                  className="h-full max-h-full w-auto max-w-full"
                  alt=""
                />
              </div>

              <span className="span-regular flex items-center gap-2">
                {value}{" "}
                <i className="ri-shining-2-fill span-small text-yellow dark:text-yellow"></i>
              </span>
            </motion.div>
          </Link>
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
    className="cursor-hover mt-4 flex items-center gap-2"
    initial="hidden"
    animate="visible"
    whileHover="hoverX"
    variants={variants}
    transition={{ duration: 0.5 }}
  >
    <i className="p-medium ri-map-pin-2-line"></i>
    <Link
      className="span-regular border-none underline outline-none md:no-underline"
      to={location.on_map}
      target="_blank"
    >
      {location.address}
    </Link>
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

export default PlaceDialog;
