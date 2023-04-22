import React, { useEffect, useState } from "react";
//create your first component
const Home = () => {
	const [task, setTask] = useState("")
	const [todos, setTodos] = useState([])
	
	async function addTask(e){
		if(e.code=="Enter"){
			//aqui se agrega la tarea
			getList(todos)
			let newTask ={label:task, done:false}
			let newTodos=[...todos, newTask]
			setTodos(newTodos)
			updateList(newTodos)
			console.log(task)
			console.log(todos)
			setTask("")
		}
	}
	
	function delTask(index){
		//aqui se elimina la tarea
		console.log(task)
		let newTodos = [...todos];
		newTodos.splice(index,1);
		setTodos(newTodos);
		updateList(newTodos);
	}

	function checkTodo(index){
		let newTodos=[...todos]
		newTodos[index].done=!newTodos[index].done
		console.log(todos)
		setTodos(newTodos)
		updateList(todos);
		console.log(todos)
	}
	
	async function getList(todo){
		// console.log(JSON.stringify({...todos}))
		// 		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/Lapi",{
		// 			method:"GET",
		// 			headers:{
		// 				"Content-Type":"application/json"
		// 			}
		// 		})
		// 		if (!response.ok){
		// 			console.log(response.status + ": "+response.statusText)
		// 			return 
		// 		}
		// 		let tasksPending = await response.json()
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/Lapi")
		if(response.ok){
		let data = await response.json()
		setTodos(data)
		console.log(response.status)
		}
		return response.status
	}
	
	async function updateList(todos){
		let response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/Lapi",{
			body:JSON.stringify(todos),
			method:"PUT",
			headers:{
				"Content-Type":"application/json"
			}
			})
			if (!response.ok){
				console.log(response.status + ": "+response.statusText)
				return 
			}
			let tasksPending = await response.json()
	}
	useEffect (()=>{
		getList().then(async status=>{
		if (status==404){
		let response=await fetch(apiurl, {
		method: "POST", 
		body:JSON.stringify(todos), 
		headers:{
			"Content-Type": "application/json"
		}
		})
		if(response.ok) return getList()
		
		}})})

	return (
		<>
	
			<p className="fs-1 text-center">ToDo's</p>
			<div className="card">
				<div className="card-header">
				<div className="mb-3">
					<input type="email"
					className="form-control border-0" 
					id="exampleFormControlInput1" 
					placeholder="Escribe una tarea"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyDown={addTask}
					/>
				</div>
				</div>
				<ul className="list-group">
					{todos.map((todo, index) =>(
						<li key={index} className="item list-group-item d-flex justify-content-between align-items-center">
						<div className="form-check form-switch">
							<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={()=>checkTodo(index)} checked={todo.done}/>
							<label className="form-check-label" htmlFor="flexSwitchCheckDefault">{todo.label}</label>
						</div>
						<button onClick={()=> delTask(index)} type="button" className="btn btn-sm rounded-pill btn-outline-danger">x</button>
						</li>
					))}	
				</ul>
				<div className="card-footer">
					{todos.length} tasks left m8 <strong>les goo!!</strong>
				</div>
			</div>
		</>
	);
};

export default Home;
