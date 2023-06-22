<template>
  <li>
    <input
      type="checkbox"
      :checked="taskComputed.completed"
      @change="toggleCompletion"
    />
    {{ taskComputed.name }}
    <button @click="startEditing">Edit</button>
    <button @click="deleteTask">Delete</button>

    <div v-if="isEditing">
      <input v-model="editTaskName" type="text" placeholder="New task name" />
      <button @click="updateTask">Save</button>
      <button @click="cancelEditing">Cancel</button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watchEffect } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskItem",
  props: {
    taskProp: {
      type: Object as PropType<{
        _id: string;
        name: string;
        completed: boolean;
      }>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const isEditing = ref(false);
    const editTaskName = ref("");
    const task = ref<{ _id: string; name: string; completed: boolean }>({
      ...props.taskProp,
    });
    const taskComputed = computed(() => task.value);

    watchEffect(() => {
      task.value = { ...props.taskProp };
    });

    const deleteTask = () => {
      store.dispatch("deleteTask", task.value._id);
    };

    const startEditing = () => {
      isEditing.value = true;
      editTaskName.value = task.value.name;
    };

    const cancelEditing = () => {
      isEditing.value = false;
    };

    const updateTask = () => {
      if (editTaskName.value) {
        store.dispatch("updateTask", {
          _id: task.value._id,
          name: editTaskName.value,
          completed: task.value.completed,
        });
        isEditing.value = false;
      }
    };

    const toggleCompletion = () => {
      task.value.completed = !task.value.completed;
      store.dispatch("updateTask", {
        _id: task.value._id,
        name: task.value.name,
        completed: task.value.completed,
      });
    };

    return {
      deleteTask,
      startEditing,
      cancelEditing,
      updateTask,
      toggleCompletion,
      taskComputed,
      isEditing,
      editTaskName,
    };
  },
});
</script>
