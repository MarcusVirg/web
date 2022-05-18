<script lang="ts">
  import { onMount } from 'svelte'

  onMount(async () => {
    const modules = import.meta.glob('$lib/blog/content/*.md')
    console.log(modules)
    const module = await modules['introduction']()
    console.log(module)
  })
</script>

<h1 class="text-lg">My post</h1>
