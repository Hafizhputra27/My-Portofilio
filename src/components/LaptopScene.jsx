import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import useInView from '../hooks/useInView.js'

// ─── helpers ────────────────────────────────────────────────────────────────

function lerp(a, b, t) {
  return a + (b - a) * t
}

function makeGrainTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 256
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#7c7ef5'
  ctx.fillRect(0, 0, 256, 256)
  for (let i = 0; i < 18000; i++) {
    const x = Math.random() * 256
    const y = Math.random() * 256
    const alpha = Math.random() * 0.12
    ctx.fillStyle = `rgba(255,255,255,${alpha})`
    ctx.fillRect(x, y, 1, 1)
  }
  return new THREE.CanvasTexture(canvas)
}

function makeMaterials(grainTex) {
  const LeatherMat = new THREE.MeshStandardMaterial({
    color: 0x7c7ef5,
    roughness: 0.75,
    metalness: 0.08,
    map: grainTex,
  })
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x0a0a1a,
    roughness: 0.9,
    metalness: 0.1,
  })
  const keyMat = new THREE.MeshStandardMaterial({
    color: 0x2a2a4a,
    roughness: 0.8,
    metalness: 0.05,
  })
  const keyEmissiveMat = new THREE.MeshStandardMaterial({
    color: 0x7b7ff5,
    roughness: 0.8,
    metalness: 0.05,
    emissive: new THREE.Color(0x7b7ff5),
    emissiveIntensity: 0.6,
  })
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.3,
    opacity: 0.3,
    transparent: true,
  })
  const glowMat = new THREE.MeshStandardMaterial({
    color: 0x7b7ff5,
    roughness: 1.0,
    metalness: 0.0,
    emissive: new THREE.Color(0x7b7ff5),
    emissiveIntensity: 0.4,
    opacity: 0.15,
    transparent: true,
  })
  return { LeatherMat, screenMat, keyMat, keyEmissiveMat, glassMat, glowMat }
}

// ─── base geometry ───────────────────────────────────────────────────────────

function buildBase(laptopGroup, mats) {
  const { LeatherMat, screenMat, keyMat, keyEmissiveMat, glassMat } = mats

  // Main base body
  const baseGeo = new THREE.BoxGeometry(3.2, 0.18, 2.2)
  const baseMesh = new THREE.Mesh(baseGeo, LeatherMat)
  baseMesh.position.set(0, 0, 0)
  laptopGroup.add(baseMesh)

  // Four edge trim pieces
  const trimData = [
    { size: [3.2, 0.04, 0.04], pos: [0, 0.11, 1.1] },
    { size: [3.2, 0.04, 0.04], pos: [0, 0.11, -1.1] },
    { size: [0.04, 0.04, 2.2], pos: [1.6, 0.11, 0] },
    { size: [0.04, 0.04, 2.2], pos: [-1.6, 0.11, 0] },
  ]
  trimData.forEach(({ size, pos }) => {
    const geo = new THREE.BoxGeometry(...size)
    const mesh = new THREE.Mesh(geo, LeatherMat)
    mesh.position.set(...pos)
    laptopGroup.add(mesh)
  })

  // Keyboard area
  const kbAreaGeo = new THREE.BoxGeometry(2.6, 0.01, 1.5)
  const kbAreaMesh = new THREE.Mesh(kbAreaGeo, screenMat)
  kbAreaMesh.position.set(0, 0.095, 0.2)
  laptopGroup.add(kbAreaMesh)

  // 4×13 key grid (row 3 uses 10 wider keys)
  const keyW = 0.16
  const keyH = 0.025
  const keyD = 0.14
  const wideKeyW = 0.22
  const gapX = 0.04
  const gapZ = 0.04
  const rows = 4
  const cols = 13
  const wideRow = 2 // 0-indexed, row 3 in 1-indexed

  for (let row = 0; row < rows; row++) {
    const isWideRow = row === wideRow
    const numKeys = isWideRow ? 10 : cols
    const kw = isWideRow ? wideKeyW : keyW
    const totalW = numKeys * kw + (numKeys - 1) * gapX
    const startX = -totalW / 2 + kw / 2

    for (let col = 0; col < numKeys; col++) {
      const geo = new THREE.BoxGeometry(kw, keyH, keyD)
      const useEmissive = Math.random() < 0.08
      const mat = useEmissive ? keyEmissiveMat : keyMat
      const mesh = new THREE.Mesh(geo, mat)
      const x = startX + col * (kw + gapX)
      const z = -0.55 + row * (keyD + gapZ)
      mesh.position.set(x, 0.105, z + 0.2)
      laptopGroup.add(mesh)
    }
  }

  // Touchpad
  const tpGeo = new THREE.BoxGeometry(0.9, 0.008, 0.6)
  const tpMesh = new THREE.Mesh(tpGeo, keyMat)
  tpMesh.position.set(0, 0.095, 0.82)
  laptopGroup.add(tpMesh)

  // Touchpad glass overlay
  const tpGlassGeo = new THREE.BoxGeometry(0.88, 0.005, 0.58)
  const tpGlassMesh = new THREE.Mesh(tpGlassGeo, glassMat)
  tpGlassMesh.position.set(0, 0.1, 0.82)
  laptopGroup.add(tpGlassMesh)

  // Hinge
  const hingeGeo = new THREE.CylinderGeometry(0.045, 0.045, 2.8, 16)
  const hingeMesh = new THREE.Mesh(hingeGeo, screenMat)
  hingeMesh.rotation.z = Math.PI / 2
  hingeMesh.position.set(0, 0.09, -1.1)
  laptopGroup.add(hingeMesh)
}

