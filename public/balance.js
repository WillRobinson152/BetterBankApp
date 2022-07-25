function Balance(){
  const currentUser = React.useContext(UserContext);
  return (
    <Card
      bgcolor="info"
      header="Balance"
      body={<BalanceMsg/>}
    />
  )


function BalanceMsg(props){
  return(<>
    <h1>{currentUser.user.name}</h1><br/>
    <h5>Your balance is:</h5><br/>
    <h3>${currentUser.user.balance}</h3><br/>    
  </>);
}
}
