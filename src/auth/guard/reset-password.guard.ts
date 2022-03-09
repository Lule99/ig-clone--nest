import { AuthGuard } from "@nestjs/passport"
import Constants from "src/helpers/utils/constants";

export class ResetPassword extends AuthGuard(Constants.reset_jwt) {
    constructor() {
        super();
    }
}