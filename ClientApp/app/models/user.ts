
export interface KeyValuePair { 
  id: number; 
  name: string; 
}

export interface user {
  id: number; 
  username: string;
  password: string;
  email: string;
  roles: role[];
}

export interface role {
  id: number;
  rolename: string
}