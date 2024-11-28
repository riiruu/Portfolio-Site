const bodyWrapper = document.querySelector(".body-wrapper");
const heroScrollSection = document.querySelector(".hero-scroll-section");
const worksBtn = document.querySelector(".works-scroll-section");
const htmlElem = document.documentElement;


//<============================================================================>
//                    Navbar On-Hover Animations/Transitions
//<============================================================================>
const navMain = document.querySelector(".nav-main-element");
const navHomeLower = document.querySelector(".nav-home-lower");
const navHomeStatic = document.querySelector(".nav-home-static");
const navHome = document.querySelector(".nav-home");
const navWrapper = document.querySelector(".nav-wrapper");
const normalNav = document.querySelector(".normal-nav");
const navShow = document.querySelector("#nav-show");
const navOut = document.querySelector("#nav-out");
const navOtherPathsShow = document.querySelectorAll(".nav-other-paths-show");
const navOtherPathsOut = document.querySelectorAll(".nav-other-paths-out");
const menu_links = document.querySelectorAll(".nav-links > li > a");

//--> Transitions on MouseEnter and MouseLeave in Nav
function normalNavEnter (event) {
  navWrapper.classList.add("isOpen");
  navHome.classList.add("isOpen");
  normalNav.classList.add("isOpen");
  navHomeStatic.classList.add("isOpen");

  // Navbar Graphic SVG Animations
  if (!document.querySelector(".nav-wrapper.inWorksSection")) {
    navShow.beginElement();
    navOtherPathsShow.forEach(anim => anim.beginElement());
  } else {
    nav_workssection_out.beginElement();
    nav_workssection_show.endElement();

    navHomeStatic.classList.add("isOpen");
  }
}
function normalNavExit (event) {
  navWrapper.classList.remove("isOpen");
  navHome.classList.remove("isOpen");
  normalNav.classList.remove("isOpen");
  navHomeStatic.classList.remove("isOpen");

  // Navbar Graphic SVG Animations
  navShow.endElement();
  if (!document.querySelector(".nav-wrapper.inWorksSection")) {
    navOut.beginElement();
    navOtherPathsOut.forEach(anim => anim.beginElement());
  } else {
    nav_workssection_show.beginElement();

    navHomeStatic.classList.remove("isOpen");
  }

}
normalNav.addEventListener("mouseenter", normalNavEnter)
normalNav.addEventListener("mouseleave", normalNavExit)


//--> Activate and Deactivate PointerEvents on Nav Menu Elements after nav-wrapper transition changes animation states
navWrapper.addEventListener("transitionend", (evt) => {
  // Prevents transitionend and transitionstart from firing when mouse is over the nav-home logo
  if (evt.target == navHome) {
    evt.stopPropagation;
    return;
  }
  // Adds pointer events = all to the menu links when the SVG animation is done
  if (evt.propertyName == "transform") {
    menu_links.forEach(link => link.classList.add("enable-pointer-events"))
    if (document.querySelector(".nav-wrapper.inWorksSection")) {
      navHomeStatic.classList.add("enable-pointer-events")
    }
  }
})
navWrapper.addEventListener("transitionstart", (evt) => {
  if (evt.target == navHome) {
    evt.stopPropagation;
    return;
  }
  if (evt.propertyName == "transform") {
    menu_links.forEach(link => link.classList.remove("enable-pointer-events"))
    if (document.querySelector(".nav-wrapper.inWorksSection")) {
      navHomeStatic.classList.remove("enable-pointer-events")
    }
  }
})


//<============================================================================>
//                          Mobile Navbar Interactions
//<============================================================================>
const mobnav_bars = document.querySelector(".mobnav-bars");
const bars = document.querySelector(".fa-bars");
const xmark = document.querySelector(".fa-xmark");
const mob_show = document.querySelector("#mobnav-show");
const mob_hide = document.querySelector("#mobnav-hide");
const mob_elem_show = document.querySelector("#mobnav-elem-show");
const mob_elem_hide = document.querySelector("#mobnav-elem-hide");

var isOpen = 0;

mobnav_bars.addEventListener("touchend", (event) => {
  if (isOpen == 0) {
    isOpen = 1;
  } else {
    isOpen = 0;
  }

  if (isOpen == 1) {
    bars.style.opacity = "0";
    xmark.style.opacity = "1";
    mob_show.beginElement();
    mob_elem_show.beginElement();
  } else {
    bars.style.opacity = "1";
    xmark.style.opacity = "0";
    mob_hide.beginElement();
    mob_elem_hide.beginElement();
    }
})



