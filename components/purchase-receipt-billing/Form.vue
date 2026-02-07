<template>
  <el-row :gutter="20">
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.code')"
        prop="code"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.code"
          :placeholder="$t('columns.code')"
          readonly
          clearable
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.billing_date')"
        prop="billingDate"
        :rules="[{ required: true }]"
      >
        <el-date-picker 
          v-model="formRef.billingDate"
          type="date"
          :placeholder="$t('columns.billing_date')"
          clearable
          class="!w-full"
        />
      </el-form-item>
    </el-col>
    <el-col 
      :md="8"
      v-if="dialogState.dialogState === CrudDialogState.CREATE"
    >
      <el-form-item
        :label="$t('columns.status')"
        prop="status"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.status"
          :placeholder="$t('columns.choose')"
          disabled
        >
          <el-option v-for="item in statuses" :key="item" :label="item" :value="item"/>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('menu.branch')"
        prop="branchId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.branchId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
          :disabled="dialogState.dialogState === CrudDialogState.CREATE ? false : true"
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
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.invoice')"
        prop="purchaseReceiptId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.purchaseReceiptId"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
          :disabled="dialogState.dialogState === CrudDialogState.CREATE ? false : true"
        >
          <el-option 
            v-for="item in purchaseReceiptOptions" 
            :key="item.id" 
            :label="item.code" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col 
      :md="8"
      v-if="dialogState.dialogState === CrudDialogState.CREATE"
    >
      <el-form-item
        :label="$t('columns.total_quantity')"
        prop="totalQuantity"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.totalQuantity"
          type="number"
          placeholder="0"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.receipt_by')"
        prop="receiptById"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.receiptById"
          :placeholder="$t('columns.choose')"
          disabled
        >
          <el-option 
            v-for="item in users" 
            :key="item.id" 
            :label="item.username" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('menu.supplier')"
        prop="supplierId"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.supplierId"
          :placeholder="$t('columns.choose')"
          disabled
        >
          <el-option 
            v-for="item in suppliers" 
            :key="item.id" 
            :label="item.nameEn +'-' + item.nameKh" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.total_amount')"
        prop="totalAmount"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.totalAmount"
          type="number"
          placeholder="0"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col :md="dialogState.dialogState === CrudDialogState.CREATE ? 8 : 16">
      <el-form-item
        :label="$t('columns.description')"
        prop="description"
      >
        <el-input 
          v-model="formRef.description"
          :placeholder="$t('columns.description')"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.total_discount')"
        prop="totalDiscount"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.totalDiscount"
          type="number"
          placeholder="0"
          readonly
        />
      </el-form-item>
    </el-col>
    <el-col 
      :md="8"
      v-if="dialogState.dialogState === CrudDialogState.CREATE"
    >
      <el-row :gutter="20">
        <el-col :md="12">
          <el-form-item
            :label="$t('columns.total_net_amount')"
            prop="totalNetAmount"
            :rules="[{ required: true }]"
          >
            <el-input 
              v-model="formRef.totalNetAmount"
              type="number"
              placeholder="0"
              readonly
            />
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item
            :label="$t('columns.total_paid_amount')"
            prop="totalPaidAmount"
            :rules="[{ required: true }]"
          >
            <el-input 
              v-model="formRef.totalPaidAmount"
              type="number"
              placeholder="0"
              readonly
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-divider/>
  <h1><b>ទូរទាត់ប្រាក់</b></h1>
  <el-row 
    :gutter="20"
  >
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.billing_by')"
        prop="billingById"
        :rules="[{ required: true }]"
      >
        <el-select 
          v-model="formRef.billingById"
          :placeholder="$t('columns.choose')"
          filterable
          clearable
        >
          <el-option 
            v-for="item in users" 
            :key="item.id" 
            :label="item.username" 
            :value="item.id"
            class="font-Nokora"
          />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.note')"
        prop="note"
        :rules="[{ required: true }]"
      >
        <el-input 
          v-model="formRef.note"
          :placeholder="$t('note')"
        />
      </el-form-item>
    </el-col>
    <el-col :md="8">
      <el-form-item
        :label="$t('columns.amount')"
        prop="amount"
        :rules="[
          { required: true }, 
          { type: 'number', max: ((Number(formRef.totalAmount)-Number(formRef.totalDiscount)) - Number(formRef.totalPaidAmount)), message: `Max amount is ${((Number(formRef.totalAmount)-Number(formRef.totalDiscount)) - Number(formRef.totalPaidAmount))}`, trigger: 'blur' }
        ]"
      >
        <el-input 
          v-model.number="formRef.amount"
          type="number"
          placeholder="0"
        />
      </el-form-item>
    </el-col>
  </el-row>
  <el-tabs
    v-model="tabActive"
    class="mt-5"
    type="border-card"
  >
    <el-tab-pane 
      name="items"
      v-if="dialogState.dialogState === CrudDialogState.CREATE"
    >
      <template #label>
        <div class="flex items-center gap-1">
          <Icon :size="20" name="lsicon:list-outline"/> <div>{{ $t('columns.payment_history') }}</div>
        </div>
      </template>
      <el-table
        :data="formRef.purchaseReceiptBillings"
        stripe
      >
        <template #empty>{{ $t('no_data') }}</template>
        <el-table-column
          :width="60"
          align="center"
        >
          <template #header>
            <div class="flex items-center justify-center">
              <Icon 
                name="bitcoin-icons:verify-outline"
                class="text-[25px] text-green-500"
              />
            </div>
          </template>
          <template #default>
            <div class="flex items-center justify-center">
              <Icon 
                name="bitcoin-icons:verify-outline"
                class="text-[25px] text-green-500"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('columns.invoice')"
          prop="code"
        />
        <el-table-column
          :label="$t('columns.billing_date')"
        >
          <template #default="scope">
            {{ dateFormatter(scope.row.billingDate) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('columns.billing_by')"
          prop="billingName"
        />
        <el-table-column
          :label="$t('columns.amount')"
        >
          <template #default="scope">
            {{ formatCurrencyUSD(scope.row.amount) }}
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('columns.note')"
        >
          <template #default="scope">
            <div class="line-clamp-1">{{ scope.row.note }}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane name="attachments">
      <template #label>
        <div class="flex items-center gap-1">
          <Icon :size="20" name="hugeicons:attachment-square"/> <div>{{ $t('columns.attachments') }}</div>
        </div>
      </template>
      <DropZone v-model="formRef.attachments"/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import DropZone from '~/@core/components/DropZone.vue';
import { CrudDialogState } from '~/types/crud-dialog-state.type';
import statuses from '~/types/Status';

  const { formRef } = defineProps({
    formRef: {
      type: Object,
      default: () => ({ }),
    }
  });

  const branches = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/branch/select-options');
  const users = useMasterData<{id: number; username: string}>('admin/system/users/select-options');
  const suppliers = useMasterData<{id: number; nameEn: string; nameKh: string}>('admin/master-data/supplier/select-options');

  const purchaseReceiptOptions = ref<any>([]);

    watch(
      () => formRef.branchId,
      async (branchId) => {
        if (
          !branchId
        ) {
          purchaseReceiptOptions.value = [];
          Object.assign(formRef, {
            purchaseReceiptBillings: [],
            purchaseReceiptId: null,
            billingBy: null,
            supplierId: null,
            description: '',
            status: null,
            totalQuantity: 0,
            totalAmount: 0,
            totalDiscount: 0,
            totalNetAmount: 0,
            totalPaidAmount: 0,
          })
          return
        }
        
        if (dialogState.dialogState === CrudDialogState.CREATE) {
          formRef.purchaseReceiptId = null;
        }
        const response: any = await useApi(
          `admin/purchasing/purchase-receipt/select-options/${branchId}/${dialogState.dialogState === CrudDialogState.CREATE ? 'true' : 'false'}`
        );
        purchaseReceiptOptions.value = response.payload;
      },
      { immediate: true }
  );
  
  const purchaseReceiptLoading = ref<boolean>(false);
  watch(() => [formRef.purchaseReceiptId], async()=>{
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      if (formRef.purchaseReceiptId) {
        Object.assign(formRef, {
          salePaymentReceipts: [],
        })
        try {
          purchaseReceiptLoading.value = true;
          const response: any = await useApi(`admin/purchasing/purchase-receipt/${formRef.purchaseReceiptId}`);
          console.log(response);
          if (response?.payload) {
            Object.assign(formRef, {
              receiptById: response.payload.createdById,
              supplierId: response.payload.supplierId,
              attachments: response.payload.attachments ? response.payload.attachments : [],
              description: response.payload.description,
              status: response.payload.status,
              totalQuantity: response.payload.totalQuantity,
              totalAmount: response.payload.totalAmount,
              totalDiscount: response.payload.totalDiscount,
              totalNetAmount: response.payload.totalNetAmount,
              totalPaidAmount: response.payload.totalPaidAmount,
              amount: Number(response.payload.totalNetAmount) - Number(response.payload.totalPaidAmount),
              purchaseReceiptBillings: response.payload.purchaseReceiptBillings?.length
                ? response.payload.purchaseReceiptBillings.map((item: any) => ({
                    ...item,
                    billingName: item.billingBy.username,
                  }))
                : [],
            })
          }
        } catch (error: any) {
          const message =
            error?.data?.message ||
            error?.message ||
            'Something went wrong'

          useNotification(message, 'error');
        } finally {
          purchaseReceiptLoading.value = false;
        }
      }

    }
  });

  const tabActive = computed<string>(() =>
    dialogState.dialogState === CrudDialogState.CREATE
      ? 'items'
      : 'attachments'
  );

  const dialogState = useCrudDialogStateStore();

  // Get branch code
  watch(()=> [dialogState.dialogState], async()=> {
    if (dialogState.dialogState === CrudDialogState.CREATE) {
      const response: any = await useApi('admin/purchasing/purchase-receipt-billing/next-code');
      if (response) {
        formRef.code = response.payload;
      }
    }
  }, { immediate: true });
</script>

<style>

</style>