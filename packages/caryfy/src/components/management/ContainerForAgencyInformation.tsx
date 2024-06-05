import { ChangeEvent, useRef, useState } from "react";
import InputsNew from "./InputsNew";
import { useHistory } from "react-router-dom";
import icon from '../../assets/icon.svg'
import icon_1 from '../../assets/icon-1.svg'

const ContainerForAgencyInfo = () => {
    const [companyName, setCompanyName] = useState("");
    const [dba, setDba] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setphone] = useState(0);
    const [address, setAddress] = useState("");
    const [fb, setFb] = useState("");
    const [twitter, setTwitter] = useState("");
    const [website, setWebsite] = useState("");
    const [linkedIn, setlinkedIn] = useState("");
    const [agencyFirstName, setAgencyFirstName] = useState("");
    const [agencyLastName, setAgencyLastName] = useState("");
    const [agencyEmail, setAgencyEmail] = useState("");
    const [agencyPhone, setAgencyPhone] = useState(0);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();

    function handleIconClick () {
        fileInputRef.current?.click();
    };

    function handleFileChange (event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file) {
            // Handle the uploaded file here
            console.log('File uploaded:', file);
            // we can also upload the file to a server or display a preview
        }
    };

    function handlePayerInfoClick() {
        history.push('/onboard');
    };

    function handlePlanofCareClick() {
        history.push('/planofcare');
    };

    function handleSave() {
        const formData = {
            companyName,
            dba,
            email,
            phone,
            address,
            fb,
            twitter,
            website,
            linkedIn,
            agencyFirstName,
            agencyLastName,
            agencyEmail,
            agencyPhone
        }

        console.log({ formData })
        history.push('/dash');
    }

    return (
        <div
            className={`flex-1 flex flex-row flex-wrap items-start justify-start py-0 px-5 box-border gap-[24px_22px] max-w-[1366px] min-h-[751px] z-[1] text-left text-xl text-dark-font font-body-reg mq1400:max-w-full`}
        >
            <div className="w-[1286px] flex flex-row items-center justify-start max-w-full">
                <h3 className="m-0 flex-1 relative text-inherit font-bold font-inherit inline-block max-w-full mq450:text-base">
                    Onboarding
                </h3>
            </div>
            <div className="flex-1 rounded-radius-radius-lg bg-text-text-tertiary flex flex-col items-start justify-start p-4 box-border min-w-[328px] max-w-[328px] text-base text-text-text-tertiary">
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-text-text-primary">
                    <div className="w-10 rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px] box-border">
                        <div className="relative capitalize inline-block min-w-[9px]">
                            1
                        </div>
                    </div>
                    <div className="flex-1 relative text-sm cursor-pointer" onClick={handlePayerInfoClick}>Payer Information</div>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-stroke" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px] text-text-text-primary">
                    <div className="w-10 rounded-45xl bg-stroke flex flex-col items-center justify-center py-[9px] px-[15px] box-border">
                        <div className="relative capitalize inline-block min-w-[9px]">
                            2
                        </div>
                    </div>
                    <div className="flex-1 relative text-sm cursor-pointer" onClick={handlePlanofCareClick}>Plan of Care</div>
                </div>
                <div className="flex flex-row items-center justify-center py-0 px-5">
                    <div className="h-10 w-0.5 relative box-border border-r-[2px] border-solid border-stroke" />
                </div>
                <div className="self-stretch flex flex-row items-center justify-start gap-[8px]">
                    <div className="rounded-45xl bg-main-blue flex flex-col items-center justify-center py-[9px] px-[15px]">
                        <div className="relative capitalize inline-block min-w-[10px]">
                            3
                        </div>
                    </div>
                    <b className="flex-1 relative text-text-text-primary cursor-pointer" onClick={handlePlanofCareClick}>Agency Information</b>
                </div>
            </div>
            <div className="flex-[0.966] rounded-radius-radius-lg bg-surface-bg-blue flex flex-col items-start justify-start p-8 box-border gap-[24px] min-w-[925px] max-w-full text-sm lg:min-w-full mq825:pt-[21px] mq825:pb-[21px] mq825:box-border">
                <div className="self-stretch flex flex-row items-start justify-start max-w-full text-base">
                    <b className="flex-1 relative inline-block max-w-full">
                        Agency Information
                    </b>
                </div>
                <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-0.5 pl-0 box-border gap-[24px_22px] max-w-full">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[181px] max-w-full">
                        <InputsNew label="Company Name" contentPlaceholder="Company Name" type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        <InputsNew label="DBA" contentPlaceholder="DBA" type="text" value={dba} onChange={(e) => setDba(e.target.value)} />
                    </div>
                    <div className="flex-[0.9549] rounded bg-light-blue flex flex-col items-center justify-center p-2.5 box-border min-w-[181px] max-w-full text-center">
                        <div className="self-stretch rounded bg-white flex flex-col items-center justify-center py-[35px] px-[9px] border-[1px] border-dashed border-neutral-200">
                            <div className="self-stretch flex flex-col items-center justify-center gap-[10px]">
                                <img
                                    className="w-6 h-6 relative overflow-hidden shrink-0"
                                    loading="lazy"
                                    alt=""
                                    src={icon}
                                />
                                <div className="self-stretch relative capitalize">
                                    Agency Logo Upload
                                </div>
                                <div className="cursor-pointer rounded bg-main-blue flex flex-row items-center justify-center p-1.5" onClick={handleIconClick}>
                                    <img
                                        className="h-5 w-5 relative"
                                        loading="lazy"
                                        alt=""
                                        src={icon_1}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        accept="image/*"
                    />
                </div>
                <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1.5 pl-0 gap-[16px_14px]">
                    <InputsNew label="Email" contentPlaceholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <InputsNew label="Phone" contentPlaceholder="Phone" type="text" value={phone} onChange={(e) => setphone(Number(e.target.value))} />
                    <InputsNew label="Address" contentPlaceholder="Address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1.5 pl-0 gap-[16px_14.7px]">
                    <InputsNew label="Facebook" contentPlaceholder="Facebook" type="text" value={fb} onChange={(e) => setFb(e.target.value)} />
                    <InputsNew label="Twitter ( X )" contentPlaceholder="Twitter ( X )" type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                    <InputsNew label="Website" contentPlaceholder="Website" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                    <InputsNew label="LinkedIn" contentPlaceholder="LinkedIn" type="text" value={linkedIn} onChange={(e) => setlinkedIn(e.target.value)} />
                </div>
                <b className="self-stretch relative text-base">
                    Agency Owner Information
                </b>
                <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-1.5 pl-0 gap-[16px_14.7px]">
                    <InputsNew label="First Name*" contentPlaceholder="First Name*" type="text" value={agencyFirstName} onChange={(e) => setAgencyFirstName(e.target.value)} />
                    <InputsNew label="Last Name*" contentPlaceholder="Last Name*" type="text" value={agencyLastName} onChange={(e) => setAgencyLastName(e.target.value)} />
                    <InputsNew label="Email" contentPlaceholder="Email" type="text" value={agencyEmail} onChange={(e) => setAgencyEmail(e.target.value)} />
                    <InputsNew label="Phone" contentPlaceholder="Phone" type="text" value={agencyPhone} onChange={(e) => setAgencyPhone(Number(e.target.value))} />
                </div>
                <div className="self-stretch flex flex-col items-end justify-center mq950:items-center mq950:justify-center mq950:pb-20 mq950:box-border">
                    <button className="cursor-pointer [border:none] py-[12.5px] px-[52px] bg-main-blue rounded-radiuscomponent-button flex flex-row items-center justify-center gap-[12px] hover:bg-dodgerblue" onClick={handleSave}>
                        <div className="relative text-sm font-body-reg text-white text-center inline-block min-w-[31px]">
                            Save
                        </div>
                        {/* <img
                            className="h-4 w-4 relative overflow-hidden shrink-0 hidden"
                            alt=""
                            src="/post-icon1.svg"
                        /> */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContainerForAgencyInfo