<script>
	import { goto } from '$app/navigation';

	let itemName = '', description = '', category = '', weightUnit = '', imageURL = '';
    let quantity = 0, weight = 0, price = 0;
    let expiryDate = new Date();
    let availableForSale = true, isPackaged = true;

    async function addProduct() {
        const query = await fetch('http://localhost:4000/addProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: itemName, description, category,
                quantity, weight, weightUnit, imageURL,
                expiry: expiryDate, isPackaged,
                availableForSale, pricePerUnit: price
            })
        });
        const result = await query.json();
        if (result.success) goto('/dashboard');
        else alert('Error while adding product!');
    }
</script>

<div class="container">
    <h1 class="my-4 text-center">Add Product</h1>
    <form on:submit|preventDefault={addProduct}>
        <div class="mb-3">
            <label for="itemName" class="form-label">Item Name</label>
			<input type="text" id="itemName" class="form-control" bind:value={itemName} required />
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Description</label>
			<input type="text" id="description" class="form-control" bind:value={description} required />
        </div>
        <div class="mb-3">
            <label for="category" class="form-label">Category</label>
			<input type="text" id="category" class="form-control" bind:value={category} required />
        </div>
        <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
			<input type="number" min="0" id="quantity" class="form-control" bind:value={quantity} required />
        </div>
        <div class="mb-3">
            <label for="weight" class="form-label">Weight</label>
			<input type="number" min="0" step="0.01" id="weight" class="form-control" bind:value={weight} required />
        </div>
        <div class="mb-3">
            <label for="weightUnit" class="form-label">Weight Unit</label>
			<input type="text" id="weightUnit" class="form-control" bind:value={weightUnit} required />
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
			<input type="number" min="0" step="0.01" id="price" class="form-control" bind:value={price} required />
        </div>
        <div class="mb-3">
            <label for="expiryDate" class="form-label">Expiry Date</label>
			<input type="date" min="0" id="expiryDate" class="form-control" bind:value={expiryDate} required />
        </div>
        <div class="mb-3">
            <label for="availableForSale" class="form-label">Available for Sale</label>
			<input type="checkbox" min="0" id="availableForSale" class="form-control" bind:checked={availableForSale} />
        </div>
        <div class="mb-3">
            <label for="isPackaged" class="form-label">Is Packaged</label>
			<input type="checkbox" min="0" id="isPackaged" class="form-control" bind:checked={isPackaged} />
        </div>
        <div class="mb-3">
            <label for="imageURL" class="form-label">Product Image</label>
			<input type="text" id="imageURL" class="form-control" bind:value={imageURL} required />
        </div>
        <div class="d-grid gap-2">
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
    </form>
</div>
