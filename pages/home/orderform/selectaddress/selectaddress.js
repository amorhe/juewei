import {imageUrl} from '../../../common/js/baseUrl'

Page({
  data: {
    imageUrl,
    addressList:[
      { id:1 , address: '紫檀大厦 606', name: '小春（先生）', phone: '18885458784' },
      { id:2 ,address: '中南海', name: '习近平（先生）', phone: '18888888888', checked: true },
      { id:3 ,address: '天安门', name: '董明珠（女士）', phone: '18213218134' }
    ],
    mask:false,
    modalShow:false,
  },
  onLoad() {},
  radioChange(e) {
    console.log('你选择的框架是：', e.detail.value);
  },
  // 选择不在配送范围内的地址
  chooseNewAddress(){
    this.setData({
      mask: true,
      modalShow: true
    })
  },
  onCounterPlusOne(data) {
    this.setData({
      mask: data.mask,
      modalShow: data.modalShow
    })
  },
});
