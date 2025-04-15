import { Routes } from "@angular/router";
import { AdminComponent } from "./admin.component";

export const adminRoutes: Routes = [
	{
		path: "",
		component: AdminComponent,
		children: [
			{
				path: "dynamic-form",
				loadComponent: () =>
					import("./dynamic-form/dynamic-form.component").then(
						(m) => m.DynamicFormComponent,
					),
			},
			{
				path: "",
				redirectTo: "dynamic-form",
				pathMatch: "full",
			},
		],
	},
];
