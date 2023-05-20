/* cart */

displayCookie()


function displayCookie() {

    const cartcontainer = document.getElementById('cart-container');

    if (document.cookie.length == "") {

  
        cartcontainer.innerHTML = "<h3 class='roboto-mono' style='color: rgba(255, 255, 255, 0.2);'>no items in the cart</h1><br><a href='index.html' >back to home page</a>";
        document.getElementById('studentinfo').style.display = "none"
   
    } else {
      
      var cookiedata = getCookieValue('cart')
      var obj = JSON.parse(cookiedata);
      cartcontainer.innerHTML = "<div class='h-50 d-flex primarycolor rounded-3'>" + 
                  "<div class='col-md-3 col-4 p-2'><div class=' cart-item-image  rounded-3 '></div></div>" +
                  "<div class='col-md-9 p-3 col-8 '>" +
                  "<button " + "onclick='deleteCookie()'" + "class='float-end btn btn-dark btn-sm align-items-center justify-content-center d-flex' ' ><i class='fa-solid fa-x'></i></button>" +
                  "<p class='orbitron mt-2 mb-0 ' >" + obj.product + "</p>" +
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
  const orderPrice = cart.price
  const orderduration = cart.duration

  var orderOutput = "**Student no:** " + studentNo + "\n**Outlook:** " + outlook + "\n**Section:** " +  section + "\n**Price:** " + orderPrice + "\n**Frames:** " + orderduration

  const webhook = "https://discord.com/api/webhooks/1109001738591141968/igZBaXdbsgWJSvS1eIRp729b-n1RMQ_6HlO-fGKZIeaByM2QM2XBb298qN7QQNQBLz4g"

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
  obj1.product = "Flipbook";
  obj1.price = price;


  var jsonString = JSON.stringify(obj1);
  document.cookie = "cart=" + jsonString; + "path=/"; 

  window.location = "https://www.tutorialspoint.com"; 
}


