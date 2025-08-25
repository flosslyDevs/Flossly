<template>
  <v-text-field
    v-model="modelValue.email"
    variant="outlined"
    type="email"
    placeholder="example@email.com"
    :rules="[required, emailRule]"
  >
    <template #append-inner>
      <v-menu
        v-model="menu"
        activator="parent"
        offset-y
        open-on-click
        close-on-content-click
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            variant="outlined"
            density="default"
            size="small"
            class="text-lowercase"
            style="min-width: 120px"
          >
            {{ modelValue.role || "Select Role" }}
            <v-icon end size="16">mdi-menu-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="role in roles"
            :key="role"
            @click="selectRole(role)"
          >
            <v-list-item-title>{{ role }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-text-field>
</template>

<script setup>
const props = defineProps({
  roles: {
    type: Array,
    default: () => ["Manager", "Dentist", "Nurse", "Receptionist"],
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const menu = ref(false);

function selectRole(role) {
  emit("update:modelValue", {
    ...props.modelValue,
    role,
  });
  menu.value = false;
}

const required = (v) => !!v || "Required.";
const emailRule = (v) =>
  !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email.";
</script>
