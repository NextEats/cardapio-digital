import { FaCheck } from 'react-icons/fa';

interface iCardSubscriptionPlan {
    monthlyPrice: number;
    name: string;
    description: string;
    features: Array<string>;
}

const CardSubscriptionPlan = (props: iCardSubscriptionPlan) => {
    const { monthlyPrice, name, description, features } = props;

    return (
        <div
            className={`h-[500px] p-12 rounded-lg flex flex-col items-center justify-center bg-white`}
        >
            <div className="w-full">
                <span className="text-4xl inline font-bold text-brand-dark-orange">
                    R$&nbsp;{monthlyPrice}
                </span>
                <span className="ml-3 italic text-gray-500">por mês</span>
            </div>
            <h4 className="w-full text-6xl font-semibold mt-6">{name}</h4>
            <p className="w-full mt-4 mb-10 italic text-gray-800">
                {description}
            </p>
            <ul className="w-full">
                {features.map((feat, index) => {
                    return (
                        <li
                            className="flex flex-row items-center text-lg text-gray-600"
                            key={index}
                        >
                            <div className="h-9 my-2 w-9 flex items-center justify-center bg-[#2C7AED] rounded-full">
                                <FaCheck className="text-xl text-white" />
                            </div>
                            <span className="ml-2">{feat}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CardSubscriptionPlan;
