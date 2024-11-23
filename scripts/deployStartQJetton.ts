import { Address, toNano } from '@ton/core';
import { StarQJetton } from '../wrappers/StarQJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "5DHub-StarQ",
        description: "5DHub StarQ jetton for StarQ application in Telegram market",
        symbol: "5DSQa",
        image: "https://static.tildacdn.net/tild3038-6637-4832-b530-643933356137/5dh_logo_b.png",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const starQJetton = provider.open(await StarQJetton.fromInit(provider.sender().address as Address, content, 1000000000000000000n));

    await starQJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100000000000000000n,
            receiver: provider.sender().address as Address
        }
    );

    await provider.waitForDeploy(starQJetton.address);

    // run methods on `starQJetton`
}