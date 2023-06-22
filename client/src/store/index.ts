import { createStore } from "vuex";
import axios from "axios";

interface ITask {
  _id: string;
  name: string;
  completed: boolean;
}

export default createStore({
  state: {
    tasks: [] as ITask[],
    loading: false,
  },
  mutations: {
    setTasks(state, tasks: ITask[]) {
      state.tasks = tasks;
    },

    setLoading(state, value: boolean) {
      state.loading = value;
    },

    addTask(state, task: ITask) {
      state.tasks.push(task);
    },

    removeTask(state, taskId: string) {
      state.tasks = state.tasks.filter((task) => task._id !== taskId);
    },

    updateTask(state, updatedTask: ITask) {
      const taskIndex = state.tasks.findIndex(
        (task) => task._id === updatedTask._id
      );
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      commit("setLoading", true);
      const response = await axios.get("http://localhost:3000/tasks");
      commit("setTasks", response.data);
      commit("setLoading", false);
    },

    async createTask({ commit }, task: ITask) {
      const response = await axios.post("http://localhost:3000/tasks", task);
      commit("addTask", response.data);
    },

    async deleteTask({ commit }, taskId: string) {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      commit("removeTask", taskId);
    },

    async updateTask({ commit }, task: ITask) {
      const response = await axios.put(
        `http://localhost:3000/tasks/${task._id}`,
        task
      );
      if (response.status === 200) {
        commit("updateTask", task);
      } else {
        console.error("Failed to update task", response);
      }
    },
  },
  modules: {},
});
