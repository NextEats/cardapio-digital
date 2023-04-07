import CardSubscriptionPlan from './CardSubscriptionPlan';

const Features = () => {
    return (
        <div className="w-screen relative bg-gray-800">
            <div className="grid grid-cols-1 pt-16 p-6 gap-y-3 lg:grid-cols-3 gap-x-3 max-w-[1500px] mx-auto lg:pt-24 lg:pb-44">
                <CardSubscriptionPlan
                    monthlyPrice={100}
                    name="Start"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                    features={[
                        'Funcionalidade',
                        'Funcionalidade',
                        'Funcionalidade',
                    ]}
                />
                <CardSubscriptionPlan
                    monthlyPrice={270}
                    name="Pro"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                    features={[
                        'Funcionalidade',
                        'Funcionalidade',
                        'Funcionalidade',
                    ]}
                />
                <CardSubscriptionPlan
                    monthlyPrice={670}
                    name="Expert"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                    features={[
                        'Funcionalidade',
                        'Funcionalidade',
                        'Funcionalidade',
                    ]}
                />
            </div>
        </div>
    );
};

export default Features;
