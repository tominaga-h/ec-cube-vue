<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue';

interface Props {
  name: string;
}
const props = defineProps<Props>();

defineOptions({
  layout: DefaultLayout,
})

</script>

<template>
  <div>
    <EcHeading :msg="`Welcome ${props.name}!`" />
  </div>
</template>

<style lang="scss" scoped>
</style>
