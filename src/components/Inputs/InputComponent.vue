<template>
  <q-input
    class="col-12 q-ma-md"
    :type="type"
    :label="label"
    color="white"
    label-color="white"
    :rules="rules"
    dense
    :model-value="modelValue"
    @update:model-value="updateValue"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
  modelValue: string;
  type?: 'text' | 'password' | 'email';
  label?: string;
  color?: string;
  labelColor?: string;
  rules?: Array<(val: string) => true | string>;
  dense?: boolean;
}>();

const emits = defineEmits(['update:modelValue']);

function updateValue(val: string | number | null) {
  emits('update:modelValue', val);
}
</script>

<script lang="ts">
export default {
  name: 'InputNameComponent',
};
</script>
