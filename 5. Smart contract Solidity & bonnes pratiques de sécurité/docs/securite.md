# Securite

La sécurité des smart contracts est très importante et peu faire l'objet d'un approfondissement et expertise !

Nous avons découvert les tests unitaires et le TDD qui sont déjà un premier rempart contre les effets de bords su rnos smart contract, mais il fuat aller plus loin que ça !

Il nous faut étudier les cas d'attaques les plus courantes. Nous avons plusieurs ressources à disposition pour cela :

- [Pour se tenir en veille](https://rekt.news/)
- [La doc des bonnes pratiques de Consensys](https://consensys.github.io/smart-contract-best-practices/)
- [Plus particulièrement la doc sur les attaques](https://consensys.github.io/smart-contract-best-practices/attacks/)
- [Une liste d'exos pour s'exercer sur les attaques](https://github.com/clesaege/HackSmartContract/blob/master/contracts/SolidityHackingWorkshopV8.sol)
- [Un jeu de hack de smart contract de la DeFI (hard level)](https://www.damnvulnerabledefi.xyz/)

**TODO** Il faut se maintenir en veille sur le sujet, continuer de lire des articles et toujours découvrir de nouvelles choses sur le sujet. Mettre en place des outils pour tester nos smart contracts est une étape quasi obligatoire. Les inclure dans un pipeline de CI/CD semble être une obligation egalement !

## Les outils

[Une liste d'outils de sécurité](https://consensys.github.io/smart-contract-best-practices/security-tools/)

Il existe différent types d'analyse dans la programmation. On va pouvoir en effectuer plusieurs pour assurer la sécurité de nos smart contract !

Il y a la [plateforme complète MythX](https://dashboard.mythx.io/) de Consensys avec tous les outils pour faire des audits de sécurité ! Le service est payant mais à la possibilité de tester gratuitement ou quasiement.

### Visualisation

[L'extension de vscode solidity auditor](https://github.com/ConsenSys/vscode-solidity-auditor) apporte une syntaxe centrée sur la sécurité et une mise en évidence sémantique, un plan de classe détaillé et des informations avancées sur le code Solidity à Visual Studio Code.

### Analyse statique

L’analyse statique permet de détecter automatiquement plusieurs classes d'erreurs de programmation sans avoir à executer les programmes.

- [Slither](https://github.com/crytic/slither)

### Exécution symbolique

- [Mythril](https://github.com/ConsenSys/mythril) est un outil d'analyse de sécurité pour le bytecode EVM. Il fait parti de MythX Tools
- [Manticore](https://github.com/trailofbits/manticore) est un outil d'**analyse dynmaique**. Il permet d’étudier l’ensemble des états que peut prendre le Smart Contract. 
- [Echidna](https://github.com/crytic/echidna) est le seul outils pour faire du **Fuzz Testing** sur les smart contracts. Permet de tester les SM avec un nombre considérable d'entrée afin de pallier à toutes les éventualités.
