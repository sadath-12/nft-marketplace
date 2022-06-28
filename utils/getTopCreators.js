export const getCreators=(nfts)=>{
    const creators = nfts.reduce((creatorObject,nft)=>{
(creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
console.log(creatorObject[nft.seller]);
console.log('creatorObject',creatorObject)
return creatorObject

// so here structures goes to { seller :{name:'',price:''} }

    },{})
    console.log('creators',creators)
   return Object.entries(creators).map((creator)=>{
    //this makes it to [ 0:seller,1:[ {his nft details} ] ]
        const seller = creator[0]
        console.log(creator)
        const sum = creator[1].map((item)=>Number(item.price)).reduce((prev,curr)=>prev+curr,0)
        console.log('seller',seller)
        console.log('sum',sum)
return ({seller,sum})
    })
}