import React from "react";

export default function UnderlineButton({ title, link }) {
  return (
    <a href={link} className="bg-inherit underline__btn">
      {title} <i class="ri-arrow-right-up-line"></i>
    </a>
  );
}
