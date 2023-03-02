import { useMoralis } from "react-moralis" //hook
import { useEffect } from "react" //hook

export default function ManualHeader() {
    //useMoralis is a hook. Hooks allows function components to keep track of state features... == we want our website to look different if we are / are not connected to a wallet
    //Hooks are great for re-rendering the website when a value changes... like if a new account is connected and needs to display a new addy
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis()
    // In order to be used, must be wrapped around a provider in APP.JS

    //takes 2 parameters, a function, and a array.
    //useEffect keepys checking values in array, if a value in the array is changed, its going to execute a function (1st parameter), then re-render frontend
    //automatically run on load, and run to check value
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    //if given no array, will run whenever site re-renders.. careful
    //if given empty array, will run once on load.
    //dependency, will run anytime something in dependency changes

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        //connect wallet
                        await enableWeb3()
                        //remeber login in local storage
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}
                    disabled={isWeb3EnableLoading}
                >
                    connect
                </button>
            )}
        </div>
    )
}
