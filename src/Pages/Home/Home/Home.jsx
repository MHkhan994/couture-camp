import HelmetTitle from "../../../Components/HelmetTitle";
import Banner from "./Banner/Banner";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructors from "./PopularInstructors/PopularInstructors";

const Home = () => {

    return (
        <div >
            <HelmetTitle title='Home'></HelmetTitle>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div >
    );
};

export default Home;