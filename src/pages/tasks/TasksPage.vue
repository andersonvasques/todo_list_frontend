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
          <div v-for="(item, index) in items" :key="index" class="col-6 flex justify-between">
            <div class="col-6">
              <q-checkbox
                size="lg"
                style="font-size: 22px"
                id="classCheckbox"
                @click="taskCompleted"
                color="white"
                checked-icon="task_alt"
                unchecked-icon="radio_button_unchecked"
                :label="item.message"
                :label-class="item.completed ?? 'line-through'"
                true-value
                v-model="item.completed"
              />
              <div>
                {{ item.completed }}
              </div>
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
  { message: 'Teste Teste Teste', completed: true },
  { message: 'Farinha Farinha Farinha', completed: true },
  { message: 'Bolo Bolo Bolo', completed: true },
  { message: 'Batata Batata Batata', completed: true },
  { message: 'Banana Banana Banana', completed: true },
]);

const confirm = ref(false);

const form = ref<Tasks>({
  addTask: '',
  inputTask: '',
});

function taskCompleted(index: number) {
  const item = (items.value[index]);

  item.value[index].completed = !item.completed;
}

// function taskCompleted() {
//   const checkbox = document.getElementById('classCheckbox');
//   if (checkbox) {
//     const labelSpan = checkbox.querySelector('.q-checkbox__label') as HTMLElement;
//     if (labelSpan) {
//       labelSpan.style.textDecoration =
//         labelSpan.style.textDecoration === 'line-through' ? 'none' : 'line-through';
//     } else {
//       console.log('não existe');
//     }
//   }
// }

defineOptions({
  name: 'TasksPage',
});
</script>
