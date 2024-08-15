import React from "react";
import { motion } from "framer-motion";

import planeIcon from "src/assets/svg/plane-icon.svg";


interface ButtonProps {
  text: string;
  onClick: () => void;
}
export const ButtonVariants = {
  buttonHover: {
    y: -3,
    scale: 1.02,
    rotate: -5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
  buttonTap: {
    y: 3,
    scale: 0.98,
    rotate: 5,
    transition: { duration: 0.4, type: "spring", bounce: 0.5 },
  },
};

export const PrimaryButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <motion.button
    whileHover="buttonHover"
    whileTap="buttonTap"
    variants={ButtonVariants}
    className="btn btn-primary" onClick={onClick}>
      {text}
    </motion.button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <motion.button
        whileHover="buttonHover"
        whileTap="buttonTap"
        variants={ButtonVariants}
        className="btn btn-secondary z-10" onClick={onClick}>
        {text} <img src={planeIcon} alt="" />
        </motion.button>
    );
}

export const NoirButton: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <motion.button
        whileHover="buttonHover"
        whileTap="buttonTap"
        variants={ButtonVariants}
        className="btn bg-background-dark uppercase text-text-dark" onClick={onClick}>
        {text} 
        </motion.button>
    );
}
