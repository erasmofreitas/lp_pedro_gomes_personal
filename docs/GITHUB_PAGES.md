# Publicar a LP no GitHub Pages

## 1. Subir o código no GitHub

Se ainda não fez o push do projeto:

```bash
git add .
git commit -m "LP Pedro Gomes pronta para teste"
git push origin main
```

## 2. Ativar o GitHub Pages no repositório

1. No GitHub, abra o repositório **erasmofreitas/lp_pedro_gomes_personal**.
2. Vá em **Settings** (Configurações).
3. No menu lateral, em **Code and automation**, clique em **Pages**.
4. Em **Source** (Fonte), escolha **Deploy from a branch**.
5. Em **Branch**, selecione **main** e pasta **/ (root)**.
6. Clique em **Save**.

## 3. Acessar o site

- Depois de alguns minutos, a LP fica disponível em:
  - **https://erasmofreitas.github.io/lp_pedro_gomes_personal/**
- Quem acessar essa URL ou a raiz do projeto será redirecionado para **landing.html** (sua LP).

## 4. Testar em dispositivos

- Abra o link no celular, tablet e desktop.
- Use o modo responsivo do navegador (F12 → ícone de dispositivo) para simular tamanhos diferentes.
- Confira links, botões, imagens e textos em cada tamanho de tela.

## Observações

- **index.html** na raiz redireciona para **landing.html**; assim a LP é a página inicial.
- Qualquer alteração em **landing.html**, **css/** ou **image/** basta ser commitada e enviada com `git push`; o GitHub Pages atualiza sozinho (pode levar 1–2 minutos).
- Se o repositório for público, o GitHub Pages é gratuito.
