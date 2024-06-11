import { Fragment, FunctionComponent, useState } from "react";
import InputsDropdown from "../management/InputsDropdown";
import InputsNew from "../management/InputsNew";
import { useHistory } from "react-router-dom";

const clientoptions = ["White, Rachel", "Black, Rachel"]
const interactedpersonOptions = ["Brown, Sarah", "Blue, Sarah"]
const timeOptions = ["AM", "PM"]

const AddInteraction: FunctionComponent = () => {
    const history = useHistory()
    const [selectedRadio, setSelectedRadio] = useState('');

    function onCancelClick() {
        history.push('/askcary')
    }

    return (
        <form
            className="m-0 self-stretch rounded-radius-radius-lg bg-light-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] max-w-full mq825:pt-[21px] mq825:pb-[21px] mq825:box-border"
        >
            <InputsDropdown label="Client" options={clientoptions} placeHolder="White, Rachel" />
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[708px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[177px] mq825:box-border mq1400:pr-[354px] mq1400:box-border">
                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                    <InputsNew label="Date" contentPlaceholder="" type="datetime-local" />
                </div>
                <div className="w-[216px] flex flex-row items-end justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                    <div className="w-[60px] flex flex-col items-start justify-start gap-[8px]">
                        <InputsNew label="Time" contentPlaceholder="09" type="text" />
                    </div>
                    <div className="w-[60px] flex flex-col items-start justify-start">
                        <InputsNew label="" contentPlaceholder="30" type="text" />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start">
                        <InputsDropdown label="" placeHolder="AM" options={timeOptions} />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                <b className="self-stretch relative text-sm font-body-reg text-dark-font text-left">
                    Interaction Type
                </b>
                <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[890px] pl-0 gap-[16px] mq450:pr-5 mq450:box-border mq825:pr-[222px] mq825:box-border mq1400:flex-wrap mq1400:pr-[445px] mq1400:box-border">
                    <div className="flex flex-row items-center justify-start gap-[6px]">
                        <input
                            className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="radio"
                            name="radioGroup-1"
                            onChange={() => setSelectedRadio('changeForm')}
                        />
                        <div className="relative text-sm font-body-reg text-dark-font text-left inline-block min-w-[102px]">
                            ( Change ) form
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[6px]">
                        <input
                            className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="radio"
                            name="radioGroup-1"
                            onChange={() => setSelectedRadio('phoneCall')}
                        />
                        <div className="relative text-sm font-body-reg text-main-blue text-left inline-block min-w-[67px]">
                            Phone call
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[6px]">
                        <input
                            className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="radio"
                            name="radioGroup-1"
                            onChange={() => setSelectedRadio('visit')}
                        />
                        <a className="[text-decoration:none] relative text-sm font-body-reg text-dark-font text-left inline-block min-w-[28px]">
                            Visit
                        </a>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[6px]">
                        <input
                            className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="radio"
                            name="radioGroup-1"
                            onChange={() => setSelectedRadio('notes')}
                        />
                        <div className="relative text-sm font-body-reg text-dark-font text-left inline-block min-w-[39px]">
                            Notes
                        </div>
                    </div>
                </div>
            </div>
            {selectedRadio === 'phoneCall' && (
                <Fragment>
                    <InputsDropdown label="Interacted Person" options={interactedpersonOptions} placeHolder="Brown, Sarah" />
                    <InputsDropdown label="Category" options={interactedpersonOptions} placeHolder="Changes to Care plan (task)" />
                </Fragment>
            )}
            {selectedRadio === 'changeForm' && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                    <b className="self-stretch relative text-sm font-body-reg text-dark-font text-left">Service Issues</b>
                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[74px] pl-0 box-border gap-[8px_16px] min-h-[73px] mq1400:pr-[37px] mq1400:box-border">
                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Request for service increase</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Request for service decrease</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Failure to pay cost share</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Missed visit(s)
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Services initiated
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Client termination
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                respite care plans utilized this quarter
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Requested provider change</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Health/Safety Issue
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Client out of home
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Request for information</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Admission to Rehab/NH</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Request for PA info/PA update</div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">
                                Scheduled day surgery/no hospital admission
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="checkbox"
                            />
                            <div className="relative text-base font-body-reg text-dark-font text-left inline-block">Other</div>
                        </div>
                    </div>
                </div>
            )}
            <div className="self-stretch flex flex-row flex-wrap items-center justify-start max-w-full">
                <InputsNew label="Notes" contentPlaceholder="Add Note" type="text" />
            </div>
            <footer className="self-stretch flex flex-row flex-wrap items-center justify-end py-0 pr-0 pl-[984px] gap-[8px] mq450:pl-5 mq450:box-border mq825:pl-[246px] mq825:box-border mq1400:pl-[492px] mq1400:box-border">
                <button className="cursor-pointer py-2.5 px-[42px] bg-white flex-1 rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[88px] border-[2px] border-solid border-main-blue hover:bg-gainsboro-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={onCancelClick}>
                    <a className="[text-decoration:none] relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[46px]">
                        Cancel
                    </a>
                </button>
                <button className="cursor-pointer [border:none] py-[12.5px] px-[51px] bg-main-blue rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue" onClick={onCancelClick}>
                    <div className="relative text-sm font-body-reg text-white text-center inline-block min-w-[32px]">
                        Save
                    </div>
                </button>
            </footer>
        </form>
    );
};

export default AddInteraction;
