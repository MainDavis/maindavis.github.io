import { useEffect, useRef } from "react";

const CHARACTERS = "0123456789ABCDEF";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let columns: number[] = [];
    let width = 0;
    let height = 0;
    const fontSize = 14;
    const speed = 0.55;

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      width = innerWidth;
      height = innerHeight;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const columnCount = Math.floor(innerWidth / fontSize);
      columns = Array.from({ length: columnCount }, () => Math.random() * innerHeight);
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "rgba(32, 0, 0, 0.22)";

      columns.forEach((y, i) => {
        const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        const x = i * fontSize;
        ctx.fillText(char, x, y);
        if (y > height && Math.random() > 0.985) {
          columns[i] = 0;
        } else {
          columns[i] = y + fontSize * speed;
        }
      });
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-20"
      aria-hidden="true"
    />
  );
}
