<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { beforeUpdate } from 'svelte';

	let isAdmin = false;
	let isCustomer = false;
	
	beforeUpdate(() => {
		let adminData = sessionStorage.getItem("adminUser");
		if (adminData != null && !adminData != undefined) isAdmin = true;
		else {
			isAdmin = false;
			let custData = sessionStorage.getItem("customerUser");
			if (custData != null && !custData != undefined) isCustomer = true;
			else isCustomer = false;
		}
	});

	function logout() {
		sessionStorage.removeItem("adminUser");
		sessionStorage.removeItem("customerUser");
		goto("/");
	}
</script>

<header>
	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			{#if !isAdmin && !isCustomer}
			<li aria-current={$page.url.pathname === '/adminLogin' ? 'page' : undefined}>
				<a href="/adminLogin">Admin Login</a>
			</li>
			<li aria-current={$page.url.pathname === '/customerLogin' ? 'page' : undefined}>
				<a href="/customerLogin">Customer Login</a>
			</li>
			{/if}
			{#if isCustomer}
			<li aria-current={$page.url.pathname === '/cart' ? 'page' : undefined}>
				<a href="/cart">Cart</a>
			</li>
			<li aria-current={$page.url.pathname === '/catalogue' ? 'page' : undefined}>
				<a href="/catalogue">Catalogue</a>
			</li>
			{/if}
			{#if isAdmin}
			<li aria-current={$page.url.pathname === '/dashboard' ? 'page' : undefined}>
				<a href="/dashboard">Dashboard</a>
			</li>
			<li aria-current={$page.url.pathname === '/addProduct' ? 'page' : undefined}>
				<a href="/addProduct">Add Product</a>
			</li>
			{/if}
			{#if isAdmin || isCustomer}
			<li on:click={() => logout()}>
				<a href="#">Logout</a>
			</li>
			{/if}
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
