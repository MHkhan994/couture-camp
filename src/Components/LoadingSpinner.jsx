import SyncLoader from "react-spinners/SyncLoader";

const LoadingSpinner = () => {
    return (
        <div className="flex h-[70vh] items-center justify-center">
            <SyncLoader
                size={10}
                color="#03e9a4" />
        </div>
    );
};

export default LoadingSpinner;