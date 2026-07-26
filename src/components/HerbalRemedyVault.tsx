import React, { useState } from 'react';
import { Leaf, Send, Sparkles, ShieldCheck, HeartPulse, User, Bot, BookOpen } from 'lucide-react';
import { herbsData } from '../data/herbsData';
import { Herb, VaidyaChatMessage, PrakritiScore } from '../types';

interface HerbalRemedyVaultProps {
  prakritiScore: PrakritiScore | null;
}

export const HerbalRemedyVault: React.FC<HerbalRemedyVaultProps> = ({ prakritiScore }) => {
  const [selectedHerb, setSelectedHerb] = useState<Herb>(herbsData[0]);
  const [chatMessages, setChatMessages] = useState<VaidyaChatMessage[]>([
    {
      id: 'm1',
      sender: 'vaidya',
      text: `Namaste! I am Vaidya Ananda, your AI Ayurvedic health guide. How may I assist your health and wellness journey today? Feel free to ask about herbal remedies, digestion (Agni), seasonal care, or sleep support.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [askingVaidya, setAskingVaidya] = useState(false);

  const quickQuestions = [
    'How to relieve bloating and acid reflux naturally?',
    'What are the best Ayurvedic herbs for restful sleep?',
    'How to prepare an authentic Tulsi-Ginger Kadha for immunity?',
    'Simple Ayurvedic daily routines for morning energy?'
  ];

  const handleSendQuestion = async (textToSend?: string) => {
    const messageText = textToSend || inputMsg;
    if (!messageText.trim()) return;

    const userMsg: VaidyaChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMsg('');
    setAskingVaidya(true);

    try {
      const res = await fetch('/api/ask-vaidya', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          userDosha: prakritiScore ? prakritiScore.dominant : 'General'
        })
      });
      const data = await res.json();

      const vaidyaMsg: VaidyaChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'vaidya',
        text: data.reply || 'Namaste! Please let me know how else I can guide your wellness.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages((prev) => [...prev, vaidyaMsg]);
    } catch (e) {
      console.error('Error asking Vaidya:', e);
    } finally {
      setAskingVaidya(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl bg-gradient-to-r from-amber-950 via-stone-900 to-emerald-950 text-white shadow-xl">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-800/80 text-amber-200 text-xs font-semibold tracking-wider uppercase">
            <Leaf className="w-3.5 h-3.5" />
            Dravyaguna • Indian Herbal Science
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Traditional Indian Medicinal Herbs & AI Vaidya
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
            Explore classical herbs like Ashwagandha, Tulsi & Triphala, or ask Vaidya Ananda AI for personalized Ayurvedic home remedy advice.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 6 Cols: Classical Herb Vault */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-stone-900 text-xl flex items-center gap-2">
              <Leaf className="w-5 h-5 text-amber-700" />
              Classical Herb Directory
            </h3>
          </div>

          {/* Herb List Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {herbsData.map((herb) => {
              const isSelected = selectedHerb.id === herb.id;
              return (
                <button
                  key={herb.id}
                  onClick={() => setSelectedHerb(herb)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-amber-800 text-white border-amber-700 shadow-sm'
                      : 'bg-white text-stone-700 border-stone-200 hover:bg-amber-50'
                  }`}
                >
                  {herb.name}
                </button>
              );
            })}
          </div>

          {/* Selected Herb Detail Card */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs overflow-hidden p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-serif italic text-amber-800">{selectedHerb.sanskritName}</span>
                <h4 className="text-2xl font-serif font-bold text-stone-900">{selectedHerb.name}</h4>
                <p className="text-[11px] text-stone-500 font-mono italic">{selectedHerb.botanicalName}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold self-start">
                {selectedHerb.doshaImpact}
              </span>
            </div>

            <p className="text-xs text-stone-700 font-medium leading-relaxed bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/60">
              💡 <strong>Primary Benefit:</strong> {selectedHerb.primaryBenefit}
            </p>

            {/* Rasa Virya Vipaka Properties */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-stone-50 rounded-2xl text-center text-xs">
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Rasa (Taste)</span>
                <span className="font-semibold text-stone-900">{selectedHerb.rasa}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Virya (Energy)</span>
                <span className="font-semibold text-stone-900">{selectedHerb.virya}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 uppercase font-bold block">Vipaka (Post-Digest)</span>
                <span className="font-semibold text-stone-900">{selectedHerb.vipaka}</span>
              </div>
            </div>

            {/* Key Uses */}
            <div className="space-y-2">
              <h5 className="font-serif font-bold text-stone-900 text-xs uppercase tracking-wider">Key Therapeutic Applications</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {selectedHerb.keyUses.map((use, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-stone-50 border border-stone-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0" />
                    <span>{use}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Home Remedy Formulations */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-3">
              <h5 className="font-serif font-bold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                Classical DIY Home Formulation
              </h5>
              <div className="space-y-1.5 text-xs text-emerald-950">
                <div className="font-bold text-sm text-emerald-900">{selectedHerb.homeRemedy.title}</div>
                <div>
                  <strong>Ingredients:</strong> {selectedHerb.homeRemedy.ingredients.join(', ')}
                </div>
                <div>
                  <strong>Preparation:</strong> {selectedHerb.homeRemedy.preparation}
                </div>
                <div className="pt-1 font-semibold text-emerald-800">
                  🍵 <strong>How to Consume:</strong> {selectedHerb.homeRemedy.howToConsume}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right 6 Cols: AI Vaidya Chatbot Interface */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-stone-900 text-xl flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Ask Vaidya AI Consultation
            </h3>
            {prakritiScore && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                Context: {prakritiScore.dominant.toUpperCase()}
              </span>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuestion(q)}
                className="text-[11px] font-medium text-stone-700 bg-white hover:bg-amber-100/70 border border-stone-200 hover:border-amber-300 px-3 py-1.5 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Window */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs flex flex-col h-[520px] overflow-hidden">
            
            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {chatMessages.map((msg) => {
                const isVaidya = msg.sender === 'vaidya';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isVaidya ? 'justify-start' : 'justify-end'}`}
                  >
                    {isVaidya && (
                      <div className="w-8 h-8 rounded-full bg-amber-800 text-white flex items-center justify-center shrink-0 shadow-2xs text-xs font-serif font-bold">
                        ॐ
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed space-y-1.5 ${
                        isVaidya
                          ? 'bg-amber-50/90 text-stone-900 border border-amber-200/80 rounded-tl-xs'
                          : 'bg-amber-700 text-white font-medium rounded-tr-xs'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span className={`text-[10px] block ${isVaidya ? 'text-stone-400' : 'text-amber-200'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {askingVaidya && (
                <div className="flex items-center gap-2 text-xs font-medium text-stone-500 italic p-3">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                  Vaidya Ananda is consulting Ayurvedic texts...
                </div>
              )}
            </div>

            {/* Input Box */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about digestion, skin radiant oils, kadhas, or stress remedies..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendQuestion()}
                className="flex-1 p-3 rounded-xl text-xs bg-white border border-stone-200 focus:outline-hidden focus:ring-2 focus:ring-amber-600"
              />
              <button
                onClick={() => handleSendQuestion()}
                disabled={askingVaidya || !inputMsg.trim()}
                className="p-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white disabled:opacity-40 transition-colors shadow-2xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
