import HelmetTitle from "../../../Components/HelmetTitle";
import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import PopularClasses from "./PopularClasses/PopularClasses";
import PopularInstructors from "./PopularInstructors/PopularInstructors";

const Home = () => {

    return (
        <div >
            <HelmetTitle title='Home'></HelmetTitle>
            <Banner></Banner>
            <AboutUs></AboutUs>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div >
    );
};

export default Home;