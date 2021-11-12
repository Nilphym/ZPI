import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

import { deleteBugAttachment } from '../../redux/store';

const Image = styled('img')({
  maxWidth: '100%'
});

export const ImageCarousel = ({ closeCarousel, bugId, images, startingPosition }) => {
  const [position, setPosition] = useState(startingPosition);
  const dispatch = useDispatch();

  const handleDeleteIcon = () => {
    dispatch(deleteBugAttachment({ bugId, id: images[position].id }));
    closeCarousel();
  };

  return (
    <>
      <Carousel
        value={position}
        onChange={setPosition}
        slides={images.map(({ image }) => (
          <Image src={image} alt="" />
        ))}
        plugins={['arrows', 'clickToChange']}
      />
      <IconButton
        sx={{
          position: 'absolute',
          right: '3rem',
          bottom: '1rem',
          backgroundColor: 'white',
          color: 'black',
          '&:hover': {
            backgroundColor: 'secondary.light'
          }
        }}
        onClick={handleDeleteIcon}
      >
        <Delete />
      </IconButton>
    </>
  );
};

export default ImageCarousel;

ImageCarousel.propTypes = {
  closeCarousel: PropTypes.func.isRequired,
  bugId: PropTypes.string.isRequired,
  startingPosition: PropTypes.number,
  images: PropTypes.array.isRequired
};

ImageCarousel.defaultProps = {
  startingPosition: 0
};
