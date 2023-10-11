

import { signinFirebase, SignupFirebase,postAdToDB,uploadimage,getAdsFromDB,} from "./firebase.js";

window.signUp = async function(){
   var userName = document.getElementsByTagName('input')[0].value
   var age = document.getElementsByTagName('input')[1].value
   var email = document.getElementsByTagName('input')[2].value
   var password = document.getElementsByTagName('input')[3].value

   try {
       await SignupFirebase({email,password,userName,age})
       alert("Registered Successfully")


   } catch (e) {
       const errorElem = document.getElementById("error")
       errorElem.innerHTML  = e.message
       
   }
   window.open('login.html')

}


window.signin =async function(){
    var userName=document.getElementsByTagName('input')[0].value
   var email = document.getElementsByTagName('input')[1].value
   var password = document.getElementsByTagName('input')[2].value
   try {
       await signinFirebase(email,password,userName)
       alert("loggined Successfully")


   } catch (e) {
       alert(e.message)
   }
}
window.postAd = async function(){
    const title = document.getElementById("title").value
    const price = document.getElementById("price").value
    const image = document.getElementById("image").files[0]

    try {
        const imageUrl = await uploadimage(image)
       await postAdToDB(title,price,imageUrl)
       alert("Ad Posted Successfully")
        
    } catch (e) {
        alert(e.message)
    }
}

async function getAds(){
    const adds = await getAdsFromDB()
    const adsBody = document.getElementById("ads-body")
    // for(var i = 0; i<= ads.length; i++){
    //     ads[i]
    // }

    for (let item of adds){
        // console.log(item);
        adsBody.innerHTML += `
         <div class="ad-item"  onclick = "adDetail('${item.id}')"  > 
       
        <h2>${item.title}</h2>
        <p>${item.price} </p>
        <img src="${item.imageUrl}" alt="">
    </div>
    ` 


}
}



window.adDetail = async function (e) {
    const adId = e
    location.href = `detail.html?id=${adId}`
    console.log(adId)
}



window.showAdDetail = async function () {
    let eqTo = location.href.indexOf('=')
    const adToGet = location.href.slice(eqTo + 1,)
    console.log("current AD Id : " + adToGet)
    const ads = await getAdsFromDB()
    console.log(ads)
    var adDetaill = document.getElementById("detail-page-cont")
   for (let item of ads){
    if(item.id === adToGet){
        adDetaill.innerHTML +=`
        <div class="child">
        <div class="swiper">

            <div class="swiper-wrapper">

                <div class="swiper-slide"><img src=${item.imageUrl}></div>
                <div class="swiper-slide"><img src="C:\Users\pce\Downloads\pro_1.jpg" alt=""></div>
                <div class="swiper-slide"><img src="C:\Users\pce\Downloads\pro_1.jpg" alt=""></div>
                ...
            </div>

            <div class="swiper-pagination"></div>


            <div class="swiper-button-prev" id="prewiew"></div>
            <div class="swiper-button-next" id="next"></div>



        </div>
        <div class="discribtion">
            <h3>Discribtion</h3>
            <p>Discounted Prices From Rs:1000/- To Rs:/-2500
                We Have Cash on Delivery And Visit My Outlet At 56 B bankers town near Dha phase 5 and mid of state Life
                ring road Lahore</p>
        </div>
        <div class="product-details">
            <div class="box">
                <div class="price">
                 <h3> ${item.title}</h3>
                 <h2 class="head">${item.price} </h2>
                    <div>
                        <p><i class="fa-regular fa-heart" id="heart"></i></p>
                        <p><i class="fa-sharp fa-solid fa-share-nodes" id="share"></i></p>
                        
                   
                        <span class="place">Others, Bhalwal</span>
                        <span class="time">9 minutes ago</span>

                    </div>
                </div>
            </div>
        </div>
        <div class="chat">
            <h1>Seller Description</h1>
            <p><i class="fa-solid fa-user"></i></p>
           

            <div class="seller">
                <p>chat with seller</p>
                <p> <i class="fa-regular fa-phone"></i></p>

            </div>
        </div>

    </div>
        
        `
    }
   }
}


getAds()












