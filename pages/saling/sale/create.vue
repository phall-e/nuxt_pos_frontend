<template>
  <div class="flex items-start justify-between gap-2">
    <div class="w-[70%]">
      <el-form
        ref="formRef"
        :model="formData"
        label-position="top"
      >
        <el-row
          :gutter="10"
        >
          <el-col :span="8">
            <el-form-item
              :label="$t('menu.branch')"
              prop="branchId"
              :rules="[{ required: true }]"
            >
              <el-select 
                v-model="formData.branchId"
                :placeholder="$t('columns.choose')"
                filterable
                clearable
              >
                <el-option 
                  v-for="item in branches" 
                  :key="item.id" 
                  :label="item.nameEn+'-'+item.nameKh" 
                  :value="item.id"
                  class="font-Nokora"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('menu.category')"
              prop="categoryId"
            >
              <el-select
                v-model="formData.categoryId"
                :placeholder="$t('menu.category')"
                clearable
                filterable
              >
                <el-option 
                  v-for="item in categories" 
                  :key="item.id" :label="item.nameEn + '-' + item.nameKh" :value="item.id"
                  class="font-Nokora"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$t('search')"
              prop="search"
            >
              <el-input 
                v-model="formData.search"
                :placeholder="$t('search')"
                @keydown.enter="handleGetProductItems()"
                clearable
              >
                <template #prefix>
                  <Icon name="iconamoon:search"/>
                </template>
              </el-input>
            </el-form-item> 
          </el-col>
        </el-row>
      </el-form>
      <!-- ----Product Item---- -->
      <div class="w-full grid grid-cols-3 gap-4">
        <el-card 
          v-for="item in productItems" 
          :key="item.id"
          class="cursor-pointer relative"
          @click="addItem(item)"
        >
          <el-image
            :src="item.product.attachment"
            fit="cover"
            style="height: 175px; width: 100%;"
          />
          <div class="flex items-center justify-between">
            <div class="text-gray-600 font-bold">{{ (Number(item.stockIn)+Number(item.stockTransfer)+Number(item.stockAdjustment)) - Number(item.stockOut) }}</div>
            <div class="text-red-600 font-bold">${{ Number(item.product.unitPrice).toFixed(2) }}</div>
          </div>
          <div class="line-clamp-1">{{ item.product.nameEn }}</div>
          <Icon v-if="item.isSelected" class="text-green-500 absolute top-1 right-1" :size="23" name="ei:check"/>
        </el-card>
      </div>
    </div>
    <el-form 
      ref="formRef"
      :model="formData"
      class="w-[30%]"
      label-position="top"
      @submit.prevent="submit"
    >
      <h1 class="text-[#606266] mb-[5px]">{{ $t('menu.customer') }}</h1>
      <div class="w-full flex items-center justify-between gap-3">
        <el-select 
          v-model="formData.customerId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
          class="!w-[75%]"
        >
          <el-option 
            v-for="item in customers" 
            :key="item.id" 
            :label="item.nameEn+'-'+item.nameKh" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
        <div class="flex items-center">
          <el-button circle>
            <Icon name="zondicons:add-outline"/>
          </el-button>
          <el-button type="success" plain circle>
            <Icon name="mage:scan"/>
          </el-button>
        </div>
      </div>
      <el-scrollbar
        class="!h-[calc(100vh-360px)] mt-3"
      >
        <template v-if="formData.items && formData.items.length > 0">
          <div 
            v-for="(item, index) in formData.items"
            :key="item.productId"
            class="bg-white flex items-center justify-between mb-2 rounded-md gap-1"
          >
            <el-image 
              :src="item.attachment"
              class="h-[70px] w-[75px] border rounded-md ml-2"
            />
            <div class="w-[calc(100%-75px)] flex item-center justify-between ">
              <div class="flex items-start justify-between flex-col">
                <h2 class="line-clamp-1 text-[13px] text-[#606266] mt-2">{{item.title}}</h2>
                <div class="flex items-center justify-between gap-2">
                  <el-form-item
                    :label="$t('columns.quantity')"
                    :prop="`items.${index}.quantity`"
                    :rules="[{ required: true }]"
                  >
                    <el-input
                      v-model="item.quantity"
                      type="number"
                      size="small"
                      placeholder="0"
                      class="!w-[70px]"
                    />
                  </el-form-item>
                  <el-form-item
                    :label="$t('columns.discount')"
                    :prop="`items.${index}.discount`"
                    :rules="[{ required: true }]"
                  >
                    <el-input
                      v-model="item.discount"
                      type="number"
                      size="small"
                      placeholder="0"
                      class="!w-[70px]"
                    />
                  </el-form-item>
                </div>
              </div>
              <div class="flex items-end flex-col justify-between pr-2">
                <h2 class="text-[13px] text-red-500 font-bold mt-2">${{ Number(item.unitPriceStr).toFixed(2) }}</h2>
                <h2 class="text-[13px] text-green-500 font-bold mt-2">
                  <del>${{ Number(item.totalPriceStr).toFixed(2) }}</del>
                </h2>
                <h2 class="text-[13px] text-red-500 font-bold mt-2">${{ Number(item.totalNetAmountStr).toFixed(2) }}</h2>
                <Icon 
                  name="material-symbols:delete-outline-rounded"
                  :size="20"
                  class="cursor-pointer text-red-600 mb-2"
                  @click="removeItem(item, index)"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="text-[#606266] mt-[100px] flex items-center justify-center">{{ $t('no_data') }}</div>
        </template>
      </el-scrollbar>
      <div class="w-full text-[#606266] mt-2">
        <div class="flex items-center justify-between">
          <div>{{ $t('columns.subtotal') }}:</div>
          <div class="font-bold">${{Number(formData.totalAmountStr).toFixed(2)}}</div>
        </div>
        <div class="flex items-center justify-between">
          <div>{{ $t('columns.discount') }}:</div>
          <div class="font-bold">${{Number(formData.totalDiscount).toFixed(2)}}</div>
        </div>
        <div class="flex items-center justify-between">
          <div>{{ $t('columns.grand_total') }}:</div>
          <div class="font-bold">${{Number(formData.totalNetAmountStr).toFixed(2)}}</div>
        </div>
        <div class="flex items-center justify-between mt-1">
          <div>
            <el-checkbox v-model="formData.isCashed" border>
              <Icon :size="18" name="grommet-icons:currency"/>
            </el-checkbox>
          </div>
          <div class="font-bold">
            <el-checkbox v-model="formData.isPayNow" :label="$t('columns.pay_now')" border />
          </div>
        </div>
        <el-button class="w-full mt-2" type="success" native-type="submit">{{ $t('columns.pay_now') }}</el-button>
      </div>
    </el-form>
   
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus';
import { ModuleStatus } from '~/types/Status';

  definePageMeta({
    permissions: ['create-sale']
  })

  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');
  const categories = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/category/select-options');
  const customers = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/customer/select-options');
  
  const auth = useAuthenticationStore();

  const formRef = ref<FormInstance>();
  const formData = ref<any>({
    search: '',
    code: "",
    saleDate: new Date(),
    branchId: 1,
    categoryId: null,
    customerId: 1,
    soleById: auth.users.id,
    totalQuantity: 0,
    totalDiscount: 0,
    totalAmount: 0,
    totalNetAmount: 0,
    totalPaidAmount: 0,
    // String
    totalDiscountStr: 0,
    totalAmountStr: 0,
    totalNetAmountStr: 0,
    totalPaidAmountStr: 0,

    attachments: [],
    description: "",
    status: ModuleStatus.PENDING,
    isCashed: true,
    isPayNow: true,
    items: [],
  });

  const addItem = (item: any) => {
    if (!item.isSelected) {
      formData.value.items.push({
        productId: item.productId,
        title: item.product.nameEn,
        attachment: item.product.attachment,
        quantity: 1,
        unitPrice: item.product.unitPrice,
        unitPriceStr: item.product.unitPrice,
        discount: 0,
        totalPrice: item.product.unitPrice,
        totalPriceStr: item.product.unitPrice,
        totalNetAmountStr: 0,
        note: '',
      });
      productItems.value = productItems.value.map((i: any) => 
        i.id === item.id ? {...i, isSelected: true } : i
      );
    } 
    return 0;
  }

  const removeItem = (item: any, index: number | string) => {
    productItems.value = productItems.value.map((i: any) => 
      i.id === item.productId ? {...i, isSelected: false } : i
    );
    formData.value.items.splice(index, 1);
  }

  const productItems = ref<any>([]);
  const productLoading = ref<boolean>(true);
  const handleGetProductItems = async() => {
    try {
      productLoading.value = true;
      const response: any = await useApi(`admin/stocking/stock?search=${formData.value.search}&filter.branchId=${formData.value.branchId}&limit=${5000}`);
      if (response) {
        console.log(response);
        productItems.value = response.payload.data.map((item: any) =>({
          ...item,
          isSelected: false,
        }));
      }
    } catch (error) {
      useMessage('Something went wrong', 'error');
    } finally {
      productLoading.value = false;
    }
  }

  watch(()=> [formData.value.branchId, formData.value.categoryId], ()=>{
    handleGetProductItems();
  });

  // Pricing calculating

  const calculateTotal = () => {
    formData.value.items.forEach((item: any) => {
      const quantity = Number(item.quantity) || 0;
      const unitPrice = Number(item.unitPrice) || 0;
      const discount = Number(item.discount) || 0;

      item.totalPrice = (quantity * unitPrice);
      item.totalPriceStr = item.totalPrice;
      item.totalNetAmountStr = item.totalPrice - discount;
    });

    // Total Quantity
    formData.value.totalQuantity = formData.value.items.reduce(
      (total: any, item: any) => total + (item.quantity || 0),
      0
    );

    // Total Amount 
    formData.value.totalAmount = formData.value.items.reduce(
      (total: any, item: any) => total + (item.totalPrice || 0),
      0
    );
    formData.value.totalAmountStr = formData.value.totalAmount;
    // Total Discount
    formData.value.totalDiscount = formData.value.items.reduce(
      (total: number, item: any) => total + Number(item.discount || 0),
      0
    );
    formData.value.totalDiscountStr = formData.value.totalDiscount;
    formData.value.totalNetAmount = Number(formData.value.totalAmount) - Number(formData.value.totalDiscount);
    formData.value.totalNetAmountStr = formData.value.totalNetAmount;
  }

  watch(
    () =>
      formData.value.items?.map((item: any) => [
        item.quantity,
        item.unitPrice,
        item.discount,
      ]),
    () => {
      if (!formData.value.items?.length) {
        formData.value.totalAmount = 0;
        formData.value.totalQuantity = 0;
        formData.value.totalDiscount = 0;
        formData.value.totalNetAmount = 0;
        formData.value.totalPaidAmount = 0;
        formData.value.totalDiscountStr = 0;
        formData.value.totalAmountStr = 0;
        formData.value.totalNetAmountStr = 0;
        formData.value.totalPaidAmountStr = 0;
        return;
      }

      calculateTotal();
    },
    { deep: true }
  );



  onMounted(() => {
    handleGetProductItems();
  });

  const loadingInsert = ref<boolean>(false);
  const submit = () => {
    formRef.value?.validate( async(valid) => {
      if (valid) {
        try {
          loadingInsert.value = true;
          const response = await useApi('admin/saling/sale', {
            method: 'post',
            body: formData.value,
          });
          if (response) {
            useNotification($t('data_inserted'));
            handleGetProductItems();
            formData.value = {
              search: '',
              code: "",
              saleDate: new Date(),
              branchId: 1,
              categoryId: null,
              customerId: 1,
              soleById: auth.users.id,
              totalQuantity: 0,
              totalDiscount: 0,
              totalAmount: 0,
              totalNetAmount: 0,
              totalPaidAmount: 0,
              // String
              totalDiscountStr: 0,
              totalAmountStr: 0,
              totalNetAmountStr: 0,
              totalPaidAmountStr: 0,
              attachments: [],
              description: "",
              status: ModuleStatus.PENDING,
              isCashed: true,
              isPayNow: true,
              items: [],
            }
          }
        } catch (error: any) {
          const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

          useNotification(message, 'error')
        } finally {
          loadingInsert.value = false;
        }
      }

      return;
    })
  }
</script>

<style>

</style>