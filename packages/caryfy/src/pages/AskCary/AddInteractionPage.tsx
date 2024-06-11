import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import dftarrowback from "../../assets/delete-shift/dftarrowback.svg";
import AddInteraction from "../../components/AskCary/AddInteraction";
import { useHistory } from "react-router-dom";

const AddInteractionPage: FunctionComponent = () => {
    const history = useHistory()

    function onBackClick() {
        history.push('/askcary')
    }

    return (
        <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] text-left text-xl text-dark-font font-body-reg">
            <Header />
            <div className="self-stretch bg-gray-100 overflow-hidden flex flex-col items-center justify-start relative gap-[24px] min-h-[953px] max-w-full" style={{ paddingTop: "150px" }}>
                <img
                    className="w-[3241px] h-[3394px] absolute !m-[0] top-[-889px] left-[-745px]"
                    alt=""
                />
                <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[24px] max-w-[1366px] z-[1] mq1400:max-w-full">
                    <div className="self-stretch flex flex-row items-center justify-start gap-[5px] max-w-full">
                        <img
                            className="cursor-pointer h-6 w-6 relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src={dftarrowback}
                            onClick={onBackClick}
                        />
                        <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit whitespace-pre-wrap inline-block max-w-[calc(100%_-_29px)] mq450:text-base">{`Add Interaction  `}</h3>
                    </div>
                    <AddInteraction />
                </div>
            </div>
            <KPIItem />
        </div>
    );
};

export default AddInteractionPage;
