# Relatório de performance (Core Web Vitals) – Landing Page Pedro Gomes

**Objetivo:** Reduzir LCP no mobile (meta ≤ 2,5s) e melhorar score do PageSpeed.  
**Hospedagem:** GitHub Pages (estático).

---

## 1. O que foi feito no código

### A) Identificação do elemento LCP
- **Elemento LCP:** imagem de fundo do banner hero (seção "Quer emagrecer e ganhar massa muscular...").
- Antes: a imagem era carregada como `background-image` em CSS (`fundo_alteres.jpg` / `fundo_alteres.webp`), o que atrasa a descoberta pelo navegador e não permite preload nem prioridade clara.

### B) Hero migrado de background para `<img>`
- O hero passou a ser uma **tag `<img>`** dentro de `<picture>` (WebP com fallback JPG), dentro de `.banner-hero-img-wrap`.
- Isso permite:
  - **Preload** da imagem LCP no `<head>`.
  - **Prioridade** com `fetchpriority="high"` e `loading="eager"` apenas no hero.
  - Melhor métrica LCP, pois o recurso é explícito para o navegador.

### C) Boas práticas aplicadas no HTML
- **Preload:** `<link rel="preload" as="image" href="image/fundo_alteres.webp">` no `<head>` para dar prioridade ao hero.
- **Hero:** `<img>` com `width="1920" height="1080"` (proporção) para evitar layout shift; `loading="eager"`, `decoding="async"`, `fetchpriority="high"`.
- **Demais imagens:** `loading="lazy"` e `decoding="async"` em todas as imagens abaixo da dobra (feature, about, achievement, depoimentos, stat, footer).
- **Dimensões:** `width` e `height` definidos onde o tamanho é conhecido (ícones 65px, avatares 80px, logo, etc.) para reduzir CLS.
- **Overlays:** `z-index` garantido para overlay e conteúdo acima da imagem hero (z-index 0 no wrap da img, 1 nos overlays, 2 no conteúdo).

### D) Fontes
- **Preconnect** no `<head>` para:
  - `https://fonts.googleapis.com`
  - `https://fonts.gstatic.com` (crossorigin)
  - `https://cdnjs.cloudflare.com` (Font Awesome).
- Google Fonts (Poppins) já usa `&display=swap` na URL em `style.css`; não foi alterado.

### E) CSS e JS
- Scripts continuam no final do `<body>` (jQuery, Bootstrap, plugin, checkout, main); não bloqueiam o parsing inicial.
- CSS crítico do topo permanece inline no `<style>` do próprio documento; folhas externas (Bootstrap, plugin, style) são carregadas normalmente.

### F) Cache / headers
- No GitHub Pages não há controle de headers de cache. Sugestão: usar nomes de arquivo com versão (ex.: `fundo_alteres.v2.webp`) para cache busting quando fizer alterações em assets.

---

## 2. Relatório de imagens (pasta `/image`)

Tamanhos em KB/MB; dimensões em px quando disponíveis (medição local).  
Recomendações: **OK** (manter), **Otimizar** (reduzir tamanho/resolução), **Substituir** (por WebP/AVIF).

