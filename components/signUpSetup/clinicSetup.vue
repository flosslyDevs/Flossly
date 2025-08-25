<template>
  <v-form ref="form" v-model="valid">
    <v-label class="mb-2">Clinic Name </v-label>
    <v-text-field
      v-model="clinic.name"
      :rules="[required]"
      variant="outlined"
      single-line
      density="comfortable"
    />
    <v-label class="mb-2">Logo Upload </v-label>
    <imgUpload v-model="clinic.logo" />
    <v-label class="mb-2">Contact </v-label>
    <v-text-field
      variant="outlined"
      v-model="clinic.contact"
      :rules="[required]"
      single-line
      density="comfortable"
    />
    <v-label class="mb-2">Location Address</v-label>
    <v-text-field
      variant="outlined"
      v-model="clinic.address"
      :rules="[required]"
      single-line
      density="comfortable"
    />
    <v-label class="mb-2"> Clinic Type</v-label>
    <v-select
      variant="outlined"
      :items="['Dental', 'General Practice', 'Dermatology', 'Physiotherapy']"
      v-model="clinic.type"
      :rules="[required]"
      single-line
      density="comfortable"
    />
  </v-form>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import imgUpload from "./imgUpload.vue";
const clinic = defineModel();
const valid = ref(false);
const form = ref(null);

const required = (v) => !!v || "Required.";

defineExpose({
  validate: () => form.value.validate(),
  valid,
});
</script>
