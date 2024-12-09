import React from 'react'
import { create } from 'zustand'
import Login from './Login';
import SignUp from './SignUp';


interface SignUpState {
    view: string;
    setView: (view: string) => void;
}

const useSignUpStore = create<SignUpState>((set) => (
    {
        view: 'Login',
        setView: (view: string) => set({ view }),
    }
))
const Auth: React.FC = () => {


    const { view, setView } = useSignUpStore();

    return (
        <>
            {view === 'Login' && <Login setView={setView} />}
            {view === 'SignUp' && <SignUp setView={setView} />}
        </>
    )
}

export default Auth