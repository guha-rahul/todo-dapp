/*
import React ,{useState,useEffect} from 'react';
import {TextField,Button, ClickAwayListener} from '@mui/material';
import Task from './Task.jsx';
import './App.css';
import { TaskContractAddress } from './config';
import {ethers} from 'ethers';
import TaskAbi from './abi/TaskContract.json';

export default function App(){
  const [tasks,setTasks] = useState([]);
  const [input,setInput] = useState("");
  const [currentAccount,setCurrentAccount] = useState("");
  const [correctNetwork,setCorrectNetwork] = useState(false);

  const connectWallet = async() => {
    try{
      const {ethereum} = window ;
      if(!ethereum){
        console.log("Metamask ta koi gelo?");
      }
      let chainId = await ethereum.request({method:'eth_chainId'});
      console.log("Connected to chain: ",chainId);
      
      const goerliChainId = "0x5";
      if (chainId != goerliChainId){
        alert("You are not connected to the goerli network");
      }else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      console.log("Found account:", accounts[0]);
      setCurrentAccount(accounts[0]);

    }catch(error){
      console.log("Error connecting ?", error);
    }
  }

  const addTask = async(e) => {
    e.preventDefault();                       ///WHY??
    let task = {
      'taskText':input,
      'isDeleted':false
    };
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Signer = provider.getSigner();
        const TaskContract = new ethers.Contract(TaskContractAddress,TaskAbi,Signer);
        TaskContract.addTask(task.taskText,task.isDeleted).then(response => {
          setTasks([...tasks,task]);
        }).catch(err =>{
          console.log("Error occured while adding tasks");
        });
      }else{
        console.log("Ethereum object doesnt exist.");
      }
    }catch(error){
      console.log(error);
    }
  }

  const deleteTask = key => async() => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Signer = provider.getSigner();
        const TaskContract = new ethers.Contract(TaskContractAddress,TaskAbi,Signer);

        let deleteTask = await TaskContract.deleteTask(key,true);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      }else{
        console.log("Ethereum object doesnt exists");
      }
    }catch(err){
      console.log(err);
    }
  }

  const getAllTasks = async() => {
    try{
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const Signer = provider.getSigner();
        const TaskContract = new ethers.Contract(TaskContractAddress,TaskAbi,Signer);

        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      }else{
        console.log("Ethereum object doesnt exists");
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    getAllTasks();
    connectWallet();
  },[]);

  return(
    <div>
      {currentAccount == ''? (
        <center><button className='button' onClick={connectWallet}>Connect Wallet</button></center>
      ): correctNetwork ? (
        <div className='App'>
          <h2>Task Management Task</h2>
          <form>
            <TextField id='outlined-basic' label='Make todo' variant='outlined' style={{margin:"0px 5px"}} size="small" value={input} onChange={e => setInput(e.target.value)}></TextField>
            <Button variant='contained' color='primary' onClick={addTask}>Add Task</Button>
          </form>
          <ul>
            {tasks.map(item =>
              <Task key={item.id} taskText={item.taskText} onClick={deleteTask(item.id)}></Task>
              )}
          </ul>
        </div>        
      ): (
        <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
          <div>Please connect to Goerli Testnet and reload the screen</div>
        </div>
      )}  
    </div>
  );
}

*/
import React, {useState, useEffect } from 'react';
import {TextField , Button } from '@mui/material';
import Task from './Task';
import './App.css';

import { TaskContractAddress } from './config.js';
import {ethers} from 'ethers';
import TaskAbi from './abi/TaskContract.json'


function App() {
  const [tasks,setTasks]=useState([]);
  const [input, setInput]=useState('');
  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  
  const getAllTasks = async() => {
  try {
    const {ethereum} = window

    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const TaskContract = new ethers.Contract(
        TaskContractAddress,
        TaskAbi.abi,
        signer
      )

      let allTasks = await TaskContract.getMyTasks();
      setTasks(allTasks);
    } else {
      console.log("Ethereum object doesn't exist");
    }
  } catch(error) {
    console.log(error);
  }
}
  
  useEffect(() => {
      getAllTasks()
    },[]);
    
    // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window

      if (!ethereum) {
        console.log('Metamask not detected')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId'})
      console.log('Connected to chain:' + chainId)

      const ChainId = '0x5'

      if (chainId !== ChainId) {
        alert('You are not connected to the Goerli Testnet!')
        return
      } else {
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Found account', accounts[0])
      setCurrentAccount(accounts[0])
    } catch (error) {
      console.log('Error connecting to metamask', error)
    }
  }  
    
  const addTask= async (e)=>{
    e.preventDefault();

    let task = {
      'taskText': input,
      'isDeleted': false
    };

    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        TaskContract.addTask(task.taskText, task.isDeleted)
        .then(response => {
          setTasks([...tasks, task]);
          console.log("Completed Task");
        })
        .catch(err => {
          console.log("Error occured while adding a new task");
        });
        ;
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch(error) {
      console.log("Error submitting new Tweet", error);
    }

    setInput('')
  };
  
  const deleteTask = key => async() => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        let deleteTaskTx = await TaskContract.deleteTask(key, true);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
{currentAccount === '' ? (
  <button
  className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
  onClick={connectWallet}
  >
  Connect Wallet
  </button>
  ) : correctNetwork ? (
    <div className="App">
      <h2> Task Management App</h2>
      <form>
         <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
         onChange={e=>setInput(e.target.value)} />
        <Button variant="contained" color="primary" onClick={addTask}  >Add Task</Button>
      </form>
      <ul>
          {tasks.map(item=> 
            <Task 
              key={item.id} 
              taskText={item.taskText} 
              onClick={deleteTask(item.id)}
            />)
          }
      </ul>
    </div>
  ) : (
  <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
  <div>----------------------------------------</div>
  <div>Please connect to the Rinkeby Testnet</div>
  <div>and reload the page</div>
  <div>----------------------------------------</div>
  </div>
)}
</div>
  );
}

export default App;
