import { useState } from "react";
import AccountForm from "src/components/AccountForm";

export default function index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="h-screen w-full bg-purple-900 flex flex-col justify-center items-center gap-10">
      <h1 className="text-white text-4xl">Cadastre-se</h1>
      <AccountForm
        isRegister={true}
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={() => {
          console.log('teste')
        }}
      />
    </div>
  )
}
