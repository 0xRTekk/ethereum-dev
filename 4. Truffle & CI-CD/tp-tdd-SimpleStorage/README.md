# Continuous Distribution - TP - TDD SimpleStorage

## Etapes

1. Initialisation projet Truffle `truffle init`
2. Installation des packages `@openzeppelin/contracts @truffle/hdwallet-provider dotenv`
3. Reprise :
   1. du contrat `SimpleStorage.sol`
   2. du script de migration `deploy.js`
   3. de la config truffle `truffle-config.js`
   4. des variables d'environements `.env` - *Seulement si on veut déployer sur Ropsten en passant par notre noeud Infura*
   5. ***GITIGNORE !!!!***
4. On adapte les scripts
5. Création fichier test `truffle create test SimpleStorage`