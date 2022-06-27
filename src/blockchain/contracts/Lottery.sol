// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;


contract Lottery{
    address public lotteryOwner;

    address payable[] public players;

    uint public id;
    mapping (uint => address payable) public  winnersHistory;

    constructor(){ 
        lotteryOwner = msg.sender;

    }
    modifier onlyOwner(){
        require(msg.sender == lotteryOwner);
        _;
    }

    function Apply() public payable {
        require(msg.value >= 0.01 ether, "you don't have enough ether to apply for Lottery");

        players.push(payable(msg.sender));
    }

    function getContractBalance () public view returns(uint){
        return address(this).balance;
    }


    function getAppliedPlayers() public view returns(address payable[] memory){
        return players;
    }


    function getRandomNumber() public view returns(uint){
        return uint(keccak256(abi.encodePacked(lotteryOwner,block.timestamp)));
    }


   
   

    function pickWinner() public onlyOwner{
        require(players.length != 0, "No player is applied for the lottery");

        uint randomNumber = getRandomNumber() % players.length;


        players[randomNumber].transfer(address(this).balance);

        //update the history
        winnersHistory[id] = players[randomNumber];
        id++;


        delete players;  
    }


    // for getting winner
    function showWinner(uint lotteryId) public view returns (address payable){

        return winnersHistory[lotteryId];
        
    }
}