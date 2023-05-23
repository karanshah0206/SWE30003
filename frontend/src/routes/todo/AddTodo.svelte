<script>
	async function onSubmit(event) {
		event.preventDefault();

		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData);

		try {
			const response = await fetch('http://localhost:4000/api/todos/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (response.ok) {
				// The POST request was successful
				window.location.href = '/todo';
			} else {
				// Handle the error
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			// Handle any network errors
			console.error('Error:', error.message);
		}
	}
</script>

<div class="form-container">
	<form on:submit={onSubmit}>
		<div class="form-group">
			<input type="text" id="title" name="title" placeholder="Title of todo" />
		</div>
		<div class="form-group">
			<textarea id="description" name="description" placeholder="Todo's description" cols="30" />
		</div>
		<div class="form-group">
			<button type="submit">Submit</button>
		</div>
	</form>
</div>

<style>
	.form-container {
		width: 80%;
		margin: 10px auto;
	}

	form {
		display: flex;
		justify-content: flex-start;
		width: 100%;
	}

	.form-group {
		margin: 10px;
		width: 30%;
	}

	.form-group input[type='text'] {
		padding: 10px;
	}

	.form-group textarea {
		padding: 10px;
	}

	button {
		background: #f5f5f5;
		border: 1px solid #d4d4d5;
		border-radius: 3px;
		color: #333;
		cursor: pointer;
		font-size: 14px;
		font-weight: bold;
		padding: 5px 10px;
		text-transform: uppercase;
	}
</style>
