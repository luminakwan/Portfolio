import assets from './assets.json';

export const projects = [
  { id: 'qiquai', title: '奇奇乖乖', en: 'A little world, a lot of stories.', category: 'IP / 插画', year: '2026', tags: ['原创 IP', '角色设计', '内容创作'], slides: ['12'], cover: ['12-8','12-5','12-9'], style: 'qiquai', description: '独立负责原创 IP「奇奇乖乖」从 0 到 1 的策划与落地，围绕角色设定、人物性格、世界观与故事线搭建完整内容体系，持续进行漫画、插画及剧情类创作。负责小红书、抖音双平台内容策划与编导，结合数据反馈迭代内容。', result: '双平台累计 3 万+ 点赞，单条内容最高获赞 8,912。' },
  { id: 'nidoo', title: 'NIDOO · 潮玩衍生设计', en: 'Small objects. Unlimited imagination.', category: '产品设计全流程', year: '2025', tags: ['产品设计', '3D 渲染', '衍生品'], slides: ['14'], cover: ['14-13'], style: 'nidoo', description: '参与团队盲盒产品研发，负责衍生品研发设计、渲染图与众筹详情页设计。衍生品包含杜邦纸手提袋、金属徽章及冰箱贴，将角色语言延展到真实可触的日常物件。' },
  { id: 'cyclops', title: '独眼星球 · AI 潮玩', en: 'A playful connection, beyond the screen.', category: 'UI / 交互', year: '2025', tags: ['小程序 UI', '图标设计', '团队协作'], slides: ['13'], cover: ['13-7','13-4','13-8'], style: 'cyclops', description: '参与盲盒与 AI 潮玩研发，承担 3D 建模与渲染，以及 AI 玩具小程序的主要美术设计。统筹 5 人设计小组，在一周内完成小程序设计落地。', result: '从界面视觉、图标体系到页面效果，构建一致的产品体验。' },
  { id: 'david-lucy', title: '大卫和露西', en: 'Two characters, one shared story.', category: 'IP / 插画', year: '2025', tags: ['IP 设计', '3D 建模', '产品研发'], slides: ['16'], cover: ['16-1'], style: 'david', description: '独立完成情侣挂件产品从 0 到 1 的研发设计，涵盖 IP 角色设定、3D 建模和宣发内容，将角色个性转化为完整的产品表达。' },
  { id: 'galgame', title: '未寄出的情书', en: 'An interface made of tender feelings.', category: 'UI / 交互', year: '个人创作', tags: ['游戏 UI', '交互设计', '视觉探索'], slides: ['23'], cover: ['23-2'], style: 'galgame', description: '学习期间的 Galgame 界面创作，以清新少女风为视觉基调，将信封、书纸与花朵融入界面，以「情书」为灵感表达青春中纯净而热烈的情感。' },
  { id: 'illustration', title: '角色之间 · 插画选集', en: 'Characters with a life of their own.', category: '插画 / 原画', year: '个人创作', tags: ['日系插画', 'Q 版角色'], slides: ['25'], cover: ['25-2'], style: 'illustration', description: '围绕角色个性与情绪展开的日系插画练习，通过色彩、构图与造型探索多样的角色表达。' },
  { id: 'original', title: '原创角色 · 概念到形体', en: 'From a sketch to a new personality.', category: 'IP / 插画', year: '个人创作', tags: ['角色设定', 'AI + PS'], slides: ['19','20'], cover: ['19-2'], style: 'original', description: '通过 iPad 绘制角色设定稿，结合 AI 与 Photoshop 完成效果图，探索角色平面设定与立体形象之间的转化。' },
  { id: 'wonwood', title: 'WONWOOD · 品牌展厅', en: 'A brand you can step into.', category: '品牌 / 视觉', year: '2025', tags: ['空间视觉', '展会设计'], slides: ['17'], cover: ['17-4'], style: 'wonwood', description: '负责品牌于 2025 中国玩具展的展厅设计，与搭建方沟通具体落地方案，完成从空间视觉构思到现场呈现的设计工作。' },
  { id: 'racing', title: '真实摩托锦标赛', en: 'Built for speed. Designed for clarity.', category: 'UI / 交互', year: '2019', tags: ['游戏 UI', '独立设计'], slides: ['24'], cover: ['24-1'], style: 'racing', description: '作为项目设计小组成员，独立完成游戏全部 UI 设计，从图标到界面布局，全程负责。通过交互细节优化玩家体验，并参与设计规范制定。' },
  { id: 'neko', title: 'NEKO · 角色与品牌', en: 'A bold little identity.', category: 'IP / 插画', year: '个人创作', tags: ['IP 设计', '视觉识别'], slides: ['21','22'], cover: ['21-4','22-1'], style: 'neko', description: '角色、三视图、建模效果与品牌衍生应用的视觉探索，呈现从形象设计到产品表达的完整过程。' },
  { id: 'painting', title: '光影叙事 · 原画', en: 'Stories told through light and color.', category: '插画 / 原画', year: '个人创作', tags: ['角色原画', '厚涂'], slides: ['26','27'], cover: ['26-1','27-1'], style: 'painting', description: '日系角色原画与厚涂作品，围绕人物、服饰、光影和叙事氛围展开创作。' },
  { id: 'pixel', title: '像素里的小宇宙', en: 'Every pixel has a personality.', category: '插画 / 原画', year: '个人创作', tags: ['像素艺术', '角色设计'], slides: ['28'], cover: ['28-1','28-3','28-7'], style: 'pixel', description: '以像素为创作单位的角色设计练习，探索有限画面中的轮廓辨识度、色彩节奏与人物动态。' },
  { id: 'art-brand', title: '艺术展览 · 视觉传播', en: 'Art, seen from a different perspective.', category: '品牌 / 视觉', year: '2023—2025', tags: ['海报', '宣传手册', '摄影'], slides: ['31','32','33'], cover: ['31-1','31-3','31-4'], style: 'art-brand', description: '负责艺术展览的宣传海报、易拉宝与手册，独立承担拍摄、后期修图、排版设计以及物料落地，让艺术内容形成完整的视觉传播体系。' },
  { id: 'miniapp', title: '小程序 · 页面设计', en: 'Content, thoughtfully connected.', category: 'UI / 交互', year: '商业项目', tags: ['小程序', 'UI 交互'], slides: ['34'], cover: ['34-1','34-2','34-3'], style: 'miniapp', description: '负责小程序主页及内页设计、UI 交互、排版、后续设计更新与产品拍摄。' },
  { id: 'products', title: '产品与日常 · 商业视觉', en: 'Bringing products into focus.', category: '品牌 / 视觉', year: '商业项目', tags: ['产品摄影', '电商视觉', 'LOGO'], slides: ['35','36','37'], cover: ['35-1'], style: 'products', description: '产品主图、说明书、品牌标志与产品插画作品。负责产品拍摄、后期修图及排版，其中英文文案由翻译人员提供。' },
  { id: 'ai', title: '想象力实验 · AI 探索', en: 'New tools, new possibilities.', category: 'AI / 探索', year: '个人创作', tags: ['Midjourney', 'AI 视觉'], slides: ['29'], cover: ['29-1','29-3','29-4'], style: 'ai', description: '使用 Midjourney 进行人物与风格实验，探索 AI 辅助创作在概念生成、视觉表达与内容生产中的可能性。' },
  { id: 'visual', title: '自由命题 · 视觉实验', en: 'Thoughts taking a visual form.', category: '品牌 / 视觉', year: '个人创作', tags: ['视觉创意', 'Illustrator', '手绘'], slides: ['38','39'], cover: ['38-1','38-2','38-3'], style: 'visual', description: '涵盖视觉创意、素描、水彩和图案设计的个人探索，包括围绕海洋环境议题展开的《海洋动物与工业时尚》系列。' },
].map(p => ({ ...p, images: p.slides.flatMap(s => assets[s] || []).map(src => `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`), cover: p.cover.map(s => `${import.meta.env.BASE_URL}assets/${s}.webp`) }));

