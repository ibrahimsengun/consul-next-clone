import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const ServicesPage: NextPage = ({
  services,
  datacenter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  return (
    <div>
      <h1>
        Services Page{" "}
        <em style={{ fontWeight: "lighter", fontSize: "15px" }}>
          {services.length} total
        </em>
      </h1>
      <ul>
        {services.map((service: any) => (
          <li
            key={service.Name}
            style={{
              border: "solid 1px black",
              borderRadius: "1rem",
              padding: "10px",
            }}
            onClick={() => {
              router.push(`/services/${service.Name}`);
            }}
          >
            <b>{service.Name}</b>
            <div>{service.Nodes.length} instance</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const serviceRes = await axios.get(
    `http://127.0.0.1:8500/v1/internal/ui/services?dc=${datacenter}`
  );
  const services = serviceRes.data;

  return {
    props: {
      services: services,
      datacenter: datacenter,
    },
  };
};
