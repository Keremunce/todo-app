"use client";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

interface Task {
	name: string;
	status: boolean; // true: completed, false: not completed
}

export default function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
	const [newTask, setNewTask] = useState<string>("");

	const addTask = () => {
		if (newTask.trim() !== "") {
			setTasks([...tasks, { name: newTask, status: false }]);
			setNewTask("");
		}
	};

	const toggleTaskStatus = (index: number, isCompleted: boolean) => {
		if (isCompleted) {
			// Görev tamamlanmışsa, tamamlanan görevler listesinden çıkar ve ana listeye ekle
			const taskToRevert = completedTasks[index];
			setCompletedTasks(completedTasks.filter((_, i) => i !== index));
			setTasks([...tasks, { ...taskToRevert, status: false }]);
		} else {
			// Görev tamamlanmamışsa, ana listeden çıkar ve tamamlanan görevler listesine ekle
			const taskToComplete = tasks[index];
			setTasks(tasks.filter((_, i) => i !== index));
			setCompletedTasks([...completedTasks, { ...taskToComplete, status: true }]);
		}
	};

	const trash = (index: number, isCompleted: boolean) => {
		if (isCompleted) {
			setCompletedTasks(completedTasks.filter((_, i) => i !== index));
		} else {
			setTasks(tasks.filter((_, i) => i !== index));
		}
	};

	return (
		<div className="mainWrapper">
			<div className="inputWrapper">
				<input
					value={newTask}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask();
						}
					}}
					onChange={(e) => setNewTask(e.currentTarget.value)}
					type="text"
					placeholder="Add a new task"
				/>
				<button onClick={addTask}>
					<FaPlus />
				</button>
			</div>
			<div className="contentWrapper">
				<div>
					<h4 className="caption">Task List {tasks.length}</h4>
					<div className="tasksWrapper">
						{tasks.map((item, index) => (
							<div key={index} className="task">
								<input
									type="checkbox"
									checked={item.status}
									onChange={() => toggleTaskStatus(index, item.status)}
								/>
								<div
									style={{
										textDecoration: item.status ? "line-through" : "none",
									}}
								>
									{item.name}
								</div>
								<div className="icons">
									<FaTrash onClick={() => trash(index, false)} />
								</div>
							</div>
						))}
					</div>
				</div>
				<div>
					<h4 className="caption">Completed Tasks {completedTasks.length}</h4>
					<div className="tasksWrapper">
						{completedTasks.map((item, index) => (
							<div key={index} className="task">
								<input
									type="checkbox"
									checked={item.status}
									onChange={() => toggleTaskStatus(index, item.status)}
								/>
								<div style={{ textDecoration: "line-through" }}>{item.name}</div>
								<div className="icons">
									<FaTrash onClick={() => trash(index, true)} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
