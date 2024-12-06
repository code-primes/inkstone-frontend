import {createContext,} from 'react';

export type UserData = {
    email: string | null ;
    role: string | null;
    firstName:string | null;
    lastName:string | null;
}

export type AuthContextType = {
    userData: UserData | null;
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    login: (UserData: UserData, tokens:{accessToken: string, refreshToken: string}) => void;
    logout:() => void;
    hasRole: (role: string) => boolean;
    refreshAccessToken: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);