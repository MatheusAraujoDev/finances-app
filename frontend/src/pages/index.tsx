import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AccountForm from "src/components/AccountForm";
import { api } from 'src/services/api';

type ILoginResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  }
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className="bg-purple-900 h-screen flex flex-col items-center py-12 gap-10">
      <img src="/undraw_savings_re_eq4w.svg" alt="teste" height={250} width={250} />
      <h1 className="text-white text-4xl">Login</h1>
      <ToastContainer />
      <AccountForm
        onNameChange={() => {}}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={async (e) => {
          e.preventDefault()
          
          if(!email || !password) {
            toast.warn("Preencha todos os campos!")
            return;
          }

          try {
            const response = await api.post<ILoginResponse>("/users/login", {email, password})
            const token = response.data.token;
            const userId = response.data.user.id;
            const userName = response.data.user.name;

            localStorage.setItem("finances-token", token)
            localStorage.setItem("finances-userId", userId)
            localStorage.setItem("finances-userName", userName)

            if(response.status === 200) {
              router.push("/dashboard")
            }
          
          } catch (error) {
            toast.error("Algo deu errado, tente novamente!")
          }
        }}
      />
    </div>
    
  )
}
