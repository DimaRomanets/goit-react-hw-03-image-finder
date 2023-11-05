import { Item, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, clickOnLargeImage }) => {
  return (
    <Item className="gallery-item">
      <Image src={webformatURL} alt="" onClick={clickOnLargeImage} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  clickOnLargeImage: PropTypes.func.isRequired,
};
