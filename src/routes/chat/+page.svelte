<script lang="ts">
  export let data: {
    entries: {
      id: number;
      userId: string;
      steps: number;
      date: string;
    }[];
  };

  console.log("data", data);
</script>