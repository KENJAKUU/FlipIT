AOS.init();
/* cart */

displayCookie()


function displayCookie() {

    const cartcontainer = document.getElementById('cart-container');

    if (document.cookie.length == "") {

        document.getElementById('qr_container').style.display  = "none";
        cartcontainer.innerHTML = "<h3 class='roboto-mono' style='color: rgba(255, 255, 255, 0.2);'>no items in the cart</h1><br><a href='index.html' >back to home page</a>";
        document.getElementById('studentinfo').style.display = "none";
   
    } else {
       PaymentMethodChange()
       var cookiedata = getCookieValue('cart')
       var obj = JSON.parse(cookiedata);
    
       cartcontainer.innerHTML = "<div class='h-50 d-flex primarycolor rounded-3'>" + 
                  "<div class='col-md-3 col-4 p-2'><div class=' cart-item-image  rounded-3 '></div></div>" +
                  "<div class='col-md-9 p-3 col-8 '>" +
                  "<button " + "onclick='deleteCookie()'" + "class='float-end btn btn-dark btn-sm align-items-center justify-content-center d-flex' ' ><i class='fa-solid fa-x'></i></button>" +
                  "<p class='orbitron mt-2 mb-0 ' >" + obj.video + " " + obj.product + "</p>" +
                  "<p class='roboto-mono mb-0' style='color: rgba(255, 255, 255, 0.46);'>frames: " + obj.duration + " </p>" +
                  "<p class='roboto-mono' style='color: aqua;'>" + obj.price + "</p></div>" ;
    }
  }





function getCookieValue(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie() {

document.cookie = "cart=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
location.reload()

}


/* send data to webhooks */

function postOrder() {

  var cartdata = getCookieValue('cart')
  var cart = JSON.parse(cartdata);

  const name = document.getElementById('name').value;
  const studentNo = document.getElementById('studentNo').value;
  const outlook = document.getElementById('outlook').value;
  const section = document.getElementById('section').value;
  const userNumber = document.getElementById('phoneNumber').value;
  const orderPrice = cart.price
  const orderduration = cart.duration;
  const videoChoice = cart.video;
  const paymentoption = paymentmethod;


  if(paymentmethod == "Cash"){
    
    var orderOutput = "**Order:** " + videoChoice + " flipbook" + "\n**Student no:** " + studentNo + "\n**Outlook:** " + outlook + "\n**Section:** " +  section + "\n**Price:** " + orderPrice + "\n**Frames:** " + orderduration + "\n**Payment Method:** " + paymentmethod
  } else if(paymentmethod == "Gcash"){
    
    var orderOutput = "**Order:** " + videoChoice + " flipbook" + "\n**Student no:** " + studentNo + "\n**Outlook:** " + outlook + "\n**Section:** " +  section + "\n**Price:** " + orderPrice + "\n**Frames:** " + orderduration + "\n**Payment Method:** " + paymentmethod + "\n**Phone Number:** " + userNumber

  }
  const webhook = "https://discord.com/api/webhooks/1110210817590308934/e4u_bt8ZOmK82u3_zSvCH6hgWHj41KN_JkqKGbLgKouDEha1g8peIW-B1PiSFSX_jHxc"

  const request = new XMLHttpRequest();
    request.open("POST", webhook);
    request.setRequestHeader('Content-type', 'application/json');
    const params = {
      username: name,
      content: orderOutput
    }
    request.send(JSON.stringify(params));
    console.log("Message Send");

    


}



/* display gcash text fields*/ 


function PaymentMethodChange() {
  if (document.querySelector('input[name="payment-option"]:checked').value == "gcash") {
    document.getElementById('qr_container').style.display = "block";
    document.getElementById('phone-number-fillup').style.display = "block";
    document.getElementById('cash-info').style.display = "none";
    console.log('Selected GCash');

    paymentmethod = "Gcash"
    
  } else if (document.querySelector('input[name="payment-option"]:checked').value == "cash") {
    document.getElementById('qr_container').style.display = "none";
    document.getElementById('phone-number-fillup').style.display = "none";
    document.getElementById('cash-info').style.display = "block";
    console.log('Selected Cash');

    paymentmethod = "Cash"
  }
}

// Event listener for the radio button selection change
document.addEventListener('DOMContentLoaded', function() {
  var paymentOptions = document.querySelectorAll('input[name="payment-option"]');
  
  for (var i = 0; i < paymentOptions.length; i++) {
    paymentOptions[i].addEventListener('change', PaymentMethodChange);
  }
});








/*index page*/




/*cart algo*/
function addToCart() {



  var price = "0s";

  if(document.querySelector('input[name="options-outlined"]:checked').value == "30"){
    price = "60PHP"
  }else if(document.querySelector('input[name="options-outlined"]:checked').value == "50"){
    price = "90PHP"
  }else if(document.querySelector('input[name="options-outlined"]:checked').value == "70"){
    price = "120PHP"
  }

  

  


  var obj1 = {};
  obj1.duration = document.querySelector('input[name="options-outlined"]:checked').value;
  obj1.product = "flipbook";
  obj1.price = price;
  obj1.video = document.querySelector('input[name="video-options"]:checked').value;



  var jsonString = JSON.stringify(obj1);
  document.cookie = "cart=" + jsonString; + "path=/"; 

  window.location = "cart.html"; 

 
}


