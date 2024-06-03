import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface IAccordionState {
  selectedAccordionId: string;
}

const initialState: IAccordionState = {
  selectedAccordionId: '',
};

export const accordionSlice = createSlice({
  name: 'accordion',
  initialState: initialState,
  reducers: {
    setAccordion: (state, action: PayloadAction<string>) => {
      state.selectedAccordionId = action.payload;
    },
    resetAccordion: state => {
      state.selectedAccordionId = initialState.selectedAccordionId;
    },
  },
});
export const {setAccordion, resetAccordion} = accordionSlice.actions;

export default accordionSlice.reducer;
