import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import EmptyState from "../components/EmptyState";

function diary() {
  return (
    <Layout>
      <Head>
        <title>יומן</title>
      </Head>
      <div className="flex flex-col gap-6 font-sans mt-6">
        <EmptyState title="יומן" description="אין פריטים להצגה בשלב זה" />
      </div>
    </Layout>
  );
}

export default diary;
