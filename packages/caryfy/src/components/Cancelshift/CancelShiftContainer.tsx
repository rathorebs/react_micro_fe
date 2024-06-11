import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import InputsNew from "../management/InputsNew";
import dftarrowback from "../../assets/cancel-shift/dftarrowback.svg";
import image_2 from "../../assets/cancel-shift/image@2x.png";

const CancelShiftContainer: FunctionComponent = () => {
    const history = useHistory();

    function handleClick() {
        alert("Shift has been canceled for another client");
    };

    function handleBackClick() {
        history.goBack();
    };

    return (
        <div
            className={`w-[1326px] flex flex-col items-start justify-start gap-[20px] max-w-[1326px] text-left text-xl text-colors-text-black font-body-xs-semi-bold mq1425:max-w-full`}
        >
            <div className="self-stretch flex flex-row items-center justify-start gap-[5px] max-w-full">
                <img
                    className="h-6 w-6 relative overflow-hidden shrink-0 cursor-pointer"
                    loading="lazy"
                    alt=""
                    src={dftarrowback}
                    onClick={handleBackClick}

                />
                <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-[calc(100%_-_29px)] mq450:text-base">
                    Cancel Shift For client
                </h3>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-0.5 pl-0 box-border gap-[20px_18px] max-w-full text-sm text-surface-bg-primary">
                <div className="flex-1 bg-surface-bg-primary flex flex-col items-center justify-end py-5 px-spacing-spacing-xl box-border gap-[30px] min-w-[391px] max-w-full mq450:min-w-full">
                    <div className="w-[914px] overflow-x-auto flex flex-col items-center justify-center py-[89.5px] px-spacing-lg box-border gap-[16px] max-w-full mq950:pt-[58px] mq950:pb-[58px] mq950:box-border">
                        <div className="w-[866px] flex flex-row items-start justify-start py-0 pr-[412px] pl-0 box-border gap-[16px]">
                            <img
                                className="h-[46px] w-[46px] relative rounded-[50%] object-contain"
                                loading="lazy"
                                alt=""
                                src={image_2}
                            />
                            <div className="rounded bg-surface-primary-surface flex flex-col items-start justify-center p-4 box-border whitespace-nowrap max-w-full">
                                <div className="relative">
                                    Hi Shrouk, which client would you like to cancel shift for?
                                </div>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-col items-end justify-center text-colors-text-black">
                            <div className="rounded bg-surface-bg-secondary flex flex-col items-start justify-center p-4 whitespace-nowrap">
                                <div className="relative inline-block min-w-[72px]">
                                    John Smith
                                </div>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-row items-start justify-start gap-[16px]">
                            <img
                                className="h-[46px] w-[46px] relative rounded-[50%] object-contain"
                                loading="lazy"
                                alt=""
                                src={image_2}
                            />
                            <div className="flex-1 rounded bg-surface-primary-surface flex flex-col items-start justify-center p-4 box-border max-w-full">
                                <p className="m-0 self-stretch relative">{`Sure, John Smith Has 1 shift today at 09:00 AM - 12:00 PM with caregiver Uday, Also has 12 shifts in total for the next monthwhich shift you like to cancel? `}</p>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-col items-end justify-center text-colors-text-black">
                            <div className="rounded bg-surface-bg-secondary flex flex-col items-start justify-center p-4 whitespace-nowrap">
                                <div className="relative inline-block min-w-[82px]">
                                    Today’s Shift
                                </div>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-row items-start justify-start py-0 pr-[474px] pl-0 box-border gap-[16px]">
                            <img
                                className="h-[46px] w-[46px] relative rounded-[50%] object-contain"
                                alt=""
                                src={image_2}
                            />
                            <div className="rounded bg-surface-primary-surface flex flex-col items-start justify-center p-4 box-border whitespace-nowrap max-w-full">
                                <p className="m-0 relative">{`Okay then so what’s the reason of cancelation `}</p>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-col items-end justify-center text-colors-text-black">
                            <div className="rounded bg-surface-bg-secondary flex flex-col items-start justify-center p-4 whitespace-nowrap">
                                <div className="relative">Client will not show up</div>
                            </div>
                        </div>
                        <div className="w-[866px] flex flex-row items-start justify-start py-0 pr-[510px] pl-0 box-border gap-[16px]">
                            <img
                                className="h-[46px] w-[46px] relative rounded-[50%] object-contain"
                                alt=""
                                src={image_2}
                            />
                            <div className="rounded bg-surface-primary-surface flex flex-col items-start justify-center p-4">
                                <p className="m-0 relative">
                                    <span className="block whitespace-pre-wrap">{`Great! your shift was canceled  `}</span>
                                    <span className="block whitespace-pre-wrap">
                                        would you like to make another actions ?
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col items-center justify-start py-0 px-[50px] gap-[8px] text-center text-surface-primary-surface mq950:pl-[25px] mq950:pr-[25px] mq950:box-border">
                        {/* <div className="self-stretch rounded-radiuscomponent-button bg-surface-bg-primary flex flex-row items-center justify-center py-2.5 px-5 gap-[12px] border-[2px] border-solid border-surface-primary-surface">
              <div className="relative">
                add another shift for John Smith another shift
              </div>
              <img
                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                alt=""
                src="/post-icon.svg"
              />
            </div> */}
                        <button className="cursor-pointer py-2.5 px-5 bg-white hover:bg-surface-bg-secondary self-stretch rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] border-[2px] border-solid border-surface-primary-surface hover:bg-gainsboro hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={handleClick}>
                            <div className="relative text-sm font-body-xs-semi-bold text-surface-primary-surface text-center">
                                add another shift for John Smith another shift
                            </div>
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src="/post-icon.svg"
                            />
                        </button>
                        <button className="cursor-pointer py-2.5 px-5 bg-white hover:bg-surface-bg-secondary self-stretch rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] border-[2px] border-solid border-surface-primary-surface hover:bg-gainsboro hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={handleClick}>
                            <div className="relative text-sm font-body-xs-semi-bold text-surface-primary-surface text-center">
                                Cancel shift for another client
                            </div>
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src="/post-icon.svg"
                            />
                        </button>
                    </div>
                    <InputsNew contentPlaceholder="How can I help you?" type="text" label="" />
                    {/* <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary box-border overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] max-w-full text-text-text-secondary border-[1px] border-solid border-stroke">
                        <input style={{
                            border: 'none',
                            outline: 'none',

                        }}
                            className="flex-1 relative"
                            type="text"
                            placeholder="How can I help you?"
                        />
                        <img
                            className="h-4 w-4 relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/otlmic.svg"
                        />
                    </div> */}
                </div>
                <div className="w-[328px] flex flex-col items-start justify-start max-w-[328px]">
                    <form className="m-0 self-stretch shadow-[2px_2px_32px_rgba(0,_19,_85,_0.08)] rounded-lg bg-surface-bg-primary box-border flex flex-col items-start justify-start py-3.5 px-[15px] gap-[16px] min-w-[328px] border-[1px]  border-solid border-surface-border">
                        <button className="cursor-pointer py-2.5 px-5  bg-white hover:bg-surface-bg-secondary self-stretch rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] whitespace-nowrap border-[2px] border-solid border-surface-primary-surface hover:bg-gainsboro hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={handleClick}>
                            <div className="relative text-sm font-body-xs-semi-bold text-surface-primary-surface text-center inline-block min-w-[106px]">
                                DO IT MANUALLY
                            </div>
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src="/post-icon.svg"
                            />
                        </button>
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                                    <div className="self-stretch flex flex-row items-center justify-start py-px px-0">
                                        <b className="flex-1 relative text-base font-body-xs-semi-bold text-colors-text-black text-left">
                                            Shifts
                                        </b>
                                    </div>
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className=" cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Add Shift - Client
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Add Shift - Prospect
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Update Shift - Client
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Update Shift - Caregiver
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Cancel Shift - Client
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Delete Shift
                                            </b>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Shift With Exceptions
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">{`Clients Reminders `}</b>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">{`View Reminders `}</b>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Alerts
                                            </b>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Unpreferred Caregiver
                                            </b>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-start justify-start">
                                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                                    <div className="self-stretch flex flex-row items-center justify-start py-px px-0">
                                        <b className="flex-1 relative text-base font-bold font-body-xs-semi-bold text-colors-text-black text-left">
                                            Documents
                                        </b>
                                    </div>
                                    <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Interaction - Client
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                Interaction - Caregiver
                                            </div>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <b className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                EDWP Generation
                                            </b>
                                        </div>
                                        <div className="self-stretch rounded-radius-sm bg-surface-bg-primary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px]  border-solid border-surface-border">
                                            <div className="cursor-pointer flex-1 relative text-sm font-semibold font-body-xs-semi-bold text-colors-text-black text-left">
                                                EDWP Notification Form
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-end pt-[159px] px-0 pb-0">
                            <InputsNew contentPlaceholder="How can I help you?" type="text" label="" />
                            {/* <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-surface-bg-primary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] whitespace-nowrap border-[1px] border-solid border-stroke">
                                <input style={{
                                    border: 'none',
                                    outline: 'none',

                                }}
                                    className="flex-1 relative"
                                    type="text"
                                    placeholder="How can I help you?"
                                />
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0"
                                    alt=""
                                    src="/otlmic.svg"
                                />
                            </div> */}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CancelShiftContainer;
