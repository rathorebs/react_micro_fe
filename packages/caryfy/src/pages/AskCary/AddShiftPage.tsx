import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import AddShift from "../../components/AskCary/AddShift";
import dftarrowback from "../../assets/ask-cary/dftarrowback.svg";
import { useHistory } from "react-router-dom";

const AddShiftPage: FunctionComponent = () => {
    const history = useHistory();

    function handleBackClick() {
        history.goBack();
    };
  return (
    <div className="w-full relative bg-surface-bg-primary overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] text-left text-xl text-colors-text-black font-body-xs-semi-bold">
      <Header />
      <div className="self-stretch bg-gray overflow-hidden flex flex-col items-center justify-start relative gap-[24px] min-h-[1443px] max-w-full" style={{ paddingTop: "80px" }}>
        <img
          className="w-[3241px] h-[3394px] absolute !m-[0] top-[-889px] left-[-745px]"
          alt=""
        />
        <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[24px] max-w-[1366px] z-[1] mq1400:max-w-full">
          <div className="self-stretch flex flex-row items-center justify-start gap-[5px] max-w-full">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src={dftarrowback}
              onClick={handleBackClick}
            />
            <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-[calc(100%_-_29px)] mq450:text-base">{`Add Shift `}</h3>
          </div>
          <AddShift />
        </div>
      </div>
      <KPIItem />
    </div>
  );
};

export default AddShiftPage;
