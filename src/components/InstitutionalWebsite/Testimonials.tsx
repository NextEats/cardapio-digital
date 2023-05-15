import Testimonial from './Testimonial';

const Testimonials = () => {
  return (
    <div className="py-10">
      <div className="flex flex-col justify-center max-w-[1500px] max-w-screen mx-auto p-8">
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-x-4 gap-y-4">
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
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
