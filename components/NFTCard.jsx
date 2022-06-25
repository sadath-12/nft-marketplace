import React from 'react'
import Image from 'next/image'
import images from '../assets'
import Link from 'next/link'

const NFTCard = ({nft}) => {
  return (
    <Link href={{ pathname: "/nft-details", query:  nft  }}>
      <div className="flex-1 min-w-215 max-w-max xs:max-w-none sm:w-full sm:min-w-155 minmd:min-w-256 minlg:min-w-327 bg-nft-black-3 rounded-2xl p-4 m-4 minlg:m-8 sm:m-2 cursor-pointer shadow-lg">
        <div className="relative w-full h-52 sm:h-36 xs:h-56 minmd:h-60 minlg:h-300 rounded-2xl overflow-hidden">
          <Image
            src={nft.Image || images[`nft${nft.i}`]}
            layout="fill"
            objectFit="cover"
            alt={`nft${nft.i}`}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
            {nft.name}
          </p>
          <div className='flexBetween mt-3 minlg:mt-3 flex-row xs:flex-col xs:items-start xs:mt-3'>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-lg">
              {nft.price} <span className="normal"></span>ETH{" "}
            </p>
            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-lg">
              {nft.seller}
            </p>
          </div>
        </div>
        {nft.name}
      </div>
    </Link>
  );
}

export default NFTCard