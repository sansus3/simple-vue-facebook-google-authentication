<template>
    <v-toolbar>
        <v-toolbar-title>WebFerrol</v-toolbar-title>
        <v-toolbar-items>
            <v-btn
            v-if="isBtn"
            @click="$emit('handleSignOut')"
            >Cerrar sesión
                <v-icon end icon="mdi-account-circle-outline"></v-icon>
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>
<script setup>
import {computed} from "vue";

const props = defineProps({
        user: {
            type: Object,
            default: false,
        }
    })
const isBtn = computed(()=>props.user && "uid" in props.user);
</script>