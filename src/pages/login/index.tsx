import { useEffect } from "react";
import styles from "./style/index.module.less";
import LoginBanner from "@/pages/login/banner";
import LoginForm from "@/pages/login/form";
import Footer from "@/components/Footer";

function Login() {
  useEffect(() => {
    document.body.setAttribute("arco-theme", "light");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <div className={styles["logo-text"]}>React Arco Admin</div>
      </div>
      <div className={styles.banner}>
        <div className={styles["banner-inner"]}>
          <LoginBanner />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles["content-inner"]}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
