import { WeiboAccount, ServiceItem } from '../types';

export const PERSONAL_INFO = {
  name: 'yu｜知薇',
  altName: 'Zhiwei',
  motto: '眼泪是反重力的海 · 执笔书夜',
  circleAge: '3年',
  zodiac: '处女座',
  mbti: 'ISFP',
  mentors: [
    { role: '公关恩师', name: '判安', note: '公关危机与客诉破局师' },
    { role: '代宣代招恩师', name: '白易 / 水饺', note: '社群推广与破圈引流师' }
  ],
  stats: [
    { label: '陪圈列', value: '2k+', desc: '深厚圈内人脉网络' },
    { label: '陪派资源', value: '百+', desc: '多领域协同合作派单' },
    { label: '月消费', value: 'w+', desc: '稳定高粘性消费能力' },
    { label: '圈消流水', value: '10w+', desc: '固板优质渠道与背书' }
  ],
  resumeUrl: 'https://weibo.com/8391420579/5256956584397151',
  resumeText: '履历详情可见',
  footerNote: '（示例请查看管理｜运营板块）'
};

export const WEIBO_ACCOUNTS: WeiboAccount[] = [
  {
    id: 'rain-yu',
    handle: '@雨yu鱼-',
    url: 'https://weibo.com/u/8391420579',
    status: 'active',
    description: '主账号 · 动态发布 / 业务承接 / 圈内互动',
    tag: '主账号'
  },
  {
    id: 'yu-wei',
    handle: '@yu薇vv-',
    url: 'https://weibo.com/u/9193591750',
    status: 'active',
    description: '副账号 · 宣发同步 / 资源对接 / 互动窗口',
    tag: '副账号'
  },
  {
    id: 'wei-rain',
    handle: '@薇rain-',
    status: 'incubating',
    description: '储备账号 · 养号中，敬请期待后续解锁',
    tag: '养号中'
  },
  {
    id: 'xyt-business',
    handle: '业务xyt🔜',
    url: 'https://weibo.com/8391420579/5268437573567298',
    status: 'business',
    description: '官方业务宣发条 · 完整接单案例与即时动态',
    tag: '业务入口'
  }
];

