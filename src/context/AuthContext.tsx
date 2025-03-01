import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { login, register, getUserProfile, UserData } from "../api/auth";

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      const userInfo = localStorage.getItem("userInfo");
      if (userInfo) {
        try {
          setUser(JSON.parse(userInfo));
          // Optionally verify token validity with the server
          const userData = await getUserProfile();
          setUser((prevUser) => ({ ...prevUser, ...userData }));
        } catch (err) {
          localStorage.removeItem("userInfo");
          localStorage.removeItem("userToken");
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await login({ email, password });
      localStorage.setItem("userInfo", JSON.stringify(userData));
      localStorage.setItem("userToken", userData.token);
      setUser(userData);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await register({ name, email, password });
      localStorage.setItem("userInfo", JSON.stringify(userData));
      localStorage.setItem("userToken", userData.token);
      setUser(userData);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during registration",
      );
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userToken");
    setUser(null);
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login: loginUser,
        register: registerUser,
        logout: logoutUser,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
