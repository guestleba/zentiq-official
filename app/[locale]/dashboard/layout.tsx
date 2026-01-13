import ZentiqLogo from '@/components/ZentiqLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { LayoutDashboard, Send, History, Settings } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0a192f]">
      
      {/* Sidebar Fixa */}
      <aside className="w-64 bg-[#0a192f] border-r border-white/5 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="w-8 h-8 mr-3">
             <ZentiqLogo className="w-full h-full" />
          </div>
          <span className="font-bold text-lg text-[#e6f1ff] tracking-widest">APP</span>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, active: true },
            { name: 'Shield Assets', icon: Send, active: false },
            { name: 'History', icon: History, active: false },
            { name: 'Settings', icon: Settings, active: false },
          ].map((item) => (
            <div 
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                item.active 
                  ? 'bg-[#64ffda]/10 text-[#64ffda]' 
                  : 'text-[#8892b0] hover:bg-[#112240] hover:text-[#e6f1ff]'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
            <div className="text-xs text-[#8892b0] mb-2">NETWORK STATUS</div>
            <div className="flex items-center gap-2 text-[#64ffda] text-sm">
                <div className="w-2 h-2 bg-[#64ffda] rounded-full animate-pulse"></div>
                Operational
            </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col">
        {/* Topbar Mobile/Desktop */}
        <header className="h-20 border-b border-white/5 flex items-center justify-end px-8 bg-[#0a192f]/50 backdrop-blur-md sticky top-0 z-10">
            <ConnectButton showBalance={false} accountStatus="avatar" chainStatus="icon" />
        </header>

        {/* Onde entra a página que criamos no Passo 1 */}
        {children}
      </main>
    </div>
  );
}