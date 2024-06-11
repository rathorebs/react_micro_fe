import { FunctionComponent } from "react";
import React from "react";
import Reports1 from "../../components/Reports/Reports1";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import dftbookmark from "../../assets/Reports/dftbookmark.svg";
import Otlbookmark from "../../assets/Reports/otlbookmark.svg";
import Reports from "../../components/Reports/Reports";

const ReportsPage: FunctionComponent = () => {
    return (
        <div
            className={`w-[1848px] bg-surface-bg-primary max-w-[1920px] overflow-hidden flex flex-col items-start justify-start min-w-[360px] leading-[normal] tracking-[normal] text-left text-sm text-headings font-lato `}
        >
            <Header />
            <section className="self-stretch bg-gray overflow-hidden flex flex-col items-center justify-start relative gap-[24px] min-h-[588px] max-w-full text-left text-xl text-colors-text-black font-body-xs-semi-bold" style={{ paddingTop: "80px" }}>
                <img
                    className="w-[3241px] h-[3394px] absolute !m-[0] top-[-889px] left-[-745px]"
                    alt=""
                />
                <div className="w-full flex flex-col items-center justify-start py-0 px-5 box-border gap-[24px] max-w-[1366px] z-[1] mq1400:max-w-full">
                    <div className="w-full flex flex-col items-start justify-start gap-[24px] max-w-[1326px] mq1400:max-w-full">
                        <div className="self-stretch flex flex-row items-center justify-start max-w-full">
                            <h2 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">
                                Pinned reports
                            </h2>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[335px] pl-0 box-border gap-[8px] max-w-full mq450:pr-5 mq450:box-border mq825:pr-[83px] mq825:box-border mq1400:pr-[167px] mq1400:box-border">
                            <Reports1
                                title="Medicaid Eligibility
"
                                dFTbookmark={dftbookmark}
                            />
                            <Reports
                                title="Medicaid Doc Expiry
"
                                dFTbookmark={dftbookmark}
                            />
                            <Reports
                                title="Change Form Fax
"
                                dFTbookmark={dftbookmark}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-[24px] max-w-[1326px] mq1400:max-w-full">
                        <div className="self-stretch flex flex-row items-center justify-start max-w-full">
                            <h2 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">
                                All Reports
                            </h2>
                        </div>
                        <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[8px_6.7px] min-h-[178px] max-w-full">
                            <Reports
                                title="Weekly Shift Schedule
"
                                dFTbookmark={Otlbookmark}
                            />
                            <Reports1
                                title="Document Expiration "
                                dFTbookmark={Otlbookmark}
                            />
                            <Reports1 title="VA Eligibility" dFTbookmark={Otlbookmark} />
                            <Reports
                                title="Cancelled Shifts by clients
"
                                dFTbookmark={Otlbookmark}
                            />
                            <Reports
                                title="Client Assessor Shifts
"
                                dFTbookmark={Otlbookmark}
                            />
                            <Reports
                                title="Cancelled Shifts by caregiver
"
                                dFTbookmark={Otlbookmark}
                            />
                        </div>
                    </div>
                </div>
                <KPIItem />
            </section>
        </div>
    );
};

export default ReportsPage;
