import { useSyncExternalStore } from 'react';

let audioContext: AudioContext | null = null;
let masterGain: GainNode | null = null;
let enabled = false;
const subscribers = new Set<() => void>();

function notify() { subscribers.forEach((subscriber) => subscriber()); }

function ensureAudioGraph() {
  if (audioContext && masterGain) return;
  audioContext = new window.AudioContext();
  const lowpass = audioContext.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.value = 125;
  lowpass.Q.value = 0.55;
  masterGain = audioContext.createGain();
  masterGain.gain.value = 0;
  lowpass.connect(masterGain);
  masterGain.connect(audioContext.destination);
  [42, 42.4].forEach((frequency, index) => {
    const oscillator = audioContext!.createOscillator();
    const layerGain = audioContext!.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    layerGain.gain.value = index === 0 ? 0.72 : 0.28;
    oscillator.connect(layerGain);
    layerGain.connect(lowpass);
    oscillator.start();
  });
}

export async function setAmbientSound(enabledNext: boolean) {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return;
  ensureAudioGraph();
  enabled = enabledNext;
  const context = audioContext!;
  const gain = masterGain!.gain;
  if (enabledNext) {
    await context.resume();
    gain.cancelScheduledValues(context.currentTime);
    gain.setTargetAtTime(0.12, context.currentTime, 0.45);
  } else {
    gain.cancelScheduledValues(context.currentTime);
    gain.setTargetAtTime(0, context.currentTime, 0.25);
    window.setTimeout(() => {
      if (!enabled && context.state === 'running') void context.suspend();
    }, 900);
  }
  notify();
}

export const activateAmbientSound = () => setAmbientSound(true);
export const subscribeAmbientSound = (subscriber: () => void) => {
  subscribers.add(subscriber);
  return () => subscribers.delete(subscriber);
};
export const getAmbientSoundEnabled = () => enabled;
export const useAmbientSoundEnabled = () => useSyncExternalStore(subscribeAmbientSound, getAmbientSoundEnabled, () => false);