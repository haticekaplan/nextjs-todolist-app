// pages/todos.js
"use client";
import React, { useEffect, useState } from "react";
import * as DeleteIcon from "./assets/delete-icon.svg";
import * as UpdateIcon from "./assets/update-icon.svg";
import Image from "next/image";
type Todo = {
    title:string;
    desc:string;
}

const Todos:React.FC = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	useEffect(() => {
        const todosData = localStorage.getItem("todos");

		if (!todosData) {
			localStorage.setItem("todos", JSON.stringify([]));
		} else {
			setTodos(JSON.parse(todosData));
		}
	}, []);

	const deleteTodo = (title:string) => {
		const newTodos = todos.filter((item) => {
			return item.title != title;
		});
		localStorage.setItem("todos", JSON.stringify(newTodos));
		setTodos(newTodos);
	};

	return (
		<section className="text-gray-600 body-font">
			<div className="container px-5 py-24 mx-auto">
				<div className="flex flex-col text-center w-full mb-20">
					<h1 className="text-4xl font-medium 
					title-font mb-4 text-gray-900">
						Your Todos
					</h1>
					{todos.length == 0 && (
						<p className="mx-auto leading-relaxed text-base">
							Please add a todo by going to the homepage
						</p>
					)}
				</div>
				{
					todos.length > 0 && (
						<div className="w-full">
							<div className="relative overflow-x-auto 
							shadow-md sm:rounded-lg">
								<table className="w-full text-sm text-left 
								rtl:text-right text-gray-500 ">
									<thead className="text-xs text-gray-700 
									uppercase bg-gray-50 ">
										<tr>
											<th scope="col"
												className="px-6 py-3">
												Title
											</th>
											<th scope="col"
												className="px-6 py-3">
												Description
											</th>
											<th scope="col"
												className="px-6 py-3">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										
											{todos.map((item, index) => {
												return (
													<tr 
														className="odd:bg-white 
																even:bg-gray-50
													border-b " key={index}>
														<th
															scope="row"
															className="px-6 py-4 font-medium 
															text-gray-900 whitespace-nowrap"
														>
															{item.title}
														</th>
														<td className="px-6 py-4">{item.desc}</td>

														<td className="px-6 py-4">
															<span className="inline-flex">
																<a
																	className=" cursor-pointer font-medium 
																	border-2
																	border-red-500 rounded-md p-1 
																	hover:bg-red-500
																	hover:text-white"
																	onClick={() => {
																		deleteTodo(item.title);
																	}}
																>
																	<Image src={DeleteIcon} alt="Delete Todo Icon" />
																</a>
																<a
																	className="ml-2 cursor-pointer 
																	border-2 
																	border-green-500 rounded-md p-1 
																	hover:bg-green-500 
																	hover:text-white"
																	href={`/edit/${item.title}`}
																>
																	<Image src={UpdateIcon} alt="Delete Todo Icon" />
																</a>
															</span>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					)
				}
			</div>
		</section>
	);
};

export default Todos;
