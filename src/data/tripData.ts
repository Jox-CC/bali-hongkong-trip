export interface Activity {
  time: string;
  description: string;
  icon: string;
  locationName?: string;
}

export interface DayData {
  day: number;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  highlights: string[];
  activities: Activity[];
  locations: Location[];
  hotel?: {
    name: string;
    image: string;
    description: string;
  };
}

export interface Location {
  name: string;
  lat: number;
  lng: number;
  type: 'airport' | 'hotel' | 'attraction' | 'restaurant' | 'transport';
  image?: string;
  description?: string;
}

// 景点详情数据
export const attractionDetails: Record<string, { description: string; image: string; tips?: string }> = {
  '上海浦东机场': {
    description: '中国主要的国际机场之一，是此次旅程的起点。拥有现代化的航站楼和完善的设施。',
    image: 'attractions/shanghai-airport.jpg'
  },
  '香港机场': {
    description: '全球领先的国际机场，连接世界各地的枢纽。多次被评为全球最佳机场之一。',
    image: 'attractions/hongkong-airport.jpg'
  },
  '巴厘岛登巴萨机场': {
    description: '巴厘岛的主要国际机场，位于岛屿南部。机场建筑融合了巴厘岛传统建筑风格。',
    image: 'attractions/bali-airport.jpg'
  },
  '乌鲁瓦图万丽酒店': {
    description: '位于悬崖边的豪华度假酒店，享有壮丽海景。酒店设计融合了现代奢华与巴厘岛传统元素。',
    image: 'attractions/uluwatu-resort.jpg',
    tips: '酒店拥有无边泳池，是观赏日落的绝佳地点'
  },
  '情人崖': {
    description: '巴厘岛著名的悬崖景点，可俯瞰印度洋壮丽海景。传说有一对恋人从这里跳海殉情，因此得名。',
    image: 'attractions/uluwatu-cliff.jpg',
    tips: '注意猴子，不要佩戴眼镜和首饰'
  },
  '乌鲁瓦图寺': {
    description: '建于悬崖边缘的古老印度教寺庙，是巴厘岛最神圣的寺庙之一。日落时分的Kecak舞表演不容错过。',
    image: 'attractions/uluwatu-temple.jpg',
    tips: '进入寺庙需穿纱笼，日落时分景色最美'
  },
  '宾艮海滩': {
    description: '著名的冲浪胜地，拥有金色沙滩和清澈海水。是巴厘岛最受欢迎的冲浪点之一。',
    image: 'attractions/bingin-beach.jpg'
  },
  '乌鲁瓦图滑翔伞': {
    description: '在情人崖附近体验刺激的滑翔伞运动，从高空俯瞰壮丽的印度洋海岸线和悬崖美景。',
    image: 'attractions/uluwatu-paragliding.jpg',
    tips: '建议提前预订，最佳飞行时间是早上或傍晚'
  },
  '沙努尔凯悦酒店': {
    description: '位于沙努尔海滩的豪华度假村，环境宁静优美。是前往蓝梦岛的理想住宿地点。',
    image: 'attractions/hyatt-sanur.jpg'
  },
  '沙努尔海滩': {
    description: '巴厘岛东部的宁静海滩，以日出美景著称。适合散步、游泳和观赏日出。',
    image: 'attractions/sanur-beach.jpg'
  },
  '沙努尔码头': {
    description: '前往蓝梦岛和佩妮达岛的主要出发点。每天早晨有多班快船往返于各岛之间。',
    image: 'attractions/sanur-beach.jpg',
    tips: '建议提前预订船票，早班船人较少'
  },
  '恶魔的眼泪': {
    description: '蓝梦岛最著名的景点，海浪冲击岩石形成壮观水雾，阳光照射下常现彩虹。',
    image: 'attractions/devils-tear.jpg',
    tips: '注意安全，不要靠悬崖边缘太近'
  },
  '梦幻海滩': {
    description: '蓝梦岛最美的海滩之一，白沙碧海的世外桃源。适合游泳、浮潜和日光浴。',
    image: 'attractions/dream-beach.jpg'
  },
  '黄桥': {
    description: '连接蓝梦岛和金银岛的标志性黄色吊桥。是拍照打卡的热门地点。',
    image: 'attractions/yellow-bridge.jpg',
    tips: '摩托车可以过桥，但需注意安全'
  },
  '金银岛观景台': {
    description: '位于金银岛的高处观景台，可俯瞰蓝梦岛和周边海域的壮丽景色。',
    image: 'attractions/ceningan-viewpoint.jpg'
  },
  '蓝梦岛阿尔纳套房': {
    description: '位于蓝梦岛的精品度假酒店，提供舒适的住宿环境和贴心的服务。',
    image: 'attractions/dream-beach.jpg'
  },
  '佩妮达岛码头': {
    description: '前往佩妮达岛的主要港口。从这里可以租摩托车或包车游览岛上景点。',
    image: 'attractions/nusa-penida-dock.jpg'
  },
  '精灵坠崖': {
    description: '佩妮达岛最著名的景点，形似恐龙的海岸悬崖。是Instagram上最火的打卡地之一。',
    image: 'attractions/kelingking-beach.jpg',
    tips: '下到海滩需要1小时，路况较陡，请量力而行'
  },
  '天神浴池': {
    description: '天然形成的岩石泳池，海水清澈见底。是游泳和拍照的绝佳地点。',
    image: 'attractions/broken-beach.jpg'
  },
  '破碎海滩': {
    description: '因岩石拱门形成的天然海湾，海水从拱门下涌入，景色壮观。',
    image: 'attractions/broken-beach.jpg'
  },
  '努沙杜瓦丽思卡尔顿': {
    description: '努沙杜瓦地区的顶级豪华度假村，拥有私人海滩和世界级的SPA设施。',
    image: 'attractions/ritz-carlton-bali.jpg'
  },
  'Bali Collection': {
    description: '努沙杜瓦地区的大型购物娱乐中心，汇集国际品牌、餐厅和娱乐场所。',
    image: 'attractions/bali-collection.jpg'
  },
  '东涌福朋喜来登': {
    description: '位于香港东涌的现代化商务酒店，靠近机场和东荟城奥特莱斯。',
    image: 'attractions/four-points-tungchung.webp'
  },
  '尖沙咀': {
    description: '香港著名的购物和旅游区，维多利亚港畔。汇集众多购物中心、餐厅和景点。',
    image: 'attractions/victoria-harbour.jpg'
  },
  '重庆大厦': {
    description: '香港最具代表性的建筑之一，汇集了来自世界各地的商家和居民，充满多元文化气息。',
    image: 'attractions/chungking-mansion.jpg'
  },
  '星光大道': {
    description: '位于尖沙咀海滨的步行道，展示了香港电影明星的手印和雕像。',
    image: 'attractions/avenue-of-stars.jpg'
  },
  '维多利亚港': {
    description: '世界著名的天然良港，香港标志性景观。每晚8点的幻彩咏香江灯光秀不容错过。',
    image: 'attractions/victoria-harbour.jpg',
    tips: '推荐乘坐天星小轮横渡维港，体验百年历史'
  },
  '天星小轮': {
    description: '香港百年历史的渡轮服务，连接尖沙咀和中环/湾仔。是游览维港的经典方式。',
    image: 'attractions/star-ferry.jpg',
    tips: '上层甲板视野更好，票价仅需几港币'
  },
  '金紫荆广场': {
    description: '香港回归纪念地标，每天举行升旗仪式。广场上的金紫荆雕塑是香港的标志。',
    image: 'attractions/golden-bauhinia.jpg'
  },
  '旺角': {
    description: '香港最繁华的商业区之一，充满市井气息。汇集众多商店、餐厅和街头小吃。',
    image: 'attractions/goldfish-market.jpg'
  },
  '金鱼街': {
    description: '旺角著名的宠物街，出售各种观赏鱼、宠物和宠物用品。是体验香港市井文化的好去处。',
    image: 'attractions/goldfish-market.jpg'
  },
  '油麻地庙街': {
    description: '香港最著名的夜市，汇集各种平价商品、小吃和街头表演。是体验香港夜生活的好去处。',
    image: 'attractions/temple-street.jpg',
    tips: '晚上8点后最热闹，可以尝试街边大牌档'
  }
};

