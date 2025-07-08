<script lang="ts">
  let movement = "";
</script>

<form method="POST" action="?/submit">
  <input
    type="text"
    bind:value={movement}
    name="movement"
    placeholder="Movement"
    required
  />
  <button type="submit">Submit</button>
</form>