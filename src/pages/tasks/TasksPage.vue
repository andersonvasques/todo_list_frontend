<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-3.5">
      <q-card
        class="q-col-gutter-md row background-card-task text-white justify-center items-center col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-center text-h6">
          {{ t('listaTarefa') }}
        </div>
        <div class="col-12">
          <q-input
            rounded
            outlined
            class="q-ma-md"
            v-model="form.addTask"
            :label="t('adicionarTarefa')"
            dense
          >
            <template #append>
              <q-btn rounded color="orange-5" size="15px" style="left: 13px;" label="Add" />
            </template>
          </q-input>
          <div class="col-6 flex justify-between">
            <q-checkbox label="Teste teste teste" false-value v-model="form.inputTask" />
            <div class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" :label="t('btnEditar')" />
              <q-btn color="negative" :label="t('btnExcluir')" />
            </div>
          </div>
          <div class="col-6 flex justify-between">
            <q-checkbox label="Teste teste teste" false-value v-model="form.inputTask" />
            <div class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" :label="t('btnEditar')" />
              <q-btn color="negative" :label="t('btnExcluir')" />
            </div>
          </div>
          <div class="col-6 flex justify-between">
            <q-checkbox label="Teste teste teste" false-value v-model="form.inputTask" />
            <div class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" :label="t('btnEditar')" />
              <q-btn color="negative" :label="t('btnExcluir')" />
            </div>
          </div>
          <div class="col-6 flex justify-between">
            <q-checkbox label="Teste teste teste" false-value v-model="form.inputTask" />
            <div class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" :label="t('btnEditar')" />
              <q-btn color="negative" :label="t('btnExcluir')" />
            </div>
          </div>
          <div class="col-6 flex justify-between">
            <q-checkbox label="Teste teste teste" false-value v-model="form.inputTask" />
            <div class="q-pa-md">
              <q-btn class="q-mx-lg" color="primary" :label="t('btnEditar')" />
              <q-btn color="negative" :label="t('btnExcluir')" />
            </div>
          </div>
        </div>
      </q-card>
      <div class="col-12 flex justify-end">
        <div class="q-pa-md">
          <q-btn class="q-mx-md" outline round size="13px" color="primary" icon="arrow_back" />
          <q-btn outline round size="13px" color="primary" icon="arrow_forward" />
        </div>
      </div>
    </div>
    <div class="fixed-bottom-left flex column q-gutter-md q-ml-md q-mb-lg">
      <div class="row items-center">
        <q-btn color="primary" :label="t('btnUsuario')" @click="profile" />
      </div>
      <div class="row items-center">
        <q-btn color="negative" :label="t('btnSair')" @click="logout" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Tasks } from './Util/Interface';

const { t } = useI18n();

const form = ref<Tasks>({
  addTask: '',
  inputTask: '',
});

function logout() {
  window.location.href = '/login';
}

function profile() {
  window.location.href = '/profile';
}

defineOptions({
  name: 'TasksPage',
});
</script>
