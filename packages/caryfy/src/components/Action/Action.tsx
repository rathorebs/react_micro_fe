import { FunctionComponent } from "react";
import posticon from "../../assets/Action/posticon.svg";
import otlcirclealert from "../../assets/Action/otlcirclealert.svg";
import otlalarm from "../../assets/Action/otlalarm.svg";
import otllocation from "../../assets/Action/otllocation.svg";
import otltriangle from "../../assets/Action/otltriangle.svg";
import otltimer from "../../assets/Action/otltimer.svg";
import InputsDropdown from "../management/InputsDropdown";

const Action: FunctionComponent = () => {
    const ActionOptions = ["Today", "Tomorrow"];

    function handleClick() {
        alert('Button clicked!');
    };

    function handleReset() {
        alert("Reset the Form");
    }

    return (
        <div
            className={`w-[1326px] flex flex-col items-start justify-start gap-[20px] max-w-[1326px] text-left text-xl text-colors-text-black font-body-xs-semi-bold mq1425:max-w-full `}
        >
            <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq1425:flex-wrap">
                <h2 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block min-w-[59px] max-w-full mq450:text-base">
                    Actions
                </h2>
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0 text-sm text-text-text-secondary">
                    <div className="relative">{`Updated 4 mins. ago `}</div>
                </div>
                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-spacing-spacing-sm bg-surface-primary-surface rounded-radius-radius-sm flex flex-row items-start justify-start gap-[4px]" onClick={handleReset}>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src="/lefticon.svg"
                    />
                    <div className="relative text-sm font-body-xs-semi-bold text-surface-bg-primary text-center inline-block min-w-[39px]">
                        Reset
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                        <img
                            className="w-4 h-4 relative overflow-hidden shrink-0"
                            alt=""
                            src={posticon}
                        />
                    </div>
                </button>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-0.5 pl-0 box-border gap-[20px_18px] max-w-full text-base">
                <div className="flex-1 flex flex-col items-start justify-start gap-[20px] min-w-[328px] max-w-full">
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq950:flex-wrap">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[6px] min-w-[546px] max-w-full mq950:min-w-full">
                                <img
                                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                    loading="lazy"
                                    alt=""
                                    src={otlcirclealert}
                                />
                                <b className="flex-1 relative inline-block max-w-[calc(100%_-_30px)]">
                                    Alert
                                </b>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border">
                                <b className="relative font-semibold inline-block min-w-[34px]">
                                    Today
                                </b>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain min-h-[16px]"
                                    alt=""
                                    src="/otlchevronforward@2x.png"
                                />
                            </div> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-2xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.6px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    loading="lazy"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[60px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[112px] whitespace-nowrap">
                                        12:00pm - 02:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[68px]">
                                        Clock In/Out
                                    </div>
                                    <div className="flex-1 relative font-semibold inline-block min-w-[68px] whitespace-nowrap">
                                        12:00pm - 2:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                                    <div className="self-stretch relative">Notes</div>
                                    <div className="self-stretch relative text-xs text-colors-text-black">
                                        Id id quisque ultricies donec
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch rounded-radius-radius-sm bg-surface-bg-primary flex flex-row items-start justify-center py-spacing-spacing-xs px-5 gap-[4px] text-center text-sm text-surface-primary-surface">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <button
                                        className="relative inline-block min-w-[44px] text-blue-400 bg-transparent border-none text-[14px]" onClick={handleClick}
                                    >
                                        Modify
                                    </button>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq950:flex-wrap">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[6px] min-w-[546px] max-w-full mq950:min-w-full">
                                <img
                                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                    loading="lazy"
                                    alt=""
                                    src={otlalarm}
                                />
                                <b className="flex-1 relative inline-block max-w-[calc(100%_-_30px)]">
                                    Missed Clock Ins
                                </b>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border">
                                <b className="relative font-semibold inline-block min-w-[34px]">
                                    Today
                                </b>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain min-h-[16px]"
                                    alt=""
                                    src="/otlchevronforward@2x.png"
                                />
                            </div> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-2xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.6px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
                                    <div className="flex-1 relative inline-block min-w-[65px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative text-xs font-semibold text-surface-error inline-block min-w-[83px]">
                                        Not Clocked in
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start">
                                    <div className="flex-1 relative">Clock In/Out</div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                                    <div className="self-stretch relative">Notes</div>
                                    <div className="self-stretch relative text-xs text-colors-text-black">
                                        Id id quisque ultricies donec
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-5 bg-surface-bg-primary self-stretch rounded-radius-radius-sm flex flex-row items-start justify-center gap-[4px]">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <button
                                        className="relative inline-block min-w-[44px] text-blue-400 bg-transparent border-none text-[14px]" onClick={handleClick}
                                    >
                                        Modify
                                    </button>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq950:flex-wrap">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[6px] min-w-[546px] max-w-full mq950:flex-wrap mq950:min-w-full">
                                <img
                                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                    alt=""
                                    src={otlalarm}
                                />
                                <div className="flex-1 flex flex-col items-start justify-start pt-px px-0 pb-0 box-border min-w-[526px] max-w-full mq950:min-w-full">
                                    <b className="self-stretch relative">Missed Clock Out</b>
                                </div>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border">
                                <b className="relative font-semibold inline-block min-w-[34px]">
                                    Today
                                </b>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain min-h-[16px]"
                                    alt=""
                                    src="/otlchevronforward@2x.png"
                                />
                            </div> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-2xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.5px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[60px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[112px] whitespace-nowrap">
                                        12:00pm - 02:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq450:flex-wrap">
                                    <div className="flex-1 relative inline-block min-w-[50px]">
                                        Clock In/Out
                                    </div>
                                    <div className="relative text-xs font-semibold text-surface-error inline-block min-w-[94px]">
                                        Not Clocked Out
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-5 bg-surface-bg-primary self-stretch rounded-radius-radius-sm flex flex-row items-start justify-center gap-[4px]">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <div className="relative text-sm font-body-xs-semi-bold text-surface-primary-surface text-center inline-block min-w-[44px]">
                                        Modify
                                    </div>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq950:flex-wrap">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[6px] min-w-[546px] max-w-full mq950:flex-wrap mq950:min-w-full">
                                <img
                                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                    loading="lazy"
                                    alt=""
                                    src={otllocation}
                                />
                                <div className="flex-1 flex flex-col items-start justify-start pt-px px-0 pb-0 box-border min-w-[526px] max-w-full mq950:min-w-full">
                                    <b className="self-stretch relative">Geo Location Alert</b>
                                </div>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border">
                                <b className="relative font-semibold inline-block min-w-[34px]">
                                    Today
                                </b>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain min-h-[16px]"
                                    alt=""
                                    src="/otlchevronforward@2x.png"
                                />
                            </div> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-2xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.6px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[60px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[112px] whitespace-nowrap">
                                        12:00pm - 02:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[68px]">
                                        Clock In/Out
                                    </div>
                                    <div className="flex-1 relative font-semibold inline-block min-w-[68px] whitespace-nowrap">
                                        12:00pm - 2:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-col items-start justify-center">
                                    <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
                                        <div className="w-[122px] flex flex-row items-center justify-start gap-[4px]">
                                            <div className="flex-1 relative">Clock in dist.</div>
                                            <b className="relative text-xs font-semibold text-surface-error inline-block min-w-[39px]">
                                                0.25 m
                                            </b>
                                        </div>
                                        <div className="flex flex-row items-center justify-start">
                                            <div className="flex flex-row items-center justify-start gap-[4px]">
                                                <div className="relative inline-block min-w-[79px]">
                                                    Clock out dist.
                                                </div>
                                                <b className="relative text-xs font-semibold text-surface-error inline-block min-w-[39px]">
                                                    0.25 m
                                                </b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-5 bg-surface-bg-primary self-stretch rounded-radius-radius-sm flex flex-row items-start justify-center gap-[4px]">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <button
                                        className="relative inline-block min-w-[44px] text-blue-400 bg-transparent border-none text-[14px]" onClick={handleClick}
                                    >
                                        Modify
                                    </button>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[16px] max-w-full mq950:flex-wrap">
                            <div className="flex-1 flex flex-row items-start justify-start gap-[6px] min-w-[546px] max-w-full mq950:flex-wrap mq950:min-w-full">
                                <img
                                    className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                    loading="lazy"
                                    alt=""
                                    src={otltriangle}
                                />
                                <div className="flex-1 flex flex-col items-start justify-start pt-px px-0 pb-0 box-border min-w-[526px] max-w-full mq950:min-w-full">
                                    <b className="self-stretch relative">Shift With Exceptions</b>
                                </div>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border">
                                <b className="relative font-semibold inline-block min-w-[34px]">
                                    Today
                                </b>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain min-h-[16px]"
                                    alt=""
                                    src="/otlchevronforward@2x.png"
                                />
                            </div> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-2xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.6px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[60px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[112px] whitespace-nowrap">
                                        12:00pm - 02:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-xs text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[68px]">
                                        Clock In/Out
                                    </div>
                                    <div className="flex-1 relative font-semibold inline-block min-w-[68px] whitespace-nowrap">
                                        12:00pm - 2:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-col items-start justify-start gap-[4px]">
                                    <div className="self-stretch relative">Notes</div>
                                    <div className="self-stretch relative text-xs text-colors-text-black">
                                        Id id quisque ultricies donec
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-5 bg-surface-bg-primary self-stretch rounded-radius-radius-sm flex flex-row items-start justify-center gap-[4px]">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <button
                                        className="relative inline-block min-w-[44px] text-blue-400 bg-transparent border-none text-[14px]" onClick={handleClick}
                                    >
                                        Modify
                                    </button>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-surface-bg-primary flex flex-col items-start justify-start p-6 box-border gap-[16px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-start gap-[6px] max-w-full mq950:flex-wrap">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                loading="lazy"
                                alt=""
                                src={otltimer}
                            />
                            <div className="flex-1 flex flex-col items-start justify-start pt-px pb-0 pr-2.5 pl-0 box-border min-w-[533px] max-w-full mq950:min-w-full">
                                <b className="self-stretch relative">{`Early & Late Clock In/Out`}</b>
                            </div>
                            {/* <div className="w-[74px] rounded-sm box-border flex flex-row items-start justify-start py-0.5 px-[7px] gap-[8px] text-xs border-[1px] border-solid border-surface-border"> */}
                            {/* <b className="relative font-semibold inline-block min-w-[34px]">
                  Today
                </b> */}
                            <div>
                                <InputsDropdown label="" placeHolder="Today" options={ActionOptions} />
                            </div>


                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start text-xs text-text-text-secondary">
                            <div className="w-[299px] rounded box-border overflow-hidden shrink-0 flex flex-col items-start justify-start pt-3.5 px-[15px] pb-2 gap-[7.5px] border-[1px] border-solid border-surface-border">
                                <div className="flex flex-row items-center justify-start gap-[8px] text-2xs mq450:flex-wrap">
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[31px]">
                                            Client
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[11px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[96px]">
                                                Moore, Elizabeth
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start justify-center">
                                        <div className="relative inline-block min-w-[50px]">
                                            Caregiver
                                        </div>
                                        <div className="flex flex-row items-center justify-start py-0 pr-[31px] pl-0 gap-[4px] text-xs text-colors-text-black">
                                            <b className="relative font-semibold inline-block min-w-[76px]">
                                                Brown, Sarah
                                            </b>
                                            <div className="h-[18px] w-[18px] rounded-31xl flex flex-row items-end justify-start p-[3px] box-border">
                                                <img
                                                    className="h-3 w-3 relative overflow-hidden shrink-0"
                                                    alt=""
                                                    src="/dftcall.svg"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-colors-text-black mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[60px]">
                                        Scheduled Time
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[112px] whitespace-nowrap">
                                        12:00pm - 02:00pm
                                    </div>
                                    <div className="relative font-semibold inline-block min-w-[62px]">
                                        (2 H 0 Min)
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] text-surface-error mq450:flex-wrap">
                                    <div className="flex-1 relative text-2xs text-text-text-secondary inline-block min-w-[66px]">
                                        Clock In/Out
                                    </div>
                                    <div className="flex-1 relative font-semibold inline-block min-w-[71px] whitespace-nowrap">
                                        12:30pm - 01:00pm
                                    </div>
                                    <b className="relative font-semibold inline-block min-w-[57px]">
                                        (30mins.)
                                    </b>
                                </div>
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <div className="self-stretch h-px relative box-border opacity-[0.05] border-t-[1px] border-solid border-colors-text-black" />
                                <button className="cursor-pointer [border:none] py-spacing-spacing-xs px-5 bg-surface-bg-primary self-stretch rounded-radius-radius-sm flex flex-row items-start justify-center gap-[4px]">
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                    <button
                                        className="relative inline-block min-w-[44px] text-blue-400 bg-transparent border-none text-[14px]" onClick={handleClick}
                                    >
                                        Modify
                                    </button>
                                    <img
                                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src="/lefticon1.svg"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 rounded-lg flex flex-col items-start justify-start gap-[20px] min-w-[328px] max-w-[328px] text-sm">
                    <div className="self-stretch rounded-radius-md bg-surface-bg-primary flex flex-col items-start justify-start py-3.5 px-[15px] gap-[8px] border-[1px] border-solid border-surface-border">
                        <b className="self-stretch relative text-base">Actions</b>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Alerts</div>
                            <div className="relative inline-block min-w-[22px]">0/2</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Missed Clock Ins</div>
                            <div className="relative inline-block min-w-[19px]">1/3</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Missed Clock Out</div>
                            <div className="relative inline-block min-w-[22px]">4/4</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Geo Location Alert</div>
                            <div className="relative inline-block min-w-[22px]">2/5</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">{`Shift With Exception `}</div>
                            <div className="relative inline-block min-w-[23px]">2/9</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">{`Early & Late Clock In/Out`}</div>
                            <div className="relative inline-block min-w-[23px]">2/9</div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-radius-md bg-surface-bg-primary flex flex-col items-start justify-start py-3.5 px-[15px] gap-[8px] border-[1px] border-solid border-surface-border">
                        <b className="self-stretch relative text-base font-bold">{`Summary `}</b>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Pending Clock In</div>
                            <div className="relative inline-block min-w-[9px]">5</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Pending Clock out</div>
                            <div className="relative inline-block min-w-[16px]">97</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Requested Time Edit</div>
                            <div className="relative inline-block min-w-[16px]">24</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Authorized hours</div>
                            <div className="relative inline-block min-w-[25px]">300</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Scheduled Hours</div>
                            <div className="relative inline-block min-w-[24px]">275</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Actual Hours</div>
                            <div className="relative inline-block min-w-[24px]">275</div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Pending Hours</div>
                            <div className="relative text-surface-error inline-block min-w-[17px]">
                                25
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-radius-md bg-surface-bg-primary flex flex-col items-start justify-start py-3.5 px-[15px] gap-[8px] border-[1px] border-solid border-surface-border">
                        <b className="self-stretch relative text-base font-bold">
                            Approvals
                        </b>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Unapproved Visits</div>
                            <div className="relative text-surface-primary-surface inline-block min-w-[9px]">
                                9
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">{`Approved Visits `}</div>
                            <div className="relative text-surface-primary-surface inline-block min-w-[17px]">
                                29
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row items-center justify-start py-[0.5px] px-0 gap-[8px]">
                            <div className="flex-1 relative">Total Visits</div>
                            <div className="relative text-surface-primary-surface inline-block min-w-[16px]">
                                38
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Action;
