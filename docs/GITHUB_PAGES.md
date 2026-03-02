# Publicar a LP no GitHub Pages

## Repositório privado: o que fazer

No plano **gratuito** do GitHub, o **GitHub Pages só funciona em repositórios públicos**. Se o repositório estiver privado, você tem duas opções:

| Opção | Como |
|-------|------|
| **Tornar o repositório público** | Settings → General → Danger zone → **Change repository visibility** → **Make public**. Assim o Pages funciona de graça e a LP fica acessível pela URL. O código da LP fica visível para quem acessar o repo. |
| **Manter privado** | Só é possível usar Pages em repo privado com **GitHub Pro**, **Team** ou **Enterprise**. Em Settings → Pages você consegue ativar normalmente. |

Para só testar em dispositivos, tornar o repo público costuma ser o caminho mais simples. Depois você pode voltar para privado (e o site deixa de funcionar até ativar de novo ou tornar público outra vez).

---

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
- Quem acessar essa URL ou a raiz do projeto verá o **index.html** (sua LP).

## 4. Testar em dispositivos

- Abra o link no celular, tablet e desktop.
- Use o modo responsivo do navegador (F12 → ícone de dispositivo) para simular tamanhos diferentes.
- Confira links, botões, imagens e textos em cada tamanho de tela.

## Observações

- **index.html** na raiz é a própria LP (página inicial).
- Qualquer alteração em **index.html**, **css/** ou **image/** basta ser commitada e enviada com `git push`; o GitHub Pages atualiza sozinho (pode levar 1–2 minutos).
- No plano gratuito, o Pages exige repositório público (veja a seção acima).
