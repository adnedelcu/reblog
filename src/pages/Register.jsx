import { baseUrl } from '../../config';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AlertBoxSuccess, AlertBoxError } from "../components/AlertBoxes";
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { setToken } from '../utils/auth';

export const Register = () => {
  const navigate = useNavigate();
  const [alertSuccess, setAlertSuccess] = useState({show: false, message: ''});
  const [alertError, setAlertError] = useState({show: false, message: ''});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = async(event) => {
    event.preventDefault();
    setAlertSuccess({ show: false, message: '' });
    setAlertError({ show: false, message: '' });
    try {
      if (confirmPassword != password) {
        setAlertError({ show: true, title: 'Error', message: 'Password must be confirmed'});
        return;
      }

      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
        }),
        headers: {"Accept" : "application/json", "Content-Type" : "application/json"}
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'An unknown error occurred');

      }
      const result = await response.json();
      setToken(result.data.token);

      setAlertSuccess({ show: true, title: 'Success', message: 'Your account has been created successfully! You will be redirected to the login page.' });
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      setAlertError({ show: true, title: 'Error', message: error.message || 'An unknown error occurred. Please reload the page.' });
    }
  };



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
                <h1 className='mb-3 text-2xl bold'>Register</h1>
                <TextInput type="text" placeholder="First name" onChange={e => setFirstName(e.target.value)} value={firstName || ''} />
                <TextInput type="text" placeholder="Last name" onChange={e => setLastName(e.target.value)} value={lastName || ''} />
                <TextInput type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email || ''} />
                <TextInput type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password || ""}/>
                <TextInput type="password" placeholder="Confirm assword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword || ""}/>
                <div className="mb-10">
                  <Button type="button" onClick={signUp}>Register</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
