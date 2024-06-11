import { FunctionComponent } from "react";

interface StackForFormProps {
    prop?: string;
    label?: string;
};

const StackForForm: FunctionComponent<StackForFormProps> = ({
    prop,
    label,
}) => {
    return (
        <div
            className="self-stretch flex flex-col items-start justify-start max-w-full text-left text-sm text-dark-font font-body-reg "
        >
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[16px] max-w-full">
                <b className="w-[35px] relative font-bold inline-block shrink-0">
                    {prop}
                </b>
                <div className="flex-1 flex flex-col items-start justify-start min-w-[787px] max-w-full mq1275:min-w-full">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                        <b className="self-stretch relative font-semibold">{label}</b>
                        <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md1 overflow-hidden flex flex-row items-start justify-start pt-spacing-1-and-half px-4 pb-[47px] text-light-font">
                            <div className="relative inline-block min-w-[6px]">-</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StackForForm;
