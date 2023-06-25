/// <reference types="vite/client" />
interface Window {
  ethereum: {
    isMetaMask: true;
    request: (...args: any[]) => Promise<void>;
  };
}
