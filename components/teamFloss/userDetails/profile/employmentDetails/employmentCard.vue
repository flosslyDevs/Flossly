<template>
  <v-expansion-panels v-model="internalActive">
    <v-expansion-panel style="border: 1px solid #dbdbdb">
      <!-- Title -->
      <v-expansion-panel-title
        expand-icon=""
        class="panel-title d-flex align-center justify-space-between"
      >
        <p class="title-text">Employment Details</p>

        <!-- Custom collapse icon -->
        <template #actions>
          <div class="collapse-btn" @click.stop="togglePanel">
            <v-icon color="white">
              {{ internalActive === 0 ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </div>
        </template>
      </v-expansion-panel-title>

      <!-- Content -->
      <v-expansion-panel-text class="panel-text">
        <v-row dense>
          <!-- Employee Type -->
          <v-col cols="12">
            <label class="field-label">Employee type</label>
            <v-radio-group
              v-model="employeeType"
              class="mt-2"
              @change="emitUpdate('employeeType', employeeType)"
            >
              <div class="d-flex gap-6">
                <!-- Option 1 -->
                <div class="d-flex align-center gap-1">
                  <v-radio
                    label="Fixed, full or part time"
                    value="fixed"
                    class="mr-2"
                  />
                  <v-tooltip
                    text="This applies when employee is fixed full or part time"
                  >
                    <template #activator="{ props }">
                      <v-icon v-bind="props" size="18">mdi-information</v-icon>
                    </template>
                  </v-tooltip>
                </div>

                <!-- Option 2 -->
                <div class="d-flex align-center gap-1">
                  <v-radio
                    label="Short hours or variable"
                    value="variable"
                    class="mr-2"
                  />
                  <v-tooltip
                    text="This applies when employee works variable hours"
                  >
                    <template #activator="{ props }">
                      <v-icon v-bind="props" size="18">mdi-information</v-icon>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-radio-group>
          </v-col>

          <!-- Working time pattern -->
          <v-col cols="12">
            <div class="d-flex align-center justify-space-between">
              <label class="field-label">Working time pattern</label>
              <v-btn
                prepend-icon="mdi-plus"
                color="primary"
                variant="flat"
                size="small"
              >
                Add New
              </v-btn>
            </div>
            <v-select
              v-model="workingPattern"
              :items="['Pattern A', 'Pattern B', 'Pattern C']"
              variant="solo"
              density="compact"
              class="mt-2 input-bordered"
              placeholder="Select pattern"
              @update:model-value="emitUpdate('workingPattern', workingPattern)"
              flat
            />
          </v-col>

          <!-- Full-time working week -->
          <v-col cols="12">
            <label class="field-label">Company's full time working week</label>
            <div class="d-flex gap-4 mt-2">
              <v-text-field
                v-model="fullTimeWeek.hours"
                type="number"
                variant="solo"
                density="compact"
                hide-details
                style="max-width: 150px"
                @blur="emitUpdate('fullTimeWeek', fullTimeWeek)"
                class="mr-2 input-bordered"
                flat
              >
                <template #append-inner>
                  <span class="append-label">hrs</span>
                </template>
              </v-text-field>

              <v-text-field
                v-model="fullTimeWeek.minutes"
                type="number"
                variant="solo"
                density="compact"
                hide-details
                style="max-width: 150px"
                @blur="emitUpdate('fullTimeWeek', fullTimeWeek)"
                class="input-bordered"
                flat
              >
                <template #append-inner>
                  <span class="append-label">mins</span>
                </template>
              </v-text-field>
            </div>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  initialData: { type: Object, default: () => ({}) },
});

const emit = defineEmits(["updateField"]);

const internalActive = ref(null);

const employeeType = ref(props.initialData.employeeType || "");
const workingPattern = ref(props.initialData.workingPattern || "");
const fullTimeWeek = ref({
  hours: props.initialData?.fullTimeWeek?.hours || "",
  minutes: props.initialData?.fullTimeWeek?.minutes || "",
});

const togglePanel = () => {
  internalActive.value = internalActive.value === 0 ? null : 0;
};

const emitUpdate = (field, value) => {
  emit("updateField", { field, value });
};
</script>

<style scoped>
.panel-title {
  background: #eff5f5;
}
.panel-text {
  padding: 16px 24px; /* padding equal to title section */
}
.title-text {
  font-family: Poppins;
  font-weight: 600;
  font-style: SemiBold;
  font-size: 16px;
  color: #1e1e1e;
}
.field-label {
  font-family: Poppins;
  font-weight: 600;
  font-size: 13px;
  color: #1e1e1e;
}
.collapse-btn {
    background-color: #213536;
    border-radius: 50%;
    padding: 6px;
    height: 24px;
    width: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
.append-label {
  font-size: 12px;
  color: #666;
}
.input-bordered :deep(.v-field) {
  border: 1px solid #dfdfdf !important;
  border-radius: 8px !important;
  background-color: white !important;
  min-height: 40px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
}
</style>
