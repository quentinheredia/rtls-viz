import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipBack, SkipForward, Download } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function Playback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [startDate, setStartDate] = useState('2025-09-01');
  const [startTime, setStartTime] = useState('11:00');
  const [endDate, setEndDate] = useState('2025-09-01');
  const [endTime, setEndTime] = useState('13:00');

  const totalDuration = 120; // 2 hours in minutes

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Historical Playback</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Replay and analyze historical location data
        </p>
      </div>

      {/* Time Range Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Playback Range</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Start Date</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">Start Time</label>
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">End Date</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1.5 block">End Time</label>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="default">Load Playback Data</Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export to CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Playback Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Playback Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timeline Scrubber */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{startDate} {startTime}</span>
              <span className="font-mono">
                {Math.floor(currentTime / 60)}h {currentTime % 60}m / {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
              </span>
              <span>{endDate} {endTime}</span>
            </div>
            <Slider
              value={[currentTime]}
              onValueChange={(value) => setCurrentTime(value[0])}
              max={totalDuration}
              step={1}
              className="cursor-pointer"
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentTime(Math.max(0, currentTime - 10))}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="h-12 w-12"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentTime(Math.min(totalDuration, currentTime + 10))}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Speed Control */}
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Speed:</span>
            {[0.5, 1, 2, 4, 8].map((s) => (
              <Button
                key={s}
                variant={speed === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSpeed(s)}
                className="font-mono"
              >
                {s}x
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Playback Map Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Map Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-muted rounded-md flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="text-sm">Map preview will show historical positions</div>
              <div className="text-xs mt-1">Select a time range and load playback data</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Event Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 border-l-2 border-severity-critical pl-3">
              <span className="font-mono text-xs text-muted-foreground">11:23:45</span>
              <Badge variant="outline" className="severity-critical">
                Geofence Breach
              </Badge>
              <span className="text-sm">Patient-A1 left ICU zone</span>
            </div>
            <div className="flex items-center gap-3 p-2 border-l-2 border-severity-warning pl-3">
              <span className="font-mono text-xs text-muted-foreground">11:45:12</span>
              <Badge variant="outline" className="severity-warning">
                Low Battery
              </Badge>
              <span className="text-sm">T-025 battery at 8%</span>
            </div>
            <div className="flex items-center gap-3 p-2 border-l-2 border-severity-info pl-3">
              <span className="font-mono text-xs text-muted-foreground">12:10:33</span>
              <Badge variant="outline" className="severity-info">
                Location Update
              </Badge>
              <span className="text-sm">Tag positions updated</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
