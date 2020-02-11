pragma solidity >= 0.5.0 < 0.7.0;
contract ReceiptStore {
    // Concur address
    address public admin;
    // Details stored attached to a receipt
    struct Details {
        bool exists;
        bool isReturned;
        bool isUsed;
    }
    // Map of all the receipts
    mapping (string => Details) public receipts;
    // Map of all the issuers allowed to create receipts
    mapping (address => bool) public issuers;
    // Set concur as the admin
    constructor() public {
        admin = msg.sender;
    }
    // Limits access to registered issuers
    modifier onlyByIssuer(address _account)
    {
        require(issuers[_account] == true);
        _;
    }
    // Limits access to Concur
    modifier onlyByConcur(address _account)
    {
        require(_account == admin);
        _;
    }
    // Allows Concur admin to add a new issuer
    function addIssuer(address issuer) public 
        onlyByConcur(msg.sender)
    {
        require(issuers[issuer] == false);
        issuers[issuer] = true;
    }
    // Allows Concur admin to add a remove issuer
    function removeIssuer(address issuer) public 
        onlyByConcur(msg.sender)
    {
        require(issuers[issuer] == true);
        issuers[issuer] = false;
    }
    function createReceipt(string memory receipt) public
        onlyByIssuer(msg.sender)
    {
        require(receipts[receipt].exists == false);
        receipts[receipt].exists = true;
        receipts[receipt].isReturned = false;
        receipts[receipt].isUsed = false;
    }
    // Test function to create a receipt. Doesn't require authorization
    function createReceiptTest(string memory receipt) public {
        require(receipts[receipt].exists == false);
        receipts[receipt].exists = true;
        receipts[receipt].isReturned = false;
        receipts[receipt].isUsed = false;
    }
    function changeReturned(string memory receipt, bool returned) public
        onlyByIssuer(msg.sender)
    {
        receipts[receipt].isReturned = returned;
    }
    // Function to change a receipt used status. Only concur can use.
    function changeUsed(string memory receipt, bool used) public
        onlyByConcur(msg.sender)
    {
        receipts[receipt].isUsed = used;
    }
    // Function to get the details of a receipt
    function getDetails(string memory receipt) public
        returns (bool exists, bool isReturned, bool isUsed)
    {
         return (receipts[receipt].exists, receipts[receipt].isReturned, receipts[receipt].isUsed);
    }
}
