import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import EmptyState from "../components/EmptyState";

function statistics() {
  return (
    <Layout>
      <Head>
        <title>סטטיסטיקות</title>
      </Head>
      <div className="flex flex-col gap-6 font-sans mt-6">
        <EmptyState
          title="סטטיסטיקות"
          description="אין סטטיסטיקות להצגה בשלב זה"
        />
      </div>
    </Layout>
  );
}

export default statistics;
