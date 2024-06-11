import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import TableForDashboardContainer from "./TableForDashboardContainer";
import ioniconcchevronback from "../../assets/dashboard/ioniconcchevronback.svg";
import ioniconcchevronforward from "../../assets/dashboard/ioniconcchevronforward.svg";
import ioniconaaddoutline1 from "../../assets/dashboard/ioniconaaddoutline1.svg";
import ioniconvvideocamoutline1 from "../../assets/dashboard/ioniconvvideocamoutline1.svg";
import ioniconaalertcircleoutline from "../../assets/dashboard/ioniconaalertcircleoutline.svg";
import ioniconaalertcircleoutline_11 from "../../assets/dashboard/ioniconaalertcircleoutline-11.svg";
import firsflag_11 from "../../assets/dashboard/firsflag-11.svg";
import ioniconddocumenttextoutline from "../../assets/dashboard/ioniconddocumenttextoutline.svg";
import ioniconddocumenttextoutline_12 from "../../assets/dashboard/ioniconddocumenttextoutline-12.svg";
import ioniconhhappyoutline from "../../assets/dashboard/ioniconhhappyoutline.svg";
import vertical_container from "../../assets/dashboard/vertical-container@2x.png";
import otlsearch2 from "../../assets/dashboard/otlsearch2.svg";
import otlexpand from "../../assets/dashboard/otlexpand.svg";
import otlmic from "../../assets/dashboard/otlmic.svg";
import firrcomments from "../../assets/dashboard/firrcomments.svg";
import firrcomments_1 from "../../assets/dashboard/firrcomments-1.svg";
import otlsearch1 from "../../assets/dashboard/otlsearch1.svg";
import InputsNew from "../management/InputsNew";

