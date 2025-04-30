<script>
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
