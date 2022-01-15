import axios from "axios";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useRouter } from "next/router";

const NodesPage: NextPage = ({
  nodes,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div>
      <h1>
        Nodes Page{" "}
        <em style={{ fontWeight: "lighter", fontSize: "15px" }}>
          {nodes.length} total
        </em>
      </h1>
      <ul>
        {nodes.map((node: any) => (
          <li
            key={node.Node}
            style={{
              border: "solid 1px black",
              borderRadius: "1rem",
              padding: "10px",
            }}
            onClick={() => {
              router.push(`/nodes/${node.Node}`);
            }}
          >
            <b>{node.Node}</b>
            <div>{node.Services.length} Service</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NodesPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const nodeRes = await axios.get(
    `http://127.0.0.1:8500/v1/internal/ui/nodes?dc=${datacenter}`
  );
  const nodes = nodeRes.data;

  return {
    props: {
      nodes: nodes,
    },
  };
};
