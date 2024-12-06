import { ReactNode, useEffect, useState } from "react"
import { AuthContext, UserData } from "./AuthContext";

interface AuthProviderProps {
	children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

	const [userData, setUserData] = useState<UserData | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [refreshToken, setRefreshToken] = useState<string | null>(null);

	useEffect(() => {
		const storedUserData = localStorage.getItem("userData");
		const storedAccessToken = localStorage.getItem("accessToken");
		const storedRefreshToken = localStorage.getItem("refreshToken");

		if (storedUserData && storedAccessToken && storedRefreshToken) {
			setUserData(JSON.parse(storedUserData));
			setAccessToken(storedAccessToken);
			setRefreshToken(storedRefreshToken);
		}

	}, []);

	const login = (
		userData: UserData,
		tokens: { accessToken: string, refreshToken: string }
	) => {
		setUserData(userData);
		setAccessToken(tokens.accessToken);
		setRefreshToken(tokens.refreshToken);
		localStorage.setItem("userData", JSON.stringify(userData));
		localStorage.setItem("accessToken", tokens.accessToken);
		localStorage.setItem("refreshToken", tokens.refreshToken);
	}

	const logout = () => {
		setUserData(userData);
		setAccessToken(null);
		setRefreshToken(null);
		localStorage.removeItem("userData");
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	}

	//TODO:complete the refresh token function
	const refreshAccessToken = () => { }

	const hasRole = (role: string) => {
		return userData?.role === role;
	}

	//!! converts to boolean
	return (
		<AuthContext.Provider
			value={{
				userData,
				isAuthenticated: !!userData,
				login,
				logout,
				hasRole,
				accessToken,
				refreshToken,
				refreshAccessToken
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider