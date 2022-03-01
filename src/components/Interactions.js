import React, { useState } from "react";
import {Contract, ethers} from 'ethers';
import { Button,Text } from "@chakra-ui/react";

const Interactions=(props)=>{

    const[transferHash,setTransferHash] = useState(null);
    const [receiverAddress,setReceiverAddress] = useState(null);
    
    const transferHandler=async(e)=>{
        e.preventDefault();
        let transferAmount = e.target.sendAmount.value;
        let receiverAddress = e.target.receiverAddress.value;


        let txt = await props.contract.transfer(receiverAddress,transferAmount);
        setTransferHash(txt.hash);
        setReceiverAddress('');

    }
    return(
        <div>
            <form onSubmit={transferHandler} >
                <Text fontSize='2xl' fontWeight='bold'>Transfer Coins</Text>
                <Text fontSize='2xl' fontWeight='bold' mt='5'>Receiver Address</Text>
                <input type='text' id='receiverAddress'/>
                <Text fontSize='2xl' fontWeight='bold' mt='5' >Send Amount</Text>
                <input type='number' id="sendAmount" min='0' step='0.1'/>
                <br/>
                <Button mt='5' colorScheme='purple' size='lg' type="submit">Send</Button>
                <div>
                    {transferHash}
                </div>
            </form>
        </div>
    )
}

export default Interactions;