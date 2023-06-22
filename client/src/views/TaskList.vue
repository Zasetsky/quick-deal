<template>
  <div>
    <h1>Tasks</h1>
    <form @submit.prevent="createTask">
      <input
        v-model="newTaskName"
        type="text"
        placeholder="New task name"
        required
      />
      <button type="submit">Add task</button>
    </form>
    <ul v-if="!loading">
      <TaskItem v-for="task in tasks" :key="task._id" :task="task" />
    </ul>
    <h4 v-else>Идёт загрузка...</h4>
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
