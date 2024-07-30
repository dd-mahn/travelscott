import React from 'react';
import EarthScene from './EarthScene';

const Globe: React.FC = () => {
    return (
        <section className="globe relative grid items-center rounded-5xl lg:pb-sect-long lg:pt-sect-short 2xl:pb-sect-long 2xl:pt-sect-short">
            <span className="px-sect p-large absolute -top-10 right-0 font-semibold uppercase">
              And we've covered these countries in our catalog too!
            </span>
            <EarthScene />
          </section>
    );
};

export default Globe;