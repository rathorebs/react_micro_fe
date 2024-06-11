import { useState } from "react";
import ProgramTable from "./Programtable";
import CallTypeTable from "./CallTypeTable";
import Table from "./Table";
import { useHistory } from "react-router-dom";
import pluslg from '../../assets/pluslg.svg'

const PayerTypes = [
    'Auto Ins. Pay', 'LTCI', 'Medicaid', 'Medicare Advantage', 'Private Pay', 'VA', 'Work Comp'
];

const ProgramNames = [
    'SOURCE', 'CCSP', 'SFC-CCSP', 'SFC-SOURCE', 'NOW', 'COMP', 'GAPP', 'ICWP'
];

const shiftTypeOptions = [
    'Hourly', 'Weekly', 'monthly'
];

interface DataRow {
    'Call Type': string;
    'Procedure Code': string;
    'Description': string;
    'Bill Rate': string;
    'Pay Rate': string;
    'Shift Type': string;
}

const columns: (keyof DataRow)[] = ['Call Type', 'Procedure Code', 'Description', 'Bill Rate', 'Pay Rate', 'Shift Type'];
const data: DataRow[] = [
    { 'Call Type': 'Caregiver Type', 'Procedure Code': 'S9123', 'Description': 'Nisl diam maecenas', 'Bill Rate': '$39.95', 'Pay Rate': '$40.00', 'Shift Type': 'Hourly' },
    { 'Call Type': 'Caregiver Type', 'Procedure Code': 'S9123', 'Description': 'Nisl diam maecenas', 'Bill Rate': '$39.95', 'Pay Rate': '$40.00', 'Shift Type': 'Hourly' },
];