// 酒店数据
export const hotelData: Record<number, { name: string; image: string; description: string; tips?: string }> = {
  1: {
    name: '乌鲁瓦图万丽酒店',
    image: 'attractions/uluwatu-resort.jpg',
    description: '位于悬崖边的豪华度假酒店，享有壮丽海景。酒店设计融合了现代奢华与巴厘岛传统元素，拥有无边泳池和世界级SPA。',
    tips: '推荐预订海景房，日落时分景色绝美'
  },
  2: {
    name: '沙努尔凯悦酒店',
    image: 'attractions/hyatt-sanur.jpg',
    description: '位于沙努尔海滩的豪华度假村，环境宁静优美。酒店拥有私人海滩和多个泳池，是前往蓝梦岛的理想住宿地点。',
    tips: '酒店提供前往码头的接送服务'
  },
  3: {
    name: '蓝梦岛阿尔纳套房',
    image: 'attractions/dream-beach.jpg',
    description: '位于蓝梦岛的精品度假酒店，提供舒适的住宿环境和贴心的服务。步行即可到达梦幻海滩和恶魔的眼泪。',
    tips: '可以租摩托车环岛，酒店可协助安排'
  },
  4: {
    name: '努沙杜瓦丽思卡尔顿',
    image: 'attractions/ritz-carlton-bali.jpg',
    description: '努沙杜瓦地区的顶级豪华度假村，拥有私人海滩和世界级的SPA设施。酒店提供多种餐饮选择和娱乐活动。',
    tips: '推荐体验酒店的悬崖餐厅和日落鸡尾酒'
  },
  5: {
    name: '东涌福朋喜来登',
    image: 'attractions/four-points-tungchung.webp',
    description: '位于香港东涌的现代化商务酒店，靠近机场和东荟城奥特莱斯。酒店提供免费机场穿梭巴士服务。',
    tips: '酒店旁边就是东荟城，购物非常方便'
  }
};

