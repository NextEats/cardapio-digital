import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

type AccordionItemProps = {
  children: React.ReactNode;
  value: string;
  className?: string;
  [key: string]: any;
};

export const AccordionItem = ({
  children,
  value,
  className,
  ...props
}: AccordionItemProps) => {
  return (
    <Accordion.Item
      value={value}
      className={
        'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] ' +
        className
      }
      {...props}
    >
      {children}
    </Accordion.Item>
  );
};

AccordionItem.displayName = 'AccordionItem';
