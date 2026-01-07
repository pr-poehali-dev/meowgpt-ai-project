import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: number;
  title: string;
  messages: Message[];
  lastMessage: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: () => void;
  chats: Chat[];
}

const ChatInterface = ({
  messages,
  inputValue,
  setInputValue,
  handleSendMessage,
  chats
}: ChatInterfaceProps) => {
  return (
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
  );
};

export default ChatInterface;
