import React, { useContext,useState } from 'react';
import {MDBBtn, MDBIcon, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';
import { AuthContext } from '../context/AuthContext';

function RegisterComponent() {

   const {registerInfo, updateRegisterInfo, registerUser, registreError} = useContext(AuthContext);

    return (
        <>            
          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='facebook-f' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='twitter' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='google' size="sm"/>
              </MDBBtn>

              <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                <MDBIcon fab icon='github' size="sm"/>
              </MDBBtn>
            </div>
          </div>
          <form onSubmit={registerUser}>
            <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' onChange={e => updateRegisterInfo({...registerInfo, name: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' onChange={e => updateRegisterInfo({...registerInfo, email: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={e => updateRegisterInfo({...registerInfo, password: e.target.value})}/>

            <div className='d-flex justify-content-center mb-4'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </form>
       </>
  );
}

export default RegisterComponent