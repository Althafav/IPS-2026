import React from "react";

import FooterComponent from "./FooterComponent";
import MenuComponent from "./Menu/MenuComponent";

export default function LayoutComponent({ children }: any) {
  return (
    <div className="flex flex-col">
      <MenuComponent />
      <div className="flex-1 min-h-screen">{children}</div>
      <FooterComponent />
    </div>
  );
}
