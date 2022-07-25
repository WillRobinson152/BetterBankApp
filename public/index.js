function Spa() {
  return (
    <HashRouter>
      <div>       
        <UserContext.Provider value={{user:{name:'',email:'',password:'',balance:0}, trans:[]}}>
        <NavBar/> 
            <Route path="/" exact component={Home} />
            <Route path="/CreateAccount/" component={CreateAccount} />
            <Route path="/login/" component={Login} />
            <Route path="/deposit/" component={Deposit} />
            <Route path="/withdraw/" component={Withdraw} />
            <Route path="/balance/" component={Balance} />
            <Route path="/transact/" component={Transact} />
            <Route path="/alldata/" component={AllData} />
        </UserContext.Provider>
      </div>
    </HashRouter>
  );
}

ReactDOM.render(
  <Spa/>,
  document.getElementById('root')
);
