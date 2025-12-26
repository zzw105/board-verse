import { spiritIslandMapImg } from "@board-verse/common";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import Stats from "three/examples/jsm/libs/stats.module.js";

export class SceneManager {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private container: HTMLElement;
  private animationId: number | null = null;
  private controls: OrbitControls;
  private stats: Stats;
  private globalGroup: THREE.Group;
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private dragging = false;
  private dragOffset = new THREE.Vector3();

  constructor(container: HTMLElement) {
    this.container = container;
    // 初始化场景
    this.scene = this.initScene();
    // 初始化相机
    this.camera = this.initCamera();
    // 初始化渲染器
    this.renderer = this.initRenderer();
    // 轨道控制器
    this.controls = this.initControls();
    // 初始化辅助器
    this.stats = this.initHelper();
    // 全局组
    this.globalGroup = this.initGlobalGroup();

    this.renderer.domElement.addEventListener("pointerdown", this.onPointerDown);
    this.renderer.domElement.addEventListener("pointermove", this.onPointerMove);
    this.renderer.domElement.addEventListener("pointerup", this.onPointerUp);
  }
  /**
   * 初始化场景
   */
  initScene() {
    return new THREE.Scene();
  }
  /**
   * 初始化相机
   */
  initCamera() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    return camera;
  }
  /**
   * 初始化渲染器
   */
  initRenderer() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    this.container.appendChild(renderer.domElement);
    return renderer;
  }
  /**
   * 初始化辅助器
   */
  initHelper() {
    // 坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    this.scene.add(axesHelper);

    // 新能监视器
    const stats = new Stats();
    stats.showPanel(0); // FPS
    this.container.appendChild(stats.dom);

    return stats;
  }
  /**
   * 初始化控制器
   */
  initControls() {
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 平滑
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // ❌ 禁止平移（非常关键）
    controls.enablePan = false;

    // ✅ 只允许正面（+Z）半圈旋转
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;

    // ✅ 只允许从上方 / 侧上方看
    // this.controls.minPolarAngle = Math.PI / 6; // 稍微有俯角
    // this.controls.maxPolarAngle = Math.PI / 2; // 不到正侧面

    // 缩放限制（桌游很重要）
    controls.minDistance = 2;
    controls.maxDistance = 20;

    controls.target.set(0, 0, 0);
    controls.update();
    return controls;
  }
  /**
   * 初始化全局组
   */
  initGlobalGroup() {
    const globalGroup = new THREE.Group();
    this.scene.add(globalGroup);

    // 背景
    const bgTexture = new THREE.TextureLoader().load(spiritIslandMapImg.background);

    // 允许纹理重复
    bgTexture.wrapS = THREE.RepeatWrapping;
    bgTexture.wrapT = THREE.RepeatWrapping;

    // 平铺次数（可调）
    bgTexture.repeat.set(20, 20);

    // 背景材质
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      side: THREE.DoubleSide,
    });

    // 一个很大的 XY 平面
    const bgGeometry = new THREE.PlaneGeometry(100, 100);
    const bgPlane = new THREE.Mesh(bgGeometry, bgMaterial);

    // 放在 XY 面（默认 Plane 就在 XY）
    bgPlane.position.z = -0.01; // 稍微往后一点，避免 Z-fighting

    globalGroup.add(bgPlane);

    // 地图
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(spiritIslandMapImg.map_1_a, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace; // 使用 sRGB 色彩空间

      const imgWidth = texture.image.width;
      const imgHeight = texture.image.height;
      const aspect = imgWidth / imgHeight;

      const height = imgHeight / 500; // 固定高度
      const width = height * aspect; // 按比例计算宽度

      const geometry = new THREE.PlaneGeometry(width, height);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        alphaTest: 0.5,
        side: THREE.DoubleSide, // 双面可看
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      globalGroup.add(mesh);
    });

    return globalGroup;
  }

  animate = () => {
    this.stats.begin();
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    this.animationId = requestAnimationFrame(this.animate);
    // console.log(this.controls.getPolarAngle() / Math.PI);

    this.stats.end();
  };

  start() {
    this.animate();
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  resize = () => {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  onPointerDown = (event: PointerEvent) => {
    if (event.button !== 2) return;
    this.updateMouse(event);

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObject(this.globalGroup);

    if (intersects.length > 0) {
      this.dragging = true;
      this.dragOffset.copy(intersects[0].point).sub(this.globalGroup.position);
    }
  };

  onPointerMove = (event: PointerEvent) => {
    if (!this.dragging) return;

    this.updateMouse(event);
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // XY 平面（Z 固定）
    const fixedZ = this.globalGroup.position.z; // 保持原来的 Z
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -this.globalGroup.position.z);
    const hitPoint = new THREE.Vector3();

    if (this.raycaster.ray.intersectPlane(plane, hitPoint)) {
      // 只更新 XY
      this.globalGroup.position.x = hitPoint.x - this.dragOffset.x;
      this.globalGroup.position.y = hitPoint.y - this.dragOffset.y;
      // Z 不变
      this.globalGroup.position.z = fixedZ;
    }
  };

  onPointerUp = (event: PointerEvent) => {
    if (event.button !== 2) return;
    this.dragging = false;
  };

  updateMouse(event: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }
}
