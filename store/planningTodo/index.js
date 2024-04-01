export const state = () => ({
  planningTodoData: [],
  totalMoney: 0,
});

export const mutations = {
  setplanningTodo(state, data) {
    state.planningTodoData = data;
  },
  toggleplanningTodoStatus(state, { id, done }) {
    const item = state.planningTodoData.find((item) => item.id === id);
    if (item) {
      item.done = done;
    }
  },
};
export const actions = {
  // ______________________________selectall date planningTodo_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/planningTodo.json").then((res) => {
      const fetchedData = res.data;
      const dataArr = [];

      for (let key in fetchedData) {
        const item = { id: key, ...fetchedData[key] };
        dataArr.push(item);
      }

      commit("setplanningTodo", dataArr);
    });
  },

  // _________________________________upload and add planningTodo____________________________
  async addplanningTodo({ commit, dispatch }, data) {
    await this.$axios.post("/planningTodo.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete planningTodo____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/planningTodo/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update status ______________________

  async updateplanningTodo({ commit }, data) {
    const updatedData = { ...data, done: !data.done };

    await this.$axios
      .put(`/planningTodo/${data.id}.json`, updatedData)
      .then((res) => {
        commit("toggleplanningTodoStatus", updatedData);
      });
  },
  // ____________________________________udate to do list task___________________
  async updateTask({ commit, dispatch }, data) {
    await this.$axios.put(`/planningTodo/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
