<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="12" md="6" v-for="card in cards" :key="card.id">
        <TeamFlossUserDetailsProfileEmploymentDetailsCollapsibleCard
          :card="card"
          @updateField="updateField"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsEmploymentCard
          :initialData="employmentData"
          @updateField="onEmploymentUpdate"
        />
      </v-col>
      <!-- Contract details card -->
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsContractDetailsCard
          :initial-data="contractDetails"
          @updateField="onContractDetailsUpdate"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsPayrollCard
          :initial-data="payrollInformation"
          @updateField="onPayRollUpdate"
        />
      </v-col>
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsSensitiveCard
          :initialData="sensitiveInfo"
          @updateField="onSensitiveInfoUpdate"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { user } = defineProps({
  user: Object
})
const userStore = useUserStore()

const userDetails = ref({})


onMounted(() => {
  console.log(user)
  userStore.getUserDetails({ id: user.id}).then((res) => {
    if(res.code === 0) {
      userDetails.value = res.data
    }
  })
})

const updateContractDetails = () => {
  userStore.updateContract({
    userId: user.id,
    contract: userDetails.contract
  }).then((res) => {
    if (res.code === 0) {
      // set snack
    }
  })
}

const updateBankDetails = () => {
  userStore.updateUserBank({
    userId: user.id,
    account: userDetails.account
  }).then((res) => {
    if (res.code === 0) {
      // set snack
    }
  })
}

const cards = ref([
  {
    id: 1,
    title: "Location",
    fields: [
      { id: "location_1", label: "Public holiday observe for", value: "" },
    ],
  },
  {
    id: 2,
    title: "Role Information",
    subtitle: "Job title, probation and notice period",
    fields: [
      { id: "role_1", label: "Job title", value: "hii" },
      { id: "role_2", label: "Team(s)", value: "" },
      { id: "role_3", label: "Contract type", value: "" },
      { id: "role_4", label: "Reports to", value: "" },
      { id: "role_5", label: "Probation required", value: "" },
    ],
  },
  {
    id: 3,
    title: "Salary Information",
    subtitle: "Salary amount, rate and payment frequency",
    fields: [
      { id: "salary_1", label: "Amount/rate", value: "" },
      { id: "salary_2", label: "Payment frequency", value: "" },
      { id: "salary_3", label: "Hourly rate", value: "" },
      { id: "salary_4", label: "Effective date", value: "" },
    ],
  },
  {
    id: 4,
    title: "Bank Details",
    subtitle: "Employee bank details",
    fields: [
      { id: "bank_1", label: "Name on account", value: "" },
      { id: "bank_2", label: "Name of bank", value: "" },
      { id: "bank_3", label: "Bank branch", value: "" },
      { id: "bank_4", label: "Account number", value: "" },
      { id: "bank_5", label: "Sort code", value: "" },
    ],
  },
  {
    id: 5,
    title: "Leave Details",
    subtitle: "Employee leave information",
    notification:
      "We have calculated your employees annual leave entitlement based on the information you have given us, you can change this by entering into the fields below.",
    fields: [
      { id: "leave_1", label: "Leave Entitlement", value: "" },
      { id: "leave_2", label: "Leave Allowance", value: "" },
    ],
  },
]);
const employmentData = ref({
  employeeType: "fixed",
  workingPattern: "",
  fullTimeWeek: { hours: 40, minutes: 0 },
});
const contractDetails = ref({
  entitlementUnit: "days", // or "hours"
  annualLeaveEntitlement: "20",
  leaveYearStart: "2025-01-01",
});
const payrollInformation = ref({
  payrollNumber: "12345",
  pensionEligible: "yes",
});
const sensitiveInfo = ref({
  // TAX
  taxCode: "1257L",

  // NI
  niNumber: "AB123456C",

  // Passport
  passportNumber: "987654321",
  passportCountry: "United Kingdom",
  passportExpiry: "2030-12-31",

  // Driving licence
  licenceNumber: "DVR123456",
  licenceCountry: "United Kingdom",
  licenceClass: "B",
  licenceExpiry: "2028-05-15",

  // Visa
  visaNumber: "VISA123456",
  visaExpiry: "2027-06-20",
  eVisaCheck: true,

  // DBS
  dbsInitialCheck: false,
  dbsCheck: true,
  dbsCertificateNumber: "123456789012",

  // Right to Work
  rightToWorkStatus: "Citizen",
});
const onEmploymentUpdate = ({ field, value }) => {
  console.log("Employment update:", field, value);
};
const onContractDetailsUpdate = (field, value) => {
  console.log("Contract update:", field, value);
};
const onPayRollUpdate = (field) => {
  console.log("Contract update:", field);
};
const onSensitiveInfoUpdate = ({ field, value }) => {
  sensitiveInfo.value[field] = value;
  console.log("Updated field:", field, "=>", value);
};
const updateField = ({ cardId, fieldId, value }) => {
  const card = cards.value.find((c) => c.id === cardId);
  if (!card) return;
  const field = card.fields.find((f) => f.id === fieldId);
  if (field) {
    field.value = value;
    console.log(`Updated card:${cardId}, field:${fieldId}, value: ${value}`);
  }
};
</script>
