import { defineStore } from 'pinia';
import { ref } from 'vue';

export const tarefaStore = defineStore('Tarefas', () => {
  const idTarefa = ref<number>(0);

  function setIdTarefa(val: number): void {
    idTarefa.value = val;
  }

  function resetIdTarefa(): void {
    idTarefa.value = 0;
  }

  return {
    idTarefa,
    setIdTarefa,
    resetIdTarefa,
  };
});
