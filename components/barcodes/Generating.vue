<template>
  <svg ref="barcodeEl"></svg>
</template>

<script lang="ts" setup>
  import JsBarcode from 'jsbarcode';
  const props = defineProps<{
    value: string | number
    format?: string
    width?: number
    height?: number
    displayValue?: boolean
  }>();

  const barcodeEl = ref<SVGSVGElement | null>(null);

  const renderBarcode = () => {
    if (!barcodeEl.value) return

    JsBarcode(barcodeEl.value, String(props.value), {
      format: props.format || 'CODE128',
      width: props.width ?? 2,
      height: props.height ?? 50,
      displayValue: props.displayValue ?? true,
    });
  };

  onMounted(renderBarcode);

  // watch(() => props.value, renderBarcode);
</script>
