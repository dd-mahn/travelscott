import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Country from "src/types/Country";

interface ContinentData {
    name: string;
    countries: Country[];
    count: number;
    image: string;
}

interface ContinentState {
    continents: ContinentData[];
}

const initialState: ContinentState = {
    continents: [],
};

const continentSlice = createSlice({
    name: "continent",
    initialState,
    reducers: {
        setContinents: (state, action: PayloadAction<ContinentData[]>) => {
            state.continents = action.payload;
        },
        updateContinent: (state, action: PayloadAction<ContinentData>) => {
            const index = state.continents.findIndex(c => c.name === action.payload.name);
            if (index !== -1) {
                state.continents[index] = action.payload;
            } else {
                state.continents.push(action.payload);
            }
        },
    }
});

export const { setContinents, updateContinent } = continentSlice.actions;
export default continentSlice.reducer;