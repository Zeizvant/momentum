import ListingHeader from "src/components/listing/ListingHeader.jsx";
import Task from "src/components/task/Task.jsx";
import testImage from 'src/assets/test.png'

const Listing = () => {
    const headers = [
        { text: "დასაწყები", bgColor: "bg-[#F7BC30]" },
        { text: "პროგრესში", bgColor: "bg-[#FB5607]" },
        { text: "მზად ტესტირებისთვის", bgColor: "bg-[#FF006E]" },
        { text: "დასრულებული", bgColor: "bg-[#3A86FF]" },
    ];

    return (
        <div className="mt-[68px]">
            <div className="flex justify-between mb-[30px]">
                {headers.map((header, index) => (
                    <ListingHeader
                        key={index}
                        text={header.text}
                        bgColor={header.bgColor}
                    />
                ))}
            </div>
            <div className='flex justify-between mb-[30px]'>
                <div className="flex flex-col gap-[30px]">

                </div>
            </div>
        </div>
    );
};

export default Listing;