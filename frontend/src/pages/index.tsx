import { useState } from 'react';
import AccountForm from "src/components/AccountForm";

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="bg-purple-900 h-screen flex flex-col items-center py-12 gap-10">
      <img src="/undraw_savings_re_eq4w.svg" alt="teste" height={250} width={250} />
      <h1 className="text-white text-4xl">Login</h1>
      <AccountForm
        onEmailChange={(e) => setEmail(e.target.value)}
        onPasswordChange={(e) => setPassword(e.target.value)}
        onSubmit={() => {
          console.log('teste')
        }}
      />
    </div>
    
  )
}
