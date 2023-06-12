import { Helmet } from "react-helmet-async";

const HelmetTitle = ({ title }) => {
    return (
        <Helmet>
            <title>Couture Camp | {title}</title>
        </Helmet>
    );
};

export default HelmetTitle;