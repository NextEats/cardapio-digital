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
        'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none ' +
        className
      }
      {...props}
    >
      {children}
    </Accordion.Trigger>
  </Accordion.Header>
);
