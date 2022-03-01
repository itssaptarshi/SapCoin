import React, { useEffect, useState } from "react";
import Sapcoin_abi from '../Contracts/Sapcoin_abi.json'
import Interactions from './Interactions'
import {ethers} from 'ethers';
import {Button, Center, Flex, Text} from '@chakra-ui/react';

function Wallet(){
    const contractAddress='0x450E31855e1B7092A33852881b2a0B88c160cC5D';
    const[connectButtonText,setConnectButtonText]=useState('Connect Wallet');
    const[defaultAccount,setDefaultAccount] = useState(null);
    const[balance,setBalance] = useState(null)

    const[provider,setProvider] = useState(null);
    const[signer,setSigner] = useState(null);
    const[contract,setContract] = useState(null);

    const connectWalletHandler =()=>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result=>{
                accountChangeHandler(result[0]);
                setConnectButtonText('Connected')
            })
            .catch(e=>{
                console.log(e)
            })
        }else{
            console.log('Install Metamask');
        }

        const accountChangeHandler = (newAddress) =>{
            setDefaultAccount(newAddress);
            updateEthers();
        }
        const updateEthers=() =>{
            let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
            let tempSigner = tempProvider.getSigner();
            let tempContract = new ethers.Contract(contractAddress,Sapcoin_abi,tempSigner);
            setProvider(tempProvider);
            setSigner(tempSigner);
            setContract(tempContract);
        } 
    }

    useEffect(()=>{
        if(contract!=null){
            updateBalance();
        }
    },[contract])

    const updateBalance=async()=>{
        let balanceBig = await contract.balanceOf(defaultAccount);
        let balanceN = balanceBig.toString();
        let decimals = await contract.decimals();
        let tokenBalance = balanceN/Math.pow(10,decimals);
        setBalance(tokenBalance);
    }
    return(
        <div>
            <Flex direction='column' 
                justifyContent='center' 
                alignItems='center'
                width='100vw'
                height='100vh'
                bgGradient='linear(to-br,red.200,blue.300)'
                >
                    <Text fontSize='5xl' fontWeight='bold' mt='6' mb='6'>SapCoin Wallet</Text>
                    <Button mb='5' colorScheme='purple' size='lg' onClick={connectWalletHandler}>{connectButtonText}</Button>
                    <div>
                        <Text fontSize='2xl' fontWeight='bold' mb='5'>Address: {defaultAccount}</Text>
                    </div>
                    <div>
                        <Text fontSize='2xl' fontWeight='bold' mb='5'>Balance : {balance}</Text>
                    </div>
                    <Interactions contract={contract}/>
        </Flex>
        </div>
    )
}

export default Wallet;