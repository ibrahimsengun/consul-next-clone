import axios from "axios";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import { useRef } from "react";

const KeyValueDetail: NextPage = ({
  kv,
  datacenter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  const valueRef = useRef<HTMLInputElement>(null);

  console.log(router.query.slug);

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const value = valueRef.current!.value;
    console.log(value);

    await axios
      .put(
        `http://127.0.0.1:8500/v1/kv/${router.query.slug}?dc=${datacenter}`,
        JSON.stringify(JSON.parse(value))
      )
      .then((res: any) => {
        router.push("/kv");
      });
  }

  return (
    <div>
      <h1>{kv.Key}</h1>

      <hr />

      <form onSubmit={submitHandler}>
        <label>Value: </label>
        <input type="text" ref={valueRef} />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default KeyValueDetail;

export const getStaticPaths: GetStaticPaths = async () => {
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
    paths: kv.map((path: any) => ({ params: { slug: path } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context?.params?.slug;

  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const res = await axios.get(
    `http://127.0.0.1:8500/v1/kv/${slug}?dc=${datacenter}`
  );

  const kv = res.data[0];

  console.log(kv);

  return {
    props: {
      kv,
      datacenter,
    },
  };
};
