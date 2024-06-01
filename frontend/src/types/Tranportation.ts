export interface Transportation{
    name: string;
    description: string;
    options: Option[];
    price: {
        currency: string;
        minValue: number;
        maxValue: number;
    };
    additionalInfo: {
        note: string;
        phoneNumbers: {
            [key: string]: string;
        }
    }
    quickReview: string;
    recommended: boolean;
}

interface Option{
    name: string;
    description: string;
}