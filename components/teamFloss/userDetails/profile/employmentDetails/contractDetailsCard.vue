<template>
    <v-expansion-panels v-model="internalActive">
      <v-expansion-panel style="border: 1px solid #DBDBDB;">
        <!-- Title -->
        <v-expansion-panel-title
          expand-icon=""
          class="panel-title d-flex align-center justify-space-between"
        >
          <p class="title-text">Contract Details</p>
  
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
            <!-- Entitlement unit -->
            <v-col cols="12">
              <label class="field-label">Entitlement unit</label>
              <v-radio-group
                v-model="entitlementUnit"
                class="mt-2"
                @change="emitUpdate('entitlementUnit', entitlementUnit)"
              >
                <div class="d-flex gap-6">
                  <!-- Days -->
                  <div class="d-flex align-center gap-1">
                    <v-radio label="Days" value="days" class="mr-2" />
                    <v-tooltip text="Entitlement calculated in days">
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="18">mdi-information</v-icon>
                      </template>
                    </v-tooltip>
                  </div>
  
                  <!-- Hours -->
                  <div class="d-flex align-center gap-1">
                    <v-radio label="Hours" value="hours" class="mr-2" />
                    <v-tooltip text="Entitlement calculated in hours">
                      <template #activator="{ props }">
                        <v-icon v-bind="props" size="18">mdi-information</v-icon>
                      </template>
                    </v-tooltip>
                  </div>
                </div>
              </v-radio-group>
            </v-col>
  
            <!-- Full time annual leave entitlement equivalent -->
            <v-col cols="12">
              <label class="field-label">Full time annual leave entitlement equivalent</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!annualLeaveEntitlement ? 'true' : null"
                :class="{ 'is-placeholder': !annualLeaveEntitlement }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'annualLeaveEntitlement')"
                @keydown.enter.prevent="onEnter($event, 'annualLeaveEntitlement')"
              >
                {{ annualLeaveEntitlement || "Not specified" }}
              </p>
            </v-col>
  
            <!-- Leave year start -->
            <v-col cols="12">
              <label class="field-label">Leave year start</label>
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="leaveYearStart"
                    v-bind="props"
                    variant="solo"
                    density="compact"
                    class="input-bordered"
                    placeholder="Select date"
                    readonly
                    flat
                  />
                </template>
                <v-date-picker
                  v-model="leaveYearStart"
                  @update:model-value="emitUpdate('leaveYearStart', leaveYearStart)"
                />
              </v-menu>
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
  
  const entitlementUnit = ref(props.initialData.entitlementUnit || "");
  const annualLeaveEntitlement = ref(props.initialData.annualLeaveEntitlement || "");
  const leaveYearStart = ref(props.initialData.leaveYearStart || "");
  
  const menu = ref(false);
  
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
  .input-bordered :deep(.v-field) {
    border: 1px solid #dfdfdf !important;
    border-radius: 8px !important;
    background-color: white !important;
    min-height: 40px;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
  }
  </style>
  