//<============================================================================>
//Intersection Observer to transition from "Hero Section State" to "Body State"
//<============================================================================>
const options = {
  root: null,
  rootMargin: '200px',
  threshold: 1
}

const nav_workssection_show = document.querySelector("#nav-workssection-show");
const nav_workssection_out = document.querySelector("#nav-workssection-out");
const body_border = document.querySelector(".body-border");
const works = document.querySelector(".works");
const nav_bounding_box = document.querySelector(".nav-bounding-box");

if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
  let intersectionObserver = new IntersectionObserver(entries => {
    for (let entry of entries) {
      if (!entry.isIntersecting) {
        //IN WORKS SECTION
        navWrapper.classList.remove("isOpen");
        navHomeStatic.classList.remove("isOpen");

        navWrapper.classList.add("inWorksSection");
        navHomeStatic.classList.remove("transparent");
        navHomeStatic.classList.add("enable-pointer-events")
        navHome.classList.add("disabled");
        body_border.classList.add("fade");
        nav_bounding_box.classList.remove("isOpen");

        //enable works section fade in fly up transition
        works.classList.add("worksFadeInFlyUp");

        //nav viewbox + element resize anim trigger
        nav_workssection_show.beginElement();
        navShow.beginElement();
      } else {
        //OUT OF WORKS SECTION
        navHomeStatic.classList.remove("isOpen");
        navWrapper.classList.remove("isOpen");
        navOtherPathsOut.forEach(anim => anim.beginElement());

        navWrapper.classList.remove("inWorksSection");
        navHomeStatic.classList.add("transparent");
        navHomeStatic.classList.remove("enable-pointer-events")
        navHome.classList.remove("disabled");
        body_border.classList.remove("fade");
        nav_bounding_box.classList.add("isOpen");

        //disable works section fade in fly up, enable fade out
        works.classList.remove("worksFadeInFlyUp");

        //nav viewbox + element resize anim trigger
        nav_workssection_out.beginElement();
        navOut.beginElement();
      }
    }
  });

  intersectionObserver.observe(heroScrollSection);
}



//<============================================================================>
//       Resize Observer to make nav-bounding-box inherit width from nav
//<============================================================================>
// const nav_main = document.querySelector(".nav-main");

// const navResizeObserver = new ResizeObserver(entries => {
//   for (let entry of entries) {
//       if (entry.target == normalNav) {
//       console.log(entry);
//       var nav_width = entry.target.getBoundingClientRect().width;
//       document.querySelector(".nav-bounding-box").style.minWidth = nav_width + 'px';
//     }
//   }
// });

// navResizeObserver.observe(nav_main);



//<============================================================================>
//                            Works Img Hover States
//<============================================================================>
let mediaquery = window.matchMedia("(max-width: 500px) and (orientation: portrait)");

if (document.querySelector(".inHomepage") != null) {
  const worksWrapper = document.querySelectorAll(".works-wrapper");
  const allCarets = document.querySelectorAll(".caret-container");

  if (mediaquery.matches === false) {
    //When user is accessing through PC
    worksWrapper.forEach((works) => {
      works.addEventListener("mouseover", () => {works.classList.add("isHovering");})
      works.addEventListener("mouseout", () => {works.classList.remove("isHovering");})
    })
  } else {
    worksWrapper.forEach((works) => {
      works.removeEventListener("mouseover", () => {works.classList.add("isHovering");})
      works.removeEventListener("mouseout", () => {works.classList.remove("isHovering");})
      works.addEventListener("touchend", worksTouchEndHandler, true);
      works.addEventListener("touchmove", worksTouchMoveHandler);
    })
  }


  //When user is accessing through smartphone
  let worksIsOpen = false
  let isTouchMove = false;

  function worksTouchEndHandler (event) {
    var class_list = event.target.classList;
    if ( isTouchMove === false ) {
      switch (true) {
        // case worksIsOpen === true && this.classList.contains("isHovering") === true:
        //   this.classList.remove("isHovering");
        //   this.lastElementChild.lastElementChild.classList.remove("caretTurnaround");
        //   worksIsOpen = false;
        //   break;
        case worksIsOpen === true && this.classList.contains("isHovering") === false:
          worksWrapper.forEach((works) => {
            works.classList.remove("isHovering");
          })
          allCarets.forEach((carets) => {
            carets.classList.remove("caretTurnaround");
          })
          this.classList.add("isHovering");
          this.lastElementChild.lastElementChild.classList.add("caretTurnaround");
          worksIsOpen = true;
          event.preventDefault();
          break;
        case worksIsOpen === false && this.classList.contains("isHovering") === false:
          this.classList.add("isHovering");
          this.lastElementChild.lastElementChild.classList.add("caretTurnaround");
          worksIsOpen = true;
          event.preventDefault();
          break;
      }
    }
    isTouchMove = false;
  }

  function worksTouchMoveHandler () {
    isTouchMove = true;
  }
}

