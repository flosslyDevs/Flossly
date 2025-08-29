<template>
  <div class="mt-5">
    <v-row>
      <v-col cols="4" v-for="(card, index) in holidayCards" :key="index">
        <team-floss-user-details-leave-management-holiday-card
          :iconImg="card.iconImg"
          :title="card.title"
          :days="card.days"
          :counts="card.counts"
          :color="card.color"
        />
      </v-col>
    </v-row>
    <div
      style="border: 1px solid #dbdbdb; border-radius: 6px; overflow: auto"
      class="my-5"
    >
      <!-- Header -->
      <div
        style="border-bottom: 1px solid #dbdbdb"
        class="d-flex align-center justify-space-between px-4 py-2"
      >
        <h3
          style="
            font-family: Poppins;
            font-weight: 600;
            font-size: 14px;
            color: #1e1e1e;
            margin: 0;
          "
        >
          Leaves
        </h3>

        <!-- Actions: Add + Search -->
        <div class="d-flex align-center">
          <v-btn color="primary" class="mr-3" @click="openDrawer = true">
            Add Leave
          </v-btn>

          <v-text-field
            v-model="search"
            density="compact"
            placeholder="Search leaves"
            hide-details
            variant="solo"
            class="input-bordered"
            flat
            append-inner-icon="mdi-magnify"
            style="width: 260px"
          />
        </div>
      </div>

      <!-- Table -->
      <v-table class="leave-table" density="comfortable">
        <thead>
          <tr>
            <th>Date From</th>
            <th>Date To</th>
            <th>Hours</th>
            <th>Pay</th>
            <th>Type</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(leave, index) in filteredLeaves" :key="index">
            <td>
              <div class="px-4">
                {{ leave.dateFrom }}
              </div>
            </td>

            <td>
              <div class="px-4">
                {{ leave.dateTo }}
              </div>
            </td>
            <td>
              <div class="px-4">
                {{ leave.hours }}
              </div>
            </td>

            <td>
              <div>
                <div class="px-4">{{ leave.pay }}</div>
              </div>
            </td>
            <td>
              <div class="px-4">
                {{ leave.type }}
              </div>
            </td>
            <td>
              <div class="px-4">
                <v-chip :class="statusChipClass(leave.status)" label>
                  {{ leave.status }}
                </v-chip>
              </div>
            </td>
            <td>
              <div class="px-4">
                {{ leave.comment }}
              </div>
            </td>
          </tr>

          <tr v-if="filteredLeaves.length === 0">
            <td colspan="7" class="text-center" style="padding: 20px">
              No leaves found
            </td>
          </tr>
        </tbody>
      </v-table>

    </div>
    <TeamFlossUserDetailsLeaveManagementHolidayRequestDrawer
      v-model="openDrawer"
      @close="openDrawer = false"
      @success="handleSuccess"
    />
  </div>
</template>
<script setup>
import Annual from "@/assets/icons/teamfloss/total.svg";
import Sick from "@/assets/icons/teamfloss/birthday.svg";
import Training from "@/assets/icons/teamfloss/pending.svg";

const openDrawer = ref(false)




const holidayCards = [
  {
    iconImg: Annual,
    title: "Annual Holiday",
    days: 25,
    color: "#E8FAE8",
    counts: { entitlement: 25, taken: 10, remaining: 15 },
  },
  {
    iconImg: Sick,
    title: "Sick Leave",
    days: 12,
    color: "#FDE8E8",
    counts: { entitlement: 12, taken: 4, remaining: 8 },
  },
  {
    iconImg: Training,
    title: "Others",
    days: 8,
    color: "#FFF3E8",
    counts: { entitlement: 8, taken: 2, remaining: 6 },
  },
];
const search = ref("");


// mock leaves
const leaves = ref([
  {
    dateFrom: "2025-08-01",
    dateTo: "2025-08-05",
    hours: 40,
    pay: "Paid",
    type: "Annual Leave",
    status: "Accepted",
    comment: "Family trip",
  },
  {
    dateFrom: "2025-08-10",
    dateTo: "2025-08-12",
    hours: 16,
    pay: "Unpaid",
    type: "Sick Leave",
    status: "Pending",
    comment: "Medical leave",
  },
]);



const filteredLeaves = computed(() => {
  const q = search.value.trim().toLowerCase();
  if (!q) return leaves.value;
  return leaves.value.filter((l) => {
    return (
      (l.type || "").toLowerCase().includes(q) ||
      (l.status || "").toLowerCase().includes(q) ||
      (l.comment || "").toLowerCase().includes(q) ||
      (l.dateFrom || "").toLowerCase().includes(q) ||
      (l.dateTo || "").toLowerCase().includes(q) ||
      (l.pay || "").toLowerCase().includes(q)
    );
  });
});

// status chip styling
const statusChipClass = (status) => {
  if (!status) return "";
  if (status.toLowerCase() === "accepted") return "status-chip-accepted";
  if (status.toLowerCase() === "pending") return "status-chip-pending";
  if (status.toLowerCase() === "rejected") return "status-chip-rejected";
  return "";
};
const handleSuccess = (data) => { 
  console.log("Holiday Request Saved:", data)
  openDrawer.value = false
  // You could also trigger a list refresh here
}
</script>

<style scoped>
.leave-table th {
  background-color: #f6f6f6;
  font-weight: 500;
}

.status-chip-accepted {
  background-color: #33b93c1a !important;
  color: #33b93c !important;
}
.status-chip-pending {
  background-color: #fdd8351a !important;
  color: #fbc02d !important;
}
.status-chip-rejected {
  background-color: #ff52521a !important;
  color: #ff5252 !important;
}

.input-bordered :deep(.v-field) {
  border: 1px solid #dfdfdf !important;
  border-radius: 8px !important;
  background-color: white !important;
}
:deep(.v-table__wrapper table) {
  width: 100% !important;
  table-layout: fixed;
}

:deep() .v-table .v-table__wrapper > table > thead > tr > th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}
:deep() .v-table .v-table__wrapper > table > tbody > tr > td:not(:last-child),
.v-table .v-table__wrapper > table > tbody > tr > th:not(:last-child) {
  border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}
:deep(.v-data-table .v-table__wrapper tbody tr:hover) {
  background-color: #f5f5f5;
  transition: background-color 0.2s ease;
}
</style>
