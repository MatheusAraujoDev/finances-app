import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../LanguageSelect";

export default function Header() {
  const [username, setUsername] = useState<string | null>("");
  const { t } = useTranslation();

  useEffect(() => {
    setUsername(localStorage.getItem("finances-userName"))
  }, [])

  return (
    <header className='bg-purple-900 h-28'>
      <div className="flex h-full items-center justify-between p-5">
        <p className="text-white text-xl">{t("walletPage.welcome")} <b className="text-green-400 text-xl">{username}</b></p>
        <Link href="/" className="transform hover:translate-y-[-2px] active:translate-y-0">
          <h1 className="flex h-full items-center justify-center text-white text-4xl">
              Smart Finances<img src="/wallet.png" height={40} width={40} className="ml-1" />
          </h1>
        </Link>
        <LanguageSelect />
      </div>
    </header>
  )
}
