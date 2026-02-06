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
      <h1 class="text-center font-bold text-[17px]">ហាងលក់សម្ភាទូរទៅ</h1>
      <h1 class="text-center font-bold text-[15px] underline">សំណើរសុំទិញទំនិញ</h1>
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
          <td> : {{ item?.branch?.nameKh }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">ស្នើសុំដោយ</td>
          <td> : {{ item?.createdBy?.username }}</td>
        </tr>
      </tbody>
    </table>
    <table class="w-[47%]">
      <tbody>
        <tr class="border-b">
          <td class="w-[70px]">លេខ</td>
          <td> : {{ item?.code }}</td>
        </tr>
        <tr class="border-b">
          <td class="w-[70px]">កាលបរិច្ឆេទ</td>
          <td> : {{ dateFormatter(item?.requestDate) }}</td>
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
        <th nowrap class="border px-2 py-1 text-center">ផ្សេងៗ</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(i, index ) in item.items" :key="i.id">
        <td class="border py-1 text-center">{{ Number(index) + 1 }}</td>
        <td class="border px-2 py-1 text-left">
          {{ i.product.nameEn }}
        </td>
        <td class="border py-1 text-center">{{ i.product.uom.nameKh }}</td>
        <td class="border py-1 text-center">{{ i.quantity }}</td>
        <td class="border py-1 text-center">{{ i.note }}</td>
        
      </tr>
    </tbody>
  </table>
  <div class="w-full flex items-center justify-end pr-2">
    <table class="text-[12px] font-bold">
      <tbody>
        <tr>
          <td class="w-[60px]">ចំនួនសរុប</td>
          <td>: {{ Number(item.totalQuantity).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex items-start justify-between mx-[10px] text-[10px] mt-2">
    <div>
      <h5 class="mb-4 text-center font-bold">អនុម័តដោយ</h5>
      <table>
        <tr>
          <td>ឈ្មោះ</td>
          <td>: {{ item.approvedBy.username }}</td>
        </tr>
        <tr>
          <td>កាលបរិច្ឆេទ</td>
          <td>: {{ dateFormatter(item.createdAt) }}</td>
        </tr>
      </table>
    </div>
    <div>
      <h5 class="mb-4 text-center font-bold">ស្នើរសុំដោយ</h5>
      <table>
        <tr>
          <td>ឈ្មោះ</td>
          <td>: {{ item.createdBy.username }}</td>
        </tr>
        <tr>
          <td>កាលបរិច្ឆេទ</td>
          <td>: {{ dateFormatter(item.requestDate) }}</td>
        </tr>
      </table>
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