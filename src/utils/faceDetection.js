import * as faceapi from 'face-api.js';

// Maps face-api.js expression names to our internal names
const EXPRESSION_MAP = {
  neutral: 'neutral',
  happy: 'happy',
  sad: 'sad',
  angry: 'angry',
  fearful: 'fear',
  disgusted: 'disgust',
  surprised: 'surprised',
};

class AdvancedFaceDetector {
  constructor() {
    this.isInitialized = false;
    this.isLoading = false;
  }

  async initialize() {
    if (this.isInitialized) return true;
    if (this.isLoading) return false;
    this.isLoading = true;

    try {
      console.log('[FaceAPI] Loading models...');
      // Use jsDelivr CDN - very fast and reliable globally
      const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);

      this.isInitialized = true;
      console.log('[FaceAPI] Models loaded successfully');
      return true;
    } catch (error) {
      console.error('[FaceAPI] Failed to load models:', error);
      // Try alternative CDN as fallback
      try {
        console.log('[FaceAPI] Trying fallback CDN...');
        const FALLBACK_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(FALLBACK_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(FALLBACK_URL),
        ]);
        this.isInitialized = true;
        console.log('[FaceAPI] Initialized via fallback CDN');
        return true;
      } catch (fallbackError) {
        console.error('[FaceAPI] Fallback also failed:', fallbackError);
        return false;
      }
    } finally {
      this.isLoading = false;
    }
  }

  async detectEmotionFromVideo(videoElement, canvasElement) {
    if (!this.isInitialized || !videoElement) return null;
    if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) return null;

    try {
      // Detect face + expressions (no landmarks needed = faster)
      const detection = await faceapi
        .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.5 }))
        .withFaceExpressions();

      if (!detection) return null;

      const expressions = detection.expressions;

      // Find the dominant expression
      const dominantKey = Object.keys(expressions).reduce((a, b) =>
        expressions[a] > expressions[b] ? a : b
      );

      const confidence = expressions[dominantKey];
      const emotion = EXPRESSION_MAP[dominantKey] || 'neutral';

      // Draw on canvas if provided
      if (canvasElement) {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        const ctx = canvasElement.getContext('2d');
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        const { box } = detection.detection;
        // Draw face box
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
    } catch (error) {
      // Non-critical — just skip this frame
      return null;
    }
  }

  dispose() {
    this.isInitialized = false;
    this.isLoading = false;
  }
}

export default AdvancedFaceDetector;
