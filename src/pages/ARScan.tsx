import { useEffect, useState, useRef } from "react";

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
  const [showButton, setShowButton] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const sceneRef = useRef<any>(null);

  // useEffect untuk inisialisasi AR dan event listener
  useEffect(() => {
    let mounted = true;

    const initializeAR = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (!mounted) return;

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

          if (sceneEl.hasLoaded) {
            onSceneReady();
          } else {
            sceneEl.addEventListener("loaded", onSceneReady, { once: true });
          }
        } else {
           if (mounted) setError("Komponen AR <a-scene> gagal ditemukan di DOM.");
        }
      } catch (err: any) {
        if (mounted) {
          let errorMessage = "Tidak dapat mengakses kamera. Pastikan Anda menggunakan HTTPS dan izin kamera sudah diberikan.";
          if (err.name === "NotAllowedError") {
            errorMessage = "Akses kamera ditolak. Mohon izinkan akses kamera di pengaturan browser Anda.";
          } else if (err.name === "NotFoundError") {
            errorMessage = "Tidak ada kamera yang ditemukan di perangkat ini.";
          }
          setError(`${errorMessage} (${err.name})`);
        }
      }
    };

    initializeAR();

    return () => {
      mounted = false;
    };
  }, []);

  // useEffect untuk styling body dan perbaikan paksa dengan JavaScript
  useEffect(() => {
    document.body.classList.add('ar-mode-active');
    
    // SOLUSI JAVASCRIPT: Jalankan perbaikan setelah AR.js kemungkinan selesai memuat
    const forceStyleCorrection = () => {
      const videoEl = document.querySelector('video[autoplay][playsinline]');
      if (videoEl) {
        // @ts-ignore
        videoEl.style.objectFit = 'contain';
      }
      
      // Paksa ulang style body dan html
      document.body.style.width = '100vw';
      document.body.style.height = '100dvh';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.width = '100vw';
      document.documentElement.style.height = '100dvh';
      document.documentElement.style.overflow = 'hidden';
    };

    // Jalankan beberapa kali untuk memastikan AR.js tidak menimpanya kembali
    const intervalId = setInterval(forceStyleCorrection, 500);
    setTimeout(forceStyleCorrection, 100); // Jalankan segera
    setTimeout(forceStyleCorrection, 1000); // Jalankan lagi setelah 1 detik

    return () => {
      document.body.classList.remove('ar-mode-active');
      
      // Kembalikan style body seperti semula saat komponen dibongkar
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      document.documentElement.style.overflow = '';
      
      clearInterval(intervalId); // Hentikan interval
    };
  }, []);

  const handleStartQuiz = () => { window.location.href = "/quiz/quiz-proklamasi"; };
  const handleBack = () => { window.location.href = "/kuis"; };

  if (error) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-5 sm:p-6 max-w-sm sm:max-w-md mx-auto text-center shadow-2xl">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Error Kamera</h2>
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
      <a-scene 
        ref={sceneRef}
        embedded 
        arjs="
          sourceType: webcam;
          sourceWidth: 800;
          sourceHeight: 600;
          displayWidth: 800;
          displayHeight: 600;
          debugUIEnabled: false;
          detectionMode: mono_and_matrix;
          matrixCodeType: 3x3;
        "
        vr-mode-ui="enabled: false" 
        renderer="logarithmicDepthBuffer: true; antialias: true; colorManagement: true;"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}
      >
        <a-marker id="ar-marker" type="pattern" url="/patternHISTORICBLOCK.patt" smooth="true" smoothCount="5" smoothTolerance="0.01" smoothThreshold="2">
          <a-image src="/HISTORI.png" width="1.5" height="1.5" position="0 0.75 0" look-at="[camera]" />
        </a-marker>
        <a-entity camera look-controls-enabled="false" cursor="rayOrigin: mouse"></a-entity>
      </a-scene>

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
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 w-full px-4 flex justify-center">
            <button 
              onClick={handleStartQuiz} 
              className="bg-historic-brown text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:bg-historic-brown-dark transition-all duration-200 animate-pulse pointer-events-auto"
            >
              🎯 Mulai Kuis Sejarah
            </button>
        </div>
      )}

      {!isInitialized && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-30 p-4">
          <div className="text-center text-white max-w-xs">
            <div className="animate-spin rounded-full border-b-2 border-white mx-auto h-12 w-12 mb-4"></div>
            <p className="font-semibold text-lg">Memuat Kamera AR...</p>
            <p className="opacity-75 text-sm">Mohon izinkan akses kamera</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ARScan;