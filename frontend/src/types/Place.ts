
export interface Place {
    name: string;
    image_url: string;
    description: string;
    location: {
        on_map: string;
        address: string;
    };
}

export interface StayPlace extends Place {
    distance: number;
    price: {
        currency: string;
        value: number;
    };
    rating: {
        [key: string]: number;
    };
}

export interface VisitPlace extends Place {
    tips: string;
}

export interface EatPlace extends Place {
    price: {
        currency: string;
        value: number;
    };
    favorites: string[]
    rating: {
        [key: string]: number;
    };
}