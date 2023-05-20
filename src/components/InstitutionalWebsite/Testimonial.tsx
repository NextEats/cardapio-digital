import StarRating from './StartRating';

interface iTestimonial {
  imageUrl: string;
  name: string;
  text: string;
  stars: number;
}

const Testimonial = (props: iTestimonial) => {
  const { imageUrl, name, text, stars } = props;

  return (
    <div className="flex flex-row p-9 rounded-xl shadow-md shadow-slate-400">
      {/* <Image
        className="w-24 h-24"
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
      /> */}
      <div className="">
        <span className="text-lg font-bold text-brand-dark-orange">{name}</span>
        <p className="mt-1 mb-7 font-bold">{text}</p>
        <div className="flex flex-row gap-x-1 text-orange-400 text-xl">
          <StarRating rating={stars} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
