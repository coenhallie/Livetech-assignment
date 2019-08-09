<template>
  <v-data-table
    :headers="headers"
    :items="humanreview"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-card-title>
          Human Review Engagements
        </v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Filter by event"
            single-line
            hide-details
          ></v-text-field>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"><h4>Edit Engagement</h4></span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.email" label="Email Address"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.zipcode" label="Zip code"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click.prevent="updateEngagement()">Save & Approve</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteEngagement(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import { db } from '../../db.js';

  export default {
    data: () => ({
      humanreview: [],
      search: '',
      dialog: false,
      headers: [
        { text: 'Name', align: 'left', value: 'name'},
        { text: 'Email Address', value: 'email' },
        { text: 'Zip code', value: 'zipcode' },
        { text: 'ID', value: 'uniqId' },
        { text: 'Actions', value: 'action', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: 0,
        zipcode: 0,
        id: 0
      }
    }),
    firestore: {
      humanreview: db.collection('humanreview')
    },

    methods: {
      updateEngagement() {
        db.collection('humanreview').doc(this.editedItem.id).update({
          name: this.editedItem.name,
          email: this.editedItem.email,
          zipcode: this.editedItem.zipcode
        })
        confirm('Are you sure you want to Approve & Delete this engagement?') && db.collection('humanreview').doc(this.editedItem.id).delete();
        this.dialog = false
      },
      editItem (item) {
        this.editedIndex = this.humanreview.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      deleteEngagement(item) {
        confirm('Are you sure you want to delete this engagement?') && db.collection('humanreview').doc(item.id).delete();
      }
    }
  }
</script>