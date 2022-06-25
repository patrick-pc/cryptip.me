import { useMemo } from 'react'
import { useEnsAvatar } from 'wagmi'
import { emojiAvatarForAddress } from './emojiAvatarForAddress'

const Avatar = ({ address, size, squircle }) => {
  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
  })
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  )

  return ensAvatar ? (
    <div className='block'>
      <div
        className={`bg-cover bg-center ${
          squircle ? 'mask mask-squircle' : 'rounded-full'
        }`}
        style={{
          backgroundImage: `url(${ensAvatar})`,
          height: size,
          width: size,
        }}
      />
    </div>
  ) : (
    <div className='block'>
      <div
        className={`flex items-center justify-center overflow-hidden ${
          squircle ? 'mask mask-squircle' : 'rounded-full'
        }`}
        style={{
          ...(!ensAvatar && { backgroundColor }),
          height: size,
          width: size,
          fontSize: size / 2,
        }}
      >
        {emoji}
      </div>
    </div>
  )
}

export default Avatar
