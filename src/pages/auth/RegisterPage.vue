<template>
  <q-page class="row flex justify-center items-center">
    <q-card
      :style="{ borderRadius: '20px' }"
      class="q-col-gutter-md q-pa-md row justify-center items-center background-site col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
    >
      <div class="col-12 q-mx-md text-center text-white text-bold text-h4">
        {{ t('cadastrar') }}
      </div>
      <div class="col-6">
        <InputComponent
          v-model="form.name"
          :label="t('nome')"
          :rules="[(val) => !!val || t('textValidacaoNome')]"
        />
        <InputComponent
          v-model="form.email"
          :label="t('email')"
          :rules="[(val) => !!val || t('textValidacaoEmail')]"
        />
        <InputComponent
          v-model="form.senha"
          :label="t('senha')"
          type="password"
          :rules="[(val) => !!val || t('textValidacaoSenha')]"
        />
        <InputComponent
          v-model="form.confirmSenha"
          :label="t('confirmSenha')"
          type="password"
          :rules="[(val) => !!val || t('textValidacaoConfirmSenha')]"
        />
        <div class="col-12 q-my-sm flex justify-center items-center">
          <q-btn color="orange-5" :label="t('btnRegistrar')" @click="onClick" />
        </div>
        <div class="col-12 q-my-sm flex justify-center items-center">
          <router-link class="text-white" style="text-decoration: none" to="/login">
            {{ t('possuiLogin') }}
          </router-link>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { type Register } from './Util/Interface';
import InputComponent from 'src/components/Inputs/InputComponent.vue';

const { t } = useI18n();

const form = ref<Register>({
  name: '',
  email: '',
  senha: '',
  confirmSenha: '',
});

function onClick() {
  window.location.href = '/login';
}

defineOptions({
  name: 'RegisterPage',
});
</script>