// ─── screen pivot ────────────────────────────────────────────────────────────

function buildScreen(laptopGroup, mats) {
  const { LeatherMat, screenMat, glassMat, glowMat } = mats

  const screenPivot = new THREE.Group()
  screenPivot.position.set(0, 0.09, -1.1)
  screenPivot.rotation.x = -2.18

  // Lid back
  const lidGeo = new THREE.BoxGeometry(3.2, 0.06, 2.1)
  const lidMesh = new THREE.Mesh(lidGeo, LeatherMat)
  lidMesh.position.set(0, 0, 1.05)
  screenPivot.add(lidMesh)

  // Bezel
  const bezelGeo = new THREE.BoxGeometry(3.0, 0.04, 1.9)
  const bezelMesh = new THREE.Mesh(bezelGeo, screenMat)
  bezelMesh.position.set(0, 0.05, 1.05)
  screenPivot.add(bezelMesh)

  // Display panel
  const displayMat = new THREE.MeshStandardMaterial({
    color: 0x0d1230,
    roughness: 0.5,
    metalness: 0.1,
    emissive: new THREE.Color(0x0d1230),
    emissiveIntensity: 0.6,
  })
  const displayGeo = new THREE.BoxGeometry(2.7, 0.02, 1.65)
  const displayMesh = new THREE.Mesh(displayGeo, displayMat)
  displayMesh.position.set(0, 0.07, 1.05)
  screenPivot.add(displayMesh)

  // Screen glow overlay
  const glowGeo = new THREE.PlaneGeometry(2.7, 1.65)
  const screenGlowMesh = new THREE.Mesh(glowGeo, glowMat)
  screenGlowMesh.rotation.x = -Math.PI / 2
  screenGlowMesh.position.set(0, 0.085, 1.05)
  screenPivot.add(screenGlowMesh)

  // 3 UI mockup panels
  const uiColors = [0x3b3f8c, 0x5b5fcc, 0x7b7ff5]
  const uiWidths = [1.8, 2.2, 1.4]
  const uiHeights = [0.25, 0.18, 0.3]
  const uiOffsets = [[-0.3, 0.55], [0, 0.2], [0.4, -0.2]]
  uiColors.forEach((col, i) => {
    const uiMat = new THREE.MeshStandardMaterial({
      color: col,
      roughness: 0.8,
      metalness: 0.0,
      emissive: new THREE.Color(col),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.7,
    })
    const uiGeo = new THREE.PlaneGeometry(uiWidths[i], uiHeights[i])
    const uiMesh = new THREE.Mesh(uiGeo, uiMat)
    uiMesh.rotation.x = -Math.PI / 2
    uiMesh.position.set(uiOffsets[i][0], 0.09, 1.05 + uiOffsets[i][1])
    screenPivot.add(uiMesh)
  })

  // Webcam dot
  const camGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.015, 12)
  const camMat = new THREE.MeshStandardMaterial({ color: 0x111122, roughness: 0.9, metalness: 0.2 })
  const camMesh = new THREE.Mesh(camGeo, camMat)
  camMesh.rotation.x = Math.PI / 2
  camMesh.position.set(0, 0.06, 0.1)
  screenPivot.add(camMesh)

  laptopGroup.add(screenPivot)
  return screenGlowMesh
}

// ─── main component ──────────────────────────────────────────────────────────

const gradientPlaceholder = (
  <div
    style={{
      width: '100%',
      height: '520px',
      borderRadius: '24px',
      background: 'linear-gradient(135deg, #a5b4fc 0%, #c4b5fd 50%, #93c5fd 100%)',
    }}
  />
)

