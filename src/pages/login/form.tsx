import styles from "./style/index.module.less";
import useLocale from "@/utils/useLocale";
import locale from "./locale";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Link,
  Space,
} from "@arco-design/web-react";
import { FormInstance } from "@arco-design/web-react/es/Form";
import { IconLock, IconUser } from "@arco-design/web-react/icon";
import useStorage from "@/utils/useStorage";
import axios from "axios";

export default function LoginForm() {
  const formRef = useRef<FormInstance>();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage("loginParams");

  const t = useLocale(locale);

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params) {
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    localStorage.setItem("userStatus", "login");
    window.location.href = "/";
  }

  function login(params) {
    console.log("params ", params);
    setErrorMessage("");
    setLoading(true);
    axios
      .post("/api/user/login", params)
      .then((res) => {
        const { status, msg } = res.data;
        console.log(res.data);
        if (status === "ok") {
          afterLoginSuccess(params);
        } else {
          setErrorMessage(msg || t["login.form.login.errMsg"]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.current.validate().then((values) => {
      login(values);
    });
  }

  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef.current && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.current.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className={styles["login-form-wrapper"]}>
      <div className={styles["login-form-title"]}>{t["login.form.title"]}</div>
      <div className={styles["login-form-sub-title"]}>
        {t["login.form.title"]}
      </div>
      <div className={styles["login-form-error-msg"]}>{errorMessage}</div>
      <Form
        className={styles["login-form"]}
        layout="vertical"
        ref={formRef}
        initialValues={{ userName: "admin", password: "admin" }}
      >
        <Form.Item
          field="userName"
          rules={[{ required: true, message: t["login.form.userName.errMsg"] }]}
        >
          <Input
            prefix={<IconUser />}
            placeholder={t["login.form.userName.placeholder"]}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          field="password"
          rules={[{ required: true, message: t["login.form.password.errMsg"] }]}
        >
          <Input.Password
            prefix={<IconLock />}
            placeholder={t["login.form.password.placeholder"]}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className={styles["login-form-password-actions"]}>
            <Checkbox checked={rememberPassword} onChange={setRememberPassword}>
              {t["login.form.rememberPassword"]}
            </Checkbox>
            <Link>{t["login.form.forgetPassword"]}</Link>
          </div>
          <Button type="primary" long onClick={onSubmitClick} loading={loading}>
            {t["login.form.login"]}
          </Button>
          <Button
            type="text"
            long
            className={styles["login-form-register-btn"]}
          >
            {t["login.form.register"]}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
