import { FunctionComponent, useMemo } from "react";

interface InputsNewProps {
    label: string;
    contentPlaceholder: string;
    propMinWidth?: string;
    propMinWidth1?: string;
    type: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number;
    imgSrc?: string
}

const InputsNew: FunctionComponent<InputsNewProps> = ({
    label,
    contentPlaceholder,
    propMinWidth,
    propMinWidth1,
    type,
    onChange,
    value,
    imgSrc
}) => {
    const inputsStyle = useMemo(() => {
        return {
            minWidth: propMinWidth,
        };
    }, [propMinWidth]);

    const contentStyle = useMemo(() => {
        return {
            minWidth: propMinWidth1,
        };
    }, [propMinWidth1]);

    return (
        <div
            className={`self-stretch flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[191px] text-left text-sm text-text-text-primary font-body-reg`}
            style={inputsStyle}
        >
            <div className="self-stretch relative font-semibold">{label}</div>
            <div className="self-stretch shadow-[0px_1px_2px_rgba(16,_24,_40,_0.05)] rounded-radius-md bg-text-text-tertiary overflow-hidden flex flex-row items-center justify-start py-2.5 px-[15px] border-[1px] border-solid border-surface-border">
                <input
                    className="w-full [border:none] [outline:none] bg-[transparent] h-[19px] flex-1 flex flex-row items-center justify-start font-body-reg text-sm text-text-text-secondary min-w-[174px]"
                    placeholder={contentPlaceholder}
                    type={type}
                    style={contentStyle}
                    onChange={onChange}
                    value={value}
                />
                {imgSrc && (
                    <img className="h-[25px] w-[25px] relative overflow-hidden shrink-0 cursor-pointer" loading="lazy" alt="" src={imgSrc} />
                )}
            </div>
        </div>
    );
};

export default InputsNew