import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import images from "../assets";
import { useTheme } from "next-themes";

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  //useCallback will memory the returned value while use useMemo memorise the function

  const onDrop=useCallback(()=>{
    // upload image to the ipfs

  },[])

  const {getRootProps,getInputProps,isDragActive,isDragAccept,isDragReject}=useDropzone({
    onDrop,
    accept:'image/*',
    maxSize:5000000,
  })

  const fileStyle=useMemo(()=>{
   `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed`
  },[])

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold minlg:text-4xl ml-4 xs:ml-0">Create new NFT</h1>
        <div className="mt-16">
<p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
Upload File
</p>
<div className="mt-4">
<div {...getInputProps()} className={fileStyle} >
  <input {...getInputProps()}   />
</div>
</div>
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
