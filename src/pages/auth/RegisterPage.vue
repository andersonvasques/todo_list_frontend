<template>
  <q-page class="row flex justify-center items-center">
    <q-card
      class="q-col-gutter-md q-pa-md row justify-center items-center background-site col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
    >
      <div class="col-12 q-mx-md text-center text-white text-h6">
        {{ t('cadastrar') }}
      </div>
      <div class="col-6">
        <q-input
          class="col-12"
          color="white"
          v-model="form.name"
          :label="t('usuario')"
          label-color="white"
          :rules="[(val) => !!val || 'Usuário é obrigatório']"
          dense
        />
        <q-input
          class="col-12"
          v-model="form.email"
          type="email"
          :label="t('email')"
          label-color="white"
          :rules="[(val) => !!val || 'E-mail é obrigatório']"
          dense
        />
        <q-input
          class="col-12"
          v-model="form.senha"
          type="email"
          :label="t('senha')"
          label-color="white"
          :rules="[(val) => !!val || 'Senha é obrigatório']"
          dense
        />
        <div class="col-12 q-my-sm flex justify-center items-center">
          <q-btn color="orange-5" label="Registrar" @click="onClick" />
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Register } from './Util/Interface';

const { t } = useI18n();

const form = ref<Register>({
  name: '',
  email: '',
  senha: '',
});

function onClick() {
  alert('Cadastrado');
  window.location.href = '/login';
}

defineOptions({
  name: 'RegisterPage',
});
</script>
