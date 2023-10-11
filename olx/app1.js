


var uploaded_image="";

var image_input=document.getElementById('image')
image_input.addEventListener("change",function  (){
    const reader=new FileReader();
    reader.addEventListener("load",function(){
        uploaded_image=reader.result;
    document.getElementById('child4').style.backgroundImage=`url(${uploaded_image})`
})
   reader.readAsDataURL(this.files[0]) 
})
