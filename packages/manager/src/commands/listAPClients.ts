export interface ListAPClientsResult {
  ipAddress: string;
}

export async function listAPClients(): Promise<ListAPClientsResult[]> {
  return [
    { ipAddress: '127.0.0.1' }
  ];
}
