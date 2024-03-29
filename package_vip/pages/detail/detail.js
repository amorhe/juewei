import { ajax, _sid } from '../../../pages/common/js/li-ajax'
import { imageUrl2 } from '../../../pages/common/js/baseUrl'

Page({
  data: {
    imageUrl2,
    _sid,
    detail: {
      "id": "355",
      "goods_name": "123",
      "total_num": "1",
      "valid_num": "1",
      "cate_id": "25",
      "intro": "<p>123<\/p>",
      "goods_type": "2",
      "goods_detail_type": "4",
      "gift_id": "473",
      "exchange_type": "1",
      "point": "1",
      "amount": "0",
      "start_time": "2019-06-22 00:00:00",
      "end_time": "2019-07-31 23:59:59",
      "receive_type": "2",
      "get_start_time": "0000-00-00 00:00:00",
      "get_end_time": "0000-00-00 00:00:00",
      "scope_type": "3",
      "company_id": "0",
      "city_id": "1",
      "district_id": "0",
      "express_type": "1",
      "express_fee": "0",
      "exchange_limit_type": "1",
      "exchange_limit_num": "111",
      "exchange_day_num": "0",
      "exchange_intro": "<p>123123<\/p>",
      "sort_no": "12345",
      "status": "2",
      "create_time": "2019-06-22 14:47:58",
      "update_time": "2019-06-22 14:47:58",
      "goods_pic": [{
        "id": "318",
        "goods_pic": "\/static\/check\/image\/goods_point\/oXQW34ZBT6Pcbkx0.jpg"
      }, {
        "id": "454",
        "goods_pic": "\/static\/check\/image\/goods_point\/noTHmy1mTM09NrRh.png"
      }]
    }
  },
  async onLoad(e) {
    const { id } = e
    await this.getDetail(id)
  },

  async getDetail(id) {
    let res = await ajax('/mini/vip/wap/goods/goods_detail', { id })
    if (res.code === 100) {
      this.setData({
        detail: res.data
      })
    }
  },

  async createOrder(){
    let {id,exchange_type,point,amount} = this.data.detail;
    let {_sid} = this.data;

    let params = {
      'goods[goods_id]':id,
      'goods[exchange_type]':exchange_type,
      'goods[point]':point,
      'goods[amount]':amount,
      _sid
    }
    let {code,data} = await ajax('/mini/vip/wap/trade/create_order',params)
    if(code === 100){
      return data
    }
  },

  async confirmOrder(order_sn){
    let {_sid} = this.data;
    let params = {order_sn,_sid}
    let {code,data} = await ajax('/mini/vip/wap/trade/confirm_order',params)
    return code === 100
  },

  showConfirm() {
    // goods_type	是	int	订单类型 1 虚拟订单 2 实物订单
    // receive_type	是	int	发货方式 0 无需发货 1 到店领取 2公司邮寄
    // goods_detail_type	是	int	物品详细类型 1 优惠券 2兑换码 3官方商品 4非官方商品
    const { goods_detail_type, receive_type, goods_type, goods_name, point } = this.data.detail
    if (true) {

      return my.confirm({
        content: '是否兑换“' + goods_name + '”将消耗你的' + point + '积分',
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        success: async result => {
          if (result.confirm && result.ok) {
            // 虚拟商品，点击兑换按钮，调用创建订单接口，然后调用确认订单接口，然后调起支付
            if (goods_type == 1) {
             let {order_id,order_sn} = await this.createOrder()
             let res = await this.confirmOrder(order_sn)

              // 虚拟订单 + 兑换码 => 无需发货
              if (goods_detail_type == 2 && receive_type == 0) {
                my.navigateTo({
                  url: './finish?receive_type=0'
                });
              }

              // 虚拟订单 + 优惠卷 => 无需发货
              if (goods_detail_type == 1 && receive_type == 0) {
                my.navigateTo({
                  url: './finish?receive_type=0'
                });
              }
            }

            // 实物订单 + 快递 => 公司邮寄
            if (goods_type == 2 && receive_type == 2) {
              my.navigateTo({
                url: './finish/finish?receive_type=2'
              });
            }

            // 实物订单 + 无需发货 => 到店领取
            if (goods_type == 2 && receive_type == 1) {
              my.navigateTo({
                url: '../finish/finish?receive_type=1'
              });
            }

          }
        },
      });
    }

    my.confirm({
      content: '你的当前积分不足',
      confirmButtonText: '赚积分',
      cancelButtonText: '取消',
      success: result => {
        console.log(result)
      },
    });
  }
});
