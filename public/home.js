function Home(){
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
  if (data){
    currentUser.user = data;
    const welcome = `Welcome to the bank, ${data.name}!`
    return (
      <Card
        txtcolor="black"
        header={welcome}
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
      />
    );  
}
else {
  return (<>
    <Card
      txtcolor="black"
      header="BadBank Landing Module"
      title="Welcome to the bank"
      text="You can move around using the navigation bar."
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image"/>)}
    />
    </>
  );
}
}