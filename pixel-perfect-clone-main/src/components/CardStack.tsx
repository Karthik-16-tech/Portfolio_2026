import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

export type DeckCard = {
  id: string | number;
  title: string;
  subtitle?: string;
  body?: string;
  img?: string;
  tag?: string;
};

type Props = {
  cards: DeckCard[];
};

export default function CardStack({ cards }: Props) {
  const [order, setOrder] = useState(cards);

  const handleSwipe = (id: DeckCard["id"]) => {
    setOrder((prev) => {
      const remaining = prev.filter((c) => c.id !== id);
      const removed = prev.find((c) => c.id === id);
      return removed ? [...remaining, removed] : prev;
    });
  };

  return (
    <div className="relative w-full max-w-[380px] h-[480px] mx-auto select-none">
      <AnimatePresence>
        {order.slice(0, 4).map((card, index) => (
          <SwipeCard
            key={card.id}
            card={card}
            index={index}
            isTop={index === 0}
            onSwipe={() => handleSwipe(card.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function SwipeCard({
  card,
  index,
  isTop,
  onSwipe,
}: {
  card: DeckCard;
  index: number;
  isTop: boolean;
  onSwipe: () => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: 10 - index,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 140 || Math.abs(info.velocity.x) > 500) {
          onSwipe();
        }
      }}
      initial={{ scale: 0.92, y: 24, opacity: 0 }}
      animate={{
        scale: 1 - index * 0.04,
        y: index * 14,
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <div
        className="w-full h-full rounded-3xl border border-white/10 overflow-hidden relative shadow-[0_30px_80px_-20px_rgba(120,80,255,0.45)] backdrop-blur-xl"
        style={{
          background:
            "linear-gradient(160deg, hsl(265 60% 12% / 0.9), hsl(240 30% 6% / 0.95))",
        }}
      >
        {card.img && (
          <div className="h-1/2 w-full overflow-hidden">
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        )}
        <div className="p-6 flex flex-col gap-3">
          {card.tag && (
            <div className="font-mono text-[10px] tracking-widest text-primary uppercase">
              {card.tag}
            </div>
          )}
          <h3 className="font-display text-2xl text-white tracking-tight">{card.title}</h3>
          {card.subtitle && (
            <p className="text-sm text-white/60">{card.subtitle}</p>
          )}
          {card.body && (
            <p className="text-sm text-white/50 leading-relaxed">{card.body}</p>
          )}
        </div>
        {isTop && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/30 uppercase">
            ← swipe →
          </div>
        )}
      </div>
    </motion.div>
  );
}
