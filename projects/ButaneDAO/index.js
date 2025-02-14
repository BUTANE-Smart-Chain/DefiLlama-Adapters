const sdk = require('@defillama/sdk');
const MINT_TOKEN_CONTRACT = '0x1f3Af095CDa17d63cad238358837321e95FC5915';
const MINT_CLUB_BOND_CONTRACT = '0x8BBac0C7583Cc146244a18863E708bFFbbF19975';

async function tvl(_, _1, _2, { api }) {
  const balances = {};

  const collateralBalance = await api.call({
    abi: 'erc20:balanceOf',
    target: MINT_TOKEN_CONTRACT,
    params: [MINT_CLUB_BOND_CONTRACT],
  });

  await sdk.util.sumSingleBalance(balances, MINT_TOKEN_CONTRACT, collateralBalance, api.chain)

  return balances;
}

module.exports = {
  timetravel: true,
  misrepresentedTokens: false,
  methodology: 'counts the number of MINT tokens in the Club Bonding contract.',
  start: 1000235,
  bsc: {
    tvl,
  }
}; 