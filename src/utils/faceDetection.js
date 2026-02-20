import * as faceapi from 'face-api.js';

// Maps face-api.js expression names to our internal emotion names
const EXPRESSION_MAP = {
  neutral: 'neutral',
  happy: 'happy',
  sad: 'sad',
  angry: 'angry',
  fearful: 'fear',
  disgusted: 'disgust',
  surprised: 'surprised',
};

// Extremely reliable CDN sources
const MODEL_URLS = [
  'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights',
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',
  'https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model/',
];

class AdvancedFaceDetector {
  constructor() {
    this.isInitialized = false;
    this.isLoading = false;
    this.onLog = (msg) => console.log(`[FaceAPI] ${msg}`);
  }

  async initialize() {
    if (this.isInitialized) return true;
    if (this.isLoading) return false;
    this.isLoading = true;

    for (let i = 0; i < MODEL_URLS.length; i++) {
      const url = MODEL_URLS[i];
      try {
        this.onLog(`Trying CDN ${i + 1}/${MODEL_URLS.length}...`);

        // Fast ping to check if URL is reachable
        const probe = await fetch(`${url}/tiny_face_detector_model-weights_manifest.json`, { method: 'HEAD' });
        if (!probe.ok) throw new Error(`CDN reached but file not found (${probe.status})`);

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(url),
          faceapi.nets.faceExpressionNet.loadFromUri(url),
        ]);

        this.isInitialized = true;
        this.isLoading = false;
        this.onLog(`✅ Models loaded successfully from source ${i + 1}`);
        return true;
      } catch (err) {
        this.onLog(`⚠️ Source ${i + 1} failed: ${err.message}`);
      }
    }

    this.isLoading = false;
    this.onLog('❌ All model sources failed. Check your internet connection or browser security settings.');
    return false;
  }

  async detectEmotionFromVideo(videoElement, canvasElement) {
    if (!this.isInitialized || !videoElement) return null;
    if (videoElement.readyState < 2) return null;

    try {
      const detection = await faceapi
        .detectSingleFace(
          videoElement,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 160, scoreThreshold: 0.4 })
        )
        .withFaceExpressions();

      if (!detection) return null;

      const expressions = detection.expressions;
      const dominantKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      // Draw face box on canvas if provided
      if (canvasElement) {
        const dims = faceapi.matchDimensions(canvasElement, videoElement, true);
        const resized = faceapi.resizeResults(detection, dims);
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        const { box } = resized.detection;
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      }

      return {
        emotion: EXPRESSION_MAP[dominantKey] || 'neutral',
        confidence: expressions[dominantKey],
        allScores: expressions,
        timestamp: new Date(),
      };
    } catch (err) {
      this.onLog(`Detection error: ${err.message}`);
      return null;
    }
  }

  dispose() {
    this.isInitialized = false;
    this.isLoading = false;
  }
}

export default AdvancedFaceDetector;
