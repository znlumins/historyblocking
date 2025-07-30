import { useEffect, useState, useRef } from "react";
// Kita tetap pakai window.location.href karena itu solusi paling stabil untuk keluar dari A-Frame
// import { useNavigate } from "react-router-dom"; 

// Deklarasi Tipe Global untuk TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'a-scene': any;
      'a-marker': any;
      'a-image': any;
      'a-entity': any;
    }
  }
}

const ARScan = () => {
  const sceneRef = useRef<any>(null);

  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadScript = (src: string, id: string) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = () => reject(`Gagal memuat script: ${src}`);
        document.body.appendChild(script);
      });
    };

    const loadARScripts = async () => {
      try {
        await loadScript("https://aframe.io/releases/1.3.0/aframe.min.js", "aframe-script");
        await loadScript("https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js", "arjs-script");
        setScriptsLoaded(true);
      } catch (err: any) {
        setError(err instanceof Error ? err.message : String(err));
      }
    };
    
    loadARScripts();
  }, []);

  useEffect(() => {
    if (!scriptsLoaded) return;
    let mounted = true;

    const initializeAR = async () => {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("API MediaDevices tidak didukung di browser ini.");
        }
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        stream.getTracks().forEach(track => track.stop());
        
        if (!mounted) return;
        const sceneEl = sceneRef.current;
        if (sceneEl) {
          const onSceneReady = () => {
            if (!mounted) return;
            const marker = document.querySelector("#ar-marker");
            if (marker) {
              marker.addEventListener("markerFound", () => { if (mounted) setShowButton(true); });
              marker.addEventListener("markerLost", () => { if (mounted) setShowButton(false); });
            }
            setIsInitialized(true);
          };

          if (sceneEl.hasLoaded) onSceneReady();
          else sceneEl.addEventListener("loaded", onSceneReady, { once: true });
        }
      } catch (err: any) {
        if (mounted) setError(`Tidak dapat mengakses kamera. Pastikan Anda menggunakan HTTPS dan izin kamera sudah diberikan. (${err.name})`);
      }
    };
    initializeAR();
    return () => { mounted = false; };
  }, [scriptsLoaded]);

  useEffect(() => {
    document.body.classList.add('ar-mode-active');
    return () => {
      document.body.classList.remove('ar-mode-active');
      document.body.removeAttribute('style');
      document.documentElement.removeAttribute('style');
      document.body.classList.remove('a-fullscreen');
      document.documentElement.classList.remove('a-fullscreen');
      const aframeStyles = document.head.querySelectorAll('style[data-aframe-inspector]');
      aframeStyles.forEach(style => style.remove());
    };
  }, []);

  const handleStartQuiz = () => { window.location.href = "/quiz/quiz-proklamasi"; };
  const handleBack = () => { window.location.href = "/kuis"; };

  if (error) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-5 sm:p-6 max-w-sm sm:max-w-md mx-auto text-center shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Terjadi Masalah</h2>
          <p className="text-gray-700 mb-6 text-sm sm:text-base">{error}</p>
          <div className="space-y-3">
            <button onClick={() => window.location.reload()} className="w-full bg-historic-brown text-white py-2 px-4 rounded hover:bg-historic-brown-dark text-base sm:text-lg">Coba Lagi</button>
            <button onClick={handleBack} className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 text-base sm:text-lg">Kembali</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {scriptsLoaded && (
        <a-scene 
          ref={sceneRef}
          embedded 
          // --- INI PERBAIKAN FINALNYA ---
          arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; videoTexture: true;" 
          vr-mode-ui="enabled: false" 
          renderer="logarithmicDepthBuffer: true; antialias: true; colorManagement: true; precision: medium;"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
        >
          <a-marker id="ar-marker" type="pattern" url="/patternHISTORICBLOCK.patt" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2">
            <a-image 
              src="/HISTORI.png" 
              width="1.5" 
              height="1.5"
              position="0 0.75 0"
              rotation="-90 0 0"
            />
          </a-marker>
          <a-entity camera look-controls-enabled="false" cursor="rayOrigin: mouse"></a-entity>
        </a-scene>
      )}

      {/* LAPISAN UI */}
      <div className="absolute inset-0 z-10 p-4 pointer-events-none">
        <button 
          onClick={handleBack} 
          className="pointer-events-auto absolute top-4 left-4 bg-black/70 text-white w-10 h-10 rounded-full hover:bg-black/90 transition-all text-xl flex items-center justify-center"
          aria-label="Kembali"
        >
          ←
        </button>
        <div className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-4 py-2 rounded-lg text-center transition-opacity duration-300 w-auto max-w-[90%] ${showButton || !isInitialized ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-sm font-medium">📱 Arahkan kamera ke pola</p>
        </div>
      </div>

      {showButton && (
        <button 
          onClick={handleStartQuiz} 
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 bg-historic-brown text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-historic-brown-dark transition-all duration-200 animate-pulse"
        >
          🎯 Mulai Kuis Sejarah
        </button>
      )}

      {/* LAPISAN LOADING */}
      {!isInitialized && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-30 p-4">
          <div className="text-center text-white max-w-xs">
            <div className="animate-spin rounded-full border-b-2 border-white mx-auto h-12 w-12 mb-4"></div>
            <p className="font-semibold text-lg">{scriptsLoaded ? 'Menginisialisasi Kamera...' : 'Memuat Library AR...'}</p>
            <p className="opacity-75 text-sm">Mohon izinkan akses kamera saat diminta</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ARScan;