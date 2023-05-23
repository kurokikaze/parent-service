// Anything exported from this file is importable by other in-browser modules.
import { FleetApi } from './apis';
import { Configuration } from './apis/runtime';
export function publicApiFunction() {
    return 'data';
}

const config = new Configuration({ accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoiS1VST0tJS0FaRSIsInZlcnNpb24iOiJ2MiIsInJlc2V0X2RhdGUiOiIyMDIzLTA1LTIwIiwiaWF0IjoxNjg0NzU0Mjg1LCJzdWIiOiJhZ2VudC10b2tlbiJ9.zNmcOvKS8SxlNMnTlemhJhyQ6y8U1RbIF9uU4fahfHq252eYKbfc9C8cOheJw0SSs_9u9LiKwrM5jrTeRtJqtI41ROwFRSVMWctDztZF5f_PRQRTkII993w06lUVT4xreLDC4xJ4ZZSVA9RNBPAEREJJ9K9uen3eOI8PBw86ugFk6dF7_5idCTKwk6-bUR8pRYlr6ro2QfXjG5X9JNkXBUbO_cOn47EeLE8vjzPz5YkuXyShbT9yLUDboQp_oU4yeAaG6X1dInyNsMQbstHTwp7LA12GLreBKStG9u7sjfYf566N1qOLEo72WrtupSuNWXuKBSoCc2_jznebJTZcoA" })
export const myFleet = new FleetApi(config);