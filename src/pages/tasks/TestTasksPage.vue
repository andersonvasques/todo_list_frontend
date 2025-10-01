<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-3.5">
      <q-form ref="formFilter" @submit.prevent="request" class="q-gutter-md">
        <div class="row">
          <q-select
            style="width: 400px"
            rounded
            outlined
            color="white"
            v-model="form.status"
            label="Status"
            dense
            map-options
            emit-value
            :options="optionsStatus"
          />
          <q-input
            style="width: 400px"
            rounded
            outlined
            color="white"
            v-model="form.titulo"
            :label="t('titulo')"
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
            <q-btn
              label="Adicionar"
              @click="toggleModal"
              type="button"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </div>
      </q-form>
      <q-table :columns="columns" :rows="tarefas" row-key="id">
        <template v-slot:body-cell-actions="scope">
          <q-td :props="scope">
            <q-btn class="q-mx-sm" flat :icon="outlinedEdit" @click="showTask(scope.row.id)" />
            <q-btn color="negative" flat :icon="outlinedDelete" @click="removeTask(scope.row.id)" />
          </q-td>
        </template>
      </q-table>
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

  <q-dialog v-model="modal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card>
          <q-form ref="formAdd" @submit.prevent="submitForm" class="q-gutter-md">
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn :label="t('cancelar')" type="button" color="primary" flat class="q-ml-sm" />

              <q-input
                rounded
                outlinedS
                color="white"
                v-model="payload.titulo"
                :label="t('titulo')"
                dense
              />
            </div>
          </q-form>
        </q-card>
      </q-card-section>

      <q-card-section align="right">
        <q-btn flat type="button" label="OK" color="primary" @click="toggleModal" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type OptionsStatus, type TaskApi } from './Util/Interface';
import useApi from 'src/composables/useApi';

import { tarefaStore } from 'src/stores/tarefa';

import { outlinedEdit, outlinedDelete } from '@quasar/extras/material-icons-outlined';
import { onMounted } from 'vue';
import { type QTableColumn } from 'quasar';

const { t } = useI18n();

const columns: QTableColumn[] = [
  {
    name: 'titulo',
    field: 'titulo',
    label: t('titulo'),
    align: 'left',
    sortable: true,
  },
  {
    name: 'status',
    field: 'status_label',
    label: 'Status',
    align: 'center',
    sortable: true,
  },
  {
    name: 'actions',
    field: 'actions',
    label: 'Actions',
    align: 'center',
    sortable: true,
  },
];

const tarefas = ref<TaskApi[]>([]);

const tarefa = ref<TaskApi>({
  status: '',
  titulo: '',
});

const { index, show, post, update, destroy } = useApi('tarefas');

const useTarefaStore = tarefaStore();

const form = ref<TaskApi>({
  status: '',
  titulo: '',
});

const payload = ref<TaskApi>({
  titulo: '',
  status_label: '',
  status: '',
});

const optionsStatus = ref<OptionsStatus[]>([
  { value: 'Aberto', label: 'Aberto' },
  { value: 'Concluido', label: 'Concluido' },
]);

const formFilter = ref<HTMLFormElement | null>(null);
const formAdd = ref<HTMLFormElement | null>(null);

// const pagination = ref({
//   page: 1,
//   per_page: 5,
//   next_page_url: null,
//   prev_page_url: null,
// });

const modal = ref(false);
const confirm = ref(false);

function toggleModal() {
  modal.value = !modal.value;
}

async function submitForm(): Promise<void> {
  try {
    if (useTarefaStore.idTarefa != 0) {
      await update(useTarefaStore.idTarefa, payload.value);
    } else {
      const data = await post<TaskApi>(payload.value);
      tarefa.value = data.data;
    }
  } catch {
    return;
  } finally {
    await request();
  }
}

async function showTask(id: number) {
  try {
    const data = await show<TaskApi>(id);
    tarefa.value = data.data;
    useTarefaStore.setIdTarefa(id);
  } catch {
    return;
  }
}

async function removeTask(id: number): Promise<void> {
  await destroy(id);
}

async function request(): Promise<void> {
  try {
    const request = await index<TaskApi>(form.value);
    tarefas.value = request.data;
  } catch {
    return;
  }
}

onMounted(async () => {
  await request();
});

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
