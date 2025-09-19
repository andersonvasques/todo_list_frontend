export interface User {
  nome: string;
  token: string;
}

export interface Login {
  name: string;
  senha: string;
  email?: string;
}
