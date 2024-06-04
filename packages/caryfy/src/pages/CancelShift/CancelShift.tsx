import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import CancelShiftContainer from "../../components/Cancelshift/CancelShiftContainer";

const CancelShift: FunctionComponent = () => {
    return (
      <div className="w-full relative bg-surface-bg-primary overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] mq450:max-w-full mq950:max-w-full mq1425:max-w-full mq1900:max-w-full">
        <img
          className="w-[3241px] h-[2505px] absolute !m-[0] top-[64px] left-[-745px]"
          alt=""
        />
        <Header />
        <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-row flex-wrap items-start justify-center py-20 px-5 box-border max-w-full z-[1] mq950:pt-[34px] mq950:pb-[34px] mq950:box-border mq1425:pt-[52px] mq1425:pb-[52px] mq1425:box-border" style={{ paddingTop: "80px" }}>
          <CancelShiftContainer />
        </div>
        <KPIItem />
      </div>
    );
  };
  
  export default CancelShift;
  