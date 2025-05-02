<script lang="ts">
  export let data: {
    entries: {
      id: number;
      userId: string;
      steps: number;
      date: string;
    }[];
  };

  let steps = "";
  let date = "";
</script>

<form method="POST" action="?/submit">
  <input
    type="number"
    bind:value={steps}
    name="steps"
    placeholder="Steps"
    required
  />
  <input type="date" bind:value={date} name="date" required />
  <button type="submit">Submit</button>
</form>

<h2>Previous Entries</h2>
{#if data.entries.length > 0}
  <ul>
    {#each data.entries as entry (entry.id)}
      <li>
        <form method="POST" action="?/edit">
          <input type="hidden" name="id" value={entry.id} />

          <input type="number" name="steps" value={entry.steps} required />

          <input type="date" name="date" value={new Date(entry.date).toISOString().slice(0, 10)} required />

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
