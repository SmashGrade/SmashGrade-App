import styles from './Rating.module.scss';
import { getRatingClass } from '@components/ui-elements/Rating.ts';

interface RatingProps {
    rating: number;
}

function getDecimalRating(rating: number, decimalPlaces = 1) {
    return rating.toFixed(decimalPlaces);
}

export default function Rating({ rating }: Readonly<RatingProps>) {
    return (
        <div className={`${styles.ratingContainer}`}>
            <div className={`${styles.rating} ${getRatingClass(rating)}`}>
                {rating > 0 ? getDecimalRating(rating) : '-'}
            </div>
        </div>
    );
}
