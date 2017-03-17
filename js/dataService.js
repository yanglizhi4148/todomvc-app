/**
 * Created by 琴瑟 on 2017/3/16.
 */
(function(angular){
    //沙箱模式的好处：
    //1.有利于代码压缩
    //2.减少了作用域的查找
    angular
        .module('todo.service',[])
        .service('DataService',['$window',function($window){
            console.log('服务中的代码');
            //$window也是
            //我们可以通过这个服务对象获取到localStorage
            //原因：因为angular不希望也不推荐我们直接操作全局对象
            //如果想要操作全局对象，也是通过angular中提供的服务来获取

            //1.实现获取数据的操作
            //我们要将数据存储到localStorage中

            //从localStorage中取出数据
            var localStorage=$window.localStorage;
            var taskList=JSON.parse(localStorage.getItem('todo'))||[];

            //暴露出来的方法
            this.getData=function(){
                return taskList;
            };
			//2.添加任务
			//在数据服务模块中获取不到的内容，都通过参数传递过来
			this.add=function(taskName){
				var id;
				if(taskList.length===0){
					id=1;
				}else{
					var index=taskList.length-1;
					id=taskList[index].id+1;
				}
				taskList.push({id:id,name:taskName,isCompleted:false});
				//此处，应该将添加到的数据，存储到localStorage中
				this.save();
			};

			//将数据保存到localStorage中
			this.save=function(){
				localStorage.setItem('todo',JSON.stringify(taskList));
			};
			//3.删除数据
			this.remove=function(id){
				for(var i=0;i<taskList.length;i++){
					var task=taskList[i];
					if(task.id===id){
						//删除数据
						taskList.splice(i,1);
						break;
					}
				}
				this.save();
			};

			//4.修改数据
			//由控制器中调用save方法就可以保存数据了

			//5.切换单个任务状态
			//调用save方法即可
			this.checkAll=function(selectAll){
				for(var i=0;i<taskList.length;i++){
					taskList[i].isCompleted=selectAll;
				}
				this.save();
			};
			//6.清除已完成任务
			this.clear=function(){
				var temp=[];
				for(var i=0;i<taskList.length;i++){
					var task=taskList[i];
					if(!task.isCompleted){
						temp.push(task);
					}
				}
				//因为此处，重新给taskList赋值了一个新对象
				//所以会出现引用的问题
				//taskList=temp;
				//这种方式没有改变taskList这个变量的引用指向，就说明$scope.taskList
				//与taskList
				//清空数组
				taskList.length=0;
				[].push.apply(taskList,temp);
				this.save();
			};

			this.isShow=function(){
				var flag=false;
				for(var i=0;i<taskList.length;i++){
					if(taskList[i].isCompleted){
						flag=true;
						break;
					}
				}
				return flag;
			};

			//7
			this.getUncompleted=function(){
				//遍历所有的任务,如果当前任务是未完成就+1
				var count=0;
				taskList.forEach(function(task){
					//task表示数组中的每一项
					if(!task.isCompleted){
						count++;
					}
				});
				return count;
			};


        }]);
})(angular);
