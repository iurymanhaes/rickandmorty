import { Karla } from "next/font/google";
import { Roboto } from "next/font/google";

export const karlaFont = Karla({ weight: "700", subsets: ["latin"] });

export const robotoFontNormal = Roboto({ weight:[ "400","100"], subsets: ["latin"] });
export const robotoFont = Roboto({ weight: ["400","500","700"], subsets: ["latin"] });
// export const robotoFontWeight = Roboto({ weight: "700", subsets: ["latin"] });
