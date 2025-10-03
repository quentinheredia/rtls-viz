import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { DeviceStatus, AlertSeverity } from '@/types/rtls';

interface StatusBadgeProps {
  status: DeviceStatus | AlertSeverity;
  className?: string;
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusMap: Record<DeviceStatus | AlertSeverity, { label: string; className: string }> = {
    online: { label: 'Online', className: 'status-online' },
    offline: { label: 'Offline', className: 'status-offline' },
    degraded: { label: 'Degraded', className: 'status-degraded' },
    info: { label: 'Info', className: 'severity-info' },
    warning: { label: 'Warning', className: 'severity-warning' },
    critical: { label: 'Critical', className: 'severity-critical' },
  };

  const config = statusMap[status];

  return (
    <Badge variant="outline" className={cn(config.className, 'text-xs font-medium', className)}>
      {config.label}
    </Badge>
  );
}
