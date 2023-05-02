import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import AccountForm from "src/components/AccountForm";
import { api } from "src/services/api";

type IRegisterResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export default function index() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <div className="h-screen w-full bg-purple-900 flex flex-col justify-center items-center gap-10">
      <h1 className="text-white text-4xl">Cadastre-se</h1>
      <ToastContainer />
      <AccountForm
        isRegister={true}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={async (e) => {
          e.preventDefault();
          if(!email || !password || !name) {
            toast.warn("Preencha todos os campos!")
            return;
          }

          try {
            const response = await api.post<IRegisterResponse>("/users", {name, email, password})

            if(response.status === 201) {
              toast.success("Usuário criado com sucesso!")
              router.push("/")
            }

          } catch (error) {
            toast.error("Algo deu errado, tente novamente!")
          }
        }}
      />
    </div>
  )
}
