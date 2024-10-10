import React from "react";
import { motion } from "framer-motion";

import planeIcon from "src/assets/svg/plane-icon.svg";
import { Link } from "react-router-dom";
import { ButtonVariants } from "src/utils/variants";
import { type } from "os";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  link?: string;
  type?: "button" | "submit" | "reset";
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  type
}) => {
  return (
    <>
      {link ? (
        <Link to={link} target="_top">
          <motion.button
            whileHover="buttonHover"
            whileTap="buttonTap"
            variants={ButtonVariants}
            className="btn btn-primary z-20"
            type={type}
            onClick={onClick ? onClick : undefined}
          >
            {text}
          </motion.button>
        </Link>
      ) : (
        <motion.button
          whileHover="buttonHover"
          whileTap="buttonTap"
          variants={ButtonVariants}
          className="btn btn-primary z-20"
          onClick={onClick ? onClick : undefined}
          type={type}
        >
          {text}
        </motion.button>
      )}
    </>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
  type
}) => {
  return (
    <>
      {link ? (
        <Link to={link} target="_top">
          <motion.button
            whileHover="buttonHover"
            whileTap="buttonTap"
            variants={ButtonVariants}
            className="btn btn-secondary z-20"
            onClick={onClick ? onClick : undefined}
            type={type}
          >
            {text}
            <motion.img
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
              src={planeIcon}
              alt=""
              className="cursor-hover-small dark:invert w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
            />
          </motion.button>
        </Link>
      ) : (
        <motion.button
          whileHover="buttonHover"
          whileTap="buttonTap"
          variants={ButtonVariants}
          className="btn btn-secondary z-20"
          onClick={onClick ? onClick : undefined}
          type={type}
        >
          {text}{" "}
          <motion.img
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
            src={planeIcon}
            alt=""
            className="cursor-hover-small dark:invert w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6"
          />
        </motion.button>
      )}
    </>
  );
};

export const NoirButton: React.FC<ButtonProps> = ({ text, onClick, link, type }) => {
  return (
    <>
      {link ? (
        <Link to={link} target="_top">
          <motion.button
            whileHover="buttonHover"
            whileTap="buttonTap"
            variants={ButtonVariants}
            className="btn z-20 bg-background-dark uppercase text-text-dark"
            onClick={onClick ? onClick : undefined}
            type={type}
          >
            {text}
          </motion.button>
        </Link>
      ) : (
        <motion.button
          whileHover="buttonHover"
          whileTap="buttonTap"
          variants={ButtonVariants}
          className="btn z-20 bg-background-dark uppercase text-text-dark"
          onClick={onClick ? onClick : undefined}
          type={type}
        >
          {text}
        </motion.button>
      )}
    </>
  );
};
