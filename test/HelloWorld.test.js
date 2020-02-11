
const HelloWorld = artifacts.require("HelloWorld");

contract("HelloWorld", async (accounts) => {

  it("should have initial value defined", async () => {
    // Retrieve contract instance
    const instance = await HelloWorld.deployed();

    // check initial value
    const value = await instance.getMessage.call();
    assert.equal(value.valueOf(), "Hello World!");
  });

  it("should write a value and read it back", async () => {
    // Retrieve contract instance
    const instance = await HelloWorld.deployed();

    // Write to contract
    await instance.setMessage.sendTransaction("New Text!", { from: accounts[0] });

    // Read from contract
    const newValue = await instance.getMessage.call();
    assert.equal(newValue.valueOf(), "New Text!");
  })
})