var util={
	setFocus:function(ele){
		ele.addClass("active").siblings().removeClass("active");

	}
}

module.exports=util;