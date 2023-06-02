<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let cart = [];
	let customerId = null;

	onMount(async () => {
		// Retrieve the customerId from session storage
		customerId = sessionStorage.getItem('customerId');
		if (!customerId) {
			alert('Please log in to view your cart');
			goto('/customerLogin');
			return;
		}

		const res = await fetch('http://localhost:4000/getCart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ customerId })
		});
		const data = await res.json();
		cart = data.orderItems.filter((item) => item.product !== null);

		console.log(data);

		// Fetch product details
		await Promise.all(
			cart.map(async (item) => {
				if (item.product !== null) {
					const productFind = await fetch('http://localhost:4000/findProduct', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ productId: item.product })
					});
					const productData = await productFind.json();
					item.productDetails = productData;
				}
			})
		);
	});

	async function removeFromCart(orderItemId) {
		const res = await fetch('http://localhost:4000/removeFromCart', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ customerId, orderItemId })
		});
		const data = await res.json();
		if (data.success) {
			cart = cart.filter((item) => item._id !== orderItemId);
		} else {
			alert('Failed to remove product from cart');
		}
	}
</script>

<svelte:head>
	<title>Shopping Cart</title>
	<meta name="description" content="Shopping Cart" />
</svelte:head>

<div class="text-column">
	<h1 class="mt-4">Shopping Cart</h1>

	{#if cart.length === 0}
		<p>Your cart is empty</p>
	{:else}
		<ul class="list-group">
			{#each cart as item}
				{#if item.product && item.productDetails}
					<li class="list-group-item">
						<h3 class="mb-1">{item.productDetails.name}</h3>
						<p class="mb-1"><strong>Quantity:</strong> {item.quantity}</p>
						<p class="mb-1"><strong>Price:</strong> ${item.price}</p>
						<button class="btn btn-danger mt-2" on:click={() => removeFromCart(item._id)}
							>Remove from Cart</button
						>
					</li>
				{/if}
			{/each}
		</ul>
	{/if}
</div>
