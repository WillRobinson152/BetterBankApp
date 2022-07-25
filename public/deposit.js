function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  
  const currentUser = React.useContext(UserContext);

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow}/>}
    />
  )


function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => props.setShow(true)}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [amount, setAmount] = React.useState('');  

  function handle() {
    const url = `/account/deposit/${currentUser.user.email}/${amount}/deposit`;
    (async () => {
      let res = await fetch(url);
      let data = await res.json();
    })();
    props.setShow(false);
    currentUser.user.balance = Number(currentUser.user.balance) + Number(amount);
    currentUser.user.trans.push({action:'deposit', amount:amount})
  }

  return(<>      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}
}