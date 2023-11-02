import styles from './Rating.module.scss';

export type RatingType = 'good' | 'median' | 'bad';

const RATING_CLASSNAMES: Record<RatingType, string> = {
    good: styles.ratingGood,
    median: styles.ratingMedian,
    bad: styles.ratingBad,
};

interface RatingProps {
    rating: number;
    ratingType: RatingType;
}
export default function Rating({ rating, ratingType }: RatingProps) {
    return (
        <div className={`${styles.ratingContainer}`}>
            <div className={`${styles.rating} ${RATING_CLASSNAMES[ratingType]}`}>{rating}</div>
        </div>
    );
}
