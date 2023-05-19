import { FaStar, FaStarHalf } from 'react-icons/fa';

interface iStarRating {
  rating: number;
}

const StarRating = ({ rating }: iStarRating) => {
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest .0 or .5

  const starIcons = [];
  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(roundedRating)) {
      starIcons.push(<FaStar key={i} className="text-[#ff5c1b]" />);
    } else if (i === Math.floor(roundedRating) && roundedRating % 1 !== 0) {
      starIcons.push(<FaStarHalf key={i} className="text-[#ff5c1b]" />);
    } else {
      starIcons.push(<></>);
    }
  }

  return <>{starIcons}</>;
};

export default StarRating;
