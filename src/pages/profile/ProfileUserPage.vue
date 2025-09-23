<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-6">
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl row background-card-task col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-white text-h5">
          {{ t('infoPerfil') }}
        </div>
        <div class="col-12 q-mx-md text-white text-h6">
          {{ t('textInfoPerfil') }}
        </div>
        <div class="col-6">
          <q-input
            class="col-12 q-ma-md"
            label-color="white"
            color="white"
            v-model="form.name"
            :label="t('nome')"
            dense
          />
          <q-input
            class="col-12 q-ma-md"
            label-color="white"
            color="white"
            v-model="form.name"
            :label="t('email')"
            dense
          />
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
          <q-btn color="orange-5" :label="t('btnSalvar')" />
        </div>
      </q-card>
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl row background-card-task col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-white text-h5">
          {{ t('atualizarSenha') }}
        </div>
        <div class="col-12 q-mx-md text-white text-h6">
          {{ t('textAtualizarSenha') }}
        </div>
        <div class="col-6">
          <q-input
            class="col-12 q-ma-md"
            label-color="white"
            color="white"
            v-model="form.password"
            :label="t('senha')"
            dense
          />
          <q-input
            class="col-12 q-ma-md"
            label-color="white"
            color="white"
            v-model="form.newPassword"
            :label="t('novaSenha')"
            dense
          />
          <q-input
            class="col-12 q-ma-md"
            label-color="white"
            color="white"
            v-model="form.confirmPassword"
            :label="t('confirmSenha')"
            dense
          />
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
          <q-btn color="orange-5" :label="t('btnSalvar')" />
        </div>
      </q-card>
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl q-mb-xl row background-card-task justify-center items-center col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-ml-md text-white text-h5">
            {{ t('DeletarConta') }}
        </div>
        <div class="col-12 q-ml-md q-ml-md text-white text-h6">
            Caso desejar deletar sua conta, não será possível reverter a ação
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
            <q-btn color="orange-5" label="Deletar" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { type Profile } from './Util/Interface';

const { t } = useI18n();

const form = ref<Profile>({
  name: '',
  email: '',
  password: '',
  newPassword: '',
  confirmPassword: '',
});

defineOptions({
  name: 'ProfileUSerPage',
});
</script>
