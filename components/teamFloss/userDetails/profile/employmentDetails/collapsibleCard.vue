<template>
    <v-expansion-panels v-model="internalActive">
      <v-expansion-panel style="border: 1px solid #DBDBDB;">
        <!-- Title -->
        <v-expansion-panel-title
          expand-icon=""
          class="panel-title d-flex align-center justify-space-between"
        >
          <div>
            <p class="title-text">{{ card.title }}</p>
            <p v-if="card.subtitle" class="subtitle-text mt-2">{{ card.subtitle }}</p>
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
          <!-- Notification -->
          <div v-if="card.notification" class="notification-box">
            {{ card.notification }}
          </div>
  
          <!-- Fields -->
          <v-row>
            <v-col
              cols="12"
              md="6"
              v-for="(field, j) in card.fields"
              :key="field.id || j"
            >
              <label class="field-label">{{ field.label }}</label>
              <p
                class="field-value"
                contenteditable="true"
                @focus="onFocus($event)"
                @blur="onBlur($event, card.id, field)"
                @keydown.enter.prevent="onEnter($event)"
              >
                {{ displayValue(card, field) }}
              </p>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  const props = defineProps({
    card: { type: Object, required: true },
  });
  
  const emit = defineEmits(["updateField"]);
  
  const internalActive = ref(null);
  
  const togglePanel = () => {
    internalActive.value = internalActive.value === 0 ? null : 0;
  };
  
  // Dynamic placeholder logic
  const getPlaceholder = (card, field) => {
    if (card.title === "Location" && field.label === "Public holiday observe for") {
      return "Select Location";
    }
    return "Not specified";
  };
  
  const displayValue = (card, field) => {
    if (field?.value?.toString().trim()) return field.value;
    return getPlaceholder(card, field);
  };
  
  const onFocus = (e) => {
    const text = e.target.innerText.trim();
    if (text === "Not specified" || text === "Select Location") {
      e.target.innerText = "";
    }
  };
  
  const onBlur = (e, cardId, field) => {
    const text = e.target.innerText.trim();
    const newValue = text || "";
  
    emit("updateField", {
      cardId,
      fieldId: field.id,
      value: newValue,
    });
  
    // Restore placeholder only if truly empty
    if (!text) {
      e.target.innerText = getPlaceholder(props.card, field);
    }
  };
  
  // Pressing Enter just commits via blur
  const onEnter = (e) => {
    e.target.blur();
  };
  </script>
  
  <style scoped>
  .panel-title {
    background-color: #eff5f5;
    padding: 12px 16px;
  }
  .panel-text {
    padding: 12px 16px;
  }
  
  .title-text {
    font-family: Poppins;
    font-weight: 600;
    font-size: 16px;
    color: #1e1e1e;
    margin: 0;
  }
  .subtitle-text {
    font-family: Poppins;
    font-weight: 400;
    font-size: 13px;
    color: #1e1e1e;
    margin: 0;
  }
  
  .notification-box {
    border-radius: 8px;
    padding: 12px;
    margin: 16px 0;
    font-family: Poppins;
    font-weight: 400;
    font-size: 13px;
    background-color: #f9fafa;
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
    padding: 2px 4px;
  }
  
  .field-value:focus {
    border: 1px solid #dfdfdf;
    background-color: #fafafa;
  }
  </style>
  