<template>
  <q-page class="row justify-center items-center">
    <q-card
      :style="{ borderRadius: '20px' }"
      class="q-col-gutter-md q-pa-md row justify-center items-center background-site col-xl-4 col-lg-4 col-md-4 col-xs-6 col-sm-6"
    >
      <q-form ref="formAdd" @submit.prevent="login">
        <div class="col-12 q-mx-md text-center text-white text-bold text-h4">
          {{ t('entrar') }}
        </div>
        <div class="col-6">
          <InputComponent v-model="form.name" :label="t('nome')" />
          <InputComponent v-model="form.password" :label="t('senha')" type="password" />
          <div class="col-12 q-my-sm flex justify-center items-center">
            <q-btn :label="t('entrar')" type="submit" color="orange-5" />
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
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import InputComponent from 'src/components/Inputs/InputComponent.vue';
import { ref } from 'vue';
import { type Login } from './Util/Interface';

import { authStore } from 'src/stores/auth';

const useAuthStore = authStore();

const { t } = useI18n();

const form = ref<Login>({
  name: 'Anderson',
  password: '123456',
});

const formAdd = ref<HTMLFormElement | null>(null);

async function login(): Promise<void> {
  await useAuthStore.handleLogin(form.value);
}

defineOptions({
  name: 'LoginPage',
});

</script>