export default function LaptopScene() {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const laptopGroupRef = useRef(null)
  const screenPivotRef = useRef(null)
  const screenGlowRef = useRef(null)
  const purpleLightRef = useRef(null)
  const animFrameRef = useRef(null)
  const clockRef = useRef(null)
  const targetRotRef = useRef({ x: 0, y: 0.3 })
  const [webglFailed, setWebglFailed] = useState(false)

  const isInView = useInView(canvasRef)

  // ── init scene ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    } catch {
      setWebglFailed(true)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    rendererRef.current = renderer

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(40, canvas.clientWidth / canvas.clientHeight, 0.1, 100)
    camera.position.set(0, 1.5, 5.5)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    resizeObserver.observe(canvas)
    // Initial size
    const w0 = canvas.clientWidth || 520
    const h0 = canvas.clientHeight || 520
    renderer.setSize(w0, h0, false)
    camera.aspect = w0 / h0
    camera.updateProjectionMatrix()

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(3, 6, 4)
    dirLight.castShadow = true
    scene.add(dirLight)

    const purpleLight = new THREE.PointLight(0x7b7ff5, 1.5)
    purpleLight.position.set(-3, 3, 2)
    scene.add(purpleLight)
    purpleLightRef.current = purpleLight

    const blueLight = new THREE.PointLight(0xa5b4fc, 1.0)
    blueLight.position.set(3, 1, -2)
    scene.add(blueLight)

    // Materials
    const grainTex = makeGrainTexture()
    const mats = makeMaterials(grainTex)

    // Laptop group
    const laptopGroup = new THREE.Group()
    scene.add(laptopGroup)
    laptopGroupRef.current = laptopGroup

    // Build geometry
    buildBase(laptopGroup, mats)
    const screenGlowMesh = buildScreen(laptopGroup, mats)
    screenGlowRef.current = screenGlowMesh

    // Store screenPivot ref (last child added to laptopGroup)
    screenPivotRef.current = laptopGroup.children[laptopGroup.children.length - 1]

    // Clock
    const clock = new THREE.Clock()
    clockRef.current = clock

    // Mouse interaction on hero container
    const heroSection = document.getElementById('hero')
    const onMouseMove = (e) => {
      const winW = window.innerWidth || 1
      const winH = window.innerHeight || 1
      const normalizedX = (e.clientX / winW) * 2 - 1
      const normalizedY = (e.clientY / winH) * 2 - 1
      targetRotRef.current = {
        x: normalizedY * 0.15,
        y: 0.3 + normalizedX * 0.35,
      }
    }
    const onMouseLeave = () => {
      targetRotRef.current = { x: 0, y: 0.3 }
    }
    if (heroSection) {
      heroSection.addEventListener('mousemove', onMouseMove)
      heroSection.addEventListener('mouseleave', onMouseLeave)
    }

    // Animation loop
    function animate() {
      animFrameRef.current = requestAnimationFrame(animate)
      const t = clockRef.current.getElapsedTime()

      // Floating
      laptopGroup.position.y = 0.1 + Math.sin(t) * 0.04

      // Purple light pulse
      if (purpleLightRef.current) {
        purpleLightRef.current.intensity = 1.5 + Math.sin(t * 0.8) * 0.3
      }

      // Screen glow pulse
      if (screenGlowRef.current) {
        screenGlowRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.8) * 0.1
      }

      // Lerp rotations
      const target = targetRotRef.current
      if (screenPivotRef.current) {
        screenPivotRef.current.rotation.x = lerp(
          screenPivotRef.current.rotation.x,
          target.x - 2.18,
          0.06
        )
      }
      laptopGroup.rotation.y = lerp(laptopGroup.rotation.y, target.y, 0.06)

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      // Cleanup
      cancelAnimationFrame(animFrameRef.current)
      resizeObserver.disconnect()
      if (heroSection) {
        heroSection.removeEventListener('mousemove', onMouseMove)
        heroSection.removeEventListener('mouseleave', onMouseLeave)
      }
      // Dispose geometries and materials
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose())
          else obj.material.dispose()
        }
      })
      grainTex.dispose()
      renderer.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── pause / resume based on visibility ──────────────────────────────────────
  useEffect(() => {
    if (!rendererRef.current) return

    if (!isInView) {
      cancelAnimationFrame(animFrameRef.current)
    } else {
      // Restart loop
      const renderer = rendererRef.current
      const scene = sceneRef.current
      const camera = cameraRef.current
      const laptopGroup = laptopGroupRef.current

      function animate() {
        animFrameRef.current = requestAnimationFrame(animate)
        const t = clockRef.current.getElapsedTime()

        if (laptopGroup) {
          laptopGroup.position.y = 0.1 + Math.sin(t) * 0.04
        }
        if (purpleLightRef.current) {
          purpleLightRef.current.intensity = 1.5 + Math.sin(t * 0.8) * 0.3
        }
        if (screenGlowRef.current) {
          screenGlowRef.current.material.emissiveIntensity = 0.4 + Math.sin(t * 1.8) * 0.1
        }
        const target = targetRotRef.current
        if (screenPivotRef.current) {
          screenPivotRef.current.rotation.x = lerp(
            screenPivotRef.current.rotation.x,
            target.x - 2.18,
            0.06
          )
        }
        if (laptopGroup) {
          laptopGroup.rotation.y = lerp(laptopGroup.rotation.y, target.y, 0.06)
        }
        renderer.render(scene, camera)
      }
      animate()
    }
  }, [isInView])

  if (webglFailed) return gradientPlaceholder

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label="Interactive 3D laptop scene"
    />
  )
}
