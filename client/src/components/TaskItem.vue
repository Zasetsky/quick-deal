<template>
  <li>
    {{ task.name }}
    <button @click="deleteTask">Delete</button>
  </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TaskItem",
  props: {
    task: {
      type: Object as PropType<{ _id: string; name: string }>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    console.log(props);

    const deleteTask = () => {
      store.dispatch("deleteTask", props.task._id);
    };

    return { deleteTask };
  },
});
</script>
