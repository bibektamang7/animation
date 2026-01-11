"use client";
import dynamic from 'next/dynamic';

// Dynamically import FixedScene with no SSR
const FixedSceneDynamic = dynamic(
  () => import('./FixedScene'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 z-1 bg-transparent" />
  }
);

export default FixedSceneDynamic;
