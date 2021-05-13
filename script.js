const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]


toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})



function Increment( aa)
{
  var a=aa.value;
   // var a=document.getElementById("text1").value ;
    var b=parseInt(a);
    console.log(b);
    aa.value =b+1;

}

function Decrement(aa)
{
  var a=aa.value;
    //var a=document.getElementById("text1").value ;
    var b=parseInt(a);
    console.log(b);
    if(a!="0")
    aa.value = b-1;  
}

function BuyNow(Iteamcount,Imageurl)
{
  console.log(Iteamcount.value);
  console.log(Imageurl.src);
  var elem = document.createElement("img");  ;
elem.setAttribute("src", Imageurl.src);
elem.setAttribute("height", "768");
elem.setAttribute("width", "1024");
elem.setAttribute("alt", "GROCERY");
console.log(elem);
document.getElementById("amount").value=100;
document.getElementById("cartpage").appendChild("elem");
}

function alert()
{
  console.log("hi");
}
