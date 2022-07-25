function Nav(props){
  const currentUser         = React.useContext(UserContext);
  const [user, setUser]     = React.useState(user);
  const [data, setData]     = React.useState(data);
  React.useEffect(() => {
    fetch("/account/currentuser")
      .then(response => response.json())
      .then(user => {
        setUser(user[user.length - 1]);
        fetch(`/account/currentuser/findone/${user[user.length - 1].email}/${user[user.length - 1].password}`)
          .then(response => response.json())
          .then(data => {
            setData(data);
          });
      })
    }, []);
  if (data) {currentUser.user = data};
  
  if (!currentUser)
  {return (  
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {props.brand && (<a className="navbar-brand" href="#">{props.brand}</a>)}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {props.navItems.map(navItem => (
              <li className="nav-item">
                <a className="nav-link" href={navItem.href} onClick={navItem.onclick}>{navItem.txt}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

    </>
  ); }   
  else {
    return(<>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {props.brand && (<a className="navbar-brand" href="#">{props.brand}</a>)}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {props.navItems.map(navItem => (
              <li className="nav-item">
                <a className="nav-link" href={navItem.href} onClick={navItem.onclick}>{navItem.txt}</a>
              </li>
            ))}
          </ul>
        </div>
        <h3>{currentUser.user.name}</h3>
      </nav>
    </>)}
}

function NavBar(){
  const publicNav           = [{href:"#/CreateAccount/", txt:"Create Account", onclick:()=>{}},
                               {href:"#/Login/", txt:"Log in", onclick:()=>{}}] 
  const privateNav          = [{href:"#", txt:"Log out", onclick:() => {fetch("/account/current/nouser/-/-"); window.location.href="#"; window.location.reload(true)}},
                               {href:"#/Deposit/", txt:"Deposit", onclick:()=>{}},
                               {href:"#/Withdraw/", txt:"Withdraw", onclick:()=>{}},
                               {href:"#/Balance/", txt:"Balance", onclick:()=>{}},
                               {href:"#/transact/", txt:"Transactions", onclick:()=>{}}
                              ]
  
  const [data, setData]     = React.useState('');
  React.useEffect(() => {
    fetch("/account/currentuser")
      .then(response => response.json())
      .then(data => {
        setData(data[data.length -1 ].name);
      })
  }, []);
  if (data === 'user'){
    return (
      <Nav 
        brand="BadBank"
        navItems={privateNav}
      />)
  }
  else {
    return (
      <Nav 
        brand="BadBank"
        navItems={publicNav}
      />)
  }
}