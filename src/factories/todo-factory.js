import angular from 'angular';
import _ from 'lodash';

const todoFactory = angular.module('app.todoFactory', [])
  .factory('todoFactory', ($http) => {

    function getTasks($scope) {
      $http.get('/todos').success(response => {
        $scope.todos = response.todos;
      });
    }

    function createTask($scope, params) {
      if(!$scope.createTaskInput){
        return;
      }
      $http.post('/todos', {
        task: $scope.createTaskInput,
        isCompleted: false,
        isEditing: false
      })
      .success(response => {
        getTasks($scope);
        $scope.createTaskInput = '';
        console.log(response);
      });
    }

    function updateTask($scope, todo) {
      $http.put(`/todos/${todo._id}`, { task: todo.updatedTask })
        .success(
          response => {
            getTasks($scope);
            todo.isEditing = false;
          });
      // todo.task = todo.updatedTask;
      // todo.isEditing = false; 
    }

    function deleteTask($scope, todoToDelete) {
      // _.remove($scope.todos, todo => todo.task === todoToDelete.task);
      $http.delete(`/todos/${todoToDelete._id}`)
        .success(response => {
          getTasks($scope);
        });
    }

    function watchCreateTaskInput(params, $scope, val){
      const createHasInput = params.createHasInput

      if( !val && createHasInput) {
        $scope.todos.pop();
        params.createHasInput = false;
      } else if (val && !createHasInput) {
        $scope.todos.push({task: val, isCompleted: false});
        params.createHasInput = true;
      } else if( val && createHasInput) {
        $scope.todos[$scope.todos.length - 1].task = val;
      }
      
    }

    return {
      createTask,
      updateTask,
      deleteTask,
      watchCreateTaskInput,
      getTasks
    }
  })

  export default todoFactory;