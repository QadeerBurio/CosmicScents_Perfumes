import {
 
  getSliderImages
  
} from "./fetchApi";
export const sliderImages = async (dispatch) => {
  try {
    let responseData = await getSliderImages();
    if (responseData && responseData.Images) {
      dispatch({ type: "sliderImages", payload: responseData.Images });
    }
  } catch (error) {
    console.log(error);
  }
};