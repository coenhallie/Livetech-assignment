<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="black"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Livetech</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <HumanReviewTable/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      color="black"
      app
    >
      <span class="white--text">&copy; 2019 - Coen Hallie</span>
    </v-footer>
  </v-app>
</template>

<script>
import HumanReviewTable from './HumanReviewTable.vue'

  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    components: {
      HumanReviewTable
    }
  }
</script>