import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

const KeyValuePage: NextPage = ({
  kv,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div>
      <h1>KeyValuePage</h1>

      <ul>
        {kv.map((key: any) => (
          <li
            key={key}
            style={{
              border: "solid 1px black",
              borderRadius: "1rem",
              padding: "10px",
              margin: "5px",
            }}
            onClick={() => {
              router.push(`/kv/${key}`);
            }}
          >
            {key}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyValuePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const kvRes = await axios.get(
    `http://127.0.0.1:8500/v1/kv/?keys&dc=${datacenter}`
  );
  const kv = kvRes.data;

  console.log(kv);

  return {
    props: {
      kv,
    },
    revalidate: 1,
  };
};
