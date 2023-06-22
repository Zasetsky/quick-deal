<template>
  <li
    class="task"
    :class="{ 'task--completed': taskComputed.completed }"
    @click="toggleCompletion"
  >
    <input
      type="checkbox"
      :checked="taskComputed.completed"
      @chang.stop="toggleCompletion"
      class="task__input"
    />
    <span
      class="task__name"
      :class="{ 'name--completed': taskComputed.completed }"
      >{{ taskComputed.name }}</span
    >

    <div class="task__buttons">
      <button
        @click.stop="startEditing"
        class="task__button task__button--edit"
      >
        Edit
      </button>
      <button
        @click.stop="deleteTask"
        class="task__button task__button--delete"
      >
        Delete
      </button>
    </div>

    <div v-if="isEditing" class="task__edit">
      <input
        v-model="editTaskName"
        type="text"
        placeholder="New task name"
        class="task__edit-input"
      />
      <button @click.stop="updateTask" class="task__button task__button--save">
        Save
      </button>
      <button
        @click.stop="cancelEditing"
        class="task__button task__button--cancel"
      >
        Cancel
      </button>
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

<style scoped lang="scss">
.task {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  padding: 0.5em;
  border-radius: 0.3125rem;
  margin-bottom: 1em;
  background-color: #f9f9f9;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease-out;

  &--completed {
    background-color: #e6e6e6;
  }

  &__input {
    margin-right: 0.625rem;
  }

  &__name {
    font-weight: bold;
  }

  .name--completed {
    text-decoration: line-through;
  }

  &__button {
    color: #fff;
    padding: 0.3125rem;
    border-radius: 0.3125rem;
    margin-left: 0.3125rem;
    cursor: pointer;
    transition: all 0.2s ease-out;

    &--edit {
      background-color: #f1c40f;

      &:hover {
        background-color: #deb40c;
      }
    }

    &--delete {
      background-color: #e74c3c;

      &:hover {
        background-color: #ce3b2b;
      }
    }

    &--save {
      background-color: #2ecc71;
      padding: 0.3125rem 0.625rem;
      margin-right: 0.3125rem;

      &:hover {
        background-color: #29b865;
      }
    }

    &--cancel {
      background-color: #e74c3c;
      padding: 0.3125rem 0.625rem;

      &:hover {
        background-color: #ce3b2b;
      }
    }
  }

  &__edit {
    margin-top: 0.625rem;
    display: flex;

    &-input {
      flex-grow: 1;
      margin-right: 0.3125rem;
      padding: 0.3125rem;
      border-radius: 0.3125rem;
      border: 1px solid #ccc;
    }
  }
}

.task:hover {
  background-color: #f0efef;
}
</style>
