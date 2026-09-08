---
name: xemotional-deployment
description: Guidelines and best practices for auditing, testing, and deploying Xemotional Web static site to Vercel.
---

# 🚀 Xemotional Web Deployment Skill

This skill guides the process of validating, testing, and deploying the **Xemotional Web** project to Vercel.

## 🛠️ Pre-Deployment Verification Checklist

Before running any deploy command:
1. **SEO Integrity**: Verify `index.html` has valid `<title>` and `<meta name="description">` tags.
2. **Meta Pixel Verification**: Ensure the tracking script containing ID `1664455858206047` is present and unaltered in `index.html`.
3. **Asset References**: Confirm all asset files (e.g. `LogoWhap.png`, `og-preview.png`) have matching filenames and exist in the repository root.
4. **Vercel Routing**: If clean routing or custom headers are required, define them in `vercel.json` before initiating deployment.

## 📂 Configuration Standard (`vercel.json`)

For this static setup, a typical `vercel.json` should maintain clean URLs and handle the CNAME setting:
```json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/$1" }
  ]
}
```

## 🚀 Deployment Commands

Always recommend running local validation first:
- Preview locally: Use `npx -y serve` or any quick HTTP server in the workspace directory.
- Deploy to Production using Vercel CLI (if available): `npx vercel --prod`
