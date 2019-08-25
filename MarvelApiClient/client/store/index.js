import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const state = {
  data: [],
  localCharacters: [],
  //Agregar usuario al estado
  usuario: ""
};

const mutations = {
  RECEIVE_CHARACTERS(state, { characters }) {
    state.data = characters;
  },
  //NEW MUTATIONS
  ADD_CHARACTER(state, { addedCharacter }) {
    state.localCharacters.push(addedCharacter);
  },
  HOW_LOCAL(state, { data }) {
    console.log("CHARACTERS: " + data);
    state.data = data;
  },
  updateUsuario(state, usuario) {
    state.usuario = usuario;
  }
};

const actions = {
  async FETCH_CHARACTERS({ commit }, name) {
    const url = `http://localhost:8090/api/characters?limit=12&name=${name}`;
    const { data } = await axios.get(url);
    commit("RECEIVE_CHARACTERS", { characters: data });
  },
  //NEW ACTIONS
  ADD_LOCAL({ commit }, addedCharacter) {
    //Añadir lógica de POST a Api Local
    const url = `http://localhost:8090/api/characters`;
    axios.post(url, addedCharacter);
    commit("ADD_CHARACTER", { addedCharacter });
  },
  async CHANGE_LOCAL({ commit }, user) {
    const url = `http://localhost:8090/api/characters/${user}`;
    const { data } = await axios.get(url);
    console.log(data);
    commit("SHOW_LOCAL", { data: data });
  }
};

const getters = {
  characters: state => {
    return state.data;
  },
  //Nuevos Getters
  localCharacters: state => {
    return state.localCharacters;
  },
  //Exponer el usuario
  usuario: state => {
    return state.usuario;
  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
