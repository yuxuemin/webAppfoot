//引入模板
var indexTpl=require("../templates/m-index.string");
//引入util
var util=require("../util/util.js");
//定义视图
SPA.defineView("index",{
  //装载HTML
	html:indexTpl,
  //引入delegated插件，用于绑定tap事件
	plugins: ['delegated'],
  //定义视图
	modules: [{
   			 name: 'content',    //视图名称，用于引用的句柄
    		 container: '.m-index',   //子视图渲染到主视图时的容器
    		 defaultTag: 'home',    //默认视图
    		 views: ['home', 'search', 'my'] //子视图集
  			}],
  //绑定视图事件
	bindEvents:{
		show:function(){
			
			},
		
  		
	},
  //绑定视图元素的tap事件
	bindActions:{
  			"tab":function(e,data){
          //当前高亮显示
  				//$(e.el).addClass("active").siblings().removeClass("active");
          util.setFocus($(e.el));
          //切换子视图
  				this.modules.content.launch(data.tag);

  			},
  			"close.index":function(){
          //隐藏视图
  				this.hide();
  			}
  		}
});
