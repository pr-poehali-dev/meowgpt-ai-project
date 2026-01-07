import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ChatInterface, { Message, Chat } from '@/components/ChatInterface';
import ContentPages from '@/components/ContentPages';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#2D1B69] to-[#1A1F2C] animate-gradient-shift bg-[length:200%_200%]">
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'chat' ? (
          <ChatInterface
            messages={messages}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleSendMessage={handleSendMessage}
            chats={chats}
          />
        ) : (
          <ContentPages
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            chats={chats}
          />
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
