import {css} from 'emotion.instance';
import {media} from 'components/Media';

const maxColAmount = 12;

const calcPercentages = (cols = maxColAmount) => {
  const colsAmount = typeof cols === 'number' && cols <= maxColAmount ? cols : maxColAmount;
  return (100 / maxColAmount) * colsAmount;
};

const generateStyle = (cols, screen) => {
  const percentages = calcPercentages(cols) || 100;

  return `
  @media ${media.device[screen]} {
    flex-grow: 0;
    max-width: ${percentages}%;
    flex-basis: ${percentages}%;
  }`;
};

const size = ({xs = maxColAmount, sm = xs, ms = sm, md = ms, lg = md, xl = lg}) => {
  let styles = [];
  if (xs) {
    styles.push(generateStyle(xs, 'xs'));
  }
  if (sm) {
    styles.push(generateStyle(sm, 'sm'));
  }
  if (ms) {
    styles.push(generateStyle(ms, 'ms'));
  }
  if (md) {
    styles.push(generateStyle(md, 'md'));
  }
  if (lg) {
    styles.push(generateStyle(lg, 'lg'));
  }
  if (xl) {
    styles.push(generateStyle(xl, 'xl'));
  }
  return styles.join(' ');
};

export const column = ({xs, sm, ms, md, lg, xl}) => css`
  box-sizing: border-box;
  max-width: 100%;
  min-height: 1px;
  position: relative;

  ${size({xs, sm, ms, md, lg, xl})}
`;
