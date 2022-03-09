import { AuthGuard } from "@nestjs/passport"
import Constants from "src/helpers/utils/constants";

export class JwtGuard extends AuthGuard(Constants.simple_jwt) {
    constructor() {
        super();
    }
}