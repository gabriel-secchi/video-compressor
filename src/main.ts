import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

const ffmpeg = new FFmpeg();

ffmpeg.on("progress", ({ progress }: { progress: number }) => {
  updatePercent(progress);
});

//to activate ffmpeg logs
//ffmpeg.on("log", ({ type, message }) => {
//  console.log(`[FFmpeg ${type}] ${message}`);
//});

const fileInput = document.getElementById("videoInput") as HTMLInputElement;
const videoButton = document.getElementById("videoButton") as HTMLButtonElement;
const panelStatus = document.getElementById("statusText") as HTMLDivElement;
const loader = document.getElementById("progressBar") as HTMLDivElement;

videoButton?.addEventListener("click", async () => {
  fileInput?.click();
});

fileInput?.addEventListener("change", async () => {

  if (!fileInput.files?.length) {
    panelStatus.textContent = "primeiro escolha um arquivo";
    return;
  }

  try {
    videoButton.disabled = true;
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
    await ffmpeg.exec([
      '-i', INPUT_FILE,
      //'-vf', 'fps=30,scale=1080:-1',
      '-vcodec', 'libx264',
      '-crf', '28',
      '-preset', 'veryfast',
      //'-vsync', 'vfr',
      OUTPUT_FILE
    ]);

    const output = await ffmpeg.readFile(OUTPUT_FILE);
    const blob = new Blob([output], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);

    const fileNameOutput = buildFileNameOutput(file.name);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileNameOutput;
    a.click();

    panelStatus.textContent = "compressao concluída!";
  }
  catch (err) {
    console.error(err);
    panelStatus.textContent = "Erro na compressão.";
  }
  finally {
    fileInput.value = "";
    videoButton.disabled = false;
  }
});

function updatePercent(ratio: number) {
  const percent = Math.round(ratio * 100);
  panelStatus.textContent = `comprimindo vídeo: ${percent}%`;
  if (loader) {
    loader.style.width = percent + "%";
  }
}

function buildFileNameOutput(fileName: string) {
  const parts = fileName.split('.');
  const extension = parts.pop();
  const name = parts.join(".");
  const resultName = `${name}_compressed.${extension}`;
  return resultName;
}
