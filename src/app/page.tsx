/**
 * Focus Time App - Home Page
 * Author: Amey Ambade
 * Created: 2024-11-25
 * 
 * Main page component containing the grid layout of focus cards
 */
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Settings, MapPin, Play, RefreshCw, Pause, Moon, Sun, Maximize2, Zap } from "lucide-react";
import { format, getWeek } from "date-fns";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function Home() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const { theme, setTheme } = useTheme();

  // Progress calculation
  const secondsProgress = (time % 60) / 60 * 100;
  const playlistUrl = "https://www.youtube.com/playlist?list=PL6dMWM5sYDapFWlmjH3rXn09igyLVsWNH";

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50/80 dark:bg-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full group">
        <div className="md:col-span-3">
          <MusicPlayer playlistUrl={playlistUrl} />
        </div>

        {/* Timer Card */}
        <Card className="focus-card aspect-square relative overflow-hidden transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900" />
          <div className="relative h-full flex flex-col p-8 rounded-[30px]">
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Expand</span>
                <Maximize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <span className="sr-only">Settings</span>
                <Settings className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-7xl font-bold tracking-tighter mb-2">{formatTime(time)}</h2>
              <p className="text-gray-500 dark:text-gray-400">Focus</p>
              <p className="text-gray-500 dark:text-gray-400 mt-4">Just do it.</p>
            </div>
            <div className="flex gap-2 justify-start mt-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => {
                  setTime(25 * 60)
                  setIsRunning(false)
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Zap className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Time & Location Card */}
        <Card className="focus-card aspect-square relative overflow-hidden transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900" />
          <div className="relative h-full flex flex-col p-8 rounded-[30px]">
            <div className="flex-1">
              <h2 className="text-7xl font-bold tracking-tighter mb-2">
                {format(new Date(), 'HH:mm')}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Houston
              </p>
              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                <p>{format(new Date(), 'EEE, MMM dd')}</p>
                <p>Week {getWeek(new Date())}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Settings Card */}
        <Card className="focus-card aspect-square relative overflow-hidden transition-all duration-300 group-hover:blur-sm hover:!blur-none hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900">
          <div className="absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900" />
          <div className="relative h-full flex flex-col p-8 rounded-[30px]">
            <div className="flex-1">
              <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
                <Settings className="w-6 h-6" />
                Settings
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dark Mode</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  >
                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 