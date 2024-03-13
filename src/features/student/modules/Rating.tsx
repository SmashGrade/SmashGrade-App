import styles from './Rating.module.scss';

export type RatingType = 'good' | 'median' | 'bad' | 'none';

const RATING_CLASSNAMES: Record<RatingType, string> = {
    good: styles.ratingGood,
    median: styles.ratingMedian,
    bad: styles.ratingBad,
    none: styles.ratingNone,
};

const getRatingClass = (rating: number) => {
    switch (true) {
        case rating <= 0:
            return RATING_CLASSNAMES.none;
        case rating < 4:
            return RATING_CLASSNAMES.bad;
        case rating < 5:
            return RATING_CLASSNAMES.median;
        default:
            return RATING_CLASSNAMES.good;
    }
};

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
