const {expect} = require("chai");


describe('Task Contract', function(){
    let TaskContract;
    let taskContract;
    let owner;

    const total_tasks=5;
    let totalTasks;

    // beforeEach(); it will run before each it() or describe()
    // after(); it will run after it() or describe()
    // it(); it is the test cases

    beforeEach(async function(){
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        totalTasks = [];

        for(let i=0; i<total_tasks; i++){
            let task = {
                'taskText': "Task number:-"+i,
                'isDeleted': false
            };
            
            await taskContract.addTask(task.taskText, task.isDeleted);
            totalTasks.push(task);
        }

    });

    describe("Add Task", function() {
        it("Should emit AddTask Event", async function(){
            let task = {
                'taskText':"New task",
                'isDeleted': false,
            };
            await expect(await taskContract.addTask(task.taskText, task.isDeleted))
                .to.emit(taskContract,"AddTask")
                .withArgs(owner.address,total_tasks);
            ///https://ethereum-waffle.readthedocs.io/en/latest/matchers.html
            //https://ethereum.stackexchange.com/questions/110762/testing-arguments-of-contract-events-with-hardhat-chai
            
        });
    });

    describe("Get All tasks", function(){
        it("it should return the correct no of total tasks", async function(){
            const allMyTasks = await taskContract.getMyTasks();
            expect(allMyTasks.length).to.equal(total_tasks);
        });
    });
    describe("Delete Task", function(){
        it("Should emit Delete Task event", async function(){
            const Task_Id = 0;
            const Task_deleted = true;
            await expect(taskContract.deleteTask(Task_Id,Task_deleted))
                .to.emit(taskContract,"DeleteTask")
                .withArgs(Task_Id,Task_deleted);
        });
    })
});
/*
const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Task Contract", function(){
    let TaskContract;
    let taskContract;
    let owner;

    const totalTasks = 5;

    beforeEach(async () => {
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        for(let i = 0; i < totalTasks; i++) {
            let task = {
                taskText: "Task number:-" + i,
                isDeleted: false
            };
            await taskContract.addTask(task.taskText, task.isDeleted);
        }
    });

    describe("Add Task", function(){
        it("Should emit AddTask Event", async () => {
            let task = {
                taskText: "New task",
                isDeleted: false
            };
            const tx = await taskContract.addTask(task.taskText, task.isDeleted);
            await tx.wait();
            expect(tx.events[0].event).to.equal("AddTask");
            expect(tx.events[0].args.recipient).to.equal(owner.address);
            expect(tx.events[0].args.taskId.toNumber()).to.equal(totalTasks);
        });
    });

    describe("Get All Tasks", function(){
        it("Should return the correct number of total tasks", async () => {
            const allMyTasks = await taskContract.getMyTasks();
            expect(allMyTasks.length).to.equal(totalTasks);
        });
    });

    describe("Delete Task", function(){
        it("Should emit DeleteTask Event", async () => {
            const taskId = 0;
            const isDeleted = true;
            const tx = await taskContract.deleteTask(taskId, isDeleted);
            await tx.wait();
            expect(tx.events[0].event).to.equal("DeleteTask");
            expect(tx.events[0].args.taskId.toNumber()).to.equal(taskId);
            expect(tx.events[0].args.isDeleted).to.equal(isDeleted);
        });
    });
});

*/












