export interface RouteData {
  title: string;
  icon?: string;
  requiresAuth: boolean;
  showInMenu: boolean;
  adminOnly?: boolean;
}

export interface MenuItem {
  title: string;
  url?: string | null;
  icon: string;
  function?: string;
}
