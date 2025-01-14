import { cn } from '@/lib/utils';

export const LoadingDots = ({ className }: { className?: string }) => {
  return (
    <span className='inline-flex items-center'>
      <Dot delay='0s' className={className} />
      <Dot delay='0.2s' className={className} />
      <Dot delay='0.4s' className={className} />
    </span>
  );
};

const Dot = ({
  delay,
  className,
}: {
  delay: '0s' | '0.2s' | '0.4s';
  className?: string;
}) => (
  <span
    style={{ animationDelay: delay }}
    className={cn(
      'animate-blink size-[5px] rounded-full inline-block my-0 mx-[1px] bg-background',
      className
    )}
  />
);
