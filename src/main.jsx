import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { projects, jobs, education } from "./data";
import "./styles.css";
import Hero from "./Hero";
import ResilientImage from './ResilientImage';
import CarouselRow from './CarouselRow';
import webImages from './web-images.json';
const imageDimensions = (src) => webImages.dimensions[src.replace(import.meta.env.BASE_URL, '')] || {};
const carouselAssets = import.meta.glob('../首页轮播图片/*/*.{png,jpg,jpeg,webp,avif,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const carouselRows = ['第一行', '第二行', '第三行', '第四行', '第五行', '第六行'].map((folder) => ({
  folder,
  images: Object.entries(carouselAssets)
    .filter(([path]) => path.split('/').at(-2) === folder)
    .sort(([a], [b]) => a.split('/').at(-1).localeCompare(b.split('/').at(-1), 'zh-CN', { numeric: true }))
    .map(([path, src]) => ({ src, thumbnail: `${import.meta.env.BASE_URL}${webImages.carousel[path].src}`, placeholder: webImages.carousel[path].placeholder, name: path.split('/').at(-1).replace(/\.[^.]+$/, '') })),
}));
const services = [
  ["01", "视觉设计", "品牌、海报、宣传物料与完整视觉系统。"],
  ["02", "原创 IP", "日系角色、原创 IP、世界观与故事线。"],
  ["03", "3D 建模", "角色、产品与场景的建模及效果图渲染。"],
  ["04", "UI｜交互", "游戏 UI、小程序页面与交互体验设计。"],
  ["05", "AI 工作流", "使用 AI + PS 提升从创意到落地的效率。"],
];
const Contact = () => (
  <div className="contact-block">
    <a className="contact-btn" href="mailto:luminakwan@gmail.com">
      联系我
    </a>
    <a className="contact-email" href="mailto:luminakwan@gmail.com">
      luminakwan@gmail.com
    </a>
  </div>
);
function App() {
  const [preview, setPreview] = useState(null);
  const previewDialog = useRef(null);
  useEffect(() => {
    if (!preview) return;
    const dialog = previewDialog.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);
  const [o, setO] = useState(null),
    [m, setM] = useState(false),
    go = (id) => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setM(false);
    };
  return (
    <div className="site">
      <header>
        <b>
          kwan<span>®</span>
        </b>
        <nav className={m ? "show" : ""}>
          <a onClick={() => go("about")}>关于我</a>
          <a onClick={() => go("services")}>能力</a>
          <a onClick={() => go("projects")}>作品</a>
          <a onClick={() => go("contact")}>联系</a>
        </nav>
        <button className="hamb" onClick={() => setM(!m)}>
          {m ? <X /> : <Menu />}
        </button>
      </header>
      <Hero />
      <section className="dual-carousel" aria-label="作品预览">
        {carouselRows.map((row, rowIndex) => <CarouselRow key={row.folder} {...row} rowIndex={rowIndex} onPreview={setPreview} />)}
      </section>
      <section id="about" className="dark about">
        <span className="kicker">01 / ABOUT ME</span>
        <h2>
          ABOUT
          <br />
          <em>ME</em>
        </h2>
        <p>
          我是一名专注于视觉传达、ip角色创作、产品设计、品牌设计、UI
          设计及交互设计的专业设计师。拥有丰富的跨领域设计经验，横跨游戏、潮玩、品牌与工业产品。相信设计是情感与功能的结合，喜欢把复杂的需求转化为清晰、有温度的视觉语言。
        </p>
      </section>
      <section id="services" className="services">
        <h2>SERVICES</h2>
        <div className="service-list">
          {services.map((s) => (
            <div className="service" key={s[0]}>
              <strong>{s[0]}</strong>
              <div>
                <h3>{s[1]}</h3>
                <p>{s[2]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="projects" className="dark projects">
        <span className="kicker">02 / SELECTED WORKS</span>
        <h2>
          PROJECT<span>.</span>
        </h2>
        <p className="projects-intro">
          <span lang="en">
            Selected projects I’ve taken from concept to reality.
          </span>
          <span lang="zh-CN">
            精选一些由我从概念阶段一路推动到最终落地的项目。
          </span>
        </p>
        <div className="project-stack">
          {projects.slice(0, 3).map((p, i) => (
            <article className={`stack-card ${p.id}`} key={p.id}>
              <div className="card-head">
                <strong>0{i + 1}</strong>
                <div>
                  <small>{p.category}</small>
                  <h3>{p.title}</h3>
                </div>
                <button onClick={() => setO(p)}>VIEW PROJECT ↗</button>
              </div>
              <div className="card-images">
                {(i === 0 || i === 1 || i === 2) && (
                  <>
                    <div className="art-column">
                      {p.images
                        .filter((_, j) => j % 2 === 0)
                        .map((src, j) => (
                          <ResilientImage
                            key={j}
                            src={src}
                            {...imageDimensions(src)}
                            alt={`${p.title} ${j * 2 + 1}`}
                            role="button"
                            tabIndex={0}
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => setPreview({ src, name: `${p.title} ${j * 2 + 1}` })}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setPreview({ src, name: `${p.title} ${j * 2 + 1}` });
                              }
                            }}
                          />
                        ))}
                    </div>
                    <div className="art-column">
                      {p.images
                        .filter((_, j) => j % 2 === 1)
                        .map((src, j) => (
                          <ResilientImage
                            key={j}
                            src={src}
                            {...imageDimensions(src)}
                            alt={`${p.title} ${j * 2 + 2}`}
                            role="button"
                            tabIndex={0}
                            style={{ cursor: 'zoom-in' }}
                            onClick={() => setPreview({ src, name: `${p.title} ${j * 2 + 2}` })}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault();
                                setPreview({ src, name: `${p.title} ${j * 2 + 2}` });
                              }
                            }}
                          />
                        ))}
                    </div>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="dark timeline">
        <span className="kicker">03 / EXPERIENCE</span>
        <h2>
          THE
          <br />
          <em>JOURNEY</em>
        </h2>
        {jobs.map((j) => (
          <div className="job" key={j[1]}>
            <small>{j[0]}</small>
            <div>
              <h3>{j[2]}</h3>
              <b>{j[1]}</b>
              <p>{j[3]}</p>
            </div>
          </div>
        ))}
      </section>
      <section id="contact" className="contact">
        <span className="kicker">04 / GET IN TOUCH</span>
        <h2>
          LET'S MAKE
          <br />
          <em>SOMETHING</em>
          <br />
          MEMORABLE.
        </h2>
        <a href="mailto:luminakwan@gmail.com">luminakwan@gmail.com ↗</a>
        <footer>
          <span>深圳 · 中国</span>
          <span>© 2026 SHUFEN GUAN</span>
          <span>+86 176 6541 5142</span>
        </footer>
      </section>
      <dialog className="image-preview" ref={previewDialog} aria-label={preview ? `原图预览：${preview.name}` : '原图预览'} onCancel={() => setPreview(null)} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }}>
        {preview && <>
          <div className="image-preview-actions">
            <a href={preview.src} target="_blank" rel="noreferrer">打开原图 ↗</a>
            <button type="button" autoFocus aria-label="关闭原图预览" onClick={() => setPreview(null)}><X /></button>
          </div>
          <ResilientImage src={preview.src} alt={preview.name} loading="eager" />
        </>}
      </dialog>
      {o && (
        <div className="modal">
          <button onClick={() => setO(null)}>
            <X />
          </button>
          <div>
            <ResilientImage src={o.images[0]} alt={o.title} loading="eager" />
            <h2>{o.title}</h2>
            <p>{o.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