export const tripData: DayData[] = [
  {
    day: 1,
    date: "2月20日",
    title: "启程与抵达",
    subtitle: "从上海出发，经香港转机，抵达巴厘岛",
    image: "day1-airport.jpg",
    highlights: ["上海→香港→巴厘岛", "乌鲁瓦图万丽酒店", "酒店晚餐"],
    activities: [
      { time: "08:30", description: "上海浦东机场(PVG)出发", icon: "✈️", locationName: "上海浦东机场" },
      { time: "11:35", description: "抵达香港(HKG)", icon: "🛬", locationName: "香港机场" },
      { time: "12:35", description: "香港(HKG)出发", icon: "✈️", locationName: "香港机场" },
      { time: "17:40", description: "抵达巴厘岛登巴萨(DPS)", icon: "🛬", locationName: "巴厘岛登巴萨机场" },
      { time: "19:00", description: "入住乌鲁瓦图万丽酒店", icon: "🏨", locationName: "乌鲁瓦图万丽酒店" },
      { time: "19:30", description: "酒店晚餐", icon: "🍽️" }
    ],
    locations: [
      { name: "上海浦东机场", lat: 31.1443, lng: 121.8083, type: "airport", image: "attractions/shanghai-airport.jpg", description: "中国主要的国际机场之一" },
      { name: "香港机场", lat: 22.3080, lng: 113.9185, type: "airport", image: "attractions/hongkong-airport.jpg", description: "全球领先的国际机场" },
      { name: "巴厘岛登巴萨机场", lat: -8.7467, lng: 115.1668, type: "airport", image: "attractions/bali-airport.jpg", description: "巴厘岛的主要国际机场" },
      { name: "乌鲁瓦图万丽酒店", lat: -8.8291, lng: 115.1590, type: "hotel", image: "attractions/uluwatu-resort.jpg", description: "位于悬崖边的豪华度假酒店" }
    ],
    hotel: {
      name: '乌鲁瓦图万丽酒店',
      image: 'attractions/uluwatu-resort.jpg',
      description: '位于悬崖边的豪华度假酒店，享有壮丽海景。酒店设计融合了现代奢华与巴厘岛传统元素，拥有无边泳池和世界级SPA。'
    }
  },
  {
    day: 2,
    date: "2月21日",
    title: "乌鲁瓦图悬崖风光",
    subtitle: "探索巴厘岛南部的壮丽海岸线",
    image: "2-uluwatu.jpg",
    highlights: ["情人崖", "乌鲁瓦图滑翔伞", "乌鲁瓦图寺", "宾艮海滩", "沙努尔"],
    activities: [
      { time: "09:30", description: "酒店出发，包车一日游", icon: "🚗" },
      { time: "10:30", description: "情人崖观景（注意猴子）", icon: "👀", locationName: "情人崖" },
      { time: "11:30", description: "乌鲁瓦图滑翔伞体验", icon: "✈️", locationName: "乌鲁瓦图滑翔伞" },
      { time: "12:30", description: "乌鲁瓦图悬崖餐厅午餐", icon: "🍽️" },
      { time: "14:00", description: "参观乌鲁瓦图寺", icon: "🏛️", locationName: "乌鲁瓦图寺" },
      { time: "15:30", description: "前往宾艮海滩或帕当帕当海滩", icon: "🏖️", locationName: "宾艮海滩" },
      { time: "17:00", description: "乘车转移至沙努尔", icon: "🚗" },
      { time: "18:00", description: "沙努尔海滩散步、看日落", icon: "👣", locationName: "沙努尔海滩" },
      { time: "19:30", description: "沙努尔海鲜晚餐", icon: "🍽️" }
    ],
    locations: [
      { name: "乌鲁瓦图万丽酒店", lat: -8.8291, lng: 115.1590, type: "hotel", image: "attractions/uluwatu-resort.jpg" },
      { name: "情人崖", lat: -8.8289, lng: 115.0835, type: "attraction", image: "2-uluwatu.jpg", description: "巴厘岛著名的悬崖景点" },
      { name: "乌鲁瓦图滑翔伞", lat: -8.8300, lng: 115.0850, type: "attraction", image: "2-uluwatu.jpg", description: "刺激的滑翔伞运动体验" },
      { name: "乌鲁瓦图寺", lat: -8.8291, lng: 115.0840, type: "attraction", image: "attractions/uluwatu-temple.jpg", description: "建于悬崖边缘的古老印度教寺庙" },
      { name: "宾艮海滩", lat: -8.8050, lng: 115.1100, type: "attraction", image: "attractions/bingin-beach.jpg", description: "著名的冲浪胜地" },
      { name: "沙努尔凯悦酒店", lat: -8.6800, lng: 115.2650, type: "hotel", image: "attractions/hyatt-sanur.jpg", description: "位于沙努尔海滩的豪华度假村" }
    ],
    hotel: {
      name: '沙努尔凯悦酒店',
      image: 'attractions/hyatt-sanur.jpg',
      description: '位于沙努尔海滩的豪华度假村，环境宁静优美。酒店拥有私人海滩和多个泳池，是前往蓝梦岛的理想住宿地点。'
    }
  },
  {
    day: 3,
    date: "2月22日",
    title: "蓝梦岛环岛探险",
    subtitle: "骑摩托车探索蓝梦岛的自然奇观",
    image: "3-devilstear.jpg",
    highlights: ["恶魔的眼泪", "梦幻海滩", "黄桥", "金银岛"],
    activities: [
      { time: "10:30", description: "沙努尔码头乘快船前往蓝梦岛", icon: "🚤", locationName: "沙努尔码头" },
      { time: "11:30", description: "租摩托车开始环岛", icon: "🏍️" },
      { time: "12:30", description: "恶魔的眼泪观浪", icon: "👀", locationName: "恶魔的眼泪" },
      { time: "13:30", description: "梦幻海滩午餐与休息", icon: "🍽️", locationName: "梦幻海滩" },
      { time: "15:00", description: "黄桥拍照", icon: "📸", locationName: "黄桥" },
      { time: "15:30", description: "步行至金银岛观景台", icon: "👣", locationName: "金银岛观景台" },
      { time: "17:00", description: "入住蓝梦岛阿尔纳套房", icon: "🏨", locationName: "蓝梦岛阿尔纳套房" },
      { time: "18:00", description: "沙滩俱乐部晚餐", icon: "🍽️" }
    ],
    locations: [
      { name: "沙努尔码头", lat: -8.6800, lng: 115.2650, type: "transport", image: "attractions/sanur-beach.jpg", description: "前往蓝梦岛的主要出发点" },
      { name: "蓝梦岛码头", lat: -8.6780, lng: 115.4400, type: "transport", image: "day3-devilstear.jpg" },
      { name: "恶魔的眼泪", lat: -8.7280, lng: 115.4550, type: "attraction", image: "attractions/devils-tear.jpg", description: "蓝梦岛最著名的景点" },
      { name: "梦幻海滩", lat: -8.7300, lng: 115.4500, type: "attraction", image: "attractions/dream-beach.jpg", description: "蓝梦岛最美的海滩之一" },
      { name: "黄桥", lat: -8.7200, lng: 115.4400, type: "attraction", image: "attractions/yellow-bridge.jpg", description: "连接蓝梦岛和金银岛的标志性桥梁" },
      { name: "金银岛观景台", lat: -8.7180, lng: 115.4450, type: "attraction", image: "attractions/ceningan-viewpoint.jpg", description: "可俯瞰蓝梦岛和周边海域的壮丽景色" },
      { name: "蓝梦岛阿尔纳套房", lat: -8.7250, lng: 115.4450, type: "hotel", image: "attractions/dream-beach.jpg" }
    ],
    hotel: {
      name: '蓝梦岛阿尔纳套房',
      image: 'attractions/dream-beach.jpg',
      description: '位于蓝梦岛的精品度假酒店，提供舒适的住宿环境和贴心的服务。步行即可到达梦幻海滩和恶魔的眼泪。'
    }
  },
  {
    day: 4,
    date: "2月23日",
    title: "佩妮达岛精华东线",
    subtitle: "探访网红打卡地精灵坠崖",
    image: "4-kelingking.jpg",
    highlights: ["精灵坠崖", "天神浴池", "破碎海滩", "努沙杜瓦"],
    activities: [
      { time: "09:30", description: "乘船前往佩妮达岛", icon: "🚤", locationName: "佩妮达岛码头" },
      { time: "10:30", description: "精灵坠崖徒步与拍照", icon: "👀", locationName: "精灵坠崖" },
      { time: "12:00", description: "天神浴池与破碎海滩", icon: "👀", locationName: "天神浴池" },
      { time: "13:00", description: "景区附近简餐", icon: "🍽️" },
      { time: "15:00", description: "乘船返回沙努尔码头", icon: "🚤", locationName: "沙努尔码头" },
      { time: "16:30", description: "乘车前往努沙杜瓦", icon: "🚗" },
      { time: "17:00", description: "入住努沙杜瓦丽思卡尔顿酒店", icon: "🏨", locationName: "努沙杜瓦丽思卡尔顿" },
      { time: "19:30", description: "酒店内晚餐", icon: "🍽️" }
    ],
    locations: [
      { name: "沙努尔码头", lat: -8.6800, lng: 115.2650, type: "transport", image: "attractions/sanur-beach.jpg" },
      { name: "佩妮达岛码头", lat: -8.6780, lng: 115.5150, type: "transport", image: "4-kelingking.jpg" },
      { name: "精灵坠崖", lat: -8.7500, lng: 115.4750, type: "attraction", image: "attractions/kelingking-beach.jpg", description: "佩妮达岛最著名的景点" },
      { name: "天神浴池", lat: -8.7350, lng: 115.3800, type: "attraction", image: "attractions/broken-beach.jpg", description: "天然形成的岩石泳池" },
      { name: "破碎海滩", lat: -8.7330, lng: 115.3820, type: "attraction", image: "attractions/broken-beach.jpg", description: "因岩石拱门形成的天然海湾" },
      { name: "努沙杜瓦丽思卡尔顿", lat: -8.8150, lng: 115.2300, type: "hotel", image: "attractions/ritz-carlton-bali.jpg", description: "努沙杜瓦地区的顶级豪华度假村" }
    ],
    hotel: {
      name: '努沙杜瓦丽思卡尔顿',
      image: 'attractions/ritz-carlton-bali.jpg',
      description: '努沙杜瓦地区的顶级豪华度假村，拥有私人海滩和世界级的SPA设施。酒店提供多种餐饮选择和娱乐活动。'
    }
  },
  {
    day: 5,
    date: "2月24日",
    title: "返程至香港",
    subtitle: "告别巴厘岛，飞往香港",
    image: "day5-resort.jpg",
    highlights: ["酒店休闲", "飞往香港"],
    activities: [
      { time: "上午", description: "酒店休闲，享受泳池和海滩", icon: "👣" },
      { time: "12:00", description: "酒店午餐", icon: "🍽️" },
      { time: "13:30", description: "退房，前往登巴萨机场", icon: "🚗" },
      { time: "16:20", description: "巴厘岛(DPS)出发", icon: "✈️", locationName: "巴厘岛登巴萨机场" },
      { time: "21:25", description: "抵达香港(HKG)", icon: "🛬", locationName: "香港机场" },
      { time: "22:00", description: "入住香港东涌福朋喜来登酒店", icon: "🏨", locationName: "东涌福朋喜来登" }
    ],
    locations: [
      { name: "努沙杜瓦丽思卡尔顿", lat: -8.8150, lng: 115.2300, type: "hotel", image: "attractions/ritz-carlton-bali.jpg" },
      { name: "登巴萨机场", lat: -8.7467, lng: 115.1668, type: "airport", image: "attractions/bali-airport.jpg" },
      { name: "香港机场", lat: 22.3080, lng: 113.9185, type: "airport", image: "attractions/hongkong-airport.jpg" },
      { name: "东涌福朋喜来登", lat: 22.2950, lng: 113.9400, type: "hotel", image: "attractions/four-points-tungchung.webp" }
    ],
    hotel: {
      name: '东涌福朋喜来登',
      image: 'attractions/four-points-tungchung.webp',
      description: '位于香港东涌的现代化商务酒店，靠近机场和东荟城奥特莱斯。酒店提供免费机场穿梭巴士服务。'
    }
  },
  {
    day: 6,
    date: "2月25日",
    title: "香港经典一日游",
    subtitle: "体验香港的繁华与经典",
    image: "day6-hongkong.jpg",
    highlights: ["尖沙咀", "维多利亚港", "天星小轮", "旺角"],
    activities: [
      { time: "08:00", description: "东涌→尖沙咀（城巴）", icon: "🚌" },
      { time: "09:00", description: "游览尖沙咀、重庆大厦外围", icon: "👣", locationName: "尖沙咀" },
      { time: "10:30", description: "星光大道、维多利亚港", icon: "👀", locationName: "维多利亚港" },
      { time: "11:30", description: "天星小轮至湾仔", icon: "🚤", locationName: "天星小轮" },
      { time: "12:30", description: "金紫荆广场", icon: "👀", locationName: "金紫荆广场" },
      { time: "13:00", description: "返回尖沙咀午餐", icon: "🍽️" },
      { time: "14:00", description: "地铁至旺角，逛金鱼街", icon: "🚇", locationName: "旺角" },
      { time: "15:00", description: "步行至油麻地庙街", icon: "👣", locationName: "油麻地庙街" },
      { time: "15:30", description: "乘坐城巴A21前往机场", icon: "🚌" },
      { time: "19:15", description: "香港(HKG) → 上海浦东(PVG)", icon: "✈️", locationName: "香港机场" }
    ],
    locations: [
      { name: "东涌福朋喜来登", lat: 22.2950, lng: 113.9400, type: "hotel", image: "attractions/four-points-tungchung.webp" },
      { name: "尖沙咀", lat: 22.2980, lng: 114.1720, type: "attraction", image: "attractions/victoria-harbour.jpg", description: "香港著名的购物和旅游区" },
      { name: "维多利亚港", lat: 22.2850, lng: 114.1650, type: "attraction", image: "attractions/victoria-harbour.jpg", description: "世界著名的天然良港" },
      { name: "天星小轮", lat: 22.2870, lng: 114.1680, type: "transport", image: "attractions/star-ferry.jpg", description: "香港百年历史的渡轮服务" },
      { name: "金紫荆广场", lat: 22.2830, lng: 114.1730, type: "attraction", image: "attractions/golden-bauhinia.jpg", description: "香港回归纪念地标" },
      { name: "旺角", lat: 22.3190, lng: 114.1690, type: "attraction", image: "attractions/goldfish-market.jpg", description: "香港最繁华的商业区之一" },
      { name: "油麻地庙街", lat: 22.3130, lng: 114.1710, type: "attraction", image: "attractions/temple-street.jpg", description: "香港最著名的夜市" },
      { name: "香港机场", lat: 22.3080, lng: 113.9185, type: "airport", image: "attractions/hongkong-airport.jpg" }
    ],
    hotel: {
      name: '东涌福朋喜来登',
      image: 'attractions/four-points-tungchung.webp',
      description: '位于香港东涌的现代化商务酒店，靠近机场和东荟城奥特莱斯。酒店提供免费机场穿梭巴士服务。'
    }
  }
];

export const travelTips = [
  {
    icon: "💱",
    title: "货币兑换",
    content: "巴厘岛使用印尼盾（IDR），香港使用港币（HKD）。建议携带美元现金在巴厘岛兑换。"
  },
  {
    icon: "🚗",
    title: "交通出行",
    content: "巴厘岛推荐包车或租摩托车，香港地铁和巴士非常便利。"
  },
  {
    icon: "☀️",
    title: "天气准备",
    content: "2月是巴厘岛雨季，偶有阵雨；香港气候温和，建议带薄外套。"
  },
  {
    icon: "📱",
    title: "网络通讯",
    content: "建议购买当地SIM卡或开通国际漫游，酒店通常有免费WiFi。"
  },
  {
    icon: "🙏",
    title: "文化礼仪",
    content: "进入寺庙需穿纱笼，不要触摸他人头部，用右手递物。"
  }
];

export const allLocations = tripData.flatMap(day => 
  day.locations.map(loc => ({ ...loc, day: day.day }))
);