export const jobs = [
 ['2026.01 — 至今','深圳市春夏文化传媒有限公司','插画师 / IP 设计','独立推进原创 IP「奇奇乖乖」的策划、角色设计与内容传播。'],
 ['2025.04 — 2026.01','深圳市柏星龙创意包装股份有限公司','产品设计师 / 潮玩设计','参与原创与授权 IP 研发，涵盖产品设计、3D 建模、小程序 UI 与品牌展厅。'],
 ['2023 — 2025.04','深圳惟精惟一古玩艺术品寄售服务有限公司','媒体部负责人','统筹品牌视觉、新媒体内容、展览宣传与团队协作。'],
 ['2019 — 2020','深圳市星锐游戏有限公司','游戏原画 / UI 设计','参与 5 款游戏项目，独立完成其中 2 款小游戏的 UI 与宣传图。'],
 ['2018 — 2019','广州科亚网络科技有限公司','工业产品 / 平面设计','负责需求沟通、方案设计、3D 建模及供应商打样，完成 15+ 产品设计与落地。'],
];
export const education = [
 ['2023 — 2026','广州美术学院','本科 · 非全日制'],
 ['2022 — 2023','武蔵野学芸学校','統合デザイン'],
 ['2021 — 2022','さくら東京日本語学校','日语'],
 ['2020 — 2021','广东外语外贸大学','日语'],
 ['2015 — 2019','广州白云学院','大专'],
 ['2015 — 2016','广州火星时代教育','原画设计'],
];
