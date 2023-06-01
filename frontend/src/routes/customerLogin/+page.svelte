<script>
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	async function login() {
		const res = await fetch('http://localhost:4000/authCustomer', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});
		const data = await res.json();
		if (data != null) {
			sessionStorage.setItem("customerUser", JSON.stringify(data));
			goto("/catalogue");
		} else alert("Login failed!");
	}
</script>

<div class="container">
	<h1 class="my-4 text-center">Customer Login</h1>
	<form on:submit|preventDefault={login}>
		<div class="mb-3">
			<label for="email" class="form-label">Email</label>
			<input type="email" id="email" class="form-control" bind:value={email} required />
		</div>

		<div class="mb-3">
			<label for="password" class="form-label">Password</label>
			<input type="password" id="password" class="form-control" bind:value={password} required />
		</div>

		<div class="d-grid gap-2">
			<button type="submit" class="btn btn-primary">Login</button>
		</div>
	</form>
</div>
