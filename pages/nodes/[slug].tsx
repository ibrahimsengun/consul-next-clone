import axios from "axios";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

const NodeDetailPage: NextPage = ({
  node,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  console.log(router.query.slug);

  return (
    <div>
      <h1>{node.Node}</h1>

      <hr />

      {node.Checks.map((check: any) => (
        <div
          key={check.CheckID}
          style={{
            border: "solid 1px black",
            borderRadius: "1rem",
            padding: "0 15px",
          }}
        >
          <h2>{check.Name}</h2>
          <h4>
            Node Name: <em style={{ fontWeight: "lighter" }}>{check.Node}</em>
          </h4>
          <h4>
            CheckID: <em style={{ fontWeight: "lighter" }}>{check.CheckID}</em>
          </h4>
          <h4>
            Notes: <em style={{ fontWeight: "lighter" }}>{check.Notes}</em>
          </h4>
          <h4>
            Output: <em style={{ fontWeight: "lighter" }}>{check.Output}</em>
          </h4>
        </div>
      ))}
    </div>
  );
};

export default NodeDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const nodeRes = await axios.get(
    `http://127.0.0.1:8500/v1/coordinate/nodes?dc=${datacenter}`
  );

  const nodes = nodeRes.data;

  const nodeNames: any[] = [];

  nodes.map((node: any) => {
    nodeNames.push(node.Node);
  });

  console.log(nodeNames);

  return {
    paths: nodeNames.map((path) => ({ params: { slug: path } })),
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
    `http://127.0.0.1:8500/v1/internal/ui/node/${slug}?dc=${datacenter}`
  );

  const node = res.data;

  console.log(node);

  return {
    props: {
      node,
    },
  };
};
