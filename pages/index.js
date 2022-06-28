import { useContext, useEffect, useRef, useState } from "react";
import images from "../assets";
import Image from "next/image";
import { useTheme } from "next-themes";
import { makeId } from "../utils/makeId";
import { NFTCard, Banner, CreatorCard, SearchBar, Loader } from "../components";
import { NFTContext } from "../context/NFTContext";
import { getCreators } from "../utils/getTopCreators";
import { shortenAddress } from "../utils/shorteinAddress";

const Home = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const parentRef = useRef(null);
  const scrollRef = useRef(null);
  const { theme } = useTheme();
  const [activeSelect, setActiveSelect] = useState("Recently added");

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      setNftCopy(items);
      setIsLoading(false);
    });
  }, []);

  if (typeof window !== "undefined") {
    const scrollAmount = window.innerHeight > 1800 ? 270 : 210;
  }

  const handleScroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;
    console.log(current?.scrollWidth);
    console.log(parent?.scrollWidth);
    console.log(parent?.offsetWidth);

    if (current?.scrollWidth >= parent?.offsetWidth) {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  };
  useEffect(() => {
    isScrollable();
    window.addEventListener("resize", isScrollable);
    return () => {
      window.removeEventListener("resize", isScrollable);
    };
  });

  const topCreators = getCreators(nftsCopy);
  console.log(topCreators);

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case "Price (low to high)":
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case "Price (high to low)":
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case "Recently added":
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  const onHandleSearch = (value) => {
    // value -> test
    const filteredNfts = nfts.filter(({ name }) =>
      name.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  return (
    <>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <Banner
            name={
              <>
                {" "}
                Discover, collect, and sell <br /> extraordinary{" "}
              </>
            }
            childStyles="md:text-4xl sm:text-2xl xs:text-lg text-left"
            parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          />

          {!isLoading && !nfts.length ? (
            <h1>That's weird .. No NFTs for sale!</h1>
          ) : isLoading ? (
            <Loader />
          ) : (
            <>
              <div>
                <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold minlg:text-4xl ml-4 xs:ml-0">
                  Top Sellers
                </h1>

                <div
                  className="relative flex-1 max-w-full flex mt-3"
                  ref={parentRef}
                >
                  <div
                    className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                    ref={scrollRef}
                  >
                    {topCreators.map((creator, i) => (
                      <CreatorCard
                        key={creator.seller}
                        rank={i + 1}
                        creatorImage={images[`creator${i + 1}`]}
                        creatorName={shortenAddress(creator.seller)}
                        creatorEths={creator.sum}
                      />
                    ))}
                    {/* {[6, 7, 8, 9, 10].map((i) => (
                  <CreatorCard
                    key={`Creator-${i}`}
                    rank={i}
                    creatorImage={images[`creator${i}`]}
                    creatorName={`0x${makeId(3)}....${makeId(3)}`}
                    creatorEths={10 - i * 0.5}
                  />
                ))} */}

                    {!hideButtons && (
                      <>
                        <div
                          onClick={() => {
                            handleScroll("left");
                          }}
                          className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                        >
                          <Image
                            src={images.left}
                            layout="fill"
                            objectFit="contain"
                            alt="left_arrow"
                            className={theme === "light" ? "filter invert" : ""}
                          />
                        </div>
                        <div
                          onClick={() => {
                            handleScroll("right");
                          }}
                          className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                        >
                          <Image
                            src={images.right}
                            layout="fill"
                            objectFit="contain"
                            alt="left_arrow"
                            className={theme === "light" ? "filter invert" : ""}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                  <h1 className=" flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold minlg:text-4xl sm:mb-4">
                    Hot Bids
                  </h1>
                  <div className="flex-2 flex sm:w-full w-full flex-row sm:flex-col">
                    <SearchBar
                      activeSelect={activeSelect}
                      setActiveSelect={setActiveSelect}
                      handleSearch={onHandleSearch}
                      clearSearch={onClearSearch}
                    />
                  </div>
                </div>
                <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
                  {nfts.map((nft) => (
                    <NFTCard key={nft.tokenId} nft={nft} />
                  ))}
                  {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <NFTCard
                  key={`nft-${i}`}
                  nft={{
                    i,
                    name: `Nifty NFT ${i}`,
                    price: (10 - i * 0.534).toFixed(2),
                    seller: `0x${makeId(3)}....${makeId(3)}`,
                    owner: `0x${makeId(3)}....${makeId(3)}`,
                    description: "Cool NFT on sale",
                  }}
                />
              ))} */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
