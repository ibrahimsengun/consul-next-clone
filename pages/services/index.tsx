import type { NextPage } from "next";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import axios from "axios";

const ServicesPage: NextPage = ({
  services,
  datacenter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          <li key={service.Name}>
            <Link href={`/services/${service.Name}`}>{service.Name}</Link>{" "}
            <div>{service.Nodes.length} instance</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const serviceRes = await axios.get(
    "http://127.0.0.1:8500/v1/internal/ui/services"
  );
  const services = serviceRes.data;

  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  return {
    props: {
      services: services,
      datacenter: datacenter,
    },
  };
};
