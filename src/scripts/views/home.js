var tplHome = require('../templates/home.string');
//引入util
var util=require("../util/util.js");
SPA.defineView('home', {
  html: tplHome,
  plugins:["delegated",{
  	name:"avalon",
  	options:function(vm){
  		vm.livedata=[];

  	}
  }],
  //初始化
  init:{
      vm:null,
      livelistArr:[],
  		homeSwiper:null,
      hotSwiper:null,
  		formatData:function(data){
  			//把一维数组转二维数组
  			var tempArr=[];
  			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
  				tempArr[i]=[];
  				tempArr[i].push(data[i*2]);
  				tempArr[i].push(data[i*2+1]);
  			}
  			return tempArr;
  		}
  },
  bindEvents:{

  	beforeShow:function(){
  		var that=this;
  		//获取VM
  		/*var vm=this.getVM();
  		$.ajax({
  			//url:"/webApp/mock/livelist.json",
  			url:"api/livelist.php"
  			type:"get",
  			data:{
  				rtype:"refresh"
  			},
  			success:function(rs){
  				console.log(that.formatData(rs.data))
  				vm.livedata=that.formatData(rs.data);
  			},
  			error:function(){
  				console.log("数据请求有误，请重试")
  			}
  		})
*/

       // 获取vm
       that.vm = this.getVM();
           $.ajax({
               //url:"/footballApp/mock/livelist.json",
               url:"/api/getLivelist.php", 
               data:{
                   rtype:"origin"
               },
               success:function(rs){
                  that.livelistArr = rs.data;
                  that.vm.livedata = that.formatData(rs.data);
               },
               error:function(){
                   console.log("请求失败");
               }
           })
  	},
  	show:function(){
      var that=this;
  		 that.homeSwiper=new Swiper("#swiper-home",{
  			loop:false,
  			onSlideChangeStart:function(swiper){
  				//swiper是对new Swiper出来的实例的引用
  				var index=swiper.activeIndex;
  				var $lis=$("#title  li");
  				util.setFocus($lis.eq(index));
  			}
  		})
       that.hotSwiper=new Swiper("#swiper-hot",{
        loop:false,
        onSlideChangeStart:function(swiper){
          //swiper是对new Swiper出来的实例的引用
          var index=swiper.activeIndex;
          var $lis=$(".m-home nav li");
          util.setFocus($lis.eq(index));
        }
      })

        // 下拉刷新--上拉加载
      var myScroll=this.widgets.homeListScroll;
      var scrollSize = 30;
      myScroll.scrollBy(0,-scrollSize);
      var head=$(".head img"),
          topImgHasClass=head.hasClass("up");
      var foot=$(".foot img"),
          bottomImgHasClass=head.hasClass("down");
      myScroll.on("scroll",function(){
        var y=this.y,
            maxY=this.maxScrollY-y;
            if(y>=0){
                 !topImgHasClass && head.addClass("up");
                 return "";
            }
            if(maxY>=0){
                 !bottomImgHasClass && foot.addClass("down");
                 return "";
            }
      })

      myScroll.on("scrollEnd",function(){
        if(this.y>=-scrollSize && this.y<0){
              myScroll.scrollTo(0,-scrollSize);
              head.removeClass("up");
        }else if(this.y>=0){
              head.attr("src","/webApp/images/ajax-loader.gif");

               // 请求加载数据
              $.ajax({
                  //url:"/webApp/mock/livelist.json",
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                      rtype:"refresh"
                  },
                  success:function(rs){
                      that.livelistArr = rs.data.concat(that.livelistArr);
                      that.vm.livedata = that.formatData(that.livelistArr);

                      /*var newArr = that.livelistArr.concat(rs.data);
                      that.vm.livedata = that.formatData(newArr);
                      that.livelistArr = newArr;*/

                      
                      myScroll.scrollTo(0,-scrollSize);
                      head.removeClass("up");
                      head.attr("src","/webApp/images/arrow.png");
                  }
              })
            
           
        }

        var maxY=this.maxScrollY-this.y;
        var self=this;
        if(maxY>-scrollSize && maxY<0){
              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
              foot.removeClass("down")
        }else if(maxY>=0){
            foot.attr("src","/webApp/images/ajax-loader.gif")
              // 请求加载数据
              $.ajax({
                  //url:"/webApp/mock/livelist.json",
                  url:"/api/getLivelist.php",
                  type:"get",
                  data:{
                      rtype:"more"
                  },
                  success:function(rs){
                      that.livelistArr = that.livelistArr.concat(rs.data);
                      that.vm.livedata = that.formatData(that.livelistArr);

                      /*var newArr = that.livelistArr.concat(rs.data);
                      that.vm.livedata = that.formatData(newArr);
                      that.livelistArr = newArr;*/

                      myScroll.refresh();
                      myScroll.scrollTo(0,self.y+self.maxScrollY);
                      foot.removeClass("down");
                      foot.attr("src","/webApp/images/arrow.png")
                  }
              })
        }
      })
  	}
  },
  
  bindActions:{
  	"slide.tap":function(e){
  		var index = $(e.el).index();
  		this.hotSwiper.slideTo(index);
  	},
    "switch.title":function(e){
      var index = $(e.el).index();
      this.homeSwiper.slideTo(index);

    }
  },
    "goto.detail":function(){
        SPA.open("detail");
    }
})