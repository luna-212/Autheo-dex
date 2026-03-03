"use client";

import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0xbA3Df320996eed030a418413e239be44f28C0e3F";

const ABI = [
  "function stake(uint256 amount) external",
    "function unstake(uint256 amount) external",
      "function claim() external",
      ];

      export default function Home() {
        const [account, setAccount] = useState("");
          const [amount, setAmount] = useState("");

            const getEthereum = () => {
                if (typeof window === "undefined") return null;
                    return (window as any).ethereum ?? null;
                      };

                        async function connectWallet() {
                            const eth = getEthereum();
                                if (!eth) {
                                      alert("Install MetaMask");
                                            return;
                                                }

                                                    const provider = new ethers.BrowserProvider(eth);
                                                        const accounts = await provider.send("eth_requestAccounts", []);
                                                            setAccount(accounts[0]);
                                                              }

                                                                async function stake() {
                                                                    if (!amount) return;

                                                                        const eth = getEthereum();
                                                                            if (!eth) return;

                                                                                const provider = new ethers.BrowserProvider(eth);
                                                                                    const signer = await provider.getSigner();
                                                                                        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

                                                                                            const tx = await contract.stake(
                                                                                                  ethers.parseUnits(amount, 18)
                                                                                                      );

                                                                                                          await tx.wait();
                                                                                                              alert("Stake success!");
                                                                                                                }

                                                                                                                  async function unstake() {
                                                                                                                      if (!amount) return;

                                                                                                                          const eth = getEthereum();
                                                                                                                              if (!eth) return;

                                                                                                                                  const provider = new ethers.BrowserProvider(eth);
                                                                                                                                      const signer = await provider.getSigner();
                                                                                                                                          const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

                                                                                                                                              const tx = await contract.unstake(
                                                                                                                                                    ethers.parseUnits(amount, 18)
                                                                                                                                                        );

                                                                                                                                                            await tx.wait();
                                                                                                                                                                alert("Unstake success!");
                                                                                                                                                                  }

                                                                                                                                                                    async function claim() {
                                                                                                                                                                        const eth = getEthereum();
                                                                                                                                                                            if (!eth) return;

                                                                                                                                                                                const provider = new ethers.BrowserProvider(eth);
                                                                                                                                                                                    const signer = await provider.getSigner();
                                                                                                                                                                                        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

                                                                                                                                                                                            const tx = await contract.claim();
                                                                                                                                                                                                await tx.wait();
                                                                                                                                                                                                    alert("Reward claimed!");
                                                                                                                                                                                                      }

                                                                                                                                                                                                        return (
                                                                                                                                                                                                            <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6">
                                                                                                                                                                                                                  <h1 className="text-3xl font-bold">
                                                                                                                                                                                                                          Autheo Staking Dashboard
                                                                                                                                                                                                                                </h1>

                                                                                                                                                                                                                                      {!account ? (
                                                                                                                                                                                                                                              <button
                                                                                                                                                                                                                                                        onClick={connectWallet}
                                                                                                                                                                                                                                                                  className="px-6 py-3 bg-purple-600 rounded-lg"
                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                    Connect Wallet
                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                  ) : (
                                                                                                                                                                                                                                                                                                          <p className="text-green-400">
                                                                                                                                                                                                                                                                                                                    Connected: {account}
                                                                                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                                                                                  )}

                                                                                                                                                                                                                                                                                                                                        <input
                                                                                                                                                                                                                                                                                                                                                type="text"
                                                                                                                                                                                                                                                                                                                                                        placeholder="Amount"
                                                                                                                                                                                                                                                                                                                                                                value={amount}
                                                                                                                                                                                                                                                                                                                                                                        onChange={(e) => setAmount(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                                                className="px-4 py-2 text-black rounded"
                                                                                                                                                                                                                                                                                                                                                                                      />

                                                                                                                                                                                                                                                                                                                                                                                            <div className="flex gap-4">
                                                                                                                                                                                                                                                                                                                                                                                                    <button
                                                                                                                                                                                                                                                                                                                                                                                                              onClick={stake}
                                                                                                                                                                                                                                                                                                                                                                                                                        className="px-6 py-2 bg-green-600 rounded"
                                                                                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                                                                                          Stake
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                          <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                    onClick={unstake}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              className="px-6 py-2 bg-red-600 rounded"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Unstake
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          onClick={claim}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    className="px-6 py-2 bg-blue-600 rounded"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            >
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      Claim
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }