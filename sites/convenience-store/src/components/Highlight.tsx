import React from "react";

type Props = {
  color: string;
  children: React.ReactNode;
};
function Highlight({ color, children }: Props) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: "4px",
        color: "#fff",
        padding: "0.2rem",
      }}
    >
      {children}
    </span>
  );
}

export default Highlight;
