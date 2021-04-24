import {
    SORT_BY_FEE ,
    SORT_BY_FEE_DESC ,
    CLASS_SELECTED ,
    SUBJECT_SELECTED ,
    EXPERIENCE_SELECTED ,
    GENDER_SELECTED ,
    FEE_RANGE_SELECTED ,
    SEARCH_QUERY ,
    CHANGE_PAGE ,
    LOAD_DATA ,
    LOAD_DATA_SUCCESS ,
    LOAD_DATA_FAILED , 
    CHANGE_NUM_TEACHERS
  } from '../actions/types';
  
  const initialState = {
    sort_fee : 1 , //Ascending
    classes : [] ,
    subjects : [] ,
    results : [] ,
    gender : "all" , //For all genders
    experience : "all", 
    fee_range_min : -1 , //Means not provided otherwise we would have min max
    fee_range_max : -1 , //Means not provided
    skip: 0,
    num_rows : 10,
    search : '' ,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: String | null
  };
  
const filterStore = (state = initialState, action) => {
    const { type, payload } = action;
    console.log("In filter store reducer :" , type , " ::  " , payload);
   switch (action.type) {
        case SORT_BY_FEE:
            return {
                ...state,
                sort_fee : payload ,
            };
   
       case SORT_BY_FEE_DESC:
           //sort alphabetically
           return state;
       case CLASS_SELECTED:
           //sort by price
           return {
            ...state ,
            classes : [payload] };
       case SUBJECT_SELECTED:
           //filter by price
           return {
            ...state ,
            subjects : [payload] };

       case LOAD_DATA:
            //load data
            return {
                ...state ,
                status : 'loading' };
       case LOAD_DATA_SUCCESS:
            //load data
            return {
                ...state ,
                status : 'succeeded' ,
                results : payload
             };
       case LOAD_DATA_FAILED:
            //load data
            return {
                ...state ,
                status : 'failed' };
       case EXPERIENCE_SELECTED : 
        return {
            ...state ,
            experience : payload
        } 
       case FEE_RANGE_SELECTED : 
        //check range is not valid
        if(payload.split("-").length < 2 )
            return { ...state , fee_range_max : -1 , fee_range_min : -1 }
        return {
            ...state ,
            fee_range_min : payload.split("-")[0] , //"5000-1000"
            fee_range_max : payload.split("-")[1]
        }        
        case GENDER_SELECTED : 
        return {
            ...state ,
            gender : payload
        }
        case CHANGE_PAGE : 
            return {
                ...state ,
                skip : payload
            }
        case SEARCH_QUERY : 
            return {
                ...state ,
                search : payload
            }
        case CHANGE_NUM_TEACHERS : 
            return {
                ...state ,
                num_rows : payload
            }
        default:
           return state;
   }
};
export default filterStore;