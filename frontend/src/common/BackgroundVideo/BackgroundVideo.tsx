import React, { memo } from 'react';

interface BackgroundVideoProps {
  src: string;
  className?: string;
  'data-testid'?: string;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ src, className, 'data-testid': testId }) => {
  return (
    <video
      data-testid={testId}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      className={`${className} w-full h-full object-cover`}
      style={{
        objectFit: 'cover',
        WebkitTransform: 'translate3d(0, 0, 0)', // Prevents Safari zoom
      }}
    />
  );
};

export default memo(BackgroundVideo);
