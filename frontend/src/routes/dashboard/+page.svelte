<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let inventory = [];

	onMount(async() => {
		const res = await fetch('http://localhost:4000/catalogue');
		const data = await res.json();
		inventory = data;
	});

	async function removeItem(itemId) {
		const removeCall = await fetch('http://localhost:4000/removeProduct', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _id: itemId })
		});
		const res = await removeCall.json();
		if (res.success) {
			window.location.reload();
		} else alert("Error while deleting product from inventory.");
	}

	function updateItem(product) {
		sessionStorage.setItem("prodInfo", JSON.stringify(product));
		goto('/editProduct');
	}
</script>

<svelte:head>
	<title>Admin Dashboard</title>
	<meta name="description" content="Admin Dashboard Page" />
</svelte:head>

<div>
	<h1>Admin Dashboard</h1>
	<table>
		<thead>
			<tr>
				<th>Image</th>
				<th>Item</th>
				<th>Description</th>
				<th>Category</th>
				<th>Quantity</th>
				<th>Weight</th>
				<th>Price</th>
				<th>Expiry</th>
				<th>Available For Sale</th>
				<th>Packaged</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each inventory as item (item._id)}
				<tr class:out-of-stock={item.quantity == 0 && item.weight == 0}>
					<td><img src="{item.imageURL}"/></td>
					<td>{item.name}</td>
					<td>{item.description}</td>
					<td>{item.category}</td>
					<td>{item.isPackaged ? item.quantity : "N/A"}</td>
					<td>{item.weight + " " + item.weightUnit}</td>
					<td>{"A$" + item.pricePerUnit}</td>
					<td>{item.expiry}</td>
					<td>{item.availableForSale ? "Yes" : "No"}</td>
					<td>{item.isPackaged ? "Yes" : "No"}</td>
					<td>
						<a class="blue" href="#" on:click={updateItem(item)}>Update</a>
						<a href="#" on:click={removeItem(item._id)}>Remove</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table { width: 100%; }
	th, td {
		padding: 0 0.5em;
		border: 1px solid #ddd;
	}
	img { max-width: 80px !important; }
	.blue { color: blue !important; }
	.out-of-stock { box-shadow: 0 0 2px 5px rgba(255, 0, 0, 0.5); }
</style>
