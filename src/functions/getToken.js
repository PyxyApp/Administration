import {firebaseConfig} from "../firebaseConfig";
import key from "../privateKey";
import * as jwt from "jsonwebtoken";

const getToken = () => {
    let privateKey = firebaseConfig.projectId+key.author+key.privateKey;
    let tokenACP = jwt.sign({ AdminControlPanel: true }, privateKey);
    return tokenACP
};

export default getToken;