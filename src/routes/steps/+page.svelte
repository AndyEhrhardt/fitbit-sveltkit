<script lang="ts">
  export let data: {
    entries: {
      id: number;
      userId: string;
      steps: number;
      date: string;
    }[];
  };

  let steps = '';
  let date = '';
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
    {#each data.entries as entry}
      <li>
        {entry.date} — {entry.steps} steps
      </li>
    {/each}
  </ul>
{:else}
  <p>No data yet.</p>
{/if}