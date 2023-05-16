import { useTranslation } from "react-i18next";

export default function index() {
  const { i18n } = useTranslation();

  return (
    <div className="flex justify-evenly gap-3">
      <button className="bg-slate-200 hover:bg-green-300 rounded p-1" onClick={() => i18n.changeLanguage('pt')}>🇧🇷 Pt-BR</button>
      <button className="bg-slate-200 hover:bg-green-300 rounded p-1" onClick={() => i18n.changeLanguage('en')}>🇺🇸 En-US</button>
    </div>
  )
}
