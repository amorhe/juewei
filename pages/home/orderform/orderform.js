import {imageUrl} from '../../common/js/baseUrl'
Page({
  data: {
    imageUrl,
    // 换购商品列表
    repurseList:[
      {
        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3858629,3224043760&fm=26&gp=0.jpg',
        goodsName: '黑鸭鸡膝软骨',
        goodsType: '超辣',
        goodsNum: 2000,
        price: 4,
        oldPrice: 10
      },
      // {
      //   img: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3898176482,3211240837&fm=26&gp=0.jpg',
      //   goodsName: '如来鸭掌',
      //   goodsType: '甜辣',
      //   goodsNum: 20000,
      //   price: 10,
      //   oldPrice: 20
      // }
    ],
    countN:0,
    mask:false,
    modalShow:false,
    type:0,
    content:""
  },
  onLoad() {
    switch(this.data.type) {
      case 0:
        this.setData({
          content: "有5个商品已失效，系统已清除，是否确认结算"
        })
         break;
      case 1:
        this.setData({
          content: "有5个商品价格更新，系统已清更新，是否确认结算"
        })
         break;
      case 2:
        this.setData({
          content: "有1个商品已失效，有5个商品价格更新，系统已清更新，是否确认结算"
        })
         break;
    }
  },
  // 换购
  addRepurseTap(){
    this.setData({
      countN:1
    })
  },
  reduceBtnTap(){
    this.setData({
      countN: this.data.countN - 1
    })
  },
  addBtnTap(){
    this.setData({
      countN: this.data.countN + 1
    })
  },
  onCounterPlusOne(){
    this.setData({
      mask: false,
      modalShow: false
    })
  },
  confirmPay(){
    this.setData({
      mask: true,
      modalShow: true
    })
  }
});
