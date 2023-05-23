<script>
	let inventory = [
		{ id: 1, name: 'Apple', quantity: 20 },
		{ id: 2, name: 'Banana', quantity: 50 },
		{ id: 3, name: 'Orange', quantity: 30 }
		// Convert to using database
	];

	const updateQuantity = (id, newQuantity) => {
		inventory = inventory.map((item) =>
			item.id === id ? { ...item, quantity: newQuantity } : item
		);
	};

	const resetQuantity = (id) => {
		inventory = inventory.map((item) => (item.id === id ? { ...item, quantity: 0 } : item));
	};

	const removeItem = (id) => {
		inventory = inventory.filter((item) => item.id !== id); // Remove item from inventory array, but not from database
	};
</script>

<svelte:head>
	<title>Inventory</title>
	<meta name="description" content="Inventory Page" />
</svelte:head>

<div class="text-column">
	<h1>Inventory</h1>
	<table>
		<thead>
			<tr>
				<th>Item</th>
				<th>Quantity</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each inventory as item (item.id)}
				<tr class:out-of-stock={item.quantity === 0}>
					<td>{item.name}</td>
					<td>
						<input
							type="number"
							bind:value={item.quantity}
							on:input={() => updateQuantity(item.id, item.quantity)}
						/>
					</td>
					<td>
						<button on:click={() => resetQuantity(item.id)}>Reset to 0</button>
						<button on:click={() => removeItem(item.id)}>Remove</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
	}

	th,
	td {
		padding: 1em;
		border: 1px solid #ddd;
	}

	.out-of-stock {
		box-shadow: 0 0 2px 5px rgba(255, 0, 0, 0.5);
	}
</style>
