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

// Multiple CDN sources to try in order
const MODEL_URLS = [
  'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights',
  'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights',
];

class AdvancedFaceDetector {
  constructor() {
    this.isInitialized = false;
    this.isLoading = false;
  }

  async initialize() {
    if (this.isInitialized) return true;
    if (this.isLoading) return false;
    this.isLoading = true;

    for (let i = 0; i < MODEL_URLS.length; i++) {
      const url = MODEL_URLS[i];
      try {
        console.log(`[FaceAPI] Trying CDN ${i + 1}/${MODEL_URLS.length}: ${url}`);

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(url),
          faceapi.nets.faceExpressionNet.loadFromUri(url),
        ]);

        this.isInitialized = true;
        this.isLoading = false;
        console.log(`[FaceAPI] ✅ Models loaded from CDN ${i + 1}`);
        return true;
      } catch (err) {
        console.warn(`[FaceAPI] CDN ${i + 1} failed:`, err.message || err);
      }
    }

    // All CDNs failed
    this.isLoading = false;
    console.error('[FaceAPI] ❌ All CDN sources failed');
    return false;
  }

  async detectEmotionFromVideo(videoElement, canvasElement) {
    if (!this.isInitialized || !videoElement) return null;
    if (videoElement.readyState < 2 || videoElement.videoWidth === 0) return null;

    try {
      const detection = await faceapi
        .detectSingleFace(
          videoElement,
          new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 })
        )
        .withFaceExpressions();

      if (!detection) return null;

      const expressions = detection.expressions;
      const dominantKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      const emotion = EXPRESSION_MAP[dominantKey] || 'neutral';
      const confidence = expressions[dominantKey];

      // Draw face box on canvas
      if (canvasElement) {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        const { box } = detection.detection;
        ctx.strokeStyle = 'rgba(0, 200, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
      }

      return {
        emotion,
        confidence,
        allScores: Object.fromEntries(
          Object.entries(expressions).map(([k, v]) => [EXPRESSION_MAP[k] || k, v])
        ),
        timestamp: new Date(),
      };
    } catch {
      return null;
    }
  }

  dispose() {
    this.isInitialized = false;
    this.isLoading = false;
  }
}

export default AdvancedFaceDetector;
