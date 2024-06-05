import { ChangeEvent, FunctionComponent, useState } from "react";
import InputsNew from "./InputsNew";
import InputsDropdown from "./InputsDropdown";
import lefticon from "../../assets/lefticon.svg";
import lefticon1 from "../../assets/lefticon1.svg";

interface ProgramTableProps {
    pn: string;
    onCancel: (programName: string) => void;
    payerTypes: string[];
}

const ProgramTable: FunctionComponent<ProgramTableProps> = ({ pn, onCancel, payerTypes }) => {
    const [programName, setProgramName] = useState(pn);
    const [payerType, setPayerType] = useState('');
    const [unitMultiplier, setunitMultiplier] = useState(0);
    const [medicaidId, setMedicaidId] = useState(0);

    function handleSave() {
        const formData = {
            programName,
            payerType,
            unitMultiplier,
            medicaidId
        };
        console.log('Form Data:', formData);

        onCancel(programName)
    }

    return (
        <div className="self-stretch rounded-radius-md1 bg-text-text-tertiary flex flex-col items-start justify-start p-4 box-border gap-[16px] max-w-full">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[218px] pl-0 box-border gap-[16px] max-w-full mq950:pr-[109px] mq950:box-border mq450:pr-5 mq450:box-border">
                <InputsNew label="Program Name*" contentPlaceholder={pn} type="text" value={programName} onChange={(e) => setProgramName(e.target.value)} />
                <InputsDropdown
                    label="Payer type"
                    placeHolder="Payer type"
                    options={payerTypes}
                    onSelect={setPayerType}
                />
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-end justify-start py-0 pr-1.5 pl-0 gap-[16px_14px] text-text-text-secondary">
                <InputsNew
                    label="Unit Multiplier "
                    contentPlaceholder="4"
                    propMinWidth="191px"
                    propMinWidth1="150px"
                    type="number"
                    value={unitMultiplier}
                    onChange={(e) => setunitMultiplier(Number(e.target.value))}
                />
                <InputsNew
                    label="Medicaid Id "
                    contentPlaceholder="Medicaid Id (Reference Id)"
                    propMinWidth="191px"
                    propMinWidth1="150px"
                    type="number"
                    value={medicaidId}
                    onChange={(e) => setMedicaidId(Number(e.target.value))}
                />
                <div className="flex-[0.6429] flex flex-col items-start justify-start py-0 pr-[100px] pl-0 box-border gap-[6px] min-w-[112px] text-main-blue mq450:pr-5 mq450:box-border">
                    <div className="flex flex-row items-center justify-start gap-[6px]">
                        <input
                            className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="checkbox"
                        />
                        <div className="relative inline-block min-w-[128px]">
                            Restrict Scheduling
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[6px] text-text-text-primary">
                        <input
                            className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                            type="checkbox"
                        />
                        <div className="relative">Calculate monthly hours</div>
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-end py-0 pr-0 pl-[760px] gap-[8px] mq950:pl-[380px] mq950:box-border mq450:pl-5 mq450:box-border mq1425:flex-wrap">
                <div className="rounded-radius-radius-sm bg-text-text-tertiary flex flex-row items-center justify-center py-spacing-spacing-xs px-spacing-spacing-sm gap-[4px] cursor-pointer" onClick={() => onCancel(pn)}>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src={lefticon}
                    />
                    <div className="relative text-sm font-body-reg text-main-blue text-center inline-block min-w-[46px]">
                        Cancel
                    </div>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src={lefticon}
                    />
                </div>
                <div className="rounded-radius-radius-sm bg-main-blue flex flex-row items-center justify-center py-spacing-spacing-xs px-spacing-spacing-sm gap-[4px] cursor-pointer rounded-radiuscomponent-button ml-2" onClick={handleSave}>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src={lefticon1}
                    />
                    <div className="relative text-sm font-body-reg text-text-text-tertiary text-center inline-block min-w-[32px] p-2">
                        Save
                    </div>
                    <img
                        className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                        alt=""
                        src={lefticon1}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProgramTable