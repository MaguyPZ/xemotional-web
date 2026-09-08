---
name: xemotional-asset-optim
description: Best practices for visual performance, animations, premium glassmorphism design, and SEO audit on Xemotional Web assets.
---

# ✨ Xemotional Web Asset & Design Optimization Skill

This skill enforces premium aesthetics, interactive canvas animation standards, and visual performance optimization for **Xemotional Web**.

## 🎨 Design System & Premium Aesthetics

All UI modifications must adhere to:
- **Colors**: Curated dark modes and dynamic gradients. Use high-contrast accessible typography.
- **Glassmorphism**: Cards and overlay modals should utilize `backdrop-filter: blur(16px)` with semi-transparent borders `rgba(255, 255, 255, 0.08)`.
- **Canvas Animations**: Maintain the performance of the interactive aura background (`#hero-canvas` in `index.html`) using raw, light-weight Canvas 2D API instead of heavy frameworks.
- **Waveform Simulation**: Keep the mock waveform dynamically rendered using lightweight JS loops injecting animated `.wave-bar` elements.

## ⚡ Performance Auditing

Ensure fast load times on mobile:
- Keep scripts non-blocking where possible.
- Avoid external assets other than Google Fonts.
- Confirm local images (like `LogoWhap.png`) are properly compressed.
