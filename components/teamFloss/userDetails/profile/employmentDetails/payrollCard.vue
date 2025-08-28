<template>
    <v-expansion-panels v-model="internalActive">
      <v-expansion-panel style="border: 1px solid #DBDBDB;">
        <!-- Title -->
        <v-expansion-panel-title
          expand-icon=""
          class="panel-title d-flex align-center justify-space-between"
        >
          <div>
            <p class="title-text">Payroll information</p>
            <p class="subtitle-text">Payroll number and pension details</p>
          </div>
  
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
            <!-- Payroll number -->
            <v-col cols="12">
              <label class="field-label">Payroll number</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!payrollNumber ? 'true' : null"
                :class="{ 'is-placeholder': !payrollNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'payrollNumber')"
                @keydown.enter.prevent="onEnter($event, 'payrollNumber')"
              >
                {{ payrollNumber || "Not specified" }}
              </p>
            </v-col>
  
            <!-- Pension eligible -->
            <v-col cols="12">
              <label class="field-label">Pension eligible?</label>
              <v-radio-group
                v-model="pensionEligible"
                class="mt-2"
                @change="emitUpdate('pensionEligible', pensionEligible)"
              >
                <div class="d-flex">
                  <v-radio label="Yes" value="yes" />
                  <v-radio label="No" value="no" />
                </div>
              </v-radio-group>
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
  
  const payrollNumber = ref(props.initialData.payrollNumber || "");
  const pensionEligible = ref(props.initialData.pensionEligible || "");
  
  const togglePanel = () => {
    internalActive.value = internalActive.value === 0 ? null : 0;
  };
  
  const emitUpdate = (field, value) => {
    emit("updateField", { field, value });
  };
  
  const onFocus = (e) => {
    if (e.target.dataset.placeholder === "true") {
      e.target.innerText = "";
      e.target.dataset.placeholder = "false";
      e.target.classList.remove("is-placeholder");
    }
  };
  
  const onBlur = (e, field) => {
    const text = e.target.innerText.trim();
    if (!text) {
      e.target.innerText = "Not specified";
      e.target.dataset.placeholder = "true";
      e.target.classList.add("is-placeholder");
      emitUpdate(field, "");
    } else {
      emitUpdate(field, text);
    }
  };
  
  const onEnter = (e, field) => {
    e.target.blur(); // triggers onBlur
  };
  </script>
  
  <style scoped>
  .panel-title {
    background: #eff5f5;
    padding: 12px 16px;
  }
  .panel-text {
    padding: 16px 24px; /* match title padding */
  }
  .title-text {
    font-family: Poppins;
    font-weight: 600;
    font-size: 16px;
    color: #1e1e1e;
  }
  .subtitle-text {
    font-family: Poppins;
    font-weight: 400;
    font-size: 13px;
    color: #1e1e1e;
    margin-top: 4px;
  }
  .field-label {
    display: block;
    font-family: Poppins;
    font-weight: 600;
    font-size: 13px;
    color: #1e1e1e;
    margin-bottom: 4px;
  }
  .field-value {
    font-family: Poppins;
    font-weight: 400;
    font-size: 14px;
    color: #101010;
    outline: none;
    cursor: text;
    border: 1px solid transparent;
    border-radius: 6px;
    min-height: 22px;
    padding: 6px 8px;
  }
  .field-value.is-placeholder {
    color: #9e9e9e;
    font-style: italic;
  }
  .field-value:focus {
    border: 1px solid #dfdfdf;
    background-color: #fafafa;
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
  .no-gap-radios :deep(.v-selection-control) {
 flex: none;
}
  </style>
  