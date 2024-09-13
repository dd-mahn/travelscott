import React from "react";
import { motion } from "framer-motion";

import planeIcon from "src/assets/svg/plane-icon.svg";
import { Link } from "react-router-dom";
import { ButtonVariants } from "src/utils/variants";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  link?: string;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  link,
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
          >
            {text}
            <motion.img
              whileHover={{ x: 3 }}
              transition={{ duration: 0.3 }}
              src={planeIcon}
              alt=""
              className="cursor-hover-small"
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
        >
          {text}{" "}
          <motion.img
            whileHover={{ x: 3 }}
            transition={{ duration: 0.3 }}
            src={planeIcon}
            alt=""
            className="cursor-hover-small"
          />
        </motion.button>
      )}
    </>
  );
};

export const NoirButton: React.FC<ButtonProps> = ({ text, onClick, link }) => {
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
        >
          {text}
        </motion.button>
      )}
    </>
  );
};
