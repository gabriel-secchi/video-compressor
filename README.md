# 🎬 Video Compressor Extension (Chrome)
### 🔗 Link da extensão [chromewebstore.google.com/detail/video-compressor](https://chromewebstore.google.com/detail/video-compressor/oejknmlndfaabjehofmcpgfmojnkklmn)

Uma extensão para navegador que permite **comprimir vídeos diretamente no seu navegador**, utilizando [`ffmpeg.wasm`](https://github.com/ffmpegwasm/ffmpeg.wasm) – uma versão WebAssembly do poderoso FFmpeg.  
✅ Tudo acontece localmente, com **privacidade garantida** e sem necessidade de enviar arquivos para a nuvem.</br>
📦 Sem limite de tamanho para arquivos</br>
🚫 Sem propagandas  

<p align="center">
<img width="486" height="319" alt="image" src="https://github.com/user-attachments/assets/2d5acf2c-01a6-4154-88d3-34fa6930692f" />
</p>


---

## ✨ Funcionalidades

- 📁 Selecionar arquivos de vídeo do seu computador
- 🔧 Comprimir vídeos com FFmpeg diretamente no navegador
- 📉 Indicador de progresso da compressão
- 💾 Download automático com o nome alterado (sufixo `_compressed`)
- ⚙️ Funciona com diversas extensões de vídeo comuns (.mp4, .mov etc.)
- 📑 Rodar o processamento em uma nova aba separada evitando interrupção involuntária

---

## 🛠️ Tecnologias utilizadas

- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
- HTML e CSS Vanilla
- Manifest V3 (padrão atual do Chrome para extensões)

---

## ▶️ Como rodar o projeto localmente

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/video-compressor-extension.git
cd video-compressor-extension
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Execute em modo desenvolvimento:**

```bash
npm run dev
```

> Observação: o modo dev serve apenas para testar a interface e o comportamento. Para usar como extensão, é necessário seguir os passos de build e instalação no navegador abaixo.

---

## 📦 Como buildar o projeto

Gere os arquivos finais que serão carregados como extensão:

```bash
npm run build
```

Os arquivos finais ficarão disponíveis na pasta `dist/`.

---

## 🧩 Como instalar a extensão no Chrome

1. Acesse o endereço:

```
chrome://extensions
```

2. Ative o **Modo do desenvolvedor** (canto superior direito).

3. Clique em **"Carregar sem compactação"**.

4. Selecione a pasta `dist/` que foi gerada após o build.

5. Pronto! A extensão será adicionada ao seu navegador.

---

## 🖼️ Ícone

O ícone representa compressão de vídeo com estilo flat e moderno. Ele está na pasta `public/` e é referenciado no arquivo `manifest.json`. Sinta-se à vontade para substituí-lo.

---

## 📄 Licença

Este projeto está licenciado sob os termos da [MIT License](LICENSE).

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas!  
Se você tiver ideias, melhorias ou bugs para reportar, abra uma issue ou envie um pull request.
