import type React from 'react';

export type User = {
  userId: number;
  username: string;
  nickname: string;
  miniHompyName: string;
};

export type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<User>;
  logout: () => void;
};

export declare const AuthProvider: React.FC<React.PropsWithChildren>;
export declare function useAuth(): AuthContextType;
