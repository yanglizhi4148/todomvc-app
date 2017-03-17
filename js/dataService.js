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
            }
        }]);
})(angular);