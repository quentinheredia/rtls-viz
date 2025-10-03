import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useRTLSStore } from '@/store/useRTLSStore';
import { mockAnchors, mockTags } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Inventory() {
  const { anchors, tags, setAnchors, setTags } = useRTLSStore();
  const [anchorSearch, setAnchorSearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');

  useEffect(() => {
    setAnchors(mockAnchors);
    setTags(mockTags);
  }, [setAnchors, setTags]);

  const filteredAnchors = anchors.filter(
    (a) =>
      a.label.toLowerCase().includes(anchorSearch.toLowerCase()) ||
      a.id.toLowerCase().includes(anchorSearch.toLowerCase())
  );

  const filteredTags = tags.filter(
    (t) =>
      t.label.toLowerCase().includes(tagSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(tagSearch.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Inventory</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and monitor all anchors, tags, and devices
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Tabs defaultValue="anchors" className="w-full">
        <TabsList>
          <TabsTrigger value="anchors">
            Anchors ({anchors.length})
          </TabsTrigger>
          <TabsTrigger value="tags">
            Tags ({tags.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anchors" className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search anchors..."
              value={anchorSearch}
              onChange={(e) => setAnchorSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Anchors Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Anchors ({filteredAnchors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="pb-3 font-medium text-muted-foreground">ID</th>
                      <th className="pb-3 font-medium text-muted-foreground">Label</th>
                      <th className="pb-3 font-medium text-muted-foreground">Technology</th>
                      <th className="pb-3 font-medium text-muted-foreground">Status</th>
                      <th className="pb-3 font-medium text-muted-foreground">Position</th>
                      <th className="pb-3 font-medium text-muted-foreground">RSSI</th>
                      <th className="pb-3 font-medium text-muted-foreground">SNR</th>
                      <th className="pb-3 font-medium text-muted-foreground">Firmware</th>
                      <th className="pb-3 font-medium text-muted-foreground">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnchors.map((anchor) => (
                      <tr
                        key={anchor.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer"
                      >
                        <td className="py-3 font-mono text-xs">{anchor.id}</td>
                        <td className="py-3 font-medium">{anchor.label}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {anchor.tech}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <StatusBadge status={anchor.status} />
                        </td>
                        <td className="py-3 font-mono text-xs">
                          {anchor.position.x.toFixed(1)}, {anchor.position.y.toFixed(1)}
                        </td>
                        <td className="py-3 font-mono text-xs">
                          {anchor.rssi ? `${anchor.rssi} dBm` : '—'}
                        </td>
                        <td className="py-3 font-mono text-xs">
                          {anchor.snr ? `${anchor.snr} dB` : '—'}
                        </td>
                        <td className="py-3 font-mono text-xs">{anchor.firmware}</td>
                        <td className="py-3 text-xs text-muted-foreground">
                          {new Date(anchor.lastSeen).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tags" className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Tags Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Tags ({filteredTags.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-border">
                    <tr className="text-left">
                      <th className="pb-3 font-medium text-muted-foreground">ID</th>
                      <th className="pb-3 font-medium text-muted-foreground">Label</th>
                      <th className="pb-3 font-medium text-muted-foreground">Technology</th>
                      <th className="pb-3 font-medium text-muted-foreground">Battery</th>
                      <th className="pb-3 font-medium text-muted-foreground">HR</th>
                      <th className="pb-3 font-medium text-muted-foreground">Temp</th>
                      <th className="pb-3 font-medium text-muted-foreground">Firmware</th>
                      <th className="pb-3 font-medium text-muted-foreground">Last Seen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTags.map((tag) => (
                      <tr
                        key={tag.id}
                        className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer"
                      >
                        <td className="py-3 font-mono text-xs">{tag.id}</td>
                        <td className="py-3 font-medium">{tag.label}</td>
                        <td className="py-3">
                          <Badge variant="outline" className="text-xs">
                            {tag.tech}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-16 h-1.5 rounded-full ${
                                tag.batteryPct > 50
                                  ? 'bg-status-online'
                                  : tag.batteryPct > 20
                                  ? 'bg-status-degraded'
                                  : 'bg-status-critical'
                              }`}
                              style={{ width: `${Math.max(12, tag.batteryPct / 100 * 64)}px` }}
                            />
                            <span className="font-mono text-xs">{tag.batteryPct}%</span>
                          </div>
                        </td>
                        <td className="py-3 font-mono text-xs">
                          {tag.sensors.hr ? `${tag.sensors.hr} bpm` : '—'}
                        </td>
                        <td className="py-3 font-mono text-xs">
                          {tag.sensors.tempC ? `${tag.sensors.tempC}°C` : '—'}
                        </td>
                        <td className="py-3 font-mono text-xs">{tag.firmware}</td>
                        <td className="py-3 text-xs text-muted-foreground">
                          {new Date(tag.lastSeen).toLocaleTimeString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
