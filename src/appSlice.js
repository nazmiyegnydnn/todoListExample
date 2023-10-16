import { createSlice } from '@reduxjs/toolkit' 

const initialState = { 
    product: [
        {
            id:1,
            name: "tolga"
        },
        {
            id:2,
            name: "tolga"
        }
    ],
}
  

  export const appSlice =  createSlice({ 
    name: 'app',  
    initialState,
    reducers: {
            // kull olay //
             addcategory : (state , action)  => {
            state.category = [...state.category , {id:3 , name: "c3"}]  
        }
        
    }
  })

  export const {addcategory} = appSlice.actions  
  export default appSlice.reducer 