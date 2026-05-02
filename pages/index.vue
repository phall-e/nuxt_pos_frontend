<template>
  <div>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-[#374350]">{{ $t('menu.dashboard') }}</h1>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item>{{ $t('menu.dashboard') }}</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $t('menu.dashboard') }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div></div>
    </div>

    <!-- System summary -->
    <div class="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="f7:money-dollar-circle"
          :size="30"
          class="text-green-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('លក់បានសរុប') }}</div>
        <div class="text-green-300 font-bold text-[20px]">
          {{ formatCurrencyUSD(summaryCounts.totalSaleAmount) }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="f7:money-dollar-circle"
          :size="30"
          class="text-red-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('ចំណាយសរុប') }}</div>
        <div class="text-red-300 font-bold text-[20px]">
          {{ formatCurrencyUSD(summaryCounts.totalExpense) }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="f7:money-dollar-circle"
          :size="30"
          class="text-pink-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('មិនទាន់ទូទាត់ឱ្យអ្នកផ្គត់ផ្គង់') }}</div>
        <div class="text-pink-300 font-bold text-[20px]">
          {{ formatCurrencyUSD(summaryCounts.totalAmountPayToSupplier) }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="f7:money-dollar-circle"
          :size="30"
          class="text-purple-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('អតិថិជនជំពាក់') }}</div>
        <div class="text-purple-300 font-bold text-[20px]">
          {{ formatCurrencyUSD(summaryCounts.totalPendingPaymentCustomer) }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="map:store"
          :size="30"
          class="text-orange-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('menu.branch') }}</div>
        <div class="text-orange-300 font-bold text-[20px]">
          {{ summaryCounts.totalBranch }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="mage:scan-user-fill"
          :size="30"
          class="text-blue-300"
        />
        <div class="text-[#606266] font-bold">{{ $t('menu.user') }}</div>
        <div class="text-blue-300 font-bold text-[20px]">
          {{ summaryCounts.totalUser }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="solar:user-id-outline"
          :size="30"
          class="text-pink-600"
        />
        <div class="text-[#606266] font-bold">{{ $t('menu.supplier') }}</div>
        <div class="text-pink-600 font-bold text-[2opx]">
          {{ summaryCounts.totalSupplier }}
        </div>
      </div>

      <div class="bg-white flex items-center justify-center flex-col gap-2 rounded-md py-4">
        <Icon
          name="stash:people-group-duotone"
          :size="30"
          class="text-green-600"
        />
        <div class="text-[#606266] font-bold">{{ $t('menu.customer') }}</div>
        <div class="text-green-600 font-bold text-[20px]">
          {{ summaryCounts.totalCustomer }}
        </div>
      </div>
    </div>

    <!-- Chart -->
    <div class="!w-full flex items-center justify-between gap-5 mt-5">
      <div class="w-[70%]">
        <div class="w-full">
          <el-form
            ref="formRef"
            :model="saleSummaryByMonthFormData"
            label-position="top"
          >
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item
                  :label="$t('columns.year')"
                  prop="saleSummaryYear"
                  :rules="[
                    { required: true, }
                  ]"
                >
                  <el-date-picker
                    v-model="saleSummaryByMonthFormData.saleSummaryYear"
                    type="year"
                    @change="saleSummaryByYear"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <ChartsBaseChart 
          v-if="!saleSummaryByYearLoading"
          :config="chartSaleByMonthConfig" 
          class="w-full"
        />
      </div>
      <div class="w-[30%]">
        <ChartsBaseChart 
          :config="chartSummaryByBranchConfig" 
          class="w-full"
        />
      </div>
    </div>

    <!-- Low Stock -->
    <h1 class="mt-5 mb-3">ទំនិញដែលជិតអស់ស្តុក</h1>
    <el-table
      :data="lowStockItems"
      stripe
      class="w-full"
    >
      <el-table-column
        label="ល.រ"
        type="index"
        width="50"
      />
      <el-table-column
        :label="$t('menu.branch')"
        prop="branch"
      />
      <el-table-column
        :label="$t('menu.category')"
        prop="category"
      />
      <el-table-column
        :label="$t('menu.product')"
        prop="title"
      />
      <el-table-column
        :label="$t('menu.uom')"
        prop="uom"
      />
      <el-table-column
        :label="$t('columns.min_stock')"
        prop="minStock"
      />
      <el-table-column
        :label="$t('columns.stock_onhand')"
        prop="stockOnhand"
      />
    </el-table>


    <!--Top Selling Product -->
    <h1 class="mt-5 mb-3">ទំនិញដែលលក់ដាច់ខ្លាំង</h1>
    <el-table
      :data="lowStockItems"
      stripe
      class="w-full"
    >
      <el-table-column
        label="ល.រ"
        type="index"
        width="50"
      />
      <el-table-column
        :label="$t('menu.branch')"
        prop="branch"
      />
      <el-table-column
        :label="$t('menu.category')"
        prop="category"
      />
      <el-table-column
        :label="$t('menu.product')"
        prop="title"
      />
      <el-table-column
        :label="$t('menu.uom')"
        prop="uom"
      />
      <el-table-column
        :label="$t('columns.min_stock')"
        prop="minStock"
      />
      <el-table-column
        :label="$t('columns.stock_onhand')"
        prop="stockOnhand"
      />
    </el-table>


  </div>
</template>

<script lang="ts" setup>
  import { ArrowRight } from '@element-plus/icons-vue';
  import { type ChartConfiguration } from 'chart.js';
  import type { FormInstance } from 'element-plus';

  const formRef = ref<FormInstance>();

  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');

  const summaryCounts = ref({
    totalSaleAmount: 0,
    totalExpense: 0,
    totalAmountPayToSupplier: 0,
    totalPendingPaymentCustomer: 0,
    totalBranch: 0,
    totalUser: 0,
    totalSupplier: 0,
    totalCustomer: 0,
  });

  const summaryCountLoading = ref<boolean>(true);
  const getSummaryCount = async () => {
    summaryCountLoading.value = true;
    try {
      const response: any = await useApi('admin/dashboard/summary-counts');
      if (response) {
        console.log(response);
        const data = response.payload;
        summaryCounts.value.totalSaleAmount = data.saleGrandTotalAmount;
        summaryCounts.value.totalExpense = data.totalExpense;
        summaryCounts.value.totalSupplier = data.totalAmountPayToSupplier;
        summaryCounts.value.totalBranch = data.totalBranch;
        summaryCounts.value.totalUser = data.totalUser;
        summaryCounts.value.totalSupplier = data.totalSupplier;
        summaryCounts.value.totalCustomer = data.totalCustomer;
      }
    } catch (error: any) {  
      console.log(error);
    } finally {
      summaryCountLoading.value = false;
    }
  }

  // Saling summary by month
  const saleSummaryByMonthFormData = ref({
    branchId: null,
    dateRange: null,
    saleSummaryYear: Date.now(),
  });

// const now = new Date();

// saleSummaryByMonthFormData.value = {
//   branchId: null,
//   dateRange: null,
//   saleSummaryYear: now.getFullYear(), // current year
// };

  const saleSummaryByYearLoading = ref<boolean>(true);
  const saleSummaryByYearData = ref<any>([]);
  const saleSummaryByYear = async() => {
    try {
      saleSummaryByYearLoading.value = true;
      const response: any = await useApi(`admin/saling/sale/summary-by-year?year=${saleSummaryByMonthFormData.value.saleSummaryYear}`);
      console.log('Data', response);
      saleSummaryByYearData.value = response.payload.data;
    } catch (error) {
      console.log(error);
    } finally {
      saleSummaryByYearLoading.value = false;
    }
  }

  const chartSaleByMonthConfig = computed<ChartConfiguration>(() => ({
  type: 'bar',
  data: {
    labels: [
      'មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា',
      'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'
    ],
    datasets: [
      {
        label: 'ការលក់',
        data: saleSummaryByYearData.value, // ✅ reactive now
        backgroundColor: [
          '#ffdee7','#fcead8','#fff4dc','#daf2f2',
          '#d7eaf9','#ecdefe','#ffdee7','#daf2f2',
          '#fcead8','#fff4dc','#d7eaf9','#ecdefe',
        ],
        borderColor: [
          '#ff6b8a','#ffc480','#ffd562','#90d9da',
          '#60b6f2','#c1a0f7','#ff6b8a','#90d9da',
          '#ffc480','#ffd562','#60b6f2','#c1a0f7',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Nokora',
              size: 14,
              weight: 'bold',
            },
          },
        },
        tooltip: {
          bodyFont: {
            family: 'Nokora',
          },
          titleFont: {
            family: 'Nokora',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              family: 'Nokora',
              size: 12,
            },
          },
        },
        y: {
          ticks: {
            font: {
              family: 'Nokora',
              size: 12,
            },
          },
        },
      },
    },
}));

  // const chartSaleByMonthConfig: ChartConfiguration = {
  //   type: 'bar',
  //   data: {
  //     labels: ['មករា', 'កុម្ភៈ', 'មីនា', 'មេសា', 'ឧសភា', 'មិថុនា', 'កក្កដា', 'សីហា', 'កញ្ញា', 'តុលា', 'វិច្ឆិកា', 'ធ្នូ'],
  //     datasets: [
  //       {
  //         label: 'ការលក់',
  //         data: saleSummaryByYearData.value,
  //         // 👇 color per bar
  //         backgroundColor: [
  //           '#ffdee7', // Jan - blue
  //           '#fcead8', // Feb - green
  //           '#fff4dc', // Mar - orange
  //           '#daf2f2', // Apr - red
  //           '#d7eaf9',
  //           '#ecdefe',
  //           '#ffdee7',
  //           '#daf2f2',
  //         ],

  //         borderColor: [
  //           '#ff6b8a',
  //           '#ffc480',
  //           '#ffd562',
  //           '#90d9da',
  //           '#60b6f2',
  //           '#c1a0f7',
  //           '#ff6b8a',
  //           '#90d9da',
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     plugins: {
  //       legend: {
  //         labels: {
  //           font: {
  //             family: 'Nokora',
  //             size: 14,
  //             weight: 'bold',
  //           },
  //         },
  //       },
  //       tooltip: {
  //         bodyFont: {
  //           family: 'Nokora',
  //         },
  //         titleFont: {
  //           family: 'Nokora',
  //         },
  //       },
  //     },
  //     scales: {
  //       x: {
  //         ticks: {
  //           font: {
  //             family: 'Nokora',
  //             size: 12,
  //           },
  //         },
  //       },
  //       y: {
  //         ticks: {
  //           font: {
  //             family: 'Nokora',
  //             size: 12,
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  // Summary by branch
  const chartSummaryByBranchConfig: ChartConfiguration = {
    type: 'doughnut',
    data: {
      labels: ['ខ្មែរម៉ាត់ ២៤', 'ស៊ុបពែរមាត់', 'ហាងលក់សម្ភារទូទៅ'],
      datasets: [
        {
          label: 'ចំនួនទឹកប្រាក់',
          data: [1200, 1900, 800],
          // 👇 color per bar
          backgroundColor: [
            '#ff6384', 
            '#ff9f40', 
            '#4bc0c0', 
          ],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            font: {
              family: 'Nokora',
              size: 14,
              weight: 'bold',
            },
          },
        },
        tooltip: {
          bodyFont: {
            family: 'Nokora',
          },
          titleFont: {
            family: 'Nokora',
          },
        },
      },
    },
  };

  // Low stock
  const lowStockItems = ref<any>([
    {
      id: 1,
      branch: 'Khmer Mart 24',
      category: 'Electronic',
      title: 'Asus 2025',
      uom: 'PC',
      minStock: 5,
      stockOnhand: 2,
    },
    {
      id: 2,
      branch: 'Khmer Mart 24',
      category: 'Electronic',
      title: 'Asus 2025',
      uom: 'PC',
      minStock: 10,
      stockOnhand: 20,
    },
  ]);

  onMounted(() => {
    getSummaryCount();
    saleSummaryByYear();
  })

</script>

<style>

</style>