<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F0F8FF]">
    <div
      class="bg-gradient-to-r from-[#1E90FF] via-blue-400 to-[#FFA500] shadow-lg rounded-lg p-8 w-full max-w-xl flex flex-col items-center"
    >
      <div class="w-full text-center text-white text-2xl font-semibold mb-8">
        {{ t('resetarSenha') }}
      </div>
      <form class="w-full flex flex-col gap-4" @submit.prevent="onClick">
        <div>
          <label class="block text-white mb-2" :for="'senha'">{{ t('senha') }}</label>
          <input
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="senha"
            type="password"
            v-model="form.senha"
            :placeholder="t('senha')"
            required
          />
          <!-- Exemplo de validação: -->
          <!-- <div v-if="!form.senha" class="text-orange-400 text-xs mt-1">{{ t('textValidacaoSenha') }}</div> -->
        </div>
        <div>
          <label class="block text-white mb-2" :for="'confirmSenha'">{{ t('confirmSenha') }}</label>
          <input
            class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            id="confirmSenha"
            type="password"
            v-model="form.confirmSenha"
            :placeholder="t('confirmSenha')"
            required
          />
          <!-- Exemplo de validação: -->
          <!-- <div v-if="!form.confirmSenha" class="text-orange-400 text-xs mt-1">{{ t('textValidacaoConfirmSenha') }}</div> -->
        </div>
        <div class="flex justify-center mt-6">
          <button
            type="submit"
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded shadow font-semibold transition"
          >
            {{ t('btnSenha') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';
// Substitua pelo seu tipo, se necessário
interface ResetPassword {
  senha: string;
  confirmSenha: string;
}

const { t } = useI18n();

const form = ref<ResetPassword>({
  senha: '',
  confirmSenha: '',
});

function onClick() {
  alert('Resetou senha');
  window.location.href = '/login';
}

defineOptions({
  name: 'TesteResetPasswordPage',
});
</script>
