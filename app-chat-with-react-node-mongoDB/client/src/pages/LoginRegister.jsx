import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBCard,
  MDBCardBody
}
from 'mdb-react-ui-kit';
import Login from "../components/LoginComponent";
import Register from "../components/RegisterComponent";

function LoginRegister() {

  const [justifyActive, setJustifyActive] = useState('tab1');

  const handleJustifyClick = (value) => {
    if (value === justifyActive) return;
    setJustifyActive(value);
  };



  return (
    <>
    <MDBCard style={{margin: "auto", backgroundColor: "#cec3c342"}} className="p-3 my-5 d-flex flex-column w-50">
    <MDBCardBody>
        <MDBContainer >
        <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
              Register
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>
        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === 'tab1'}>
            <Login />
          </MDBTabsPane>
          <MDBTabsPane show={justifyActive === 'tab2'}>
            <Register />
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </MDBCardBody>
  </MDBCard>
  </>
  );
  }
  
  export default LoginRegister