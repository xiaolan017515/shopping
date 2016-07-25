# 电子商务类网站

基于webpack实现模块化和前端代码管理的购物网站

## 目录结构

~~~bash
├── assets
├── node_modules
├── package.json
├── README.md
├── src
│   ├── js
│   │   ├── common
│   │   ├── components
│   │   ├── lib
│   │   └── modules
│   ├── style
│   │   ├── css
│   │   │   ├── fonts
│   │   │   └── test.less
│   │   └── images
│   └── test.html
└── webpack.config.js
~~~

注:
- common为公共模块；

- components为组件目录，存放组件js/less文件；

- modules为各页面入口文件；

- assets为打包后资源存放路径。

## 组件

组件基于jQeury

### message组件

message组件为消息弹框，主要分为三类：

| method    |   params  |  description |
| :----- |:----------| :-----------|
| $(selector).message |option  | 配置信息，包括标题，内容，按钮文本 |
| ... |[type]   |弹出框类型 （warn/wrong/defatult）,默认defatult |
| ... |submitFun   | 提交事件|
| ... |cancelFun   | 取消事件|
| ... |mark   |遮罩（boolean）,默认开启 |
| ... |[css]   | 样式设置，遵循jQuery的css({})方法|
|  $(selector).shortMessage | type | 消息类型 （boolean）|
| ... | mark  | 遮罩（boolean), 默认关闭|
| ... | txt | 消息类容，可以为任意文本，包括HTML标签 |
| ... | duration  | 显示时长,小于1000ms，则自动默认1000ms |
| ... | [css]  | 样式设置，遵循jQuery的css({})方法 |
|  $(selector).throwMsg |txt | 消息内容 |
| ... |btn  | 按钮文字 |
| ... |mark  | 遮罩（boolean）,默认关闭 |
| ... |[css]  | 消息内容 |
| ... |[fun] | 点击函数 |

### popup组件
#### 1. selector 

- 下拉菜单，并支持多级，页面标签书写遵循如下规则即可：

~~~html
<div class="popup" data-type="menu" id="food">
    <button value="食物">食物</button>
    <div class="box">     // 多级菜单起始
      <button value="水果">水果</button>     //二级菜单触发源
      <div class="sub">      // 二级菜单盒子
          <button value="温带水果">温带水果</button>
          <div class="box">
              <button value="热带水果">热带水果</button>
              <div class="sub">
                <button value="菠萝">菠萝</button>
                <button value="香蕉">香蕉</button>
                </div>
              </div>
          </div>
      </div>
      <button value="蔬菜">蔬菜</button>
    </div>
</div>
~~~

- 暂时只支持勾选赋值操作，后续增加change事件等。

### datagrid组件
~~~html
<div class="datagrid box box-tb">
    <div class="head box box-lr">
        <div class="cell" data-name="name">name</div>
        <div class="cell" data-name="sex">sex</div>
        <div class="cell flex" data-name="age">age</div>
    </div>
    <div class="content">
        <div class="row box box-lr">
            <div class="cell col-1">name</div>
            <div class="cell col-2">sex</div>
            <div class="cell flex col-3">age</div>
        </div>
    </div>
</div>
~~~
注:

- 单纯的数据展示表格；

- 后续增加赋值操作等事件。
  



