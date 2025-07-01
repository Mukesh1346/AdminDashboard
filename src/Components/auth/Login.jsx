import React, { useState } from 'react'
import './login.css'

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput
}
from 'mdb-react-ui-kit';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [showPassword , setShowPassword] = useState(false);

  return (
    <>
    <section>
        <div className='container'>
            <div className='row d-flex align-items-center justify-container-center'>

                <MDBContainer className="my-5 gradient-form">

                <MDBRow>

                <MDBCol col='6' className="mb-5 px-5">
                    <div className="d-flex flex-column ms-5">

                    <div className="text-center">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        style={{width: '185px'}} alt="logo" />
                        <h4 className="mt-1 mb-5 pb-1">LUVNESTOR ADMIN DASHBOARD </h4>
                    </div>

                    <p>Please login to your account</p>


                    <MDBInput wrapperClass='mb-4' 
                    label='Email address'
                     id='form1'
                     type='email'
                    value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     required
                    
                      
                    />
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>


                    <div className="text-center pt-1 mb-5 pb-1">
                        <MDBBtn className="mb-4 w-100 gradient-custom-2">Sign in</MDBBtn>
                        <a className="text-muted" href="#!">Forgot password?</a>
                    </div>

                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                        <p className="mb-0">Don't have an account?</p>
                        <MDBBtn outline className='mx-2' color='danger'>
                        Danger
                        </MDBBtn>
                    </div>

                    </div>

                </MDBCol>

                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 class="mb-4">Where Matches Begin with Management</h4>
                        <p class="small mb-0">Monitor user activity, approve profiles, track subscriptions, and keep the love flowing—all in one powerful dashboard.
                        </p>
                    </div>

                    </div>

                </MDBCol>

                </MDBRow>

                </MDBContainer>

            </div>

        </div>
    </section>
        
      
    </>
  )
}
