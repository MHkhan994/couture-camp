import HelmetTitle from "../../../Components/HelmetTitle";
import SectionHeading from "../../../Components/SectionHeading";
import UseFindUser from "../../../Hooks/UseFindUser";

const InstructorProfile = () => {

    const { DbUser } = UseFindUser()
    console.log(DbUser);

    return (
        <div>
            <HelmetTitle title={`profile-${DbUser.name}`}></HelmetTitle>
            <SectionHeading heading='instructor profile'></SectionHeading>
            <div className="flex flex-col gap-4 items-center">
                <img className="h-32 w-32 rounded-full object-cover" src={DbUser.image} alt="" />
                <div className="text-xl">
                    <h1>Name: {DbUser.name}</h1>
                    <h3>Role: <span className="text-[#03e9a4]">{DbUser.role}</span></h3>
                    <p>Email: {DbUser.email}</p>
                </div>
            </div>
        </div>
    );
};

export default InstructorProfile;