import React, { createContext, useContext, ReactNode, useState } from "react";

import { ethers } from "ethers";

type User = ethers.JsonRpcSigner | null;

// 定义 Context 中的数据结构
interface UserContextData {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// 创建 Context
export const UserContext = createContext<UserContextData | undefined>(
  undefined
);

// 创建 Context Provider
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// 创建一个自定义 hook 方便使用 UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
