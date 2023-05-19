import {MDBBtn, MDBIcon, MDBInput, MDBCheckbox} from 'mdb-react-ui-kit';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function LoginComponent() {

  const {loginInfo, updateLoginInfo, loginUser, loginError} = useContext(AuthContext);

    return (
        <>            
            <div className="text-center mb-3">
                 <p>Sign in with:</p>
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
          <form onSubmit={loginUser}>
            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={e => updateLoginInfo({...loginInfo, email: e.target.value})}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={e => updateLoginInfo({...loginInfo, password: e.target.value})}/>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          </form>
          <p className="text-center">Not a member? <a href="#!">Register</a></p>
       </>
  );
}

export default LoginComponent