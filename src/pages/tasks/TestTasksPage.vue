<template>
  <q-page class="row flex flex-center justify-center items-center">
    <div class="col-3.5">
      <q-form ref="formFilter" @submit.prevent="request" class="q-gutter-md">
        <div class="row">
          <q-select
            transition-show="jump-up"
            transition-hide="jump-up"
            style="width: 400px"
            rounded
            outlined
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
            v-model="form.titulo"
            :label="t('titulo')"
            dense
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <div>
            <q-btn label="Enviar" type="submit" flat color="primary" />
            <q-btn
              label="Limpar"
              @click="clearStatus"
              v-model="filterStatus"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn
              label="Adicionar"
              @click="toggleModal"
              type="button"
              color="primary"
              class="q-ml-sm"
            />
          </div>
        </div>
      </q-form>
      <q-table :columns="columns" :rows="tarefas" row-key="id">
        <template v-slot:body-cell-actions="scope">
          <q-td :props="scope">
            <q-btn color="primary" flat icon="check" @click="checkedTarefa(scope.row.id)" />
            <q-btn class="q-mx-sm" flat :icon="outlinedEdit" @click="editTask(scope.row.id)" />
            <q-btn color="negative" flat :icon="outlinedDelete" @click="confirmDeletar = true" />
            <q-dialog
              transition-show="flip-down"
              transition-hide="flip-up"
              v-model="confirmDeletar"
              persistent
            >
              <q-card>
                <q-card-section class="row items-center">
                  <q-avatar icon="delete" color="negative" text-color="white" />
                  <span class="q-ml-sm"> Tem certeza que deseja deletar? </span>
                </q-card-section>

                <q-card-actions align="right">
                  <q-btn flat label="Cancelar" color="primary" v-close-popup />
                  <q-btn
                    flat
                    label="Deletar"
                    @click="removeTask(scope.row.id)"
                    color="primary"
                    v-close-popup
                  />
                </q-card-actions>
              </q-card>
            </q-dialog>
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
                <q-btn flat label="Sair" @click="logout" color="primary" v-close-popup />
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
        <div class="text-h6">Tarefa</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card>
          <q-form ref="formAdd" @submit.prevent="submitForm" class="q-gutter-md">
            <div>
              <q-input rounded color="white" v-model="payload.titulo" :label="t('titulo')" dense />
              <q-btn label="Submit" type="submit" color="primary" />
              <q-btn
                :label="t('cancelar')"
                type="button"
                color="primary"
                @click="toggleModal"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { type modalAddEdit, type OptionsStatus, type TaskApi } from './Util/Interface';
import useApi from 'src/composables/useApi';

import { tarefaStore } from 'src/stores/tarefa';
import { authStore } from 'src/stores/auth';

import { outlinedEdit, outlinedDelete } from '@quasar/extras/material-icons-outlined';
import { onMounted } from 'vue';
import { Notify, type QTableColumn } from 'quasar';

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
  id: 0,
  created_at: '',
  updated_at: '',
  id_user: 0,
  status_label: '',
});

const { index, show, post, update, destroy } = useApi('api/tarefas');

const useTarefaStore = tarefaStore();
const useAuthStore = authStore();

const form = ref<TaskApi>({
  status: '',
  titulo: '',
  id: 0,
  created_at: '',
  updated_at: '',
  id_user: 0,
  status_label: '',
});

const formModal = ref<modalAddEdit>({
  status: '',
});

const payload = ref<TaskApi>({
  status: '',
  titulo: '',
  id: 0,
  created_at: '',
  updated_at: '',
  id_user: 0,
  status_label: '',
});

const optionsStatus = ref<OptionsStatus[]>([
  { value: 'Aberto', label: 'Aberto' },
  { value: 'Concluido', label: 'Concluido' },
]);

const formFilter = ref<HTMLFormElement | null>(null);
const formAdd = ref<HTMLFormElement | null>(null);

const modal = ref(false);
const confirm = ref(false);
const confirmDeletar = ref(false);
const filterStatus = ref(false);

function toggleModal() {
  modal.value = !modal.value;
  payload.value.titulo = '';
  formModal.value.status = 'Aberto';

  if (modal.value == false) {
    useTarefaStore.resetIdTarefa();
  }
}

async function clearStatus(): Promise<void> {
  form.value.status = '';
  form.value.titulo = '';
  await request();
}

async function logout(): Promise<void> {
  try {
    await useAuthStore.handleLogout();
  } catch {
    Notify.create({
      type: 'negative',
      message: 'Houve um erro. Tente novamente.',
      progress: true,
    });
  }
}

async function submitForm(): Promise<void> {
  try {
    if (useTarefaStore.idTarefa != 0) {
      // Editando

      await update(useTarefaStore.idTarefa, payload.value);
      payload.value.titulo = '';
    } else {
      // Adicionando

      const data = await post<TaskApi>(payload.value);
      tarefa.value = data.data;

      payload.value.titulo = '';
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    Notify.create({
      type: 'negative',
      message: error.response.data.message,
      progress: true,
    });
    return;
  } finally {
    await request();
    modal.value = false;
    // toggleModal();
  }
}

async function checkedTarefa(id: number): Promise<void> {
  await showTask(id);

  payload.value.status = 'Concluido';
  payload.value.titulo = tarefa.value.titulo;
  payload.value.id = tarefa.value.id;

  await submitForm();
}

async function editTask(id: number): Promise<void> {
  await showTask(id);
  toggleModal();

  payload.value.titulo = tarefa.value.titulo;
  payload.value.id = tarefa.value.id;
  payload.value.status = tarefa.value.status_label;
}

async function showTask(id: number): Promise<void> {
  try {
    const data = await show<TaskApi>(id);
    tarefa.value = data.data;
    useTarefaStore.setIdTarefa(id);
  } catch {
    return;
  }
}

async function removeTask(id: number): Promise<void> {
  try {
    await destroy(id);
  } catch {

    return;
  } finally {
    await request();
  }
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
