<template>
  <q-page class="row flex justify-center items-center">
    <q-card
        class="q-col-gutter-md q-pa-md row justify-center items-center background-site col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
    >
      <div class="col-12 q-px-md text-center text-white text-h6">
        {{ t('resetarSenha') }}
      </div>
      <div class="col-6">
        <q-input
            class="col-12"
            v-model="form.senha"
            color="white"
            type="password"
            :label="t('senha')"
            label-color="white"
            :rules="[(val) => !!val || t('textValidacaoSenha')]"
            dense
        />
        <q-input
            class="col-12"
            v-model="form.confirmSenha"
            color="white"
            type="password"
            :label="t('confirmSenha')"
            label-color="white"
            :rules="[(val) => !!val || t('textValidacaoConfirmSenha')]"
            dense
        />
        <div class="col-6 q-py-sm flex justify-center items-center">
            <q-btn color="orange-5" :label="t('btnSenha')" @click="onClick" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { type ResetPassword } from './Util/Interface';
import { ref } from 'vue';

const { t } = useI18n();

const form = ref<ResetPassword>({
  senha: '',
  confirmSenha: '',
});

function onClick() {
    alert('Resetou senha');
    window.location.href = '/login';
}

defineOptions({
  name: 'ResetPasswordPage',
});
</script>
