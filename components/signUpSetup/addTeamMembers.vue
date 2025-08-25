<template>
  <v-form v-if="showform" ref="form" v-model="valid">
    <sapn class="lbl">Invite people to collaborate</sapn>
    <div v-for="(user, index) in model.users" :key="index">
      <v-text-field
        v-model="user.email"
        variant="outlined"
        density="comfortable"
        type="email"
        single-line
        placeholder="example@email.com"
        :rules="[required, emailRule]"
        class="mt-2"
      >
        <!-- Appended dropdown inside text field -->
        <template #append-inner>
          <v-menu
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
                class="text-lowercase text-wrap"
                style="max-width: 140px"
              >
                <span style="max-width: 130px" class="px-2">
                  {{
                    rolesList.find((x) => x.id === user.roleId)?.title.slice(0,20) ||
                    "Select Role"
                  }}</span
                >
                <v-icon size="16">mdi-menu-down</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="role in rolesList"
                :key="role"
                @click="selectRole(user, role.id)"
              >
                <v-list-item-title style="max-width: 350px">{{
                  role.title
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-text-field>
    </div>
    <v-btn @click="updateModel" variant="flat" color="primary"
      >+ Add More</v-btn
    >
  </v-form>
</template>

<script setup>
import { ref, defineExpose } from "vue";

const valid = ref(false);
const form = ref(null);
const showform = ref(false);

const model = defineModel({ users: [{ roleId: 1, email: "" }] });
const updateModel = () => {
  model.value.users.push({ roleId: 1, email: "" });
};
const required = (v) => !!v || "Required.";
const emailRule = (v) =>
  !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Invalid email.";

const mainStore = useMainStore();
const rolesList = ref([]);

onMounted(() => {
  mainStore
    .getRoles()
    .then((res) => {
      if (res.code === 0 && res.data) {
        showform.value = true;
        rolesList.value = res.data.filter(
          (x) =>
            x.title !== "Principal Dentist / Practice Owner" ||
            x.title !== "Practice Manager"
        );
      }
    })
    .catch((err) => {
      return err;
    });
});

function selectRole(user, roleId) {
  model.value.users.find((x) => x.email === user.email).roleId = roleId;
}
defineExpose({
  validate: async () => {
    const validation = await form.value.validate()
    return validation.valid
  },
  valid,
});
</script>
<style scoped>
.lbl {
  font-family: "Poppins";
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: "#1E1E1E";
}
</style>
