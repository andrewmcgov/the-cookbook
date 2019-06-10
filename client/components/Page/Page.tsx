import React from 'react';

interface Props {
  title?: string;
  children?: React.ReactNode;
}

const Page = ({ title, children }: Props) => (
  <div className="page-wrapper">
    {title && (
      <div className="page-header">
        <h3 className="page-header__title">{title}</h3>
      </div>
    )}
    <main>{children}</main>
  </div>
);

export default Page;
