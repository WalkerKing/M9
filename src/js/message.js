
//1. 返回ajax对象
//2. error回调

//用法：
/*
var p = {
    cmd: 'cmd',
    subcmd: 'subcmd',
    val: {
        //
    },
    cb: function(error, data) {
        if(error){
            //错误处理，此时data是textStatus
        }else{
            //ajax成功，data是后台返回的val
        }
    }
}
var ajax = new Network(p);

*/

(function(window, $, util) {
    //网络工具
    util.network = {
        createParam(cmd, subcmd, val) {
            return {
                cmd,
                subcmd,
                val
            };
        },
        send_async(p) {

            let param = new this.createParam(p.cmd, p.subcmd, p.val);
            let paramStr = JSON.stringify(param);

            //返回ajax对象
            return $.ajax({
                type: 'post',
                async: true,
                url: p.url,
                dataType: 'json',
                xhrFields: {withCredentials: true},
                crossDomain: true,
                data: {'input': paramStr},
                success: (data, textStatus, jqXHR) => {
                    p.cb(1, data);
                },
                error: (XMLHttpRequest, textStatus, errorThrown) => {
                    p.cb(0, textStatus);
                }
            });

        },
        send_sync(p) {

            let param = new this.createParam(p.cmd, p.subcmd, p.val);
            let paramStr = JSON.stringify(param);

            //返回ajax对象
            return $.ajax({
                type: 'post',
                async: false,
                url: p.url,
                dataType: 'json',
                data: {'input': paramStr},
                success: (data, textStatus, jqXHR) => {
                    p.cb(1, data);
                },
                error: (XMLHttpRequest, textStatus, errorThrown) => {
                    p.cb(0, textStatus);
                }
            });

        }
    };
})(window, jQuery, util);
