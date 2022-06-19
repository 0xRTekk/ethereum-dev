// Libraire de fonctions utilitaires pour les tests de smart contracts
const { BN } = require('@openzeppelin/test-helpers');
// Fonction d'assertion 
const { expect } = require('chai');
const ERC20 = artifacts.require('Erc20Token');

contract('Erc20Token', (accounts) => {
  // On commence par mettre en place nos données d'entrées
  // Elles vont être utilisées pour nos tests
  const _name = 'ALYRA';
  const _symbol = 'ALY';
  const _initialsupply = new BN(1000);
  const _decimals = new BN(18);
  const owner = accounts[0];
  const recipient = accounts[1];
  const spender = accounts[2];
  
  // un hook qui est trigger avant chaque test
  // L'utilité ici est de faire nos tests avec un contrat fraichement deployé, clean et sans données résiduelles
  beforeEach(async function() {
  this.ERC20Instance = await ERC20.new(_initialsupply,{from: owner});
  });
  
  it('a un nom', async function() {
    expect(await this.ERC20Instance.name()).to.equal(_name);
  });

  it('a un symbole', async function() {
    expect(await this.ERC20Instance.symbol()).to.equal(_symbol);
  });

  it('a une valeur décimal', async function() {
    expect(await this.ERC20Instance.decimals()).to.be.bignumber.equal(_decimals);
  });

  it('vérifie la balance du propriétaire du contrat', async function() {
    let balanceOwner = await this.ERC20Instance.balanceOf(owner);
    let totalSupply = await this.ERC20Instance.totalSupply();
    expect(balanceOwner).to.be.bignumber.equal(totalSupply);
  });

  it('vérifie si un transfer est bien effectué', async function() {
    let balanceOwnerBeforeTransfer = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientBeforeTransfer = await this.ERC20Instance.balanceOf(recipient);
    let amount = new BN(10);
  
    await this.ERC20Instance.transfer(recipient, amount, {from: owner});
    let balanceOwnerAfterTransfer = await this.ERC20Instance.balanceOf(owner);
    let balanceRecipientAfterTransfer = await this.ERC20Instance.balanceOf(recipient);
  
    expect(balanceOwnerAfterTransfer).to.be.bignumber.equal(balanceOwnerBeforeTransfer.sub(amount));
    expect(balanceRecipientAfterTransfer).to.be.bignumber.equal(balanceRecipientBeforeTransfer.add(amount));
  });
});
