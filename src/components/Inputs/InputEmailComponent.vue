<template>
  <q-input
    class="col-12"
    v-model="form.email"
    :label="t('email')"
    color="white"
    label-color="white"
    :rules="[(val) => !!val || t('textValidacaoEmail')]"
    dense
  />
</template>

<script setup lang="ts">
import { type Login } from 'src/pages/auth/Util/Interface';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref<Login>({
  senha: '',
  email: '',
});
</script>

<script lang="ts">
export default {
  name: 'InputEmailComponent',
};
</script>
