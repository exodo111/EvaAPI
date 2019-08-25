<template>
  <div v-if="!!characters.length" class="ui characters-list cards">
    <div v-for="character in characters" :key="character.name" class="ui card fadeIn-animation">
      <div class="image">
        <img :src="character.image" />
      </div>
      <div class="content">
        <div class="header">{{character.name}}</div>
        <div class="description">{{character.description}}</div>
      </div>
      <div class="extra content">
        <span class="right floated">
          <a target="_blank" :href="character.url">
            <button class="ui icon purple tiny button">More Info</button>
          </a>
          <!-- Botón agregar -->
          <button class="ui button green tiny" v-on:click="addCharacterToLocal(character)">
            <i class="add icon"></i>
          </button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: mapGetters([
    "characters",
    "localCharacters",
    //usuario en computed
    "usuario"
  ]),
  methods: {
    //METODO AGREGAR
    addCharacterToLocal(character) {
      if (this.usuario == "") {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Error",
          text: "Llena el nombre de usuario"
        });
        return;
      }
      //Agregar usuario a personaje
      character.user = this.usuario;
      this.$store.dispatch("ADD_LOCAL", character);

      this.$notify({
        group: "foo",
        title: "Add",
        text: "Personaje Agregado a Lista de usuario: " + this.usuario
      });
    }
  }
};
</script>

<style>
.characters-list.cards {
  margin-top: 2em;
  justify-content: center;
}

.characters-list.cards .image {
  position: relative;
  width: 100%;
  height: 246px;
  overflow: hidden;
}

.characters-list.cards .image img {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 100%;
  width: auto;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.ui.card,
.ui.cards > .card {
  width: 364px;
}
</style>