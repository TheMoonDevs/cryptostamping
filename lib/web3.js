import { memo, useState, useEffect } from "react";
import Web3 from "web3";
import { useMoralis } from "react-moralis";

import {
  IN_DEV_ENV,
  forceTESTNET,
  polygonMainChain,
  polygonTestNetChain,
  BALLOON_TOKEN_ADDRESS,
} from "lib/data";
import { fromHex, toHex } from "lib/utils";

import CONTRACT_ABI from "lib/abi";

//const provider = new Web3.providers.HttpProvider(networkChainUrl);
//const w3 = new Web3(networkChainUrl);

export const useWeb3 = (isLoggedIn) => {
  const {
    web3,
    enableWeb3,
    isWeb3Enabled,
    isWeb3EnableLoading,
    web3EnableError,
  } = useMoralis();

  useEffect(() => {
    if (!isLoggedIn) return;
    enableWeb3();
  }, [isLoggedIn]);

  const signMessage = (message, verfication, from) => {
    if (!window.ethereum || !web3) return alert("Please connect your wallet!");
    const msgParams = {
      domain: {
        chainId: window.ethereum?.chainId,
        name: verfication?.name || "CutOuts",
      },
      message: message,
      primaryType: "EIP712Domain",
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "chainId", type: "uint256" },
        ],
        //Verfication: [{ name: "verfication_id", type: "string" }],
      },
    };
    if (verfication.contract)
      msgParams.domain.verifyingContract = verfication.contract;
    if (verfication.version)
      msgParams.domain.verifyingContract = verfication.version;

    return new Promise ((resolve, reject) => {
      web3.currentProvider.sendAsync(
      {
        method: "eth_signTypedData_v4",
        params: [from, JSON.stringify(msgParams)],
        from: from,
      },
      function (err, result) {
        console.log(result);
        if (err) {
          console.log(err);
          reject(err);
        }
        if (result.error) {
          alert(result.error.message);
          reject(result.error.message);
        } else {
          console.log(JSON.stringify(result.result));
          resolve({
            from: from,
            signature: JSON.stringify(result.result),
            signature_data: JSON.stringify(msgParams),
          });
        }
      });
    })
  };

  return {
    web3: web3,
    signMessage,
  };
};

export const useContract = (Moralis, isLoggedIn) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    // if(!isLoggedIn) return;
    async function connectWeb3() {
      try {
        const w3 = await new Web3(window.etherium || networkChainUrl);
        setContract(new w3.eth.Contract(CONTRACT_ABI, BALLOON_TOKEN_ADDRESS));
      } catch (err) {
        console.log(err);
      }
    }
    connectWeb3();
  }, [isLoggedIn]);

  return {
    web3: web3,
    contract: contract,
  };
};

/** USE CHAIN REACT HOOK */
export const useChain = () => {
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const handleChainChanged = (_chainId) => {
      setChainId(fromHex(_chainId));
    };
    window.ethereum?.on("chainChanged", handleChainChanged);
    setChainId(fromHex(window.ethereum?.chainId));
    return () => {
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  /**
   * @param { object } chain - chain object to switch to.
   * get your chain from here - https://chainid.network/chains.json
   */
  const switchChain = (chain) => {
    const params = {
      chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol, // 2-6 characters long
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc,
      blockExplorerUrls: [
        chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
          ? chain.explorers[0].url
          : chain.infoURL,
      ],
    };
    let promise;
    if (
      chain.chainId === 1 ||
      chain.chainId === 3 ||
      chain.chainId === 4 ||
      chain.chainId === 5 ||
      chain.chainId === 42
    ) {
      promise = window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(chain.chainId) }],
      });
    }
    promise = window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params],
    });
    promise
      .then((chainCh) => {
        setChainId(chain.chainId);
      })
      .catch((err) => {
        console.log(err);
      });
    return promise;
  };

  return {
    chainId,
    setChainId,
    switchChain,
  };
};

/*Moralis.enableWeb3({provider: networkChainUrl})
    .then((w3) => {
      setWeb3(w3);
      setContract(new w3.eth.Contract(CONTRACT_ABI,BALLOON_TOKEN_ADDRESS));
    })
    .catch((err) => {
      console.log(err);
    });*/
