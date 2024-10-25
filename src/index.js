// Import necessary modules and dependencies
import { createAppKit } from '@reown/appkit';
import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { mainnet, arbitrum, sepolia } from '@reown/appkit/networks';
import { EventsController } from '@reown/appkit-core';
import { ethers } from 'ethers';

// 1. Retrieve the projectId from the Reown Cloud dashboard
const projectId = '2cb3ec52f334a92fcdebcda6286d5a11';

// 2. Define your application's metadata
const metadata = {
  name: 'Ethanzhang666888',
  description: 'AppKit Example',
  url: 'https://reown.com/appkit',  
  icons: ['https://avatars.githubusercontent.com/u/179229932']  
}; 

// 3. Create an instance of AppKit with the specified configuration
const modal = createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum, sepolia],
  metadata,
  projectId,
}); 

// 4. Set up the connection button event listener
const connectButton = document.getElementById("connectButton");
const walletAddressDiv = document.getElementById("walletAddress");

connectButton.addEventListener("click", async () => {  
  try {
    await modal.open(); 
    const account = await modal.getAddress(); 
    if (account) {
      displayAccountInfo(account);
    }
  } catch (error) {
    console.error('Error connecting to wallet:', error);
  }
}); 
 
// 5. Function to display the connected wallet's address
function displayAccountInfo(account) {
  if (account) {
    walletAddressDiv.innerText = `Connected account: ${account}`;
  }
} 

// 6. Event handler function to update the UI on successful connection
async function handler(newState) { 
  if (newState.data.event === 'CONNECT_SUCCESS') { 
    const account = await modal.getAddress(); 
    displayAccountInfo(account);
  }
}

// 7. Subscribe to events to handle connection status changes
EventsController.subscribe(handler);