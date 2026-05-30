'use client';
import { useEffect } from 'react';

export function WebGLBackground() {
  useEffect(() => {
    let renderer: any, scene: any, camera: any, clock: any;
    let buildings: any, cityLights: any, reflLights: any, dust: any, gem: any, gemHalo: any, keyLight: any;
    let progress = 0, pTarget = 0, bank = 0;
    let pmx = 0, pmy = 0;
    let animId: number;

    async function init() {
      const THREE = await import('three');

      const canvas = document.getElementById('webgl') as HTMLCanvasElement;
      if (!canvas) return;

      const isMobile = matchMedia('(max-width:768px)').matches;

      function glowTexture() {
        const c = document.createElement('canvas'); c.width = c.height = 128;
        const x = c.getContext('2d')!;
        const g = x.createRadialGradient(64, 64, 0, 64, 64, 64);
        g.addColorStop(0, 'rgba(255,236,190,1)');
        g.addColorStop(0.25, 'rgba(236,212,154,0.55)');
        g.addColorStop(1, 'rgba(236,212,154,0)');
        x.fillStyle = g; x.fillRect(0, 0, 128, 128);
        return new THREE.CanvasTexture(c);
      }
      const GLOW = glowTexture();
      const COLOR = {
        warm: new THREE.Color(0xecd49a),
        white: new THREE.Color(0xfff3d6),
        amber: new THREE.Color(0xbf8f47),
      };
      const fogNight = new THREE.Color(0x04060d);
      const fogDawn  = new THREE.Color(0x140d09);

      renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(innerWidth, innerHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;

      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x04060d, 0.015);

      camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 600);
      camera.position.set(0, 15, 64);

      scene.add(new THREE.AmbientLight(0x27314e, 0.55));
      keyLight = new THREE.PointLight(0xecd49a, 2.6, 280);
      keyLight.position.set(28, 48, 36); scene.add(keyLight);
      const cool = new THREE.PointLight(0x2f5f9e, 1.7, 320);
      cool.position.set(-48, 28, -34); scene.add(cool);
      const dir = new THREE.DirectionalLight(0xfff0d4, 0.55);
      dir.position.set(12, 36, 16); scene.add(dir);

      // Floor
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x05070f, metalness: 1.0, roughness: 0.42 });
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(700, 700), floorMat);
      floor.rotation.x = -Math.PI / 2; floor.position.y = -3.2;
      scene.add(floor);

      // Buildings
      const count = isMobile ? 150 : 340;
      const geo = new THREE.BoxGeometry(1, 1, 1);
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.25 });
      buildings = new THREE.InstancedMesh(geo, mat, count);
      const d = new THREE.Object3D();
      const baseCol = new THREE.Color();
      const cols = 8, rows = Math.ceil(count / cols), spacing = 7, lane = 11;
      let idx = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (idx >= count) break;
          const side = c < cols / 2 ? -1 : 1;
          const x = side * lane + (c - (cols - 1) / 2) * spacing + (Math.random() - 0.5) * 2.4;
          const z = 46 - r * 9.2 - Math.random() * 4;
          const h = 8 + Math.pow(Math.random(), 1.8) * 50;
          const w = 3 + Math.random() * 3.2, dep = 3 + Math.random() * 3.2;
          d.position.set(x, h / 2 - 3.2, z);
          d.scale.set(w, h, dep);
          d.rotation.y = (Math.random() - 0.5) * 0.18;
          d.updateMatrix();
          buildings.setMatrixAt(idx, d.matrix);
          const v = 0.05 + Math.random() * 0.05;
          baseCol.setRGB(v * 0.7, v * 0.8, v * 1.15);
          buildings.setColorAt(idx, baseCol);
          idx++;
        }
      }
      buildings.instanceMatrix.needsUpdate = true;
      if (buildings.instanceColor) buildings.instanceColor.needsUpdate = true;
      scene.add(buildings);

      // City lights
      function makeLightPoints(opacity: number, mirror: boolean) {
        const n = isMobile ? 1400 : 3200;
        const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
        const palette = [COLOR.warm, COLOR.white, COLOR.amber];
        for (let i = 0; i < n; i++) {
          const side = Math.random() < 0.5 ? -1 : 1;
          const y = Math.random() * 48 - 2;
          pos[i * 3] = side * (9 + Math.random() * 30);
          pos[i * 3 + 1] = mirror ? -(y) - 6.4 : y;
          pos[i * 3 + 2] = 46 - Math.random() * 220;
          const cl = palette[(Math.random() * 3) | 0];
          col[i * 3] = cl.r; col[i * 3 + 1] = cl.g; col[i * 3 + 2] = cl.b;
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
        g.setAttribute('color', new THREE.BufferAttribute(col, 3));
        const m = new THREE.PointsMaterial({
          size: mirror ? 0.5 : 0.44, vertexColors: true, transparent: true, opacity,
          blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
        });
        return new THREE.Points(g, m);
      }
      cityLights = makeLightPoints(0.92, false); scene.add(cityLights);
      reflLights = makeLightPoints(0.22, true);  scene.add(reflLights);

      // Dust
      const dn = isMobile ? 480 : 1100;
      const dpos = new Float32Array(dn * 3);
      for (let i = 0; i < dn; i++) {
        dpos[i * 3] = (Math.random() - 0.5) * 260;
        dpos[i * 3 + 1] = (Math.random() - 0.2) * 130;
        dpos[i * 3 + 2] = 44 - Math.random() * 280;
      }
      const dg = new THREE.BufferGeometry();
      dg.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
      const dm = new THREE.PointsMaterial({ size: 0.14, color: 0xc8a25a, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
      dust = new THREE.Points(dg, dm); scene.add(dust);

      // Gem
      const ggeo = new THREE.OctahedronGeometry(4.6, 0); ggeo.scale(1, 1.5, 1);
      const wire1 = new THREE.LineSegments(new THREE.EdgesGeometry(ggeo), new THREE.LineBasicMaterial({ color: 0xecd49a, transparent: true, opacity: 0.95 }));
      const ico = new THREE.IcosahedronGeometry(5.6, 0);
      const wire2 = new THREE.LineSegments(new THREE.EdgesGeometry(ico), new THREE.LineBasicMaterial({ color: 0xc8a25a, transparent: true, opacity: 0.35 }));
      const core = new THREE.Mesh(ggeo, new THREE.MeshBasicMaterial({ color: 0xc8a25a, transparent: true, opacity: 0.07, depthWrite: false }));
      gemHalo = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: 0xecd49a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.9 }));
      gemHalo.scale.set(46, 46, 1);
      gem = new THREE.Group();
      gem.add(gemHalo); gem.add(core); gem.add(wire1); gem.add(wire2);
      gem.position.set(0, 17.5, 20);
      gem.userData.w2 = wire2;
      scene.add(gem);

      // Atmosphere glows
      const spots: [number, number, number, number][] = [[-22, 24, -30, 70], [26, 30, -90, 90], [-30, 18, -150, 110], [18, 36, -200, 130]];
      spots.forEach(([x, y, z, s]) => {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color: 0xc8a25a, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.28 }));
        sp.position.set(x, y, z); sp.scale.set(s, s, 1); scene.add(sp);
      });

      clock = new THREE.Clock();

      const onResize = () => {
        camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      };
      window.addEventListener('resize', onResize);
      window.addEventListener('pointermove', (e: PointerEvent) => {
        pmx = e.clientX / innerWidth - 0.5;
        pmy = e.clientY / innerHeight - 0.5;
      }, { passive: true });
      document.addEventListener('visibilitychange', () => { document.hidden ? clock.stop() : clock.start(); });

      // Expose scroll API
      (window as any).KYRScene = {
        setProgress(v: number) { pTarget = Math.max(0, Math.min(1, v)); },
      };

      function animate() {
        animId = requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        progress += (pTarget - progress) * 0.06;
        const p = progress;

        const tz = 64 - p * 230;
        const ty = 15 - Math.sin(p * Math.PI) * 7 + p * 6;
        const tx = Math.sin(p * Math.PI * 1.12) * 9;
        camera.position.x += (tx + pmx * 5 - camera.position.x) * 0.05;
        camera.position.y += (ty - pmy * 3 - camera.position.y) * 0.05;
        camera.position.z += (tz - camera.position.z) * 0.08;
        camera.lookAt(pmx * 7, 10 + p * 6, camera.position.z - 34);

        const bankTarget = (-pmx * 0.06) + Math.sin(p * Math.PI * 1.12) * 0.045;
        bank += (bankTarget - bank) * 0.05;
        camera.rotation.z = bank;

        if (gem) {
          gem.rotation.y = t * 0.28;
          gem.rotation.x = Math.sin(t * 0.32) * 0.16;
          gem.position.y = 17.5 + Math.sin(t * 0.8) * 0.6;
          if (gem.userData.w2) gem.userData.w2.rotation.y = -t * 0.4;
          if (gemHalo) gemHalo.material.opacity = 0.75 + Math.sin(t * 1.6) * 0.12;
        }
        if (dust) dust.rotation.y = t * 0.012;
        if (cityLights) cityLights.material.opacity = 0.8 + Math.sin(t * 1.4) * 0.08;
        if (scene.fog) scene.fog.color.copy(fogNight).lerp(fogDawn, p);
        if (keyLight) keyLight.intensity = 2.6 + p * 1.8;

        renderer.render(scene, camera);
      }
      animate();
    }

    init().catch(err => {
      console.warn('WebGL init failed — continuing without 3D.', err);
      const c = document.getElementById('webgl');
      if (c) (c as HTMLElement).style.display = 'none';
    });

    return () => {
      cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas id="webgl" style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, display: 'block' }} />
  );
}
