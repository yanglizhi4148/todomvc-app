/**
 * Created by 琴瑟 on 2017/3/16.
 */
(function(angular){
    //控制器模块
    //将所有与数据操作相关的代码放到服务模块中，然后，控制器如果要想操作
    //数据，只需要调用服务中提供的方法就可以了
    angular
        .module('todo.controller',[])
        .controller('TodoController',['$scope','$location',
            'DataService', function($scope,$location,DataService){
            //数据结构
            //task任务
            //$scope.taskList=[
            //    //id用于区分每一个任务
            //    //name表示任务名称
            //    //isCompleted表示任务是否完成
            //    {id:1, name:'抽烟',isCompleted:false},
            //    {id:2, name:'喝酒',isCompleted:true},
            //    {id:3, name:'烫头发',isCompleted:false}
            //];
             $scope.taskList=DataService.getData();
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
            //如果要想操作DOM，就通过指令完成，js代码中只有业务逻辑以及数据的处理
            //其他的任务，都叫Angular框架完成

            //6.清除已完成任务
            //将已完成的任务删除（即：从任务列表中将数据删除）
            //1.清除按钮的展示和隐藏
            //2.单击清除按钮，将已完成任务清除
            $scope.clear=function(){
                //清空已完成的任务，反过来想就是把未完成的任务保留起来
                var temp=[];
                for(var i=0;i<$scope.taskList.length;i++){
                    var task=$scope.taskList[i];
                    if(!task.isCompleted){
                        temp.push(task);
                    }
                }
                $scope.taskList=temp;
            };

            //脏检查（dirty checking）
            $scope.isShow=function(){
                var flag=false;
                for(var i=0;i<$scope.taskList.length;i++){
                    if($scope.taskList[i].isCompleted){
                        flag=true;
                        break;
                    }
                }
                return flag;
            };
            //显示未完成任务数
            $scope.getUncompleted=function(){
                //遍历所有的任务,如果当前任务是未完成就+1
                var count=0;
                $scope.taskList.forEach(function(task){
                    //task表示数组中的每一项
                    if(!task.isCompleted){
                        count++;
                    }
                });
                return count;
            };

            //8.显示不同状态的任务
            //过滤器，通过过滤数据，把符合条件的数据单独过滤出来
            //$scope.status=undefined;
            //$scope.changeAll=function(){
            //    $scope.status=undefined;
            //};
            //$scope.changeActive=function(){
            //    $scope.status=false;
            //};
            //$scope.changeCompleted=function(){
            //    $scope.status=true;
            //};

            //当前任务高亮处理(添加样式)
            //通过ng-class指令来决定要不要给当前元素添加selected类

            //根据URL变化显示相应的任务
            //思路：监视URL中hash值得变化
            //$location.url();
            //location
            //angular中不允许使用全局变量，如果要使用全局变量，通过angular提供的服务获取到

            //根据url中hash值的变化来展示不同状态任务的过程
            //1.当页面被刷新的时候，控制器中的代码要重新执行一遍
            //2.这样$watch中的代码就会执行一次，然后，在watch中通过newValue参数
            //就可以获取到hash值
            //3.根据获取到的hash值，就可以确定展示什么状态的任务了
            // /===>                全部任务
            // /active===>          未完成任务
            // /completed===>       已完成任务
            //4.根据不同的hash值，就能够设置hash中的值了，status配合过滤器不同状态的任务
            //5.只要status值发生变化以后，页面中所有的指令和表达式
            $scope.location=$location;
            $scope.$watch('location.url()',function(newValue){
                //console.log(newValue);
                switch(newValue){
                    case '/active':
                        $scope.status=false;
                        break;
                    case '/completed':
                        $scope.status=true;
                        break;
                    default :
                        $scope.status=undefined;
                        break;
                }
            });


        }]);
})(angular);