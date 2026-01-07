import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Мяу! 🐱 Привет! Я MeowGPT, твой AI-помощник. Как могу помочь?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 1,
      title: 'Первый разговор',
      messages: [],
      lastMessage: new Date()
    }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: 'Мяу! Это демо-версия. Подключи OpenAI API в настройках для работы с реальной моделью! 🚀',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const faqItems = [
    {
      question: 'Как подключить OpenAI API?',
      answer: 'Перейдите в раздел "Настройки" и добавьте ваш API ключ от OpenAI. После этого MeowGPT начнёт работать с реальной моделью GPT.'
    },
    {
      question: 'Сохраняется ли история диалогов?',
      answer: 'Да! Все ваши диалоги автоматически сохраняются в разделе "История". Вы можете вернуться к любому разговору в любое время.'
    },
    {
      question: 'Можно ли экспортировать диалоги?',
      answer: 'Конечно! В настройках есть опция экспорта диалогов в формате JSON или текстового файла.'
    },
    {
      question: 'Есть ли мобильная версия?',
      answer: 'MeowGPT полностью адаптивен и отлично работает на мобильных устройствах и планшетах.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B69] to-[#1A1F2C] animate-gradient-shift bg-[length:200%_200%]">
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

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-4 py-12">
              <div className="text-7xl mb-6 animate-scale-in">🐱</div>
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                Добро пожаловать в MeowGPT
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Современный AI-ассистент с интуитивным интерфейсом и мощными возможностями
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button
                  size="lg"
                  onClick={() => setActiveTab('chat')}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all hover:scale-105"
                >
                  <Icon name="MessageSquare" className="mr-2 h-5 w-5" />
                  Начать чат
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setActiveTab('about')}
                  className="transition-all hover:scale-105"
                >
                  <Icon name="Info" className="mr-2 h-5 w-5" />
                  Узнать больше
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <Card className="p-6 bg-card/50 backdrop-blur border-white/10 hover:border-primary/50 transition-all hover:scale-105">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Быстрые ответы</h3>
                <p className="text-muted-foreground">
                  Получайте мгновенные ответы на любые вопросы с помощью передовой AI-модели
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-white/10 hover:border-primary/50 transition-all hover:scale-105">
                <div className="text-4xl mb-4">💾</div>
                <h3 className="text-xl font-semibold mb-2">История диалогов</h3>
                <p className="text-muted-foreground">
                  Все ваши разговоры сохраняются и доступны в любое время
                </p>
              </Card>

              <Card className="p-6 bg-card/50 backdrop-blur border-white/10 hover:border-primary/50 transition-all hover:scale-105">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Современный дизайн</h3>
                <p className="text-muted-foreground">
                  Приятный интерфейс с плавными анимациями и тёмной темой
                </p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="max-w-5xl mx-auto animate-fade-in">
            <Card className="bg-card/50 backdrop-blur border-white/10 overflow-hidden">
              <div className="flex h-[calc(100vh-200px)]">
                <div className="hidden lg:flex flex-col w-64 border-r border-white/10 bg-sidebar/50">
                  <div className="p-4 border-b border-white/10">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="Plus" className="mr-2 h-4 w-4" />
                      Новый чат
                    </Button>
                  </div>
                  <ScrollArea className="flex-1 p-2">
                    {chats.map((chat) => (
                      <Button
                        key={chat.id}
                        variant="ghost"
                        className="w-full justify-start mb-1 hover:bg-sidebar-accent"
                      >
                        <Icon name="MessageSquare" className="mr-2 h-4 w-4" />
                        <span className="truncate">{chat.title}</span>
                      </Button>
                    ))}
                  </ScrollArea>
                </div>

                <div className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 animate-fade-in ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                              🐱
                            </div>
                          )}
                          <div
                            className={`rounded-2xl px-4 py-3 max-w-[80%] ${
                              message.role === 'user'
                                ? 'bg-gradient-to-r from-primary to-secondary text-white'
                                : 'bg-muted/50 backdrop-blur'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            <span className="text-xs opacity-60 mt-2 block">
                              {message.timestamp.toLocaleTimeString('ru-RU', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center flex-shrink-0">
                              👤
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="p-4 border-t border-white/10 bg-sidebar/30 backdrop-blur">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Напишите сообщение... 🐱"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 bg-input/50 border-white/10 focus:border-primary"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      >
                        <Icon name="Send" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-white/10">
              <h2 className="text-2xl font-bold mb-6">История диалогов</h2>
              <div className="space-y-4">
                {chats.map((chat) => (
                  <Card
                    key={chat.id}
                    className="p-4 bg-muted/30 border-white/10 hover:border-primary/50 transition-all cursor-pointer hover:scale-[1.02]"
                    onClick={() => setActiveTab('chat')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon name="MessageSquare" className="h-5 w-5 text-primary" />
                        <div>
                          <h3 className="font-semibold">{chat.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {chat.messages.length} сообщений
                          </p>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {chat.lastMessage.toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-white/10">
              <h2 className="text-2xl font-bold mb-6">Настройки</h2>
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="general">Основные</TabsTrigger>
                  <TabsTrigger value="api">API</TabsTrigger>
                  <TabsTrigger value="export">Экспорт</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h3 className="font-semibold">Тёмная тема</h3>
                        <p className="text-sm text-muted-foreground">
                          Включена по умолчанию
                        </p>
                      </div>
                      <Button variant="outline">
                        <Icon name="Moon" className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <h3 className="font-semibold">Язык интерфейса</h3>
                        <p className="text-sm text-muted-foreground">Русский</p>
                      </div>
                      <Button variant="outline">
                        <Icon name="Globe" className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="api" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/30">
                      <h3 className="font-semibold mb-2">OpenAI API Key</h3>
                      <Input
                        type="password"
                        placeholder="sk-..."
                        className="mb-3 bg-input/50 border-white/10"
                      />
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Сохранить ключ
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="export" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <Button className="w-full justify-start" variant="outline">
                      <Icon name="Download" className="mr-2 h-4 w-4" />
                      Экспортировать все диалоги (JSON)
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Icon name="FileText" className="mr-2 h-4 w-4" />
                      Экспортировать все диалоги (TXT)
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-8 bg-card/50 backdrop-blur border-white/10">
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🐱</div>
                <h2 className="text-3xl font-bold mb-4">О проекте MeowGPT</h2>
              </div>

              <div className="space-y-6 text-muted-foreground">
                <p className="text-lg">
                  MeowGPT — это современный AI-ассистент, разработанный для комфортного общения
                  с искусственным интеллектом. Проект создан с акцентом на удобство
                  использования и визуальную привлекательность.
                </p>

                <Separator className="bg-white/10" />

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    Основные возможности
                  </h3>
                  <ul className="space-y-2 list-disc list-inside">
                    <li>Интеграция с OpenAI API</li>
                    <li>Сохранение истории диалогов</li>
                    <li>Экспорт диалогов в различных форматах</li>
                    <li>Тёмная тема и настройки языка</li>
                    <li>Адаптивный дизайн для всех устройств</li>
                    <li>Статистика использования</li>
                  </ul>
                </div>

                <Separator className="bg-white/10" />

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Технологии</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind CSS', 'OpenAI API', 'Vite'].map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Card className="p-6 bg-card/50 backdrop-blur border-white/10">
              <h2 className="text-2xl font-bold mb-6">Часто задаваемые вопросы</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-white/10 mt-12 backdrop-blur-md bg-black/20">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>© 2024 MeowGPT. Создано с 💜 и помощью AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
