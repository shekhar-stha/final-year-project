import axios from "axios";
import myKey from "./khaltiKey";
import { paymentStatus } from "../../store/Slices/paymentReportSlice";
import { useDispatch, useSelector } from "react-redux";

let config = {
    // replace this key with yours
    "publicKey": myKey?.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "Gymster",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess(payload) {
            console.log(payload);
        },
        // onError handler is optional
        onError(error) {
            // handle errors
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI"],
};

export default config;