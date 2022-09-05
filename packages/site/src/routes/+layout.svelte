<script lang="ts">
  import Footer from '$lib/Footer.svelte'
  import Header from '$lib/Header.svelte'
  import '../index.css'
</script>

<Header />
<main class="max-w-4xl min-h-full m-auto p-8">
  <slot />
</main>
<Footer />
