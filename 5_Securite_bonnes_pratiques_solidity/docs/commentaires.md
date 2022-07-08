# Commentaires Solidity

Le standard pour les commentaires en Solidity est le **NatSpec : Ethereum Natural Language Specification Format**

[Le lien de la doc](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html)

```js
/// @title A title that should describe the contract/interface/library
/// @author The name of the author - contract, library, interface
/// @notice Explain to an end user what this does - contract, library, interface, function, public state variable, event
/// @dev Explain to a developer any extra details - contract, library, interface, function, state variable, event
/// @param PARAM_NAME PARAM_DESC - function, event
/// @return RETURN_DESC - function, public state variable
/// @inheritdoc Copies all missing tags from the base function (must be followed by the contract name) - function, public state variable
```

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 < 0.9.0;

/// @title A simulator for trees
/// @author Larry A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract Tree {
    /// @notice Calculate tree age in years, rounded up, for live trees
    /// @dev The Alexandr N. Tetearing algorithm could increase precision
    /// @param rings The number of rings from dendrochronological sample
    /// @return Age in years, rounded up for partial years
    function age(uint256 rings) external virtual pure returns (uint256) {
        return rings + 1;
    }

    /// @notice Returns the amount of leaves the tree has.
    /// @dev Returns only a fixed number.
    function leaves() external virtual pure returns(uint256) {
        return 2;
    }
}

contract Plant {
    function leaves() external virtual pure returns(uint256) {
        return 3;
    }
}

contract KumquatTree is Tree, Plant {
    function age(uint256 rings) external override pure returns (uint256) {
        return rings + 2;
    }

    /// Return the amount of leaves that this specific kind of tree has
    /// @inheritdoc Tree
    function leaves() external override(Tree, Plant) pure returns(uint256) {
        return 3;
    }
}
```

## Output

Lorsqu'elle est analysée par le compilateur, une documentation telle que celle de l'exemple ci-dessus produira deux fichiers JSON différents.  
L'un est destiné à être consommé par l'utilisateur final comme un avis lorsqu'une fonction est exécutée et l'autre à être utilisé par le développeur.  
Si le contrat ci-dessus est enregistré sous ex1.sol, vous pouvez générer la documentation en utilisant

```sh
## Il faut installer le compilateur solidity
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc

# Avec la commande, on génère les docs utilisateurs et dev sous format json
solc --userdoc --devdoc ERC20.sol -o docs/
```

## Génération de doc plus visuelles

Il existe des outils qui permettent de générer de la doc plus visuelle.

[Doxity](https://github.com/DigixGlobal/doxity) qui s'intègre dans Truffle. Cet outil permet de générer la doc consultable sur navigateur

[Surya](https://github.com/ConsenSys/surya) qui permet d'avoir un graphe qui représente les intéractions des fonctions, contrats etc
