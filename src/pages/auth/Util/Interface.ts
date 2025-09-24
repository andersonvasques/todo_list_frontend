export interface User {
  nome: string;
  token: string;
}

export interface Login {
  senha: string;
  email?: string;
}

export interface Register {
  name: string;
  email: string;
  senha: string;
  confirmSenha: string;
}

export interface ResetPassword {
  senha: string;
  confirmSenha: string;
}
