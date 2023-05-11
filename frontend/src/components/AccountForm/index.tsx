import Link from 'next/link';

interface IAccountFormProps {
  isRegister?: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AccountForm(props: IAccountFormProps) {
  return (
    <div className=" w-full bg-purple-900 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={props.onSubmit}>
            {
              props.isRegister &&
              <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Nome
              </label>
              <input onChange={props.onNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
            </div>
            }
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input onChange={props.onEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" autoFocus placeholder="E-mail" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input onChange={props.onPasswordChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
            </div>

            {
              props.isRegister ?
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <Link href="/">
                    Voltar
                  </Link>
                </button>

                <button type="submit" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                    Salvar
                </button>
              </div>

            : <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Login
                </button>

                <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  <Link href="/register">
                    Criar Conta
                  </Link>
                </button>
              </div>
            }

          </form>
        </div>
      </div>
  )
}
