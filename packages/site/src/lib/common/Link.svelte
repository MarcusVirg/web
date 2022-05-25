<script lang="ts">
  import cx from 'classnames'

  export let href: string = '#'
  export let useNewWindow: boolean = false
</script>

{#if useNewWindow}
  <a
    class={cx(
      $$props.class,
      'underline underline-offset-4 decoration-brand-gray decoration-2 text-brand-white hover:decoration-brand-cream'
    )}
    {href}
    target="_blank"
    rel="noopener"
  >
    <slot>link</slot>
  </a>
{:else}
  <a
    class={cx(
      $$props.class,
      'underline underline-offset-4 decoration-brand-gray decoration-2 text-brand-white hover:decoration-brand-cream'
    )}
    {href}
  >
    <slot>link</slot>
  </a>
{/if}
