import { FunctionComponent, ReactChild } from "react";
import { useHistory } from "react-router-dom";
import InputsNew from "../management/InputsNew";
import icons4 from "../../assets/delete-shift/icons4.svg";
import Table from "../management/Table";

interface DataRow {
    'Distance': string;
    'Client Name': string;
    'Caregiver Name': string;
    'Schedule Time': string | ReactChild;
    'Actual Time': string;
}

const columns: (keyof DataRow)[] = ['Distance', 'Client Name', 'Caregiver Name', 'Schedule Time', 'Actual Time'];
const data: DataRow[] = [
    {
        'Distance': 'Turner, Emily', 'Client Name': 'Turner, Emily', 'Caregiver Name': 'White, Sophia', 'Schedule Time': "29 Apr 2024 - 09:00 AM - 04:00 PM ( 7 H 0 Min )"
        , 'Actual Time': "30 Apr 2024 - 09:00 AM - 04:00 PM ( 7 H 0 Min )"
    },
    {
        'Distance': 'Turner, Emily', 'Client Name': 'Turner, Emily', 'Caregiver Name': 'White, Sophia', 'Schedule Time': "29 Apr 2024 - 09:00 AM - 04:00 PM ( 7 H 0 Min )"
        , 'Actual Time': "30 Apr 2024 - 09:00 AM - 04:00 PM ( 7 H 0 Min )"
    },
];

const ApproveShift: FunctionComponent = () => {
    const history = useHistory()

    function onCancelClick() {
        history.push('/askcary')
    }

    return (
        <div
            className="self-stretch rounded-radius-radius-lg bg-light-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] max-w-full text-left text-sm text-dark-font font-body-reg mq450:pt-[21px] mq450:pb-[21px] mq450:box-border"
        >
            <div className="self-stretch flex flex-col items-start justify-start max-w-full">
                <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[264px] pl-0 box-border gap-[16px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[66px] mq825:box-border mq1400:pr-[132px] mq1400:box-border">
                    <InputsNew
                        label="Start Date*"
                        contentPlaceholder=""
                        type="datetime-local"
                    // oTLcalendar="/otlcalendar.svg"
                    />
                    <InputsNew
                        label="End Date"
                        contentPlaceholder=""
                        type="datetime-local"
                    // oTLcalendar="/otlcalendar.svg"
                    />
                    <InputsNew
                        label="Client / Caregiver"
                        contentPlaceholder="Search client / caregiver"
                        type="text"
                    // oTLcalendar="/otlsearch3.svg"
                    />
                </div>
            </div>
            <Table columns={columns} initialData={data} showCheckboxColumn={true} />
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[610px] pl-0 box-border gap-[8px] max-w-full lg:flex-wrap mq450:pr-5 mq450:box-border mq825:pr-[152px] mq825:box-border mq1400:pr-[305px] mq1400:box-border">
                <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[209px] max-w-[322px]">
                    <b className="self-stretch relative font-bold">{`Billing `}</b>
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[81px] pl-0 gap-[16px] text-main-blue mq450:pr-5 mq450:box-border mq825:flex-wrap">
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="radio"
                            />
                            <div className="relative inline-block min-w-[104px]">
                                Scheduled Time
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px] text-dark-font">
                            <input
                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="radio"
                            />
                            <div className="relative inline-block min-w-[77px]">
                                Actual Time
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[209px] max-w-[322px]">
                    <b className="self-stretch relative font-bold">Payroll</b>
                    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[81px] pl-0 gap-[16px] text-main-blue mq450:pr-5 mq450:box-border mq825:flex-wrap">
                        <div className="flex flex-row items-center justify-start gap-[6px]">
                            <input
                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="radio"
                            />
                            <div className="relative inline-block min-w-[104px]">
                                Scheduled Time
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-start gap-[6px] text-dark-font">
                            <input
                                className="cursor-pointer m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                type="radio"
                            />
                            <div className="relative inline-block min-w-[77px]">
                                Actual Time
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-end py-0 pr-0 pl-[984px] gap-[8px] lg:flex-wrap mq450:pl-5 mq450:box-border mq825:pl-[246px] mq825:box-border mq1400:pl-[492px] mq1400:box-border">
                <button className="cursor-pointer py-2.5 px-[42px] bg-white flex-1 rounded-radiuscomponent-button box-border flex flex-row items-center justify-center gap-[12px] min-w-[88px] border-[2px] border-solid border-main-blue hover:bg-gainsboro-300 hover:box-border hover:border-[2px] hover:border-solid hover:border-dodgerblue" onClick={onCancelClick}>
                    <div className="relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[46px]">
                        Cancel
                    </div>
                </button>
                <button className="cursor-pointer [border:none] py-[12.5px] px-[51px] bg-main-blue rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue" onClick={onCancelClick}>
                    <div className="relative text-sm font-body-reg text-white text-center inline-block min-w-[32px]">
                        Save
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ApproveShift;
