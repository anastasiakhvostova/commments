"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const MarketingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-3xl w-full text-center text-neutral-900 leading-relaxed">
        
        <h1 className="text-xl font-semibold mb-10">
          Дніпровський науковий ліцей інформаційних технологій  
          <br />
          Дніпровської міської ради
        </h1>

        <div className="mb-14">
          <p className="text-lg mb-2">Випускна робота</p>
          <p className="text-lg mb-2">на тему:</p>

          <h2 className="text-2xl font-bold uppercase mt-4">
            Застосунок для вивчення українських, англійських та німецьких діалектів
          </h2>
        </div>

        <div className="text-left mb-14">
          <p className="font-semibold mb-2">Виконавці:</p>
          <p>ліцеїсти 11-Г-2 класу</p>
          <p>Нестеренко Марія,</p>
          <p>Хвостова Анастасія,</p>
          <p>Коробчиц Валерія.</p>
        </div>

        <div className="text-left mb-20">
          <p className="font-semibold mb-2">Наукові керівники:</p>
          <p>Фомкін Сергій Володимирович</p>
        </div>

        {/* Кнопка переходу до програми */}
        <div className="flex justify-center mb-16">
          <Link href="/start">
            <Button size="lg" variant="primary" className="px-10 text-lg">
              ДО ПРОГРАМИ
            </Button>
          </Link>
        </div>

        <div className="flex justify-between text-lg">
          <span>Дніпро</span>
          <span>2026</span>
        </div>

      </div>
    </div>
  );
};

export default MarketingPage;