export const SERVICE_SECTIONS = [
  {
    id: 'management',
    title: '✧ֺּ𓈒ॱֺּ𓏽♱ 管理｜团助',
    badge: '团务助航',
    intro: '在职期间，有疑问我将毫无保留给出解决以及改进办法。',
    pricing: [
      { name: '女团', price: '288/月起', basePrice: 288, note: '精细化女团事务协调与日程维护' },
      { name: '男团｜混团', price: '388/月起', basePrice: 388, note: '混团及男团多维度管理与事务疏导' }
    ],
    rules: [
      '具体私聊详谈排期与业务边界',
      '在职期间有疑问我将毫无保留给出解决以及改进办法',
      '让我干超出本职工作的事，加钱'
    ],
    link: 'https://weibo.com/8391420579/5277946862375480',
    linkText: 'xyt详情可见'
  },
  {
    id: 'promotion',
    title: '✧ֺּ𓈒ॱֺּ𓏽♱ 代宣',
    badge: '高频曝光',
    intro: '全天候多频次渠道宣发，高标准阅读量保底。',
    packages: [
      { tier: '日宣', price: '8.8r', guarantee: '日保8贴', base: 8.8 },
      { tier: '周宣', price: '45r', guarantee: '日保6贴', base: 45 },
      { tier: '月宣·基础', price: '128r', guarantee: '日保5贴 · 无保底人数', base: 128 },
      { tier: '月宣·进阶', price: '158r', guarantee: '日报5贴 · 保底3人', base: 158 },
      { tier: '月宣·高保', price: '188r', guarantee: '日保4-5贴 · 保底进5人', base: 188 },
      { tier: '月宣·旗舰', price: '288r', guarantee: '月保90贴 · 保底进8人', base: 288 },
      { tier: '季宣·优选', price: '520r', guarantee: '月保100贴 · 总保底进15人 + 所有活动宣', base: 520 },
      { tier: '季宣·尊享', price: '666r', guarantee: '月保120贴 · 总保底进20人 + 所有活动宣', base: 666 },
      { tier: '半年宣·至臻', price: '888r', guarantee: '月保120贴 · 总保底进25人 + 所有活动宣 + 所有资源优先推', base: 888 }
    ],
    terms: [
      '下单默认已读如下须知',
      '季宣默认3个月，半年宣默认6个月',
      '不宣hf团，不宣押金团',
      '代宣不等yu代招，以增加知名度为主',
      '非代宣问题一律概不退款',
      '团长换人 / 团改名 / 卖团 / 合团 / 团出瓜且波及代宣本人一律终止代宣合作',
      '人都有特殊情况，请允许我请假，帖子都会补',
      '代宣内容请遵循微博和超话规则！',
      '单贴阅读量严格把关，实打实数据交付'
    ]
  },
  {
    id: 'pr',
    title: '✧ֺּ𓈒ॱֺּ𓏽♱ 公关客诉',
    badge: '风控维稳',
    intro: '危机预警与客诉沟通，稳妥化解舆情争议。',
    items: [
      {
        name: '个人 / 驻团公关',
        price: '300/月起',
        basePrice: 300,
        details: ['单月外聘，常驻3月起签', '包所有客诉和每月两次代码代挂']
      },
      {
        name: '临时公关',
        price: '65/h · 188/天 · 300/周',
        basePrice: 65,
        details: ['按需应急介入，高效率平息争议']
      },
      {
        name: '公关客诉咨询',
        price: '35/半小时 · 65/h',
        basePrice: 35,
        details: ['咨询仅给合理建议，不包含亲自上手执行']
      }
    ],
    terms: ['下单默认已读相关规则，理性沟通']
  },
  {
    id: 'code',
    title: '✧ֺּ𓈒ॱֺּ𓏽♱ 代码代挂',
    badge: '文案代码与曝光',
    intro: '定制代码文案撰写，多平台挂载曝光。',
    codeSection: {
      name: '代码制作',
      price: '20/百字',
      rules: [
        '图片5张后 +3r/张',
        '定金80r（多退少补，反悔不退）',
        '笔记72h内出',
        '加急服务：24h内加收+20%起，6h内加收+60%起'
      ]
    },
    hangingSection: {
      name: '代挂服务',
      rates: [
        { platform: '朋友圈 (pyq)', rates: '30r/3天 · 65r/7天 · 255/月', extra: '置顶 +10r' },
        { platform: '微博 (vb)', rates: '35r/贴 永挂包车', extra: '置顶 +10r/天' }
      ]
    },
    link: 'https://weibo.com/8391420579/5287452961145502',
    linkText: '案例可见'
  },
  {
    id: 'planning',
    title: '✧ֺּ𓈒ॱֺּ𓏽♱ 策划',
    badge: '架构排版',
    intro: '结构化策划文案与视觉排版美化，赋能团队高阶质感。',
    items: [
      {
        name: '单次策划',
        price: '100r起接',
        basePrice: 100,
        notes: [
          '带预算咨询，非诚勿扰',
          '单次策划包含全部美化排版和后续修改',
          '大型策划单次价可能会超200/300'
        ]
      },
      {
        name: '驻团策划',
        price: '388/月起',
        basePrice: 388,
        notes: ['每月两次活动策划上限']
      },
      {
        name: '排版美化',
        price: '50r起',
        basePrice: 50,
        notes: ['具体需求私聊详定']
      }
    ],
    link: 'https://weibo.com/8391420579/5277946862375480',
    linkText: '案例可查',
    termsTitle: '✧ֺּ𓈒ॱֺּ𓏽♱ 须知｜下单默认已读',
    terms: [
      '驻团策划在驻团解约后禁二改/模仿/抄袭/擦边的，违者赔偿该策划3倍价格',
      '一经付款概不退款',
      '请预算充足，非诚勿扰，不议价',
      '不提供图表，请自行配合约图'
    ]
  }
];

export const OPERATIONS_DOC = {
  title: '✧ֺּ𓈒ॱֺּ𓏽♱ 运营详情',
  caseName: '【眼泪是反重力的海】',
  url: 'https://www.kdocs.cn/l/crtrDpszpAMF',
  summary: '关于圈内团队运营、统筹框架、执行流转与公关落地的完整运营档案及白皮书示例文档。',
  features: [
    '沉浸式管理方案与团务规范',
    '危机客诉应答SOP与案例复盘',
    '宣发排期体系与活动复盘档案',
    '金山文档实时同步与在线查阅'
  ]
};
