import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 w-fit hover:opacity-90',
  {
    variants: {
      variant: {
        default: 'border border-transparent bg-primary text-primary-foreground',
        secondary:
          'border border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'text-foreground',
        gray: 'bg-gray-600 brightness-[120%] dark:brightness-[100%] text-white',
        blue: 'bg-blue-600 brightness-[120%] dark:brightness-[100%] text-white',
        purple:
          'bg-purple-600 brightness-[120%] dark:brightness-[100%] text-white',
        amber:
          'bg-amber-600 brightness-[120%] dark:brightness-[100%] text-white',
        red: 'bg-red-600 brightness-[120%] dark:brightness-[100%] text-white',
        pink: 'bg-pink-600 brightness-[120%] dark:brightness-[100%] text-white',
        green:
          'bg-green-600 brightness-[120%] dark:brightness-[100%] text-white',
        teal: 'bg-teal-600 brightness-[120%] dark:brightness-[100%] text-white',
        fancy:
          'bg-gradient-to-br from-cyan-600 from-[10%] via-violet-600 via-[60%] to-pink-600 to-[90%] brightness-[110%] text-white',
        'gray-subtle':
          'bg-gray-100 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300',
        'blue-subtle':
          'bg-blue-100 text-blue-700 dark:bg-blue-900/80 dark:text-blue-200',
        'purple-subtle':
          'bg-purple-100 text-purple-700 dark:bg-purple-900/80 dark:text-purple-200',
        'amber-subtle':
          'bg-amber-100 text-amber-700 dark:bg-amber-900/80 dark:text-amber-200',
        'red-subtle':
          'bg-red-100 text-red-700 dark:bg-red-900/80 dark:text-red-200',
        'pink-subtle':
          'bg-pink-100 text-pink-700 dark:bg-pink-900/80 dark:text-pink-200',
        'green-subtle':
          'bg-green-100 text-green-700 dark:bg-green-900/80 dark:text-green-200',
        'teal-subtle':
          'bg-teal-100 text-teal-700 dark:bg-teal-900/80 dark:text-teal-200',
        'fancy-subtle':
          'bg-gradient-to-br from-cyan-400 from-[10%] via-violet-400 via-[60%] to-pink-400 to-[90%] text-white dark:from-cyan-900/80 dark:via-violet-900/80 dark:to-pink-900/80',
      },
      size: {
        sm: 'px-2 py-[1px] text-[10px]',
        md: 'px-2.5 py-1 text-xs',
        lg: 'px-3 py-1.5 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
