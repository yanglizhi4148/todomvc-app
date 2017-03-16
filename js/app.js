(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular
		.module('todo',[])
		.controller('TodoController',['$scope',function($scope){
			//数据结构
            //task任务
			$scope.taskList=[
                //id用于区分每一个任务
                //name表示任务名称
                //isCompleted表示任务是否完成
				{id:1, name:'抽烟',isCompleted:false},
				{id:2, name:'喝酒',isCompleted:true},
				{id:3, name:'烫头发',isCompleted:false}
			];
		}])
})(angular);
