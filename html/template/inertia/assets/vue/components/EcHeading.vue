<script setup lang="ts">
interface Props {
  msg: string;
}
const props = defineProps<Props>();
</script>

<template>
  <h1 class="heading">{{ props.msg }}</h1>
</template>

<style lang="scss" scoped>
.heading {
  font-size: 100px;
}
</style>
