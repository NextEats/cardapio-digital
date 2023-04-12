import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

type AccordionContentProps = {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
};

export const AccordionContent = ({
  children,
  className,
  ...props
}: AccordionContentProps) => (
  <Accordion.Content
    className={
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px] ' +
      className
    }
    {...props}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
);
