import React from "react";

export const Warning = (props) => {
  const { color, fill, font } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      color={`${color ? color : "none"}`}
      fill={`${fill ? fill : "none"}`}
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className={`${font === "small" ? "w-4 h-4" : "w-6 h-6"}`}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
      />
    </svg>
  );
};
