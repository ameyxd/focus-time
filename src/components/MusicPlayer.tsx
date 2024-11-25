/**
 * Music Player Component
 * Handles YouTube video playback and background effects
 */

import { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, Shuffle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface MusicPlayerProps {
  playlistUrl: string;
}

interface VideoInfo {
  id: string;
  title: string;
}

export function MusicPlayer({ playlistUrl }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<VideoInfo | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [blurAmount, setBlurAmount] = useState(20);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [isTitleOverflowing, setIsTitleOverflowing] = useState(false);

  const PLAYLIST_ID = 'PL6dMWM5sYDapFWlmjH3rXn09igyLVsWNH';

  const handlePlay = () => {
    if (!isPlayerReady) return;
    
    if (player && typeof player.playVideo === 'function') {
      player.playVideo();
      setIsPlaying(true);
      
      // Get current video info if not set
      if (!currentVideo) {
        const videoData = player.getVideoData();
        setCurrentVideo({
          id: videoData.video_id,
          title: videoData.title
        });
      }
      
      updateBackgroundVideo(true);
    }
  };

  const handlePause = () => {
    if (!isPlayerReady) return;
    
    if (player && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
      setIsPlaying(false);
      updateBackgroundVideo(false);
    }
  };

  const handleRandom = async () => {
    if (!isPlayerReady || !player) return;

    try {
      const playlist = await player.getPlaylist();
      if (playlist && playlist.length > 0) {
        const randomIndex = Math.floor(Math.random() * playlist.length);
        player.playVideoAt(randomIndex);
        
        // Immediately update video info and background
        const videoData = player.getVideoData();
        const newVideo = {
          id: videoData.video_id,
          title: videoData.title
        };
        setCurrentVideo(newVideo);
        setIsPlaying(true);
        updateBackgroundVideo(true, newVideo);
      }
    } catch (error) {
      console.error('Error playing random video:', error);
    }
  };

  const updateBackgroundVideo = (show: boolean, videoInfo = currentVideo) => {
    if (!videoInfo) return;

    let backgroundVideo = document.querySelector('.video-background') as HTMLDivElement;
    
    if (!backgroundVideo && show) {
      backgroundVideo = document.createElement('div');
      backgroundVideo.className = 'video-background';
      document.body.insertBefore(backgroundVideo, document.body.firstChild);

      const blurLayer = document.createElement('div');
      blurLayer.className = 'blur-layer';
      blurLayer.style.filter = `blur(${blurAmount}px) brightness(0.3)`;
      backgroundVideo.appendChild(blurLayer);
    }

    if (backgroundVideo) {
      if (show) {
        const imageUrl = `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`;
        
        const img = new Image();
        img.onload = () => {
          if (backgroundVideo) {
            const blurLayer = backgroundVideo.querySelector('.blur-layer') as HTMLDivElement;
            if (blurLayer) {
              blurLayer.style.backgroundImage = `url(${imageUrl})`;
              blurLayer.style.filter = `blur(${blurAmount}px) brightness(0.3)`;
              backgroundVideo.classList.add('show');
              document.body.classList.add('has-video-background');
            }
          }
        };
        img.src = imageUrl;
      } else {
        backgroundVideo.classList.remove('show');
        document.body.classList.remove('has-video-background');
        setTimeout(() => {
          backgroundVideo?.remove();
        }, 300);
      }
    }
  };

  const onReady = (event: any) => {
    const ytPlayer = event.target;
    setPlayer(ytPlayer);
    setIsPlayerReady(true);

    // Load the playlist
    ytPlayer.loadPlaylist({
      list: PLAYLIST_ID,
      listType: 'playlist',
      index: 0,
    });

    // Pause immediately and get initial video data
    setTimeout(() => {
      ytPlayer.pauseVideo();
      const videoData = ytPlayer.getVideoData();
      setCurrentVideo({
        id: videoData.video_id,
        title: videoData.title
      });
    }, 100);
  };

  const onStateChange = (event: any) => {
    // YouTube Player States:
    // -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
    const newIsPlaying = event.data === 1;
    setIsPlaying(newIsPlaying);

    // Update current video info when video changes
    if (player && (event.data === 1 || event.data === 2)) {
      const videoData = player.getVideoData();
      setCurrentVideo({
        id: videoData.video_id,
        title: videoData.title
      });
      updateBackgroundVideo(newIsPlaying);
    }
  };

  useEffect(() => {
    // Update blur effect when slider changes
    const blurLayer = document.querySelector('.blur-layer') as HTMLDivElement;
    if (blurLayer) {
      blurLayer.style.filter = `blur(${blurAmount}px) brightness(0.3)`;
    }
  }, [blurAmount]);

  // Check if title is overflowing
  useEffect(() => {
    if (titleRef.current) {
      setIsTitleOverflowing(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
  }, [currentVideo?.title]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.music-player-card') && !target.closest('.focus-card')) {
        setIsMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Card 
      className={`music-player-card relative overflow-hidden transition-all duration-300 hover:scale-[1.02] rounded-[32px] bg-gradient-to-b from-gray-200 to-white p-[2px] dark:from-gray-800 dark:to-gray-900 ${
        isMinimized ? 'fixed bottom-4 left-1/2 -translate-x-1/2 w-96 z-50' : 'w-full'
      }`}
      onClick={() => setIsMinimized(false)}
    >
      <div className="absolute inset-0 rounded-[30px] bg-white dark:bg-slate-900" />
      <div className="relative flex flex-col p-8 rounded-[30px]">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold">Now Playing</h2>
            <div className="overflow-hidden">
              <div 
                ref={titleRef}
                className={`text-muted-foreground whitespace-nowrap ${
                  isTitleOverflowing ? 'marquee' : ''
                }`}
              >
                {currentVideo?.title || 'Select a track'}
              </div>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                isPlaying ? handlePause() : handlePlay();
              }}
              disabled={!isPlayerReady}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                handleRandom();
              }}
              disabled={!isPlayerReady}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Blur control slider - Only show when not minimized */}
        {!isMinimized && (
          <div className="mt-4 flex items-center gap-2">
            <label className="text-xs text-muted-foreground whitespace-nowrap">
              Blur: {blurAmount}
            </label>
            <Slider
              value={[blurAmount]}
              onValueChange={([value]) => setBlurAmount(value)}
              min={0}
              max={20}
              step={1}
              className="w-24 ml-2"
            />
          </div>
        )}

        <div style={{ display: 'none' }}>
          <YouTube
            opts={{
              playerVars: {
                autoplay: 0,
                controls: 0,
                modestbranding: 1,
                loop: 1,
                playlist: PLAYLIST_ID,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      </div>
    </Card>
  );
} 