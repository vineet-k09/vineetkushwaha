// components/TextSlideIn.tsx
'use client';
import { motion } from 'framer-motion';
type Props = {
    children: React.ReactNode;
    from?: 'left' | 'right' | 'top' | 'bottom';
    delay?: number;
};

export default function TextSlideIn({ children, from = 'left', delay = 0 }: Props) {
    const variants = {
        hidden: {
            x: from === 'left' ? '-100%' : from === 'right' ? '100%' : 0,
            y: from === 'top' ? '-100%' : from === 'bottom' ? '100%' : 0,
            opacity: 0,
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, delay, ease: 'easeOut' },
        },
    };

    return (
        <motion.div
            className="font-bold"
            initial="hidden"
            animate="visible"
            variants={variants}
        >
            {children}
        </motion.div>
    );
}
