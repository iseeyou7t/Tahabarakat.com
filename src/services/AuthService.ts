
import { useToast } from "@/hooks/use-toast";

interface AuthCredentials {
  username: string;
  password: string;
}

// Default admin credentials (in a real app these would be stored securely on a server)
const defaultAdminCredentials: AuthCredentials = {
  username: "tahabarakat",
  password: "taha1234"
};

// Default owner credentials (in a real app these would be stored securely on a server)
const defaultOwnerCredentials: AuthCredentials = {
  username: "owner",
  password: "owner123"
};

export const authenticateAdmin = (credentials: AuthCredentials): boolean => {
  const { username, password } = credentials;
  
  // Get stored admin credentials if they exist
  const storedCredentialsJSON = localStorage.getItem("adminCredentials");
  const storedCredentials = storedCredentialsJSON ? JSON.parse(storedCredentialsJSON) : defaultAdminCredentials;
  
  const isAuthenticated = (
    username === storedCredentials.username && 
    password === storedCredentials.password
  );
  
  if (isAuthenticated) {
    localStorage.setItem("adminAuthenticated", "true");
  }
  
  return isAuthenticated;
};

export const authenticateOwner = (credentials: AuthCredentials): boolean => {
  const { username, password } = credentials;
  
  // For owner, we always check against the default credentials
  // In a real application, this would involve a secure server-side check
  const isAuthenticated = (
    username === defaultOwnerCredentials.username && 
    password === defaultOwnerCredentials.password
  );
  
  if (isAuthenticated) {
    localStorage.setItem("ownerAuthenticated", "true");
  }
  
  return isAuthenticated;
};

export const updateAdminCredentials = (newCredentials: AuthCredentials): void => {
  localStorage.setItem("adminCredentials", JSON.stringify(newCredentials));
};

export const isAdminAuthenticated = (): boolean => {
  return localStorage.getItem("adminAuthenticated") === "true";
};

export const isOwnerAuthenticated = (): boolean => {
  return localStorage.getItem("ownerAuthenticated") === "true";
};

export const logoutAdmin = (): void => {
  localStorage.removeItem("adminAuthenticated");
};

export const logoutOwner = (): void => {
  localStorage.removeItem("ownerAuthenticated");
};

export const getCurrentAdminCredentials = (): AuthCredentials => {
  const storedCredentialsJSON = localStorage.getItem("adminCredentials");
  return storedCredentialsJSON ? JSON.parse(storedCredentialsJSON) : defaultAdminCredentials;
};
