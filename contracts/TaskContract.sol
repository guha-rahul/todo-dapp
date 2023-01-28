// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract TaskContract{


    event AddTask(address receipient, uint taskId);
    event DeleteTask(uint taskId, bool isDeleted);
    struct Task{
        uint id;
        string taskText;
        bool isDeleted;
    }
    Task[] private tasks;

    mapping(uint => address) taskOwner;

    function addTask(string memory taskText, bool isDeleted) external{
        uint taskId = tasks.length;
        tasks.push(Task(taskId,taskText,isDeleted));
        taskOwner[taskId] = msg.sender;
        emit AddTask(msg.sender, taskId);
    } 

    function deleteTask(uint taskId, bool isDeleted) external{

        require(taskOwner[taskId] == msg.sender);
        tasks[taskId].isDeleted = isDeleted;
        emit DeleteTask(taskId, isDeleted);

   }

   function getMyTasks() external view returns(Task[] memory) {
        Task[] memory temp = new Task[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++){
            if(taskOwner[i] == msg.sender && tasks[i].isDeleted == false){
                temp[counter] = tasks[i];
                counter++;
            }
        }
        Task[] memory result = new Task[](counter);
        for (uint i=0; i<counter; i++){
            result[i] = temp[i];
        }
        return result;
    }
}