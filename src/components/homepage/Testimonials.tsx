import Testimonial from './Testimonial';

const Testimonials = () => {
    return (
        <div className="py-32">
            <div className="flex flex-col justify-center max-w-[1500px] max-w-screen mx-auto p-8">
                <h2 className="w-full text-center text-4xl font-bold">
                    A Opinião dos Nossos Clientes
                </h2>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4">
                    <Testimonial
                        imageUrl="https://i.ibb.co/1nbj50S/Ellipse-1.png"
                        name="1 Maria das Rosas"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been..."
                        stars={5}
                    />
                    <Testimonial
                        imageUrl="https://i.ibb.co/1nbj50S/Ellipse-1.png"
                        name="2 Maria das Rosas"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been..."
                        stars={3}
                    />
                    <Testimonial
                        imageUrl="https://i.ibb.co/1nbj50S/Ellipse-1.png"
                        name="3 Maria das Rosas"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been..."
                        stars={4.4}
                    />
                    <Testimonial
                        imageUrl="https://i.ibb.co/1nbj50S/Ellipse-1.png"
                        name="4 Maria das Rosas"
                        text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been..."
                        stars={4}
                    />
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
