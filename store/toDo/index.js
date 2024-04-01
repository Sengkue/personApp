export const state = () => ({
  toDoData: [],
  totalMoney: 0,
});

export const mutations = {
  settoDo(state, data) {
    state.toDoData = data;
  },
  setTotalMoney(state, totalMoney) {
    state.totalMoney = totalMoney;
  },
  toggleToDoStatus(state, { id, done }) {
    const item = state.toDoData.find((item) => item.id === id);
    if (item) {
      item.done = done;
    }
  },
};
export const actions = {
  // ______________________________selectall date toDo_______________________________
  async selectAll({ commit }) {
    await this.$axios.get("/toDo.json").then((res) => {
      const fetchedData = res.data;
      const dataArr = [];
      let totalMoney = 0; // Initialize the total

      for (let key in fetchedData) {
        const item = { id: key, ...fetchedData[key] };
        dataArr.push(item);

        // Assuming there is a property named 'amount'
        if (item.money) {
          totalMoney += parseFloat(item.money); // Convert to float and add to total
        }
      }

      commit("settoDo", dataArr);
      commit("setTotalMoney", totalMoney);
    });
  },

  // _________________________________upload and add toDo____________________________
  async addtoDo({ commit, dispatch }, data) {
    await this.$axios.post("/toDo.json", data).then((res) => {
      dispatch("selectAll");
    });
  },
  // ________________________________delete toDo____________________________
  async deleteItem({ commit, dispatch }, id) {
    await this.$axios.delete(`/toDo/${id}.json`).then((res) => {
      dispatch("selectAll");
    });
  },
  // _________________________________update status ______________________

  async updatetoDo({ commit}, data) {
    const updatedData = { ...data, done: !data.done };

    await this.$axios.put(`/toDo/${data.id}.json`, updatedData).then((res) => {
      commit("toggleToDoStatus", updatedData);
    });
  },
  // ____________________________________udate to do list task___________________
  async updateTask({ commit, dispatch }, data) {
    await this.$axios.put(`/toDo/${data.id}.json`, data).then((res) => {
      dispatch("selectAll");
    });
  },
};
