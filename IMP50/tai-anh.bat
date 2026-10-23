@echo off
chcp 65001 >nul
cd /d "%~dp0"
if not exist images mkdir images
echo Dang tai anh tu Figma...
curl -sSL -o "images\logo.png" "https://www.figma.com/api/mcp/asset/93500e1f-b970-4f49-803a-48d9626a10fd.png" && echo   OK  logo.png || echo   LOI logo.png
curl -sSL -o "images\icon-play.svg" "https://www.figma.com/api/mcp/asset/8d1dae33-6709-4c98-ba47-b8fa65fc6e35.svg" && echo   OK  icon-play.svg || echo   LOI icon-play.svg
curl -sSL -o "images\book.png" "https://www.figma.com/api/mcp/asset/36001684-1d0c-4614-b074-fbaef1d10bb0.png" && echo   OK  book.png || echo   LOI book.png
curl -sSL -o "images\dot.svg" "https://www.figma.com/api/mcp/asset/eb6e2ee9-4a0b-4f15-8750-0cf3dd719475.svg" && echo   OK  dot.svg || echo   LOI dot.svg
curl -sSL -o "images\stat-1.png" "https://www.figma.com/api/mcp/asset/45a66594-c977-461b-8ded-124751856a71.png" && echo   OK  stat-1.png || echo   LOI stat-1.png
curl -sSL -o "images\stat-2.png" "https://www.figma.com/api/mcp/asset/5f67b828-863c-4e46-acb6-13544efc514d.png" && echo   OK  stat-2.png || echo   LOI stat-2.png
curl -sSL -o "images\stat-3.png" "https://www.figma.com/api/mcp/asset/31ef1e90-588a-4d3e-8cc1-f880ff7b150c.png" && echo   OK  stat-3.png || echo   LOI stat-3.png
curl -sSL -o "images\stat-4.png" "https://www.figma.com/api/mcp/asset/2ff531b0-6a26-46ed-a63d-8008d5a65da9.png" && echo   OK  stat-4.png || echo   LOI stat-4.png
curl -sSL -o "images\stat-5.png" "https://www.figma.com/api/mcp/asset/e109f277-b367-44e3-ba83-5f98ec3d0a04.png" && echo   OK  stat-5.png || echo   LOI stat-5.png
curl -sSL -o "images\stat-6.png" "https://www.figma.com/api/mcp/asset/22d04c41-6871-4211-af17-3f13c18d7192.png" && echo   OK  stat-6.png || echo   LOI stat-6.png
curl -sSL -o "images\stat-7.png" "https://www.figma.com/api/mcp/asset/32de031d-2748-4f0f-9d6a-db108dcc2788.png" && echo   OK  stat-7.png || echo   LOI stat-7.png
curl -sSL -o "images\stat-8.png" "https://www.figma.com/api/mcp/asset/aa6dbd59-ae13-4877-8d44-8c16a8e2ba7c.png" && echo   OK  stat-8.png || echo   LOI stat-8.png
curl -sSL -o "images\arrow-blue.svg" "https://www.figma.com/api/mcp/asset/a9f29685-628f-446f-9638-207c3c1baa05.svg" && echo   OK  arrow-blue.svg || echo   LOI arrow-blue.svg
curl -sSL -o "images\video-thumb.png" "https://www.figma.com/api/mcp/asset/e0d10f09-0a0a-4c49-b9ec-e50a6cab2821.png" && echo   OK  video-thumb.png || echo   LOI video-thumb.png
curl -sSL -o "images\avatar.png" "https://www.figma.com/api/mcp/asset/e59961d0-780a-47ce-97bc-ada7c4700e30.png" && echo   OK  avatar.png || echo   LOI avatar.png
curl -sSL -o "images\thumb-1.png" "https://www.figma.com/api/mcp/asset/399d8975-88fc-4e3d-8dd8-c8dbd1ecf9e7.png" && echo   OK  thumb-1.png || echo   LOI thumb-1.png
curl -sSL -o "images\thumb-2.png" "https://www.figma.com/api/mcp/asset/27551d30-1ed8-454c-8e73-3bc3223c1d9a.png" && echo   OK  thumb-2.png || echo   LOI thumb-2.png
curl -sSL -o "images\thumb-3.png" "https://www.figma.com/api/mcp/asset/c5053608-ae8c-4bcd-ba52-beae92271173.png" && echo   OK  thumb-3.png || echo   LOI thumb-3.png
curl -sSL -o "images\thumb-4.png" "https://www.figma.com/api/mcp/asset/e5b7cd6e-edb3-4779-ba1d-9dde50375abb.png" && echo   OK  thumb-4.png || echo   LOI thumb-4.png
curl -sSL -o "images\thumb-5.png" "https://www.figma.com/api/mcp/asset/1748c84f-c3b9-4aff-a25b-4d3d0d3505a5.png" && echo   OK  thumb-5.png || echo   LOI thumb-5.png
curl -sSL -o "images\script-line.svg" "https://www.figma.com/api/mcp/asset/d8004d5d-96ef-4174-aa13-46d5d37efb97.svg" && echo   OK  script-line.svg || echo   LOI script-line.svg
curl -sSL -o "images\dots.svg" "https://www.figma.com/api/mcp/asset/e110b1cf-4809-43c3-ab9f-3c52fd302ddf.svg" && echo   OK  dots.svg || echo   LOI dots.svg
curl -sSL -o "images\arrow-next.svg" "https://www.figma.com/api/mcp/asset/60219b4d-2d6d-4889-bcf5-67e48ad4add6.svg" && echo   OK  arrow-next.svg || echo   LOI arrow-next.svg
curl -sSL -o "images\arrow-prev.svg" "https://www.figma.com/api/mcp/asset/a49767c7-3c50-4a4f-8719-18878b03e2e3.svg" && echo   OK  arrow-prev.svg || echo   LOI arrow-prev.svg
curl -sSL -o "images\icon-hand.svg" "https://www.figma.com/api/mcp/asset/b43119ce-df4b-494e-845e-6d6a7e48ba39.svg" && echo   OK  icon-hand.svg || echo   LOI icon-hand.svg
curl -sSL -o "images\event-1.png" "https://www.figma.com/api/mcp/asset/6b9eeb0a-2017-4d40-a7c7-4e41920950af.png" && echo   OK  event-1.png || echo   LOI event-1.png
curl -sSL -o "images\event-2.png" "https://www.figma.com/api/mcp/asset/f3347b45-4e7f-4ac7-9816-bd0be8e3e525.png" && echo   OK  event-2.png || echo   LOI event-2.png
curl -sSL -o "images\event-3.png" "https://www.figma.com/api/mcp/asset/2228826b-b496-4993-a4bf-f947a321fb42.png" && echo   OK  event-3.png || echo   LOI event-3.png
curl -sSL -o "images\event-4.png" "https://www.figma.com/api/mcp/asset/07392bde-18de-4b32-94de-017cda333b10.png" && echo   OK  event-4.png || echo   LOI event-4.png
curl -sSL -o "images\icon-pin.svg" "https://www.figma.com/api/mcp/asset/c926bda4-f67f-4a90-8c7e-41b23a51a997.svg" && echo   OK  icon-pin.svg || echo   LOI icon-pin.svg
curl -sSL -o "images\event-prev.svg" "https://www.figma.com/api/mcp/asset/b03cc879-fd1a-45bd-8022-33512d45fcdf.svg" && echo   OK  event-prev.svg || echo   LOI event-prev.svg
curl -sSL -o "images\event-next.svg" "https://www.figma.com/api/mcp/asset/48e63213-1e0f-4197-933e-2000fa88d645.svg" && echo   OK  event-next.svg || echo   LOI event-next.svg
curl -sSL -o "images\footer-wave.png" "https://www.figma.com/api/mcp/asset/5e6cee65-80ef-4a1b-b775-b741dafd1ac2.png" && echo   OK  footer-wave.png || echo   LOI footer-wave.png
curl -sSL -o "images\footer-logo.png" "https://www.figma.com/api/mcp/asset/60915087-98fa-4bea-8ae4-3376f90cd458.png" && echo   OK  footer-logo.png || echo   LOI footer-logo.png
curl -sSL -o "images\arrow-white.svg" "https://www.figma.com/api/mcp/asset/070fa1c6-8472-4cdd-8a64-86f007c88961.svg" && echo   OK  arrow-white.svg || echo   LOI arrow-white.svg
echo.
echo Xong! Mo index.html bang Live Server.
pause
