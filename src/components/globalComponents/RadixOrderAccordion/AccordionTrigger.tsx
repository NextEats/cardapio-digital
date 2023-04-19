import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const AccordionTrigger = ({
  children,
  className,
  ...props
}: AccordionTriggerProps) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={
        ` group flex h-[45px] flex-1 items-center justify-between bg-white
        px-5 text-[15px] leading-none outline-none cursor-pointer hover:bg-gray-200` +
        className
      }
      {...props}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
);
