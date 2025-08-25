<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12">
        <v-card
          elevation="0"
          class="pa-7"
          style="border: 1px solid #dbdbdb; border-radius: 12px"
        >
          <v-row>
            <v-col cols="12" md="4">
              <form @submit.prevent="onSave">
                <!-- Current Password -->
                <label class="input-label">Current Password</label>
                <v-text-field
                  v-model="form.currentPassword"
                  type="password"
                  density="comfortable"
                  variant="solo"
                  single-line
                  required
                  class="mb-2 custom-input"
                  flat
                />

                <!-- Forgot Password -->
                <div class="forgot-line">
                  Forgot your password?
                  <a href="#" class="reset-link">Reset password via email</a>
                </div>

                <!-- New Password -->
                <label class="input-label">New Password</label>
                <v-text-field
                  v-model="form.newPassword"
                  type="password"
                  density="comfortable"
                  variant="solo"
                  single-line
                  required
                  class="mb-2 custom-input"
                  flat
                />

                <!-- Confirm New Password -->
                <label class="input-label">Confirm New Password</label>
                <v-text-field
                  v-model="form.confirmPassword"
                  type="password"
                  density="comfortable"
                  variant="solo"
                  single-line
                  required
                  class="mb-4 custom-input"
                  flat
                />

                <!-- Save Button -->
                <v-btn
                  :color="isFormValid ? 'primary' : ''"
                  class="px-6 w-100"
                  style="height: 48px"
                  :disabled="!isFormValid"
                  type="submit"
                >
                  Save
                </v-btn>
              </form>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";

const form = reactive({
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
});

const isFormValid = computed(() => {
  return (
    form.currentPassword &&
    form.newPassword &&
    form.confirmPassword &&
    form.newPassword === form.confirmPassword
  );
});

function onSave() {
  console.log("Saving new password:", form);
  // handle API call here
}
</script>

<style scoped>
.input-label {
  display: block;
  font-family: "Poppins";
  font-weight: 400;
  font-size: 14px;
  margin-bottom: 4px;
  color: #737373;
}

.custom-input :deep(.v-field) {
  border: 1px solid #dfdfdf !important;
  border-radius: 8px !important;
  background-color: white !important;
  min-height: 40px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
}

.forgot-line {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  margin: 8px 0 16px;
  color: #1e1e1e;
}

.reset-link {
  display: block;
  margin-top: 4px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 16px;
  color: #1976d2; /* primary blue link */
  text-decoration: none;
  cursor: pointer;
}
.reset-link:hover {
  text-decoration: underline;
}
</style>
