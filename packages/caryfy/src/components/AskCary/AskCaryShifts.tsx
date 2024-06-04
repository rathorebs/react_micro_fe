import { FunctionComponent } from "react";
import AskCary from "./AskCary";
import lefticon from "../../assets/ask-cary/lefticon.svg";
import ellipse from "../../assets/ask-cary/ellipse-914@2x.png";
import lefticon3 from "../../assets/ask-cary/lefticon3.svg";


const AskCaryShifts: FunctionComponent = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start gap-[24px] max-w-[1326px] text-left text-xl text-dark-font font-body-reg mq1400:max-w-full">
        <div className="self-stretch flex flex-row items-center justify-start max-w-full">
          <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">Shifts</h3>
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[8px_6.7px] min-h-[256px] max-w-full text-sm">
          <AskCary label="Add Shift - Client" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible />
          <AskCary label="Add Shift - Prospect" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="none" />
          <AskCary label="Update Shift - Assessor" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Update Shift - Caregiver" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Cancel Shift - Client" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Delete Shift" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Shift With Exceptions" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Approve Shifts" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Clients Reminders " leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="View Reminders " leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Alerts" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
          <AskCary label="Unpreferred Caregiver" leftIcon={lefticon} postIcon={lefticon} ellipse914={ellipse} showFrameDiv frameDivVisible propPadding="0px 165px 0px 0px" propHeight="unset" propTextDecoration="unset" />
        </div>
        <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[335px] pl-0 box-border gap-[8px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[83px] mq825:box-border mq1400:pr-[167px] mq1400:box-border">
          <AskCary label="Preferred Caregiver" leftIcon={lefticon3} postIcon={lefticon3} ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
          <AskCary label="Open Shift Broadcast" leftIcon={lefticon3} postIcon={lefticon3} ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
          <AskCary label="Shift Errors" leftIcon={lefticon3} postIcon={lefticon3} ellipse914={ellipse} showFrameDiv={false} frameDivVisible={false} propPadding="unset" propHeight="24px" propTextDecoration="unset" />
        </div>
      </div>
    );
  };
  
  export default AskCaryShifts;