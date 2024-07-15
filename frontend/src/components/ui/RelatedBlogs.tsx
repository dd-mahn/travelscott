import React from 'react';

type RelatedBlogsProps = {
    country?: string;
    destination?: string;
    category?: string;
    continent?: string;
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ( {country, destination, category, continent}) => {
    return (
        <div>
        </div>
    );
};

export default RelatedBlogs;