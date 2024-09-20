"use client"
import React, { useState, useEffect } from 'react';
import { Grid, Card, Button, Typography, TextField, InputAdornment } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useKalpApi } from '@/hooks/useKalpAPI';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#333',
    },
    secondary: {
      main: '#666',
    },
  },
});

const Home: React.FC = () => {
  const { claim, balanceOf, totalSupply, transferFrom, Name, Symbol, Initialize, loading } = useKalpApi();
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [totalAirdrop, setTotalAirdrop] = useState(0);
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState(0);
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [transferResult, setTransferResult] = useState("");

  const handleClaim = async () => {
    try {
      const data = await claim(walletAddress);
      await handleTotalSupply();
      console.log('Claim successful:', data);
    } catch (err) {
      console.error('Claim error:', err);
    }
  };

  const handleBalanceOf = async () => {
    try {
      const data = await balanceOf(walletAddress);
      setBalance(data.result.result)
      console.log('Balance:', data);
    } catch (err) {
      console.error('BalanceOf error:', err);
    }
  };

  const handleTotalSupply = async () => {
    try {
      const data = await totalSupply();
      setTotalAirdrop(data.result.result)
      console.log('Total Supply:', data);
    } catch (err) {
      console.error('TotalSupply error:', err);
    }
  };

  const handleName = async () => {
    try {
      const data = await Name(name);
      setTokenName(data.result.result)
      console.log('Token Name:', data);
    } catch (err) {
      console.error('Name error:', err);
    }
  };

  const handleSymbol = async () => {
    try {
      const data = await Symbol(symbol);
      setTokenSymbol(data.result.result)
      console.log('Token Symbol:', data);
    } catch (err) {
      console.error('Symbol error:', err);
    }
  };

  const handleTransferFrom = async () => {
    try {
      const data = await transferFrom(from, to, value);
      setTransferResult(`Transfer successful: ${data.result.result}`);
      console.log('TransferFrom:', data);
    } catch (err) {
      console.error('TransferFrom error:', err);
      setErrorMessage(err.result);
    }
  };

  const handleInitialize = async () => {
    if (!name || !symbol || !decimals) {
      console.error("Please fill in all the fields");
      return;
    }

    if (isNaN(decimals)) {
      console.error("Decimals must be a valid number");
      return;
    }

    try {
      const data = await Initialize(name, symbol, decimals);
      console.log('Initialize:', data);
    } catch (err) {
      console.error('Initialize error:', err);
    }
  };

  useEffect(() => {
    handleTotalSupply();
    handleName();
    handleSymbol();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2} className="grid-container">
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">Enter Your Address To Claim</Typography>
            <TextField
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-lock" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleClaim} disabled={loading} className="btn-claim">
              {loading ? "Please wait.." : "Claim"}
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">Total Airdrop Token Claimed</Typography>
            <Typography variant="h4" className="card-value">{totalAirdrop}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">My Balance</Typography>
            <TextField
              type="text"
              placeholder="Enter your wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-lock" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleBalanceOf} className="btn-balance">
              See
            </Button>
            <Typography variant="h4" className="card-value">Balance: <span className="text-blue-500">{balance}</span></Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">Token Information</Typography>
            <Typography variant="h4" className="card-value">Token Name: {tokenName}</Typography>
            <Typography variant="h4" className="card-value">Token Symbol: {tokenSymbol}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">Transfer From</Typography>
            <TextField
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-arrow-right" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="text"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-arrow-right" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.valueAsNumber)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-coins" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleTransferFrom} className="btn-transfer">
              Transfer
            </Button>
            {errorMessage && (
              <Typography variant="body1" color="error" className="error-message">
                {errorMessage}
              </Typography>
            )}
            {transferResult && (
              <Typography variant="body1" color="success" className="success-message">
                {transferResult}
              </Typography>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} className="card-container">
          <Card className="card">
            <Typography variant="h5" className="card-title">Initialize Token</Typography>
            <TextField
              type="text"
              placeholder="Token Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-tag" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="text"
              placeholder="Token Symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-tag" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              placeholder="Decimals"
              value={decimals}
              onChange={(e) => setDecimals(e.target.valueAsNumber)}
              fullWidth
              className="input-field"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <i className="fas fa-hashtag" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleInitialize} className="btn-initialize">
              Initialize
            </Button>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Home;