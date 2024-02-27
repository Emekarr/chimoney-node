export interface Wallet {
  id: string;
  owner: string;
  balance: number;
  type: string;
  transactions: Transaction[];
}

interface Transaction {
  amount: number;
  balanceBefore: number;
  meta: {
    date: {
      _seconds: number;
      _nanoseconds: number;
    };
  };
  newBalance: number;
  description: string;
}
