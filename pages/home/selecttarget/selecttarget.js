<<<<<<< HEAD
import {imageUrl} from '../../common/js/baseUrl'
Page({
  data: {
    imageUrl
  },
  onLoad() {},
  choosecityTap(){
    my.chooseCity({
      showLocatedCity:true,
      showHotCities:true,
      success: (res) => {
        console.log(res)
      },
    });
  }
=======
Page({
  data: {},
  onLoad() {},
>>>>>>> 7e77cfbb2662b35232efc82e90ba3c220851f8ac
});
