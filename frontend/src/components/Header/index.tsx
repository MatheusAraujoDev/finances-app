import { useEffect, useState } from "react";

export default function Header() {
  const [username, setUsername] = useState<string | null>("")

  useEffect(() => {
    setUsername(localStorage.getItem("finances-userName"))
  }, [])

  return (
    <header className='bg-purple-900 h-24'>
      <div className="flex h-full items-center justify-between p-5">
        <p className="text-white text-xl">Seja bem-vindo(a) <b className="text-white text-xl">{username}</b></p>
        <h1 className="flex h-full items-center justify-center text-white text-4xl">DinDin Finances<img src="/wallet.png" height={40} width={40} className="ml-1" /></h1>
        <select className="form-select px-4 py-3 text-gray-900 text-sm rounded-lg">
          <option value="br" className="flex items-center">
            🇧🇷 Português
          </option>
          <option value="us" className="flex items-center">
            🇺🇸 English
          </option>
        </select>
      </div>
    </header>
  )
}
