import { SHA256 as sha256 } from "crypto-js"

export const hashPassword = (pass: string) => {
  return sha256(pass).toString();
};