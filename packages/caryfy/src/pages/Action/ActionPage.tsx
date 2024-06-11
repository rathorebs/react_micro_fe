import { FunctionComponent } from "react";
import KPIItem from "../../components/management/KPIItem";
import Header from "../../components/management/Header";
import Action from "../../components/Action/Action";


const ActionPage: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-surface-bg-primary overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] mq950:max-w-full mq450:max-w-full mq1425:max-w-full mq1900:max-w-full">
      <div className="w-[3241px] h-[3394px] absolute !m-[0] bottom-[-427px] left-[-745px] flex items-center justify-center z-[0]">
        <img
          className="w-full h-full object-contain absolute left-[0px] top-[231px] [transform:scale(1.184)]"
          alt=""
        />
      </div>
      <Header/>
      <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden flex flex-row flex-wrap items-start justify-center py-20 px-5 box-border max-w-full z-[1] mq950:pt-[22px] mq950:pb-[22px] mq950:box-border mq1425:pt-[34px] mq1425:pb-[34px] mq1425:box-border">
        <Action/>
      </div>
      <KPIItem />
    </div>
  );
};

export default ActionPage;
