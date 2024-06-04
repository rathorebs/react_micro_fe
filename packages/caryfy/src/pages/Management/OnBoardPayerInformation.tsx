import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import ContainerForPayerInfo from "../../components/management/ContainerForPayerInfo";
import KPIItem from "../../components/management/KPIItem";

const OnBoardPayerInformation: FunctionComponent = () => {
    return (
      <div className="m-0 w-full relative bg-text-text-tertiary overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] mq950:max-w-full mq1900:max-w-full mq450:max-w-full mq1425:max-w-full ">
        <Header />
        <div className="self-stretch bg-gray-100 overflow-hidden flex flex-row flex-wrap items-start justify-center relative gap-[24px_22px] max-w-full " style={{ paddingTop: "60px" }}>
          <img
            className="h-[3394px] w-[3241px] absolute !m-[0] top-[-889px] left-[-745px]"
            alt=""
          />
          <ContainerForPayerInfo />
        </div>
        <KPIItem />
      </div>
    );
  };

export default OnBoardPayerInformation;