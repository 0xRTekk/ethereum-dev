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

  //! Ne pas utiliser les fonctions fléchée car on n'aurait pas accès au context Mocha
  // https://mochajs.org/#arrow-functions
  it('vérifie si un approve est bien effectué', async function() {
    /*
      notes:
      Une adresse peut allouer / autoriser un certain montant à une autre adresse, afin d'être utiliser
      On a un mapping : (ownerAddr => (spenderAddr => balanceAutorized))
      Une fonction allowance() permet de retrouver le uint(montant) alloué par l'owner au spender
      Une fonction approve() permet à l'owner de définir un montant autorisé au sender 
      Le montant alloué change donc une fois la fonction approve executée.
      
      On veut donc pouvoir checker si la fonction approve() passe bien
      en vérifiant la valeur donnée par allowance() avant et après le call de approve() 

      ==========================================================================================================

      étapes:
      On recup le montant que l'owner a (déjà) alloué au sender => fonction allowance(owner, sender)
      On définit un nouveau montant à allouer
      L'owner autorise et redéfinit le nouveau montant au sender => fonction approve()
      On recup le nouveau montant alloué par l'owner au sender
      On vérif que ce nouveau montant soit bien égal à celui prévu
    */
    const allowanceSpenderBeforeApprove = await this.ERC20Instance.allowance(owner, spender);
    const amount = new BN(10);
    await this.ERC20Instance.approve(spender, amount, {from: owner});
    const allowanceSpenderAfterApprove = await this.ERC20Instance.allowance(owner, spender);
    expect(allowanceSpenderAfterApprove).to.be.bignumber.equal(amount);
  });
});
