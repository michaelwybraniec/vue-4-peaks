<template>
  <div id="app">
    <div class="row p-4">
      <main class="col-sm-12">
        <People/>
      </main>
    </div>
  </div>
</template>

<script>
import People from "@/components/People";

export default {
  name: "App",
  components: {
    People
  }
};
</script>

<style>
@import "@/design/index.scss";
</style>
