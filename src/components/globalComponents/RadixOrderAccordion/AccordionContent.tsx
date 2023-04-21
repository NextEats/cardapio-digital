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
      'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden' +
      className
    }
    {...props}
  >
    <div className="py-2 px-3 bg-white-blue">{children}</div>
  </Accordion.Content>
);
