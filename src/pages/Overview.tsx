import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRTLSStore } from '@/store/useRTLSStore';
import { mockAnchors, mockTags, mockAlerts } from '@/data/mockData';
import StatusBadge from '@/components/StatusBadge';
import { Radio, Tag, Bell, Activity, TrendingUp } from 'lucide-react';

export default function Overview() {
  const { anchors, tags, alerts, health, setAnchors, setTags, setAlerts, setHealth } = useRTLSStore();

  useEffect(() => {
    setAnchors(mockAnchors);
    setTags(mockTags);
    setAlerts(mockAlerts);
    setHealth({ 
      ingestToUiMs: 132, 
      packetLossPct: 0.4, 
      wsConnected: true,
      uptime: 3600 
    });
  }, [setAnchors, setTags, setAlerts, setHealth]);

  const onlineAnchors = anchors.filter((a) => a.status === 'online').length;
  const degradedAnchors = anchors.filter((a) => a.status === 'degraded').length;
  const lowBatteryTags = tags.filter((t) => t.batteryPct < 20).length;
  const openAlerts = alerts.filter((a) => a.status === 'open').length;
  const criticalAlerts = alerts.filter((a) => a.status === 'open' && a.severity === 'critical').length;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">System Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time monitoring of hospital RTLS pilot deployment
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Anchors
            </CardTitle>
            <Radio className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{onlineAnchors}/{anchors.length}</div>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status="online" />
              {degradedAnchors > 0 && (
                <>
                  <StatusBadge status="degraded" />
                  <span className="text-xs text-muted-foreground">+{degradedAnchors}</span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tags
            </CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{tags.length}</div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-muted-foreground">Low battery:</span>
              <span className={lowBatteryTags > 0 ? "text-severity-warning font-semibold" : "text-status-online"}>
                {lowBatteryTags}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Open Alerts
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{openAlerts}</div>
            <div className="flex items-center gap-2 mt-2">
              {criticalAlerts > 0 && (
                <>
                  <StatusBadge status="critical" className="pulse-status" />
                  <span className="text-xs text-severity-critical font-semibold">
                    {criticalAlerts} critical
                  </span>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Health
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{health.ingestToUiMs}ms</div>
            <div className="flex items-center gap-2 mt-2 text-xs">
              <span className="text-muted-foreground">Latency</span>
              {health.ingestToUiMs < 200 ? (
                <StatusBadge status="online" />
              ) : (
                <StatusBadge status="warning" />
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">UWB Network</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Anchors</span>
              <span className="font-mono">{anchors.filter((a) => a.tech === 'UWB').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tags</span>
              <span className="font-mono">{tags.filter((t) => t.tech === 'UWB').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg RMSE</span>
              <span className="font-mono text-status-online">0.68m</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">BLE Network</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Anchors</span>
              <span className="font-mono">{anchors.filter((a) => a.tech === 'BLE').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tags</span>
              <span className="font-mono">{tags.filter((t) => t.tech === 'BLE').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg RMSE</span>
              <span className="font-mono text-status-degraded">1.34m</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Wi-Fi RTT</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Anchors</span>
              <span className="font-mono">{anchors.filter((a) => a.tech === 'WIFI_RTT').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tags</span>
              <span className="font-mono">{tags.filter((t) => t.tech === 'WIFI_RTT').length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Avg RMSE</span>
              <span className="font-mono text-status-degraded">2.12m</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {alerts.slice(0, 5).map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <StatusBadge status={alert.severity} />
                  <div className="text-sm">
                    <div className="font-medium">{alert.type.replace(/_/g, ' ')}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(alert.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <StatusBadge 
                  status={alert.status === 'open' ? 'critical' : alert.status === 'acked' ? 'warning' : 'online'} 
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
