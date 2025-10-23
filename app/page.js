"use client";

import { useState, useEffect } from "react";
import { getEthPrice } from "../utils/getEthPrice";

export default function Home() {
  const [gwei, setGwei] = useState("");
  const [priorityFee, setPriorityFee] = useState("");
  const [gas, setGas] = useState("");
  const [resultEth, setResultEth] = useState(null);
  const [ethPrice, setEthPrice] = useState(null);

  useEffect(() => {
    getEthPrice().then((price) => setEthPrice(price));
  }, []);

  const calculateFee = () => {
    const gweiToEth = (gwei * 1e-9) || 0;
    const priorityToEth = (priorityFee * 1e-9) || 0;
    const totalFeeEth = (gweiToEth + priorityToEth) * gas || 0;
    setResultEth(totalFeeEth.toFixed(8));
  };

  const resultInUsd = resultEth && ethPrice ? (resultEth * ethPrice).toFixed(2) : null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
            EVM Fee Calculator
          </h1>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gwei
            </label>
            <input
              type="number"
              value={gwei}
              onChange={(e) => setGwei(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              placeholder="Enter Gwei"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Priority Fee(Gwei)
            </label>
            <input
              type="number"
              value={priorityFee}
              onChange={(e) => setPriorityFee(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              placeholder="Enter Priority Fee"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gas (Units)
            </label>
            <input
              type="number"
              value={gas}
              onChange={(e) => setGas(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 text-gray-700"
              placeholder="Enter Gas Units"
            />
          </div>
          <button
            onClick={calculateFee}
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
          >
            Calculate
          </button>
          {resultEth !== null && (
            <div className="mt-6 bg-gray-100 p-4 rounded-lg text-center">
              <h2 className="text-xl font-bold text-gray-700">Total Fee</h2>
              <p className="text-2xl text-blue-500">
                {resultEth} ETH{" "}
                {resultInUsd && (
                  <span className="text-gray-500 text-lg">(${resultInUsd})</span>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      <footer className="bg-gray-200 text-center py-4">
        <p className="text-sm text-gray-600">
        Copyright (c) 2025 <a href="https://github.com/0xFillin" target="_blank" rel="noopener noreferrer" className="text-blue-500">0xFillin</a>
        </p>
      </footer>
    </div>
  );
}
