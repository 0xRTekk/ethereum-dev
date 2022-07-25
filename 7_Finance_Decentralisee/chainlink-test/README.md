# Chainlink

Chainlink est **Oracle**. Il permet de recup des données off-chain pour les insérer on-chain.

On a la possibilité de :

- Recupérer des données tels que les taux de change d'une paire
- Générer un nb aléatoire off-chain
- Récup des données depuis n'importe quelle API

[Le lien vers leurs contrats](https://github.com/smartcontractkit/chainlink/tree/develop/contracts/src/v0.8)

[Le lien vers le dashboard de leurs stats](https://market.link/overview)

[Le lien vers vers leur doc](https://docs.chain.link/)

## Data Feeds

Les data feeds de Chain Link sont un moyen de recup des données décentralisés comme les taux de changes.

Pour recup le rate d'une pair, il faut utiliser l'interface de l'aggregateur Chainlink en lui renseignant l'adresse de la pair concernée.

```js
priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e);
```

Pour vois le **code complet du contrat** qui recup les feeds, [c'est par ici](./contracts/ChainLinkTest.sol)

Pour retrouver la liste des adresses des pairs (qui sont enfait des proxys pour recup les valeurs des 2 actifs à comparer), il faut se rendre sur [ce lien](https://docs.chain.link/docs/reference-contracts//).

On peut recup les rate de différentes blockchains :

- [Ethereum](https://docs.chain.link/docs/ethereum-addresses/)
- [Binance](https://docs.chain.link/docs/bnb-chain-addresses/)
- [Polygon](https://docs.chain.link/docs/matic-addresses/)
- [Solana](https://docs.chain.link/docs/solana/data-feeds-solana/)

Et sur Ethereum, on peut retrouver les rates sur Kovan et Rinkeby :

- [Kovan](https://docs.chain.link/docs/ethereum-addresses/#Kovan%20Testnet)
- [Rinkeby](https://docs.chain.link/docs/ethereum-addresses/#Rinkeby%20Testnet)

## VRF

Il n'est pas possible de faire du random on-chain de manière sécurisé étant donnée que tout est déterministe.

Pour ça, on va utiliser l'outils VRF de chainlink qui va nous permettre de générer du random 