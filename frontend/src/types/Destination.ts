import { StayPlace, VisitPlace, EatPlace } from "src/types/Place";
import { Transportation } from "src/types/Tranportation";
import { Review } from "src/types/Review";

export interface Destination {
    _id: string;
    name:string;
    images: string[];
    country: string;
    description: string;
    places: {
        toStay: StayPlace[];
        toVisit: VisitPlace[];
        toEat: EatPlace[];
    };
    tranportation: {
        overview: string;
        types: Transportation[];
    }
    types: string[];
    reviews: {
        blogs: Review[];
        videos: Review[];
    };
    summary: string;
}