export interface User {
  nome: string;
  token: string;
}

export interface Login {
  password: string;
  name: string;
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
