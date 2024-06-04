import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type TableType = {
    className?: string;
    iONIconDdocumenttextoutli?: string;
    noTasksOnYourPlate?: string;

    /** Style props */
    propPadding?: CSSProperties["padding"];
};

const TableForDashboardContainer: FunctionComponent<TableType> = ({
    className = "",
    iONIconDdocumenttextoutli,
    noTasksOnYourPlate,
    propPadding,
}) => {
    const containerStyle: CSSProperties = useMemo(() => {
        return {
            padding: propPadding,
        };
    }, [propPadding]);

    return (
        <div
            className={`self-stretch flex flex-col items-start justify-start p-4 text-center text-base text-text-text-secondary font-body-reg ${className}`}
        >
            <div
                className="self-stretch rounded-lg bg-surface-bg-secondary overflow-hidden flex flex-col items-center justify-center py-[139px] px-5 gap-[8px]"
                style={containerStyle}
            >
                <img
                    className="w-9 h-9 relative overflow-hidden shrink-0"
                    alt=""
                    src={iONIconDdocumenttextoutli}
                />
                <b className="relative">{noTasksOnYourPlate}</b>
            </div>
        </div>
    );
};

export default TableForDashboardContainer;
