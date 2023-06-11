
const SectionHeading = ({ heading, number }) => {
    return (
        <div className="flex justify-center lg:mb-10 mb-8">
            {
                number ? <h2 className="lg:text-4xl text-2xl border-b-2 font-semibold border-[#03e9a4] inline lg:pb-3 pb-1 capitalize">{heading}({number})</h2> :
                    <h2 className="lg:text-4xl text-2xl border-b-2 font-semibold border-[#03e9a4] inline lg:pb-3 pb-1 capitalize">{heading}</h2>
            }
        </div>
    );
};

export default SectionHeading;