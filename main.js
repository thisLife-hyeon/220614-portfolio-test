const topClass = {
  home: document.querySelector(".home"),
  skill: document.querySelector(".skill"),
  project6: document.querySelector(".project6"),
  project2: document.querySelector(".project2"),
  // project3: document.querySelector(".project3"),
  project5: document.querySelector(".project5"),
  contact: document.querySelector(".contact"),
  arrowUp: document.querySelector(".arrow-up"),
};

const topId = {
  sectionHome: document.querySelector("#home"),
  sectionSkill: document.querySelector("#skill"),
  sectionProject6: document.querySelector("#project6"),
  sectionProject2: document.querySelector("#project2"),
  // sectionProject3: document.querySelector("#project3"),
  sectionProject5: document.querySelector("#project5"),
  sectionContact: document.querySelector("#contact"),
};

topClass.home.addEventListener("click", function () {
  topId.sectionHome.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.skill.addEventListener("click", function () {
  topId.sectionSkill.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.project5.addEventListener("click", function () {
  topId.sectionProject5.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.project6.addEventListener("click", function () {
  topId.sectionProject6.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.project2.addEventListener("click", function () {
  topId.sectionProject2.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.contact.addEventListener("click", function () {
  topId.sectionContact.scrollIntoView({ behavior: "smooth", block: "center" });
});
topClass.arrowUp.addEventListener("click", function () {
  topId.sectionHome.scrollIntoView({ behavior: "smooth", block: "center" });
});

document.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    topClass.arrowUp.classList.add("show");
  } else {
    topClass.arrowUp.classList.remove("show");
  }
});

const boxes = document.querySelectorAll(".active__box");

window.addEventListener("scroll", checkBoxes);
checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 5) * 4;

  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      box.classList.add("show");
    } else {
      box.classList.remove("show");
    }
  });
}

//Scroll Magic Start

// define images
var images = ["img/bg-1.png", "img/bg-2.png", "img/bg-3.png", "img/bg-4.png", "img/bg-5.png"];
// TweenMax can tween any property of any object. We use this object to cycle through the array
var obj = { curImg: 0 };

// create tween
var tween = TweenMax.to(obj, 0.5, {
  curImg: images.length - 1, // animate propery curImg to number of images
  roundProps: "curImg", // only integers so it can be used as an array index
  repeat: 1, // repeat 3 times
  immediateRender: true, // load first image automatically
  ease: Linear.easeNone, // show every image the same ammount of time
  onUpdate: function () {
    $("#myimg").attr("src", images[obj.curImg]); // set the image source
  },
});

// init controller
var controller = new ScrollMagic.Controller();

// build scene
var scene = new ScrollMagic.Scene({ triggerElement: "#trigger", duration: 800 })
  .setTween(tween)
  // .addIndicators() // add indicators (requires plugin)
  .addTo(controller);

// handle form change
$("form.move input[name=duration]:radio").change(function () {
  scene.duration($(this).val());
});
//Scroll Magic End

//Swiper
// Initialize Swiper
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  autoplay: true,
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 210,
    depth: 200,
    modifier: 2,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
//Swiper End

window.onload = function () {
  const elm = document.querySelectorAll(".section");
  const elmCount = elm.length;
  elm.forEach(function (item, index) {
    item.addEventListener("mousewheel", function (event) {
      event.preventDefault();
      let delta = 0;

      if (!event) event = window.event;
      if (event.wheelDelta) {
        delta = event.wheelDelta / 120;
        if (window.opera) delta = -delta;
      } else if (event.detail) delta = -event.detail / 3;

      let moveTop = window.scrollY;
      let elmSelector = elm[index];

      // wheel down : move to next section
      if (delta < 0) {
        if (elmSelector !== elmCount - 1) {
          try {
            moveTop =
              window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }

      // wheel up : move to previous section
      else {
        if (elmSelector !== 0) {
          try {
            moveTop =
              window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
          } catch (e) {}
        }
      }

      const body = document.querySelector("html");
      window.scrollTo({ top: moveTop, left: 0, behavior: "smooth" });
    });
  });
};
