import styles from "./style/index.module.less";
import Logo from "@/assets/logo.svg";
import { Input, Message, Select, Tooltip } from "@arco-design/web-react";
import useLocale from "@/utils/useLocale";
import { useContext } from "react";
import { GlobalContext } from "@/context";
import defaultLocale from "@/locale";
import IconButton from "@/components/Navbar/IconButton";
import {
  IconLanguage,
  IconMoonFill,
  IconNotification,
  IconSunFill,
} from "@arco-design/web-react/icon";
import MessageBox from "@/components/MessageBox";

function Navbar({ show }: { show: boolean }) {
  const t = useLocale();

  const { lang, setLang, theme, setTheme } = useContext(GlobalContext);

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src={Logo} alt="logo" />
          <div className={styles["logo-name"]}>React Arco Admin</div>
        </div>
      </div>
      <ul className={styles.right}>
        <li>
          <Input.Search
            className={styles.round}
            placeholder={t["navbar.search.placeholder"]}
          />
        </li>
        <li>
          <Select
            triggerElement={<IconButton icon={<IconLanguage />} />}
            options={[
              { label: "中文", value: "zh-CN" },
              { label: "English", value: "en-US" },
            ]}
            value={lang}
            triggerProps={{
              autoAlignPopupMinWidth: false,
              position: "br",
            }}
            trigger="hover"
            onChange={(value) => {
              setLang(value);
              const nextLang = defaultLocale[value];
              Message.info(`${nextLang["message.lang.tips"]}${value}`);
            }}
          />
        </li>
        <li>
          <MessageBox>
            <IconButton icon={<IconNotification />} />
          </MessageBox>
        </li>
        <li>
          <Tooltip
            content={
              theme === "light"
                ? t["settings.navbar.theme.toDard"]
                : t["settings.navbar.theme.toLight"]
            }
          >
            <IconButton
              icon={theme !== "dark" ? <IconMoonFill /> : <IconSunFill />}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            />
          </Tooltip>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
