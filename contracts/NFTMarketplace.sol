// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// Using ERC721 standard
// Functionality we can use
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

import 'hardhat/console.sol';

// public means available from the client application
// view means it's not doing any transaction work just returning something

contract NFTMarketplace is ERC721URIStorage{
    // allows us to use the coutner utility.
    using Counters for Counters.Counter;
    // when the first token is minted it'll get a value of zero, the second one is one
    // and then using counters this we'll increment token ids
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemSold;
 
      // fee to list an nft on the marketplace
    // charge a listing fee means whenever transaction occur owner gets commission.

    uint256 listingPrice=0.025 ether;

     // declaring the owner of the contract
    // owner earns a commision on every item sold
    address payable owner;

  // keeping up with all the items that have been created
    // pass in the integer which is the item id and it returns a market item.
    // to fetch a market item, we only need the item id
    mapping(uint256=> MarketItem) private idToMarketItem;

    struct MarketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

event MarketItemCreated{
       uint256  indexed tokenId,
        address payable seller,
        address payable owner,
        uint256 price,
        bool sold
};

constructor(){
    owner=payable(msg.sender);
}

function updateListingPrice(uint _lisitingPrice) public payable {
    require(owner===msg.sender,'Only marketplace onwer can update the listing price');

    lisitingPrice=_listingPrice;
}

function getListingPrice() public view returns (uint256){
return listingPrice;
}

function createToken(string memory tokenURI,uint256 price) public payable returns (uint) {
    _tokenIds.increment();
    uint256 newTokenId=_tokenIds.current();

    _mint(msg.sender,newTokenId);
      _setTokenURI(newTokenId,tokenURI);

createMarketItem(newTokenId,price);

return newTokenId;

} 


function createMarketItem(uint256 tokenId,uint256 price) private {
    require(price > 0,'Price must be atleast 1');
    require(msg.value==listingPrice,'Price must be equal to listing price');

    idToMarketItem[tokenId]=MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
    );

    _transfer(msg.sender,address(this),tokenId);
    emit MarketItemCreated(tokeId,msg.sender,address(this),price,false);
}

}
