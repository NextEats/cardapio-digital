import Image from 'next/image';
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
    <div className="flex flex-row p-12 border">
      <Image
        className="w-24 h-24"
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
      />
      <div className="ml-5">
        <span className="text-lg font-semibold text-brand-dark-orange">
          {name}
        </span>
        <p className="mt-1 mb-7">{text}</p>
        <div className="flex flex-row gap-x-1 text-yellow-400 text-xl">
          <StarRating rating={stars} />
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
