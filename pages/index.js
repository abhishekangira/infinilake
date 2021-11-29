import Head from "next/head";
import React, { useEffect, useMemo } from "react";
import Table from "../components/Table/Table";
import S from "../styles/Home.module.css";
import { columnsData } from "../data/columns";

export default function Home({ val }) {
  const data = useMemo(() => JSON.parse(val), []);
  const columns = useMemo(() => columnsData, []);

  return (
    <div className={S.container}>
      <Head>
        <title>Infinilake</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table data={data} columns={columns} />
    </div>
  );
}

export async function getServerSideProps() {
  const avro = require("avsc");

  const main = new Promise((resolve, reject) => {
    const arr = [];
    const decoder = avro.createFileDecoder("data/dataset.avro");
    decoder.on("data", (data) => {
      arr.push(data);
    });
    decoder.on("end", () => {
      resolve(arr);
    });
  });

  let res = await main;
  const val = JSON.stringify(res);
  return { props: { val } };
}