const ContainerForPayerInfo = () => {
    const [selectedPayerTypes, setSelectedPayerTypes] = useState(['Medicaid']);
    const [selectedProgramNames, setSelectedProgramNames] = useState(['CCSP']);
    const [showProgramTable, setShowProgramTable] = useState(false);
    const [showCallTypeTable, setShowCallTypeTable] = useState(true);

    const history = useHistory();

    function handleNextClick() {
        history.push('/planofcare');
    };

    function agencyClick() {
        history.push('/agency');
    };


    function handlePayerTypeClick(payerType: string): void {
        setSelectedPayerTypes(prevState =>
            prevState.includes(payerType)
                ? prevState.filter(type => type !== payerType)
                : [...prevState, payerType]
        );
    };

    function handleProgramNameClick(programName: string): void {
        setSelectedProgramNames(prevState =>
            prevState.includes(programName)
                ? prevState.filter(name => name !== programName)
                : [...prevState, programName]
        );
    };

    function handleAddProgramTable(): void {
        setShowProgramTable(true);
    };

    function handleCancelProgramTable(): void {
        setShowProgramTable(false);
    };

    function handleAddCallTypetable(): void {
        setShowCallTypeTable(true);
    };

    function handleCancel(): void {
        setShowCallTypeTable(false);
    };

    return (
        <div
            className={`flex-1 flex flex-row flex-wrap items-start justify-start py-0 px-5 box-border gap-[24px_22px] max-w-[1366px] z-[1] text-left text-base text-text-text-primary font-body-reg mq1425:max-w-full`}
        >
            <div className="w-[1286px] flex flex-row items-center justify-start max-w-full">
                <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">
                    Onboarding
                </h3>
            </div>
            <div className="flex-1 rounded-radius-radius-lg bg-text-text-tertiary flex flex-col items-start justify-start p-4 box-border min-w-[328px] max-w-[328px]">
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-text-text-tertiary">
                    <div className="w-10 rounded-45xl bg-main-blue flex flex-col items-center justify-center py-[9px] px-4 box-border">
                        <div className="relative capitalize inline-block min-w-[7px]">
                            1
                        </div>
                    </div>
                    <b className="flex-1 relative text-text-text-primary cursor-pointer">
                        Payer Information
                    </b>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-surface-border" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px]">
                        <div className="relative capitalize inline-block min-w-[10px]">
                            2
                        </div>
                    </div>
                    <div className="flex-1 relative text-sm cursor-pointer" onClick={handleNextClick}>Plan of Care</div>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-surface-border" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="w-10 rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px] box-border">
                        <div className="relative capitalize inline-block min-w-[9px]">
                            3
                        </div>
                    </div>
                    <div className="cursor-pointer flex-1 relative text-sm" onClick={agencyClick}>Agency Information</div>
                </div>
            </div>
            <div className="flex-[0.966] rounded-radius-radius-lg bg-surface-bg-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] min-w-[925px] max-w-full text-sm mq950:pt-5 mq950:pb-5 mq950:box-border mq1425:pt-[21px] mq1425:pb-[21px] mq1425:box-border mq1425:min-w-full">
                <div className="self-stretch flex flex-row items-start justify-start">
                    <b className="flex-1 relative inline-block max-w-full">
                        Payer Information
                    </b>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] min-w-[191px]">
                    <b className="self-stretch relative">Payer Type</b>
                    <div className="self-stretch flex flex-row flex-wrap items-end justify-start py-0 pr-[62px] pl-0 gap-[8px] mq950:pr-[31px] mq950:box-border">
                        {PayerTypes.map((pt) => (
                            <button key={pt} className={`cursor-pointer [border:none] py-spacing-1 px-spacing-3 rounded-81xl flex flex-row items-center justify-center ${selectedPayerTypes.includes(pt) ? 'bg-main-blue hover:bg-dodgerblue' : 'bg-text-text-tertiary border-solid border-stroke hover:bg-gainsboro-300 '
                                }`} onClick={() => handlePayerTypeClick(pt)}>
                                <div className={`relative text-sm font-body-reg text-left inline-block ${selectedPayerTypes.includes(pt) ? 'text-text-text-tertiary' : 'text-text-text-primary'}`}>
                                    {pt}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] min-w-[191px]">
                    <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq450:flex-wrap">
                        <b className="self-stretch relative">Program Name</b>
                        <div className="cursor-pointer rounded-radiuscomponent-button bg-main-blue flex flex-row items-center justify-center p-2.5" onClick={handleAddProgramTable}>
                            <img className="h-3 w-3 relative" alt="" src={pluslg} />
                        </div>
                    </div>
                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[74px] pl-0 gap-[8px] mq950:pr-[37px] mq950:box-border">
                        {ProgramNames.map((pn) => (
                            <button key={pn} className={`cursor-pointer [border:none] py-spacing-1 px-spacing-3 rounded-81xl flex flex-row items-center justify-center ${selectedProgramNames.includes(pn) ? 'bg-main-blue hover:bg-dodgerblue' : 'bg-text-text-tertiary border-solid border-stroke hover:bg-gainsboro-300'
                                }`} onClick={() => handleProgramNameClick(pn)}>
                                <div className={`relative text-sm font-body-reg text-text-text-primary text-left inline-block  ${selectedProgramNames.includes(pn) ? 'text-text-text-tertiary' : 'text-text-text-primary'}`}>
                                    {pn}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                {selectedProgramNames?.map((pn) => (
                    <ProgramTable key={pn} pn={pn} onCancel={handleCancelProgramTable} payerTypes={PayerTypes} />
                ))}
                {showProgramTable && <ProgramTable pn="" payerTypes={PayerTypes} onCancel={handleCancelProgramTable} />}
                <div className="self-stretch flex flex-row items-center justify-center gap-[8px] max-w-full text-base mq950:flex-wrap">
                    <b className="relative inline-block min-w-[71px]">Call Type</b>
                    <div className="flex-1 relative text-xs text-text-text-secondary inline-block min-w-[323px] max-w-full">
                        Call Type (Call type can not be deleted which has shift associated
                        with it).
                    </div>
                    <div className="cursor-pointer rounded-radiuscomponent-button bg-main-blue flex flex-row items-center justify-center p-2.5" onClick={handleAddCallTypetable}>
                        <img className="h-3 w-3 relative" alt="" src={pluslg} />
                    </div>
                </div>
                {showCallTypeTable && <CallTypeTable programNames={ProgramNames} shiftTypeOptions={shiftTypeOptions} onCancel={handleCancel} />}
                <Table columns={columns} initialData={data} showActionColumn={true}/>
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

export default ContainerForPayerInfo