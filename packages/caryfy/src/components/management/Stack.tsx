import { FunctionComponent, useEffect, useState } from "react";
import otlchevronforward1 from '../../assets/otlchevronforward1@2x.png'

interface StackProps {
    heading: string,
    rows: string[],
    initialOpen?: boolean
}

const Stack: FunctionComponent<StackProps> = ({ heading, rows, initialOpen }) => {
    const [open, setOpen] = useState(initialOpen)

    function toggleDropdown(): void {
        setOpen(!open)
    }

    useEffect(() => {
        setOpen(initialOpen)
    }, [])

    return (
        <div
            className={`self-stretch flex flex-col items-start justify-start gap-[16px] max-w-full text-left text-sm text-text-text-primary font-body-reg`}
        >
            <div className="self-stretch bg-text-text-tertiary flex flex-row items-start justify-start py-spacing-spacing-sm px-4 box-border gap-[8px] max-w-full">
                <img
                    className={`cursor-pointer h-4 w-4 relative overflow-hidden shrink-0 object-contain ${open ? 'rotate-180' : ''}`}
                    alt=""
                    src={otlchevronforward1}
                    onClick={toggleDropdown}
                />
                <b className="flex-1 relative inline-block max-w-[calc(100%_-_24px)]">
                    {heading}
                </b>
            </div>
            {open && (
                <div className="self-stretch flex flex-col items-start justify-start gap-[8px] text-main-blue">
                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[279px] pl-0 gap-[8px_16px] mq950:pr-[139px] mq950:box-border mq450:pr-[69px] mq450:box-border">
                        {rows?.map((row, idx) => (
                            <div key={idx} className="flex flex-row items-center justify-start gap-[6px]">
                                <input
                                    className="m-0 h-4 w-4 relative overflow-hidden shrink-0"
                                    type="checkbox"
                                />
                                <div className="relative inline-block min-w-[117px]">
                                    {row}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stack