<template>
  <v-container tag="section" fluid>
    <TheToolbar :user="user" @handleSignOut="onSignOut"></TheToolbar>
    <v-layout class="mt-5">
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-card :loading="loading" class="bg-surface-variant">
            <v-card-title class="bg-success text-white">Acceso {{getDisplayName}}</v-card-title>
            <v-card-text class="pt-5">
              Para el acceso al <strong>área privada</strong> escoge una de las dos opciones.
            </v-card-text>
            <v-card-actions class="flex-column align-end">
              <v-btn class="bg-red" block variant="outlined" :disabled="user !== null" @click="handleGoogle">
                Google
              </v-btn>
              <v-btn class="bg-blue mt-5" :disabled="user !== null" block @click="handleFacebook" variant="outlined">
                Facebook
              </v-btn>
              <v-alert v-if="error" border="bottom" color="pink darken-1" dark>
                {{ error }}
              </v-alert>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>


    </v-layout>

  </v-container>

</template>

<script setup>
// Components
import { storeToRefs } from 'pinia';
import TheToolbar from '../components/TheToolbar.vue';
// Pinia
import { useStoreUsers } from '../stores/users';

const store = useStoreUsers();
const { onGoogleAuthProvider, onFacebookAuthProvider, onSignOut } = store;
const { loading, error, user, getDisplayName } = storeToRefs(store);

const handleGoogle = () => {
  error.value = false;
  onGoogleAuthProvider();
}

const handleFacebook = () => {
  error.value = false;
  onFacebookAuthProvider();
}

</script>
