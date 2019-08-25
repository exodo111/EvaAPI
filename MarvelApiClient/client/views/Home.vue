<template>
  <div class="page">
    <!-- Agregar Forma de Usuario -->
    <div class="ui action input">
      <input v-model="usuario" placeholder="Usuario" type="text" required />
      <button class="ui icon blue button" v-on:click="changeToLocal()">
        <i class="eye icon"></i>
        Ver Lista
      </button>
    </div>

    <search-character-form></search-character-form>
    <characters-list></characters-list>
  </div>
</template>

<script>
import SearchCharacterForm from "components/SearchCharacterForm";
import CharactersList from "components/CharactersList";

export default {
  components: {
    SearchCharacterForm,
    CharactersList
  },
  data: function() {
    return {};
  },
  methods: {
    //ChangeToLocal
    changeToLocal() {
      this.$store.dispatch("CHANGE_LOCAL", this.$store.state.usuario);
    }
  },
  //Agregar Computed de usuario
  computed: {
    usuario: {
      get() {
        return this.$store.state.usuario;
      },
      set(value) {
        this.$store.commit("updateUsuario", value);
      }
    }
  }
};
</script>
