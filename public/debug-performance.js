/**
 * Quality Drive - Production Performance Debugger
 *
 * Gebruik:
 * 1. Open Chrome DevTools (F12)
 * 2. Console tab
 * 3. Paste dit hele script
 * 4. Enter
 * 5. Bekijk output
 */

console.log('%c🔍 Quality Drive Performance Debugger', 'font-size: 20px; font-weight: bold; color: #0065A6');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #CBD5E1');

// 1. Environment Check
console.log('\n%c📍 Environment', 'font-size: 16px; font-weight: bold; color: #10B981');
console.log({
  URL: window.location.href,
  Host: window.location.host,
  Protocol: window.location.protocol,
  UserAgent: navigator.userAgent,
  Connection: navigator.connection?.effectiveType || 'unknown',
  OnlineStatus: navigator.onLine ? '✅ Online' : '❌ Offline'
});

// 2. Page Load Performance
console.log('\n%c⚡ Page Load Metrics', 'font-size: 16px; font-weight: bold; color: #F59E0B');
const perfData = performance.getEntriesByType('navigation')[0];
if (perfData) {
  console.table({
    'DNS Lookup': `${Math.round(perfData.domainLookupEnd - perfData.domainLookupStart)}ms`,
    'TCP Connection': `${Math.round(perfData.connectEnd - perfData.connectStart)}ms`,
    'TLS Negotiation': `${Math.round(perfData.secureConnectionStart ? perfData.connectEnd - perfData.secureConnectionStart : 0)}ms`,
    'Server Response (TTFB)': `${Math.round(perfData.responseStart - perfData.requestStart)}ms`,
    'Response Download': `${Math.round(perfData.responseEnd - perfData.responseStart)}ms`,
    'DOM Processing': `${Math.round(perfData.domComplete - perfData.domLoading)}ms`,
    'Total Load Time': `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
  });
} else {
  console.warn('❌ No navigation timing data available');
}

// 3. Resource Loading Analysis
console.log('\n%c📦 Resource Loading', 'font-size: 16px; font-weight: bold; color: #8B5CF6');
const resources = performance.getEntriesByType('resource');

const glbFiles = resources.filter(r => r.name.includes('.glb'));
const jsFiles = resources.filter(r => r.name.includes('.js'));
const cssFiles = resources.filter(r => r.name.includes('.css'));
const images = resources.filter(r => r.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)/));

console.log('3D Models (.glb):');
glbFiles.forEach(file => {
  const size = file.transferSize || file.encodedBodySize || 0;
  const time = Math.round(file.duration);
  const sizeKB = Math.round(size / 1024);
  const sizeMB = (size / (1024 * 1024)).toFixed(2);

  console.log(`  ${file.name.split('/').pop()}`);
  console.log(`    Size: ${sizeMB}MB (${sizeKB}KB)`);
  console.log(`    Time: ${time}ms`);
  console.log(`    Speed: ${size && time ? Math.round(size / 1024 / (time / 1000)) : 0} KB/s`);

  // Check if cached
  if (file.transferSize === 0) {
    console.log(`    ✅ Loaded from cache`);
  } else if (file.transferSize < file.encodedBodySize) {
    console.log(`    ✅ Compressed (${Math.round((1 - file.transferSize / file.encodedBodySize) * 100)}% reduction)`);
  } else {
    console.log(`    ⚠️ Not compressed!`);
  }
});

console.log(`\n📊 Summary:`);
console.table({
  'GLB Files': glbFiles.length,
  'JavaScript Files': jsFiles.length,
  'CSS Files': cssFiles.length,
  'Images': images.length,
  'Total Resources': resources.length
});

// 4. Canvas / 3D Rendering Check
console.log('\n%c🎨 3D Rendering', 'font-size: 16px; font-weight: bold; color: #EC4899');
const canvases = document.querySelectorAll('canvas');
console.log(`Canvas elements found: ${canvases.length}`);

canvases.forEach((canvas, i) => {
  console.log(`\nCanvas ${i + 1}:`);
  console.log(`  Size: ${canvas.width}x${canvas.height}px`);
  console.log(`  Pixel Ratio: ${window.devicePixelRatio}`);
  console.log(`  Total Pixels: ${(canvas.width * canvas.height / 1000000).toFixed(2)}M`);

  // Try to get WebGL context info
  const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      console.log(`  GPU Vendor: ${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}`);
      console.log(`  GPU Renderer: ${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}`);
    }
  }
});

// 5. FPS Monitor
console.log('\n%c🎯 FPS Monitor (5 seconds)', 'font-size: 16px; font-weight: bold; color: #06B6D4');
console.log('Starting FPS measurement...');

let frameCount = 0;
let startTime = performance.now();
let fpsValues = [];

function measureFPS() {
  frameCount++;
  const elapsed = performance.now() - startTime;

  if (elapsed >= 1000) {
    const fps = Math.round(frameCount * 1000 / elapsed);
    fpsValues.push(fps);
    console.log(`  FPS: ${fps} ${fps < 30 ? '⚠️ Low!' : fps > 55 ? '✅ Good' : '🟡 OK'}`);

    frameCount = 0;
    startTime = performance.now();

    if (fpsValues.length >= 5) {
      const avgFps = Math.round(fpsValues.reduce((a, b) => a + b) / fpsValues.length);
      const minFps = Math.min(...fpsValues);
      const maxFps = Math.max(...fpsValues);

      console.log(`\n📊 FPS Summary (5 seconds):`);
      console.table({
        'Average': avgFps,
        'Min': minFps,
        'Max': maxFps,
        'Status': avgFps > 55 ? '✅ Excellent' : avgFps > 30 ? '🟡 Acceptable' : '❌ Poor'
      });
      return; // Stop measuring
    }
  }

  requestAnimationFrame(measureFPS);
}

requestAnimationFrame(measureFPS);

// 6. Memory Check
console.log('\n%c💾 Memory Usage', 'font-size: 16px; font-weight: bold; color: #14B8A6');
if (performance.memory) {
  const used = (performance.memory.usedJSHeapSize / 1048576).toFixed(2);
  const total = (performance.memory.totalJSHeapSize / 1048576).toFixed(2);
  const limit = (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2);
  const percentage = Math.round((performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) * 100);

  console.table({
    'Used Memory': `${used} MB`,
    'Total Allocated': `${total} MB`,
    'Memory Limit': `${limit} MB`,
    'Usage': `${percentage}%`,
    'Status': percentage > 90 ? '❌ Critical' : percentage > 70 ? '⚠️ High' : '✅ Good'
  });
} else {
  console.log('⚠️ Memory API not available in this browser');
}

// 7. Network Quality Check
console.log('\n%c🌐 Network Quality', 'font-size: 16px; font-weight: bold; color: #3B82F6');
if (navigator.connection) {
  console.table({
    'Effective Type': navigator.connection.effectiveType,
    'Downlink': `${navigator.connection.downlink} Mbps`,
    'RTT (Latency)': `${navigator.connection.rtt} ms`,
    'Save Data Mode': navigator.connection.saveData ? '✅ Enabled' : '❌ Disabled'
  });
} else {
  console.log('⚠️ Network Information API not available');
}

// 8. Service Card Check
console.log('\n%c🎴 Service Cards', 'font-size: 16px; font-weight: bold; color: #F97316');
const serviceCards = document.querySelectorAll('[class*="serviceCard"]');
const icon3Ds = document.querySelectorAll('[class*="serviceIcon3D"]');

console.log(`Service Cards found: ${serviceCards.length}`);
console.log(`3D Icons found: ${icon3Ds.length}`);

// Add hover listener for testing
if (serviceCards.length > 0) {
  console.log('\n👆 Hover over a service card to test performance...');

  serviceCards.forEach((card, i) => {
    card.addEventListener('mouseenter', function testHover() {
      console.log(`\n%c🖱️ Card ${i + 1} Hovered`, 'font-weight: bold; color: #10B981');
      console.time(`Card ${i + 1} Animation`);

      // Measure FPS during hover
      let hoverFrames = 0;
      let hoverStart = performance.now();
      let measuring = true;

      function measureHoverFPS() {
        if (!measuring) return;
        hoverFrames++;

        const elapsed = performance.now() - hoverStart;
        if (elapsed >= 2000) { // Measure for 2 seconds
          const fps = Math.round(hoverFrames * 1000 / elapsed);
          console.log(`  Hover FPS: ${fps} ${fps < 30 ? '❌ Laggy!' : fps > 55 ? '✅ Smooth' : '🟡 OK'}`);
          console.timeEnd(`Card ${i + 1} Animation`);
          measuring = false;
        } else {
          requestAnimationFrame(measureHoverFPS);
        }
      }

      requestAnimationFrame(measureHoverFPS);

      card.addEventListener('mouseleave', () => {
        measuring = false;
      }, { once: true });

      // Remove this listener after first use
      card.removeEventListener('mouseenter', testHover);
    });
  });
}

// 9. Recommendations
console.log('\n%c💡 Recommendations', 'font-size: 16px; font-weight: bold; color: #8B5CF6');

const recommendations = [];

// Check GLB sizes
const totalGLBSize = glbFiles.reduce((sum, file) => sum + (file.transferSize || file.encodedBodySize || 0), 0);
if (totalGLBSize > 3 * 1024 * 1024) {
  recommendations.push('⚠️ GLB files are large (>3MB total). Consider further compression or use CDN.');
}

// Check if GLB files are cached
const uncachedGLB = glbFiles.filter(f => f.transferSize > 0 && f.transferSize === f.encodedBodySize);
if (uncachedGLB.length > 0) {
  recommendations.push('⚠️ Some GLB files are not cached. Check Cache-Control headers.');
}

// Check TTFB
if (perfData && (perfData.responseStart - perfData.requestStart) > 500) {
  recommendations.push('⚠️ Slow server response time (TTFB >500ms). Consider CDN or better hosting.');
}

// Check canvas count
if (canvases.length > 3) {
  recommendations.push('❌ Too many Canvas elements! Possible memory leak.');
}

// Check memory
if (performance.memory && (performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit) > 0.7) {
  recommendations.push('⚠️ High memory usage (>70%). Check for memory leaks.');
}

if (recommendations.length === 0) {
  console.log('✅ No major issues detected!');
} else {
  recommendations.forEach(rec => console.log(rec));
}

// 10. Export Function
console.log('\n%c📋 Export Results', 'font-size: 16px; font-weight: bold; color: #06B6D4');
console.log('Run this to copy results to clipboard:');
console.log('%ccopy(window.debugResults)', 'background: #1F2937; color: #10B981; padding: 4px 8px; border-radius: 4px;');

window.debugResults = {
  timestamp: new Date().toISOString(),
  url: window.location.href,
  performance: {
    ttfb: perfData ? Math.round(perfData.responseStart - perfData.requestStart) : null,
    loadTime: perfData ? Math.round(perfData.loadEventEnd - perfData.fetchStart) : null,
  },
  resources: {
    glbFiles: glbFiles.length,
    totalGLBSize: `${(totalGLBSize / 1048576).toFixed(2)} MB`,
    jsFiles: jsFiles.length,
    cssFiles: cssFiles.length,
    images: images.length,
  },
  rendering: {
    canvasCount: canvases.length,
    devicePixelRatio: window.devicePixelRatio,
  },
  memory: performance.memory ? {
    used: `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
    limit: `${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`,
  } : null,
  network: navigator.connection ? {
    type: navigator.connection.effectiveType,
    downlink: navigator.connection.downlink,
    rtt: navigator.connection.rtt,
  } : null,
  recommendations,
};

console.log('\n%c✅ Debug Complete!', 'font-size: 18px; font-weight: bold; color: #10B981');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #CBD5E1');
