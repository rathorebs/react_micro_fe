import { FunctionComponent } from "react";

interface CheckboxSelectionProps {
    label?: string;
};

const CheckboxSelection: FunctionComponent<CheckboxSelectionProps> = ({ label }) => {
    return (
        <div
            className="flex-1 flex flex-col items-start justify-center py-[25.5px] px-0 box-border min-w-[209px] max-w-[322px] text-left text-sm text-main-blue font-body-reg"
        >
            <div className="flex flex-row items-center justify-start gap-[6px]">
                <input
                    className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                    type="checkbox"
                />
                <div className="relative">{label}</div>
            </div>
        </div>
    );
};

export default CheckboxSelection;
