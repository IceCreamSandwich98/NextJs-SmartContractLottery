//get function to call lottery

import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"
import { useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
    // reason useMoralis knows our chain id is because back in our header component, the header passes up all teh information about the metamask wallet to the moralis provider
    // metamask current chain id --> moralis --> components
    //see app.js

    //gives hex id of chain id, must chain from hex -> regular
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

    //       state        function to update     starting val
    const [enteranceFee, setEnteranceFee] = useState("0")

    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "enterRaffle",
        params: {},
        msgValus: enteranceFee,
    })

    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "getEnteranceFee",
        params: {},
        ///
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read raffle enterance fee
            async function updateUi() {
                const enteranceFeeFromCall = (await getEnteranceFee()).toString()
                setEnteranceFee(enteranceFeeFromCall)
            }
            updateUi()
        }
    }, [isWeb3Enabled])

    return (
        <div>
            Hi from LotteryEntrance
            {raffleAddress ? (
                <div>
                    <button
                        onClick={async () => {
                            await enterRaffle()
                        }}
                    >
                        Enter Raffle
                    </button>
                    Enterence Fee : {ethers.utils.formatUnits(enteranceFee, "ether")} Eth
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
