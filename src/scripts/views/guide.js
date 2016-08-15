var tplguide = require('../templates/guide.string');


SPA.defineView('guide', {
  html: tplguide,
  plugins:["delegated"],
  bindEvents:{
  	show:function(){
  		var mySwiper=new Swiper(".swiper-container");
  	}
  },
  bindActions:{
  	"go.home":function(){
  		SPA.open("index");//跳转到指定视图
  	}

  }
})