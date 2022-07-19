# Voting session Dapp

Projet Dapp avec un front fait en React et un back avec un contrat Solidity.

Le front permet d'intéragir avec le contract par le biais d'une interface web.

Toutes les fonctionnalités du contrat sont utilisable via le front.

## Démo

Voici la [vidéo démo](https://drive.google.com/file/d/1oQXti5CTITNg39qKXX461CJY3x3kq19l/view?usp=sharing) de la Dapp !

## Composants

L'interface est découpé en plusieurs composants :

- App => Composant racine qui dispose les sous composants
- Account => Affiche l'adresse du compte connecté
- Winner => Affiche la proposal gagnante
- AdminPanel => Le panneau d'interaction du compte admin
- VoterPanel => Le panneau d'interaction d'un voter
- VotersList => La liste des voters enregistrés
- ProposalsList => La liste des proposals enregistrés

## Déploiement

Actuellement il est possible d'utiliser la Dapp sur le réseau de test Ropsten et sur un ganache lancé en local.

Voici l'adresse du contract sur le réseau Ropsten : 0x62455D36E8135A33B41f04e456c302c1be973695

Si vous souhaitez déployer vous même le contract sur Ropsten, n'oubliez pas de renommer le fichier `.en-dist` en `.env` et d'y renseigner l'ID de votre node Infura ainsi que la mnemonic de votre metamask


## Hosting de la Dapp

La dapp est propulsée en ligne via l'outil [Surge](https://surge.sh/) à cette URL : [https://smiling-join.surge.sh/](https://smiling-join.surge.sh/)

PS: le nom de domaine est généré aléatoirement

## Version 2

- Architecture React + Store Redux => Bcp plus simple pour la gestion du state (qui est ici laborieuse)
- Retravailler le design (pour l'instant j'utilise la lib semantic-ui-react)
- Utiliser d'autre solutions de free hosting : GitHub Pages, Heroku, Netlify (car je ne les ai encore jamais utilisé)

## Version 3

- Pipeline complet de CI/CD
- Améliorer le smart contract
- Utiliser d'autres solutions comme Besu
