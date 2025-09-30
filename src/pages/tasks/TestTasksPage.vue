<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-3.5">
      <q-card
        :style="{ borderRadius: '20px' }"
        class="q-pa-md row background-card-task text-white justify-center items-center col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-6"
      >
        <div class="col-12 q-mx-md text-center text-bold text-h5">
          <q-icon class="q-mr-sm" :name="outlinedCalendarMonth" />
          {{ t('listaTarefa') }}
        </div>
        <div class="col-12">
          <div class="column justify-center items-center q-gutter-y-md">
            <q-input
              style="width: 400px"
              rounded
              outlined
              color="white"
              v-model="form.searchTasks"
              :label="t('pesquisarTarefas')"
              dense
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div class="col-6 q-ma-md">
              <q-input
                rounded
                outlined
                color="white"
                class="q-ma-md"
                style="width: 500px"
                v-model="form.addTask"
                @keyup.enter="addNewTask"
                @keyup.ctrl.enter="addNewTask"
                :label="t('adicionarTarefa')"
                dense
              >
                <template #append>
                  <q-btn
                    rounded
                    color="orange-5"
                    size="15px"
                    style="left: 13px"
                    label="Add"
                    @click="addNewTask"
                  />
                </template>
              </q-input>
            </div>
          </div>
          <div
            v-for="(tarefa, index) in tarefas"
            :key="tarefa.id"
            class="row flex justify-between items-center q-px-md q-mb-sm"
          >
            <div class="col-8 flex items-center">
              <q-checkbox
                size="lg"
                color="white"
                checked-icon="task_alt"
                unchecked-icon="radio_button_unchecked"
                v-model="tarefa.status"
              />
              <div v-if="tarefa.status == 'Aberto'" class="task-text task__edit">
                <span
                  class="q-ml-sm text-white task-text"
                  :class="{ 'line-through text-strike': tarefa.status }"
                  :style="{
                    fontSize: '22px',
                    textDecoration: tarefa.status ? 'line-through' : 'none',
                    opacity: tarefa.status ? 0.7 : 1,
                  }"
                  :title="tarefa.titulo"
                >
                  {{ tarefa.titulo }}
                </span>
              </div>
              <div v-else-if="tarefa.status == 'Concluido'">
                <q-input
                  @keyup.enter="editTask(index)"
                  class="inputEditing"
                  v-model="tarefa.titulo"
                  type="text"
                  :style="{
                    fontSize: '20px',
                  }"
                />
              </div>
            </div>
            <div class="q-pa-md">
              <q-btn class="q-mx-sm" flat :icon="outlinedEdit" @click="editTask(tarefa.id, index)" />
              <q-btn color="negative" flat :icon="outlinedDelete" @click="removeTask(index)" />
            </div>
          </div>
        </div>
      </q-card>
      <div class="col-12 flex justify-end">
        <div class="q-pa-md">
          <!-- clique do botao, chamar o get passando a proxima url -->
          <q-btn class="q-mx-md" outline round size="13px" color="dark" icon="arrow_back" v-model="paginatedItems" />
          <!-- clique do botao, chamar o get passando a url anterior -->
          <q-btn outline round size="13px" color="dark" icon="arrow_forward" />
        </div>
      </div>
      <div v-for="tarefa in tarefas" :key="tarefa.id">
        Tarefas -
        Id: {{ tarefa.id }} -
        Titulo: {{ tarefa.titulo }} -
        Status: {{ tarefa.status }}
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
                <q-btn flat label="Cancelar" color="primary" v-close-popup />
                <q-btn flat label="Sair" to="/login" color="primary" v-close-popup />
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
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { type Tasks } from './Util/Interface';
import { api } from '../../boot/axios';

import {
  outlinedEdit,
  outlinedDelete,
  outlinedCalendarMonth,
} from '@quasar/extras/material-icons-outlined';
import { onMounted } from 'vue';

const { t } = useI18n();

const tarefas = ref([]);

const pagination = ref({
  page: 1,
  per_page: 5,
  next_page_url: null,
  prev_page_url: null
});


// async function request(url: string|null) {
async function request() {

  //pegar apenas a pagina da url
  const request = (await api.get('tarefas')).data;

  const requestLenght = request.next_page_url.length;
  const positionPage = request.next_page_url.indexOf('page');
  const rest = request.next_page_url.slice(positionPage, requestLenght);
  console.log(rest);



  tarefas.value = request.data
  pagination.value = {
    page: request.page,
    per_page: request.per_page,
    next_page_url: request.next_page_url,
    prev_page_url: request.prev_page_url
  };

}

onMounted(async () => {

request();

console.log('Request de tarefas', pagination.value);
});

// const items = ref([
//   { message: 'Teste Teste Teste', completed: false, isEditing: false },
//   { message: 'Farinha Farinha Farinha', completed: false, isEditing: false },
//   { message: 'Bolo Bolo Bolo', completed: false, isEditing: false },
//   { message: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', completed: false, isEditing: false },
// ]);

// Paginação do card
const currentPage = ref(1);
const itemsPerPage = ref(4);

const paginatedItems = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
  console.log('filteredItems', filteredItems.value.slice(startIndex, endIndex));

  return filteredItems.value.slice(startIndex, endIndex);
});

const confirm = ref(false);

const form = ref<Tasks>({
  searchTasks: '',
  addTask: '',
});

// Filtrar por uma tarefa
const filteredItems = computed(() => {
  if (!form.value.searchTasks) {
    return items.value;
  }

  const searchTerm = form.value.searchTasks.toLowerCase();

  return items.value.filter((item) => item.message.toLowerCase().includes(searchTerm));
});

// Adicionar uma nova tarefa no array items
function addNewTask() {
  if (form.value.addTask.trim()) {
    items.value.push({
      message: form.value.addTask.trim(),
      completed: false,
      isEditing: false,
    });

    form.value.addTask = '';
  }
}

// Editar uma tarefa
function editTask(idTarefa: number, index: number) {
  // const tarefa = 
  console.log('Tarefa', tarefa);
  const item = items.value[idTarefa];

  if (item) {
    item.isEditing = !item.isEditing;
  }
}

function removeTask(index: number) {
  items.value.splice(index, 1);
}

defineOptions({
  name: 'TasksPage',
});
</script>

<!-- Adicionando reticências -->
<style scoped>
.task-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 350px;
}
</style>
