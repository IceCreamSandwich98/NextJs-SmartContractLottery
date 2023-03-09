//get function to call lottery

import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"
import { useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

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
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setTheRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "enterRaffle",
        params: {},
        msgValue: enteranceFee,
    })

    const { runContractFunction: getEnteranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "getEnteranceFee",
        params: {},
        ///
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "getNumberOfPlayers",
        params: {},
        ///
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress, //specificy network id
        functionName: "getRecentWinner",
        params: {},
        ///
    })

    async function updateUi() {
        const enteranceFeeFromCall = (await getEnteranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        setNumPlayers(numPlayersFromCall)
        setTheRecentWinner(recentWinnerFromCall)
        setEnteranceFee(enteranceFeeFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            //try to read raffle enterance fee

            updateUi()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUi()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "transaction complete!",
            title: "tx notification",
            position: "topR",
            icon: "bell",
        })
    }

    return (
        <div className="p-5 ">
            Hi from LotteryEntrance
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async () => {
                            await enterRaffle({
                                // once this function suceeds (enterRaffle) call the "handleSucess" function -> handleNewNotification -> dispatch(params)
                                onSuccess: handleSuccess,
                                //throw error if failed
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isLoading || isFetching}
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    Enterence Fee : {ethers.utils.formatUnits(enteranceFee, "ether")} Eth <br></br>
                    Number Of Players : {numPlayers} <br></br>
                    Recent Winner : {recentWinner}
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}
