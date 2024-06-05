import { Fragment, FunctionComponent, useState } from "react";
import InputsNew from "./InputsNew";
import InputsDropdown from "./InputsDropdown";
import lefticon from "../../assets/lefticon.svg";
import lefticon1 from "../../assets/lefticon1.svg";

interface CallTypeTableProps {
    payerTypes: string[],
    shiftTypeOptions: string[],
    onCancel: () => void,
}

const CallTypeTable: FunctionComponent<CallTypeTableProps> = ({ payerTypes, shiftTypeOptions, onCancel }) => {

    const [callType, setCallType] = useState('');
    const [payerType, setPayerType] = useState('');
    const [shiftType, setShiftType] = useState('');
    const [billRate, setBillRate] = useState('');
    const [payRate, setPayRate] = useState('');
    const [procedureCode, setProcedureCode] = useState('');
    const [modifier1, setModifier1] = useState('');
    const [modifier2, setModifier2] = useState('');
    const [modifier3, setModifier3] = useState('');
    const [description, setDescription] = useState('');

    function handleSave() {
        const formData = {
            callType,
            payerType,
            shiftType,
            billRate,
            payRate,
            procedureCode,
            modifier1,
            modifier2,
            modifier3,
            description,
        };
        console.log('Form Data:', formData);

        onCancel()
    }

    return (
        // <div className="self-stretch rounded-radius-md1 bg-text-text-tertiary flex flex-col items-start justify-start p-4 box-border gap-[16px] max-w-full">
        <Fragment>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-center py-0 pr-1.5 pl-0 gap-[16px_14.7px]">
                <InputsNew label="Call Type" contentPlaceholder="call type" type="text" value={callType} onChange={(e) => setCallType(e.target.value)} />
                <InputsDropdown
                    label="Payer type"
                    placeHolder="Payer type"
                    options={payerTypes}
                    onSelect={setPayerType}
                />
                <InputsDropdown
                    label="Shift type"
                    placeHolder="shift type"
                    options={shiftTypeOptions}
                    onSelect={setShiftType}
                />
                <div className="flex-1 flex flex-row items-start justify-start py-0 px-0 box-border gap-[8px] min-w-[191px] max-w-[322px]">
                    <InputsNew
                        label="Bill Rate*"
                        contentPlaceholder="Bill Rate*"
                        propMinWidth="unset"
                        propMinWidth1="43px"
                        type="number"
                        value={billRate}
                        onChange={(e) => setBillRate(e.target.value)}
                    />
                    <InputsNew
                        label="Pay Rate*"
                        contentPlaceholder="Pay Rate"
                        propMinWidth="unset"
                        propMinWidth1="43px"
                        type="number"
                        value={payRate}
                        onChange={(e) => setPayRate(e.target.value)}
                    />
                </div>
            </div>
            <div className="self-stretch flex flex-row flex-wrap items-start justify-center py-0 pr-1.5 pl-0 gap-[16px_14.7px]">
                <InputsNew label="Procedure Code" contentPlaceholder="Procedure Code" type="text" value={procedureCode} onChange={(e) => setProcedureCode(e.target.value)} />
                <InputsNew label=" Modifier 1" contentPlaceholder=" Modifier 1" type="text" value={modifier1} onChange={(e) => setModifier1(e.target.value)} />
                <InputsNew label=" Modifier 2" contentPlaceholder=" Modifier 2" type="text" value={modifier2} onChange={(e) => setModifier2(e.target.value)} />
                <InputsNew label=" Modifier 3" contentPlaceholder=" Modifier 3" type="text" value={modifier3} onChange={(e) => setModifier3(e.target.value)} />
            </div>
            <div className="self-stretch flex flex-row items-start justify-start max-w-full">
                <InputsNew
                    label="Description*"
                    contentPlaceholder="Description*"
                    propMinWidth="191px"
                    propMinWidth1="250px"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className="self-stretch flex flex-row items-center justify-end py-0 pr-0 pl-[760px] gap-[8px] mq950:pl-[380px] mq950:box-border mq450:pl-5 mq450:box-border mq1425:flex-wrap">
                <div className="rounded-radius-radius-sm bg-text-text-tertiary flex flex-row items-center justify-center py-spacing-spacing-xs px-spacing-spacing-sm gap-[4px] cursor-pointer" onClick={onCancel}>
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
            {/* <div className="self-stretch flex flex-row items-center justify-end gap-[16px] mt-4">
                <button className="btn" onClick={handleSave}>Save</button>
                <button className="btn" onClick={onCancel}>Cancel</button>
            </div> */}
        </Fragment>
        // </div>
    )
}

export default CallTypeTable