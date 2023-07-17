# NFT

## Hashlips art engine

On utilise le [art engine de hashlpis](https://github.com/HashLips/hashlips_art_engine) pour créer notre collection de NFTs.

On doit mettre les calques dans le dossier layout puis venir modifier le fichier `src/config.js`

Pour lancer la génération de la collection on va lancer la commande `node index.js`

On se retrouve avec un dossier ``build`` qui contient les images et les metadatas associées

Ensuite on va stocker le dossier `build/images` sur [pinata](https://app.pinata.cloud/pinmanager) et recupérer le CID.

Ce CID, on va maintenant le copier et le coller dans la config pour mettre a jour les metadata des NFT (l'URI vers les images)

```js
const baseUri = "ipfs://QmbPpyWTqWxCTTPLbkP18SEzcXcCRiG9yNfPNoSg9RWeSi";
```

Pour mettre à jour l'URI des images dans les fichiers metadatas, il faut lancer la commande `node utils/update_info.js`

Maintenant que les metadatas sont à jour, on va pouvoir upload le dossier `build/metadatas` sur pinata.

Il faut ensuite mettre en place le SM pour minter nos NFT **seulement sur Rinkeby**

```js
// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

//import Open Zepplin contracts

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTs is Ownable, ERC721 {
  uint256 private _tokenIds;
  uint priceMin;
  uint total;

  mapping(address => bool) hasNFT;

  constructor() ERC721("CC", "ChatChien") { }


  function setPrice(uint _price) public onlyOwner {
      priceMin=_price;
  }

  function totalSupply() public returns (uint){
      return total;
  }
  
  //use the mint function to create an NFT. Mint le plus simple possible ic
  function mint(uint _quantity) public payable returns (uint256){
      require(msg.value>=priceMin,"pas le bon prix");
      require(hasNFT[msg.sender]==false, "vous avez deja un nft");
      require(totalSupply() + _quantity <= 30, "Max supply exceeded");

      hasNFT[msg.sender]=true;
      _tokenIds += 1;
      _mint(msg.sender, _tokenIds);
      return _tokenIds;
  }

  //in the function below include the CID of the JSON folder on IPFS
  function tokenURI(uint256 _tokenId) override public pure returns(string memory) {
      return string(
          abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmPs7cMCr7K5Z5YsmFErMxfSX6535qwKothYCnGmiDjk7e/",Strings.toString(_tokenId),".json")
          );
  }

  function withdraw() public onlyOwner{
      msg.sender.call{value: address(this).balance}("");
  }
}
```

On peut maintenant checker nos NFT sur [opensea testnet](https://testnets.opensea.io/)

## Upradable

