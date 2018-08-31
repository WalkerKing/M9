;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        module.exports = factory();
    } else {
        // Browser globals.
        window.util = factory();
    }
}(function () {
    let util = {
        
        /** 时间格式装换 timeFormat
         *
         * @param date 时期对象
         * @param fmt 时间格式字符串
         * @return {string}
         * timeFormat(new Date(), "yyyy-MM-dd");  // => 2016-07-18
         * timeFormat(new Date(), "yy-MM-dd");// => 16-07-18
         * timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss"); // => 2016-07-18 22:02:59
         */
        timeFormat (date, fmt) {
            let o = {
                "M+": this.getMonth() + 1, //月份
                "d+": this.getDate(), //日
                "h+": this.getHours(), //小时
                "m+": this.getMinutes(), //分
                "s+": this.getSeconds(), //秒
                "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                "S": this.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (let k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        /**
         * @param money 钱数字
         * @param seperator 分隔符 默认是英文逗号
         * @return {string} 钱格式字符串
         * 222 -> 222  3223 -> 3,222
         */
        moneyFormat (money, seperator) {
            if (!seperator) {
                seperator = ',';
            }
            let quotient = money + '';
            let arr = [];
            let reg = /\d{3}$/;
            let index;
            while ((index = quotient.search(reg)) !== -1) {
                arr.push(quotient.substr(index));
                quotient = quotient.substr(0, index);
            }
            if (quotient !== '') {
                arr.push(quotient);
            }
            return arr.reverse().join(seperator);
        },
        /**
         * 给页面添加css文件（link标签）
         * @param url css文件地址
         */
        appendLinkLabel (url) {
            // css地址
            let link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        /**
         * base64 解码
         * @param str 需要解码的数据
         * @return {string}
         */
        base64_decode (str) {
            // @str base64 加密的数据
            let c1, c2, c3, c4;
            let base64DecodeChars = [
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
                58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6,
                7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
                37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1,
                -1, -1
            ];
            let i = 0, len = str.length, string = '';
            
            while (i < len) {
                do {
                    c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (
                    i < len && c1 == -1
                    );
                
                if (c1 == -1) break;
                
                do {
                    c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
                } while (
                    i < len && c2 == -1
                    );
                
                if (c2 == -1) break;
                
                string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
                
                do {
                    c3 = str.charCodeAt(i++) & 0xff;
                    if (c3 == 61)
                        return string;
                    
                    c3 = base64DecodeChars[c3]
                } while (
                    i < len && c3 == -1
                    );
                
                if (c3 == -1) break;
                
                string += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
                
                do {
                    c4 = str.charCodeAt(i++) & 0xff;
                    if (c4 == 61) return string;
                    c4 = base64DecodeChars[c4]
                } while (
                    i < len && c4 == -1
                    );
                
                if (c4 == -1) break;
                
                string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
            }
            return string;
        },
        /**
         * 下载文件
         * @param url
         * @param filename
         */
        downloadFile (url, filename) {
            let a = document.createElement('a');
            
            a.href = url;
            
            a.target = '_blank';
            
            a.download = filename || (new Date()).getTime() + '';
            
            let e = document.createEvent('MouseEvents');
            
            e.initEvent('click', true, false);
            
            a.dispatchEvent(e);
            a = null;
        },
        /**
         * 查询浏览器信息（浏览器型号和版本）
         * @return {{}}
         */
        getBrowserInfo () {
            // 返回的对象有每种浏览器名的属性，属性值对应的是浏览器的版本，使用时首先判断是否为真，如果是真在拿浏览器版本。
            let Sys = {};
            let ua = navigator.userAgent.toLowerCase();
            let s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
                (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
                    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                        (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                            (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                                (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
            return Sys;
        },
        /**
         * 获取文件名为filename的绝对路径
         * @param filename  文件名
         * @return {string} 绝对路径
         */
        
        getFileAbsolutePath (filename) {
            // @filename 文件名
            let scripts = document.scripts;
            let jsPath = '';
            for (let i = scripts.length; i > 0; i--) {
                if (scripts[i - 1].src.indexOf(filename) > -1) {
                    jsPath = scripts[i - 1].src.substring(0, scripts[i - 1].src.lastIndexOf("/") + 1);
                    jsPath = jsPath.substring(0, jsPath.lastIndexOf("js"));
                }
            }
            return jsPath;
        },
        
        /**
         * 查询操作系统信息（win，mac，linux）
         */
        getOperatorSystemInfo () {
            //平台、设备和操作系统
            let OperatorSystem = {
                win: false,
                mac: false,
                xll: false,
                ipad: false
            };
            //检测平台
            let p = navigator.platform;
            OperatorSystem.win = p.indexOf("Win") === 0;
            OperatorSystem.mac = p.indexOf("Mac") === 0;
            OperatorSystem.x11 = (p === "X11") || (p.indexOf("Linux") === 0);
            OperatorSystem.ipad = Boolean(navigator.userAgent.match(/iPad/i));
            return OperatorSystem
        },
        /**
         *
         * @param str 含有查询字符串的字符串
         * @return {{}} 查询字符串解析后的结果
         */
        getQueryString (str) {
            // 获取路径str中的查询字符串，并返回对象
            let reg = /(([^?&=]+)(?:=([^?&=]*))*)/g;
            let result = {};
            let match;
            let key;
            let value;
            while (match = reg.exec(str)) {
                key = match[2];
                value = match[3] || '';
                result[key] = decodeURIComponent(value);
            }
            return result;
        }
    };
    //获取埋点对象
    /*
    config = {
        addr,
        brand,  // brand 品牌 字符串
        key,    //key 认证号
        duration, //duration 多少时间发一次， 毫秒 ， 为0 的时候来一条信息 发送一次
  
    }
    */
    // let msg = {
    //     cmd:'ginkgo',
    //     subcmd:'add',
    //     data:{
    //         'brand': '品牌',
    //         'key': '认证号',
    //         'items':[
    //             {
    //             'time_diff':'-12312 时间差值,单位毫秒',
    //             'tag':  '标签',
    //             'session': '会话',
    //             'userid': '用户id,如果为空,需要在cookie 里面创建用户',
    //             'data': '数据 json'
    //             }
    //         ]
    //     }
    // }
    
    let Ginkgo = function (config) {
        this.brand = config.brand;
        this.key = config.key;
        this.userId = config.userId || 'a1b2c3';
        this.queueNum = config.queueNum || 0;
        this.addr = config.addr;
        this.sessionTime = config.sessionTime || 600;    //用户多久没有操作后认定此次对话已终止?单位： 秒
        this.msgArr = [];
    };
    Ginkgo.prototype = {
        constructor: Ginkgo,
        getSendMsg (msgArr) {
            return encodeURIComponent('input=' + JSON.stringify(
                {
                    cmd: 'ginkgo',
                    subcmd: 'add',
                    val: {
                        brand: this.brand,
                        key: this.key,
                        items: msgArr
                    }
                }
            ))
        },
        send (item) {
            this.msgArr.push(this._repairItem(item));
            
            // 如果数量大于0
            if (this.queueNum <= 0 || this.msgArr.length >= this.queueNum) {
                this._sendData();
            }
        },
        //修复埋点信息，如果没有session，去取，如果没有user id，去取，信息采集时间，去取
        _repairItem (item) {
            if (!item.session) {
                item.session = this.getSession();
            }
            if (!item.userid) {
                item.userid = this.userId;
            }
            item.time_diff = 0;
            item.session = null;
            return item;
        },
        //获取当前信息的session id，同时判断距离最近一次信息采集的时间间隔，超过规定时间，则认为是一个新的会话，更换session id
        getSession () {
            let session_id = localStorage.getItem('ginkgo_session_id');
            let session_time = localStorage.getItem('ginkgo_session_time') || 0;
            if (!session_id || new Date().getTime() - session_time > this.sessionTime * 1000) {
                // 如果session id不存在，或者时间间隔大于失效时长，则认为是一个新的会话，重新生成一个session id
                session_id = new Date().getTime();
                localStorage.setItem('ginkgo_session_id', session_id);
            }
            return session_id;
        },
        //获取本次信息采集的时间
        _getSessionTime () {
            let session_time = new Date().getTime();
            localStorage.setItem('ginkgo_session_time', session_time);
            return session_time;
        },
        //发送埋点请求
        _sendData (url) {
            let img = document.createElement('img');
            img.src = this.addr + '?' + this.getSendMsg(this.msgArr);
        }
    };
    util.GetGinkgo = config => {
        return new Ginkgo(config);
    };
    return util;
}));
