import Layout from "../../components/layout";
// import DevEnvironments from "@/src/components/sideNavComponenets/devEnvironmants";
import React from "react";
import DevEnvironments from "renderer/components/sideNavComponenets/devEnvironmants";

const DevEnvironment = () => {
  return (
    <Layout>
      <DevEnvironments />
    </Layout>
  );
};

export default DevEnvironment;
