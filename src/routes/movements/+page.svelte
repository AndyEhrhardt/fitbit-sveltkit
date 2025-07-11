<script lang="ts">
  import { enhance } from "$app/forms";
  export let form; // this comes from the page load context

  export let data: {
    entries: {
      id: number;
      name: string;
    }[];
  };
  console.log("Data:", data);
  let movement = "";
</script>

<form method="POST" action="?/submit" use:enhance>
  <input
    type="text"
    bind:value={movement}
    name="movement"
    placeholder="Movement"
    required
  />
  <button type="submit">Submit</button>
</form>
{#if form?.success}
  <p class="text-green-500">{form.message}</p>
{:else if form?.error}
  <p class="text-red-500">{form.error}</p>
{/if}
<h2>Previous Entries</h2>
{#if data.entries.length > 0}
  <ul>
    {#each data.entries as entry (entry.id)}
      <li>
        <form method="POST" action="?/edit">
          <input type="hidden" name="id" value={entry.id} />
          <label for="movement-{entry.id}">Movement: {entry.name}</label>
          <input type="text" name="name" value={entry.name} required />

          <button type="submit">💾 Save</button>
        </form>
        <form method="POST" action="?/delete" style="display: inline;">
          <input type="hidden" name="id" value={entry.id} />
          <button type="submit" aria-label="Delete entry">🗑️</button>
        </form>
      </li>
    {/each}
  </ul>
{:else}
  <p>No data yet.</p>
{/if}
