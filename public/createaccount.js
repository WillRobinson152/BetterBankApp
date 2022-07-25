function CreateAccount(){
  const [show, setShow]     = React.useState(true);
  const currentUser         = React.useContext(UserContext);

  function CreateMsg(props){
    
    return(<>
      <h5>Success</h5><br/>
      <h3>{currentUser.user.name}'s account was created!</h3>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {window.location.href="#"; window.location.reload(true)}}>Go to bank</button><br/>
      <br/>
      <button type="submit" 
        className="btn btn-light" 
        onClick={() => {props.setShow(true); (async () => {
          await fetch("/account/current/nouser/-/-");
          })();
          window.location.href="#"; window.location.reload(true)}}>Log out</button>
    </>);
  }

  

  function CreateForm(props){
    const [name, setName]         = React.useState('');
    const [email, setEmail]       = React.useState('');
    const [password, setPassword] = React.useState('');

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
      else if (label === 'email') {
        if ((field.indexOf('@') == -1) || (field.split('@')[field.split('@').length - 1].indexOf('.') == -1)) {
            alert('Email address must be in ****@***.*** format.')
        return false;
        }
        
    }
      else if (label === 'password') {
          if (field.length < 8) {
              alert('Password must be at least 8 characters.')
          return false;
          }
      }
      return true;
  }
  
    function handle() {
      if (!validate(name,     'name'))     return;
      if (!validate(email,    'email'))    return;
      if (!validate(password, 'password')) return;
      currentUser.user = {name,email,password,balance:0};
      const url = `/account/create/${name}/${email}/${password}`;
      const url2 = `/account/current/user/${email}/${password}`; 
      (async () => {
        let res = await fetch(url);
        let data = await res.json();
      })();
      (async () => {
        let res = await fetch(url2);
      })();
      props.setShow(false);
      

    }
  
    return (<>
      Name<br/>
      <h1>{currentUser.user.email}</h1><br/>
      <input type="input" 
        className="form-control" 
        placeholder="Enter name" 
        value={name} 
        onChange={e => setName(e.currentTarget.value)} /><br/>
  
      Email address<br/>
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
  
      <button type="submit" 
        className="btn btn-light" 
        onClick={handle}>Create Account</button>
  
    </>);
  }
  
  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}



