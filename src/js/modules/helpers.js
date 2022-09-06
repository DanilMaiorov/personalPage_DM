const disableScrolling = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
      window.scrollTo(x, y) ;
  };
};

export { disableScrolling };