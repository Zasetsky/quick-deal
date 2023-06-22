<template>
  <div>
    <h1>Welcome to the Task Manager</h1>
    <router-link to="/tasks">Go to tasks</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
});
</script>
