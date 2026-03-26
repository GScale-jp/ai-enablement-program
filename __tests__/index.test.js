const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const htmlPath = path.resolve(__dirname, '..', 'index.html');

let dom;
let document;

beforeAll(() => {
  const html = fs.readFileSync(htmlPath, 'utf-8');
  dom = new JSDOM(html);
  document = dom.window.document;
});

describe('ページ基本構造', () => {
  test('HTML文書としてパースできる', () => {
    expect(document).toBeDefined();
    expect(document.documentElement.tagName).toBe('HTML');
  });

  test('lang属性がjaに設定されている', () => {
    expect(document.documentElement.lang).toBe('ja');
  });

  test('viewport metaタグが存在する', () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    expect(viewport).not.toBeNull();
    expect(viewport.content).toContain('width=device-width');
  });

  test('titleタグにサービス名が含まれる', () => {
    const title = document.title;
    expect(title).toContain('AI');
    expect(title).toContain('GScale');
  });

  test('OGPメタタグが設定されている', () => {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    expect(ogTitle).not.toBeNull();
    expect(ogDesc).not.toBeNull();
  });
});

describe('ヒーローセクション', () => {
  test('heroセクションが存在する', () => {
    const hero = document.getElementById('hero');
    expect(hero).not.toBeNull();
  });

  test('メインキャッチコピーが存在する', () => {
    const hero = document.getElementById('hero');
    const h1 = hero.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1.textContent.length).toBeGreaterThan(0);
  });

  test('CTAボタンが存在する', () => {
    const hero = document.getElementById('hero');
    const cta = hero.querySelector('a[href*="contact"], a[href*="mailto"]');
    expect(cta).not.toBeNull();
  });
});

describe('課題セクション', () => {
  test('problemセクションが存在する', () => {
    const section = document.getElementById('problem');
    expect(section).not.toBeNull();
  });

  test('課題が3つ以上列挙されている', () => {
    const section = document.getElementById('problem');
    const items = section.querySelectorAll('.problem-item, li, .card');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });
});

describe('サービス概要セクション', () => {
  test('serviceセクションが存在する', () => {
    const section = document.getElementById('service');
    expect(section).not.toBeNull();
  });

  test('サービス内容の説明が含まれる', () => {
    const section = document.getElementById('service');
    const text = section.textContent;
    expect(text).toContain('定例');
    expect(text).toContain('チャット');
  });
});

describe('3ヶ月ロードマップセクション', () => {
  test('roadmapセクションが存在する', () => {
    const section = document.getElementById('roadmap');
    expect(section).not.toBeNull();
  });

  test('3つのフェーズが表示されている', () => {
    const section = document.getElementById('roadmap');
    const phases = section.querySelectorAll('.phase, .step, .month');
    expect(phases.length).toBe(3);
  });
});

describe('料金セクション', () => {
  test('pricingセクションが存在する', () => {
    const section = document.getElementById('pricing');
    expect(section).not.toBeNull();
  });

  test('月額10万円の表示がある', () => {
    const section = document.getElementById('pricing');
    const text = section.textContent;
    expect(text).toMatch(/10万|100,000|¥100,000/);
  });

  test('契約期間の記載がある', () => {
    const section = document.getElementById('pricing');
    const text = section.textContent;
    expect(text).toContain('3ヶ月');
  });
});

describe('実績・強みセクション', () => {
  test('strengthセクションが存在する', () => {
    const section = document.getElementById('strength');
    expect(section).not.toBeNull();
  });

  test('Google認定エンジニアの記載がある', () => {
    const section = document.getElementById('strength');
    const text = section.textContent;
    expect(text).toMatch(/Google.*認定|GDE|Google Developer Expert/);
  });
});

describe('CTAセクション', () => {
  test('ctaセクションが存在する', () => {
    const section = document.getElementById('cta');
    expect(section).not.toBeNull();
  });

  test('お問い合わせリンクが存在する', () => {
    const section = document.getElementById('cta');
    const link = section.querySelector('a[href*="mailto"], a[href*="contact"]');
    expect(link).not.toBeNull();
  });
});

describe('フッター', () => {
  test('footerが存在する', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
  });

  test('会社名が含まれる', () => {
    const footer = document.querySelector('footer');
    expect(footer.textContent).toContain('GScale');
  });
});

describe('アクセシビリティ', () => {
  test('画像にalt属性が設定されている', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      expect(img.hasAttribute('alt')).toBe(true);
    });
  });

  test('見出しの階層が正しい（h1は1つのみ）', () => {
    const h1s = document.querySelectorAll('h1');
    expect(h1s.length).toBe(1);
  });

  test('セクションごとにh2見出しがある', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const heading = section.querySelector('h2, h1');
      expect(heading).not.toBeNull();
    });
  });
});

describe('Before/Afterセクション', () => {
  test('transformセクションが存在する', () => {
    const section = document.getElementById('transform');
    expect(section).not.toBeNull();
  });

  test('BeforeとAfterの両方が表示されている', () => {
    const section = document.getElementById('transform');
    const text = section.textContent;
    expect(text).toContain('Before');
    expect(text).toContain('After');
  });
});

describe('数値インパクトセクション', () => {
  test('numbersセクションが存在する', () => {
    const section = document.getElementById('numbers');
    expect(section).not.toBeNull();
  });

  test('数値が3つ以上表示されている', () => {
    const section = document.getElementById('numbers');
    const stats = section.querySelectorAll('.stat, .stat-item, .number-card');
    expect(stats.length).toBeGreaterThanOrEqual(3);
  });
});

describe('SVGイラスト', () => {
  test('SVG要素がページ内に存在する', () => {
    const svgs = document.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });
});

describe('レスポンシブ対応', () => {
  test('スタイルシートが読み込まれている', () => {
    const styles = document.querySelectorAll('style, link[rel="stylesheet"]');
    expect(styles.length).toBeGreaterThan(0);
  });
});
