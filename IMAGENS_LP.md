## Imagens utilizadas na LP (`index.html`)

Esta nota resume **apenas as imagens que aparecem na landing page** e define um **alvo de tamanho** para cada tipo, para guiar a otimização (exportação / compressão).

> Regra geral: pense em **mobile 4G**. Quanto menor (sem perder muito a qualidade), melhor para LCP e experiência.

---

### 1. Hero e fundos grandes

- **`image/fundo_alteres_1200x800.webp`**  
  - **Uso**: imagem principal do hero (LCP), carregada via `<picture>` e `preload`.  
  - **Recomendação**: **manter** como principal para o hero.  
  - **Alvo de tamanho**: **≤ 200–300 KB**.  
  - **Obs.**: já está em 1200×800, o que é adequado.

- **`image/fundo_alteres.jpg`**  
  - **Uso**: fallback do `<picture>` no hero + `background-image` do banner e da seção `#tecnologia`.  
  - **Recomendação**: **otimizar** (nova versão para web).  
  - **Alvo de tamanho**: **≤ 300–400 KB** em uma versão redimensionada (ex.: 1920×1080).  
  - **Obs.**: o arquivo original é enorme (8256×5504, ~25 MB); gere um JPG só para web.

- **`image/fundo_alteres.webp`**  
  - **Uso**: background das seções abaixo de tecnologia (`.about`, `.achievement`, `.service`, `.contact-qoute`, `.testimonial1`, `.stat`).  
  - **Recomendação**: **manter, mas reduzir se possível**.  
  - **Alvo de tamanho**: **≤ 300–400 KB**.  
  - **Sugestão**: gerar uma versão “bg” em 1600–1920 px de largura.

- **`image/team_sem_fundo.webp`**  
  - **Uso**: imagem grande na seção “Nossas estatísticas”.  
  - **Recomendação**: **manter**, mas verificar tamanho.  
  - **Alvo de tamanho**: **≤ 250–300 KB**.

- **`image/people_active_sem_fundo.webp`**  
  - **Uso**: imagem grande na seção “Nossas conquistas…”.  
  - **Recomendação**: **manter**, mas tentar reduzir se estiver muito acima.  
  - **Alvo de tamanho**: **≤ 250–300 KB**.

---

### 2. Slides do banner

- **`image/gym-workout-morning-2022-11-02-04-12-58-utc.jpg`**  
- **`image/fitness-gym-2021-11-02-02-16-08-utc1.jpg`**  
- **`image/the-female-athlete-training-hard-in-the-gym-fitne-2022-02-02-04-52-15-utc1.jpg`**  

Para cada uma:
- **Uso**: imagens de fundo no slider do banner, atrás do texto.  
- **Recomendação**: **otimizar** (principalmente para mobile).  
- **Alvo de tamanho**: **≤ 150–200 KB** cada.  
- **Sugestão**: exportar em ~1600 px de largura (JPG de qualidade 70–80% ou WebP).

---

### 3. Logo e favicon

- **`image/logo_sem_fundo.webp`**  
  - **Uso**: logo no header e no footer.  
  - **Recomendação**: **manter**, mas pode reduzir um pouco se estiver muito acima de 150 KB.  
  - **Alvo de tamanho**: **≤ 80–120 KB**.  
  - **Dimensões sugeridas**: 600–900 px de largura.

- **`image/logo.png`**  
  - **Uso**: favicon (ícone do navegador).  
  - **Recomendação**: **otimizar**.  
  - **Alvo de tamanho**: **≤ 30–50 KB**.  
  - **Dimensões sugeridas**: 32×32, 48×48 ou 64×64.

---

### 4. Foto do Pedro (about)

- **`image/pedro_sem_fundo3.png`**  
  - **Uso**: foto principal no círculo da seção “Quem é o Prof. Pedro Gomes” + mini-avatar ao lado do nome.  
  - **Recomendação**: **manter**, com opção de criar versão WebP.  
  - **Alvo de tamanho**: **≤ 200–300 KB** para a versão usada na LP.  
  - **Sugestão**: gerar `pedro_sem_fundo3.webp` em ~800×800 px.

---

### 5. Ícones da seção Tecnologia

- **`image/Fitness-and-Gym-07.png`**  
- **`image/Fitness-and-Gym-27.png`**  
- **`image/Fitness-and-Gym-09.png`**  
- **`image/Fitness-and-Gym-08.png`**  

Para cada:
- **Uso**: ícones 65×65 px na seção “A tecnologia a favor do seu resultado”.  
- **Recomendação**: **manter** (já são leves), ou converter para WebP se quiser espremer um pouco mais.  
- **Alvo de tamanho**: **≤ 20 KB** (idealmente 5–15 KB).

---

### 6. Avatares dos depoimentos

- **`image/portrait-of-personal-trainer-at-the-gym-2021-08-27-09-55-46-utc1.jpg`**  
- **`image/beautiful-fitness-woman-in-sportswear-doing-exerci-2021-08-28-00-08-34-utc1.jpg`**  
- **`image/trainer-helps-the-woman-to-perform-the-exercise-wi-2021-10-21-02-41-18-utc1.jpg`**  
- **`image/training-portrait-and-fitness-coach-doing-inspect-2022-12-24-04-35-50-utc1.jpg`**  

Para cada:
- **Uso**: avatar redondo 80×80 px nos cards de depoimentos.  
- **Recomendação**: **otimizar** (se ainda estiverem grandes).  
- **Alvo de tamanho**: **≤ 30–40 KB** cada (ideal 15–30 KB).  
- **Sugestão**: exportar em ~200×200 ou 256×256 px, JPG de qualidade 70–80% ou WebP.

---

### 7. Resumo por tipo de imagem

- **Hero / LCP (acima da dobra)**  
  - 1 imagem principal (`fundo_alteres_1200x800.webp`): **≤ 200–300 KB**.

- **Fundos de seções (grandes)**  
  - `fundo_alteres.webp`, `team_sem_fundo.webp`, `people_active_sem_fundo.webp` etc.:  
  - **≤ 250–400 KB** cada, preferencialmente WebP.

- **Fotos grandes dentro de seções (Pedro, equipe, conquistas)**  
  - **≤ 200–300 KB**.

- **Slides e fotos secundárias**  
  - **≤ 150–200 KB** por imagem.

- **Avatares (depoimentos)**  
  - **≤ 30–40 KB**.

- **Ícones**  
  - **≤ 20 KB**.

- **Logo principal (header/footer)**  
  - **≤ 80–120 KB** (WebP).

- **Favicon**  
  - **≤ 50 KB** (ideal ~30 KB).

---

### 8. Como usar este arquivo

1. Abra cada imagem no seu editor (Photoshop, Figma, Affinity, etc.).  
2. Ajuste **dimensões** e **qualidade** mirando o alvo desta tabela.  
3. Exporte como **WebP** sempre que possível; use JPG apenas como fallback ou quando fizer mais sentido.  
4. Substitua o arquivo mantendo o mesmo nome para não precisar mexer no HTML/CSS.  
5. Rode o Lighthouse (modo mobile) e confira LCP, peso total da página e uso de imagens otimizadas.

