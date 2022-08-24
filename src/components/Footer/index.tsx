import { Layout } from "@arco-design/web-react";
import { FooterProps } from "@arco-design/web-react/es/Layout/interface";
import styles from "./style/index.module.less";
import cs from "classnames";

function Footer(props: FooterProps = {}) {
  const { className, ...restProps } = props;
  return (
    <Layout.Footer className={cs(styles.footer, className)} {...restProps}>
      React Arco Admin
    </Layout.Footer>
  );
}

export default Footer;
