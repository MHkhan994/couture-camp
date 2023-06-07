import SyncLoader from "react-spinners/SyncLoader";

const LoadingSpinner = () => {
    return (
        <div className="flex h-[60vh] items-center justify-center">
            <SyncLoader color="#03e9a4" />
        </div>
    );
};

export default LoadingSpinner;