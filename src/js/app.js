import $ from 'jquery';
console.log($)
var forEach = function(arr,cb){for(var i = 0; i < arr.length; i++){ cb(arr[i], i, arr)  } }

// function mobileNav() {
//     document.getElementByClassName(".mobile-nav-items").style.cssText = 'display: block;'
//
// }

// function myFunction() {
//     var x = document.getElementById("mobileNav");
//     console.log('hi')
//     if (x.className === "mobile-nav-items") {
//         x.className += "responsive";
//     } else {
//         x.className = "mobile-nav-items";
//     }
// }

$('.hamburger-menu').click(function() {

    $('.mobile-nav-items').css({
        'display': 'block',
    });
    $('.pic-and-bio').css({
        'margin-top': '450px',
    });
    $('.portfolio').css({
        'margin-top': '500px',
    });
});
