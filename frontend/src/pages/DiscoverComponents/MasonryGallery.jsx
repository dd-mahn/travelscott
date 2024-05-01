import React from 'react'
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry'

const MasonryImagesGallery = ({destinations}) => {
  console.log(destinations)
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{375:1, 769:2, 1024:3, 1536:4}}>
      {/* 350:1, 768:3, 992:4 */}
      <Masonry gutter='1rem'>
        {
          destinations?.map((destination,index) => (
            <a href={`/destinations/${destination?._id}`} key={index}>
              <img className='masonry__img' src={destination?.images[0]} alt={destination?.name}  style={{'width':'100%',
              'display':'block', 'borderRadius':'5px'}} data-name={destination?.name} />
            </a>
          ))
        }
      </Masonry>
    </ResponsiveMasonry>
  );
}

export default MasonryImagesGallery