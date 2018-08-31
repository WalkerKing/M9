### M9
> 这是一个js版本的工具库 没有依赖

####  使用：

> npm

```
    cnpm install
```


> 普通

下载js,在页面引入


#### 使用示例

#### 方法说明

* timeFormat(date,fmt)

      @param date 时期对象
      @param fmt 时间格式字符串
      @return {string}
      timeFormat(new Date(), "yyyy-MM-dd");  // => 2016-07-18
      timeFormat(new Date(), "yy-MM-dd");// => 16-07-18
      timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss"); // => 2016-07-18 22:02:59

* moneyFormat(money,seperator)

      @param money 钱数字
      @param seperator 分隔符 默认是英文逗号
      @return {string} 钱格式字符串
      222 -> 222  3223 -> 3,222

* appendLinkLabel(url)

      给页面添加css文件（link标签）
      @param url css文件地址

* base64_decode(str)

      base64 解码
      @param str 需要解码的数据
      @return {string}

* getBrowserInfo()

      查询浏览器信息（浏览器型号和版本）
      @return {{ie:11,firefox: '',chrome: '',opera: ''}}

* getFileAbsolutePath(filename)

      获取文件名为filename的绝对路径
      @param filename  文件名
      @return {string} 绝对路径

* getOperatorSystemInfo()

      查询操作系统信息（win，mac，linux）

* getQueryString(str)

      @param str 含有查询字符串的字符串
      @return {{}} 查询字符串解析后的结果



