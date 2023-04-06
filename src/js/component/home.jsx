import React, { useState } from "react";
//create your first component
const Home = () => {
	const [task, setTask] = useState("")
	const [todos, setTodos] = useState(["Tarea 1", "Tarea 2"])
	function addTask(e){
		if(e.code=="Enter"){
			//aqui se agrega la tarea
			setTodos([...todos, task])
			setTask("")
		}
	}

	function delTask(index){
		//aqui se elimina la tarea
		let newTodos = [...todos]
		newTodos.splice(index,1)
		setTodos(newTodos)
	}
	return (
		<>
	
			<p class="fs-1 text-center">ToDos</p>
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
						{todo}
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
