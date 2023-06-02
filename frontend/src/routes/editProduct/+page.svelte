<script>
    import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

    let prodDetails = {
        "_id": "", "name": "Testing Random Shit", "description": "", "category": "",
        "quantity": 0, "weight": 0, "weightUnit": "", "pricePerUnit": 3.5,
        "expiry": "", "availableForSale": true, "isPackaged": true, "imageURL": ""
    }

    onMount(async() => {
        prodDetails = JSON.parse(sessionStorage.getItem("prodInfo"));
        sessionStorage.removeItem("prodInfo");
	});

    async function editProduct() {
        const query = await fetch('http://localhost:4000/editProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(prodDetails)
        });
        const result = await query.json();
        if (result.success) goto('/dashboard');
        else alert('Error while updating product!');
    }
</script>

<div class="container">
    <h1 class="my-4 text-center">Edit Product</h1>
    <form on:submit|preventDefault={editProduct}>
        <div class="mb-3">
            <label for="itemName" class="form-label">Item Name</label>
			<input type="text" id="itemName" class="form-control" bind:value={prodDetails.name} required />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
			<input type="text" id="description" class="form-control" bind:value={prodDetails.description} required />
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category</label>
			<input type="text" id="category" class="form-control" bind:value={prodDetails.category} required />
        </div>
        <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
			<input type="number" min="0" id="quantity" class="form-control" bind:value={prodDetails.quantity} required />
        </div>
        <div class="mb-3">
            <label for="weight" class="form-label">Weight</label>
			<input type="number" min="0" step="0.01" id="weight" class="form-control" bind:value={prodDetails.weight} required />
        </div>
        <div class="mb-3">
            <label for="weightUnit" class="form-label">Weight Unit</label>
			<input type="text" id="weightUnit" class="form-control" bind:value={prodDetails.weightUnit} required />
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
			<input type="number" min="0" step="0.01" id="price" class="form-control" bind:value={prodDetails.pricePerUnit} required />
        </div>
        <div class="mb-3">
            <label for="expiryDate" class="form-label">Expiry Date</label>
			<input type="date" min="0" id="expiryDate" class="form-control" bind:value={prodDetails.expiry} required />
        </div>
        <div class="mb-3">
            <label for="availableForSale" class="form-label">Available for Sale</label>
			<input type="checkbox" min="0" id="availableForSale" class="form-control" bind:checked={prodDetails.availableForSale} />
        </div>
        <div class="mb-3">
            <label for="isPackaged" class="form-label">Is Packaged</label>
			<input type="checkbox" min="0" id="isPackaged" class="form-control" bind:checked={prodDetails.isPackaged} />
        </div>
        <div class="mb-3">
            <label for="imageURL" class="form-label">Product Image</label>
			<input type="text" id="imageURL" class="form-control" bind:value={prodDetails.imageURL} required />
        </div>
        <div class="d-grid gap-2">
			<button type="submit" class="btn btn-primary">Update</button>
		</div>
    </form>
</div>
