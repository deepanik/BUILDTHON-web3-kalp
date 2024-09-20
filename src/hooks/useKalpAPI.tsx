"use client"
import { useState } from 'react';

export const useKalpApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const callApi = async (endpoint: string, args : { [key: string]: any }) => {
    setError(null);
    const params = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: '316a22284d15853309d3684a74cc892fcfab67c4',
      args: args,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setLoading(false);
      return data;
    } catch (err : any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const claim = async (address : string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/Claim';
    const args = {
      amount: 100,
      address: address,
    };
    return callApi(endpoint, args);
  };

  const balanceOf = async (account : string) => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/BalanceOf';
    const args = {
      account: account,
    };
    return callApi(endpoint, args);
  };

  const totalSupply = async () => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/TotalSupply';
    const args = {};
    return callApi(endpoint, args);
  };

  const transferFrom = async (from: string, to: string, value: number) => {
    const endpoint = 
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/TransferFrom';
    const args = {
      from: from,
      to: to,
      value: value,
    };
    return callApi(endpoint, args);
  };

  const Name = async (from: string, to: string, value: number) => {
    const endpoint = 
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/Name';
    const args = {
      from: from,
      to: to,
      value: value,
    };
    return callApi(endpoint, args);
  };

  const Symbol = async (from: string, to: string, value: number) => {
    const endpoint = 
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/Symbol';
    const args = {
      from: from,
      to: to,
      value: value,
    };
    return callApi(endpoint, args);
  };

  const Initialize = async (from: string, to: string, value: number) => {
    const endpoint = 
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/q41wO1sm3XoGVk4azta9pwbYH0nK6ChQ1726863225205/Initialize';
    const args = {
      from: from,
      to: to,
      value: value,
    };
    return callApi(endpoint, args);
  };


  return { claim, balanceOf, totalSupply, transferFrom, Name, Symbol, Initialize,  loading, error };
};


