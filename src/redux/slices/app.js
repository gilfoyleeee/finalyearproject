import { createSlice } from "@reduxjs/toolkit";

//

const initialState = {
    sidebar: {
        open: true,
        type: "CONTACT", //can be CONTACT, STARRED, SHARED
    }
}
console.log('initialState:', initialState);
const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        //Toggle Sidebar
        toggleSidebar(state) {
            // if(state.sidebar){
            // state.sidebar.open = !state.sidebar.open;}

            state.sidebar.open = !state.sidebar.open;

        },
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type;
        }
    }
})

//Reducer
export default slice.reducer;

//
export function ToggleSidebar() {
    return async (dispatch) => {
      dispatch(slice.actions.toggleSidebar());
    };
  }

export function UpdateSidebarType(type) {
  return async (dispatch) => {
    dispatch(slice.actions.updateSidebarType({ type }));
  };
}