import { useState } from 'react'
import { baseUrl } from '../../config'
import { useNavigate } from 'react-router-dom';
import { AlertBoxSuccess, AlertBoxError } from "../components/AlertBoxes";
import { setToken } from '../utils/auth';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';

export const Login = () => {
  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState({show: false, message: ''});
  const [alertError, setAlertError] = useState({show: false, message: ''});

  const logIn = async(event) => {
    event.preventDefault();
    setAlertSuccess({ show: false, message: '' });
    setAlertError({ show: false, message: '' });

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email: email, password:password }),
      headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
    });
    const result = await response.json();
    if (!response.ok) {
      setAlertError({ show: true, title: 'Error', message: result.message || 'An unknown error occurred. Please reload the page.'});

      return;
    }
    setToken(result.data.token);

    setAlertSuccess({ show: true, title: 'Success', message: 'You have been successfully logged in! You will be redirected to the homepage shortly.' });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {alertSuccess.show && <AlertBoxSuccess message={alertSuccess.message}  /> }
      {alertError.show && <AlertBoxError message={alertError.message}  /> }
      <section className="py-20">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-lg bg-gray-800 px-10 py-16 text-center sm:px-12 md:px-[60px]">
              <div className="mb-10 text-center md:mb-16">
                <Logo />
              </div>
              <form>
                <h1 className='mb-3 text-2xl bold'>Login</h1>
                <TextInput type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email || ''} />
                <TextInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
                <div className="mb-10">
                  <Button type="button" onClick={logIn}>Login</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
