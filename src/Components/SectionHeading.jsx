
const SectionHeading = ({ heading }) => {
    return (
        <div className="flex justify-center mb-10">
            <h2 className="text-4xl border-b-2 font-semibold border-[#03e9a4] inline pb-3 capitalize">{heading}</h2>
        </div>
    );
};

export default SectionHeading;