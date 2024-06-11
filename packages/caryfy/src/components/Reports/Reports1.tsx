import { FunctionComponent } from "react";

export type Reports1Type = {
  className?: string;
  title?: string;
  dFTbookmark?: string;
};

const Reports1: FunctionComponent<Reports1Type> = ({
  className = "",
  title,
  dFTbookmark,
}) => {
  return (
    <div
      className={`flex-1 rounded-radius-md bg-surface-bg-primary box-border flex flex-col items-start justify-center py-[11px] px-3 gap-[4px] min-w-[325px] max-w-[325px] text-left text-sm text-colors-text-black font-body-xs-semi-bold border-[1px] border-solid border-surface-border ${className}`}
    >
      <div className="self-stretch flex flex-row items-center justify-start gap-[4px]">
        <img
          className="h-5 w-5 relative overflow-hidden shrink-0 hidden"
          alt=""
          src="/notebook.svg"
        />
        <b className="flex-1 relative font-bold">{title}</b>
        <img
          className="h-4 w-4 relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src={dFTbookmark}
        />
      </div>
      <div className="self-stretch flex flex-row items-center justify-start text-xs text-text-text-secondary">
        <div className="flex-1 rounded-sm bg-surface-bg-primary flex flex-row items-center justify-start border-[1px] border-solid border-surface-bg-primary">
          <div className="flex-1 relative">
            This report shows :First Name, Last Name, Payor Name, Medicaid Id,
            Authorization Number{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports1;
