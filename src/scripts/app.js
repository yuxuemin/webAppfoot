//引入spa类库
require("./lib/spa.min");
//引入swiper类库
require("./lib/swiper-3.3.1.min.js")
require("./lib/iscroll-probe");
require("./views/guide.js")
require("./views/index.js");
require("./views/home.js");
require("./views/search.js");
require("./views/my.js");
require("./views/detail.js");
require("./views/login.js");


//配置默认视图
SPA.config({

	indexView:"guide"
})