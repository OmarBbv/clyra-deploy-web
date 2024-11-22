import React from 'react';
import { useQuery } from '@tanstack/react-query';
import BASE_API from '@/utils/apiConfig';
import { IUserInfo } from '@/models/globalModel';
import { getCookie } from 'typescript-cookie';

interface UserContextType {
    userInfo: IUserInfo | null;
    isLoading: boolean;
    isError: boolean;
    setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>>;
    setChanged?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

const fetchAccountInfo = async ({ token, setUserInfo }: { token: string, setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo | null>> }) => {
    if (!token) {
        throw new Error('No token, skipping API request');
    }
    const res = await BASE_API.get('/users/me');
    setUserInfo(res.data);
    return res.data;
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const token = getCookie('token');
    const [userInfo, setUserInfo] = React.useState<IUserInfo | null>(null);
    const [changed, setChanged] = React.useState(false);

    const { data, isLoading, isError } = useQuery<IUserInfo, Error>({
        queryKey: ['get/me', changed],
        queryFn: () => fetchAccountInfo({ token: token as string, setUserInfo }),
        enabled: !!token,
        retry: false
    });

    React.useEffect(() => {
        if (data) setUserInfo(data);
        if (!token) {
            setUserInfo(null);
        }
    }, [data, token]);

    const values = {
        userInfo,
        isLoading,
        isError,
        setUserInfo,
        setChanged
    }

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
