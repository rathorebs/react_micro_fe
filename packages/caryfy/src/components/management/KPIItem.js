import React, { useState } from "react";
import otlhome3 from "../../assets/kpi-items/otlhome3.svg";
import otlhome2 from "../../assets/kpi-items/otlhome2.svg";
import ioniconfflashoutline5 from "../../assets/kpi-items/ioniconfflashoutline5.svg";
import ioniconfflashoutline4 from "../../assets/kpi-items/ioniconfflashoutline4.svg";
import robot_13 from "../../assets/kpi-items/robot-13.svg";
import robot_12 from "../../assets/kpi-items/robot-12.svg";
import ioniconcchatboxoutline from "../../assets/kpi-items/ioniconcchatboxoutline.svg";
import ioniconcchatboxoutline2 from "../../assets/kpi-items/ioniconcchatboxoutline2.svg";
import otldocumenttext1 from "../../assets/kpi-items/otldocumenttext1.svg";
import otldocumenttext2 from "../../assets/kpi-items/otldocumenttext2.svg";
import otlgrid5 from "../../assets/kpi-items/otlgrid5.svg";
import otlgrid4 from "../../assets/kpi-items/otlgrid4.svg";
import { useHistory } from "react-router-dom";

const KPIItem = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const history = useHistory();

  const items = [
    {
      name: "Dashboard",
      icon: otlhome3,
      selectedIcon: otlhome2,
      route: "/dash",
    },
    {
      name: "Actions",
      icon: ioniconfflashoutline5,
      selectedIcon: ioniconfflashoutline4,
      route: "/",
    },
    {
      name: "Ask Cary",
      icon: robot_13,
      selectedIcon: robot_12,
      route: "/askcary",
    },
    {
      name: "Messages",
      icon: ioniconcchatboxoutline,
      selectedIcon: ioniconcchatboxoutline2,
      route: "/",
    },
    {
      name: "Reports",
      icon: otldocumenttext1,
      selectedIcon: otldocumenttext2,
      route: "/",
    },
    { name: "Cary Apps", icon: otlgrid5, selectedIcon: otlgrid4, route: "/" },
  ];

  return (
    <div className="w-[415px] !m-[0] absolute bottom-[-0.2px] left-[calc(50%_-_192px)] shadow-[0px_4px_32px_#bdc2cc] rounded-lg bg-whitesmoke flex flex-row items-center justify-center p-4 box-border gap-[8px] min-w-[144px] z-[2] text-center text-5xs text-text-text-primary font-body-reg">
      {items.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            setSelectedItem(item.name);
            history.push(item.route);
          }}
          className={`cursor-pointer [border:none] p-2 flex-1 rounded-lg flex flex-col items-center justify-center gap-[8px] ${
            selectedItem === item.name
              ? "bg-main-blue text-text-text-tertiary"
              : "bg-transparent text-text-text-primary"
          } hover:bg-dodgerblue mq450:w-[calc(100%_-_40px)]`}
        >
          <img
            className="w-6 h-6 relative overflow-hidden shrink-0"
            alt=""
            src={selectedItem === item.name ? item.selectedIcon : item.icon}
          />
          <b className="relative text-5xs capitalize inline-block font-body-reg text-center min-w-[43px]">
            {item.name}
          </b>
        </button>
      ))}
    </div>
  );
};

export default KPIItem;
