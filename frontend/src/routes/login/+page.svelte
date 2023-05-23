<svelte:head>
	<title>About</title>
	<meta name="description" content="Login Page" />
</svelte:head>

<div class="text-column">
	<h1>Login</h1>
	<form action="login" method="post">
		<label for="username">Username</label>
		<input type="text" id="username" name="username" placeholder="Username" required>
		
		<br>

		<label for="password">Password</label>
		<input type="password" id="password" name="password" placeholder="Password" required>

		<br>

		<button type="submit">Login</button>
</div>
