export const state = () => ({
    answers:false,
    postanswer:{},
});
export const mutations = {
  setAnswers(state, data) {
  state.answers = data;
},
setPostAnswer(state, data){
  state.postanswer = data;
}
};
export const actions = {
  postAnswer({commit}, form){
    this.$axios.post('https://itc-saub-default-rtdb.firebaseio.com/postAnswers.json', form).then((data)=>{
   
    })
  },

  selectPostAnswers({commit}){
    this.$axios.get("https://itc-saub-default-rtdb.firebaseio.com/postAnswers.json").then((res)=>{
      commit('setPostAnswer', res.data);
    })
  }

};