const SimpleStorage = artifacts.require("SimpleStorage");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * contract() équivaut à describe()
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("SimpleStorage", function (accounts) {
  // Assertion obvious
  // Sert uniquement à tester si le test est correctement configuré
  // it("should return true", async function () {
  //   await SimpleStorage.deployed();
  //   return assert.isTrue(true);
  // });

  //! On n'oublie pas que la callback en 2eme argument est asynchrone
  it("should store 42", async () => {
    //* 1. On commence par déployer le contrat pour intéragir avec
    const simpleStorage = await SimpleStorage.deployed();

    //* 2. On va essayer de set une valeur en intéragissant avec le contrat
    // On peut définir l'adresse qui va call la fonction
    await simpleStorage.set(42, { from: accounts[0] });

    //* 3. On recup la valeur qui a été mémorisée
    /*
    ? == QUESTION ==
    ? await simpleStorage.get().call();
    ? == QUESTION ==
    */
    const storedValue = await simpleStorage.get()

    //* 4. On test l'assertion d'égalité
    assert.equal(storedValue, 42, "42 was nicely stored. Good job");
  });
});
