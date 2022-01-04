<script lang="ts">
	import { page } from "$app/stores";
	import "src/app.scss";
	import Navbar from "$lib/Navbar.svelte";
</script>

{#if $page.url.pathname === "/"}
	<div class="landing-container">
		<slot />
		<Navbar />
	</div>
{:else}
	<header>
		<Navbar />
	</header>

	<main>
		<slot />
	</main>
{/if}

<style lang="scss">
	.landing-container {
		min-height: 100vh;
		padding: 24px 12px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	header {
		display: block;
		position: static;
		margin-top: 16px;

		@media screen and (min-width: 1400px) {
			position: fixed;
			margin-top: 0;
			top: 26px;
			left: 20px;
			width: 196px;
		}
	}

	main {
		max-width: 920px;
		margin: 28px auto;
		padding: 0 12px;
	}
</style>
