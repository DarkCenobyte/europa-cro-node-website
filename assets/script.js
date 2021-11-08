async function addCronosNetwork() {
  if (window.ethereum === undefined || ! window.ethereum.isMetaMask) {
    console.info("MetaMask isn't installed!");
    return;
  }
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x19' }]
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            { 
              chainId: '0x19',
              chainName: 'Cronos',
              nativeCurrency: {
                name: 'CRO',
                symbol: 'CRO',
                decimals: 18
              },
              rpcUrls: ['https://evm-cronos.crypto.org'],
              blockExplorerUrls: ['https://cronos.crypto.org/explorer/']
            }
          ]
        });
    } else {
      throw switchError;
    }
  }
}
