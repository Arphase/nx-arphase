function run(): void {
  const scrolls = Array.from(document.getElementsByClassName('image-scroll-1') as HTMLCollectionOf<HTMLElement>);
  const scrolls2 = Array.from(document.getElementsByClassName('image-scroll-2') as HTMLCollectionOf<HTMLElement>);
  const scrolls3 = Array.from(document.getElementsByClassName('image-scroll-3') as HTMLCollectionOf<HTMLElement>);

  window.addEventListener('scroll', () => {
    const limit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight,
    );
    const yScroll = window.scrollY;
    const value = (yScroll / limit) * 650;
    const value2 = ((yScroll - 1750 > 0 ? yScroll - 1750 : 0) / limit) * 650;
    const value3 = ((yScroll - 4000 > 0 ? yScroll - 4000 : 0) / limit) * 650;
    scrolls.forEach(
      scroll => (scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value}, 0, 1)`),
    );
    scrolls2.forEach(
      scroll => (scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value2}, 0, 1)`),
    );
    scrolls3.forEach(
      scroll => (scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value3}, 0, 1)`),
    );
  });
}

run();