const ContainerForDashboard: FunctionComponent = () => {
    const history = useHistory()

    function expandAskCary() {
        history.push('/askcary')
    }

    return (
        <div
            className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1 pl-0 box-border gap-[20px_18px] max-w-full text-left text-base text-text-text-tertiary font-body-reg"
        >
            <div className="flex-1 flex flex-col items-start justify-start gap-[20px] min-w-[328px] max-w-[328px]">
                <div className="self-stretch rounded-lg bg-main-blue overflow-hidden flex flex-col items-start justify-start gap-[16px] text-xl border-[1px] border-solid border-gainsboro-300">
                    <div className="self-stretch flex flex-row items-center justify-start pt-4 px-4 pb-0 gap-[16px] text-center">
                        <div className="cursor-pointer [backdrop-filter:blur(24px)] rounded-md bg-text-text-tertiary flex flex-row items-center justify-center p-1">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={ioniconcchevronback}
                            />
                        </div>
                        <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit mq450:text-base">
                            January
                        </h3>
                        <div className="cursor-pointer [backdrop-filter:blur(24px)] rounded-md bg-text-text-tertiary flex flex-row items-center justify-center p-1">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={ioniconcchevronforward}
                            />
                        </div>
                    </div>
                    <div className="self-stretch h-[165px] flex flex-row items-start justify-start py-0 px-4 box-border gap-[16px] text-base">
                        <div className="flex flex-col items-start justify-start">
                            <b className="h-[30px] relative font-bold flex items-center shrink-0 min-w-[72px]">
                                Tuesday
                            </b>
                            <b className="relative text-37xl font-bold inline-block min-w-[72px] mq450:text-15xl mq950:text-26xl">
                                09
                            </b>
                        </div>
                        <div className="self-stretch flex-1 flex flex-row flex-wrap items-start justify-start text-center text-sm">
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] text-base">
                                <b className="self-stretch relative font-bold">M</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">T</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] z-[1] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">W</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">T</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">F</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">S</b>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px] text-base">
                                <b className="self-stretch relative font-bold">S</b>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">1</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">2</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] z-[1] ml-[-0.6px]">
                                <div className="self-stretch relative">3</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">4</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">5</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">6</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">7</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">8</div>
                            </div>
                            <div className="h-[27px] w-[27px] rounded-81xl bg-khaki flex flex-col items-center justify-center p-1 box-border ml-[-0.6px] text-text-text-primary">
                                <b className="self-stretch relative font-bold">9</b>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">10</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">11</div>
                            </div>
                            <div className="h-[27px] w-[27px] rounded-81xl flex flex-col items-center justify-center p-1 box-border z-[1] ml-[-0.6px]">
                                <div className="self-stretch relative">12</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">13</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">14</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">15</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">16</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] z-[1] ml-[-0.6px]">
                                <div className="self-stretch relative">17</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">18</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">19</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">20</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">21</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">22</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">23</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] z-[1] ml-[-0.6px]">
                                <div className="self-stretch relative">24</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">25</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">26</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">27</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">28</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">29</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">30</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border min-w-[28px] z-[1] ml-[-0.6px]">
                                <div className="self-stretch relative">31</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border opacity-[0.2] min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">1</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border opacity-[0.2] min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">2</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border opacity-[0.2] min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">3</div>
                            </div>
                            <div className="flex-1 rounded-81xl flex flex-col items-center justify-center p-1 box-border opacity-[0.2] min-w-[28px] ml-[-0.6px]">
                                <div className="self-stretch relative">4</div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch bg-text-text-tertiary flex flex-col items-start justify-start p-4 gap-[12px] text-sm text-text-text-primary">
                        <div className="self-stretch flex flex-row items-center justify-start py-[6.5px] px-0 gap-[16px]">
                            <b className="flex-1 relative font-bold">Meetings</b>
                            <img
                                className="cursor-pointer h-4 w-4 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={ioniconaaddoutline1}
                            />
                        </div>
                        <div className="self-stretch rounded-lg bg-surface-bg-secondary overflow-hidden flex flex-col items-center justify-center py-[23.5px] px-5 gap-[8px] whitespace-nowrap text-center text-base text-text-text-secondary">
                            <img
                                className="w-9 h-9 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={ioniconvvideocamoutline1}
                            />
                            <b className="relative inline-block min-w-[126px]">
                                No Meetings Yet
                            </b>
                        </div>
                    </div>
                </div>
                <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.2)] rounded-radius-md1 bg-text-text-tertiary flex flex-col items-start justify-start p-4 gap-[16px] text-red">
                    <div className="self-stretch flex flex-row items-center justify-start py-1 px-0 gap-[10px]">
                        <img
                            className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                            loading="lazy"
                            alt=""
                            src={ioniconaalertcircleoutline}
                        />
                        <b className="flex-1 relative">Alerts</b>
                    </div>
                    <div className="self-stretch rounded-lg bg-light-red overflow-hidden flex flex-col items-center justify-center py-[84.5px] px-[26px] gap-[8px] text-center text-text-text-secondary">
                        <img
                            className="w-9 h-9 relative overflow-hidden shrink-0"
                            alt=""
                            src={ioniconaalertcircleoutline_11}
                        />
                        <b className="relative">Hooray ! No Alerts on Your Plate</b>
                    </div>
                </div>
                <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.2)] rounded-radius-md1 bg-text-text-tertiary flex flex-col items-start justify-start p-4 gap-[16px] text-main-blue">
                    <div className="self-stretch flex flex-row items-center justify-start py-[5px] px-0 gap-[10px]">
                        <input
                            className="m-0 h-5 w-5 relative overflow-hidden shrink-0"
                            type="checkbox"
                        />
                        <b className="flex-1 relative">Actions</b>
                    </div>
                    <div className="self-stretch rounded-lg bg-surface-bg-blue overflow-hidden flex flex-col items-center justify-center py-[110px] px-[53px] gap-[8px] text-center text-text-text-secondary mq450:pl-5 mq450:pr-5 mq450:box-border">
                        <img
                            className="w-9 h-9 relative overflow-hidden shrink-0"
                            alt=""
                            src={firsflag_11}
                        />
                        <b className="relative">No Actions on Your Plate</b>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[20px] min-w-[398px] max-w-[630px] text-main-blue mq450:min-w-full mq950:max-w-full">
                <div className="self-stretch shadow-[2px_2px_32px_rgba(0,_19,_85,_0.08)] rounded-lg bg-text-text-tertiary box-border overflow-hidden flex flex-col items-start justify-start max-w-full border-[1px] border-solid border-gainsboro-300">
                    <div className="self-stretch bg-surface-bg-blue overflow-hidden flex flex-row items-center justify-start py-[15px] px-4 box-border max-w-full">
                        <div className="flex-1 flex flex-row items-center justify-start gap-[10px] max-w-full">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                                alt=""
                                src={ioniconddocumenttextoutline}
                            />
                            <b className="flex-1 relative inline-block max-w-[calc(100%_-_34px)]">
                                Tasks
                            </b>
                        </div>
                    </div>
                    <TableForDashboardContainer
                        iONIconDdocumenttextoutli={ioniconddocumenttextoutline_12}
                        noTasksOnYourPlate="No Tasks On Your Plate!"
                    />
                </div>
                <div className="self-stretch shadow-[2px_2px_32px_rgba(0,_19,_85,_0.08)] rounded-lg bg-text-text-tertiary box-border overflow-hidden flex flex-col items-start justify-start max-w-full text-text-text-primary border-[1px] border-solid border-gainsboro-300">
                    <div className="self-stretch bg-surface-bg-secondary overflow-hidden flex flex-row items-center justify-start py-[15px] px-4 box-border max-w-full">
                        <div className="flex-1 flex flex-row items-center justify-start max-w-full">
                            <b className="flex-1 relative inline-block max-w-full">{`Alerts & Actions`}</b>
                        </div>
                    </div>
                    <TableForDashboardContainer
                        iONIconDdocumenttextoutli={ioniconhhappyoutline}
                        noTasksOnYourPlate="No Alerts Or Actions On You Plate!"
                        propPadding="277.5px 20px"
                    />
                </div>
            </div>
            <div className="flex-1 flex flex-col items-start justify-start gap-[20px] min-w-[131px] max-w-[328px] text-text-text-primary">
                <div className="self-stretch shadow-[2px_2px_32px_rgba(0,_19,_85,_0.08)] rounded-lg bg-text-text-tertiary box-border flex flex-col items-start justify-start py-3.5 px-[15px] gap-[16px] min-w-[328px] border-[1px] border-solid border-gainsboro-300">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-text-text-tertiary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] border-[1px] border-solid border-gainsboro-300">
                            <div className="flex-1 flex flex-row items-center justify-start">
                                <div className="flex-1 flex flex-row items-center justify-start gap-[4px]">
                                    <img
                                        className="h-6 w-6 relative rounded-[50%] object-cover min-h-[24px]"
                                        loading="lazy"
                                        alt=""
                                        src={vertical_container}
                                    />
                                    <input style={{
                                        border: 'none',
                                        outline: 'none',

                                    }} type="text" placeholder="Ask Cary" />
                                    {/* <b className="flex-1 relative font-bold">Ask Cary</b> */}
                                </div>
                            </div>
                            <img
                                className="cursor-pointer h-4 w-4 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={otlsearch2}
                            />
                            <div className="cursor-pointer rounded bg-main-blue flex flex-row items-center justify-start p-[5px]" onClick={expandAskCary}>
                                <img
                                    className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                                    loading="lazy"
                                    alt=""
                                    src={otlexpand}
                                />
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start">
                            <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                                <div className="self-stretch flex flex-row items-center justify-start py-px px-0">
                                    <b className="flex-1 relative">Shifts</b>
                                </div>
                                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-sm">
                                    <div className="self-stretch rounded-radius-sm bg-text-text-tertiary flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] whitespace-nowrap text-main-blue border-[1px] border-solid border-main-blue">
                                        {/* <img
                                            className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                            alt=""
                                            src="/lefticon2.svg"
                                        /> */}
                                        <div className="cursor-pointer flex-1 relative font-semibold">
                                            Add Shift - Client
                                        </div>
                                    </div>
                                    <div className="self-stretch rounded-radius-sm bg-text-text-tertiary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300">
                                        <div className="cursor-pointer flex-1 relative font-semibold">
                                            Add Shift - Prospect
                                        </div>
                                    </div>
                                    <div className="self-stretch rounded-radius-sm bg-text-text-tertiary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300">
                                        <div className="cursor-pointer flex-1 relative font-semibold">
                                            Update Shift - Client
                                        </div>
                                    </div>
                                    <div className="self-stretch rounded-radius-sm bg-text-text-tertiary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300">
                                        <div className="cursor-pointer flex-1 relative font-semibold">
                                            Update Shift - Caregiver
                                        </div>
                                    </div>
                                    <div className="self-stretch rounded-radius-sm bg-text-text-tertiary flex flex-row items-center justify-start py-2.5 px-[15px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300">
                                        <div className="cursor-pointer flex-1 relative font-semibold">
                                            Cancel Shift - Client
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-text-text-secondary">
                        <InputsNew contentPlaceholder="Type Your Message" label="" type="text"/>
                        {/* <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-text-text-tertiary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300"> */}
                            {/* <div className="flex-1 relative">How can i Help you?</div> */}
                            {/* <input style={{
                                    border: 'none',
                                    outline: 'none',

                                }}
                                    placeholder="Type Your Message"
                                    className="text-colors-text-gray whitespace-pre-wrap text-area"
                                />
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src={otlmic}
                            /> */}
                        {/* </div> */}
                    </div>
                </div>
                <div className="self-stretch shadow-[0px_1px_4px_rgba(0,_0,_0,_0.25)] rounded-lg bg-text-text-tertiary flex flex-col items-start justify-between py-4 px-2.5 box-border min-h-[689px]">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                        <div className="self-stretch flex flex-row items-center justify-start py-0.5 px-0 gap-[10px]">
                            <img
                                className="h-5 w-5 relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src={firrcomments}
                            />
                            <b className="flex-1 relative">Recent Messages</b>
                            <img
                                className="cursor-pointer h-4 w-4 relative overflow-hidden shrink-0"
                                alt=""
                                src={otlsearch2}
                            />
                            <div className="cursor-pointer rounded bg-main-blue flex flex-row items-center justify-start p-[5px]">
                                <img
                                    className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                                    alt=""
                                    src={otlexpand}
                                />
                            </div>
                            <img
                                className="h-[18px] w-[18px] relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src={otlsearch1}
                            />
                            <div className="rounded-sm bg-main-blue hidden flex-row items-center justify-start p-[5px]">
                                <img
                                    className="h-[18px] w-[18px] relative overflow-hidden shrink-0"
                                    alt=""
                                    src={otlexpand}
                                />
                            </div>
                        </div>
                        <div className="self-stretch rounded-lg bg-surface-bg-secondary overflow-hidden flex flex-col items-center justify-center pt-[243.8px] px-[59px] pb-[243.7px] gap-[8px] text-center text-text-text-secondary mq450:pl-5 mq450:pr-5 mq450:box-border mq950:pt-[158px] mq950:pb-[158px] mq950:box-border">
                            <img
                                className="w-9 h-9 relative overflow-hidden shrink-0"
                                alt=""
                                src={firrcomments_1}
                            />
                            <b className="relative">Start Your First Message</b>
                        </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start justify-start text-sm text-main-blue">
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-text-text-tertiary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] whitespace-nowrap border-[1px] border-solid border-gainsboro-300">
                            <div className="flex-1 relative">
                                <span>Contact Name</span>
                                <input style={{
                                    border: 'none',
                                    outline: 'none',

                                }}
                                    placeholder="Type Your Message"
                                    className="text-colors-text-gray whitespace-pre-wrap text-area"
                                />
                                {/* <span className="text-text-text-secondary whitespace-pre-wrap">
                                    {" "}
                                    Type Your Message
                                </span> */}
                            </div>
                            <img
                                className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                                alt=""
                                src={otlmic}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerForDashboard;
