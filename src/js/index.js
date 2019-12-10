// 依赖插件引入
require.config({
    paths: {
        "jquery": "../assets/jquery.min"
    },
    // shim: {             // 非模块化开发文件需要这一步操作
    //     'lazyload': ['jquery']
    // }
});
define(['jquery'], function($){
    let page = {
        init: function(){
            const self = this;
            self.initData();
            self.initEvent();
        },
        initData: function(){
            const self = this;
        },
        initEvent: function(){
            const self = this;
            $('.wrap').on('click', function(){
                console.log(123)
            })
        }
    }
    page.init()
})
