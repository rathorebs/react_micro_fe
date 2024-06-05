import { FunctionComponent } from "react";
import Stack from "./Stack";
import { useHistory } from "react-router-dom";

const rows = [
    "Ambulation Assist",
    "Assist with Ambulation - Inside",
    "Place Phone or ERS before leaving",
    "Ambulation Assist",
    "Assist with Ambulation - Inside",
    "Place Phone or ERS before leaving"
];

const ContainerPlanOfcare: FunctionComponent = () => {
    const history = useHistory();

    function payerinfoClick() {
        history.push('/onBoard');
    };

    function handleNextClick() {
        history.push('/agency');
    };

    return (
        <div
            className={`flex-1 flex flex-row flex-wrap items-start justify-start py-0 px-5 box-border gap-[24px_22px] max-w-[1366px] z-[1] text-left text-xl text-text-text-primary font-body-reg mq1425:max-w-full`}
        >
            <div className="w-[1286px] flex flex-row items-center justify-start max-w-full">
                <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">
                    Onboarding
                </h3>
            </div>
            <div className="flex-1 rounded-radius-radius-lg bg-text-text-tertiary flex flex-col items-start justify-start p-4 box-border min-w-[328px] max-w-[328px] text-base text-text-text-tertiary">
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-text-text-primary">
                    <div className="w-10 rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px] box-border">
                        <div className="relative capitalize inline-block min-w-[9px]">
                            1
                        </div>
                    </div>
                    <div className="flex-1 relative text-sm cursor-pointer" onClick={payerinfoClick}>Payer Information</div>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-stroke" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="rounded-45xl bg-main-blue flex flex-col items-center justify-center py-[9px] px-[15px]">
                        <div className="relative capitalize inline-block min-w-[10px]">
                            2
                        </div>
                    </div>
                    <b className="flex-1 relative text-text-text-primary cursor-pointer">Plan of Care</b>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-stroke" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-text-text-primary">
                    <div className="w-10 rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px] box-border">
                        <div className="relative capitalize inline-block min-w-[9px]">
                            3
                        </div>
                    </div>
                    <div className="flex-1 relative text-sm cursor-pointer" onClick={handleNextClick}>Agency Information</div>
                </div>
            </div>
            <div className="flex-[0.966] rounded-radius-radius-lg bg-surface-bg-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] min-w-[925px] max-w-full text-sm mq950:pt-[21px] mq950:pb-[21px] mq950:box-border mq1425:min-w-full">
                <div className="self-stretch flex flex-row items-start justify-start max-w-full text-base">
                    <b className="flex-1 relative inline-block max-w-full">
                        Plan of Care
                    </b>
                </div>
                <Stack heading="Ambulation" rows={rows}  initialOpen={true}/>
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <Stack heading="Ambulation" rows={rows} />
                <div className="self-stretch flex flex-col items-end justify-center mq950:items-center mq950:justify-center mq950:pb-20 mq950:box-border">
                    <button className="cursor-pointer [border:none] py-[12.5px] px-[52px] bg-main-blue rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue" onClick={handleNextClick}>
                        <div className="relative text-sm font-body-reg text-text-text-tertiary text-center inline-block min-w-[31px]">
                            Next
                        </div>
                        {/* <img
                            className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                            alt=""
                            src="/post-icon1.svg"
                        /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContainerPlanOfcare