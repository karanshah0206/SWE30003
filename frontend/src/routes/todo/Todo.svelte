<script>
	export let todo;
	async function deleteTodo(todo) {
		const response = await fetch('http://localhost:4000/api/todos/', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: todo._id
			})
		});
		const data = await response.json();
		if (data.success) {
			window.location.href = '/todo';
		}
	}
</script>

<article>
	<div class="todo-info">
		<h1>{todo.title}</h1>
		<p>
			{todo.description}
		</p>
	</div>
	<div class="todo-actions">
		<button on:click={() => deleteTodo(todo)}>Delete</button>
	</div>
</article>
