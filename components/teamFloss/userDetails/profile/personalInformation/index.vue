<template>

    <MyProfileProfile
    :user="dummyUser"
    />
</template>

<script setup>
const dummyUser = {
  fullName: "Jane Doe",
  email: "jane.doe@example.com",
  phone: "+44 987 654 3210",
  address: "123 Dummy Street, London",
  gender: "Female",
  dob: "1990-01-01",
  nextOfKin: "John Doe",
  nextOfKinContact: "+44 111 222 3333",
  preferences: {
    licenseType: "Standard",
  },
  userOrganisations: [
    {
      organisationId: "1",
      organisation: { name: "Dummy Org" },
    },
  ],
  currentLoggedInOrgId: "1",
  role: { title: "Employee" },
}
</script>