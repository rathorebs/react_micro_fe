import { FunctionComponent } from "react";
import InputsNew from "../management/InputsNew";
import InputsDropdown from "../management/InputsDropdown";

const timeOptions = ["AM", "PM"];
const clientOptions = ["White,Rachel", "White,Rachel"];

const EditShift: FunctionComponent = () => {

    function handleClick() {
        alert("Button clicked!");
    }

    return (
        <div
            className={`self-stretch rounded-radius-radius-lg bg-surface-bg-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] max-w-full text-left text-sm text-colors-text-black font-body-xs-semi-bold mq825:pt-[21px] mq825:pb-[21px] mq825:box-border `}
        >
            <div className="w-full flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                <b className="self-stretch relative font-semibold">Client</b>
                <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0 box-border max-w-full">
                    <div className="flex-1 flex flex-row items-center justify-start max-w-full">
                        {/* <div className="flex-1 relative inline-block max-w-full">
              White, Rachel
            </div> */}
                        <input
                            className="w-full [border:none] [outline:none] bg-[transparent] flex-1 flex flex-row items-center justify-start max-w-full"
                            placeholder=" White, Rachel"
                            type="text"
                        />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <b className="self-stretch relative">prior authorization</b>
                <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[728px] pl-0 gap-[16px] mq450:pr-5 mq450:box-border mq825:pr-[182px] mq825:box-border mq1400:pr-[364px] mq1400:box-border">
                    <div className="flex flex-row items-center justify-start gap-[8px]">
                        <div className="relative inline-block min-w-[67px]">Start Date</div>
                        <b className="relative font-semibold inline-block min-w-[80px]">
                            04-29-2024
                        </b>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[8px]">
                        <div className="relative inline-block min-w-[59px]">End Date</div>
                        <b className="relative font-semibold inline-block min-w-[80px]">
                            04-29-2024
                        </b>
                    </div>
                    <div className="flex-1 flex flex-row items-center justify-start gap-[8px] min-w-[80px]">
                        <div className="relative">Authorized Hours per week </div>
                        <b className="relative font-semibold inline-block min-w-[18px]">
                            20
                        </b>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <b className="self-stretch relative font-bold">Anticipated Schedule </b>
                <div className="self-stretch flex flex-row items-center justify-start">
                    <div className="relative">
                        Monday, Wednesday, Friday - 9 am to 2 pm, 5 hrs each day
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[476px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[119px] mq825:box-border mq1400:pr-[238px] mq1400:box-border">
                {/* <Inputs label="Start Date" /> */}
                <InputsNew label="Start Date*" contentPlaceholder="" type="datetime-local" />
                <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">

                    <InputsNew label="Time" contentPlaceholder="09" type="text" />

                    <div className="flex-1 flex flex-row items-center justify-start">

                        <InputsNew label="" contentPlaceholder="30" type="text" />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">

                        <InputsDropdown label="" placeHolder="AM" options={timeOptions} />
                        {/* </div>  */}
                    </div>
                </div>


                {/* <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px] text-text-text-secondary">
                    <div className="w-[60px] flex flex-col items-start justify-start gap-[8px] text-colors-text-black">
                        <b className="self-stretch relative font-semibold">Time</b>
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 pr-4 pl-[15px] text-text-text-secondary border-[1px] border-solid border-stroke">
                            <div className="w-[27px] flex flex-row items-center justify-start">
                                <input
                                    className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                    placeholder="09"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[60px] flex flex-col items-start justify-start">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px] border-solid border-stroke">
                            <div className="flex-1 flex flex-row items-center justify-start">
                                <input
                                    className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                    placeholder="30"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px] border-solid border-stroke">
                            <div className="flex flex-row items-center justify-start gap-[8px]">
                                <div className="relative inline-block min-w-[24px]">AM</div>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 object-contain"
                                    alt=""
                                    src="/dropdownbutton@2x.png"
                                />
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
                        <b className="self-stretch relative font-semibold">Duration</b>
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px] border-solid border-stroke">
                            <input
                                className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                placeholder="5"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">
                        <div className="self-stretch h-[19px] relative font-semibold hidden">
                            Label
                        </div>
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px] border-solid border-stroke">
                            <input
                                className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                placeholder="00"
                                type="text"
                            />
                        </div>
                    </div>
                </div> */}
                <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">

                    <InputsNew label="Duration" contentPlaceholder="5" type="text" />
                    <div className="flex-1 flex flex-col items-start justify-start gap-[8px]">

                        <InputsNew label="" contentPlaceholder="00" type="text" />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[708px] pl-0 box-border gap-[16px] max-w-full text-text-text-secondary mq450:pr-5 mq450:box-border mq825:pr-[177px] mq825:box-border mq1400:pr-[354px] mq1400:box-border">
                {/* <Inputs label="End Date" /> */}
                <InputsNew label="End Date*" contentPlaceholder="" type="datetime-local" />
                <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">

                    <InputsNew label="Time" contentPlaceholder="09" type="text" />

                    <div className="flex-1 flex flex-row items-center justify-start">

                        <InputsNew label="" contentPlaceholder="30" type="text" />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">

                        <InputsDropdown label="" placeHolder="AM" options={timeOptions} />
                        {/* </div>  */}
                    </div>
                </div>
                {/* <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                    <div className="w-[60px] flex flex-col items-start justify-start gap-[8px] text-colors-text-black">
                        <b className="self-stretch relative font-semibold">Time</b>
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0 text-text-text-secondary">
                            <div className="flex-1 flex flex-row items-center justify-start">
                                <input
                                    className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                    placeholder="09"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[60px] flex flex-col items-start justify-start">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0">
                            <div className="flex-1 flex flex-row items-center justify-start">
                                <input
                                    className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-xs-semi-bold text-sm text-text-text-secondary min-w-[43px]"
                                    placeholder="30"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0">
                            <div className="flex-1 flex flex-row items-center justify-start">
                                <div className="flex-1 relative">AM</div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-0.5 pl-0 box-border gap-[16px_14px] max-w-full">
                {/* <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                    <b className="self-stretch relative font-semibold">Caregiver</b>
                    <div className="self-stretch flex flex-col items-start justify-start text-text-text-secondary">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] border-[1px] border-solid border-stroke mq450:flex-wrap">
                            <div className="flex-1 flex flex-row items-center justify-start min-w-[173px]">
                                <div className="flex-1 relative">Brown, Sarah</div>
                            </div>
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 object-contain"
                                alt=""
                                src="/dropdownbutton@2x.png"
                            />
                        </div>
                    </div>
                </div> */}
                 <InputsDropdown label="Caregiver" placeHolder="White,Rachel" options={clientOptions} />
                <div className="flex-[0.9827] rounded-lg flex flex-row items-center justify-start p-2 box-border min-w-[370px] max-w-full">
                    <p className="m-0 flex-1 relative inline-block max-w-full">
                        She is living 3 miles away from White, Rachel and speaks Spanish.
                    </p>
                </div>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-center justify-end py-0 pr-0 pl-[984px] gap-[8px] mq450:pl-5 mq450:box-border mq825:pl-[246px] mq825:box-border mq1400:pl-[492px] mq1400:box-border">
                <button className="cursor-pointer py-2.5 px-[42px] bg-surface-bg-primary flex-1 rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[88px] border-[2px] border-solid border-surface-primary-surface hover:bg-gainsboro hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={handleClick}>
                    <div className="relative text-sm font-body-xs-semi-bold text-surface-primary-surface text-center inline-block min-w-[46px]">
                        Cancel
                    </div>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src="/post-icon.svg"
                    />
                </button>
                <button className="cursor-pointer [border:none] py-[12.5px] px-[51px] bg-surface-primary-surface rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue" onClick={handleClick}>
                    <div className="relative text-sm font-body-xs-semi-bold text-surface-bg-primary text-center inline-block min-w-[32px]">
                        Save
                    </div>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src="/post-icon1.svg"
                    />
                </button>
            </div>
        </div>
    );
};

export default EditShift;
