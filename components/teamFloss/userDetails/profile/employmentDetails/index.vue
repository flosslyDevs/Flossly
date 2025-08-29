<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsLocationCard
          :data="userDetails"
          @updateField="updateField"
        />
        </v-col>
        <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsSalary
          :data="userDetails.contract || {}"
          @updateField="updateSalaryDetails"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsBankDetails
          :data="userDetails.account || {}"
          @updateField="updateBankDetails"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsLeaveEntitlement
          :data="userDetails.leaveEntitlement || {}"
          @updateField="updateLeaveDetails"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsEmploymentCard
          :data="userDetails"
          @updateField="onEmploymentUpdate"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsContractDetailsCard
          :data="userDetails.contract || {}"
          @updateField="onContractDetailsUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { user } = defineProps({
  user: Object,
});
const userStore = useUserStore();

const userDetails = ref({});

onMounted(() => {
  userStore.getUserDetails({ id: user.id }).then((res) => {
    if (res.code === 0) {
      userDetails.value = res.data;
    }
  });
});

const updateSalaryDetails = (data) => {
  userDetails.value.contract = data;
  updateContractDetails()
};

const updateBankDetails = (data) => {
  console.log(data);
  userDetails.value.account = data;
};

const updateLeaveDetails = (data) => {
  console.log(data);
  userDetails.value.leaveEntitlement = data;
}
const updateContractDetails = () => {
  userStore
    .updateContract({
      userId: user.id,
      details: userDetails.value.contract,
    })
    .then((res) => {
      if (res.code === 0) {
        // set snack
      }
    });
};

const updateUserBankDetails = () => {
  userStore
    .updateUserBank({
      userId: user.id,
      account: userDetails.account,
    })
    .then((res) => {
      if (res.code === 0) {
        // set snack
      }
    });
};

const onEmploymentUpdate = ({ field, value }) => {
  console.log("Employment update:", field, value);
};
const onContractDetailsUpdate = (data) => {
  console.log("Contract update:", data);
};
const updateField = (data) => {
  console.log("Updated:", data);
};
</script>
