import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation();

  return (
    <div className="h-screen w-full bg-purple-900 flex flex-col justify-center items-center gap-10">
      <h1 className="text-white text-4xl">{t("loginPage.register")}</h1>
      <ToastContainer />
      <AccountForm
        isRegister={true}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        formValues={{ name, email, password }}
        onSubmit={async (e) => {
          e.preventDefault();
          if(!email || !password || !name) {
            toast.warn(t("loginPage.registerError"))
            return;
          }

          try {
            const response = await api.post<IRegisterResponse>("/users", {name, email, password})

            if(response.status === 201) {
              toast.success(t("loginPage.createUser"))
              router.push("/")
            }

          } catch (error) {
            toast.error(t("loginPage.createUserError"))
          }
        }}
      />
    </div>
  )
}
