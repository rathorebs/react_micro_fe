import { FunctionComponent, useMemo, type CSSProperties } from 'react';
import notebook from "../../assets/ask-cary/notebook.svg";
import ioniconmmicoutline1 from "../../assets/ask-cary/ioniconmmicoutline1.svg"

interface AskCaryProps {
    label?: string;
    leftIcon?: string;
    postIcon?: string;
    ellipse914?: string;
    showFrameDiv?: boolean;
    frameDivVisible?: boolean;
    route?: string

    /** Style props */
    propPadding?: CSSProperties['padding'];
    propHeight?: CSSProperties['height'];
    propTextDecoration?: CSSProperties['textDecoration'];
}

const AskCary: FunctionComponent<AskCaryProps> = ({ label, leftIcon, postIcon, ellipse914, showFrameDiv, frameDivVisible, propPadding, propHeight, propTextDecoration, route }) => {
    const caryContainerStyle: CSSProperties = useMemo(() => {
        return {
            padding: propPadding
        };
    }, [propPadding]);

    const frameDivStyle: CSSProperties = useMemo(() => {
        return {
            height: propHeight
        };
    }, [propHeight]);

    const buttonStyle: CSSProperties = useMemo(() => {
        return {
            textDecoration: propTextDecoration
        };
    }, [propTextDecoration]);

    return (
        <div className="flex-1 rounded-radius-sm bg-white box-border flex flex-col items-start justify-center py-[11px] px-3 gap-[8px] min-w-[325px] max-w-[325px] text-left text-sm text-dark-font font-body-reg border-[1px] border-solid border-surface-border">
            <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
                <img className="h-5 w-5 relative overflow-hidden shrink-0 hidden" alt="" src={notebook} />
                <div className="flex-1 relative font-semibold">{label}</div>
            </div>
            <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-center text-main-blue">
                <div className="flex-1 flex flex-row items-center justify-start py-0 pr-[165px] pl-0 gap-[4px] mq450:pr-5 mq450:box-border" style={caryContainerStyle}>
                    {showFrameDiv && (
                        <div className="rounded-sm bg-light-blue flex flex-row items-center justify-center p-1" style={frameDivStyle}>
                            <img className="h-4 w-4 relative overflow-hidden shrink-0 cursor-pointer" loading="lazy" alt="" src={ioniconmmicoutline1} />
                        </div>
                    )}
                    <div className="rounded-radius-radius-sm flex flex-row items-center justify-center py-spacing-spacing-xs px-spacing-spacing-sm gap-[4px]">
                        <img className="h-4 w-4 relative overflow-hidden shrink-0 hidden" alt="" />
                        <a className="[text-decoration:none] relative text-[inherit] inline-block min-w-[58px] cursor-pointer" style={buttonStyle} href={route}>Manually</a>
                        <img className="h-4 w-4 relative overflow-hidden shrink-0 hidden" alt=""/>
                    </div>
                </div>
                {frameDivVisible && (
                    <div className="flex flex-row items-center justify-start">
                        <img className="h-6 w-6 relative object-cover" loading="lazy" alt="" src={ellipse914} />
                    </div>
                )}
            </div>
        </div>);
};

export default AskCary;
