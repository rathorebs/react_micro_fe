import { FunctionComponent } from "react";
import Header from "../../components/management/Header";
import ContainerForAgencyInfo from "../../components/management/ContainerForAgencyInformation";
import KPIItem from "../../components/management/KPIItem";

const AgencyInformation: FunctionComponent = () => {
    return (
        <div className="w-full relative bg-white overflow-hidden flex flex-col items-start justify-start min-w-[360px] max-w-[1920px] leading-[normal] tracking-[normal]">
            <Header />
            <div className="self-stretch bg-gray-100 overflow-hidden flex flex-row flex-wrap items-start justify-center relative gap-[24px_22px] min-h-[911px] max-w-full" style={{ paddingTop: "60px" }}>
                <img
                    className="h-[3394px] w-[3241px] absolute !m-[0] top-[-889px] left-[-745px]"
                    alt=""
                />
                <ContainerForAgencyInfo />
            </div>
            <KPIItem />
        </div>
    );
};

export default AgencyInformation;