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
                //如何获取id?
                //获取到数组最后一项的id,再加上1，就是当前的id
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
            };

            //3.删除一条任务
            //根据当前数据的id,将当前任务从列表中移除掉
            $scope.remove=function(id){
                //console.log(id);
                for(var i=0;i<$scope.taskList.length;i++){
                    var task=$scope.taskList[i];
                    if(task.id===id){
                        //删除数据
                        $scope.taskList.splice(i,1);
                        break;
                    }
                }
            };

            //
            $scope.editId=0;
            $scope.edit=function(id){
                $scope.editId=id;
            };
            $scope.update=function(){
                $scope.editId=0;
            };

            //切换任务选中状态（单个或批量）
            //单个任务状态是根据 双向数据绑定来实现的效果
            //批量切换：根据当前全选按钮的状态来改变
            $scope.selectAll=false;
            $scope.checkAll=function(){
                for(var i=0;i<$scope.taskList.length;i++){
                    $scope.taskList[i].isCompleted=$scope.selectAll;
                }
            };
            //第二种思路：$scope.$watch('selectAll',function(newValue){})
		}]);
})(angular);
