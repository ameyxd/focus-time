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
import { Clock, Settings, MapPin, Play, RefreshCw, Pause } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

export default function Home() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);

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
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Timer Card */}
        <Card className="aspect-square p-6 relative overflow-hidden cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 to-slate-900" />
          <div className="relative h-full flex flex-col justify-between">
            <div>
              <h2 className="text-7xl font-bold tracking-tighter mb-2">{formatTime(time)}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Focus
              </p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setTime(25 * 60);
                  setIsRunning(false);
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Time & Location Card */}
        <Card className="aspect-square p-6 relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950 to-slate-900" />
          <div className="relative h-full flex flex-col justify-between">
            <div>
              <h2 className="text-7xl font-bold tracking-tighter mb-2">
                {format(new Date(), 'HH:mm')}
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Houston
              </p>
            </div>
          </div>
        </Card>

        {/* Settings Card */}
        <Card className="aspect-square p-6 relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-950 to-slate-900" />
          <div className="relative h-full">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Settings className="w-6 h-6" />
              Settings
            </h2>
          </div>
        </Card>
      </div>
    </div>
  );
} 