//<============================================================================>
//                              Image Zoom In
//<============================================================================>
if (window.location.pathname === "/case-study-1.html" || window.location.pathname === "/case-study-3.html" || window.location.pathname === "/case-study-4.html" || window.location.pathname === "/case-study-8.html") {
  // Get the modal
  const modal = document.querySelector('#zoom-modal');

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  const img = document.querySelectorAll('.zoomable');
  const modalImg = document.querySelector("#img01");
  const captionText = document.querySelector("#caption");

  img.forEach((imgElement) => {
    imgElement.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = imgElement.src;
      modalImg.alt = imgElement.alt;
      captionText.innerHTML = imgElement.alt;
    });
  });

  // When the user clicks on <span> (x), close the modal
  modal.addEventListener("click", () => {
    img01.className += " out";
    setTimeout(() => {
        modal.style.display = "none";
        img01.className = "modal-content";
      }, 400);
    }
  )
}


//<============================================================================>
//                              Change Images
//<============================================================================>
function changeToMobileImage () {
  if (window.location.pathname === '/case-study-1.html') {
    const pic1 = document.querySelector("#case1-pic1");
    pic1.src = "./images/kinaiya_prev_4-min.png";
  }
};
function changeToNormalImage () {
  if (window.location.pathname === '/case-study-1.html') {
    const pic1 = document.querySelector("#case1-pic1");
    pic1.src = "./images/kinaiya_prev_2-min.png";
  }
};

if (mediaquery.matches === true) {
  changeToMobileImage();
} else {
  changeToNormalImage();
}
mediaquery.addEventListener("change", (e) => {
  if (e.matches === true) {
    changeToMobileImage();
  } else {
    changeToNormalImage();
  }
});



//<============================================================================>
//                              Miscellaneous
//<============================================================================>

//Fades in page on load
document.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(function() {
    document.body.classList.remove("body-fade");
  }, 230);
});

//Fades out on clicking a link to a different page
const links = document.querySelectorAll("a");

for (var i=0; i<links.length; i++) {
  if (links[i].classList.contains("same-page-link") === true) {
    continue
  };
  links[i].addEventListener("click", (e) => {
    e.preventDefault();
    const tempUrl = e.currentTarget.getAttribute("href");
    document.body.classList.add("body-fade");

    setTimeout(() => {
      window.location.assign(tempUrl);
    }, 300)
    setTimeout(() => {
      document.body.classList.remove("body-fade");
    }, 600)
   
  })
};

// window.addEventListener("popstate", (event) => {
//     document.body.classList.add("body-fade");
// });

//Stops propagation to works img when mob works links are tapped
const mob_works_links = document.querySelectorAll(".mob-works-links");
mob_works_links.forEach(links => links.addEventListener("touchend", (e) => {
  e.stopImmediatePropagation();
}))

//Triggers a refresh of the page when clicking an email link to avoid a fadeout
const email_links = document.querySelectorAll(".email-links");
email_links.forEach(links => links.addEventListener("click", (e) => {
  setTimeout(() => location.reload(), 1000)
}))
email_links.forEach(links => links.addEventListener("touchend", (e) => {
  setTimeout(() => location.reload(), 1000)
}))

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};


//Animation for after pressing buttons
const button_anim = document.querySelectorAll(".anim");
button_anim.forEach((anim) => {
  anim.addEventListener("touchstart", () => {
    anim.style.webkitAnimationName = "scale-effect";
    anim.addEventListener("animationend", () => {
      anim.style.webkitAnimationName = "none";
    })
  })
  anim.addEventListener("mousedown", () => {
    anim.style.webkitAnimationName = "scale-effect";
    anim.addEventListener("animationend", () => {
      anim.style.webkitAnimationName = "none";
    })
  })
})