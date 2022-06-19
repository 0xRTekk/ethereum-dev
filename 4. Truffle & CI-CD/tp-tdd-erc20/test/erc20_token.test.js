const Erc20Token = artifacts.require("Erc20Token");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Erc20Token", function (/* accounts */) {
  it("should assert true", async function () {
    await Erc20Token.deployed();
    return assert.isTrue(true);
  });
});
