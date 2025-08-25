<template>
    <v-col :cols="cols">
      <div class="task-div">
        <div class="d-flex justify-space-between w-100"> 
          <img :src="image" alt="" />
  
          <v-tooltip :text="tooltip">
            <template #activator="{ props }">
              <v-chip
              v-if="!hideChip"
                v-bind="props"
                class="bonus-chip"
                variant="flat"
                density="comfortable"
                size="small"
                prepend-icon="mdi-star"
                label
              >
                {{ bonus }}
              </v-chip>
            </template>
          </v-tooltip>
        </div>
        <p>{{ label }}</p>
        <h2>{{ value }}</h2>
      </div>
    </v-col>
  </template>
  
  <script setup>
  defineProps({
    cols: { type: Number, default: 3 },
    image: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: [Number, String], default: 0 },
    bonus: { type: String, default: '+10' },
    tooltip: { type: String, default: 'Bonus points awarded' },
    hideChip:{type: Boolean,default : false},
  })
  </script>
<style scoped lang="scss">
.task-div {
  border: 1px solid #dbdbdb;
  border-radius: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #f3f6fa, #ffffff);
  height: 140px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  img {
    width: 50px;
    height: 50px;
  }

  p {
    font-size: 14px;
    color: #1e1e1e;
    font-weight: 400;
  }

  h1 {
    font-size: 40px;
    color: #101010;
    font-weight: 700;
  }
}

.bonus-chip {
  border: 1px solid #fea200;
  background-color: #fff0d5;
  color: #1e1e1e;
  font-weight: 500;
  font-size: 13px;
  border-radius: 16px;
}

/* Deep selector to target the icon inside the chip */
::v-deep(.bonus-chip .v-icon) {
  color: #fea200;
}
</style>  