import styles from '../../generic.module.scss';

export type RatingType = 'good' | 'median' | 'bad' | 'none';

const RATING_CLASSNAMES: Record<RatingType, string> = {
    good: styles.ratingGood,
    median: styles.ratingMedian,
    bad: styles.ratingBad,
    none: styles.ratingNone,
};

export const getRatingClass = (rating: number) => {
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
