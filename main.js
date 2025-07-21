const nav =document.querySelector("nav");
const header =document.querySelector("header")
const track = document.getElementById("sliderTrack")
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// scroll behavior
document.querySelector(".nav__list").addEventListener('click',function(e){
 e.preventDefault();
  // matching
  if(e.target.classList.contains("nav__list-el-a")){
    const id =e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior:"smooth"})
  } 
})

// nav sticky
const navHeight =nav.getBoundingClientRect().height;

const stickyNav =function(entries){
const [entry] =entries;
if(!entry.isIntersecting) nav.classList.add("sticky");
else nav.classList.remove("sticky")
}
const headerObserver = new IntersectionObserver(stickyNav ,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`
});
headerObserver.observe(header);


const allSections =document.querySelectorAll(".section");

const showSection = function(entries , observer){
entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    entry.target.classList.remove("hidden")
    observer.unobserve(entry.target)
})
}

const sectionObserver =new IntersectionObserver(showSection ,{
    root:null,
    threshold:0.01,
})
allSections.forEach(section=>{
    sectionObserver.observe(section);
    section.classList.add("hidden");
})


// slider

const totalSlides=slides.length;

let currentIndex=0;
let sliderAuto;

const getSliderPerview = function(){
    const width = window.innerWidth;
    if(width<=600) return 1;
    if(width<=900) return 2;
    if(width<=1200) return 3;
    return 4

}
const slidesPerview = getSliderPerview();
const resetInterval = function(){
    clearInterval(sliderAuto)
    sliderAuto = setInterval(nextSlide,5000)
}

const updateSlider =function(){
    const slideWidth = slides[0].offsetWidth;
    track.style.transform =`translateX(-${slideWidth*currentIndex}px)`
}

const prevSlide =function(){
    currentIndex -=slidesPerview;
    if(currentIndex < 0){
        currentIndex = totalSlides-slidesPerview;
    }
    updateSlider()
    resetInterval()
}

const nextSlide =function(){
    currentIndex +=slidesPerview;
    if(currentIndex >= totalSlides){
        currentIndex =0 ;
    }
    updateSlider()
    resetInterval()
}

nextBtn.addEventListener("click",nextSlide);
prevBtn.addEventListener("click",prevSlide);

sliderAuto = setInterval(nextSlide,5000);

const allCards =document.querySelectorAll(".card")
const cardShow =function(entries,observe){
entries.forEach(entry=>{
    if(!entry.isIntersecting) return ;
    entry.target.classList.remove("hidden");
    observe.unobserve(entry.target)
})
}

const cardObserver =new IntersectionObserver(cardShow,{
    root:null,
    threshold:0.15
})
allCards.forEach(card=>{
    cardObserver.observe(card);
    card.classList.add("hidden")
})