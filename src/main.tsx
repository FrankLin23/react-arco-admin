import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/global.less";
import Login from "./pages/login";
import PageLayout from "./layout";
import { ConfigProvider } from "@arco-design/web-react";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import enUS from "@arco-design/web-react/es/locale/en-US";
import useStorage from "@/utils/useStorage";
import { GlobalContext } from "@/context";
import "@arco-design/web-react/dist/css/arco.css";
import "./mock";

function Index() {
  const [lang, setLang] = useStorage("arco-lang", "en-US");
  const [theme, setTheme] = useStorage("arco-theme", "light");

  function getArcoLocale() {
    switch (lang) {
      case "zh-CN":
        return zhCN;
      case "en-US":
        return enUS;
      default:
        return zhCN;
    }
  }

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider locale={getArcoLocale()}>
        <GlobalContext.Provider value={contextValue}>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<PageLayout />}></Route>
          </Routes>
        </GlobalContext.Provider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Index />
);
