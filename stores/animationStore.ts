// stores/animationStore.ts
import { create } from 'zustand';

interface AnimationState {
  triggered: boolean;
  triggerAnimation: () => void;
  resetAnimation: () => void;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  triggered: false,
  triggerAnimation: () => set({ triggered: true }),
  resetAnimation: () => set({ triggered: false }),
}));
