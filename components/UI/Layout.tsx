import React from "react";

import Head from "next/head";

import styles from "../../styles/Home.module.css";

type LayoutProps = {
  title: string;
  description: string;
  children: any;
};

const Layout = ({ title, description, children }: LayoutProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

Layout.defaultProps = {
  title: "Consul Clone",
  description: "a Consul clone with typescript and Next.js",
};

export default Layout;
