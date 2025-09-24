<template>
  <q-page class="row justify-center items-center">
    <q-card
      class="q-col-gutter-md q-pa-md row justify-center items-center background-site col-xl-4 col-lg-4 col-md-4 col-xs-6 col-sm-6"
    >
      <div class="col-12 q-mx-md text-center text-white text-h6">
        {{ t('entrar') }}
      </div>
      <div class="col-6">
        <InputEmailComponent />
        <q-input
          class="col-12"
          v-model="form.senha"
          :label="t('senha')"
          color="white"
          label-color="white"
          type="password"
          :rules="[(val) => !!val || t('textValidacaoSenha')]"
          dense
        />
        <div class="col-12 q-my-sm flex justify-center items-center">
          <q-btn label="Entrar" color="orange-5" @click="onClick" />
        </div>
        <div class="col-12 q-my-sm flex justify-center items-center">
          <router-link class="text-white" style="text-decoration: none" to="/reset-password">{{
            t('esqueceuSenha')
          }}</router-link>
        </div>
        <div class="col-12 q-my-sm flex justify-center items-center">
          <router-link class="text-white" style="text-decoration: none" to="/register">{{
            t('naoTemConta')
          }}</router-link>
        </div>
      </div>
    </q-card>
    <!-- <div>{{ form }}</div> -->
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Login } from './Util/Interface';
import InputEmailComponent from 'src/components/Inputs/InputEmailComponent.vue';

const { t } = useI18n();

const form = ref<Login>({
  senha: '',
  email: '',
});

function onClick(): void {
  alert('Login');
  window.location.href = '/tasks';
}

defineOptions({
  name: 'LoginPage',
});
</script>
