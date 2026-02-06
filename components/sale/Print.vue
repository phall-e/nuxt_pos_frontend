<template>
  <div class="w-full flex items-start justify-between">
    <div
      class="w-[25%] mt-2"
    >
      <el-image
        :src="logo"
        class="h-[45px]"
        fit="cover"
      />
    </div>
    <div>
      <h1 class="text-center font-bold text-[20px]">ហាងលក់សម្ភាទូរទៅ</h1>
      <h1 class="text-center font-bold text-[22px] underline">វិក្ក័យបត្រ</h1>
    </div>
    <div class="w-[25%]">
      
    </div>
  </div>
  <!-- <pre>{{ item }}</pre> -->
  <div class="flex items-start justify-between text-[12px]">
    <table class="w-[47%]">
      <tbody>
        <tr class="border-b">
          <td class="w-[70px]">សាខា</td>
          <td> : {{ item.branch.nameKh }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">លក់ជូន</td>
          <td> : {{ item.customer.nameKh }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">លេខទូរសព្ទ</td>
          <td> : {{ item.customer.phoneNumber }}</td>
        </tr>
      </tbody>
    </table>
    <table class="w-[47%]">
      <tbody>
        <tr class="border-b">
          <td class="w-[70px]">លេខ</td>
          <td> : {{ item.code }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">កាលបរិច្ឆេទ</td>
          <td> : {{ dateFormatter(item?.saleDate) }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">លក់ដោយ</td>
          <td> : {{ item?.soleBy?.username }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <table class="w-full text-[12px]">
      <tbody>
        <tr class="border-b">
          <td class="w-[70px]">បរិយាយ</td>
          <td> : {{item?.description}}</td>
        </tr>
      </tbody>
  </table>
  <table class="w-full text-[12px] mt-5 border border-collapse">
    <thead class="bg-blue-800">
      <tr class="text-white">
        <th nowrap class="border px-2 py-1 text-center">ល.រ</th>
        <th nowrap class="border px-2 py-1 text-left">ឈ្មោះទំនិញ</th>
        <th nowrap class="border px-2 py-1 text-center">ខ្នាត</th>
        <th nowrap class="border px-2 py-1 text-center">ចំនួន</th>
        <th nowrap class="border px-2 py-1 text-center">តម្លៃរាយ</th>
        <th nowrap class="border px-2 py-1 text-center">បញ្ចុះតម្លៃ</th>
        <th nowrap class="border px-2 py-1 text-center">តម្លៃសរុប</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(i, index ) in item.items" :key="i.id">
        <td class="border py-1 text-center">{{ Number(index) + 1 }}</td>
        <td class="border px-2 py-1 text-left">
          {{ i.product.nameKh }}
        </td>
        <td class="border py-1 text-center">{{ i.product.uom.nameKh }}</td>
        <td class="border py-1 text-center">{{ i.quantity }}</td>
        <td class="border py-1 text-center">{{ formatCurrencyUSD(i.unitPrice) }}</td>
        <td class="border py-1 text-center">{{ formatCurrencyUSD(i.discount) }}</td>
        <td class="border py-1 text-center">{{ formatCurrencyUSD(Number(i.quantity) * Number(i.unitPrice)) }}</td>
      </tr>
    </tbody>
  </table>
  <div class="w-full flex items-center justify-end pr-2">
    <table class="text-[12px] font-bold">
      <tbody>
        <tr>
          <td class="w-[60px]">តម្លៃសរុប</td>
          <td>: {{ formatCurrencyUSD(item.totalAmount) }}</td>
        </tr>
        <tr>
          <td class="w-[60px]">បានទូទាត់</td>
          <td>: {{ formatCurrencyUSD(item.totalPaidAmount) }}</td>
        </tr>
        <tr>
          <td class="w-[60px]">បញ្ចុះតម្លៃ</td>
          <td>: {{ formatCurrencyUSD(item.totalDiscount) }}</td>
        </tr>
        <tr>
          <td class="w-[50px]">នៅខ្វះ</td>
          <td>: {{ formatCurrencyUSD(Number(item.totalAmount)-(Number(item.totalPaidAmount) + Number(item.totalDiscount))) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-start justify-between mx-[50px] text-[10px] mt-2">
    <div class="text-center">
      <h5 class="mb-4">អ្នកទិញ</h5>
      <h5>ថ្ងៃ.....ខែ.......ឆ្នាំ......</h5>
    </div>
    <div class="text-center">
      <h5 class="mb-4">អ្នកទិញ</h5>
      <h5>ថ្ងៃ.....ខែ.......ឆ្នាំ......</h5>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/assets/logo/logo.png';
  defineProps({
    item: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  })
</script>

<style>

</style>