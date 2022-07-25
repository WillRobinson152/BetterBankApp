function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState(''); 
  const currentUser         = React.useContext(UserContext);  

  function LoginMsg(props){
    return(<>
      <h1>Success: {currentUser.user.email} is logged in</h1>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {window.location.href="#"; window.location.reload(true)}}>Go to bank</button><br/>
      <br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {
          props.setShow(true); (async () => {
          await fetch("/account/current/nonuser/-/-");
          })();
          window.location.href="#"; window.location.reload(true)}
          }>
          Log Out
      </button>
    </>);
  }
  
  function validate(field, label){
    if (!field) {
        if (label === 'email') {
            alert('You must enter an ' + label + ' address.');
        }
        else {
            alert('You must enter a ' + label + '.')
        }
      return false;
    }
    
    return true;
}

  function LoginForm(props){
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');
    function handle() {
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      const url = `/account/login/${email}/${password}`;
      const url2 = `/account/current/user/${email}/${password}`; 
      (async () => {
        let res = await fetch(url);
        let data = await res.json();
        if (data.length === 0){
          alert('Incorrect email or password');
          return;
        }
        (async () => {
          let res = await fetch(url2);
        })();
        currentUser.user = {email, password};
        props.setStatus('');
        props.setShow(false);
      })();
      
    }
  
    return (<>
  
      Email<br/>
      <h1>{currentUser.user.email}</h1><br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter email" 
        value={email} 
        onChange={e => setEmail(e.currentTarget.value)}/><br/>
  
      Password<br/>
      <input type="password" 
        className="form-control" 
        placeholder="Enter password" 
        value={password} 
        onChange={e => setPassword(e.currentTarget.value)}/><br/>
  
      <button type="submit" className="btn btn-light" onClick={handle}>Login</button>
     
    </>);
  }

  return (<>
    <Card
      bgcolor="secondary"
      header="Log in"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
    </>
  ) 
}

