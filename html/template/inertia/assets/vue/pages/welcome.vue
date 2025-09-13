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
    <v-btn color="primary" size="large" variant="outlined" rounded>Click me</v-btn>
    <v-row class="mt-5">
      <v-col cols="6">
        <v-card color="secondary" size="large" class="pa-5">Tile</v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="secondary" size="large" class="pa-5">Tile</v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>
