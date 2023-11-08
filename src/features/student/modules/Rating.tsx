import styles from './Rating.module.scss';

export type RatingType = 'good' | 'median' | 'bad';

const RATING_CLASSNAMES: Record<RatingType, string> = {
    good: styles.ratingGood,
    median: styles.ratingMedian,
    bad: styles.ratingBad,
};

const getRatingClass = (rating: number) => {
    if (rating < 4) {
        return RATING_CLASSNAMES.bad;
    } else if (rating < 5) {
        return RATING_CLASSNAMES.median;
    } else {
        return RATING_CLASSNAMES.good;
    }
};

interface RatingProps {
    rating: number;
}
export default function Rating({ rating }: Readonly<RatingProps>) {
    return (
        <div className={`${styles.ratingContainer}`}>
            <div className={`${styles.rating} ${getRatingClass(rating)}`}>{rating}</div>
        </div>
    );
}
