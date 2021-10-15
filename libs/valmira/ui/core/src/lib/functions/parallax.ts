export function runParallax(multiplier = 650): void {
  const scrolls = Array.from(document.getElementsByClassName('image-scroll') as HTMLCollectionOf<HTMLElement>);
  window.addEventListener('scroll', () => {
    const limit = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const value = (window.scrollY / limit) * multiplier;
    if (screen.width > 768) {
      scrolls.forEach(scroll => {
        scroll.style.transform = `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, ${value}, 0, 1)`;
      });
    }
  });
}
