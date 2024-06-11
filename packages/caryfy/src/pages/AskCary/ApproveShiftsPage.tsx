import { FunctionComponent } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/management/Header";
import KPIItem from "../../components/management/KPIItem";
import ApproveShift from "../../components/AskCary/ApproveShift";
import dftarrowback from "../../assets/delete-shift/dftarrowback.svg";

const CaryfySCH5ShiftApproval: FunctionComponent = () => {
    const history = useHistory()

    function onBackClick() {
        history.push('/askcary')
    }

    return (
        <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal]">
            <img
                className="w-[3241px] h-[2505px] absolute !m-[0] top-[64px] left-[-745px]"
                alt=""
            />
            <Header />
            <section className="self-stretch overflow-hidden flex flex-row flex-wrap items-start justify-center py-20 px-5 box-border max-w-full z-[1] text-left text-xl text-dark-font font-body-reg mq825:pt-[52px] mq825:pb-[52px] mq825:box-border" style={{ paddingTop: "210px", paddingBottom: "180px" }}>
                <div className="w-[1326px] flex flex-col items-start justify-start gap-[24px] max-w-[1326px] mq1400:max-w-full">
                    <div className="self-stretch flex flex-row items-center justify-start gap-[5px] max-w-full">
                        <img
                            className="cursor-pointer h-6 w-6 relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src={dftarrowback}
                            onClick={onBackClick}

                        />
                        <b className="flex-1 relative font-bold inline-block max-w-[calc(100%_-_29px)] mq450:text-base">
                            Approve Shift
                        </b>
                    </div>
                    <ApproveShift />
                </div>
            </section>
            <KPIItem />
        </div>
    );
};

export default CaryfySCH5ShiftApproval;
