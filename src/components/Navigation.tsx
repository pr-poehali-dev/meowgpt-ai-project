import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Navigation = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: NavigationProps) => {
  return (
    <nav className="border-b border-white/10 backdrop-blur-md bg-black/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
              🐱
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              MeowGPT
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              variant={activeTab === 'home' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('home')}
              className="transition-all hover:scale-105"
            >
              <Icon name="Home" className="mr-2 h-4 w-4" />
              Главная
            </Button>
            <Button
              variant={activeTab === 'chat' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('chat')}
              className="transition-all hover:scale-105"
            >
              <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
              Чат
            </Button>
            <Button
              variant={activeTab === 'history' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('history')}
              className="transition-all hover:scale-105"
            >
              <Icon name="Clock" className="mr-2 h-4 w-4" />
              История
            </Button>
            <Button
              variant={activeTab === 'settings' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('settings')}
              className="transition-all hover:scale-105"
            >
              <Icon name="Settings" className="mr-2 h-4 w-4" />
              Настройки
            </Button>
            <Button
              variant={activeTab === 'about' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('about')}
              className="transition-all hover:scale-105"
            >
              <Icon name="Info" className="mr-2 h-4 w-4" />
              О проекте
            </Button>
            <Button
              variant={activeTab === 'faq' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('faq')}
              className="transition-all hover:scale-105"
            >
              <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
              FAQ
            </Button>
          </div>

          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-sidebar border-sidebar-border">
              <div className="flex flex-col gap-2 mt-8">
                <Button
                  variant={activeTab === 'home' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('home'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="Home" className="mr-2 h-4 w-4" />
                  Главная
                </Button>
                <Button
                  variant={activeTab === 'chat' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('chat'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
                  Чат
                </Button>
                <Button
                  variant={activeTab === 'history' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('history'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="Clock" className="mr-2 h-4 w-4" />
                  История
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="Settings" className="mr-2 h-4 w-4" />
                  Настройки
                </Button>
                <Button
                  variant={activeTab === 'about' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('about'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="Info" className="mr-2 h-4 w-4" />
                  О проекте
                </Button>
                <Button
                  variant={activeTab === 'faq' ? 'default' : 'ghost'}
                  onClick={() => { setActiveTab('faq'); setSidebarOpen(false); }}
                  className="justify-start"
                >
                  <Icon name="HelpCircle" className="mr-2 h-4 w-4" />
                  FAQ
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
