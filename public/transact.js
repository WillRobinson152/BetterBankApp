function Transact(){
    const currentUser = React.useContext(UserContext);
    const head = `${currentUser.user.name}'s transactions:`;
    let cards = [];
    let cardKey = 1;
    currentUser.user.trans.forEach((tran) => {
        if (tran.action === 'withdraw'){
            cards.push(<div className="card" style={{background:"#f45e77"}}>
            <div className="card-body">
                <div className="card-text">
            <h5>Action:</h5> {tran.action}
            <h5>Amount:</h5> {tran.amount}
            </div>
            </div>
            </div>)}
        else {
            cards.push(<div className="card" style={{background:"#5eaf78"}}>
            <div className="card-body">
                <div className="card-text">
            <h5>Action:</h5> {tran.action}
            <h5>Amount:</h5> {tran.amount}
            </div>
            </div>
            </div>)    
        }
    });
    cardKey += 1;
    return (
      <Card
        txtcolor="black"
        header="Transactions"
        title={head}
        body={cards}
      />
      );
  }