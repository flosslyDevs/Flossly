<template>
  <div class="mt-5">
    <v-row>
    
      <v-col cols="12" md="6">
        <TeamFlossUserDetailsProfileEmploymentDetailsLocationCard 
    :data="roleInfo" 
    @updateField="updateField"
  />
  <TeamFlossUserDetailsProfileEmploymentDetailsRoleInformationCard 
    :data="roleInfo" 
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

const roleInfo = ref({
  jobTitle: "hii",
  team: "",
  contractType: "",
  reportsTo: "",
  probationRequired: "",
});

const salaryInfo = ref({
  amountRate: "",
  paymentFrequency: "",
  hourlyRate: "",
  effectiveDate: "",
});

const updateField = ({ section, key, value }) => {
  console.log("Updated:", section, key, value);
  if (section === "role") roleInfo.value[key] = value;
  if (section === "salary") salaryInfo.value[key] = value;
};

</script>
