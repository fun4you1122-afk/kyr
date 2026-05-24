'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Gold particle field
    const particleCount = 1800;
    const positions     = new Float32Array(particleCount * 3);
    const colors        = new Float32Array(particleCount * 3);
    const sizes         = new Float32Array(particleCount);

    const gold1 = new THREE.Color('#c4a55a');
    const gold2 = new THREE.Color('#e8d5a3');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Sphere distribution
      const r     = 3 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const col = Math.random();
      const c   = col < 0.5 ? gold1 : col < 0.8 ? gold2 : white;
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;

      sizes[i] = Math.random() * 3 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Central glowing orb
    const orbGeo = new THREE.SphereGeometry(0.6, 64, 64);
    const orbMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c4a55a'),
      emissive: new THREE.Color('#8b6914'),
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.85,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Wireframe ring
    const ringGeo = new THREE.TorusGeometry(1.2, 0.008, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: '#c4a55a', transparent: true, opacity: 0.3 });
    const ring1   = new THREE.Mesh(ringGeo, ringMat);
    const ring2   = new THREE.Mesh(ringGeo, ringMat.clone());
    const ring3   = new THREE.Mesh(ringGeo, ringMat.clone());
    ring1.rotation.x = Math.PI / 2;
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    ring3.rotation.z = Math.PI / 3;
    scene.add(ring1, ring2, ring3);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    const pointLight1  = new THREE.PointLight(0xc4a55a, 3, 10);
    const pointLight2  = new THREE.PointLight(0xe8d5a3, 2, 8);
    pointLight1.position.set(3, 3, 3);
    pointLight2.position.set(-3, -2, 2);
    scene.add(ambientLight, pointLight1, pointLight2);

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // Resize
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Particle galaxy rotation
      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.015;

      // Orb pulse
      const pulse = 1 + Math.sin(t * 1.5) * 0.05;
      orb.scale.setScalar(pulse);
      orbMat.emissiveIntensity = 0.4 + Math.sin(t * 2) * 0.2;

      // Rings
      ring1.rotation.y = t * 0.3;
      ring2.rotation.z = t * 0.2;
      ring3.rotation.x = t * 0.25;

      // Camera mouse follow
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
