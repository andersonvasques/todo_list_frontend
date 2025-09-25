<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-6">
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl row background-card-task col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-white text-bold text-h5">
          {{ t('infoPerfil') }}
        </div>
        <div class="col-12 q-mx-md text-white text-h6">
          {{ t('textInfoPerfil') }}
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
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
          <q-btn color="orange-5" :label="t('btnSalvar')" />
        </div>
      </q-card>
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl row background-card-task col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-white text-bold text-h5">
          {{ t('atualizarSenha') }}
        </div>
        <div class="col-12 q-mx-md text-white text-h6">
          {{ t('textAtualizarSenha') }}
        </div>
        <div class="col-6">
          <InputComponent
            v-model="form.password"
            :label="t('senha')"
            :rules="[(val) => !!val || t('textValidacaoSenha')]"
          />
          <InputComponent
            v-model="form.newPassword"
            :label="t('novaSenha')"
            :rules="[(val) => !!val || t('textValidacaoNovaSenha')]"
          />
          <InputComponent
            v-model="form.confirmPassword"
            :label="t('confirmSenha')"
            :rules="[(val) => !!val || t('textValidacaoConfirmSenha')]"
          />
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
          <q-btn color="orange-5" :label="t('btnSalvar')" />
        </div>
      </q-card>
      <q-card
        class="q-col-gutter-md q-pa-md q-mt-xl q-mb-xl row background-card-task justify-center items-center col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-ml-md text-white text-bold text-h5">
            {{ t('DeletarConta') }}
        </div>
        <div class="col-12 q-ml-md q-ml-md text-white text-h6">
            {{ t('textDeletarConta') }}
        </div>
        <div class="col-12 q-mb-md q-ml-md flex justify-start items-start">
            <q-btn color="orange-5" :label="t('btnDeletar')" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
import { type Profile } from './Util/Interface';
import InputComponent from 'src/components/Inputs/InputComponent.vue';

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
