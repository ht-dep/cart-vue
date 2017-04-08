
/**
 * Created by zhaor on 2017-03-22.
 */
var app_ad = new Vue({
    el: '.container',
    data: {
        message: 'Hello Vue!',
        addressList:[],
        isCheckAll:false,
        delFlag:false
    },
    methods: {
        getAddressList: function () {
            this.$http.get("data/address.json").then(res => {
                this.addressList = res.body.result
            })
        }
    },
    mounted:function() {
        this.getAddressList()
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