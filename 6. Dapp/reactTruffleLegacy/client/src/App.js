// == Import
import { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

// == Composant
function App() {
  const [value, setValue] = useState("");
  const [storageValue, setStorageValue] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [addresses, setAdresses] = useState(null);

  useEffect(
    () => {
      async function setUpWeb3() {
        try {
          // Get network provider and web3 instance.
          const web3Provider = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3Provider.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3Provider.eth.net.getId();
          const deployedNetwork = SimpleStorageContract.networks[networkId];
          const instance = new web3Provider.eth.Contract(
            SimpleStorageContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
          const response = await instance.methods.get().call();
    
          setStorageValue(response);
          setWeb3(web3Provider);
          setAccounts(accounts);
          setContract(instance);

          console.log(response);
          console.log(web3);
          console.log(accounts);
          console.log(instance);
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        };
      };

      setUpWeb3();
    },
    [web3]
  );

  const handleClick = async () => {
    const response = await contract.methods.set(value).send({ from: accounts[0] });
    console.log(response);
    const newValue = await contract.methods.get().call();
    console.log(newValue);
    setStorageValue(newValue);
    setValue("");
  }

  return (
    <div className="App">
      <h1>Good to Go!</h1>
      <p>Your Truffle Box is installed and ready.</p>
      <h2>Smart Contract Example</h2>
      <div>The stored value is: {storageValue}</div>
      <input type="text" value={value} onChange={(evt) => {setValue(evt.currentTarget.value)}} />
      <button onClick={handleClick}>
        Set value
      </button>
    </div>
  );
}

// == Export
export default App;
