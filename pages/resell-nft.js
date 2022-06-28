import React, { useContext, useEffect, useState } from 'react'
import {NFTContext} from '../context/NFTContext'
import  {useRouter} from 'next/router'
import axios from 'axios'
import { Button, Input,Loader } from "../components";


const ResellNFT = () => {
  const [isLoading,setLoading]=useState(true)

  const {createSale}=useContext(NFTContext)
  const router =useRouter() 
const [price,setPrice]=useState('')
const [image,setImage]=useState('')
  const {tokenId,tokenURI,id}=router.query
  console.log('tokenUri',tokenURI)

  


  const fetchNFT=async()=>{
    if(!tokenURI) return ;

    const {data} = await axios.get(tokenURI);
    console.log(data)
   setPrice(data.price)
   setImage(data.image)
   setLoading(false)
  }

//   if(isLoading){
//     return (
//       <div className='flexStart min-h-screen'>
// <Loader/>
//       </div>

//     )
//   }

  useEffect(()=>{
    if(tokenURI) fetchNFT()

  },[tokenURI])

  const resell=async()=>{
     await createSale(tokenURI,price,true,tokenId)
router.push('/')
  }

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>

        <Input
          inputType="number"
          title="Price"
          placeholder="Asset Price"
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && <img className="rounded mt-4" width="350" src={image} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="List NFT"
            btnType="primary"
            classStyles="rounded-xl"
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
}

export default ResellNFT