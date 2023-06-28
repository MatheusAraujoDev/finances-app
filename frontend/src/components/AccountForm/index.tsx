import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface IAccountFormProps {
  isRegister?: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  formValues: { name: string, email: string, password: string },
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function AccountForm(props: IAccountFormProps) {
  const { t } = useTranslation();

  return (
    <div data-testid="account-form" className=" w-full bg-purple-900 flex justify-center items-center">
        <div className="w-full max-w-2xl">
          <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={props.onSubmit}>
            {
              props.isRegister &&
              <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                {t("loginPage.name")}
              </label>
              <input onChange={props.onNameChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="John Doe" />
              {props.isRegister && props.formValues && props.formValues.name !== '' && props.formValues.name.length < 3 && <p className='text-red-600'>{t("loginPage.nameInputError")}</p>}
            </div>
            }

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                E-mail
              </label>
              <input onChange={props.onEmailChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" autoFocus placeholder="E-mail" />
            {props.formValues && props.formValues.email !== '' && !props.formValues.email.includes('@') && !props.formValues.email.includes('.com') && <p className='text-red-600'>{t("loginPage.emailInputError")}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {t("loginPage.password")}
              </label>
              <input onChange={props.onPasswordChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
            {props.formValues && props.formValues.password !== '' && props.formValues.password.length < 6 && <p className='text-red-600'>{t("loginPage.passwordInputError")}</p>}
            </div>

            {
              props.isRegister ?
              <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  <Link href="/">
                    {t("loginPage.goBackButton")}
                  </Link>
                </button>

                <button type="submit" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  {t("loginPage.saveButton")}
                </button>
              </div>

            : <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Login
                </button>

                <button className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  <Link href="/register">
                    {t("loginPage.createAccount")}
                  </Link>
                </button>
              </div>
            }

          </form>
        </div>
      </div>
  )
}
