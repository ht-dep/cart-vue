
/**
 * Created by zhaor on 2017-03-22.
 */
var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        productList:[],
        isCheckAll:false,
        delFlag:false
    },
    methods: {
        changeMsg: function (data) {
            this.message = data;
        },
        cartView: function () {
            this.$http.get("data/cart.json", {"id": 123}).then(function (res) {
                this.productList = res.body.result.productList
            })
        },
        getTotalPrice:function (item) {
            return item.productPrice * item.productQuentity;
        },
        changeQuentity:function (item,way) {
            if(way > 0) {
                item.productQuentity++
            } else if(item.productQuentity > 1){
                item.productQuentity--
            }
        },
        checkProduct:function (item) {
            if(item.isChecked) {
                item.isChecked = !item.isChecked
            } else {
                Vue.set(item,'isChecked',true)
                // this.$set(item,'isChecked',true)
            }
        },
        checkAll:function (flag) {
            this.isCheckAll = flag
            console.log(this)
            this.productList.forEach(function (e,i) {
                if(e.isChecked) {
                    e.isChecked = flag
                } else {
                    Vue.set(e,'isChecked',flag)
                }
            })

        },
        delConfirm:function (item) {
            this.curProduct = item
            this.delFlag = true
        },
        delProdunct:function (item) {
            var index = this.productList.indexOf(this.curProduct)
            this.productList.splice(index,1)
            this.delFlag = false
        },

    },
    mounted:function() {
        this.changeMsg('msg is changed!')
        this.cartView()
    },
    filters:{
        formatMoney:function (money) {
            return "￥ "+ money.toFixed(2);
        }
    },
    computed:{
        totalMoney:function () {
            var money = 0
            this.productList.forEach(function (e,i) {
                if(e.isChecked) {
                    money += e.productPrice * e.productQuentity
                }
            })
            return money
        }
    }
})