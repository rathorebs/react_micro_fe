import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import ContainerPlanOfcare from "../../components/management/ContainerPlanOfCare";
import KPIItem from "../../components/management/KPIItem";

const OnBoardplanOfcare: FunctionComponent = () => {
    return (
      <div className="w-full relative bg-text-text-tertiary overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] mq950:max-w-full mq1900:max-w-full mq450:max-w-full mq1425:max-w-full">
      <Header />
      <section className="self-stretch bg-gray-100 overflow-hidden flex flex-row flex-wrap items-start justify-center relative gap-[24px_22px] max-w-full" style={{ paddingTop: "60px" }}>
        <img
          className="h-[3394px] w-[3241px] absolute !m-[0] top-[-889px] left-[-745px]"
          alt=""
        />
        <ContainerPlanOfcare />
      </section>
      <KPIItem />
    </div>
    );
  };

export default OnBoardplanOfcare;