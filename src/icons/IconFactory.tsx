import { SvgIconProps } from "@mui/material";
import { GoogleIcon } from "./GoogleIcon";
import { PagenerateIcon } from "./PagenerateIcon";

export enum IconID {
  GOOGLE = "GOOGLE",
  PAGENERATE = "PAGENERATE",
}

export class IconFactory {
  private static readonly iconMap = {
    [IconID.GOOGLE]: GoogleIcon,
    [IconID.PAGENERATE]: PagenerateIcon,
  } as const;

  static getIcon(id: IconID) {
    return this.iconMap[id];
  }

  static renderIcon(id: IconID, props?: SvgIconProps) {
    const Icon = this.getIcon(id);
    return Icon ? <Icon {...props} /> : null;
  }
}
