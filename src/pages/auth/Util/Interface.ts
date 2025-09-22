export interface User {
  nome: string;
  token: string;
}

export interface Login {
  name: string;
  senha: string;
  email?: string;
}

export interface Register {
  name: string;
  email: string;
  senha: string;
}

export interface ResetPassword {
  senha: string;
  confirmSenha: string;
}
