import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { Chat } from './ChatInterface';

interface ContentPagesProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  chats: Chat[];
}

const ContentPages = ({ activeTab, setActiveTab, chats }: ContentPagesProps) => {
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
    <>
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
    </>
  );
};

export default ContentPages;
