import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ handleClick }) => {
  return <Btn onClick={handleClick}>Load More</Btn>;
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
