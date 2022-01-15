import axios from "axios";
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";

const ServiceDetailPage: NextPage = ({
  service,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  console.log(router.query.slug);

  return (
    <div>
      <h1>{service.Service.Service}</h1>

      <hr />

      {service.Checks.map((check: any) => (
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

export default ServiceDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const datacenterRes = await axios.get(
    `http://127.0.0.1:8500/v1/catalog/datacenters`
  );
  const datacenter = datacenterRes.data[0];

  const serviceRes = await axios.get(
    `http://127.0.0.1:8500/v1/internal/ui/services?dc=${datacenter}`
  );

  const services = serviceRes.data;

  const serviceNames: any[] = [];

  services.map((service: any) => {
    serviceNames.push(service.Name);
  });

  console.log(serviceNames);

  return {
    paths: serviceNames.map((path) => ({ params: { slug: path } })),
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
    `http://127.0.0.1:8500/v1/health/service/${slug}?dc=${datacenter}`
  );

  const service = res.data[0];

  console.log(service);

  return {
    props: {
      service,
    },
  };
};
