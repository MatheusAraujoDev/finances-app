import { useEffect, useState } from "react";
import LanguageSelect from "../LanguageSelect";

export default function Header() {
  const [username, setUsername] = useState<string | null>("")

  useEffect(() => {
    setUsername(localStorage.getItem("finances-userName"))
  }, [])

  return (
    <header className='bg-purple-900 h-28'>
      <div className="flex h-full items-center justify-between p-5">
        <p className="text-white text-xl">Seja bem-vindo(a) <b className="text-green-400 text-xl">{username}</b></p>
        <h1 className="flex h-full items-center justify-center text-white text-4xl">DinDin Finances<img src="/wallet.png" height={40} width={40} className="ml-1" /></h1>
        <LanguageSelect />
      </div>
    </header>
  )
}
