import { Shield } from 'lucide-react';
import type { SVGProps } from 'react';

export function SyncaLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-primary p-2">
      <Shield className="h-full w-full text-primary-foreground" {...props} />
    </div>
  );
}
