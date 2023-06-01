<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let products = [];
	let quantities = {};
	let customerId = null;

	onMount(async () => {
		const res = await fetch('http://localhost:4000/catalogue');
		const data = await res.json();
		products = data;
		// Initialize quantities object with default values
		products.forEach((product) => {
			quantities[product._id] = 1; // Set default quantity to 1
		});

		// Retrieve the customerId from local storage or session storage
		customerId = localStorage.getItem('customerId');
	});

	async function addToCart(productId) {
		if (!customerId) {
			alert('Please log in to add products to the cart');
			return;
		}

		const quantity = quantities[productId];
		const res = await fetch('http://localhost:4000/addToCart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ customerId, productId, quantity })
		});
		const data = await res.json();
		if (data.success) {
			alert('Product added to cart');
		} else {
			alert('Failed to add product to cart');
		}
	}

	function goToCart() {
		goto('/cart');
	}
</script>

<h1 class="mt-4">Catalogue</h1>

{#if products.length === 0}
	<p>Loading...</p>
{:else}
	<ul class="list-group">
		{#each products as product}
			<li class="list-group-item">
				<div class="row">
					<div class="col-lg-8">
						<h3 class="mb-1">{product.name}</h3>
						<p class="mb-1"><strong>Description:</strong> {product.description}</p>
						<p class="mb-1"><strong>Category:</strong> {product.category}</p>
						<p class="mb-1"><strong>Quantity:</strong> {product.quantity}</p>
						<p class="mb-1"><strong>Weight:</strong> {product.weight} {product.weightUnit}</p>
						<p class="mb-1"><strong>Price per Unit:</strong> ${product.pricePerUnit}</p>
						<p class="mb-1"><strong>Expiry:</strong> {product.expiry}</p>
						<p class="mb-1">
							<strong>Available for Sale:</strong>
							{product.availableForSale ? 'Yes' : 'No'}
						</p>
						<p class="mb-1"><strong>Is Packaged:</strong> {product.isPackaged ? 'Yes' : 'No'}</p>
						<input
							type="number"
							class="form-control mt-2"
							min="1"
							bind:value={quantities[product._id]}
						/>
						<button class="btn btn-primary mt-2" on:click={() => addToCart(product._id)}
							>Add to Cart</button
						>
					</div>
					<div class="col-lg-4 text-lg-end">
						<img
							class="img-fluid"
							src={product.imageURL}
							alt={product.name}
							style="max-width: 200px; max-height: 200px;"
						/>
					</div>
				</div>
			</li>
		{/each}
	</ul>
	<button class="btn btn-primary mt-3" on:click={goToCart}>Go to Cart</button>
{/if}
