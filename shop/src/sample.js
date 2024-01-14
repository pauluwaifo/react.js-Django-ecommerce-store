const createCarousel = (carouselSelector, prevButtonSelector, nextButtonSelector, scrollDistance) => {
  const carouselWrapper = document.querySelector(carouselSelector);
  const prevBtn = document.querySelector(prevButtonSelector);
  const nextBtn = document.querySelector(nextButtonSelector);
  let scrollPos = 0;

  const nextClickHandler = () => {
    if (scrollPos >= scrollDistance) {
      scrollPos += 0;
    } else {
      scrollPos += scrollDistance;
    }
    carouselWrapper.scroll({
      left: scrollPos,
      behavior: "smooth",
    });
  };

  const prevClickHandler = () => {
    if (scrollPos === 0) {
      scrollPos -= 0;
    } else {
      scrollPos -= scrollDistance;
    }
    carouselWrapper.scroll({
      left: scrollPos,
      behavior: "smooth",
    });
  };
  if (carouselSelector) {
    nextBtn.addEventListener("click", nextClickHandler);
    prevBtn.addEventListener("click", prevClickHandler);
  }

  return {
    cleanup: () => {
      // Clean up event listeners
      prevBtn.removeEventListener("click", prevClickHandler);
      nextBtn.removeEventListener("click", nextClickHandler);
    },
  };
};

const useFunc = () => {
  const cleanupFuncs = [];

  console.log("loading");
  setTimeout(() => {
    console.log("loaded");
    const carousel1 = createCarousel(".carousel-wrapper", ".prev-btn", ".next-btn", 1041);
    const carousel2 = createCarousel(".crl_p", ".p_prev", ".p_next", 1300);
    const carousel3 = createCarousel(".crl_l", ".l_prev", ".l_next", 1300);

    cleanupFuncs.push(carousel1.cleanup);
    cleanupFuncs.push(carousel2.cleanup);
    cleanupFuncs.push(carousel3.cleanup);
  }, 2000);

  return () => {
    cleanupFuncs.forEach(cleanupFunc => cleanupFunc());
  };
};

export default useFunc;
