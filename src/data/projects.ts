export type ProjectMedia =
  | {
      type: 'image';
      src: string;
      title?: string;
      alt?: string;
    }
  | {
      type: 'video';
      src: string;
      title?: string;
      poster?: string;
    }
  | {
      type: 'pdf';
      src: string;
      title?: string;
    };

export type Project = {
  slug: string;
  title: string;
  category: string;
  tags?: string[];
  descriptionZh: string;
  cover: string;
  images: {
    desktop: string;
    mobile: string;
  };
  media: ProjectMedia[];
};

export const projects: Project[] = [
  {
    slug: 'park-management-system',
    title: '园区管理系统',
    category: 'Web Design',
    descriptionZh:
      '这是一个面向园区资源管理场景的后台系统设计，重点解决多模块业务信息的层级组织、数据监控与日常运营效率问题。界面通过清晰导航、指标看板和流程化操作，帮助管理人员快速掌握园区状态并完成关键任务。',
    cover: '/projects/park-management-system/4.jpg',
    images: {
      desktop: '/projects/park-management-system/4.jpg',
      mobile: '/projects/park-management-system/5.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/park-management-system/4.jpg', alt: 'Park management system page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/park-management-system/5.jpg', alt: 'Park management system page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/park-management-system/6.jpg', alt: 'Park management system page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/park-management-system/7.jpg', alt: 'Park management system page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/park-management-system/8.jpg', alt: 'Park management system page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/park-management-system/9.jpg', alt: 'Park management system page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/park-management-system/10.jpg', alt: 'Park management system page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/park-management-system/11.jpg', alt: 'Park management system page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/park-management-system/12.jpg', alt: 'Park management system page 09' },
      { type: 'image', title: 'Page 10', src: '/projects/park-management-system/13.jpg', alt: 'Park management system page 10' },
      { type: 'image', title: 'Page 11', src: '/projects/park-management-system/14.jpg', alt: 'Park management system page 11' },
      { type: 'image', title: 'Page 12', src: '/projects/park-management-system/15.jpg', alt: 'Park management system page 12' },
      { type: 'image', title: 'Page 13', src: '/projects/park-management-system/16.jpg', alt: 'Park management system page 13' },
      { type: 'image', title: 'Page 14', src: '/projects/park-management-system/17.jpg', alt: 'Park management system page 14' },
      { type: 'image', title: 'Page 15', src: '/projects/park-management-system/18.jpg', alt: 'Park management system page 15' },
      { type: 'image', title: 'Page 16', src: '/projects/park-management-system/19.jpg', alt: 'Park management system page 16' },
      { type: 'image', title: 'Page 17', src: '/projects/park-management-system/20.jpg', alt: 'Park management system page 17' },
      { type: 'image', title: 'Page 18', src: '/projects/park-management-system/21.jpg', alt: 'Park management system page 18' },
      { type: 'image', title: 'Page 19', src: '/projects/park-management-system/22.jpg', alt: 'Park management system page 19' },
      { type: 'image', title: 'Page 20', src: '/projects/park-management-system/23.jpg', alt: 'Park management system page 20' },
    ],
  },
  {
    slug: 'smart-park-management-system',
    title: '智慧园区监测系统',
    category: 'Data visualization',
    descriptionZh:
      '该项目围绕智慧园区实时监测场景展开，通过可视化大屏整合游客分布、区域状态、运营数据与风险提示。界面强调空间感、数据层级和态势识别效率，帮助管理者快速掌握园区运行状态。',
    cover: '/projects/smart-park-management-system/24.jpg',
    images: {
      desktop: '/projects/smart-park-management-system/24.jpg',
      mobile: '/projects/smart-park-management-system/25.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/smart-park-management-system/24.jpg', alt: '智慧园区监测系统 page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/smart-park-management-system/25.jpg', alt: '智慧园区监测系统 page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/smart-park-management-system/26.jpg', alt: '智慧园区监测系统 page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/smart-park-management-system/27.jpg', alt: '智慧园区监测系统 page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/smart-park-management-system/28.jpg', alt: '智慧园区监测系统 page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/smart-park-management-system/29.jpg', alt: '智慧园区监测系统 page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/smart-park-management-system/30.jpg', alt: '智慧园区监测系统 page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/smart-park-management-system/31.jpg', alt: '智慧园区监测系统 page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/smart-park-management-system/32.jpg', alt: '智慧园区监测系统 page 09' },
      { type: 'image', title: 'Page 10', src: '/projects/smart-park-management-system/33.jpg', alt: '智慧园区监测系统 page 10' },
      { type: 'image', title: 'Page 11', src: '/projects/smart-park-management-system/34.jpg', alt: '智慧园区监测系统 page 11' },
    ],
  },
  {
    slug: 'personnel-positioning-system',
    title: '人员定位管理系统',
    category: 'Web Design',
    tags: ['Web Design', 'Data visualization'],
    descriptionZh:
      '该项目围绕人员实时定位与安全管理场景展开，通过地图视图、轨迹追踪、区域状态和异常提醒整合人员动态信息。界面强调快速定位、层级清晰和风险识别效率，帮助管理者及时掌握现场人员分布。',
    cover: '/projects/personnel-positioning-system/20.jpg',
    images: {
      desktop: '/projects/personnel-positioning-system/20.jpg',
      mobile: '/projects/personnel-positioning-system/21.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/personnel-positioning-system/20.jpg', alt: '人员定位管理系统 page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/personnel-positioning-system/21.jpg', alt: '人员定位管理系统 page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/personnel-positioning-system/22.jpg', alt: '人员定位管理系统 page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/personnel-positioning-system/23.jpg', alt: '人员定位管理系统 page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/personnel-positioning-system/24.jpg', alt: '人员定位管理系统 page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/personnel-positioning-system/6.gif', alt: '人员定位管理系统 page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/personnel-positioning-system/7.gif', alt: '人员定位管理系统 page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/personnel-positioning-system/27.jpg', alt: '人员定位管理系统 page 08' },
    ],
  },
  {
    slug: 'personnel-logistics-management-system',
    title: '人员物流管理系统',
    category: 'Web Design',
    descriptionZh:
      '该项目聚焦人员与物流协同管理场景，围绕调度流程、任务流转、状态追踪和数据统计建立统一后台体验。设计通过模块化信息组织和清晰操作路径，提升复杂业务在多角色协作中的处理效率。',
    cover: '/projects/personnel-logistics-management-system/28.jpg',
    images: {
      desktop: '/projects/personnel-logistics-management-system/28.jpg',
      mobile: '/projects/personnel-logistics-management-system/29.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/personnel-logistics-management-system/28.jpg', alt: '人员物流管理系统 page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/personnel-logistics-management-system/29.jpg', alt: '人员物流管理系统 page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/personnel-logistics-management-system/31.jpg', alt: '人员物流管理系统 page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/personnel-logistics-management-system/32.jpg', alt: '人员物流管理系统 page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/personnel-logistics-management-system/33.jpg', alt: '人员物流管理系统 page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/personnel-logistics-management-system/34.jpg', alt: '人员物流管理系统 page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/personnel-logistics-management-system/35.jpg', alt: '人员物流管理系统 page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/personnel-logistics-management-system/36.jpg', alt: '人员物流管理系统 page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/personnel-logistics-management-system/37.jpg', alt: '人员物流管理系统 page 09' },
      { type: 'image', title: 'Page 10', src: '/projects/personnel-logistics-management-system/38.jpg', alt: '人员物流管理系统 page 10' },
      { type: 'image', title: 'Page 11', src: '/projects/personnel-logistics-management-system/39.jpg', alt: '人员物流管理系统 page 11' },
      { type: 'image', title: 'Page 12', src: '/projects/personnel-logistics-management-system/40.jpg', alt: '人员物流管理系统 page 12' },
    ],
  },
  {
    slug: 'human-resources-management-system',
    title: '人力资源管理系统',
    category: 'Web Design',
    descriptionZh:
      '该项目围绕企业人力资源管理流程展开，覆盖组织架构、员工档案、审批协同、数据统计等核心场景。界面通过清晰的信息层级和稳定的表单体验，降低高频管理操作的理解成本与执行成本。',
    cover: '/projects/human-resources-management-system/4.jpg',
    images: {
      desktop: '/projects/human-resources-management-system/4.jpg',
      mobile: '/projects/human-resources-management-system/5.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/human-resources-management-system/4.jpg', alt: '人力资源管理系统 page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/human-resources-management-system/5.jpg', alt: '人力资源管理系统 page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/human-resources-management-system/6.jpg', alt: '人力资源管理系统 page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/human-resources-management-system/7.jpg', alt: '人力资源管理系统 page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/human-resources-management-system/8.jpg', alt: '人力资源管理系统 page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/human-resources-management-system/9.jpg', alt: '人力资源管理系统 page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/human-resources-management-system/10.jpg', alt: '人力资源管理系统 page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/human-resources-management-system/11.jpg', alt: '人力资源管理系统 page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/human-resources-management-system/12.jpg', alt: '人力资源管理系统 page 09' },
      { type: 'image', title: 'Page 10', src: '/projects/human-resources-management-system/13.jpg', alt: '人力资源管理系统 page 10' },
      { type: 'image', title: 'Page 11', src: '/projects/human-resources-management-system/14.jpg', alt: '人力资源管理系统 page 11' },
      { type: 'image', title: 'Page 12', src: '/projects/human-resources-management-system/15.jpg', alt: '人力资源管理系统 page 12' },
      { type: 'image', title: 'Page 13', src: '/projects/human-resources-management-system/16.jpg', alt: '人力资源管理系统 page 13' },
      { type: 'image', title: 'Page 14', src: '/projects/human-resources-management-system/17.jpg', alt: '人力资源管理系统 page 14' },
      { type: 'image', title: 'Page 15', src: '/projects/human-resources-management-system/18.jpg', alt: '人力资源管理系统 page 15' },
      { type: 'image', title: 'Page 16', src: '/projects/human-resources-management-system/19.jpg', alt: '人力资源管理系统 page 16' },
    ],
  },
  {
    slug: 'duozhuayu-app',
    title: '多抓鱼 App',
    category: 'Mobile Design',
    descriptionZh:
      '该项目围绕移动端二手交易与内容浏览体验展开，重点处理商品发现、信息阅读、购买决策和个人操作路径。界面通过轻量化视觉、明确层级和连续浏览节奏，提升用户在移动场景下的操作效率。',
    cover: '/projects/duozhuayu-app/44.jpg',
    images: {
      desktop: '/projects/duozhuayu-app/44.jpg',
      mobile: '/projects/duozhuayu-app/45.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/duozhuayu-app/44.jpg', alt: '多抓鱼 App page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/duozhuayu-app/45.jpg', alt: '多抓鱼 App page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/duozhuayu-app/46.jpg', alt: '多抓鱼 App page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/duozhuayu-app/47.jpg', alt: '多抓鱼 App page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/duozhuayu-app/48.jpg', alt: '多抓鱼 App page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/duozhuayu-app/49.jpg', alt: '多抓鱼 App page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/duozhuayu-app/50.jpg', alt: '多抓鱼 App page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/duozhuayu-app/51.jpg', alt: '多抓鱼 App page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/duozhuayu-app/52.jpg', alt: '多抓鱼 App page 09' },
      { type: 'image', title: 'Page 10', src: '/projects/duozhuayu-app/53.jpg', alt: '多抓鱼 App page 10' },
      { type: 'image', title: 'Page 11', src: '/projects/duozhuayu-app/54.jpg', alt: '多抓鱼 App page 11' },
    ],
  },
  {
    slug: 'customer-management-system',
    title: '客户管理系统',
    category: 'Web Design',
    descriptionZh:
      '该项目围绕客户关系管理与业务跟进场景展开，整合客户档案、沟通记录、销售线索和运营数据。界面强调快速检索、状态识别和任务闭环，帮助团队更高效地完成客户维护与业务推进。',
    cover: '/projects/customer-management-system/35.jpg',
    images: {
      desktop: '/projects/customer-management-system/35.jpg',
      mobile: '/projects/customer-management-system/36.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/customer-management-system/35.jpg', alt: '客户管理系统 page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/customer-management-system/36.jpg', alt: '客户管理系统 page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/customer-management-system/37.jpg', alt: '客户管理系统 page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/customer-management-system/38.jpg', alt: '客户管理系统 page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/customer-management-system/39.jpg', alt: '客户管理系统 page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/customer-management-system/40.jpg', alt: '客户管理系统 page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/customer-management-system/41.jpg', alt: '客户管理系统 page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/customer-management-system/42.jpg', alt: '客户管理系统 page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/customer-management-system/43.jpg', alt: '客户管理系统 page 09' },
    ],
  },
  {
    slug: 'petro-mesh-international-dmcc',
    title: 'PETRO MESH INTERNATIONAL DMCC',
    category: 'Web Design',
    descriptionZh:
      '该项目围绕国际能源贸易企业的品牌官网体验展开，重点呈现企业能力、业务范围、行业资源和合作信任感。页面通过稳重的视觉系统、清晰内容结构和商务化表达，强化企业的专业形象与全球业务属性。',
    cover: '/projects/petro-mesh-international-dmcc/41.jpg',
    images: {
      desktop: '/projects/petro-mesh-international-dmcc/41.jpg',
      mobile: '/projects/petro-mesh-international-dmcc/42.jpg',
    },
    media: [
      { type: 'image', title: 'Page 01', src: '/projects/petro-mesh-international-dmcc/41.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 01' },
      { type: 'image', title: 'Page 02', src: '/projects/petro-mesh-international-dmcc/42.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 02' },
      { type: 'image', title: 'Page 03', src: '/projects/petro-mesh-international-dmcc/43.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 03' },
      { type: 'image', title: 'Page 04', src: '/projects/petro-mesh-international-dmcc/44.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 04' },
      { type: 'image', title: 'Page 05', src: '/projects/petro-mesh-international-dmcc/45.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 05' },
      { type: 'image', title: 'Page 06', src: '/projects/petro-mesh-international-dmcc/46.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 06' },
      { type: 'image', title: 'Page 07', src: '/projects/petro-mesh-international-dmcc/47.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 07' },
      { type: 'image', title: 'Page 08', src: '/projects/petro-mesh-international-dmcc/48.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 08' },
      { type: 'image', title: 'Page 09', src: '/projects/petro-mesh-international-dmcc/49.jpg', alt: 'PETRO MESH INTERNATIONAL DMCC page 09' },
    ],
  },
];
