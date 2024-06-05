import React from "react";
import caryfyTagline from "../../assets/caryfy-tagline1.svg";
import otlrocket1 from "../../assets/otlrocket1.svg";
import otldocuments1 from "../../assets/kpi-items/otldocumenttext1.svg";
import ioniconfflashoutline1 from "../../assets/ioniconfflashoutline1.svg";
import ioniconcchatboxoutline1 from "../../assets/ioniconcchatboxoutline1.svg";
import ioniconccalendaroutline1 from "../../assets/ioniconccalendaroutline1.svg";
import otlgrid1 from "../../assets/otlgrid1.svg";
import image_18812x from "../../assets/image-1881@2x.png";
import ioniconcchevrondown1 from "../../assets/ioniconcchevrondown1.svg";

const Header = () => {
  return (
    <header className="self-stretch bg-app-background box-border flex flex-row items-center justify-center pt-2 px-5 pb-1.5 top-[0] z-[99] fixed w-full text-left text-sm text-headings font-base-md-regular border-b-[1px] border-solid border-stroke-light">
      <div className="w-[1331px] flex flex-row items-center justify-start gap-[24px] max-w-[1392px] mq1425:max-w-full">
        <div className="flex flex-row items-center justify-start">
          <img
            className="h-8 w-[110.1px] relative"
            loading="lazy"
            alt=""
            src={caryfyTagline}
          />
        </div>
        <div className="h-8 flex-1 flex flex-row items-center justify-start gap-[8px] max-w-full">
          <div className="h-8 hidden flex-row items-center justify-center p-2 box-border gap-[4px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 hidden"
              alt=""
              src={otlrocket1}
            />
            <b className="relative">Actions</b>
          </div>
          <div className="h-8 hidden flex-row items-center justify-center py-2 px-[7px] box-border gap-[4px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 hidden"
              alt=""
              src={otldocuments1}
            />
            <b className="h-[17px] relative inline-block">Reports</b>
          </div>
        </div>
        <div className="hidden flex-row items-center justify-start gap-[8px] text-5xs text-text-text-tertiary">
          <div className="h-8 flex flex-row items-center justify-center py-2 px-1 box-border">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0"
              alt=""
              src={ioniconfflashoutline1}
            />
          </div>
          <div className="h-8 flex flex-row items-center justify-center py-2 px-1 box-border relative gap-[8px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 z-[0]"
              alt=""
              src={ioniconcchatboxoutline1}
            />
            <div className="h-3 w-3 !m-[0] absolute top-[0px] right-[0px] rounded-77xl bg-error flex flex-col items-center justify-center py-[5px] px-[3px] box-border z-[1]">
              <b className="relative">2</b>
            </div>
          </div>
          <div className="h-8 flex flex-row items-center justify-center py-2 px-1 box-border">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0"
              alt=""
              src={ioniconccalendaroutline1}
            />
          </div>
        </div>
        <div className="rounded-8xs hidden flex-row items-center justify-center py-2 px-0 gap-[7px] text-base">
          <div className="h-8 w-8 rounded-181xl bg-headings flex flex-row items-center justify-center py-2 px-[7px] box-border">
            <img
              className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
              alt=""
              src={otlgrid1}
            />
          </div>
          <b className="h-[19px] relative inline-block whitespace-nowrap">
            Caryfy Apps
          </b>
        </div>
        <div className="rounded-lg bg-stroke-light flex flex-row items-center justify-start py-1 px-2 gap-[8px]">
          <img
            className="h-10 w-10 relative object-cover"
            alt=""
            src={image_18812x}
          />
          <img
            className="h-4 w-4 relative overflow-hidden shrink-0"
            alt=""
            src={ioniconcchevrondown1}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
