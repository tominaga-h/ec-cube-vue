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
    <h1 class="heading">Welcome {{ props.name }}!</h1>
  </div>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 100px;
}
</style>
