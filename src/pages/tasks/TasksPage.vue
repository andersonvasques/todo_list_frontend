<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-3.5">
      <q-card
        :style="{ borderRadius: '20px' }"
        class="q-col-gutter-md row background-card-task text-white justify-center items-center col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-center text-bold text-h5">
          <q-icon class="q-mr-sm" :name="outlinedCalendarMonth" />
          {{ t('listaTarefa') }}
        </div>
        <div class="col-12">
          <q-input
            rounded
            outlined
            color="white"
            class="q-ma-md"
            v-model="form.addTask"
            :label="t('adicionarTarefa')"
            dense
          >
            <template #append>
              <q-btn rounded color="orange-5" size="15px" style="left: 13px" label="Add" />
            </template>
          </q-input>
          <div
            v-for="(item, index) in items"
            :key="index"
            class="row flex justify-between items-center q-px-md q-mb-sm"
          >
            <div class="col-8 flex items-center">
              <q-checkbox
                size="lg"
                color="white"
                checked-icon="task_alt"
                unchecked-icon="radio_button_unchecked"
                v-model="item.completed"
                @update:model-value="() => {}"
              />
              <span
                class="q-ml-sm text-white"
                :class="{ 'line-through text-strike': item.completed }"
                :style="{
                  fontSize: '22px',
                  textDecoration: item.completed ? 'line-through' : 'none',
                  opacity: item.completed ? 0.7 : 1,
                }"
              >
                {{ item.message }}
              </span>
            </div>
            <div class="q-pa-md">
              <q-btn class="q-mx-sm" flat :icon="outlinedEdit" />
              <q-btn color="negative" flat :icon="outlinedDelete" />
            </div>
          </div>
        </div>
      </q-card>
      <div class="col-12 flex justify-end">
        <div class="q-pa-md">
          <q-btn class="q-mx-md" outline round size="13px" color="dark" icon="arrow_back" />
          <q-btn outline round size="13px" color="dark" icon="arrow_forward" />
        </div>
      </div>
    </div>
    <div class="fixed-bottom-left flex column q-gutter-md q-ml-md q-mb-lg">
      <div class="row items-center q-mb-sm">
        <q-fab class="background-card-task text-white" icon="keyboard_arrow_up" direction="up">
          <q-fab-action color="negative" flat @click="confirm = true" icon="logout" />
          <q-dialog
            transition-show="flip-down"
            transition-hide="flip-up"
            v-model="confirm"
            persistent
          >
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="logout" color="negative" text-color="white" />
                <span class="q-ml-sm"> Tem certeza que deseja sair? </span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Sair" to="/login" color="primary" v-close-popup />
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <q-fab-action color="primary" flat to="/profile" icon="person" />
        </q-fab>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Tasks } from './Util/Interface';
import {
  outlinedEdit,
  outlinedDelete,
  outlinedCalendarMonth,
} from '@quasar/extras/material-icons-outlined';

const { t } = useI18n();

const items = ref([
  { message: 'Teste Teste Teste', completed: false },
  { message: 'Farinha Farinha Farinha', completed: false },
  { message: 'Bolo Bolo Bolo', completed: false },
  { message: 'Batata Batata Batata', completed: false },
  { message: 'Banana Banana Banana', completed: false },
]);

const confirm = ref(false);

const form = ref<Tasks>({
  addTask: '',
});

defineOptions({
  name: 'TasksPage',
});
</script>
