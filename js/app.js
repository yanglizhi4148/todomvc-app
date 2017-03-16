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
            //1.展示任务列表
            //通过ng-repeat指令生成的结构

            //2.添加任务
            $scope.newTask='';
            $scope.add=function(){
                //1.获取到用户输入的内容
                //2.拼接出一个对象
                //3.放到任务数组中
                if($scope.newTask.trim()===''){
                    return;
                }

                //
                var id;
                if($scope.taskList.length===0){
                    id=1;
                }else{
                    var index=$scope.taskList.length-1;
                    id=$scope.taskList[index].id+1;
                }
                $scope.taskList.push({id:id,name:$scope.newTask,isCompleted:false});

                //重置任务名称
                $scope.newTask='';
            }
		}]);
})(angular);
