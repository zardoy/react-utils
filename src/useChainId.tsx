import { useEffect, useState } from 'react'
import { useChainId } from 'wagmi'
import { watchNetwork } from '@wagmi/core'

export default (supportedChains: {id, name, etherscan?}[]) => {
    const _chainId = useChainId()
    const [chainId, setChainId] = useState<number | null>(_chainId)

    useEffect(() => {
        watchNetwork(({ chain }) => {
            if (chain?.id) {
                setChainId(chain.id)
            }
        })
    }, [])

    const currentChain = supportedChains.find(({ id }) => id === chainId)

    return {
        chainId,
        supportedName: supportedChains[0]?.name || '',
        isUnsupported: !currentChain,
        etherscan: supportedChains[0]?.etherscan || '',
    }
}
