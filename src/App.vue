<template>
  <LiquidChromeHero>
    <div class="hero-content">
      <h1 class="hero-title">
        <span class="title-line">LIQUID</span>
        <span class="title-line accent">CHROME</span>
      </h1>
      <p class="hero-subtitle">
        Interactive WebGL Shader Experience
      </p>
      <div class="hero-cta">
        <button class="btn-primary">Explore Now</button>
        <button class="btn-secondary">Learn More</button>
      </div>
    </div>
  </LiquidChromeHero>
</template>

<script setup>
import LiquidChromeHero from '../LiquidChromeHero.vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #0a0a0f;
  color: white;
  overflow-x: hidden;
}

.hero-content {
  text-align: center;
  padding: 2rem;
}

.hero-title {
  font-size: clamp(3rem, 12vw, 10rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
  text-shadow: 
    0 0 40px rgba(100, 150, 255, 0.3),
    0 0 80px rgba(100, 150, 255, 0.15);
}

.title-line {
  display: block;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #c0d0e8 25%,
    #a0b8d8 50%,
    #8098c8 75%,
    #ffffff 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmer 4s linear infinite;
}

.title-line.accent {
  background: linear-gradient(
    135deg,
    #6080c0 0%,
    #8ab4f8 25%,
    #aac8ff 50%,
    #8ab4f8 75%,
    #6080c0 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

@keyframes shimmer {
  0% { background-position: 200% center; }
  100% { background-position: -200% center; }
}

.hero-subtitle {
  font-size: clamp(0.9rem, 2vw, 1.25rem);
  font-weight: 300;
  color: rgba(180, 200, 230, 0.8);
  margin-bottom: 3rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 1rem 2.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: linear-gradient(135deg, #6080c0 0%, #8ab4f8 100%);
  color: white;
  box-shadow: 
    0 4px 20px rgba(100, 140, 200, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.btn-primary:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 
    0 8px 40px rgba(100, 140, 200, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(200, 220, 255, 0.9);
  border: 1px solid rgba(150, 180, 220, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(150, 180, 220, 0.5);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
    max-width: 280px;
  }
}
</style>
