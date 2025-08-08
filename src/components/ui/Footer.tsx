import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-token-70">
      <div className="container-app py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-app mb-4">
              Hyper<span className="text-gradient">Hash</span>
              <span className="text-sm font-normal ml-1 text-muted">AI</span>
            </div>
            <p className="text-muted text-sm mb-4">
              #1 AI hashtag generator. Boost your reach and engagement.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-app mb-4">🛠️ Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools" className="text-muted hover:text-app">AI Hashtag Generator</Link></li>
              <li><Link href="/tools" className="text-muted hover:text-app">Multi-Platform Generator</Link></li>
              <li><Link href="/tools" className="text-muted hover:text-app">Hashtag Analytics</Link></li>
              <li><Link href="/guides" className="text-muted hover:text-app">Strategy Guides</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-app mb-4">📚 Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog" className="text-muted hover:text-app">Blog</Link></li>
              <li><Link href="/guides" className="text-muted hover:text-app">Guides</Link></li>
              <li><Link href="/guides/dos-donts" className="text-muted hover:text-app">Best Practices</Link></li>
              <li><Link href="/guides/automation" className="text-muted hover:text-app">Automation Tips</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-app mb-4">🏢 Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted hover:text-app">About Us</Link></li>
              <li><Link href="/pricing" className="text-muted hover:text-app">Pricing</Link></li>
              <li><Link href="/contact" className="text-muted hover:text-app">Contact</Link></li>
              <li><Link href="/privacy" className="text-muted hover:text-app">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-token-70 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p>© 2025 HyperHash. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🚀 Viral hashtags</span>
            <span>•</span>
            <span>🌍 Global reach</span>
            <span>•</span>
            <span>📈 Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
