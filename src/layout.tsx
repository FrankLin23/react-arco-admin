import { Layout } from "@arco-design/web-react";
import styles from "@/style/less.module.less";
import cs from "classnames";
import settings from "./settings.json";
import getUrlParams from "@/utils/getUrlParams";
import Navbar from "@/components/Navbar";

function PageLayout() {
  const urlParams = getUrlParams();

  const showNavbar = settings.navbar && urlParams.navbar !== false;

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles["layout-navbar"], {
          [styles["layout-navbar-hidden"]]: !showNavbar,
        })}
      >
        <Navbar show={showNavbar} />
      </div>
    </Layout>
  );
}

export default PageLayout;
