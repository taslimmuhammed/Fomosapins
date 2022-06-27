// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


contract Seller{
    uint256 public price;
    address public owner;
    mapping(address=>bool) public owned;
    constructor(){
        price = .25 ether;
        owner  = msg.sender;
    }

  IERC721 token = IERC721(0xd9145CCE52D386f254917e481eB44e9943F39138);

    function transferOwnership(address _newOwner) public returns(bool) {
        require(msg.sender==owner, "Only owner can appoint new onwer");
        owner = _newOwner;
        return true;
    }

    function setPrice(uint256 _newPrice) public returns (bool){
        price = _newPrice;
        return true;
    }

    function getTotalBalance()public view returns(uint256) {
    return token.balanceOf(address(this));
    }
    

    function buyToken(uint256 _toeknId)  public payable returns(bool){
        require(owned[msg.sender]==false, "You can only buy one time");
        require(msg.value>=price, "Send the exact amount");
        require(token.ownerOf(_toeknId)==address(this), "token not found or sold out, try again or enquire owner");
        token.transferFrom(address(this),msg.sender, _toeknId);
        owned[msg.sender]=true;
        return true;
    }

    
}

pragma solidity ^0.8.0;

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    function balanceOf(address owner) external view returns (uint256 balance);
    function ownerOf(uint256 tokenId) external view returns (address owner);
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;
    function approve(address to, uint256 tokenId) external;
    function getApproved(uint256 tokenId) external view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) external;
    function isApprovedForAll(address owner, address operator) external view returns (bool);
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}

