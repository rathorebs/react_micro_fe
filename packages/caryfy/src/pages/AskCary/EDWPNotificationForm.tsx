import { FunctionComponent } from "react";
import CheckboxSelection from "../../components/AskCary/EDWPNotificationForm/CheckBoxSelection";
import StackForForm from "../../components/AskCary/EDWPNotificationForm/StackForForm";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import InputsNew from "../../components/management/InputsNew";
import dftarrowback from "../../assets/delete-shift/dftarrowback.svg";

const EDWPNotificationForm: FunctionComponent = () => {
    return (
        <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal] text-left text-xl text-dark-font font-body-reg">
            <Header />
            <div className="self-stretch bg-gray-100 overflow-hidden flex flex-col items-center justify-start relative gap-[24px] max-w-full" style={{ paddingTop: "70px" }}>
                <div className="w-[3241px] h-[3394px] absolute !m-[0] top-[-889px] left-[-745px] flex items-center justify-center z-[0]">
                    <img
                        className="w-full h-full object-contain absolute left-[0px] top-[24px] [transform:scale(1.014)]"
                        alt=""
                    />
                </div>
                <div className="w-full flex flex-col items-start justify-start py-0 px-5 box-border gap-[24px] max-w-[1366px] z-[1] mq1600:max-w-full">
                    <div className="self-stretch flex flex-row items-center justify-start gap-[5px] max-w-full">
                        <img
                            className="cursor-pointer h-6 w-6 relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src={dftarrowback}
                        />
                        <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-[calc(100%_-_29px)] mq450:text-base">
                            ( Change ) form
                        </h3>
                    </div>
                    <div className="self-stretch rounded-radius-radius-lg bg-light-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] max-w-full text-sm mq1275:pt-5 mq1275:pb-5 mq1275:box-border">
                        <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                            <InputsNew label="Client" contentPlaceholder="White, Rachel" type="text" disabled={true} />
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                            <b className="self-stretch relative">
                                EDWP form generated from your interaction
                            </b>
                            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[627px] pl-0 gap-[16px] mq450:pr-5 mq450:box-border mq900:pr-[156px] mq900:box-border mq1275:pr-[313px] mq1275:box-border mq1600:flex-wrap">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    1.
                                </b>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-1"
                                    />
                                    <div className="relative inline-block min-w-[35px]">
                                        Initial
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-1"
                                    />
                                    <div className="relative inline-block min-w-[51px]">
                                        Change
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-1"
                                    />
                                    <div className="relative inline-block min-w-[128px]">
                                        Complaint/Concern
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-2"
                                    />
                                    <div className="relative inline-block min-w-[54px]">
                                        Transfer
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-2"
                                    />
                                    <div className="relative inline-block min-w-[66px]">
                                        Discharge
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[6px]">
                                    <input
                                        className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                        type="radio"
                                        name="radioGroup-2"
                                    />
                                    <div className="relative inline-block min-w-[38px]">
                                        Other
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    2.
                                </b>
                                <InputsNew label="To" contentPlaceholder="Lopez, Ashley" type="text" />
                                <InputsNew label="Date" contentPlaceholder="" type="datetime-local" />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    3.
                                </b>
                                <InputsNew label="From" contentPlaceholder="Happy Home Care" type="text" />
                                <InputsNew label="Phone" contentPlaceholder="(987) 654-3210" type="text" />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    4
                                </b>
                                <InputsNew label="Client" contentPlaceholder="Williams, Michael" type="text" />
                                <InputsNew label="Medicaid" contentPlaceholder="123456789101" type="text" />
                            </div>
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[213px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[53px] mq900:box-border mq1275:pr-[106px] mq1275:box-border">
                                <b className="h-[19px] w-[35px] relative font-bold inline-block shrink-0 opacity-[0]">
                                    4
                                </b>
                                <div className="flex-1 flex flex-row flex-wrap items-start justify-start min-w-[195px] max-w-[322px]">
                                    <div className="flex flex-row items-center justify-start gap-[6px]">
                                        <input
                                            className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                            type="checkbox"
                                        />
                                        <div className="relative"> Check here if new address</div>
                                    </div>
                                </div>
                                <InputsNew label="Address" contentPlaceholder="6391 Elgin St. Celina, Delaware 10299" type="text" />
                                <InputsNew label="Phone" contentPlaceholder="(987) 654-3210" type="text" />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
                            <b className="w-[35px] relative font-bold inline-block shrink-0">
                                5.
                            </b>
                            <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[787px] max-w-full mq1275:min-w-full">
                                <b className="self-stretch relative">Services</b>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[940px] pl-0 gap-[8px_16px] mq450:pr-5 mq450:box-border mq900:pr-[235px] mq900:box-border mq1275:pr-[470px] mq1275:box-border">
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[26px]">
                                                PSS
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[34px]">
                                                PSSX
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[49px]">
                                                CD PSS
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[26px]">
                                                SFC
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[26px]">
                                                ERS
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[25px]">
                                                ALS
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[816px] pl-0 gap-[8px_16px] mq450:pr-5 mq450:box-border mq900:pr-[204px] mq900:box-border mq1275:pr-[408px] mq1275:box-border">
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[28px]">
                                                ADH
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[33px]">
                                                HALF
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[26px]">
                                                Half
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[22px]">
                                                Full
                                            </div>
                                        </div>
                                        <div className="relative inline-block min-w-[47px]">
                                            LEVEL 1
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[49px]">
                                                LEVEL 2
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[31px]">
                                                HDM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[1041px] pl-0 gap-[8px_16px] mq450:pr-5 mq450:box-border mq900:pr-[260px] mq900:box-border mq1275:pr-[520px] mq1275:box-border">
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[27px]">
                                                SNS
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[19px]">
                                                RN
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[26px]">
                                                LPN
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[28px]">
                                                HDS
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start">
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[38px]">
                                                Other
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-light-font">
                            <input
                                className="w-full [border:none] [outline:none] font-semibold font-body-reg text-sm bg-[transparent] self-stretch h-[19px] relative text-dark-font text-left inline-block min-w-[250px] p-0"
                                placeholder="Comments"
                                type="text"
                            />
                            <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-start justify-start pt-spacing-1-and-half px-4 pb-[47px] ">
                                <div className="relative inline-block min-w-[6px]">-</div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    6.
                                </b>
                                <div className="w-[318px] flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <InputsNew label="RN/Staff completed initial evaluation with client" contentPlaceholder="" type="datetime-local" />
                                </div>
                                <div className="flex-1 rounded-lg flex flex-row items-center justify-start p-2 box-border min-w-[570px] max-w-full mq900:min-w-full">
                                    <div className="flex-1 relative inline-block max-w-full">
                                        Must be RN for ALS, ADH and PSS/X
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[213px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[53px] mq900:box-border mq1275:pr-[106px] mq1275:box-border">
                            <b className="h-[19px] w-[35px] relative font-bold inline-block shrink-0 opacity-[0]">
                                6.
                            </b>
                            <CheckboxSelection label="Services were accepted" />
                            <CheckboxSelection label="Services were not accepted" />
                            <InputsNew label="Reason" contentPlaceholder="-" type="text" />
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[889px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[222px] mq900:box-border mq1275:pr-[444px] mq1275:box-border">
                            <b className="w-[35px] relative font-bold inline-block shrink-0">
                                7.
                            </b>
                            <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                <InputsNew label="RN/Staff completed initial evaluation with client" contentPlaceholder="" type="datetime-local" />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    8.
                                </b>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[787px] max-w-full mq1275:min-w-full">
                                    <b className="self-stretch relative font-bold">
                                        Service Issues
                                    </b>
                                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[23px] pl-0 box-border gap-[8px_16px] min-h-[73px]">
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">
                                                Request for service increase
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">
                                                Request for service decrease
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">Failure to pay cost share</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[94px]">
                                                Missed visit(s)
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[112px]">
                                                Services initiated
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[117px]">
                                                Client termination
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">
                                                respite care plans utilized this quarter
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">Requested provider change</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[128px]">
                                                Health/Safety Issue
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[119px]">
                                                Client out of home
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">Request for information</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">Admission to Rehab/NH</div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">
                                                Request for PA info/PA update
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative">
                                                Scheduled day surgery/no hospital admission
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="checkbox"
                                            />
                                            <div className="relative inline-block min-w-[38px]">
                                                Other
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StackForForm prop="9." label="Discharge Reason" />
                        <div className="self-stretch flex flex-row items-start justify-start py-0 px-0 box-border gap-[16px] max-w-full mq1600:flex-wrap">
                            <b className="w-[35px] relative font-bold inline-block shrink-0">
                                10.
                            </b>
                            <div className="w-[1527px] flex flex-row items-start justify-start gap-[32px] max-w-[121%] shrink-0 mq900:gap-[16px] mq1600:flex-wrap">
                                <div className="w-[233px] flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <div className="relative font-semibold">
                                        Date discharge (30 day) letter sent
                                    </div>
                                    <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0">
                                        <div className="flex-1 flex flex-row items-center justify-start">
                                            <div className="flex-1 relative">4/17/2024</div>
                                        </div>
                                        <img
                                            className="h-4 w-4 relative overflow-hidden shrink-0"
                                            alt=""
                                            src="/otlcalendar1.svg"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[820px] max-w-full mq1275:min-w-full">
                                    <b className="self-stretch relative">
                                        Are services continuing through 30 day notice?
                                    </b>
                                    <div className="flex flex-row items-start justify-start py-0 pr-[1161px] pl-0 gap-[16px] mq450:pr-5 mq450:box-border mq900:pr-[290px] mq900:box-border mq1275:pr-[580px] mq1275:box-border mq1600:flex-wrap">
                                        <div className="flex flex-row items-center justify-start gap-[6px]">
                                            <input
                                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="radio"
                                                name="radioGroup-3"
                                            />
                                            <div className="relative inline-block min-w-[23px]">
                                                Yes
                                            </div>
                                        </div>
                                        <div className="flex flex-row items-center justify-start gap-[6px] text-main-blue">
                                            <input
                                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                                type="radio"
                                                name="radioGroup-3"
                                            />
                                            <div className="relative inline-block min-w-[18px]">
                                                No
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
                            <b className="w-[35px] relative font-bold inline-block shrink-0">
                                11.
                            </b>
                            <div className="flex-1 flex flex-row items-start justify-start py-0 pr-[535px] pl-0 box-border gap-[32px] min-w-[787px] max-w-full mq450:pr-5 mq450:box-border mq900:gap-[16px] mq900:pr-[133px] mq900:box-border mq1275:flex-wrap mq1275:pr-[267px] mq1275:box-border mq1275:min-w-full">
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <div className="self-stretch relative font-semibold">
                                        Actual Discharge Date
                                    </div>
                                    <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0 [row-gap:20px] mq450:flex-wrap">
                                        <div className="flex-1 flex flex-row items-center justify-start min-w-[199px]">
                                            <div className="flex-1 relative">4/17/2024</div>
                                        </div>
                                        <img
                                            className="h-4 w-4 relative overflow-hidden shrink-0"
                                            alt=""
                                            src="/otlcalendar1.svg"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <div className="self-stretch relative font-semibold">
                                        Last day service
                                    </div>
                                    <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-center justify-start py-spacing-1-and-half px-0 [row-gap:20px] mq450:flex-wrap">
                                        <div className="flex-1 flex flex-row items-center justify-start min-w-[199px]">
                                            <div className="flex-1 relative">4/17/2024</div>
                                        </div>
                                        <img
                                            className="h-4 w-4 relative overflow-hidden shrink-0"
                                            alt=""
                                            src="/otlcalendar1.svg"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px]">
                                <b className="h-[19px] w-[35px] relative font-bold inline-block shrink-0 opacity-[0]">
                                    12.
                                </b>
                                {/* <Inputs
                                    label="Enter final units below"
                                    hint="PSS"
                                    propWidth="unset"
                                    propFlex="1"
                                    propMinWidth="191px"
                                    propDisplay="unset"
                                /> */}
                                {/* <InputsNew label="Enter final units below" /> */}
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">PSSX</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">CD PSS</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">SFC</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">ADH</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">ERS</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">HDM</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">ALS</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">RN</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">LPN</div>
                                    </div>
                                </div>
                                <div className="flex-1 shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-end justify-start pt-[39px] px-0 pb-spacing-1-and-half box-border min-w-[56px]">
                                    <div className="flex-1 flex flex-row items-center justify-start">
                                        <div className="flex-1 relative">Other</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <StackForForm
                            prop="12."
                            label="Initial or Current Services in the Home"
                        />
                        <StackForForm prop="13." label="Frequency Changes Requested" />
                        <StackForForm prop="14." label="Complaint/Concern/Other" />
                        <StackForForm prop="15." label="ER/Hospital/Rehab visit" />
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    16.
                                </b>
                                <InputsNew label="Sender name" contentPlaceholder="Demo Agency" type="text" />
                                <InputsNew label="Title" contentPlaceholder="-" type="text" />
                            </div>
                        </div>
                        <div
                            className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-dark-font font-body-reg "
                        >
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="h-[19px] w-[35px] relative font-bold inline-block shrink-0 opacity-[0]">
                                    17.
                                </b>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <InputsNew label="Date" contentPlaceholder="" type="datetime-local" />
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <InputsNew label="Email" contentPlaceholder="email@agencyname.com" type="email" />
                                </div>
                            </div>
                        </div>
                        {/* <Stack /> */}
                        <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="w-[35px] relative font-bold inline-block shrink-0">
                                    17.
                                </b>
                                <InputsNew label="Recipient name" contentPlaceholder="Demo Agency" type="text" />
                                <InputsNew label="Title" contentPlaceholder="-" type="text" />
                            </div>
                        </div>
                        <div
                            className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-dark-font font-body-reg"
                        >
                            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[551px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq900:pr-[137px] mq900:box-border mq1275:pr-[275px] mq1275:box-border">
                                <b className="h-[19px] w-[35px] relative font-bold inline-block shrink-0 opacity-[0]">
                                    17.
                                </b>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <InputsNew label="Date" contentPlaceholder="" type="datetime-local" />
                                </div>
                                <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] max-w-[322px]">
                                    <InputsNew label="Email" contentPlaceholder="email@agencyname.com" type="email" />
                                </div>
                            </div>
                        </div>
                        <StackForForm prop="18." label="Recipient Response" />
                        <div className="self-stretch flex flex-row items-center justify-end py-0 pr-0 pl-[698px] gap-[8px] mq450:pl-5 mq450:box-border mq900:pl-[174px] mq900:box-border mq1275:flex-wrap mq1275:pl-[349px] mq1275:box-border">
                            <button className="cursor-pointer py-2.5 px-[30px] bg-white flex-1 rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[71px] whitespace-nowrap border-[2px] border-solid border-main-blue hover:bg-gainsboro-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue">
                                <div className="relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[71px]">
                                    Send Email
                                </div>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                    alt=""
                                    src="/post-icon5.svg"
                                />
                            </button>
                            <button className="cursor-pointer py-2.5 px-[33px] bg-white flex-[0.9155] rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[71px] whitespace-nowrap border-[2px] border-solid border-main-blue hover:bg-gainsboro-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue mq450:flex-1">
                                <div className="relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[64px]">
                                    Fax EDWP
                                </div>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                    alt=""
                                    src="/post-icon3.svg"
                                />
                            </button>
                            <button className="cursor-pointer py-2.5 px-[42px] bg-white flex-[0.662] rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[71px] border-[2px] border-solid border-main-blue hover:bg-gainsboro-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue mq450:flex-1">
                                <div className="relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[46px]">
                                    Cancel
                                </div>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                    alt=""
                                    src="/post-icon3.svg"
                                />
                            </button>
                            <button className="cursor-pointer [border:none] py-[12.5px] px-[51px] bg-main-blue rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue">
                                <div className="relative text-sm font-body-reg text-white text-center inline-block min-w-[32px]">
                                    Save
                                </div>
                                <img
                                    className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                    alt=""
                                    src="/post-icon4.svg"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EDWPNotificationForm;
