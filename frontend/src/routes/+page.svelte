<script>
	import { goto } from '$app/navigation';

	function goTo(page) {
		goto(`/${page}`);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="AYHF Online Store" />
</svelte:head>

<section>
	<div class="banner">
		<img
			src="https://plus.unsplash.com/premium_photo-1663852297801-d277b7af6594?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
			alt="Img Banner"
		/>
	</div>
	<div class="text-column">
		<h1>All Your Healthy Foods Online Store</h1>
		<p>
			Welcome to our online store where you can find a wide range of healthy and organic foods. We
			are committed to providing high-quality products to support your healthy lifestyle. Browse
			through our catalogue and add items to your cart for a convenient and nutritious shopping
			experience.
		</p>
		<button class="btn btn-primary mt-3" on:click={() => goTo('about')}>About Us</button>
		<button class="btn btn-primary mt-3" on:click={() => goTo('catalogue')}>Start Shopping</button>
		<button class="btn btn-primary mt-3" on:click={() => goTo('customerLogin')}>Log In Here</button>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.banner {
		width: 100%;
		height: 300px;
		overflow: hidden;
	}

	.banner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text-column {
		max-width: 600px;
		text-align: center;
		padding: 20px;
		margin-top: 20px;
	}

	h1 {
		margin-bottom: 20px;
	}

	.btn {
		margin-top: 10px;
	}
</style>
