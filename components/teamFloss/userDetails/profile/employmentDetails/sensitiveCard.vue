<template>
    <v-expansion-panels v-model="internalActive">
      <v-expansion-panel style="border: 1px solid #DBDBDB;">
        <!-- Title -->
        <v-expansion-panel-title
          expand-icon=""
          class="panel-title d-flex align-center justify-space-between"
        >
          <div>
            <p class="title-text">Sensitive information</p>
            <p class="subtitle-text">Tax, NI and eligibility information</p>
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
            <!-- TAX -->
            <v-col cols="12">
              <p class="section-title">Tax</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Tax code</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!taxCode ? 'true' : null"
                :class="{ 'is-placeholder': !taxCode }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'taxCode')"
                @keydown.enter.prevent="onEnter($event, 'taxCode')"
              >
                {{ taxCode || "Not specified" }}
              </p>
            </v-col>
  
            <!-- NATIONAL INSURANCE -->
            <v-col cols="12">
              <p class="section-title">National Insurance</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">NI number</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!niNumber ? 'true' : null"
                :class="{ 'is-placeholder': !niNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'niNumber')"
                @keydown.enter.prevent="onEnter($event, 'niNumber')"
              >
                {{ niNumber || "Not specified" }}
              </p>
            </v-col>
  
            <!-- PASSPORT -->
            <v-col cols="12">
              <p class="section-title">Passport</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Passport number</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!passportNumber ? 'true' : null"
                :class="{ 'is-placeholder': !passportNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'passportNumber')"
                @keydown.enter.prevent="onEnter($event, 'passportNumber')"
              >
                {{ passportNumber || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Country of issue</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!passportCountry ? 'true' : null"
                :class="{ 'is-placeholder': !passportCountry }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'passportCountry')"
                @keydown.enter.prevent="onEnter($event, 'passportCountry')"
              >
                {{ passportCountry || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Date of expiry</label>
              <v-menu
                v-model="passportExpiryMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="passportExpiry"
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
                  v-model="passportExpiry"
                  @update:model-value="emitUpdate('passportExpiry', passportExpiry)"
                />
              </v-menu>
            </v-col>
  
            <!-- DRIVING LICENCE -->
            <v-col cols="12">
              <p class="section-title">Driving licence</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Licence number</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!licenceNumber ? 'true' : null"
                :class="{ 'is-placeholder': !licenceNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'licenceNumber')"
                @keydown.enter.prevent="onEnter($event, 'licenceNumber')"
              >
                {{ licenceNumber || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Country of issue</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!licenceCountry ? 'true' : null"
                :class="{ 'is-placeholder': !licenceCountry }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'licenceCountry')"
                @keydown.enter.prevent="onEnter($event, 'licenceCountry')"
              >
                {{ licenceCountry || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Licence class</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!licenceClass ? 'true' : null"
                :class="{ 'is-placeholder': !licenceClass }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'licenceClass')"
                @keydown.enter.prevent="onEnter($event, 'licenceClass')"
              >
                {{ licenceClass || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Date of expiry</label>
              <v-menu
                v-model="licenceExpiryMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="licenceExpiry"
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
                  v-model="licenceExpiry"
                  @update:model-value="emitUpdate('licenceExpiry', licenceExpiry)"
                />
              </v-menu>
            </v-col>
  
            <!-- VISA -->
            <v-col cols="12">
              <p class="section-title">Visa</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Visa number</label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!visaNumber ? 'true' : null"
                :class="{ 'is-placeholder': !visaNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'visaNumber')"
                @keydown.enter.prevent="onEnter($event, 'visaNumber')"
              >
                {{ visaNumber || "Not specified" }}
              </p>
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Visa expiry date</label>
              <v-menu
                v-model="visaExpiryMenu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template #activator="{ props }">
                  <v-text-field
                    v-model="visaExpiry"
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
                  v-model="visaExpiry"
                  @update:model-value="emitUpdate('visaExpiry', visaExpiry)"
                />
              </v-menu>
            </v-col>
  
            <v-col cols="12">
              <v-checkbox
                v-model="eVisaCheck"
                label="eVisa check conducted"
                @change="emitUpdate('eVisaCheck', eVisaCheck)"
              />
            </v-col>
  
            <!-- DBS -->
            <v-col cols="12">
              <p class="section-title">DBS check</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <v-checkbox
                v-model="dbsInitialCheck"
                label="DBS initial check conducted"
                @change="emitUpdate('dbsInitialCheck', dbsInitialCheck)"
              />
              <v-checkbox
                v-model="dbsCheck"
                label="DBS check conducted"
                @change="emitUpdate('dbsCheck', dbsCheck)"
              />
            </v-col>
  
           
  
            <v-col cols="12">
              <label class="field-label">
                DBS certificate number (DBS certificate numbers must be 12 digits long)
              </label>
              <p
                class="field-value"
                contenteditable="true"
                :data-placeholder="!dbsCertificateNumber ? 'true' : null"
                :class="{ 'is-placeholder': !dbsCertificateNumber }"
                @focus="onFocus($event)"
                @blur="onBlur($event, 'dbsCertificateNumber')"
                @keydown.enter.prevent="onEnter($event, 'dbsCertificateNumber')"
              >
                {{ dbsCertificateNumber || "Not specified" }}
              </p>
            </v-col>
  
            <!-- RIGHT TO WORK -->
            <v-col cols="12">
              <p class="section-title">Right to work</p>
              <v-divider class="mb-3" />
            </v-col>
  
            <v-col cols="12">
              <label class="field-label">Right to work status</label>
              <v-select
                v-model="rightToWorkStatus"
                :items="['Citizen', 'Work Visa', 'Student Visa', 'Other']"
                variant="solo"
                density="compact"
                class="input-bordered"
                @update:model-value="emitUpdate('rightToWorkStatus', rightToWorkStatus)"
                flat
              />
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
  
  // TAX
  const taxCode = ref(props.initialData.taxCode || "");
  
  // NI
  const niNumber = ref(props.initialData.niNumber || "");
  
  // Passport
  const passportNumber = ref(props.initialData.passportNumber || "");
  const passportCountry = ref(props.initialData.passportCountry || "");
  const passportExpiry = ref(props.initialData.passportExpiry || "");
  const passportExpiryMenu = ref(false);
  
  // Driving licence
  const licenceNumber = ref(props.initialData.licenceNumber || "");
  const licenceCountry = ref(props.initialData.licenceCountry || "");
  const licenceClass = ref(props.initialData.licenceClass || "");
  const licenceExpiry = ref(props.initialData.licenceExpiry || "");
  const licenceExpiryMenu = ref(false);
  
  // Visa
  const visaNumber = ref(props.initialData.visaNumber || "");
  const visaExpiry = ref(props.initialData.visaExpiry || "");
  const visaExpiryMenu = ref(false);
  const eVisaCheck = ref(props.initialData.eVisaCheck || false);
  
  // DBS
  const dbsInitialCheck = ref(props.initialData.dbsInitialCheck || false);
  const dbsCheck = ref(props.initialData.dbsCheck || false);
  const dbsCertificateNumber = ref(props.initialData.dbsCertificateNumber || "");
  
  // Right to work
  const rightToWorkStatus = ref(props.initialData.rightToWorkStatus || "");
  
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
    padding: 16px 24px;
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
  .section-title {
    font-family: Poppins;
    font-weight: 600;
    font-style: SemiBold;
    font-size: 16px;
    color: #1e1e1e;
    margin-bottom: 6px;
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
  