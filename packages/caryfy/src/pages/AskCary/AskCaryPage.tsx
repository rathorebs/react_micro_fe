import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import AskcaryDocuments from "../../components/AskCary/AskCaryDocuments";
import AskCaryShifts from "../../components/AskCary/AskCaryShifts";
import ioniconmmicoutline from "../../assets/ask-cary/ioniconmmicoutline.svg";
import InputsNew from "../../components/management/InputsNew";

const AskCaryPage: FunctionComponent = () => {
  return (
    <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] text-left text-sm text-light-font font-body-reg">
      <Header />
      <div className="self-stretch bg-gray-100 overflow-hidden flex flex-col items-center justify-start relative gap-[24px] min-h-[934px] max-w-full" style={{ paddingTop: "60px" }}>
        <div className="w-full flex flex-col items-center justify-start py-0 px-5 box-border gap-[24px] max-w-[1366px] z-[1] mq1400:max-w-full">
          <AskCaryShifts />
          <AskcaryDocuments />
          <InputsNew contentPlaceholder="How can i Help you?" label="" type="text" imgSrc={ioniconmmicoutline} />
        </div>
      </div>
      <KPIItem />
    </div>
  );
};

export default AskCaryPage;