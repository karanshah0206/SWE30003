<script>
	import Todo from './Todo.svelte';
	import { onMount } from 'svelte';

	let todos = [];
	let loading = true;

	onMount(async () => {
		try {
			const response = await fetch(`http://localhost:4000/api/todos/`);
			const data = await response.json();
			todos = data;
			loading = false;
		} catch (error) {
			console.error('Error fetching todos:', error);
			loading = false;
		}
	});
</script>

{#if loading}
	<p class="loading">loading...</p>
{:else}
	{#each todos as todo}
		<ul>
			<li>
				<Todo {todo} />
			</li>
		</ul>
	{/each}
{/if}

<style>
	ul {
		width: 80%;
		margin: 10px auto;
		list-style-type: none;
		padding: 0px;
	}

	li {
		display: block;
	}

	.loading {
		opacity: 0;
		animation: 0.5s 0.6s forwards fade-in;
	}

	@keyframes fade-in {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}
</style>
