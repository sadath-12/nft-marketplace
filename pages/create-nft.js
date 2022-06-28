import React, { useCallback, useContext, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import images from "../assets";
import { useTheme } from "next-themes";
import Image from "next/image";
import {Input,Button} from "../components";
import { NFTContext } from "../context/NFTContext";
import { useRouter } from "next/router";
import { create as ipfsHttpClient } from "ipfs-http-client";

const CreateNFT = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput,setFormInput]=useState({price:'',name:'',description:''})
  const { theme } = useTheme();
  const {uploadToInfura,createNFT}=useContext(NFTContext)

//  const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

//     const uploadToInfura = async (file) => {
//       try {
//         const added = await client.add({ content: file });

//         const url = `https://ipfs.infura.io/ipfs/${added.path}`;

//         setFileUrl(url);
//       } catch (error) {
//         console.log("Error uploading file: ", error);
//       }
//     };

//     console.log(fileUrl)

  //useCallback will memory the returned value while use useMemo memorise the function
 const onDrop = useCallback(async (acceptedFile) => {
 const url=  await uploadToInfura(acceptedFile[0]);
 setFileUrl(url)
 }, []);

   const {
     getRootProps,
     getInputProps,
     isDragActive,
     isDragAccept,
     isDragReject,
   } = useDropzone({
     onDrop,
     accept: "image/*",
     maxSize: 5000000,
   });

   const router = useRouter()

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
       ${isDragActive ? " border-file-active " : ""} 
       ${isDragAccept ? " border-file-accept " : ""} 
       ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept]
  );


  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold minlg:text-4xl ml-4 xs:ml-0">
          Create new NFT
        </h1>
        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload File
          </p>
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="file upload"
                    className={theme === "light" ? "filter invert" : undefined}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>

            {fileUrl && (
              <aside>
                <div>
                  <img src={fileUrl} alt="asset_file" />
                </div>
              </aside>
            )}
          </div>
        </div>

        <Input
          inputType="text"
          title="Name"
          placeholder="NFT name"
          handleClick={(e) => {
            setFormInput({ ...formInput, name: e.target.value });
          }}
        />
        <Input
          inputType="textarea"
          title="Description"
          placeholder="NFT Description"
          handleClick={(e) => {
            setFormInput({ ...formInput, description: e.target.value });
          }}
        />
        <Input
          inputType="number"
          title="Price"
          placeholder="NFT Price"
          handleClick={(e) => {
            setFormInput({ ...formInput, price: e.target.value });
          }}
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName="Create NFT"
            classStyles="rounded-xl"
            handleClick={() => {
              createNFT(formInput, fileUrl, router);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateNFT;
