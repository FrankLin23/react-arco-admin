export type IRoute = {
  name: string;
  key: string;
  breadcrumb?: boolean;
  children?: IRoute[];
  ignore?: true;
};

export const routes: IRoute[] = [
  {
    name: "menu.dashboard",
    key: "dashboard",
  },
];

export const generatePermission = (role: string) => {
  const actions = role === "admin" ? ["*"] : ["read"];
  const result = [];
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};
