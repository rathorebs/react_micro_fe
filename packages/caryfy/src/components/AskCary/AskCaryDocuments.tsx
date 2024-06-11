import { FunctionComponent } from 'react';
import AskCary from "./AskCary";
import ellipse from "../../assets/ask-cary/ellipse-914@2x.png";

const AskcaryDocuments: FunctionComponent = () => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-[24px] max-w-[1326px] text-left text-xl text-dark-font font-body-reg mq1400:max-w-full">
      <div className="self-stretch flex flex-row items-center justify-start max-w-full">
        <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">Documents</h3>
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[8px_6.7px] max-w-full">
        <AskCary label="Interaction - Client" leftIcon="/lefticon.svg" postIcon="/lefticon.svg" ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" route='/add_interaction' />
        <AskCary label="Interaction - Caregiver" leftIcon="/lefticon.svg" postIcon="/lefticon.svg" ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
        <AskCary label="EDWP Generation" leftIcon="/lefticon.svg" postIcon="/lefticon.svg" ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
        <AskCary label="EDWP Notification Form" leftIcon="/lefticon.svg" postIcon="/lefticon.svg" ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" route='/edwp_notification_form' />
      </div>
      <div className="self-stretch flex flex-row flex-wrap items-center justify-center py-0 pr-[335px] pl-0 box-border gap-[8px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[83px] mq825:box-border mq1400:pr-[167px] mq1400:box-border">
        <AskCary label="Previous Interactions - Client" leftIcon="/lefticon3.svg" postIcon="/lefticon3.svg" ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
        <AskCary label="Previous Interactions - Caregiver" leftIcon="/lefticon3.svg" postIcon="/lefticon3.svg" ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
        <AskCary label="Hospitalization" leftIcon="/lefticon3.svg" postIcon="/lefticon3.svg" ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
      </div>
    </div>
  );
};

export default AskcaryDocuments;