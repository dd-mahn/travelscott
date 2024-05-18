import React from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

const MasonryImagesGallery = ({destinations}) => {
  console.log(destinations)
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{375:1, 769:2, 1024:3, 1536:4}}>
      {/* 350:1, 768:3, 992:4 */}
      <Masonry gutter='1rem'>
        {
          destinations?.map(destination => (
            <a href={`/destinations/${destination?._id}`} key={destination?._id} data-name={destination?.name} data-country={destination?.country} className='destination__card'>
              <img className='masonry__img' src={destination?.images[0]} alt={destination?.name} />
            </a>
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryImagesGallery