import { imageUrl,imageUrl2 } from '../../../pages/common/js/baseUrl'
import { ajax } from '../../../pages/common/js/li-ajax'



Page({
  data: {
    imageUrl,
    imageUrl2,
    _sid: '4966-inviq2t1sdl3s95idh7a0s1dn',

    orderList: [
      {
        "id": "26",
        "order_point": "1",
        "order_amount": 0.01,
        "exchange_type": "2",
        "order_ctime": "2019-03-02 11:02:47",
        "uid": "295060",
        "order_type": "2",
        "status": "2",
        "dis_status": "2",
        "order_sn": "jwd03190302s265060",
        "goods_name": "4",
        "goods_pic": "/static/check/image/goods_point/wmyaUccmI47oFRkV.jpg",
        "status_name": "支付超时"
      }
    ],

    page_num: 1,
    page_size: 100,
  },
  async onLoad() {
    await this.getOrderList()
  },

  async getOrderList() {
    const { _sid, page_num, page_size } = this.data;
    let res = await ajax('/mini/vip/wap/order/order_list', { _sid, page_num, page_size })
    if( res.code === 100 ){
      this.setData({orderList:res.data.data})
    }
  },


  toOrderDetail(e){
    const {id} = e.currentTarget.dataset
    my.navigateTo({
      url:'./exchangedetail/exchangedetail?id='+id
    });
  }


});
