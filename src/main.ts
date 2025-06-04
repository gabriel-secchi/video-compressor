import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

ffmpeg.on("progress", ({ progress }: { progress: number }) => {
  updatePercent(progress);
});

const fileInput = document.getElementById("fileInput") as HTMLInputElement;
const compressBtn = document.getElementById("compressBtn");
const panelStatus = document.getElementById("panelStatus") as HTMLDivElement;
//const chkMute = document.getElementById("chkMute");
const loader = document.getElementById("loader") as HTMLDivElement;

compressBtn?.addEventListener("click", async () => {

  console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(ffmpeg)));

  if (!fileInput.files?.length) {
    panelStatus.textContent = "escolha um arquivo primeiro.";
    return;
  }

  panelStatus.textContent = "carregando FFmpeg";
  await ffmpeg.load({
    coreURL: chrome.runtime.getURL('ffmpeg-core/ffmpeg-core.js'),
    wasmURL: chrome.runtime.getURL('ffmpeg-core/ffmpeg-core.wasm')
  });

  const file = fileInput.files[0]
  const data = await fetchFile(file);
  const INPUT_FILE = "input.mp4";
  const OUTPUT_FILE = "output.mp4";

  await ffmpeg.writeFile(INPUT_FILE, data);

  //-preset [ultrafast, superfast, fast, medium, slow]
  //-crf quanto menor o valor maior arquivo e maior qualidade de 0 até 50
  await ffmpeg.exec(['-i', INPUT_FILE, '-vcodec', 'libx264', '-crf', '28', '-preset', 'veryfast', OUTPUT_FILE]);

  const output = await ffmpeg.readFile(OUTPUT_FILE);
  const blob = new Blob([output], { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);

  const fileNameOutput = buildFileNameOutput(file.name);

  const a = document.createElement('a');
  a.href = url;
  a.download = fileNameOutput; //'compressed.mp4';
  a.click();

  panelStatus.textContent = "compressao concluída!";
});

function updatePercent(ratio: number) {
  const percent = Math.round(ratio * 100);
  panelStatus.textContent = `comprimindo vídeo: ${percent}%`;
  if (loader) {
    if (percent < 100) {
      loader.style.display = 'block';
    } else {
      loader.style.display = 'none';
    }
  }
}

function buildFileNameOutput(fileName: string) {
  const parts = fileName.split('.');
  const extension = parts.pop();
  const name = parts.join(".");
  const resultName = `${name}_compressed.${extension}`;
  return resultName;
}