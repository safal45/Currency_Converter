import { useState } from 'react'
import {InputBox} from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'


function App() {

  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)

  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }
  
  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-teal-600 bg-no-repeat"
      style={{
        backgroundImage: `url('https://media.istockphoto.com/id/1503371245/photo/percentage-sign-on-top-of-coin-stacks-before-blue-financial-graph.webp?b=1&s=170667a&w=0&k=20&c=iMNT5BdW-v-hi1sy9MpkxdFllh3Ab2Qq_NQhZ3ZQdzc=')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-blue-100 rounded-lg p-5 backdrop-blur-sm bg-transparent">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1 bg-gray-800">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
                className="w-full mb-1 bg-silver-200"
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2  border border-gray-600  text-black rounded-md bg-red-400  px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
                className="w-full mb-1 bg-silver-200"
              />
            </div>
            <button
              type="submit"
              className="w-full  border border-gray-600  text-black px-4 py-3 rounded-lg bg-red-400"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App
