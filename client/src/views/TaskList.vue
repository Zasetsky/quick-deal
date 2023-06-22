<template>
  <div class="task-list">
    <router-link class="task-list__back-button" to="/"
      >← Go back to home</router-link
    >
    <h1 class="task-list__title">Tasks</h1>
    <div class="task-list__card">
      <form @submit.prevent="createTask" class="task-form">
        <input
          v-model="newTaskName"
          type="text"
          placeholder="New task name"
          required
          class="task-form__input"
        />
        <button type="submit" class="task-form__button">Add task</button>
      </form>
    </div>
    <div class="task-list__card">
      <h4 v-if="tasks.length < 1" class="task-list__empty-message">
        Here Will Be Your Tasks
      </h4>
      <ul v-if="!loading" class="task-list__list">
        <TaskItem v-for="task in tasks" :key="task._id" :taskProp="task" />
      </ul>
      <h4 v-else>Loading...</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import TaskItem from "../components/TaskItem.vue";

export default defineComponent({
  name: "TasksList",
  components: {
    TaskItem,
  },
  setup() {
    const store = useStore();
    const newTaskName = ref("");
    store.dispatch("fetchTasks");

    const tasks = computed(() => store.state.tasks);
    const loading = computed(() => store.state.loading);

    const createTask = () => {
      store.dispatch("createTask", {
        name: newTaskName.value,
        completed: false,
      });
      newTaskName.value = "";
    };

    return { tasks, newTaskName, createTask, loading };
  },
});
</script>

<style scoped lang="scss">
.task-list {
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 1rem;

  &__back-button {
    display: inline-block;
    margin-bottom: 1em;
    color: #3498db;
    text-decoration: none;
  }

  &__title {
    margin-bottom: 1em;
  }

  &__card {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    padding: 1em;
    border-radius: 0.3125rem;
    background-color: #fff;
    margin-bottom: 1em;
  }

  &__empty-message {
    text-align: center;
    color: #888;
  }

  &__list {
    list-style-type: none;
    padding: 1em;
  }
}

.task-form {
  display: flex;
  margin-bottom: 1em;

  &__input {
    flex-grow: 1;
    padding: 0.8em;
    border-radius: 0.3125rem;
    border: 1px solid #ccc;
    margin-top: 0.5em;
    margin-right: 0.5em;
    transition: all 0.2s ease-out;

    &:hover,
    &:focus {
      background-color: #f0efef;
    }
  }

  &__button {
    padding: 0.5em 1em;
    border-radius: 0.3125rem;
    border: none;
    background-color: #3498db;
    color: #fff;
    margin-top: 0.5em;
    cursor: pointer;
    transition: all 0.2s ease-out;
  }

  &__button:hover {
    background-color: #318ecd;
  }
}
</style>
