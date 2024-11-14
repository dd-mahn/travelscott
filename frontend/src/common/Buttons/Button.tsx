import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import planeIcon from "src/assets/svg/plane-icon.svg";
import { ButtonVariants } from "src/utils/constants/variants";

// Define the ButtonProps interface for type-checking
interface ButtonProps {
  text: string;
  onClick?: () => void;
  link?: string;
  type?: "button" | "submit" | "reset";
  title?: string;
}

// PrimaryButton component
export const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  type,
  title,
}) => {
  const buttonContent = (
    <motion.button
      whileHover="buttonHover"
      whileTap="buttonTap"
      variants={ButtonVariants}
      className="btn btn-primary z-20"
      type={type}
      onClick={onClick}
      title={title}
    >
      {text}
    </motion.button>
  );

  return link ? (
    <Link to={link}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

// SecondaryButton component
export const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  type,
  title,
}) => {
  const buttonContent = (
    <motion.button
      whileHover="buttonHover"
      whileTap="buttonTap"
      variants={ButtonVariants}
      className="btn btn-secondary z-20"
      title={title}
      type={type}
      onClick={onClick}
    >
      {text}
      <motion.img
        whileHover={{ x: 3 }}
        transition={{ duration: 0.3 }}
        src={planeIcon}
        alt="Plane Icon"
        className="cursor-hover-small h-3 w-3 dark:invert sm:h-4 sm:w-4 lg:h-6 lg:w-6"
      />
    </motion.button>
  );

  return link ? (
    <Link to={link}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

// NoirButton component
export const NoirButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  type,
  title,
}) => {
  const buttonContent = (
    <motion.button
      whileHover="buttonHover"
      whileTap="buttonTap"
      variants={ButtonVariants}
      className="btn z-20 bg-background-dark uppercase text-text-dark"
      type={type}
      onClick={onClick}
      title={title}
    >
      {text}
    </motion.button>
  );

  return link ? (
    <Link to={link}>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};
