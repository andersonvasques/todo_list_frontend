<template>
  <q-page class="row justify-center items-center border">
    <q-card
      class="q-col-gutter-md q-pa-md row justify-center items-center border bg-primary col-xl-6 col-lg-6 col-md-6 col-xs-12 col-sm-12 border"
    >
      <div class="col-12 q-mx-md text-center text-white text-h6">{{ t('entrar') }}</div>
      <div class="col-6">
        <q-input
          class="col-12"
          v-model="form.name"
          :label="t('nome')"
          placeholder="Placeholder"
          hint="With placeholder"
          dense
        />
        <q-input
          class="col-12"
          ref="aaaa"
          v-model="form.email"
          :label="t('email')"
          placeholder="Placeholder"
          hint="With placeholder"
          :rules="[(val) => !!val || 'Field is required']"
          dense
        />
        <q-input
          class="col-12"
          v-model="form.senha"
          :label="t('senha')"
          placeholder="Placeholder"
          hint="With placeholder"
          dense
          type="password"
        />
        <div class="col-12 flex justify-center items-center">
          <q-btn label="Entrar" color="orange-5" @click="onClick" />
        </div>
        <div class="col-12 flex justify-center items-center">
          <router-link class="text-white" style="text-decoration: none" to="/esqueceu-senha">{{
            t('esqueceuSenha')
          }}</router-link>
        </div>
        <div class="col-12 flex justify-center items-center">
          <router-link class="text-white" style="text-decoration: none" to="/registrar">{{
            t('naoTemConta')
          }}</router-link>
        </div>
      </div>
    </q-card>
    <div>{{ form }}</div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { type Login } from './Util/Interface';

const { t } = useI18n();

const form = ref<Login>({
  name: '',
  senha: '',
  email: '',
});

const aaaa = ref<HTMLElement | null>(null);

function onClick(): void {
  alert('Login');
}

defineOptions({
  name: 'LoginPage',
});
</script>
