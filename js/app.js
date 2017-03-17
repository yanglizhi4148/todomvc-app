(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
    //dataService   数据服务模块
    //作用：将所有与数据相关的操作放到该模块中
    //controller.js 控制模块
    //作用：用来处理
    //app.js        主模块
    //将其他所有的模块通过依赖加载进来，作用：调度其他模块

    //在主模块中其他两个子模块作为依赖引进来了
    //那么，此时，在一个子模块中就可以使用另外一个子模块中的功能了
	angular
		.module('todo',['todo.controller','todo.service'])
})(angular);
