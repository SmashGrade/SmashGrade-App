import styles from './Rating.module.scss';

export type RatingType = 'good' | 'median' | 'bad';

interface RatingProps {
    rating: number;
    ratingType: RatingType;
}
export default function Rating({ rating, ratingType }: RatingProps) {
    return (
        <div className={`${styles.ratingContainer}`}>
            <div
                className={`${styles.rating} ${ratingType === 'good' ? styles.ratingGood : ''} ${
                    ratingType === 'bad' ? styles.ratingBad : ''
                } ${ratingType === 'median' ? styles.ratingMedian : ''}`}
            >
                {rating}
            </div>
        </div>
    );
}
