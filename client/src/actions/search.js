import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';
import {
   SORT_BY_FEE ,
   SORT_BY_FEE_DESC ,
   CLASS_SELECTED ,
   SUBJECT_SELECTED ,
   EXPERIENCE_SELECTED ,
   GENDER_SELECTED ,
   FEE_RANGE_SELECTED ,
   SEARCH_QUERY ,
   LOAD_DATA ,
   LOAD_DATA_FAILED,
   LOAD_DATA_SUCCESS ,
   CHANGE_PAGE , 
   CHANGE_NUM_TEACHERS
} from './types';

//File hosting api url i.e base url
const mediaBaseUrl = process.env.REACT_APP_MEDIA_URL;
// const apiUrl = 'https://hometutorpk.herokuapp.com/';
const apiUrl = process.env.REACT_APP_APP_SERVER_URL;

export const applyFilters = () => async dispatch => {
   try{
      dispatch(loadData());      
      let data = await fetchData();
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
      const error = err.response.data;
      if (error) {
          dispatch(failed());
      }
   }
}
export const changeNumTeachers = (payload) => async dispatch => {
   try{
      dispatch(loadData());      
      dispatch({
         type: CHANGE_NUM_TEACHERS,
         payload
      });
      let data = await fetchData();
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
      const error = err.response.data;
      if (error) {
          dispatch(failed());
      }
   }
}

export const sortByFee = payload => async dispatch => {
      //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: SORT_BY_FEE,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
//For pgination to work
export const pageChanged = payload => async dispatch => {
   console.log("Payload recieved in page change " , payload)
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: CHANGE_PAGE,
         payload 
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters from change page"  , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
export const sortByFeeDes = payload => ({
   type: SORT_BY_FEE_DESC,
   payload
});
// export const classSelected = payload => ({
//    type: CLASS_SELECTED,
//    payload
// });
// export const subjectSelected = (payload) => ({
//    type: SUBJECT_SELECTED,
//    payload
// });
// export const experienceSelected = (payload) => ({
//    type: EXPERIENCE_SELECTED,
//    payload
// });
export const genderSelected = payload => async dispatch => {
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: GENDER_SELECTED,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters in gender selected" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};

export const experienceSelected = payload => async dispatch => {
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: EXPERIENCE_SELECTED,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters in experience selected" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
// export const genderSelected = payload => ({
//    //change state to fetching data   
  
//       console.log("Data which is fetched after filters" , data , ":::");
// });
// export const feeRangeSelected = (payload) => ({
//    type: FEE_RANGE_SELECTED,
//    payload
// });
export const feeRangeSelected = payload => async dispatch => {
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: FEE_RANGE_SELECTED,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters in fee  selected" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
export const subjectSelected = payload => async dispatch => {
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: SUBJECT_SELECTED ,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters in fee  selected" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
export const classSelected = payload => async dispatch => {
   //change state to fetching data   
   try{
      dispatch(loadData());
      dispatch({
         type: CLASS_SELECTED ,
         payload
      });
      
      let data = await fetchData();
      console.log("Data which is fetched after filters in fee  selected" , data , ":::")
      dispatch(dataLoaded(data.data.users));      
   } catch (err) {
      console.log(err);
     const error = err.response.data;
     if (error) {
       dispatch(failed());
     }
   }
};
export const queryData = (payload) => ({
   type: SEARCH_QUERY,
   payload
});
export const loadData = () => ({
   type: LOAD_DATA,
   payload : ''
});
export const dataLoaded = (payload) => ({
   type: LOAD_DATA_SUCCESS ,
   payload
});
export const failed = () => ({
   type: LOAD_DATA_FAILED ,
   payload : ''
});

//This method will fetch data based on current state of redux
const fetchData = async ()=>{
   let body =  store.getState().filterStore;
   console.log("Gonna send search request with following body" , body);
   const config = {
     headers: {
       'Content-Type': 'application/json'
     }
   };
   delete body.results;
   return await axios.post(`${apiUrl}users/search` , body, config);
}