<template>
  <div class="container">
    <h1 class="home__title">Welcome to the Task Manager</h1>
    <router-link class="home__link" to="/tasks">Go to tasks</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomePage",
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1rem;
  margin-top: 5rem;
}
.home__title {
  font-size: 2rem;
}
.home__link {
  display: inline-block;
  text-decoration: none;
  background-color: #3498db;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.3125rem;
  text-align: center;
  margin-top: 1rem;
  transition: all 0.2s ease-out;
}
.home__link:hover {
  background-color: #318ecd;
}
</style>
