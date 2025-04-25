import { SvgIconProps } from "@mui/material";
import { GoogleIcon } from "./GoogleIcon";

export enum IconID {
  GOOGLE = "GOOGLE",
}

export class IconFactory {
  private static readonly iconMap = {
    [IconID.GOOGLE]: GoogleIcon,
  } as const;

  static getIcon(id: IconID) {
    return this.iconMap[id];
  }

  static renderIcon(id: IconID, props?: SvgIconProps) {
    const Icon = this.getIcon(id);
    return Icon ? <Icon {...props} /> : null;
  }
}
