export default function () {
  function ImgMove(containerClass: any, imgClass: any) {
    document.addEventListener('DOMContentLoaded', () => {
      const imgs: any = document.querySelectorAll(imgClass);
      const containers: any = document.querySelectorAll(containerClass);

      if (!imgs || !containers) {
        console.error('Target elements not found. Please check your HTML structure and selectors.');
        return;
      }

      for (let i = 0; i < containers.length; i++) {
        containers[i].addEventListener('mousemove', (e: any) => {
          const { clientX, clientY } = e; // 获取鼠标位置
          const { offsetWidth, offsetHeight } = containers[i]; // 获取容器尺寸

          // 计算鼠标相对位置
          const xPercent = (clientX / offsetWidth - 0.5) * 10; // 范围 -10% 到 10%
          const yPercent = (clientY / offsetHeight - 0.5) * 10;

          // 应用平移效果
          imgs[i].style.transform = `translate(-50%, -50%) translate(${xPercent}%, ${yPercent}%)`;
        });
      }

    });

  }

  function RemoveImgMoveEvent(containerClass: any, imgClass: any) {
    const imgs: any = document.querySelectorAll(imgClass);
    const containers: any = document.querySelectorAll(containerClass);

    for (let i = 0; i < containers.length; i++) {
      document.removeEventListener('mousemove', containers[i])
    }
  }

  return { ImgMove, RemoveImgMoveEvent }
}