import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
} from 'mdb-react-ui-kit';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setError('');
    setSuccess('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setError('');
    setSuccess('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    if (email === 'mukesh7827@gmail.com' && password === '1234') {
      setSuccess('Login successful!');
      setError('');
      sessionStorage.setItem('login', true);
      sessionStorage.setItem('email', email);
      navigate('/home');
      window.location.reload();
    } else {
      setError('Invalid email or password.');
      setSuccess('');
    }
  };

  return (
    <section>
      <div className='container'>
        <div className='row d-flex align-items-center justify-content-center'>
          <MDBContainer className="my-5 gradient-form">
            <MDBRow>
              <MDBCol col='6' className="mb-5 px-5">
                <div className="d-flex flex-column ms-5">
                  <div className="text-center">
                    <img src="/logo.png" style={{ width: '185px' }} alt="logo" />
                    <h4 className="mt-1 mb-5 pb-1">ADMIN DASHBOARD</h4>
                  </div>

                  <p>Please login to your account</p>

                  <form onSubmit={handleLogin}>
                    <MDBInput
                      wrapperClass='mb-4'
                      label='Email address'
                      id='form1'
                      type='email'
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />

                    <MDBInput
                      wrapperClass='mb-4'
                      label='Password'
                      id='form2'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />

                    <div className="form-check mb-3">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="show-password-checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <label htmlFor="show-password-checkbox" className="form-check-label ms-2">
                        Show Password
                      </label>
                    </div>

                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}

                    <div className="text-center pt-1 mb-5 pb-1">
                      <MDBBtn type="submit" className="mb-4 w-100 gradient-custom-2">
                        Sign in
                      </MDBBtn>
                      <a className="text-muted" href="#!">Forgot password?</a>
                    </div>
                  </form>
                </div>
              </MDBCol>

              <MDBCol col='6' className="mb-5">
                <div className="d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">Where Matches Begin with Management</h4>
                    <p className="small mb-0">
                      Monitor user activity, approve profiles, track subscriptions, and keep the love flowing—
                      all in one powerful dashboard.
                    </p>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </section>
  );
}