| Caminho | Tamanho | Dimensões (px) | Formato | Recomendação |
|---------|---------|----------------|---------|--------------|
| image/fundo_alteres.jpg | ~25,7 MB | 8256×5504 | jpg | **Otimizar** – Usar só como fallback; priorizar WebP. Considerar versão redimensionada (ex.: 1920×1280) se precisar servir JPG. |
| image/fundo_alteres.webp | ~1,31 MB | — | webp | **OK** para LCP – Já em uso no hero; é a imagem pré-carregada. Opcional: versão &lt; 200 KB (ex.: 1200px largura) para mobile. |
| image/treino_dieta.jpg | ~28,4 MB | — | jpg | **Otimizar** – Reduzir resolução e/ou converter para WebP; alvo &lt; 300 KB para fundo de seção. |
| image/people_active_sem_fundo.png | ~34,8 MB | — | png | **Substituir** – Já existe `people_active_sem_fundo.webp` em uso; remover ou não referenciar o PNG. |
| image/people_active_sem_fundo.webp | ~943 KB | — | webp | **OK** – Em uso na seção Conquistas. |
| image/team_sem_fundo.png | ~17,4 MB | — | png | **Substituir** – Usar apenas `team_sem_fundo.webp` (já em uso). |
| image/team_sem_fundo.webp | ~430 KB | — | webp | **OK** – Em uso na seção estatísticas. |
| image/logo_sem_fundo.png | ~2,2 MB | — | png | **Substituir** – Usar `logo_sem_fundo.webp` (já em uso no header/footer). |
| image/logo_sem_fundo.webp | ~150 KB | — | webp | **OK** – Header e footer. |
| image/fundo_alteres2.jpg | ~13,4 MB | — | jpg | **Otimizar** – Usado como fundo em CSS (pricing); redimensionar e/ou WebP; alvo &lt; 300 KB. |
| image/fundo_alteres3.jpg | ~11 MB | — | jpg | **Otimizar** – Idem; redimensionar e/ou WebP. |
| image/logo_mobile.png | ~2,6 MB | — | png | **Substituir** – Não usado no index atual; se usar, preferir WebP. |
| image/logo_horizontal.png | ~1,4 MB | — | png | **Substituir** – Se usar, converter para WebP. |
| image/logo.png | ~1,8 MB | — | png | **Otimizar** – Favicon; criar versão pequena (ex.: 32×32 ou 48×48, &lt; 50 KB). |
| image/premium.png | ~1,7 MB | — | png | **Otimizar** – Se usado, redimensionar ou WebP. |
| image/pedro_sem_fundo3.png | ~780 KB | 1024×1024 | png | **OK** – About; já razoável. Opcional: WebP para reduzir mais. |
| image/pedro_sem_fundo.png | ~1,4 MB | — | png | **Substituir** – Preferir versão WebP ou a já usada (pedro_sem_fundo3). |
| image/foto2.png | ~2,2 MB | — | png | **Otimizar** – Se usar, redimensionar e/ou WebP. |
| image/funfact-bg.png | ~91 KB | — | png | OK ou Otimizar (WebP). |
| image/circle-bg1.png | ~33,5 KB | — | png | OK. |
| Demais PNGs/JPGs (ícones, avatares, thumbs) | 10–65 KB | — | png/jpg | **OK** – Manter; já em faixa aceitável. Lazy loading aplicado. |

*Dimensões em “—” foram não medidas (ex.: WebP com ferramenta local); podem ser obtidas com inspecionar elemento ou ferramenta de imagem.*

---

## 3. Resumo

### Três imagens mais pesadas (por tamanho de arquivo)
1. **treino_dieta.jpg** (~28,4 MB) – fundo da seção Treino + Dieta.
2. **fundo_alteres.jpg** (~25,7 MB) – fallback do hero (WebP é o primário).
3. **people_active_sem_fundo.png** (~34,8 MB) – não usar; preferir o WebP.

### Imagem LCP (hero)
- **Arquivo efetivo:** `image/fundo_alteres.webp` (preload + `<picture>` no hero).
- **Fallback:** `image/fundo_alteres.jpg` (para navegadores sem WebP).

### Plano de ação sugerido
1. **Imediato (já feito):** Hero como `<img>`, preload do WebP, lazy + dimensões nas demais imagens, preconnect, z-index do hero/overlay.
2. **Próximos passos:**
   - Gerar versão do hero WebP em resolução menor para mobile (ex.: largura 1200px, &lt; 200 KB) e usar com `srcset`/`sizes` se quiser ir além.
   - Redimensionar e/ou converter `treino_dieta.jpg` e fundos `fundo_alteres2.jpg` / `fundo_alteres3.jpg` para WebP (&lt; 300 KB cada).
   - Garantir que apenas as versões WebP (ou otimizadas) sejam referenciadas; remover ou não usar PNGs/JPGs gigantes (people_active, team_sem_fundo, etc.).
   - Favicon: usar `logo.png` em tamanho pequeno (ex.: 32×32) ou favicon.ico &lt; 50 KB.

---

## 4. Verificação (Lighthouse / PageSpeed)

- Rodar **Lighthouse** (Chrome DevTools → Aba Lighthouse) em modo **Mobile**, categoria **Performance**.
- Conferir:
  - **LCP** (Largest Contentful Paint): elemento esperado é a imagem do banner hero; meta ≤ 2,5 s no mobile.
  - **CLS** (Cumulative Layout Shift): `width`/`height` nas imagens ajudam a manter baixo.
  - **FCP / TBT:** preload e preconnect devem ajudar no FCP; scripts no final do body evitam bloqueio.
- Se o LCP ainda for alto: verificar rede (throttling 4G) e considerar hero WebP em resolução menor para viewport mobile (ex.: `srcset` com 1200w).
